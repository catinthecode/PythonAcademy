import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch2: Chapter = {
    id: 'ch2',
    title: 'Turtle Builder',
    emoji: '🐢',
    summary: 'Program Shelly the turtle to walk, turn and draw.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Meet Shelly',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Max sits bored on a pile of blocks. Py introduces Shelly, a turtle with a pencil on her shell.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'sad', x: 20 },
                        { who: 'py', pose: 'talk', x: 50 },
                        { who: 'shelly', pose: 'wave', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'Printing words is fun, but I want to BUILD!' },
                        { who: 'py', text: 'Meet Shelly, the builder turtle. She draws a line wherever she walks.' },
                    ],
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly stands in the middle of a field, facing right.',
                    cast: [{ who: 'shelly', pose: 'talk', x: 40 }],
                    bubbles: [
                        { who: 'shelly', text: 'Wake me up with from turtle import * on the very first line. Then forward(100) means walk 100 steps!' },
                    ],
                    code: py`
                        from turtle import *
                        forward(100)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Max watches Shelly walk a short line, then a long line.',
                    cast: [
                        { who: 'max', pose: 'think', x: 25 },
                        { who: 'shelly', pose: 'talk', x: 68 },
                    ],
                    bubbles: [
                        { who: 'max', text: 'Where do you start?' },
                        { who: 'shelly', text: 'In the middle, facing right. Bigger number, longer line!' },
                    ],
                    caption: 'Change 40 to 200 and run it again!',
                    code: py`
                        from turtle import *
                        forward(40)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly spins on the spot, dizzy.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'shelly', pose: 'surprised', x: 70, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'left(90) turns her a quarter turn left. right(90) turns right.' },
                        { who: 'shelly', text: 'Turning does not move me. I spin on the spot!' },
                    ],
                    code: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(100)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Max twists around, confused about which way is left. Shelly points the way she is facing.',
                    cast: [
                        { who: 'max', pose: 'surprised', x: 25 },
                        { who: 'shelly', pose: 'talk', x: 68 },
                    ],
                    bubbles: [
                        { who: 'max', text: 'Wait, which way is MY left?' },
                        { who: 'shelly', text: 'Use MY left! Pretend you are me, facing where I face.' },
                    ],
                    caption: 'Facing right, then turning right... which way now?',
                    code: py`
                        from turtle import *
                        right(90)
                        forward(100)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly happily draws a zig-zag step shape while Py and Max watch.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'max', pose: 'happy', x: 50 },
                        { who: 'shelly', pose: 'happy', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'That is all Shelly needs: forward walks, left and right spin. 90 is a quarter turn, like a corner.' },
                        { who: 'shelly', text: 'Mix them up and I can draw anything!' },
                    ],
                    code: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(50)
                        right(90)
                        forward(100)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Walk and Turn',
            problems: [
                {
                    id: 'p1',
                    type: 'write',
                    turtle: true,
                    title: 'First steps',
                    prompt: 'Make Shelly draw a straight line 150 steps long, to match the dotted goal.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        forward(150)
                    `,
                    hints: [
                        'forward(...) makes Shelly walk. Put the number of steps inside the brackets.',
                        'forward(150)',
                    ],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    about: 'drawing',
                    title: 'Picture this',
                    prompt: 'What will Shelly draw?',
                    code: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(100)
                    `,
                    choices: ['A straight line', 'An L shape', 'A square'],
                    answer: 'An L shape',
                    hints: [
                        'She walks, turns a quarter turn, then walks again.',
                        'Two lines with a corner between them... what letter looks like that?',
                    ],
                },
                {
                    id: 'p3',
                    type: 'write',
                    turtle: true,
                    title: 'Square house floor',
                    prompt: 'Draw a square with sides 100 steps long.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                    `,
                    hints: [
                        'A square has 4 sides and 4 corners.',
                        'Repeat forward(100) then left(90), four times.',
                    ],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    turtle: true,
                    title: 'Wonky walls',
                    prompt: 'This square came out wonky! One turn is wrong. Fix it to match the goal.',
                    starter: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(100)
                        left(45)
                        forward(100)
                        left(90)
                        forward(100)
                    `,
                    solution: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                        forward(100)
                    `,
                    hints: [
                        'A square corner is a quarter turn: 90.',
                        'Look for the turn that is not 90.',
                    ],
                },
                {
                    id: 'p5',
                    type: 'predict',
                    about: 'drawing',
                    title: 'Which way?',
                    prompt: 'Shelly starts facing right →. Which way does she walk?',
                    code: py`
                        from turtle import *
                        right(90)
                        forward(50)
                    `,
                    choices: ['Up ↑', 'Down ↓', 'Left ←', 'Right →'],
                    answer: 'Down ↓',
                    hints: [
                        'Stand up and face right. Now turn a quarter turn to YOUR right.',
                        'Facing right, then turning right, points you down.',
                    ],
                },
                {
                    id: 'y1',
                    type: 'write',
                    turtle: true,
                    title: "Your turn: Small square",
                    prompt: "Type it all yourself: draw a square with sides of 60.",
                    starter: py`
                        from turtle import *
                        # Your turn! Write the rest yourself.
                    `,
                    solution: py`
                        from turtle import *
                        forward(60)
                        left(90)
                        forward(60)
                        left(90)
                        forward(60)
                        left(90)
                        forward(60)
                        left(90)
                    `,
                    hints: ["Walk 60, turn left 90. Do that 4 times."],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Shapes and Gaps',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Max counts on his fingers next to a square drawn on the ground.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'happy', x: 25 },
                        { who: 'shelly', pose: 'happy', x: 70, flip: true },
                    ],
                    bubbles: [{ who: 'max', text: 'Walk, turn, walk, turn... 4 times makes a square!' }],
                    code: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Max stretches his arms wide to show a long box. Py nods.',
                    cast: [
                        { who: 'max', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'What about a long box?' },
                        { who: 'py', text: 'A rectangle! The sides take turns: long, short, long, short.' },
                    ],
                    code: py`
                        from turtle import *
                        forward(120)
                        left(90)
                        forward(50)
                        left(90)
                        forward(120)
                        left(90)
                        forward(50)
                        left(90)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Sneak giggles next to a square with one bent, wonky corner.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'I changed one turn. Hehehe!' },
                        { who: 'py', text: 'One wrong turn bends every wall after it. Check each number!' },
                    ],
                    caption: 'Find the turn that is not 90.',
                    code: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(100)
                        left(60)
                        forward(100)
                        left(90)
                        forward(100)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly lifts her pencil and tiptoes over a gap.',
                    cast: [
                        { who: 'shelly', pose: 'talk', x: 35 },
                        { who: 'py', pose: 'point', x: 78, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'penup() lifts her pencil, so she can walk without drawing. pendown() puts it back.' },
                    ],
                    code: py`
                        from turtle import *
                        forward(50)
                        penup()
                        forward(30)
                        pendown()
                        forward(50)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Max stares at a line that stops too early. Shelly floats with her pencil still up.',
                    cast: [
                        { who: 'max', pose: 'sad', x: 25 },
                        { who: 'shelly', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'My last line vanished!' },
                        { who: 'shelly', text: 'My pencil is still up! I float until you say pendown().' },
                    ],
                    code: py`
                        from turtle import *
                        forward(50)
                        penup()
                        forward(30)
                        forward(50)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py holds up a sign showing that big turns and small turns make different shapes.',
                    wide: true,
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'max', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Shapes are just walks and turns. Change the numbers, and you change the shape! Lift the pencil for gaps.' },
                        { who: 'max', text: 'Then I can draw anything. Even a house!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Shape Builder',
            problems: [
                {
                    id: 'p6',
                    type: 'parsons',
                    turtle: true,
                    title: 'Letter L',
                    prompt: 'Put the lines in order so Shelly draws a capital L: down 100 steps, then right 60 steps. One line is not needed. Leave it in the spare pile.',
                    lines: [
                        'from turtle import *',
                        'right(90)',
                        'forward(100)',
                        'left(90)',
                        'forward(60)',
                    ],
                    distractors: ['left(180)'],
                    hints: [
                        '`from turtle import *` always comes first.',
                        'She faces right at the start, so she must turn right(90) to face down.',
                    ],
                },
                {
                    id: 'p7',
                    type: 'write',
                    turtle: true,
                    title: 'Long garden',
                    prompt: 'Draw a rectangle 150 steps wide and 60 steps tall.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        forward(150)
                        left(90)
                        forward(60)
                        left(90)
                        forward(150)
                        left(90)
                        forward(60)
                        left(90)
                    `,
                    hints: [
                        'A rectangle is like a square, but the sides take turns being long and short.',
                        'Long side 150, turn, short side 60, turn... and again.',
                    ],
                },
                {
                    id: 'p8',
                    type: 'fix',
                    turtle: true,
                    title: 'Broken stairs',
                    prompt: 'These stairs should go up 3 steps, but one step is broken. Fix it!',
                    starter: py`
                        from turtle import *
                        forward(40)
                        left(90)
                        forward(40)
                        right(90)
                        forward(40)
                        left(90)
                        forward(40)
                        forward(40)
                        left(90)
                        forward(40)
                        right(90)
                    `,
                    solution: py`
                        from turtle import *
                        forward(40)
                        left(90)
                        forward(40)
                        right(90)
                        forward(40)
                        left(90)
                        forward(40)
                        right(90)
                        forward(40)
                        left(90)
                        forward(40)
                        right(90)
                    `,
                    hints: [
                        'Each step is: forward, left(90), forward, right(90).',
                        'In step 2, a turn is missing between two forward(40) lines.',
                    ],
                },
                {
                    id: 'p9',
                    type: 'write',
                    turtle: true,
                    title: 'Mind the gap',
                    prompt: 'Draw a line of 50, then a gap of 30, then another line of 50. Use `penup()` and `pendown()`.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        forward(50)
                        penup()
                        forward(30)
                        pendown()
                        forward(50)
                    `,
                    hints: [
                        'penup() lifts the pencil. Walking now leaves no line.',
                        'Remember to call pendown() before the last line!',
                    ],
                },
                {
                    id: 'y2',
                    type: 'write',
                    turtle: true,
                    title: "Your turn: Stairs going down",
                    prompt: "Draw stairs going DOWN: 2 steps, each 40 across and 40 down. Match the dotted goal!",
                    starter: py`
                        from turtle import *
                        # Your turn! Write the rest yourself.
                    `,
                    solution: py`
                        from turtle import *
                        forward(40)
                        right(90)
                        forward(40)
                        left(90)
                        forward(40)
                        right(90)
                        forward(40)
                        left(90)
                    `,
                    hints: ["Going down means turning right after each step across.","Each step: forward(40), right(90), forward(40), left(90)."],
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
                    about: 'drawing',
                    title: 'Mystery shape',
                    prompt: 'What will Shelly draw?',
                    code: py`
                        from turtle import *
                        forward(80)
                        left(90)
                        forward(80)
                        left(90)
                        forward(80)
                        left(90)
                        forward(80)
                    `,
                    choices: ['A square', 'A triangle', 'A straight line'],
                    answer: 'A square',
                    hints: ['4 equal walks with quarter turns between them.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    turtle: true,
                    title: 'Invisible line',
                    prompt: 'This should draw two lines with a gap, but the second line is missing. Fix it!',
                    starter: py`
                        from turtle import *
                        forward(60)
                        penup()
                        forward(30)
                        forward(60)
                    `,
                    solution: py`
                        from turtle import *
                        forward(60)
                        penup()
                        forward(30)
                        pendown()
                        forward(60)
                    `,
                    hints: ['After penup(), Shelly never puts her pencil back down.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    turtle: true,
                    boss: true,
                    title: 'BOSS: Build a house',
                    prompt: 'Build Max a house: a square with sides of 100, with a triangle roof on top. Each roof side is also 100 long. Match the dotted goal!',
                    starter: py`
                        from turtle import *
                        # Walls first, then the roof
                    `,
                    solution: py`
                        from turtle import *
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
                        forward(100)
                        left(90)
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
                        'Draw the square first. Shelly ends up back where she started, facing right.',
                        'Walk up the left wall to the top-left corner, then face right again.',
                        'For the roof: turn left(60), walk 100, turn right(120), walk 100.',
                    ],
                },
            ],
        },
    ],
};
