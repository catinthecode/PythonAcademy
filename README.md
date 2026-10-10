# 🐍 Python Academy

A Beast Academy–style Python course for kids ages 7–12: comic lessons, puzzles that run real
Python in the browser, stars, XP and unlockable chapters across 5 game-themed Worlds.

| World | Game | Ages | Status |
|---|---|---|---|
| 1 First Spells | Block World | 7–8 | ✅ 8 chapters |
| 2 Making Choices | Critter Quest | 8–9 | sneak peek |
| 3 Loops and Lists | Brick Park | 9–10 | sneak peek |
| 4 Building Blocks | Hero Kingdom | 10–11 | coming soon |
| 5 Thinking Like a Programmer | The Multiverse | 11–12 | coming soon |

## Running it

```sh
npm install
npm run dev               # http://localhost:5173/PythonAcademy/
npm run validate-content  # checks every puzzle against real Python
npm run build             # static site in dist/
```

Visitors don't install anything. Python ([Pyodide](https://pyodide.org)) runs in the browser,
served from the site itself (`scripts/copy-pyodide.mjs` copies it into `public/pyodide`).

## Testing

| Command | What it checks | When it runs |
|---|---|---|
| `npm run check` | Type-check, plus every puzzle against real Python (solutions pass, buggy starters fail, predict answers match) | Before every commit (git hook) and in CI |
| `npm run test:e2e` | Builds the site, opens every page and lesson in headless Chrome (fails on blank pages or JS errors), and plays a lesson end to end | In CI before every deploy; run it locally any time |

The pre-commit hook lives in `.githooks/`. Turn it on in a fresh clone with
`git config core.hooksPath .githooks`. Skip it once with `git commit --no-verify`.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which validates the content, builds the
site and publishes `dist/` to GitHub Pages. One-time setup: **Settings → Pages → Source:
GitHub Actions**. To host at a domain root instead, build with `BASE_PATH=/`.

## How it fits together

```
src/content/      the course, as plain data (worlds → chapters → lessons → problems)
src/engine/       runs Python in a Web Worker, grades answers, explains errors kindly
src/art/          SVG characters, scenes, props and comic panels
src/pages/        chapter map, comic reader, lesson player, library, profile
src/progress/     kid profiles, XP, stars, unlock rules (saved in the browser for now)
```

Open `#/art` in the dev server to see every character pose, scene and prop.

## Adding a chapter

1. Create `src/content/world1/ch6-something.ts` exporting a `Chapter` (copy an existing one).
   Lessons go in map order: `read` lessons hold comic `panels`, `practice` and `test` lessons
   hold `problems`. End with exactly one `test`.
2. Add it to the world's `chapters` list in `src/content/world1/index.ts`.
3. Run `npm run validate-content`. It runs every solution, confirms buggy starters really fail,
   and checks predict answers against what Python actually prints.

Problem types: `predict` (including `about: 'meaning'` for "what does it do?"), `fix`, `write`,
`fill` (`___` gaps), `parsons` (put lines in order), `trace` (fill in a trace table), `breakit`
(find the input that exposes the Robot's bug) and `instruct` (pick the instruction that makes the
Robot build the goal). Any code problem can set `turtle: true` to be graded by its drawing. Checks are Python
`assert` lines (see `src/content/schema.ts`); by default the kid's output must match the
solution's output.

Comic panels are data too: pick a `scene`, place the `cast` (character, pose, x position) and
`props`, and write `bubbles`. Bubbles point at their speakers automatically.
