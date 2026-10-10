import { py } from '../helpers';
import type { Chapter } from '../schema';

const NESTED = 'assert source.count("for ") >= 2, "Use a loop inside a loop!"';

export const ch5: Chapter = {
    id: 'ch5',
    title: 'Grids',
    emoji: '🔲',
    summary: 'Put a loop inside a loop to make rows, columns, patterns and grids.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Loops Inside Loops',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Bix lays bricks row by row to build a wall.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'talk', x: 25 },
                        { who: 'py', pose: 'point', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'A wall is rows of bricks. Each row has the same number of bricks.' },
                        { who: 'py', text: 'That\'s a loop inside a loop! The inner loop runs fully for EACH turn of the outer loop.' },
                    ],
                    code: py`
                        for row in range(2):
                            for col in range(3):
                                print(row, col)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py shows end="" keeping things on the same line.',
                    cast: [{ who: 'py', pose: 'talk', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'print("#", end="") stays on the same line. A plain print() then starts a new line.' },
                    ],
                    code: py`
                        print("#", end="")
                        print("#", end="")
                        print()
                        print("new line!")
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'A neat 3 by 4 wall of bricks appears.',
                    cast: [{ who: 'bix', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'bix', text: 'Inner loop: bricks across. Outer loop: rows down!' }],
                    code: py`
                        for row in range(3):
                            for col in range(4):
                                print("#", end="")
                            print()
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Rows and Columns',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'All the pairs',
                    prompt: 'What will this code print?',
                    code: py`
                        for r in range(2):
                            for c in range(2):
                                print(r, c)
                    `,
                    choices: ['0 0\n0 1\n1 0\n1 1', '0 0\n1 1', '0 1\n0 1'],
                    answer: '0 0\n0 1\n1 0\n1 1',
                    hints: ['For r = 0, c goes 0 then 1. Then r = 1, and c goes 0, 1 again.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Wall',
                    prompt: 'What will this code print?',
                    code: py`
                        for r in range(3):
                            print("#" * 4)
                    `,
                    choices: ['####\n####\n####', '###\n###\n###\n###', '############'],
                    answer: '####\n####\n####',
                    hints: ['3 rows, each with 4 #.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Same line',
                    prompt: 'What will this code print?',
                    code: py`
                        print("a", end="")
                        print("b")
                    `,
                    choices: ['a\nb', 'ab', 'a b'],
                    answer: 'ab',
                    hints: ['end="" means "don\'t start a new line".'],
                },
                {
                    id: 'p4',
                    type: 'trace',
                    title: 'How many times?',
                    prompt: 'Fill in `total` each time line 4 finishes.',
                    code: py`
                        total = 0
                        for r in range(2):
                            for c in range(3):
                                total += 1
                    `,
                    line: 4,
                    columns: ['total'],
                    rows: [['1'], ['2'], ['3'], ['4'], ['5'], ['6']],
                    hints: ['The inner loop runs 3 times for each of the 2 outer turns.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Brick wall',
                    prompt: 'Use a loop inside a loop with `end=""` to print 3 rows of 5 `#`, like the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        for row in range(3):
                            for col in range(5):
                                print("#", end="")
                            print()
                    `,
                    check: py`
                        ${NESTED}
                        assert same_output(output, expected_output), "3 rows of 5 #."
                    `,
                    hints: ['Inner loop: print("#", end="") 5 times.', 'After the inner loop (still inside the outer one): print()'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Patterns and Tables',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Bix builds a staircase of bricks, one more each row.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'point', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'The inner loop can use the outer loop\'s variable. Row 1 gets 1 star, row 2 gets 2...' }],
                    code: py`
                        for row in range(1, 5):
                            for col in range(row):
                                print("*", end="")
                            print()
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A times table appears on the big screen.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'A times table is a grid: rows times columns!' }],
                    code: py`
                        for a in range(1, 4):
                            for b in range(1, 4):
                                print(a * b, end=" ")
                            print()
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Glitch hops across a grid of floating platforms.',
                    cast: [{ who: 'glitch', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'glitch', text: 'Grids are everywhere in games: maps, boards, pixel art!' }],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Grid Patterns',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'Staircase',
                    prompt: 'What will this code print?',
                    code: py`
                        for row in range(1, 4):
                            for col in range(row):
                                print("*", end="")
                            print()
                    `,
                    choices: ['*\n**\n***', '***\n***\n***', '***\n**\n*'],
                    answer: '*\n**\n***',
                    hints: ['Row 1 has 1 star, row 2 has 2...'],
                },
                {
                    id: 'p6',
                    type: 'fix',
                    title: 'One long line',
                    prompt: 'This times table comes out on ONE line. Fix it so each row is on its own line, like the 🎯 Goal.',
                    starter: py`
                        for a in range(1, 4):
                            for b in range(1, 4):
                                print(a * b, end=" ")
                    `,
                    solution: py`
                        for a in range(1, 4):
                            for b in range(1, 4):
                                print(a * b, end=" ")
                            print()
                    `,
                    hints: ['After each row, start a new line with print().', 'That print() is inside the outer loop but not the inner one.'],
                },
                {
                    id: 'p7',
                    type: 'write',
                    turtle: true,
                    title: 'Row of squares',
                    prompt: 'Draw 3 squares of side 30 in a row. After each square, hop 40 steps forward with the pen up. Use a loop inside a loop!',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        for i in range(3):
                            for side in range(4):
                                forward(30)
                                left(90)
                            penup()
                            forward(40)
                            pendown()
                    `,
                    check: NESTED,
                    hints: ['Inner loop: the square (4 × forward 30, left 90).', 'Outer loop: square, then penup, forward(40), pendown.'],
                },
                {
                    id: 'p8',
                    type: 'fill',
                    title: 'Star triangle',
                    prompt: 'Fill in the gap so each row has as many stars as its row number.',
                    template: py`
                        for row in range(1, 4):
                            for col in range(___):
                                print("*", end="")
                            print()
                    `,
                    answers: ['row'],
                    hints: ['Which variable is 1, then 2, then 3?'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Number stairs',
                    prompt: 'Print the 🎯 Goal: row 1 has `1`, row 2 has `1 2`, row 3 has `1 2 3`. Use a loop inside a loop.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        for row in range(1, 4):
                            for n in range(1, row + 1):
                                print(n, end=" ")
                            print()
                    `,
                    check: py`
                        ${NESTED}
                        assert same_output(output, expected_output), "Match the number stairs."
                    `,
                    hints: ['The inner loop counts from 1 up to row: range(1, row + 1)', 'print(n, end=" ") keeps numbers on one line.'],
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
                    title: 'Grid count',
                    prompt: 'What will this code print?',
                    code: py`
                        count = 0
                        for r in range(3):
                            for c in range(3):
                                count += 1
                        print(count)
                    `,
                    choices: ['6', '9', '3'],
                    answer: '9',
                    hints: ['3 rows × 3 columns.'],
                },
                {
                    id: 't2',
                    type: 'fill',
                    title: 'Short wall',
                    prompt: 'How many rows does the 🎯 Goal have?',
                    template: py`
                        for r in range(___):
                            print("#" * 4)
                    `,
                    answers: ['2'],
                    hints: ['Count the lines in the goal.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    turtle: true,
                    boss: true,
                    title: 'BOSS: Platform grid',
                    prompt: 'Draw a 3 × 3 grid of squares (side 30). Square (row, col) starts at `goto(col * 40, row * 40)`. Use a loop inside a loop!',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        for row in range(3):
                            for col in range(3):
                                penup()
                                goto(col * 40, row * 40)
                                pendown()
                                for side in range(4):
                                    forward(30)
                                    left(90)
                    `,
                    check: NESTED,
                    hints: [
                        'for row in range(3): then for col in range(3):',
                        'Inside: penup(), goto(col * 40, row * 40), pendown(), then draw a square.',
                    ],
                },
            ],
        },
    ],
};
