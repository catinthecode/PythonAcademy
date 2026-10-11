import { py } from '../helpers';
import type { Chapter } from '../schema';

const USE_LOOP = 'assert "for" in source, "Use a for loop to make the pattern!"';

export const ch5: Chapter = {
    id: 'ch5',
    title: 'Growing Patterns',
    emoji: '🌀',
    summary: 'The loop variable changes every time around. Use it to make patterns that grow.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'The Counting Loop',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Max looks at a staircase where every step is taller than the last.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'How do I make each step a bit bigger than the last one?' },
                        { who: 'py', text: 'Use the loop variable! It changes every time the loop goes around.' },
                    ],
                    code: py`
                        for i in range(5):
                            print(i)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py holds up number signs from 1 to 5, with a sign for 6 crossed out.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    props: [{ item: 'sign', x: 65, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'range(1, 6) starts at 1 and stops just BEFORE 6. So you get 1, 2, 3, 4, 5.' },
                    ],
                    code: py`
                        for i in range(1, 6):
                            print(i)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Max counts by tens on his fingers while Py writes i * 10.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'max', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'You can do math with i! i * 10 counts in tens.' },
                        { who: 'max', text: '10, 20, 30... like magic!' },
                    ],
                    code: py`
                        for i in range(1, 4):
                            print(i * 10)
                    `,
                },
                {
                    scene: 'cave',
                    alt: 'Max drops more and more diamonds into a chest each time around.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'max', pose: 'happy', x: 75, flip: true },
                    ],
                    props: [{ item: 'chest', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'A chest can grow in a loop. Each time, add i to total.' },
                        { who: 'max', text: '10 + 1 is 11, then 11 + 2 is 13...' },
                    ],
                    code: py`
                        total = 10
                        for i in range(1, 4):
                            total = total + i
                            print(total)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Max looks puzzled at a list that stops at 4. Sneak giggles behind a sign.',
                    cast: [
                        { who: 'max', pose: 'sad', x: 25 },
                        { who: 'sneak', pose: 'happy', x: 52, y: 95, scale: 0.8 },
                        { who: 'py', pose: 'talk', x: 78, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'max', text: 'I wanted 1 to 5, but I got 1 to 4!' },
                        { who: 'py', text: 'range stops BEFORE the second number. Ask for one more.' },
                    ],
                    caption: 'Can you fix it to print 1 to 5?',
                    code: py`
                        for i in range(1, 5):
                            print(i)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly walks in a square spiral that gets bigger and bigger.',
                    wide: true,
                    cast: [
                        { who: 'shelly', pose: 'happy', x: 35 },
                        { who: 'max', pose: 'surprised', x: 78, flip: true },
                    ],
                    bubbles: [
                        { who: 'shelly', text: 'Use i in my steps, and I walk farther every time. A spiral!' },
                    ],
                    code: py`
                        from turtle import *
                        for i in range(1, 20):
                            forward(i * 10)
                            left(90)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Watch i Change',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Start at one',
                    prompt: 'What will this code print?',
                    code: py`
                        for i in range(1, 4):
                            print(i)
                    `,
                    choices: ['0\n1\n2', '1\n2\n3', '1\n2\n3\n4'],
                    answer: '1\n2\n3',
                    hints: [
                        'range(1, 4) starts at 1.',
                        'It stops just before 4.',
                    ],
                },
                {
                    id: 'p2',
                    type: 'trace',
                    title: 'Diamond counter',
                    prompt: 'Max adds diamonds to his chest in a loop. Fill in the table: what are `i` and `total` each time line 3 finishes?',
                    code: py`
                        total = 0
                        for i in range(1, 4):
                            total = total + i
                    `,
                    line: 3,
                    columns: ['i', 'total'],
                    rows: [['1', '1'], ['2', '3'], ['3', '6']],
                    hints: [
                        'The first time, i is 1 and total was 0. So total becomes 0 + 1.',
                        'Each time, take the old total and add the new i.',
                    ],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Counting by tens',
                    prompt: 'What will this code print?',
                    code: py`
                        for i in range(3):
                            print(i * 10)
                    `,
                    choices: ['10\n20\n30', '0\n10\n20', '0\n1\n2'],
                    answer: '0\n10\n20',
                    hints: [
                        'i is 0, then 1, then 2.',
                        '* means times. What is 0 × 10?',
                    ],
                },
                {
                    id: 'p4',
                    type: 'fill',
                    title: 'Count to five',
                    prompt: 'Fill in the gap so the loop prints 1, 2, 3, 4, 5.',
                    template: py`
                        for i in range(1, ___):
                            print(i)
                    `,
                    answers: ['6'],
                    hints: ['range stops just BEFORE the second number.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: "Your turn: Count to ten",
                    prompt: "Use a loop to print 1 to 10, like the 🎯 Goal box.",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        for i in range(1, 11):
                            print(i)
                    `,
                    check: 'assert "for" in source, "Use a for loop!"',
                    hints: ["range(1, 11) gives 1 up to 10."],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Patterns That Grow',
            panels: [
                {
                    scene: 'room',
                    alt: 'Py shows that text times a number repeats the text.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'max', pose: 'surprised', x: 74, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'A trick: text times a number repeats it. "#" * 3 makes ###.' },
                        { who: 'max', text: 'Then "#" * i makes a longer line every time!' },
                    ],
                    code: py`
                        for i in range(1, 5):
                            print("#" * i)
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Py reads the loop slowly, one turn at a time, as Max follows along.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'max', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Read it like Python. i is 1: "#" * 1 is #. i is 2: ##.' },
                        { who: 'max', text: 'One more # every time!' },
                    ],
                    caption: 'Any text works. Try "Ha" * 3!',
                    code: py`print("Ha" * 3)`,
                },
                {
                    scene: 'village',
                    alt: 'Py points at a chest labelled with a good name.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    props: [{ item: 'chest', x: 68, y: 100 }],
                    bubbles: [
                        { who: 'py', text: "The loop variable doesn't have to be called i. A name that says what it means is even better!" },
                    ],
                    code: py`
                        for steps in range(1, 4):
                            print("Climb", steps, "steps")
                    `,
                },
                {
                    scene: 'cave',
                    alt: 'A slime blob grows bigger and bigger. Max backs away.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'max', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Patterns can grow fast! size = size * 2 doubles it each time.' },
                        { who: 'max', text: '2, 4, 8... it keeps doubling!' },
                    ],
                    code: py`
                        size = 1
                        for i in range(3):
                            size = size * 2
                            print(size)
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Max frowns at a tower where every row is the same width.',
                    cast: [
                        { who: 'max', pose: 'sad', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'My tower is not growing!' },
                        { who: 'py', text: 'You used * 3 every time. Use i, the part that changes!' },
                    ],
                    code: py`
                        for i in range(1, 4):
                            print("#" * 3)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Max, Py and Shelly look at stairs, spirals and towers around them.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'happy', x: 22 },
                        { who: 'shelly', pose: 'happy', x: 52 },
                        { who: 'py', pose: 'wave', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Spot the pattern, find what changes each time, and let the loop variable do the work!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Pattern Maker',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'Growing tower',
                    prompt: 'What will this code print?',
                    code: py`
                        for i in range(1, 4):
                            print("#" * i)
                    `,
                    choices: ['#\n#\n#', '#\n##\n###', '###\n###\n###'],
                    answer: '#\n##\n###',
                    hints: ['i is 1, then 2, then 3. "#" * 2 is ##.'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    about: 'meaning',
                    title: 'What does it do?',
                    prompt: 'Which sentence best describes what this code does?',
                    code: py`
                        for i in range(1, 6):
                            print(i * 2)
                    `,
                    choices: [
                        'It prints the even numbers from 2 to 10.',
                        'It prints the numbers 1 to 5.',
                        'It prints the number 2 five times.',
                    ],
                    answer: 'It prints the even numbers from 2 to 10.',
                    hints: ['Work out the first two lines it prints: i is 1, then 2.'],
                },
                {
                    id: 'p7',
                    type: 'write',
                    title: 'Staircase',
                    prompt: 'Print the goal staircase using a loop and `"#" * i`.',
                    starter: py`
                        for i in range(1, ):
                            print()
                    `,
                    solution: py`
                        for i in range(1, 6):
                            print("#" * i)
                    `,
                    check: py`
                        ${USE_LOOP}
                        assert same_output(output, expected_output), "Compare your staircase with the goal. How many steps?"
                    `,
                    hints: [
                        'There are 5 steps, so i should go 1, 2, 3, 4, 5.',
                        'for i in range(1, 6):\n    print("#" * i)',
                    ],
                },
                {
                    id: 'p8',
                    type: 'trace',
                    title: 'Doubling slime',
                    prompt: 'A slime doubles in size every turn. Fill in `i` and `size` each time line 3 finishes.',
                    code: py`
                        size = 10
                        for i in range(3):
                            size = size * 2
                    `,
                    line: 3,
                    columns: ['i', 'size'],
                    rows: [['0', '20'], ['1', '40'], ['2', '80']],
                    hints: [
                        'Remember: i starts at 0.',
                        'Each time, size becomes twice the old size: 10 → 20 → ...',
                    ],
                },
                {
                    id: 'p9',
                    type: 'write',
                    turtle: true,
                    title: 'Square spiral',
                    prompt: 'Draw the goal spiral: walk `i * 10` steps then turn left 90, for i from 1 to 10.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        for i in range(1, 11):
                            forward(i * 10)
                            left(90)
                    `,
                    check: USE_LOOP,
                    hints: [
                        'i goes 1 to 10, so use range(1, 11).',
                        'Inside the loop: forward(i * 10), then left(90).',
                    ],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: "Your turn: Threes",
                    prompt: "Use a loop to print 3, 6, 9, 12, 15. Hint: use `i * 3`.",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        for i in range(1, 6):
                            print(i * 3)
                    `,
                    check: 'assert "for" in source, "Use a for loop!"',
                    hints: ["i goes 1 to 5. What is i * 3 each time?","for i in range(1, 6):\n    print(i * 3)"],
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
                    title: 'Middle start',
                    prompt: 'What will this code print?',
                    code: py`
                        for i in range(2, 5):
                            print(i)
                    `,
                    choices: ['2\n3\n4', '2\n3\n4\n5', '3\n4\n5'],
                    answer: '2\n3\n4',
                    hints: ['Start at the first number, stop just before the second.'],
                },
                {
                    id: 't2',
                    type: 'fill',
                    title: 'Star pyramid',
                    prompt: 'Fill in the gap so the code prints the goal.',
                    template: py`
                        for i in range(1, 5):
                            print("*" * ___)
                    `,
                    answers: ['i'],
                    hints: ['Each line has one more star. What changes each time around the loop?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    turtle: true,
                    boss: true,
                    title: 'BOSS: Portal vortex',
                    prompt: 'Draw the swirling triangle vortex: for i from 1 to 24, walk `i * 8` steps and turn left 120.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        for i in range(1, 25):
                            forward(i * 8)
                            left(120)
                    `,
                    check: USE_LOOP,
                    hints: [
                        'It is like the square spiral, but with triangle turns.',
                        'range(1, 25) gives i from 1 to 24.',
                        'for i in range(1, 25):\n    forward(i * 8)\n    left(120)',
                    ],
                },
            ],
        },
    ],
};
