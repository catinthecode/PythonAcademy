# Python Academy: Curriculum Design

This doc covers **what the course teaches, how it is organized, and the rules content must
follow.** Use it as the guide when designing or changing any world, chapter, book or problem.
How the app is built is in [ARCHITECTURE.md](ARCHITECTURE.md).

## 1. Goals and philosophy

**Who it's for:** kids aged 7–12. The course has 5 worlds, roughly one per school grade
(about grades 2–6), in the style of Beast Academy: comic "guide" lessons, then puzzles that get
harder, then a chapter test with a boss.

**Concepts before syntax.** These kids will grow up working alongside AI coding helpers, so
the course aims for a programmer's *thinking skills* more than typing speed or library details:

1. **Think in steps:** break a goal into exact, ordered instructions.
2. **Read and predict code:** say what code does *before* running it.
3. **Trace:** follow variables line by line.
4. **Test and debug:** find the input that breaks code, read error messages like clues, and
   fix the bug.
5. **Specify precisely:** describe what you want clearly enough that a robot (or an AI) gets
   it right.
6. **Decompose and build:** split a project into small pieces and test each one.

**But kids still type real code.** Concepts stick by doing. Every chapter mixes reading and
predicting with fixing, tweaking and writing real Python. We deliberately brought typing back
after an early version cut too much. The loop to aim for is **read → predict → fix → tweak →
write → verify.**

**Fun first, never punishing.** Each world has a game theme with its own cast. Wrong answers
get gentle, specific feedback such as "Line 2 should be…" or "Check your spaces!". Hints come
one step at a time, and replaying a lesson can only improve the score.

**Generic names only:** Block World, Critter Quest, Brick Park, Hero Kingdom and The
Multiverse. They are inspired by popular games, but never use their trademarked names or
characters.

## 2. How the course is organized

```
5 Worlds (one per age band)
 └─ 8 Chapters each (40 total), unlocked in order inside a world; all worlds open
     └─ Lessons, in this fixed order along the chapter map:
         📖 Book 1 → ✏️ Practice 1 → 📖 Book 2 → ✏️ Practice 2 → 🏆 Test
```

| Piece | What it is | Size |
|---|---|---|
| **Book** (`read` lesson) | A comic that teaches the idea, with runnable Try-it examples. All of a chapter's books are on one long page, and also in the Library. | 6 panels, about 1 minute each |
| **Practice** | Problems that unlock one after another | 4–7 problems (usually 5) |
| **Test** | 2 review problems and a **boss** (the chapter's showpiece). Passing it opens the next chapter. | 3 problems |

**Each world follows the same 8-chapter pattern:**

| Chapters | Role |
|---|---|
| 1–6 | **Core concepts**, each building on the last |
| 7 | **🤖 Bolt the Robot**: an AI-helper skill, harder each world (precise instructions, then testing, reading code, writing specs, and finally how AI coders work). Bolt's code is pre-written; there is no live AI. |
| 8 | **Project**: plan first, then build in parts that combine the world's skills. The boss is the kid's own version. |

Recurring characters: **Py** (the guide, a snake in a wizard hat) appears in every world.
**Bolt** appears in every chapter 7, and sometimes elsewhere. Each world adds a kid hero and a
mischief-maker who causes the bugs.

## 3. Scope and sequence

### World 1 · First Spells · *Block World* · ages 7–8
Cast: Py, Max (a miner), Shelly (a turtle), Sneak (who causes bugs), Bolt.
**Big idea:** computers follow exact instructions in order.

| # | Chapter | Concepts | Thinking skill |
|---|---|---|---|
| 1 | 💬 Hello, Max! | `print`, text in quotes vs numbers, simple maths in `print` | Exact instructions, top-to-bottom order |
| 2 | 🐢 Turtle Builder | turtle `forward`/`left`/`right`, pen up/down | Plan a drawing as steps |
| 3 | 🔁 Repeater Loops | `for … in range(n)`, indentation (what's inside or outside the loop) | Spot repetition |
| 4 | 📦 Inventory Boxes | variables, changing them, joining text vs adding numbers | Naming and remembering |
| 5 | 🌀 Growing Patterns | the loop variable `i`, `range(start, stop)`, maths with `i`, patterns that grow | Patterns and change |
| 6 | 🐛 Sneak's Bug Hunt | SyntaxError, NameError, IndentationError, TypeError | Read error messages as clues |
| 7 | 🤖 Bolt's Workshop | instruct, break-it, trace | Clear instructions; check the robot's work |
| 8 | 🏡 Project: Pixel Scene | turtle, loops and variables together | Break a build into parts |

World 1 leans on the turtle: 43 of its 114 problems are drawings.

### World 2 · Making Choices · *Critter Quest* · ages 8–9
Cast: Py, Rae (a kid trainer), Fizz and Blazewing (critters), Bolt, Sneak.
**Big idea:** programs can calculate, ask questions and choose.

| # | Chapter | Concepts | Thinking skill |
|---|---|---|---|
| 1 | 🧮 Number Crunch | `+ - * /`, `//`, `%`, order of operations, brackets | Predict a calculation |
| 2 | 🔤 Text Tricks | joining text, `len`, f-strings, `*` to repeat text, `.upper()` | Build output from parts |
| 3 | ⚖️ True or False | `== != < > <= >=`, booleans in variables | Yes-or-no questions |
| 4 | 🔀 Forks in the Road | `if` / `elif` / `else`, the order of checks | Choose a path; order matters |
| 5 | 🧩 Logic Puzzles | `and`, `or`, `not` | Combine conditions |
| 6 | ⌨️ Ask the Player | `input()`, `int()`, `try`/`except ValueError` | Expect odd answers |
| 7 | 🤖 Bolt Tests Battles | edge cases, break-it | One test is never enough |
| 8 | ⚔️ Project: Critter Battle | stats, input moves, damage maths, a winner | Plan, then make it fair |

### World 3 · Loops and Lists · *Brick Park* · ages 9–10
Cast: Py, Bix (a kid), Glitch (a critter), Bolt.
**Big idea:** handle many things and repeat until done.

| # | Chapter | Concepts | Thinking skill |
|---|---|---|---|
| 1 | 🔄 Keep Going Until | `while`, updating the condition, infinite loops | When does it stop? |
| 2 | 📋 Lists | indexes (including negative), `len`, IndexError, `append`, changing items | Find things by position |
| 3 | 🔁 Loop Patterns | loop over a list: count, total, biggest, smallest, average | Reusable patterns |
| 4 | 🔍 Searching | `in`, `.index()`, search loops with `break`, flags | Search step by step |
| 5 | 🔲 Grids | nested loops, `end=""`, rows and columns | Loops inside loops |
| 6 | 🔡 Letters | text as a sequence: indexes, slices, building new text | Text is data |
| 7 | 🤖 Bolt's Mystery Code | read code you didn't write; good names; trace | Understand before you trust |
| 8 | 🏆 Project: Leaderboard | lists, totals, `sorted`, ranks | Build in parts |

### World 4 · Building Blocks · *Hero Kingdom* · ages 10–11
Cast: Py, Kai (a kid hero), Slime (a critter), Bolt.
**Big idea:** build big programs from small, tested pieces.

| # | Chapter | Concepts | Thinking skill |
|---|---|---|---|
| 1 | 📜 Spellbooks | `def`, calling, call order, functions that call functions | Name a job once, reuse it |
| 2 | 🎁 Inputs and Outputs | parameters, arguments, `return` vs `print` | Inputs → output |
| 3 | 🧩 Small Pieces | breaking a problem into small functions, each with one job | Decomposition |
| 4 | 🗝️ Dictionaries | keys and values, `in`, `.get`, looping over a dictionary, tallies | Look things up by name |
| 5 | 🛡️ Lists of Things | lists of dictionaries: filter, find, total | Model real things as data |
| 6 | ✅ Testing | `assert`, tests that catch bugs, test first | Make the computer check |
| 7 | 🤖 Specs for Bolt | specs: name, inputs, output, examples, edge cases | Specify precisely |
| 8 | 🏰 Project: Text Adventure | a dictionary of rooms, `input` moves, a game loop, functions | Design a small system |

### World 5 · Thinking Like a Programmer · *The Multiverse* · ages 11–12
Cast: Py, Nova (a kid explorer), Zork (an alien critter), Bolt.
**Big idea:** compare approaches, model the world, and work with AI.

| # | Chapter | Concepts | Thinking skill |
|---|---|---|---|
| 1 | ⏱️ Algorithms | counting steps; growth (linear, every pair, halving) | Which recipe is faster? |
| 2 | 🔎 Searching and Sorting | binary search, bubble sort, swaps | Smarter strategies |
| 3 | 🪞 Recursion | base case, calls getting smaller, factorial, fractals | Solve a smaller copy |
| 4 | 👾 Objects | `class`, `__init__`, `self`, methods, separate objects | Blueprints bundle data and actions |
| 5 | 🎮 Game Loops | state per frame, velocity, gravity, collisions | Simulation as small steps |
| 6 | 📊 Data Detective | tallies, averages, most common, text bar charts, misleading data | Question the data |
| 7 | 🤖 How AI Helpers Work | AI helpers guess likely code; prompting with examples; verifying; steering | You stay the captain |
| 8 | 🚀 Capstone | plan, spec, build in pieces, test, polish | Ship your own project |

**The topic threads that run across worlds:**

| Thread | W1 | W2 | W3 | W4 | W5 |
|---|---|---|---|---|---|
| Repetition | `for range` | — | `while`, nested loops | game loop | frame loop, recursion |
| Data | variables | text, booleans | lists, strings | dictionaries, records | objects, datasets |
| Decisions | — | `if`, logic | conditions in loops | spec edge cases | collisions |
| Debugging | error types | edge cases, `try` | reading code | `assert` tests | verifying AI code |
| 🤖 Working with AI | clear instructions | testing | reading code | specs | how AI works and how to steer it |

## 4. Concept rules: what content may use

- **Only use what has been taught.** A problem or book may use concepts from earlier chapters
  of its world, or from earlier worlds, but nothing later. For example, no f-strings in World
  1, no `if` before W2 ch4, no lists before W3 ch2, no `def` before W4 ch1, and no `class`
  before W5 ch4. A small preview inside the book that teaches something is fine, as long as
  the book explains it.
- **Worlds can be started anywhere** (every world is open), so each world's chapter 1 should
  briefly recap what it needs from earlier worlds rather than assume it.
- **Python features kept out on purpose:**
  - `random`, because graded output must be predictable.
  - Real files, networking and imports beyond the built-in `turtle`.
  - Comprehensions, lambdas and `*args`, because they are syntax detail rather than concepts.

## 5. Problem design

| Type | Skill it builds |
|---|---|
| `predict` (output, error, drawing, or what-does-it-mean) | Read code |
| `trace` | Follow variables step by step |
| `fix` | Debug |
| `fill`, `parsons` | Structure, with less typing (good for younger kids) |
| `write` | Build from scratch |
| `breakit` | Testing mindset: find the input that breaks it |
| `instruct` | Give precise instructions to a robot |

**Problem-type counts per world.** As kids get older, the mix shifts from guided types
(`fill`, `parsons`, turtle) toward writing code:

| | Problems | predict | write | fix | fill/parsons | trace | breakit | instruct |
|---|---|---|---|---|---|---|---|---|
| W1 | 114 | 30 | 40 | 22 | 10 | 3 | 2 | 7 |
| W2 | 103 | 37 | 29 | 15 | 5 | 3 | 10 | 4 |
| W3 | 103 | 39 | 32 | 13 | 4 | 9 | 5 | 1 |
| W4 | 103 | 29 | 43 | 13 | 3 | 4 | 7 | 4 |
| W5 | 102 | 29 | 46 | 8 | 2 | 4 | 9 | 4 |

**How a practice lesson flows:** start by reading (a `predict` problem), then a guided type
(`fill`, `fix` or `parsons`), then a full `write`. End with **"Your turn: …"**, a small
creative variation the kid writes themselves.

**Every problem:**
- Has hints that go from a nudge to a bigger hint to almost the answer.
- Has a reference solution that `npm run check` proves correct. Buggy starters must really
  fail, and predict answers must match real Python.
- Shows its goal clearly. Leading spaces and runs of spaces are drawn as visible cells, and a
  prompt should say so when spacing matters ("Each blue box in the 🎯 Goal is one space").
- Avoids ambiguity. If two reasonable answers exist, either accept both (with a custom
  `check`) or reword the problem.

**Tests:** 2 review problems from the chapter, then the boss, which uses the chapter's whole
idea. A chapter 8 boss is open-ended ("Your pixel scene"), with a `check` that tests the
required parts.

## 6. Book (comic) design

A book teaches **one idea**, using the world's characters, in about a minute.

1. **Shape:** 6 panels and about 90–135 words, with a runnable Try-it in most panels.
2. **Story arc:**
   1. **Hook:** a problem the characters face.
   2. **Idea:** the concept, with a tiny example.
   3. **Worked example:** run it and see.
   4. **Variation:** change one thing and predict.
   5. **Common mistake:** Sneak, Glitch, Slime, Zork or Bolt gets it wrong. This mistake
      sets up a practice problem.
   6. **Recap:** the one-sentence rule to remember.
3. **Teach without spoiling:** a panel must never contain the answer to a practice or test
   problem. Use different values or a different example that shows the same idea.
4. **Kid language:** short sentences. Explain every new word the first time it appears.
   Code in Try-its is short (about 1–8 lines).
5. **Layout:** narrow panels come in pairs between `wide` panels. Speakers stand left to right
   in the order they talk. Characters stay within x ≈ 10–86. Bubbles in a narrow two-bubble
   panel are about 13 words or fewer. Every speaker in `bubbles` is also in `cast`. (Why: the
   grid is 2 columns, and bubbles side by side only fit when the speaker order matches their
   positions.)
6. **Book 1 vs Book 2:** Book 1 introduces the chapter's idea. Book 2 extends it (the next
   step, or the trickier case) and prepares for Practice 2 and the test.

## 7. Voice and naming

- Code is called a **spell**, and running it is **Cast Spell**. Py talks *to* the kid
  ("you"). Mistakes are normal and fun to find.
- Feedback points to the exact problem, never just "wrong". Error messages are translated
  into kid language (`explain.ts`).
- Use the world's theme in examples: diamonds and TNT in W1, critters and berries in W2, bricks
  and coins in W3, heroes and gold in W4, planets and aliens in W5. Don't mention real game
  brands.

## 8. Future content ideas (not built)

- Playtest with real kids and tune difficulty.
- A placement or "test out" quiz for each world.
- A Puzzle Lab with extra challenges at difficulty levels 1–4.
- A Campus hub, an activity calendar, and background music for each world.
