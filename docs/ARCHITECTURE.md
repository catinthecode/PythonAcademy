# Python Academy: Architecture

How the app is built: its runtime, code layout, data model, Python engine, progress system,
engagement features and quality gates. What the course teaches, and the rules content must
follow, are in [CURRICULUM.md](CURRICULUM.md). Setup commands are in the
[README](../README.md).

## 1. The big picture

Python Academy is a **static single-page app**. There is no server. Real Python runs in the
browser through Pyodide, and progress is saved in `localStorage`.

```
┌──────────────────────────── Browser ─────────────────────────────┐
│                                                                   │
│  React UI (src/app, src/pages, src/components, src/art)           │
│     │  reads                         │ saves                      │
│     ▼                                ▼                            │
│  Course data (src/content)       Progress store (src/progress)    │
│  worlds → chapters → lessons     profiles, XP, stars, unlocks     │
│     │                                │                            │
│     ▼                                ▼                            │
│  Grader (src/engine/grade.ts)    localStorage "python-academy.v1" │
│     │ run / trace                                                 │
│     ▼                                                             │
│  PythonClient ──postMessage──▶ Web Worker ──▶ Pyodide             │
│  (8 s timeout, restarts           harness.py (sandbox, step limit)│
│   a stuck worker)                 turtle.py  (records drawings)   │
└───────────────────────────────────────────────────────────────────┘

Build time / CI:  scripts/validate-content.ts runs the SAME grader + harness in Node
                  against every puzzle, then Playwright drives the built site.
```

**Main design choices**

| Choice | Why |
|---|---|
| Content is plain TypeScript data (`src/content/schema.ts`) | Adding a chapter means writing data, not code. The type checker catches structural mistakes. |
| One grader for the app and the validator (`grade.ts`, `core.ts`) | A puzzle that passes in CI is graded the same way for a kid. |
| Python in a Web Worker | An infinite loop can never freeze the page. The client kills the worker and restarts it. |
| Hash routing (`#/w/w1/ch2`) | Works on GitHub Pages without server rewrites. |
| Pyodide served from the site (`public/pyodide`) | No CDN dependency. Visitors install nothing. |
| A `backend` object behind the progress store | `localStorage` today. It can be swapped for a server later without touching any pages. |
| SVG art drawn in code (`src/art`) | Comic panels are data (scene, cast, props, bubbles), so there are no image files to manage. |

**Stack:** React 19, Vite 8, Tailwind 4, CodeMirror 6, Pyodide, TypeScript, and Playwright for
end-to-end tests.

## 2. Source layout

```
src/
  main.tsx, index.css
  app/          App.tsx (route table), router.ts (hash router), Shell.tsx (header: XP, streak,
                sound), ChaptersOverlay.tsx
  pages/        ChapterMap, ComicReader, LessonPlayer, Library, MagicLab, ProfilePage,
                WhoIsPlaying, ArtGallery (#/art, for development)
  components/   CodeEditor, OutputConsole, SpacedLine (visible spaces), TryIt, HintLadder,
                MagicSymbolBar, SpeechButton, Confetti, StarRow, XpBar, TurtleCanvas, …
    puzzles/    PuzzleView dispatch (Puzzles.tsx), CodeWorkspace (goal box + editor + output),
                ThinkingPuzzles (trace / break-it / instruct), hooks (run, goal, grader, drafts)
  art/          characters/ (Py, Blocky, Turtle, Sneak, Robot, Critter), scenes, props,
                ComicPanel (panel renderer), ComicThumb
  content/      schema.ts (all content types), helpers.ts (py`` tag), characters.ts,
                worlds.ts (WORLDS, find*, lessonKey), world1 … world5/
  engine/       grade.ts, explain.ts (friendly error messages), turtleMatch.ts, sound.ts
    python/     client.ts (main thread), worker.ts, core.ts (shared with Node),
                harness.py (runs and checks code), turtle.py (turtle stand-in), types.ts
  progress/     store.ts (profiles, lesson progress, streak), unlock.ts, xp.ts, badges.ts
scripts/        validate-content.ts, copy-pyodide.mjs
tests/          smoke.spec.ts (every page renders), all-problems.spec.ts (every problem solved via UI)
.github/workflows/deploy.yml   check → e2e → test:all → build → publish to GitHub Pages
```

## 3. Routes

| Hash | Page |
|---|---|
| `#/who` | Pick or create a player (shown whenever no profile is selected) |
| `#/` | Home: the current chapter map (`homeChapter`: last chapter visited, else the first unfinished one) |
| `#/w/{world}/{chapter}` | Chapter map |
| `#/w/{world}/{chapter}/lesson/{lessonId}` | A `read` lesson opens **ComicReader**. A `practice` or `test` lesson opens **LessonPlayer**. |
| `#/library[/{world}]` | Comic library for one world |
| `#/lab` | Magic Lab sandbox |
| `#/profile[/badges\|/progress]` | Profile tabs |
| `#/art` | Art gallery for development |

**One page per chapter's comics.** ComicReader shows *all* of a chapter's reading lessons on
one long page. Each book is a `<section id="book-{lessonId}">`. Its React key is
`world/chapter`, so moving between `read1` and `read2` keeps the page mounted and just scrolls:
the first book scrolls to the top, and later books scroll to their anchor. Every link to a
reading lesson lands at the right section. That includes the book icons on the chapter map,
the Library cards and the "Book N" chips. Progress is still saved per book with
"✅ I finished Book N!".

## 4. Content model

```
World            id w1…w5, title, game theme, ages, colour theme, characters
 └─ Chapter      id ch1…ch8, title, emoji, summary
     └─ Lesson   in map order
         ├─ read      → panels: ComicPanel[]      ("Book" in the UI)
         ├─ practice  → problems: Puzzle[]
         └─ test      → problems: Puzzle[]        (exactly one, last; last problem is the boss)
```

Each world is registered in `src/content/worldN/index.ts` (its chapter list and theme) and
`worldN/world.ts` (its cast). All worlds are listed in `src/content/worlds.ts`. Progress keys
are `"{world}/{chapter}/{lesson}"` (`lessonKey`). **Never rename a lesson id that has
shipped,** because kids' saved progress would be lost.

The course outline (5 worlds × 8 chapters, each Book 1 → Practice 1 → Book 2 → Practice 2 →
Test) and every rule for writing books and problems are in [CURRICULUM.md](CURRICULUM.md).
This section only covers the data format.

**Comic panels** (`ComicPanel`):
- `scene`, and `alt` text for screen readers.
- `cast`: who, pose, x, y, flip, scale.
- `props`.
- `bubbles`: who, text. Each bubble's tail points at its speaker automatically.
- `caption`.
- `code`: an optional runnable Try-it, with `inputs`.
- `wide`: spans both columns of the 2-column grid.

The art is in `src/art`: characters with 8 poses, 11 scenes and 16 props, all of which can be
browsed at `#/art`.

**Problems** (`Puzzle`) is a union of 8 types: `predict`, `fix`, `write`, `fill`, `parsons`,
`trace`, `breakit` and `instruct`. Each type is documented inline in `schema.ts`.
- Code problems have a reference `solution`. Their goal output is the solution's output, and
  they can add Python `check` assertions.
- Code problems can set `turtle: true` to be graded by their drawing, and `inputs` to answer
  `input()` calls.
- Every problem has `hints`, which HintLadder shows one at a time.
- Write Python in content files with the `` py`…` `` tag (`helpers.ts`), which strips the
  shared indentation.

## 5. Python engine and grading

1. **PythonClient** (`client.ts`) runs one program at a time from a queue. If a run takes over
   **8 seconds**, it terminates the worker and starts a new one, which returns a `Timeout`.
2. **Worker** (`worker.ts`) loads Pyodide from `public/pyodide` and installs `turtle.py` as
   the `turtle` module, plus `harness.py`.
3. **Harness** `_run(src, check, expected_output, inputs)`:
   - Runs the kid's code under a line counter (`STEP_LIMIT = 100_000`, which gives `TooLong`).
   - Fakes `input()` from the puzzle's `inputs`, echoing them like a terminal.
   - Captures output, variables and the turtle drawing.
   - Runs the `check` assertions. Checks can use `output`, `output_lines`, `source`,
     `expected_output` and `same_output()`.
   - `_trace` records variable values for trace tables.
4. **Grader** (`grade.ts`):
   - The goal is the reference solution's output, cached per solution.
   - The default check is `same_output(output, expected_output)`, which **ignores trailing
     spaces and trailing blank lines but counts leading and inner spaces**.
   - On a mismatch, `describeMismatch` points at the first differing line ("Check your
     spaces!", "Check your capital letters!").
   - Errors become friendly messages through `explain.ts`.
   - Turtle problems compare drawings (`turtleMatch.ts`).
   - Predict answers ignore case and extra spacing.
5. **Visible whitespace:** because leading spaces count, the 🎯 Goal box and the output console
   render leading spaces, and runs of 2+ spaces, as shaded cells (`SpacedLine.tsx`). When a
   goal contains them, a legend explains them. The editor uses a ligature-free monospace font.

## 6. Progress, unlocks and rewards

- **Profiles:** several kids per browser. Data is
  `{ version: 1, profiles, current }` under `localStorage["python-academy.v1"]`.
- **Lesson progress:** `done`, `stars`, `solved[]` and `hints{}`. Unfinished code is kept as
  drafts (`useDraft`).
- **Unlocks** (`unlock.ts`):
  - All worlds are open.
  - In a world, chapter 1 is open, and each later chapter opens when the previous chapter's
    test is passed.
  - In a chapter, reading and practice lessons can be done in any order. The test opens when
    every practice lesson is done.
  - A grown-up switch (`unlockAll`) opens everything.
- **XP** (`xp.ts`): problem 10, boss 25, book 15. Player level ("Lvl") is separate from
  worlds. Lvl N starts at `25·N·(N−1)` XP.
- **Stars** for a finished problem lesson: 0 hints gives 3, 1–2 hints give 2, 3 or more give 1.
  Replaying keeps the best result.
- **Streak:** consecutive days with activity, shown as 🔥 N in the header.

## 7. Engagement features

Everything here works without extra assets or dependencies, and works offline.

| Feature | Where | Notes |
|---|---|---|
| Sound effects | `engine/sound.ts`, `SoundToggle` | Synthesised with Web Audio, so there are no audio files. Cues: tap, success, gentle error "boing", star chime, level-up, boss defeat and finishing a book. Mute is saved in `localStorage`. |
| Confetti and XP pops | `Confetti.tsx`, `StarRow`, `XpBar` | Bursts when a problem is solved, a boss is beaten, a lesson is finished or a book is read. Stars drop in one by one on the results screen. |
| Quick Keys | `MagicSymbolBar.tsx` | Tap-to-insert chips above the editor: `print("…")`, quotes, brackets, `:`, `=`, `==`, `+`, `-`, `#`. They place the cursor inside quotes and brackets, so young kids don't have to hunt for symbols. |
| Read aloud | `SpeechButton.tsx` | 🔊 on comic panels, problem prompts and hints, using the browser's `speechSynthesis` |
| Py companion | `LessonPlayer` | Py gives instructions and feedback on the problem card. Clicking Py gets a wiggle and some encouragement. |
| Badges | `progress/badges.ts`, Profile → 🏆 Badges | Worked out from progress rather than stored separately. Badges for: first problem, first boss, 5 fixes, 5 predicts, 3 turtle drawings, 20 and 50 stars, a no-hint lesson, 5 books read, Lvl 4, and 3- and 7-day streaks. |
| Magic Lab | `#/lab`, `pages/MagicLab.tsx` | A free-play editor with the turtle and text output. Starter templates: Rainbow Spiral, Star Flower, Golden Star and Joke Bot. "Save Picture" downloads a PNG. |
| Visible spaces | `SpacedLine.tsx` | See §5 |

**Future ideas:**
- Background music for each world.
- A Campus hub scene and an activity calendar.
- A Puzzle Lab with difficulty levels 1–4.
- A placement ("test out") quiz.

## 8. Quality gates

| Gate | What it does |
|---|---|
| `npm run check` (pre-commit hook and CI) | `tsc` plus `validate-content`. Reference solutions pass, buggy starters fail, predict, trace and break-it answers match real Python, and only one break-it choice breaks the code. |
| `npm run test:e2e` | Opens every page and every lesson route in headless Chrome. Fails on blank pages or JS errors. For comics, checks the chapter title and each `#book-{id}`. |
| `npm run test:all` | Solves every problem through the real UI. |
| Deploy (`deploy.yml`) | On every push to `main`: check, e2e, test:all, build, then publish `dist/` to GitHub Pages. |

## 9. Adding or changing content: checklist

1. Decide where it fits using [CURRICULUM.md](CURRICULUM.md): its world, chapter role and the
   concepts it is allowed to use.
2. Edit or add `src/content/worldN/chX-name.ts`, using an existing chapter as a template. Keep
   the standard chapter shape, and keep shipped lesson ids stable.
3. Register a new chapter in `worldN/index.ts`. Add new characters in `worldN/world.ts`, and
   new art in `src/art` (check it at `#/art`).
4. Follow the book and problem rules in CURRICULUM.md §5–6. Look over the comic in the dev
   server, because layout problems like grid gaps and stacked bubbles only show up visually.
5. Run `npm run check`, then `npm run test:e2e`.
