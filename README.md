# 🐍 Python Academy

A Beast Academy–style Python course for kids ages 7–12: comic lessons, puzzles that run real
Python in the browser, stars, XP and unlockable chapters across 5 game-themed Worlds.

| World | Game | Ages | Status |
|---|---|---|---|
| 1 First Spells | Block World | 7–8 | ✅ 8 chapters |
| 2 Making Choices | Critter Quest | 8–9 | ✅ 8 chapters |
| 3 Loops and Lists | Brick Park | 9–10 | ✅ 8 chapters |
| 4 Building Blocks | Hero Kingdom | 10–11 | ✅ 8 chapters |
| 5 Thinking Like a Programmer | The Multiverse | 11–12 | ✅ 8 chapters |

40 chapters and 525 problems in all, every one checked against real Python by `npm run validate-content`.

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
| `npm run test:all` | Plays EVERY problem through the real UI (types code, fills gaps, taps tiles, picks choices, fills trace tables) and checks each is accepted | In CI before every deploy (~2 min) |

The pre-commit hook lives in `.githooks/`. Turn it on in a fresh clone with
`git config core.hooksPath .githooks`. Skip it once with `git commit --no-verify`.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which validates the content, builds the
site and publishes `dist/` to GitHub Pages. One-time setup: **Settings → Pages → Source:
GitHub Actions**. To host at a domain root instead, build with `BASE_PATH=/`.

## Design docs

| Doc | Covers |
|---|---|
| [docs/CURRICULUM.md](docs/CURRICULUM.md) | What the course teaches and why: goals, how worlds, chapters and lessons are organized, the concept map for each world, which concepts content may use, and the rules for writing problems and comic books. **Read this before designing or writing content.** |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the app is built: runtime, source layout, routes, data model, Python engine and grading, progress and unlocks, engagement features, quality gates, and the checklist for adding content. |
