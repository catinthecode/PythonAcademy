import { py } from '../helpers';
import type { Chapter } from '../schema';

const USE_LOOP = 'assert "for" in source, "Use a for loop instead of copying lines!"';

export const ch3: Chapter = {
    id: 'ch3',
    title: 'Repeater Loops',
    emoji: '🔁',
    summary: 'Let a for loop repeat things for you.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'The Repeater',
            panels: [
                {
                    scene: 'room',
                    alt: 'Max slumps over a keyboard with a huge scroll of repeated lines spilling to the floor.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'sad', x: 28 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 45, y: 100 }],
                    bubbles: [
                        { who: 'max', text: 'forward, left, forward, left... my fingers hurt!' },
                        { who: 'py', text: "Programmers are lazy in a smart way. Let's make Python repeat it for us." },
                    ],
                },
                {
                    scene: 'circuit',
                    alt: 'Py stands next to a glowing repeater circuit.',
                    cast: [{ who: 'py', pose: 'point', x: 28 }],
                    props: [
                        { item: 'repeater', x: 62, y: 100 },
                        { item: 'cow', x: 85, y: 100, scale: 0.8 },
                    ],
                    bubbles: [{ who: 'py', text: 'Repeater blocks repeat a signal. Python has a repeater too: the for loop!' }],
                    code: py`
                        for i in range(3):
                            print("Moo")
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Py explains that pushed-in lines are inside the loop.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'max', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'range(3) means "3 times". Lines pushed in with 4 spaces are INSIDE the loop.' },
                        { who: 'max', text: 'And the colon : at the end starts the loop!' },
                    ],
                    caption: 'Both pushed-in lines repeat, together.',
                    code: py`
                        for i in range(3):
                            print("Hop")
                            print("Skip")
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Py circles two lines that appear again and again in Max\'s long scroll of code.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'max', pose: 'surprised', x: 75, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Find the part that repeats. Your square is forward(100), left(90)... four times.' },
                        { who: 'max', text: 'So I write it ONCE and loop it 4 times!' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Sneak grins at a loop whose inside lines are not pushed in.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'I squashed the spaces flat! Hehe!' },
                        { who: 'py', text: 'Now nothing is inside the loop. Press Tab to push lines back in.' },
                    ],
                    code: py`
                        for i in range(3):
                        print("Moo")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly zooms happily around a square.',
                    wide: true,
                    cast: [{ who: 'shelly', pose: 'happy', x: 50 }],
                    bubbles: [{ who: 'shelly', text: 'Now squares take just 3 lines. Wheee!' }],
                    code: py`
                        from turtle import *
                        for i in range(4):
                            forward(100)
                            left(90)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Loop It',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Moo times three',
                    prompt: 'What will this code print?',
                    code: py`
                        for i in range(3):
                            print("Moo")
                    `,
                    choices: ['Moo', 'Moo\nMoo\nMoo', 'Moo Moo Moo'],
                    answer: 'Moo\nMoo\nMoo',
                    hints: [
                        'range(3) repeats the inside 3 times.',
                        'Each print makes a new line.',
                    ],
                },
                {
                    id: 'p2',
                    type: 'write',
                    title: 'Mine, mine, mine!',
                    prompt: 'Print `Mine!` 5 times. Use a for loop, not 5 print lines!',
                    starter: py`
                        for i in range():
                            print()
                    `,
                    solution: py`
                        for i in range(5):
                            print("Mine!")
                    `,
                    check: py`
                        ${USE_LOOP}
                        assert same_output(output, expected_output), "Print Mine! exactly 5 times."
                    `,
                    hints: [
                        'Put how many times inside range( ).',
                        'Put the text inside print( ), with quotes.',
                        'for i in range(5):\n    print("Mine!")',
                    ],
                },
                {
                    id: 'p3',
                    type: 'write',
                    turtle: true,
                    title: 'Loop a square',
                    prompt: 'Draw a square with sides of 100 using a for loop.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        for i in range(4):
                            forward(100)
                            left(90)
                    `,
                    check: USE_LOOP,
                    hints: [
                        'A square is "forward, turn" done 4 times.',
                        'Put forward(100) and left(90) inside a for loop with range(4). Push them in with 4 spaces.',
                    ],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    turtle: true,
                    title: 'Flat loop',
                    prompt: 'This loop crashes. Fix it so Shelly draws a square.',
                    starter: py`
                        from turtle import *
                        for i in range(4):
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
                        'The lines inside a loop must be pushed in.',
                        'Put 4 spaces (or press Tab) before forward and left.',
                    ],
                },
                {
                    id: 'p6',
                    type: 'write',
                    turtle: true,
                    title: 'Triangle tent',
                    prompt: 'Draw a triangle with sides of 100 using a loop. Hint: a triangle has 3 sides, and each turn is 120.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        for i in range(3):
                            forward(100)
                            left(120)
                    `,
                    check: USE_LOOP,
                    hints: [
                        'Like the square loop, but 3 times instead of 4.',
                        'Use left(120) for the corners.',
                    ],
                },
                {
                    id: 'y1',
                    type: 'write',
                    turtle: true,
                    title: "Your turn: Stop sign",
                    prompt: "Use a loop to draw an octagon (8 sides) with sides of 40. Each turn is 45.",
                    starter: py`
                        from turtle import *
                        # Your turn! Write the rest yourself.
                    `,
                    solution: py`
                        from turtle import *
                        for i in range(8):
                            forward(40)
                            left(45)
                    `,
                    check: 'assert "for" in source, "Use a for loop!"',
                    hints: ["An octagon has 8 sides, so range(8).","for i in range(8):\n    forward(40)\n    left(45)"],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Inside and Outside',
            panels: [
                {
                    scene: 'village',
                    alt: 'Max points at the letter i. Py holds up counting cards 0, 1, 2.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'think', x: 28 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: "What's the i for?" },
                        { who: 'py', text: 'i counts the loops: 0, 1, 2. Python starts counting at 0, not 1! It still runs 3 times.' },
                    ],
                    code: py`
                        for i in range(3):
                            print(i)
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Sneak points at a line that is not pushed in.',
                    cast: [{ who: 'sneak', pose: 'point', x: 35 }],
                    bubbles: [{ who: 'sneak', text: 'Sssss... lines that are NOT pushed in run after the loop is all done.' }],
                    code: py`
                        for i in range(2):
                            print("Dig")
                        print("Done!")
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Py pushes the Done line inward, and now it repeats with Dig.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'max', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Now push Done! in too. Spot the difference?' },
                        { who: 'max', text: 'Done! repeats every time now!' },
                    ],
                    code: py`
                        for i in range(2):
                            print("Dig")
                            print("Done!")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly looks sad next to one long straight line instead of a square.',
                    cast: [
                        { who: 'shelly', pose: 'sad', x: 25 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'shelly', text: 'I wanted a square, but I drew one long line!' },
                        { who: 'py', text: 'left(90) is outside the loop. You only turned once, at the end.' },
                    ],
                    code: py`
                        from turtle import *
                        for i in range(4):
                            forward(80)
                        left(90)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Max holds up three fingers next to a triangle tent.',
                    cast: [
                        { who: 'max', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'How do I loop a triangle?' },
                        { who: 'py', text: 'Sides go in range, the turn goes in left. Triangle: 3 sides, turn 120.' },
                    ],
                    code: py`
                        from turtle import *
                        for i in range(3):
                            forward(100)
                            left(120)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly draws a six-sided honeycomb shape while Py cheers.',
                    wide: true,
                    cast: [
                        { who: 'shelly', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'happy', x: 70, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Same loop, different numbers: 6 sides and 60° turns makes a honeycomb!' },
                    ],
                    code: py`
                        from turtle import *
                        for i in range(6):
                            forward(60)
                            left(60)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Loop Detective',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'Counting with i',
                    prompt: 'What will this code print?',
                    code: py`
                        for i in range(3):
                            print(i)
                    `,
                    choices: ['1\n2\n3', '0\n1\n2', '3'],
                    answer: '0\n1\n2',
                    hints: [
                        'i holds the loop count.',
                        'Remember: Python starts counting at 0.',
                    ],
                },
                {
                    id: 'p9',
                    type: 'predict',
                    title: 'Inside or outside?',
                    prompt: 'What will this code print?',
                    code: py`
                        for i in range(2):
                            print("Dig")
                        print("Done!")
                    `,
                    choices: ['Dig\nDone!\nDig\nDone!', 'Dig\nDig\nDone!', 'Dig\nDone!'],
                    answer: 'Dig\nDig\nDone!',
                    hints: [
                        'Which line is pushed in, and which is not?',
                        'Done! is outside the loop, so it runs once, after the loop finishes.',
                    ],
                },
                {
                    id: 'p7',
                    type: 'parsons',
                    turtle: true,
                    title: 'Loop puzzle',
                    prompt: 'Put the lines in order to draw a square with sides of 80. Use the ⇥ buttons to push lines inside the loop. One line is not needed.',
                    lines: [
                        'from turtle import *',
                        'for i in range(4):',
                        '    forward(80)',
                        '    left(90)',
                    ],
                    distractors: ['    right(45)'],
                    hints: [
                        'The import goes first, then the for line.',
                        'forward and left both belong inside the loop, so push them in.',
                    ],
                },
                {
                    id: 'p8',
                    type: 'fill',
                    title: 'TNT stack',
                    prompt: 'How many times should the loop run to print the goal?',
                    template: py`
                        for i in range(___):
                            print("TNT")
                    `,
                    answers: ['6'],
                    hints: ['Count the TNT lines in the goal.'],
                },
                {
                    id: 'p10',
                    type: 'write',
                    turtle: true,
                    title: 'Honeycomb',
                    prompt: 'Draw a hexagon (6 sides) with sides of 60. Each turn is 60.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        for i in range(6):
                            forward(60)
                            left(60)
                    `,
                    check: USE_LOOP,
                    hints: [
                        'How many sides does a hexagon have? That goes in range( ).',
                        'for i in range(6):\n    forward(60)\n    left(60)',
                    ],
                },
                {
                    id: 'p11',
                    type: 'fix',
                    turtle: true,
                    title: 'Runaway line',
                    prompt: 'This should be a square, but Shelly draws one long line. No error message! What is wrong?',
                    starter: py`
                        from turtle import *
                        for i in range(4):
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
                        'Which lines are inside the loop?',
                        'left(90) is outside the loop, so she only turns once, at the very end.',
                    ],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: "Your turn: Count with i",
                    prompt: "Use a loop and `i` to print the numbers in the 🎯 Goal box.",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        for i in range(5):
                            print(i)
                    `,
                    check: 'assert "for" in source, "Use a for loop!"',
                    hints: ["The numbers start at 0. How many are there?","for i in range(5):\n    print(i)"],
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
                    title: 'Hiss count',
                    prompt: 'What will this code print?',
                    code: py`
                        for i in range(4):
                            print("Ssss")
                    `,
                    choices: ['Ssss', 'Ssss\nSsss\nSsss', 'Ssss\nSsss\nSsss\nSsss'],
                    answer: 'Ssss\nSsss\nSsss\nSsss',
                    hints: ['range(4) runs the inside 4 times.'],
                },
                {
                    id: 't2',
                    type: 'fill',
                    turtle: true,
                    title: 'Tent repeat',
                    prompt: 'Fill in the gap so Shelly draws the goal triangle.',
                    template: py`
                        from turtle import *
                        for i in range(___):
                            forward(90)
                            left(120)
                    `,
                    answers: ['3'],
                    hints: ['How many sides does a triangle have?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    turtle: true,
                    boss: true,
                    title: 'BOSS: Shooting star',
                    prompt: 'Draw a 5-pointed star with lines 150 long. Use a loop! Secret: each turn is right(144).',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        for i in range(5):
                            forward(150)
                            right(144)
                    `,
                    check: USE_LOOP,
                    hints: [
                        'A star has 5 points, so the loop runs 5 times.',
                        'Inside the loop: walk 150, then turn right(144).',
                        'for i in range(5):\n    forward(150)\n    right(144)',
                    ],
                },
            ],
        },
    ],
};
