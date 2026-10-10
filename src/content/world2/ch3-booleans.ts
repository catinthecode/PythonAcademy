import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch3: Chapter = {
    id: 'ch3',
    title: 'True or False',
    emoji: '⚖️',
    summary: 'Ask Python yes-or-no questions with comparisons, and get True or False back.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Yes-or-No Questions',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Fizz checks its HP bar and asks Py a question.',
                    wide: true,
                    cast: [
                        { who: 'fizz', pose: 'think', x: 28 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'fizz', text: 'Is my HP bigger than 10?' },
                        { who: 'py', text: 'Ask Python! A comparison always answers True or False.' },
                    ],
                    code: py`
                        hp = 15
                        print(hp > 10)
                        print(hp > 20)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A screen lists the comparison symbols.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: '== equal, != not equal, < less, > more, <= less or equal, >= more or equal.' },
                    ],
                    code: py`
                        print(5 == 5)
                        print(5 != 5)
                        print(3 <= 3)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Sneak swaps a double equals sign for a single one; Py catches it.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 28 },
                        { who: 'py', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'Hehe, = and == are the same, right?' },
                        { who: 'py', text: 'NO! = puts a value in a box. == ASKS if two things are equal.' },
                    ],
                    code: py`
                        level = 5
                        print(level == 5)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Ask Python',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Bigger?',
                    prompt: 'What will this code print?',
                    code: py`print(7 > 3)`,
                    choices: ['True', 'False', '7'],
                    answer: 'True',
                    hints: ['Is 7 more than 3?'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Same?',
                    prompt: 'What will this code print?',
                    code: py`print(4 == 5)`,
                    choices: ['True', 'False', '9'],
                    answer: 'False',
                    hints: ['== asks "are these equal?"'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Or equal',
                    prompt: 'What will this code print?',
                    code: py`print(10 >= 10)`,
                    choices: ['True', 'False'],
                    answer: 'True',
                    hints: ['>= means "more than OR equal to".'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Capital letters count',
                    prompt: 'What will this code print?',
                    code: py`print("Fizz" == "fizz")`,
                    choices: ['True', 'False'],
                    answer: 'False',
                    hints: ['To Python, F and f are different letters.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Strong enough?',
                    prompt: 'Make `hp = 25`, then print whether hp is MORE than 20 (the answer should be True).',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        hp = 25
                        print(hp > 20)
                    `,
                    check: py`
                        assert ">" in source, "Use > to compare."
                        assert same_output(output, expected_output), "It should print True."
                    `,
                    hints: ['print(hp > 20)'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'True and False in Boxes',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Rae puts a True card into a chest labelled can_battle.',
                    cast: [{ who: 'rae', pose: 'point', x: 30 }],
                    props: [{ item: 'chest', x: 68, y: 100 }],
                    bubbles: [{ who: 'rae', text: 'You can keep the answer in a variable. can_battle holds True or False!' }],
                    code: py`
                        hp = 12
                        can_battle = hp > 0
                        print(can_battle)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Py compares a text "5" with a number 5.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'fizz', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Careful: the text "5" and the number 5 are NOT equal!' }],
                    code: py`
                        print("5" == 5)
                        print(5 == 5)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Blazewing is about to evolve and glows.',
                    wide: true,
                    cast: [
                        { who: 'blaze', pose: 'surprised', x: 30 },
                        { who: 'rae', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'rae', text: 'Blazewing evolves at level 16 or more. That is level >= 16!' }],
                    code: py`
                        level = 16
                        can_evolve = level >= 16
                        print("Can evolve:", can_evolve)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Question Boxes',
            problems: [
                {
                    id: 'p5',
                    type: 'fix',
                    title: 'One equals or two?',
                    prompt: 'This should ASK whether level equals 5, and print True. Fix it!',
                    starter: py`
                        level = 5
                        print(level = 5)
                    `,
                    solution: py`
                        level = 5
                        print(level == 5)
                    `,
                    hints: ['To ask "is it equal?", use two equals signs.'],
                },
                {
                    id: 'p6',
                    type: 'trace',
                    title: 'Still standing?',
                    prompt: 'Fizz takes 5 damage each turn. Fill in `hp` and `alive` each time line 4 finishes.',
                    code: py`
                        hp = 12
                        for i in range(3):
                            hp = hp - 5
                            alive = hp > 0
                    `,
                    line: 4,
                    columns: ['hp', 'alive'],
                    rows: [['7', 'True'], ['2', 'True'], ['-3', 'False']],
                    hints: ['12 - 5 is 7. Is 7 more than 0?', 'The third time, hp goes below zero.'],
                },
                {
                    id: 'p7',
                    type: 'predict',
                    title: 'Not equal',
                    prompt: 'What will this code print?',
                    code: py`print(3 != 3)`,
                    choices: ['True', 'False'],
                    answer: 'False',
                    hints: ['!= asks "are these different?" Are they?'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    about: 'meaning',
                    title: 'What does it mean?',
                    prompt: 'Which sentence describes line 2?',
                    code: py`
                        level = 20
                        can_evolve = level >= 16
                    `,
                    choices: [
                        'can_evolve is True when level is 16 or more.',
                        'can_evolve is True only when level is exactly 16.',
                        'It sets level to 16.',
                    ],
                    answer: 'can_evolve is True when level is 16 or more.',
                    hints: ['>= means "more than or equal to".'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Ready to evolve',
                    prompt: 'Make `level = 16`, store `level >= 16` in a variable called `can_evolve`, then print it.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        level = 16
                        can_evolve = level >= 16
                        print(can_evolve)
                    `,
                    check: py`
                        assert globals().get("can_evolve") is True, "Make can_evolve hold the answer to level >= 16."
                        assert ">=" in source, "Use >= to compare."
                        assert same_output(output, expected_output), "Print can_evolve."
                    `,
                    hints: ['can_evolve = level >= 16', 'print(can_evolve)'],
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
                    title: 'Math then compare',
                    prompt: 'What will this code print?',
                    code: py`print(2 + 2 == 4)`,
                    choices: ['True', 'False', '4'],
                    answer: 'True',
                    hints: ['Python does the math first, then asks the question.'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Evolution bug',
                    prompt: 'Blazewing evolves at level 16 OR MORE. Bolt\'s code has a bug. Find a level that shows it!',
                    robot: py`print("Evolve:", level > 16)`,
                    correct: py`print("Evolve:", level >= 16)`,
                    inputName: 'level',
                    choices: ['10', '16', '20'],
                    answer: '16',
                    hints: ['> and >= only disagree at one special number.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Tournament check',
                    prompt: 'Make `level = 12` and `stars = 3`. Print the two 🎯 Goal lines: is level at least 10, and does Fizz have exactly 5 stars?',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        level = 12
                        stars = 3
                        print("Level OK:", level >= 10)
                        print("Has 5 stars:", stars == 5)
                    `,
                    check: py`
                        assert ">=" in source and "==" in source, "Use >= for 'at least' and == for 'exactly'."
                        assert same_output(output, expected_output), "Match both goal lines."
                    `,
                    hints: ['print("Level OK:", level >= 10)', 'print("Has 5 stars:", stars == 5)'],
                },
            ],
        },
    ],
};
