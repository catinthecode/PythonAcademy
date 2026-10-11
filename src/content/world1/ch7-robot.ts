import { py } from '../helpers';
import type { Chapter } from '../schema';

const square = (size: number) => py`
    from turtle import *
    for i in range(4):
        forward(${size})
        left(90)
`;

export const ch7: Chapter = {
    id: 'ch7',
    title: "Bolt's Workshop",
    emoji: '🤖',
    summary: 'Give a robot helper clear instructions, read its code, and test its work.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Meet Bolt',
            panels: [
                {
                    scene: 'room',
                    alt: 'Bolt the robot rolls into the workshop and waves at Max.',
                    wide: true,
                    cast: [
                        { who: 'bolt', pose: 'wave', x: 28 },
                        { who: 'max', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'bolt', text: "Beep boop! I'm Bolt, your robot helper. Tell me what you want and I'll write the code!" },
                        { who: 'max', text: 'Cool! Bolt, build me a house!' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Bolt proudly shows a tiny house the size of one block. Max looks disappointed.',
                    cast: [
                        { who: 'bolt', pose: 'happy', x: 30 },
                        { who: 'max', pose: 'sad', x: 75, flip: true },
                    ],
                    props: [{ item: 'chest', x: 52, y: 100, scale: 0.4 }],
                    bubbles: [
                        { who: 'bolt', text: 'Done! One house. You never said how big!' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Py explains while Bolt listens.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'bolt', pose: 'think', x: 74, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Robots and AI helpers do what you SAY, not what you MEAN. Say exactly what you want!' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Max says hi lots to Bolt, and Bolt prints hi eight times on one line.',
                    cast: [
                        { who: 'max', pose: 'point', x: 25 },
                        { who: 'bolt', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'Bolt, say hi lots!' },
                        { who: 'bolt', text: 'Lots of hi, coming up! Beep!' },
                    ],
                    caption: 'Max wanted 3 hi lines. Oops!',
                    code: py`print("hi hi hi hi hi hi hi hi")`,
                },
                {
                    scene: 'screen',
                    alt: 'Py points at a checklist on the screen: what, how big, how many, where.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'bolt', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Good instructions say WHAT, HOW BIG and HOW MANY.' },
                        { who: 'bolt', text: 'Numbers are best. I never guess numbers wrong!' },
                    ],
                },
                {
                    scene: 'meadow',
                    alt: 'Max gives Bolt a clear instruction and Bolt draws a perfect square.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'point', x: 25 },
                        { who: 'bolt', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'Bolt, draw a square with sides of 100.' },
                        { who: 'bolt', text: 'Clear instructions! Here is my code.' },
                    ],
                    code: square(100),
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Say It Clearly',
            problems: [
                {
                    id: 'q1',
                    type: 'instruct',
                    turtle: true,
                    title: 'Square, please',
                    prompt: 'You want Bolt to draw the dotted square. Which instruction gets it right?',
                    goalCode: square(100),
                    choices: [
                        { text: 'Draw a shape.', code: py`
                            from turtle import *
                            forward(100)
                        ` },
                        { text: 'Draw a square.', code: square(50) },
                        { text: 'Draw a square with sides of 100.', code: square(100) },
                    ],
                    answer: 2,
                    hints: [
                        'Watch what Bolt builds for each one. Which ones leave something out?',
                        'Good instructions say what shape AND how big.',
                    ],
                },
                {
                    id: 'q2',
                    type: 'instruct',
                    title: 'Dig, dig, dig',
                    prompt: 'You want Bolt to print the goal. Which instruction works?',
                    goalCode: py`
                        for i in range(3):
                            print("Dig")
                    `,
                    choices: [
                        { text: 'Print Dig.', code: py`print("Dig")` },
                        { text: 'Print Dig 3 times, each on its own line.', code: py`
                            for i in range(3):
                                print("Dig")
                        ` },
                        { text: 'Say dig a lot.', code: py`print("dig dig dig dig dig")` },
                    ],
                    answer: 1,
                    hints: ['How many times? On one line or separate lines? The best instruction says both.'],
                },
                {
                    id: 'q3',
                    type: 'predict',
                    about: 'meaning',
                    title: "Read Bolt's code",
                    prompt: 'Bolt wrote this code. Before you run it, what does it do?',
                    code: py`
                        from turtle import *
                        for i in range(4):
                            forward(50)
                            right(90)
                    `,
                    choices: [
                        'It draws a square with sides of 50, turning right.',
                        'It draws one long line 200 steps long.',
                        'It draws a triangle.',
                    ],
                    answer: 'It draws a square with sides of 50, turning right.',
                    hints: ['4 walks of the same length with quarter turns...'],
                },
                {
                    id: 'q4',
                    type: 'instruct',
                    turtle: true,
                    title: 'Tent time',
                    prompt: 'You want the dotted triangle. Which instruction should you give Bolt?',
                    goalCode: py`
                        from turtle import *
                        for i in range(3):
                            forward(80)
                            left(120)
                    `,
                    choices: [
                        { text: 'Draw a triangle.', code: py`
                            from turtle import *
                            for i in range(3):
                                forward(130)
                                left(120)
                        ` },
                        { text: 'Draw 3 lines of 80.', code: py`
                            from turtle import *
                            for i in range(3):
                                forward(80)
                                left(90)
                        ` },
                        { text: 'Draw a triangle with sides of 80.', code: py`
                            from turtle import *
                            for i in range(3):
                                forward(80)
                                left(120)
                        ` },
                    ],
                    answer: 2,
                    hints: ['"3 lines" is not the same as "a triangle". How did Bolt turn?'],
                },
                {
                    id: 'q5',
                    type: 'fix',
                    title: "Bolt's slip-up",
                    prompt: 'You asked Bolt for 5 torches, but its code only makes 4. Robots make mistakes too! Fix Bolt\'s code.',
                    starter: py`
                        for i in range(4):
                            print("🔥 torch")
                    `,
                    solution: py`
                        for i in range(5):
                            print("🔥 torch")
                    `,
                    hints: ['Which number decides how many times the loop runs?'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    turtle: true,
                    title: "Your turn: You be the robot",
                    prompt: "Max tells YOU: \"Draw a square with sides of 70.\" Write the code Bolt should have written. Use a loop!",
                    starter: py`
                        from turtle import *
                        # Your turn! Write the rest yourself.
                    `,
                    solution: py`
                        from turtle import *
                        for i in range(4):
                            forward(70)
                            left(90)
                    `,
                    check: 'assert "for" in source, "Use a for loop!"',
                    hints: ["A square: 4 times forward(70), left(90)."],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: "Check the Robot's Work",
            panels: [
                {
                    scene: 'room',
                    alt: 'Bolt proudly holds up code while Sneak giggles behind it.',
                    wide: true,
                    cast: [
                        { who: 'bolt', pose: 'happy', x: 32 },
                        { who: 'sneak', pose: 'happy', x: 76, flip: true },
                    ],
                    bubbles: [
                        { who: 'bolt', text: 'My code is always perfect!' },
                        { who: 'sneak', text: 'Hehehe. Is it, though?' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py points at a checklist on the big screen: read it, run it, test it.',
                    cast: [{ who: 'py', pose: 'point', x: 28 }],
                    bubbles: [
                        { who: 'py', text: 'Always check what a robot gives you. Read it. Run it. Test it with different inputs!' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Max reads Bolt\'s code slowly, counting on his fingers.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'max', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Step 1: read it. Trace it like Python before you press Run.' },
                        { who: 'max', text: 'blocks is 3, then 6, then 12!' },
                    ],
                    code: py`
                        blocks = 3
                        for i in range(2):
                            blocks = blocks + blocks
                            print(blocks)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Bolt scratches its head next to a strange spiky shape instead of a triangle.',
                    cast: [
                        { who: 'max', pose: 'surprised', x: 25 },
                        { who: 'bolt', pose: 'sad', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'I asked for a triangle with sides of 100!' },
                        { who: 'bolt', text: 'Oops! I swapped my numbers. Robots slip up too.' },
                    ],
                    caption: 'Step 2: run it. Which number goes where?',
                    code: py`
                        from turtle import *
                        for i in range(3):
                            forward(120)
                            left(100)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Sneak giggles at a sign that says: worked once, so it must be right.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'sneak', text: 'It worked once, so it is right. Hehe!' },
                        { who: 'py', text: 'One test is not enough. Step 3: test different numbers!' },
                    ],
                },
                {
                    scene: 'village',
                    alt: 'Max tries Bolt\'s doubling code with the number 2 and it works, then with 5 and it fails.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'think', x: 22 },
                        { who: 'py', pose: 'talk', x: 52 },
                        { who: 'bolt', pose: 'surprised', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'It worked when I tried 2, so it must be right!' },
                        { who: 'py', text: 'Not so fast! Some bugs only show up for certain numbers. Try a few different ones!' },
                    ],
                    code: py`
                        diamonds = 5
                        # Bolt was asked to double the diamonds:
                        print(diamonds * diamonds)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Test the Robot',
            problems: [
                {
                    id: 'q6',
                    type: 'breakit',
                    title: 'Diamond doubler',
                    prompt: 'You asked Bolt to DOUBLE the number of diamonds. Its code looks right for some numbers. Find a number that shows it is wrong!',
                    robot: py`print(diamonds * diamonds)`,
                    correct: py`print(diamonds * 2)`,
                    inputName: 'diamonds',
                    choices: ['0', '2', '5'],
                    answer: '5',
                    hints: [
                        'Double means times 2. Work out what Bolt prints for each number.',
                        '2 × 2 and 2 + 2 are both 4. Sneaky! Try a different number.',
                    ],
                },
                {
                    id: 'q7',
                    type: 'trace',
                    title: 'Trace before you trust',
                    prompt: 'Before running Bolt\'s code, trace it in your head. How many `blocks` are there each time line 3 finishes?',
                    code: py`
                        blocks = 2
                        for i in range(3):
                            blocks = blocks + blocks
                    `,
                    line: 3,
                    columns: ['blocks'],
                    rows: [['4'], ['8'], ['16']],
                    hints: ['Each time, blocks becomes the old blocks plus itself: 2 + 2 = 4.'],
                },
                {
                    id: 'q8',
                    type: 'instruct',
                    title: 'Be specific',
                    prompt: 'You want Bolt to print the goal. Which instruction works?',
                    goalCode: py`print("Max has 7 diamonds")`,
                    choices: [
                        { text: 'Print 7.', code: py`print(7)` },
                        { text: 'Print how many diamonds Max has.', code: py`print("Max has diamonds")` },
                        { text: 'Print exactly: Max has 7 diamonds', code: py`print("Max has 7 diamonds")` },
                    ],
                    answer: 2,
                    hints: ["Bolt can't read your mind. Does it know the number 7 in every instruction?"],
                },
                {
                    id: 'q9',
                    type: 'fix',
                    turtle: true,
                    title: 'Mixed-up numbers',
                    prompt: 'You asked Bolt for "a square with sides of 80". Bolt mixed up its numbers! Fix the code to match the goal.',
                    starter: py`
                        from turtle import *
                        for i in range(4):
                            forward(90)
                            left(80)
                    `,
                    solution: square(80),
                    hints: [
                        'The side length goes in forward. The corner turn goes in left.',
                        'Swap the two numbers.',
                    ],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: "Your turn: Robot for a day",
                    prompt: "Max asks you: \"Print Hi Max 3 times, each on its own line.\" Write the code yourself.",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        for i in range(3):
                            print("Hi Max")
                    `,
                    hints: ["A loop that runs 3 times, with one print inside."],
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
                    type: 'instruct',
                    turtle: true,
                    title: 'Honeycomb order',
                    prompt: 'Which instruction makes Bolt draw the dotted honeycomb?',
                    goalCode: py`
                        from turtle import *
                        for i in range(6):
                            forward(60)
                            left(60)
                    `,
                    choices: [
                        { text: 'Draw a hexagon.', code: py`
                            from turtle import *
                            for i in range(6):
                                forward(100)
                                left(60)
                        ` },
                        { text: 'Draw a 6-sided shape with sides of 60, turning 60 each time.', code: py`
                            from turtle import *
                            for i in range(6):
                                forward(60)
                                left(60)
                        ` },
                        { text: 'Draw 6 lines.', code: py`
                            from turtle import *
                            for i in range(6):
                                forward(60)
                                left(90)
                        ` },
                    ],
                    answer: 1,
                    hints: ['Which one says how many sides, how long, AND how much to turn?'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'TNT tripler',
                    prompt: 'You asked Bolt to TRIPLE the TNT (times 3). Find the number that proves its code is wrong.',
                    robot: py`print(tnt + tnt)`,
                    correct: py`print(tnt * 3)`,
                    inputName: 'tnt',
                    choices: ['0', '4'],
                    answer: '4',
                    hints: ['tnt + tnt is double, not triple. Which number gives the same answer either way?'],
                },
                {
                    id: 'boss',
                    type: 'fix',
                    turtle: true,
                    boss: true,
                    title: "BOSS: Bolt's broken stairs",
                    prompt: 'You asked Bolt: "Draw stairs going up, 3 steps, each 40 wide and 40 tall." Bolt made TWO mistakes. Find and fix both!',
                    starter: py`
                        from turtle import *
                        for i in range(2):
                            forward(40)
                            left(90)
                            forward(40)
                            left(90)
                    `,
                    solution: py`
                        from turtle import *
                        for i in range(3):
                            forward(40)
                            left(90)
                            forward(40)
                            right(90)
                    `,
                    hints: [
                        'Count the steps Bolt draws. Is it 3?',
                        'After going up, Shelly must turn back to face right before the next step.',
                    ],
                },
            ],
        },
    ],
};
