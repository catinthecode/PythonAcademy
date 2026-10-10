import { py } from '../helpers';
import type { Chapter } from '../schema';

const QUIZ = py`
    questions = [
        {"q": "What planet is closest to the Sun?", "a": "mercury"},
        {"q": "How many legs does a spider have?", "a": "8"},
        {"q": "What gas do plants breathe in?", "a": "carbon dioxide"},
    ]
`;

export const ch8: Chapter = {
    id: 'ch8',
    title: 'Capstone',
    emoji: '🚀',
    summary: 'Plan, spec, build in pieces, test and polish a project that is all yours.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Your Big Project',
            panels: [
                {
                    scene: 'space',
                    alt: 'Nova, Zork, Bolt and Py stand in front of a giant launch pad.',
                    wide: true,
                    cast: [
                        { who: 'nova', pose: 'happy', x: 15 },
                        { who: 'zork', pose: 'happy', x: 37 },
                        { who: 'bolt', pose: 'wave', x: 62 },
                        { who: 'py', pose: 'talk', x: 85, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Time for your capstone: a project that uses everything you know!' },
                        { who: 'nova', text: 'Where do I even start?' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py shows the five steps of a project: plan, spec, pieces, test, polish.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: '1) PLAN what it does. 2) SPEC each function. 3) BUILD small pieces. 4) TEST them. 5) POLISH names and messages.' },
                    ],
                },
                {
                    scene: 'space',
                    alt: 'Nova sketches a quiz game made of small parts.',
                    cast: [
                        { who: 'nova', pose: 'point', x: 30 },
                        { who: 'zork', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'nova', text: 'Example: a quiz game. Questions in a list of dictionaries, an ask() function, a score, and a grade at the end.' }],
                    code: QUIZ + '\n' + py`
                        for item in questions:
                            print(item["q"])
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Nova writes a spec card for one piece of her quiz.',
                    cast: [
                        { who: 'nova', pose: 'talk', x: 25 },
                        { who: 'bolt', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'nova', text: 'Spec first: "ask(item) shows the question and returns True or False."' },
                        { who: 'bolt', text: 'Now anyone could build it. Even me!' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'A tiny progress bar fills up as tests pass.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'nova', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Build the tiniest piece, then test it right away.' },
                        { who: 'nova', text: 'A progress bar, tested before I use it!' },
                    ],
                    code: py`
                        def progress(done, total):
                            return "#" * done + "-" * (total - done)

                        assert progress(2, 5) == "##---"
                        assert progress(0, 3) == "---"
                        print(progress(3, 5))
                    `,
                },
                {
                    scene: 'space',
                    alt: 'A rocket on the launch pad. Five checklist lights turn green one by one.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'nova', pose: 'happy', x: 52 },
                        { who: 'zork', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Plan it, spec each piece, build small, test as you go, then polish. That is how real software gets made.' },
                        { who: 'nova', text: 'Countdown to launch!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Quiz Pieces',
            problems: [
                {
                    id: 's1',
                    type: 'write',
                    title: 'Piece 1: ask()',
                    prompt: 'Write `def ask(item):` that prints the question, reads an answer with `input("> ")`, and returns True if it matches item["a"] (ignore capitals and extra spaces), otherwise False. Print `ask(questions[0])`.',
                    starter: QUIZ,
                    solution: QUIZ + '\n' + py`
                        def ask(item):
                            print(item["q"])
                            answer = input("> ")
                            return answer.strip().lower() == item["a"]

                        print(ask(questions[0]))
                    `,
                    inputs: [' Mercury '],
                    check: py`
                        assert "False" in run_with(["venus"]), "A wrong answer should return False."
                        assert same_output(output, expected_output), '" Mercury " should count as right (ignore capitals and spaces).'
                    `,
                    hints: ['answer.strip() removes extra spaces; .lower() ignores capitals.', 'return answer.strip().lower() == item["a"]'],
                },
                {
                    id: 's2',
                    type: 'write',
                    title: 'Piece 2: grade()',
                    prompt: 'Write `def grade(score, total):` returning `Perfect!` if all right, `Great job!` for 50% or more, otherwise `Keep practising!`. Add 3 asserts (one per message), then print `grade(2, 3)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def grade(score, total):
                            if score == total:
                                return "Perfect!"
                            if score / total >= 0.5:
                                return "Great job!"
                            return "Keep practising!"

                        assert grade(3, 3) == "Perfect!"
                        assert grade(2, 4) == "Great job!"
                        assert grade(1, 3) == "Keep practising!"
                        print(grade(2, 3))
                    `,
                    check: py`
                        f = function("grade")
                        assert f(5, 5) == "Perfect!" and f(5, 10) == "Great job!" and f(4, 10) == "Keep practising!", "Check all three messages, including exactly 50%."
                        assert source.count("assert grade(") >= 3, "Write 3 asserts."
                        assert same_output(output, expected_output), "print(grade(2, 3))"
                    `,
                    hints: ['Check for a perfect score first.', 'score / total >= 0.5 means 50% or more.'],
                },
                {
                    id: 's3',
                    type: 'write',
                    title: 'Piece 3: The game',
                    prompt: '`ask` and `grade` are done. Loop over all the questions, count the right answers, then print `Score: N/3` and the grade.',
                    starter: QUIZ + '\n' + py`
                        def ask(item):
                            print(item["q"])
                            answer = input("> ")
                            return answer.strip().lower() == item["a"]

                        def grade(score, total):
                            if score == total:
                                return "Perfect!"
                            if score / total >= 0.5:
                                return "Great job!"
                            return "Keep practising!"
                    `,
                    solution: QUIZ + '\n' + py`
                        def ask(item):
                            print(item["q"])
                            answer = input("> ")
                            return answer.strip().lower() == item["a"]

                        def grade(score, total):
                            if score == total:
                                return "Perfect!"
                            if score / total >= 0.5:
                                return "Great job!"
                            return "Keep practising!"

                        score = 0
                        for item in questions:
                            if ask(item):
                                score += 1
                        print(f"Score: {score}/{len(questions)}")
                        print(grade(score, len(questions)))
                    `,
                    inputs: ['mercury', '6', 'carbon dioxide'],
                    check: py`
                        out = run_with(["mercury", "8", "carbon dioxide"])
                        assert "Score: 3/3" in out and "Perfect!" in out, "All right answers should give Score: 3/3 and Perfect!"
                        assert same_output(output, expected_output), "Match the goal for these answers."
                    `,
                    hints: ['score = 0, then for item in questions: if ask(item): score += 1', 'print(f"Score: {score}/{len(questions)}")'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Add a question',
                    prompt: 'Append a 4th question of your own to `questions` (a dictionary with "q" and "a", the answer in lowercase). Then print how many questions there are.',
                    starter: QUIZ,
                    solution: QUIZ + '\n' + py`
                        questions.append({"q": "What is 7 x 6?", "a": "42"})
                        print(len(questions), "questions")
                    `,
                    hideGoal: true,
                    check: py`
                        assert len(questions) == 4, "There should be 4 questions."
                        new = questions[3]
                        assert isinstance(new, dict) and "q" in new and "a" in new, 'Your question needs "q" and "a" keys.'
                        assert new["a"] == new["a"].lower(), "Write the answer in lowercase so ask() can match it."
                        assert "4" in output, "Print how many questions there are."
                    `,
                    hints: ['questions.append({"q": "...", "a": "..."})'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Polish and Launch',
            panels: [
                {
                    scene: 'room',
                    alt: 'Bolt offers to help polish; Nova hands it a clear request.',
                    wide: true,
                    cast: [
                        { who: 'bolt', pose: 'talk', x: 28 },
                        { who: 'nova', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'bolt', text: 'Want me to add a feature?' },
                        { who: 'nova', text: 'Yes, with a clear spec and examples. Then I\'ll test it before I trust it!' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py shows a polish checklist.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'Polish: clear names, friendly messages, tests for the edges, and no code you don\'t understand.' }],
                },
                {
                    scene: 'space',
                    alt: 'A rocket launches as everyone cheers.',
                    cast: [
                        { who: 'zork', pose: 'happy', x: 30 },
                        { who: 'nova', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'zork', text: 'Your project, your ideas. Make it weird, make it fun, make it YOURS!' }],
                },
                {
                    scene: 'screen',
                    alt: 'A blank answer box shows a friendly help message.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'nova', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Friendly messages tell players what to do next.' },
                        { who: 'nova', text: 'Much nicer than a crash!' },
                    ],
                    code: py`
                        answer = ""
                        if answer == "":
                            print("Type an answer, then press Enter!")
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Zork play-tests the quiz and types an answer with an exclamation mark.',
                    cast: [
                        { who: 'zork', pose: 'surprised', x: 25 },
                        { who: 'nova', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'zork', text: 'I typed "Mercury!" and it said WRONG!' },
                        { who: 'nova', text: 'Play-testers find edges I never thought of!' },
                    ],
                    code: py`
                        answer = "Mercury!"
                        print(answer.strip().lower() == "mercury")
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Everyone waves as a rocket with the player\'s name on it lifts off.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 15 },
                        { who: 'nova', pose: 'happy', x: 38 },
                        { who: 'zork', pose: 'happy', x: 60 },
                        { who: 'bolt', pose: 'wave', x: 84, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Print, loops, lists, functions, tests, objects, algorithms... and how to captain an AI. Now build something amazing!' },
                        { who: 'bolt', text: 'I will be right here to help. You are the captain!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'More Project Ideas',
            problems: [
                {
                    id: 's4',
                    type: 'write',
                    turtle: true,
                    title: 'Idea: Star field',
                    prompt: 'Drawing project piece: write `def star(size):` (5 lines of size, turning right 144) and draw stars of size 40 at (-100, 50), (0, 0) and (100, 50).',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *

                        def star(size):
                            for i in range(5):
                                forward(size)
                                right(144)

                        for x, y in [(-100, 50), (0, 0), (100, 50)]:
                            penup()
                            goto(x, y)
                            pendown()
                            star(40)
                    `,
                    check: 'function("star")',
                    hints: ['def star(size): with a loop of 5.', 'For each spot: penup, goto, pendown, star(40).'],
                },
                {
                    id: 's5',
                    type: 'write',
                    title: 'Idea: Alien colony',
                    prompt: 'Simulation piece: a colony starts with 10 aliens and grows by half (rounded down, `//`) each year. Print each year until there are more than 100, like the 🎯 Goal.',
                    starter: py`aliens = 10`,
                    solution: py`
                        aliens = 10
                        year = 0
                        while aliens <= 100:
                            year += 1
                            aliens += aliens // 2
                            print("Year", year, ":", aliens, "aliens")
                    `,
                    check: py`
                        assert "while" in source, "Keep going with a while loop."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['aliens += aliens // 2 each year.', 'Keep going while aliens <= 100.'],
                },
                {
                    id: 's6',
                    type: 'instruct',
                    title: 'Feature request',
                    prompt: 'You want Bolt to add a "hint" feature to the quiz. Which request gets the 🎯 Goal?',
                    goalCode: py`
                        def hint(answer):
                            return answer[0] + "_" * (len(answer) - 1)

                        print(hint("mercury"))
                    `,
                    choices: [
                        { text: 'Add hints.', code: py`
                            def hint(answer):
                                return "Think harder!"

                            print(hint("mercury"))
                        ` },
                        { text: 'hint(answer) returns the first letter, then an underscore for every other letter. hint("moon") is "m___".', code: py`
                            def hint(answer):
                                return answer[0] + "_" * (len(answer) - 1)

                            print(hint("mercury"))
                        ` },
                    ],
                    answer: 1,
                    hints: ['Which request has an exact example?'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Polish it',
                    prompt: 'This messy code works but is hard to read. Rewrite it as `def count_long_words(text, n):` that returns how many words have more than n letters, with clear names. Print `count_long_words("the stars are shining tonight", 4)`.',
                    starter: py`
                        t = "the stars are shining tonight"
                        c = 0
                        for w in t.split():
                            if len(w) > 4:
                                c = c + 1
                        print(c)
                    `,
                    solution: py`
                        def count_long_words(text, n):
                            count = 0
                            for word in text.split():
                                if len(word) > n:
                                    count += 1
                            return count

                        print(count_long_words("the stars are shining tonight", 4))
                    `,
                    check: py`
                        f = function("count_long_words")
                        assert f("a bb ccc dddd", 2) == 2 and f("", 3) == 0, "Check it with other sentences too."
                        assert same_output(output, expected_output), "Print the answer for the stars sentence."
                    `,
                    hints: ['Move the logic into the function and replace t, c, w with text, count, word.'],
                },
            ],
        },
        {
            kind: 'test',
            id: 'test',
            title: 'Capstone Launch',
            problems: [
                {
                    id: 't1',
                    type: 'predict',
                    title: 'Quiz score',
                    prompt: 'What will this code print?',
                    code: py`
                        answers = [True, False, True, True]
                        score = 0
                        for right in answers:
                            if right:
                                score += 1
                        print(f"{score}/{len(answers)}")
                    `,
                    choices: ['3/4', '4/4', '1/4'],
                    answer: '3/4',
                    hints: ['Count the Trues.'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Picky answers',
                    prompt: 'The quiz should accept answers with any capitals or extra spaces. Find the answer that breaks Bolt\'s check (the right answer is "mars").',
                    robot: py`print(answer == "mars")`,
                    correct: py`print(answer.strip().lower() == "mars")`,
                    inputName: 'answer',
                    choices: ['"mars"', '"Mars "', '"venus"'],
                    answer: '"Mars "',
                    hints: ['Try different capitals and a stray space.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    hideGoal: true,
                    title: 'BOSS: Your capstone',
                    prompt: 'Build YOUR project: a quiz, a game, a simulation, a drawing generator... anything! Requirements: at least 2 functions you define, a loop, an if, a list or dictionary, and at least 2 asserts that test your functions. It must also print or draw something. The purple box shows answers we\'ll type if your project uses input().',
                    starter: py`
                        # My project: ...
                        # Plan:
                        # 1.
                        # 2.
                        # 3.
                    `,
                    solution: QUIZ + '\n' + py`
                        def ask(item):
                            print(item["q"])
                            answer = input("> ")
                            return answer.strip().lower() == item["a"]

                        def grade(score, total):
                            if score == total:
                                return "Perfect!"
                            if score / total >= 0.5:
                                return "Great job!"
                            return "Keep practising!"

                        assert grade(3, 3) == "Perfect!"
                        assert grade(0, 3) == "Keep practising!"

                        score = 0
                        for item in questions:
                            if ask(item):
                                score += 1
                        print(f"Score: {score}/{len(questions)}")
                        print(grade(score, len(questions)))
                    `,
                    inputs: ['mercury', '8', 'carbon dioxide', 'yes', 'yes', 'yes'],
                    check: py`
                        import turtle as _t
                        defs = source.count("def ")
                        assert defs >= 2, f"Define at least 2 functions (you have {defs})."
                        assert "for " in source or "while " in source, "Use at least one loop."
                        assert "if " in source, "Use at least one if."
                        assert "[" in source or "{" in source, "Use a list or a dictionary."
                        assert source.count("assert ") >= 2, "Write at least 2 asserts to test your functions."
                        assert output.strip() or _t._drawing(), "Your project should print or draw something."
                    `,
                    hints: [
                        'Start small: get one function working and tested, then add the next.',
                        'You can build on the quiz from this chapter, or start something totally new.',
                        'Stuck on an idea? A dice game, a story generator, a pattern drawer, or a pet simulator.',
                    ],
                },
            ],
        },
    ],
};
