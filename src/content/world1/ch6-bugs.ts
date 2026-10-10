import { py } from '../helpers';
import type { Chapter } from '../schema';

const ERRORS = ['SyntaxError', 'NameError', 'IndentationError', 'TypeError', 'No error'];

export const ch6: Chapter = {
    id: 'ch6',
    title: "Sneak's Bug Hunt",
    emoji: '🐛',
    summary: 'Read error messages like clues and squash every bug.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Reading the Clues',
            panels: [
                {
                    scene: 'night',
                    alt: 'At night, Sneak sneaks toward a glowing screen carrying a bag of bugs.',
                    wide: true,
                    cast: [{ who: 'sneak', pose: 'happy', x: 40 }],
                    props: [
                        { item: 'bug', x: 58, y: 80 },
                        { item: 'bug', x: 66, y: 92, scale: 0.8 },
                    ],
                    bubbles: [{ who: 'sneak', text: "Sssss... time to plant some bugs in Max's code!" }],
                },
                {
                    scene: 'screen',
                    alt: 'Next morning, Max panics at a screen full of red errors. Py stays calm.',
                    cast: [
                        { who: 'max', pose: 'surprised', x: 28 },
                        { who: 'py', pose: 'talk', x: 74, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'AAAH! Everything is broken!' },
                        { who: 'py', text: 'Every programmer makes bugs. Even me! The trick is to read the clues.' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py points at an error message, which shows the line number like a treasure map.',
                    cast: [{ who: 'py', pose: 'point', x: 28 }],
                    props: [{ item: 'magnifier', x: 72, y: 75 }],
                    bubbles: [{ who: 'py', text: 'An error tells you WHAT went wrong and WHICH line. Like a treasure map!' }],
                    code: py`
                        print("Max")
                        print("Sneak)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py and Max study wanted posters of the first two bug types.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'max', pose: 'think', x: 78, flip: true },
                    ],
                    props: [{ item: 'sign', x: 52, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'SyntaxError: a typo in Python grammar, like a missing quote, colon or bracket.' },
                        { who: 'py', text: "NameError: Python doesn't know that word. Check your spelling!" },
                    ],
                    code: py`print(score)`,
                },
                {
                    scene: 'village',
                    alt: 'Two more wanted posters for the other bug types.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'max', pose: 'surprised', x: 78, flip: true },
                    ],
                    props: [{ item: 'sign', x: 52, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'IndentationError: the spaces at the start of a line are wrong.' },
                        { who: 'py', text: "TypeError: mixing things that don't go together, like text + a number." },
                    ],
                    code: py`print("Score: " + 10)`,
                },
                {
                    scene: 'screen',
                    alt: 'Max wears a detective hat and points at the error message, then at a missing letter in the code.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 22 },
                        { who: 'max', pose: 'happy', x: 75, flip: true },
                    ],
                    props: [{ item: 'magnifier', x: 50, y: 75 }],
                    bubbles: [
                        { who: 'py', text: 'Be a detective. Read the LAST line of the error first: it names the bug. Then go to the line number it shows.' },
                        { who: 'max', text: "NameError, line 2: 'torch'... but my chest is called torches! Spelling!" },
                    ],
                    code: py`
                        torches = 4
                        print(torch)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Name That Bug',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    about: 'error',
                    title: 'Name that bug #1',
                    prompt: 'What happens when Python runs this?',
                    code: py`print("Boom)`,
                    choices: ERRORS,
                    answer: 'SyntaxError',
                    hints: [
                        'Count the quote marks.',
                        'A missing quote is a grammar typo.',
                    ],
                },
                {
                    id: 'p2',
                    type: 'fix',
                    title: 'Twisted word',
                    prompt: 'Fix the bug so Python prints `Sssss`.',
                    starter: py`pirnt("Sssss")`,
                    solution: py`print("Sssss")`,
                    hints: [
                        'Read the first word slowly, letter by letter.',
                        'pirnt should be print.',
                    ],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    about: 'error',
                    title: 'Name that bug #2',
                    prompt: 'What happens when Python runs this?',
                    code: py`
                        for i in range(3):
                        print("hi")
                    `,
                    choices: ERRORS,
                    answer: 'IndentationError',
                    hints: [
                        'Look at the start of line 2.',
                        'Lines inside a loop must be pushed in.',
                    ],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    turtle: true,
                    title: 'Missing colon',
                    prompt: 'Fix the bug so Shelly draws a square.',
                    starter: py`
                        from turtle import *
                        for i in range(4)
                            forward(100)
                            left(90)
                    `,
                    solution: py`
                        from turtle import *
                        for i in range(4):
                            forward(100)
                            left(90)
                    `,
                    hints: [
                        'Look at the end of the for line.',
                        'Every for line ends with a colon :',
                    ],
                },
                {
                    id: 'p5',
                    type: 'fix',
                    title: 'Lost diamonds',
                    prompt: "Python says it doesn't know a name. Fix it so the code prints `5`.",
                    starter: py`
                        diamonds = 5
                        print(diamond)
                    `,
                    solution: py`
                        diamonds = 5
                        print(diamonds)
                    `,
                    hints: [
                        'Compare the chest name on line 1 with the name on line 2.',
                        'One letter is missing on line 2.',
                    ],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: "Your turn: Bug-free!",
                    prompt: "Write a program with NO bugs that prints `Bug-free!` three times using a loop.",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        for i in range(3):
                            print("Bug-free!")
                    `,
                    check: 'assert "for" in source, "Use a for loop!"',
                    hints: ["Watch out for the colon and the spaces!"],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Sneaky Bugs',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Shelly has drawn a square with one side missing while Sneak giggles. There is no error message.',
                    wide: true,
                    cast: [
                        { who: 'shelly', pose: 'sad', x: 30 },
                        { who: 'sneak', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'shelly', text: 'I was asked for a square, but one side is missing!' },
                        { who: 'sneak', text: 'The sneakiest bugs make NO error at all. Hehehe!' },
                    ],
                    code: py`
                        from turtle import *
                        for i in range(3):
                            forward(100)
                            left(90)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Py explains that you should always check the result, not just look for errors.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 30 },
                        { who: 'shelly', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'It runs, but does the wrong thing. Always check the result against the goal!' },
                        { who: 'shelly', text: 'A square needs 4 sides. That 3 should be a 4!' },
                    ],
                },
                {
                    scene: 'cave',
                    alt: 'Sneak points at a print line that shows the word gems instead of the number 7.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'think', x: 75, flip: true },
                    ],
                    props: [{ item: 'diamond', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'sneak', text: 'Here is another one. No error!' },
                        { who: 'py', text: 'Python is happy, but it printed the word gems, not the 7.' },
                    ],
                    code: py`
                        gems = 7
                        print("gems")
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Max holds the goal next to his output and compares them line by line.',
                    cast: [
                        { who: 'max', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'Goal: Dig, Dig, Done! I get Done! twice.' },
                        { who: 'py', text: 'Compare line by line. Done! is pushed in, so it repeats!' },
                    ],
                    code: py`
                        for i in range(2):
                            print("Dig")
                            print("Done!")
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Py squashes bugs one at a time with a fly swatter.',
                    cast: [{ who: 'py', pose: 'happy', x: 35 }],
                    props: [
                        { item: 'swatter', x: 55, y: 70 },
                        { item: 'bug', x: 70, y: 100 },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Lots of bugs? Fix ONE, run again, and read the next clue. One at a time!' },
                    ],
                    caption: 'Two bugs here! Fix one, run, then fix the other.',
                    code: py`Print("Hello)`,
                },
                {
                    scene: 'meadow',
                    alt: 'Max and Py hold up fly swatters, ready for action.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'happy', x: 25 },
                        { who: 'max', pose: 'happy', x: 72, flip: true },
                    ],
                    props: [{ item: 'swatter', x: 50, y: 65 }],
                    bubbles: [
                        { who: 'py', text: 'Bug hunter rules: an error? Read the clue and the line number. No error? Check the result against the goal.' },
                        { who: 'max', text: "Got it. Let's squash 'em!" },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Bug Squashing',
            problems: [
                {
                    id: 'p6',
                    type: 'predict',
                    about: 'error',
                    title: 'Name that bug #3',
                    prompt: 'What happens when Python runs this?',
                    code: py`
                        blocks = "10"
                        print(blocks + 5)
                    `,
                    choices: ERRORS,
                    answer: 'TypeError',
                    hints: [
                        'Is blocks text or a number? Look for quotes.',
                        "You can't add text and a number.",
                    ],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Double trouble',
                    prompt: 'Sneak planted TWO bugs in this line. Fix both so it prints `Sneak`.',
                    starter: py`Print("Sneak)`,
                    solution: py`print("Sneak")`,
                    hints: [
                        'Fix one bug, run it, and read the next clue.',
                        'One bug is a capital letter. The other is a missing quote.',
                    ],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    about: 'error',
                    title: 'Name that bug #4',
                    prompt: 'Tricky one! What happens when Python runs this?',
                    code: py`
                        torch = 3
                        print("torch")
                    `,
                    choices: ERRORS,
                    answer: 'No error',
                    hints: [
                        'Is anything actually wrong with these lines?',
                        'It prints the word torch. Maybe not what you wanted, but Python is happy.',
                    ],
                },
                {
                    id: 'p9',
                    type: 'fix',
                    turtle: true,
                    title: 'Sneaky triangle',
                    prompt: "This should draw a triangle, but it doesn't. There is no error message! Find the sneaky bug.",
                    starter: py`
                        from turtle import *
                        for i in range(3):
                            forward(100)
                            left(90)
                    `,
                    solution: py`
                        from turtle import *
                        for i in range(3):
                            forward(100)
                            left(120)
                    `,
                    hints: [
                        'The loop runs 3 times, which is right for a triangle.',
                        'Triangle corners need a turn of 120, not 90.',
                    ],
                },
                {
                    id: 'p10',
                    type: 'fix',
                    title: 'Missing torch',
                    prompt: 'We need 4 torches, but we only get 3. Fix it!',
                    starter: py`
                        for i in range(3):
                            print("🔥 torch")
                    `,
                    solution: py`
                        for i in range(4):
                            print("🔥 torch")
                    `,
                    hints: ['Which number controls how many times the loop runs?'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    turtle: true,
                    title: "Your turn: Clean triangle",
                    prompt: "Write it from scratch, with no bugs: a triangle with sides of 70, using a loop.",
                    starter: py`
                        from turtle import *
                        # Your turn! Write the rest yourself.
                    `,
                    solution: py`
                        from turtle import *
                        for i in range(3):
                            forward(70)
                            left(120)
                    `,
                    check: 'assert "for" in source, "Use a for loop!"',
                    hints: ["3 sides, turn 120 each time."],
                },
            ],
        },
        {
            kind: 'test',
            id: 'test',
            title: 'Chapter Test',
            problems: [
                {
                    id: 't1',
                    type: 'predict',
                    about: 'error',
                    title: 'Name that bug #5',
                    prompt: 'What happens when Python runs this?',
                    code: py`Print("Hello")`,
                    choices: ERRORS,
                    answer: 'NameError',
                    hints: ['Python only knows print with a small p.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Text trap',
                    prompt: 'Fix the bug so Python prints `5`.',
                    starter: py`
                        diamonds = "3"
                        print(diamonds + 2)
                    `,
                    solution: py`
                        diamonds = 3
                        print(diamonds + 2)
                    `,
                    hints: [
                        'Is diamonds a number or text?',
                        'Remove the quotes so it is a number.',
                    ],
                },
                {
                    id: 'boss',
                    type: 'fix',
                    turtle: true,
                    boss: true,
                    title: "BOSS: Sneak's house",
                    prompt: "Sneak hid THREE bugs in Max's house code. Squash them all so it matches the goal!",
                    starter: py`
                        from turtle import *
                        for i in range(4)
                            forwrd(100)
                            left(90)
                        left(90)
                        forward(100)
                        right(90)
                        left(60)
                        forward(100)
                        right(100)
                        forward(100)
                    `,
                    solution: py`
                        from turtle import *
                        for i in range(4):
                            forward(100)
                            left(90)
                        left(90)
                        forward(100)
                        right(90)
                        left(60)
                        forward(100)
                        right(120)
                        forward(100)
                    `,
                    hints: [
                        'Fix the error messages first, one at a time.',
                        'Bug 1 is a missing colon. Bug 2 is a misspelled word.',
                        'Bug 3 makes no error: the roof needs right(120), like a triangle corner.',
                    ],
                },
            ],
        },
    ],
};
