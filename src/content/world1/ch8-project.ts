import { py } from '../helpers';
import type { Chapter } from '../schema';

const HOUSE = py`
    from turtle import *
    penup()
    goto(-100, 0)
    pendown()
    for i in range(4):
        forward(80)
        left(90)
`;

const TRUNK = py`
    from turtle import *
    color("brown")
    penup()
    goto(60, 0)
    pendown()
    forward(20)
    left(90)
    forward(40)
    left(90)
    forward(20)
    left(90)
    forward(40)
    left(90)
`;

export const ch8: Chapter = {
    id: 'ch8',
    title: 'Project: Pixel Scene',
    emoji: '🏡',
    summary: 'Plan a big build, break it into parts, and make a scene that is all yours.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Plan Before You Build',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Max dreams of a whole scene: a house, a tree and a sun.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'max', text: 'I want a whole scene: a house, a tree, and the sun!' },
                        { who: 'py', text: 'Big builds start with a plan. Break it into small parts and build one at a time.' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Py shows a plan written on a scroll: ground, house, roof, tree, sun.',
                    cast: [{ who: 'py', pose: 'point', x: 28 }],
                    props: [{ item: 'scroll', x: 68, y: 100, scale: 1.2 }],
                    bubbles: [
                        { who: 'py', text: 'Plan: 1 ground, 2 house, 3 roof, 4 tree, 5 sun. Build a part, check it, then do the next!' },
                    ],
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly stands on a giant map grid with (0, 0) marked in the middle.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'shelly', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: "Shelly's world is a map. The middle is (0, 0)." },
                        { who: 'shelly', text: 'goto(100, 100) walks me straight to that spot!' },
                    ],
                    code: py`
                        from turtle import *
                        goto(100, 0)
                        goto(100, 100)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly lifts her pencil and hops to a new spot.',
                    cast: [
                        { who: 'shelly', pose: 'talk', x: 35 },
                        { who: 'max', pose: 'think', x: 78, flip: true },
                    ],
                    bubbles: [
                        { who: 'shelly', text: 'goto(x, y) takes me to a spot. x is left/right, y is up/down. Lift my pencil first!' },
                    ],
                    code: py`
                        from turtle import *
                        penup()
                        goto(-100, 50)
                        pendown()
                        forward(80)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Py points left and down, where the negative numbers are on the map.',
                    cast: [
                        { who: 'max', pose: 'think', x: 25 },
                        { who: 'py', pose: 'point', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'What does a minus number mean?' },
                        { who: 'py', text: 'Minus x is left of the middle. Minus y is below it.' },
                    ],
                    code: py`
                        from turtle import *
                        penup()
                        goto(-120, -60)
                        pendown()
                        forward(60)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly swaps her pencil for a red one.',
                    wide: true,
                    cast: [
                        { who: 'shelly', pose: 'happy', x: 30 },
                        { who: 'max', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'shelly', text: 'color("red") swaps my pencil colour. Try "blue", "green", "orange"...' },
                        { who: 'max', text: 'Map spots, pencil up and down, colours. I am ready to plan my scene!' },
                    ],
                    code: py`
                        from turtle import *
                        color("red")
                        forward(80)
                        color("blue")
                        left(90)
                        forward(80)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'House Parts',
            problems: [
                {
                    id: 's1',
                    type: 'write',
                    turtle: true,
                    title: 'Part 1: the ground',
                    prompt: 'Draw the ground: go to `(-150, 0)` with the pencil up, put it down, and walk 300 steps.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *
                        penup()
                        goto(-150, 0)
                        pendown()
                        forward(300)
                    `,
                    hints: [
                        'penup(), then goto(-150, 0), then pendown().',
                        'Then forward(300).',
                    ],
                },
                {
                    id: 's2',
                    type: 'predict',
                    about: 'drawing',
                    title: 'Where does it go?',
                    prompt: 'Shelly starts in the middle. Where does this line get drawn?',
                    code: py`
                        from turtle import *
                        penup()
                        goto(0, 100)
                        pendown()
                        forward(60)
                    `,
                    choices: ['Above the middle', 'Below the middle', 'Right in the middle'],
                    answer: 'Above the middle',
                    hints: ['y is up and down. Is 100 up or down?'],
                },
                {
                    id: 's3',
                    type: 'write',
                    turtle: true,
                    title: 'Part 2: the walls',
                    prompt: 'Draw the house walls: a square with sides of 80, starting at `(-100, 0)`. Use a loop!',
                    starter: py`from turtle import *`,
                    solution: HOUSE,
                    check: 'assert "for" in source, "Use a loop for the square!"',
                    hints: [
                        'First hop to (-100, 0) with the pencil up.',
                        'Then the square loop you know: forward(80), left(90), 4 times.',
                    ],
                },
                {
                    id: 's4',
                    type: 'fill',
                    turtle: true,
                    title: 'Part 3: the roof',
                    prompt: 'The roof sits on top of the walls. What turn makes it a triangle?',
                    template: py`
                        from turtle import *
                        penup()
                        goto(-100, 80)
                        pendown()
                        for i in range(3):
                            forward(80)
                            left(___)
                    `,
                    answers: ['120'],
                    hints: ['Triangles turn the same amount at every corner. You used it in Chapter 3!'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    turtle: true,
                    title: "Your turn: Front door",
                    prompt: "Draw a door: go to `(-70, 0)` and draw a rectangle 20 wide and 40 tall.",
                    starter: py`
                        from turtle import *
                        # Your turn! Write the rest yourself.
                    `,
                    solution: py`
                        from turtle import *
                        penup()
                        goto(-70, 0)
                        pendown()
                        forward(20)
                        left(90)
                        forward(40)
                        left(90)
                        forward(20)
                        left(90)
                        forward(40)
                        left(90)
                    `,
                    hints: ["penup(), goto(-70, 0), pendown() first.","Then a rectangle: 20, turn, 40, turn, 20, turn, 40, turn."],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Making It Yours',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Py points out that a tree is just a rectangle and a square.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'max', pose: 'surprised', x: 74, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Reuse what you know! A tree is a rectangle trunk with a square of leaves on top.' },
                        { who: 'max', text: 'I already know how to draw both of those!' },
                    ],
                },
                {
                    scene: 'meadow',
                    alt: 'Py copies the square loop and changes only the colour, the spot and the size.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'shelly', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Copy your square loop. Change only the colour, spot and size.' },
                        { who: 'shelly', text: 'Same loop, brand new bush!' },
                    ],
                    code: py`
                        from turtle import *
                        color("green")
                        penup()
                        goto(-50, 20)
                        pendown()
                        for i in range(4):
                            forward(40)
                            left(90)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Max points at the square sun. Shelly draws a circle.',
                    cast: [
                        { who: 'max', pose: 'point', x: 25 },
                        { who: 'shelly', pose: 'happy', x: 70, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'And the sun?' },
                        { who: 'shelly', text: 'circle(25) draws a circle for you! Hop to where it should go first.' },
                    ],
                    code: py`
                        from turtle import *
                        color("orange")
                        circle(25)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Max groans at a long line running from the house up to the sun.',
                    cast: [
                        { who: 'max', pose: 'sad', x: 25 },
                        { who: 'shelly', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'Why is there a line to my sun?' },
                        { who: 'shelly', text: 'No penup() before goto, so I drew the whole way!' },
                    ],
                    code: py`
                        from turtle import *
                        forward(50)
                        goto(80, 120)
                        circle(20)
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Py sticks labels on parts of a long program, like sticky notes.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'max', pose: 'happy', x: 75, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Label each part with a # note. Python skips them.' },
                        { who: 'max', text: 'But they help ME find my sun later!' },
                    ],
                    code: py`
                        from turtle import *
                        # The ground
                        forward(100)
                        # The sun
                        penup()
                        goto(60, 100)
                        pendown()
                        circle(20)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py cheers: it is your scene, add anything you like.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'happy', x: 30 },
                        { who: 'bolt', pose: 'wave', x: 70, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: "Once the parts work, it's YOUR scene. Change colours, add more trees, a fence, stars..." },
                        { who: 'bolt', text: 'And if you ask me for help, be specific about WHERE and HOW BIG!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Trees and Sky',
            problems: [
                {
                    id: 's5',
                    type: 'write',
                    turtle: true,
                    title: 'Part 4: the tree',
                    prompt: 'The trunk is done. Add the leaves: a green square with sides of 60, starting at `(40, 40)`.',
                    starter: TRUNK + '\n# Now the leaves:\n',
                    solution: TRUNK + '\n' + py`
                        color("green")
                        penup()
                        goto(40, 40)
                        pendown()
                        for i in range(4):
                            forward(60)
                            left(90)
                    `,
                    hints: [
                        'Same steps as the walls: pencil up, goto, pencil down, square loop.',
                        'color("green") first, then goto(40, 40).',
                    ],
                },
                {
                    id: 's6',
                    type: 'write',
                    turtle: true,
                    title: 'Part 5: the sun',
                    prompt: 'Add a sun: hop to `(100, 150)` and draw `circle(25)`.',
                    starter: py`
                        from turtle import *
                        color("orange")
                    `,
                    solution: py`
                        from turtle import *
                        color("orange")
                        penup()
                        goto(100, 150)
                        pendown()
                        circle(25)
                    `,
                    hints: ['penup(), goto(100, 150), pendown(), then circle(25).'],
                },
                {
                    id: 's7',
                    type: 'instruct',
                    turtle: true,
                    title: 'Ask for a fence',
                    prompt: "You want Bolt to add the dotted fence post. Which instruction says WHERE and HOW BIG?",
                    goalCode: py`
                        from turtle import *
                        penup()
                        goto(-140, 0)
                        pendown()
                        left(90)
                        forward(30)
                    `,
                    choices: [
                        { text: 'Add a fence post.', code: py`
                            from turtle import *
                            left(90)
                            forward(50)
                        ` },
                        { text: 'Add a fence post 30 tall at (-140, 0).', code: py`
                            from turtle import *
                            penup()
                            goto(-140, 0)
                            pendown()
                            left(90)
                            forward(30)
                        ` },
                        { text: 'Add a small fence post on the left.', code: py`
                            from turtle import *
                            penup()
                            goto(-60, 0)
                            pendown()
                            left(90)
                            forward(15)
                        ` },
                    ],
                    answer: 1,
                    hints: ['"Small" and "on the left" are fuzzy. Numbers are exact!'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    turtle: true,
                    title: "Your turn: Star in the sky",
                    prompt: "Draw a star at `(-120, 150)`: five lines of 40, turning right 144 each time. Use a loop!",
                    starter: py`
                        from turtle import *
                        # Your turn! Write the rest yourself.
                    `,
                    solution: py`
                        from turtle import *
                        penup()
                        goto(-120, 150)
                        pendown()
                        for i in range(5):
                            forward(40)
                            right(144)
                    `,
                    check: 'assert "for" in source, "Use a for loop!"',
                    hints: ["Hop to (-120, 150) with the pencil up first.","for i in range(5):\n    forward(40)\n    right(144)"],
                },
            ],
        },
        {
            kind: 'test',
            id: 'test',
            title: 'Project Showcase',
            problems: [
                {
                    id: 't1',
                    type: 'predict',
                    about: 'drawing',
                    title: 'Corner check',
                    prompt: 'Where will Shelly draw this line?',
                    code: py`
                        from turtle import *
                        penup()
                        goto(-100, -100)
                        pendown()
                        forward(50)
                    `,
                    choices: ['Bottom left', 'Top right', 'Top left'],
                    answer: 'Bottom left',
                    hints: ['Negative x is left. Negative y is down.'],
                },
                {
                    id: 't2',
                    type: 'instruct',
                    turtle: true,
                    title: 'A window, exactly',
                    prompt: 'Which instruction gets Bolt to draw the dotted window?',
                    goalCode: py`
                        from turtle import *
                        penup()
                        goto(-80, 30)
                        pendown()
                        for i in range(4):
                            forward(20)
                            left(90)
                    `,
                    choices: [
                        { text: 'Draw a window on the house.', code: py`
                            from turtle import *
                            for i in range(4):
                                forward(40)
                                left(90)
                        ` },
                        { text: 'Go to (-80, 30) and draw a square with sides of 20.', code: py`
                            from turtle import *
                            penup()
                            goto(-80, 30)
                            pendown()
                            for i in range(4):
                                forward(20)
                                left(90)
                        ` },
                    ],
                    answer: 1,
                    hints: ['Which one says WHERE and HOW BIG?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    hideGoal: true,
                    title: 'BOSS: Your pixel scene',
                    prompt: 'Build YOUR scene! It must use at least one loop, `goto` at least twice, at least one `color`, and draw at least 3 things. Copy parts from earlier problems, then make it your own.',
                    starter: py`
                        from turtle import *

                        # My plan:
                        # 1.
                        # 2.
                        # 3.
                    `,
                    solution: HOUSE + '\n' + py`
                        color("green")
                        penup()
                        goto(40, 40)
                        pendown()
                        for i in range(4):
                            forward(60)
                            left(90)
                        color("orange")
                        penup()
                        goto(100, 150)
                        pendown()
                        circle(25)
                    `,
                    check: py`
                        import turtle as _t
                        _d = _t._drawing()
                        _lines = [s for s in (_d["segments"] if _d else []) if not s.get("jump")]
                        assert "for" in source, "Use at least one loop."
                        assert source.count("goto") >= 2, "Use goto at least twice to put things in different places."
                        assert "color" in source, "Add some colour with color(...)."
                        assert len(_lines) >= 12, "Draw at least 3 things. Your scene looks a bit empty!"
                    `,
                    hints: [
                        'Start by copying your house walls from Part 2.',
                        'Then add a tree or sun from the other parts, each with its own goto.',
                        'Make it yours: change sizes, colours, or add stars and fences!',
                    ],
                },
            ],
        },
    ],
};
