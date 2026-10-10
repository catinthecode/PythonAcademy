import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch3: Chapter = {
    id: 'ch3',
    title: 'Small Pieces',
    emoji: '🧩',
    summary: 'Break a big problem into small functions that each do one job.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Break It Down',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Kai stares at a huge quest scroll.',
                    wide: true,
                    cast: [
                        { who: 'kai', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 50, y: 100, scale: 1.3 }],
                    bubbles: [
                        { who: 'kai', text: 'Draw a whole village? That\'s too big!' },
                        { who: 'py', text: 'Break it into pieces: a house function, a tree function, then a village function that uses them.' },
                    ],
                },
                {
                    scene: 'meadow',
                    alt: 'Py builds a scene from small functions.',
                    cast: [{ who: 'py', pose: 'point', x: 28 }],
                    bubbles: [{ who: 'py', text: 'Small functions with parameters can be combined like building blocks.' }],
                    code: py`
                        from turtle import *

                        def triangle(size):
                            for i in range(3):
                                forward(size)
                                left(120)

                        def flower():
                            for i in range(6):
                                triangle(40)
                                left(60)

                        flower()
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai stacks labelled blocks: greet and shout.',
                    cast: [
                        { who: 'kai', pose: 'happy', x: 30 },
                        { who: 'slime', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'kai', text: 'Functions can call functions! Each one does ONE small job.' }],
                    code: py`
                        def greet(name):
                            return "Hi " + name

                        def shout(text):
                            return text.upper() + "!"

                        print(shout(greet("Kai")))
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py holds up a very long spell name with the word and in the middle.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'kai', pose: 'think', x: 75, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'If a name needs "and", the function does too much.' },
                        { who: 'kai', text: 'draw_house_and_tree... I should split it!' },
                    ],
                },
                {
                    scene: 'castle',
                    alt: 'Slime tries to grab gold that is locked inside another function.',
                    cast: [
                        { who: 'slime', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'slime', text: 'Blorp? show() cannot see the gold!' },
                        { who: 'py', text: 'Variables made inside a function stay inside it.' },
                    ],
                    code: py`
                        def make():
                            gold = 5

                        def show():
                            print(gold)

                        make()
                        show()
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai fits small code blocks together into a tower.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Big problem, small named pieces. Each piece does one job. Pass values in with parameters and get them out with return.' },
                        { who: 'kai', text: 'Building blocks for code!' },
                    ],
                    code: py`
                        def add_tax(price):
                            return price + 2

                        def total(a, b):
                            return add_tax(a) + add_tax(b)

                        print(total(5, 10))
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Building Blocks',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Who calls who',
                    prompt: 'What will this code print?',
                    code: py`
                        def wake():
                            print("Wake up")

                        def eat():
                            print("Eat")

                        def morning():
                            wake()
                            eat()
                            print("Adventure!")

                        morning()
                    `,
                    choices: ['Wake up\nEat\nAdventure!', 'Adventure!\nWake up\nEat', 'Adventure!'],
                    answer: 'Wake up\nEat\nAdventure!',
                    hints: ['morning() runs its lines in order: wake(), eat(), then the print.'],
                },
                {
                    id: 'p2',
                    type: 'write',
                    title: 'Line maker',
                    prompt: 'Write `def line(n):` that prints n dashes. Then call `line(5)` and `line(10)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def line(n):
                            print("-" * n)

                        line(5)
                        line(10)
                    `,
                    check: py`
                        assert printed(function("line"), 3) == "---\n", "line(3) should print ---"
                        assert same_output(output, expected_output), "Call line(5) and line(10)."
                    `,
                    hints: ['print("-" * n)'],
                },
                {
                    id: 'p3',
                    type: 'write',
                    title: 'Name box',
                    prompt: '`line(n)` is done for you. Write `def box(text):` that uses `line` to print a box around any text, like the 🎯 Goal. Then call `box("Kai")`.',
                    starter: py`
                        def line(n):
                            print("-" * n)
                    `,
                    solution: py`
                        def line(n):
                            print("-" * n)

                        def box(text):
                            line(len(text) + 4)
                            print("| " + text + " |")
                            line(len(text) + 4)

                        box("Kai")
                    `,
                    check: py`
                        assert printed(function("box"), "Slime") == "---------\n| Slime |\n---------\n", 'box("Slime") should fit the box to the word.'
                        assert same_output(output, expected_output), 'Call box("Kai").'
                    `,
                    hints: ['The line is len(text) + 4 long (2 for "| " and 2 for " |").', 'line, then the text line, then line again.'],
                },
                {
                    id: 'p4',
                    type: 'parsons',
                    title: 'Put the pieces together',
                    prompt: 'Arrange the lines so the program prints the 🎯 Goal. Remember: define before you call! One line is not needed.',
                    lines: [
                        'def hello(name):',
                        '    print("Hi", name)',
                        'hello("Kai")',
                        'hello("Slime")',
                    ],
                    distractors: ['    hello("Bolt")'],
                    hints: ['The def line and its pushed-in body come first.', 'The calls are not pushed in.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Title card',
                    prompt: 'Write `def stars(n):` that prints n stars, and `def title(text):` that prints a star line, the text, and a star line (the lines as long as the text). Call `title("QUEST")`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def stars(n):
                            print("*" * n)

                        def title(text):
                            stars(len(text))
                            print(text)
                            stars(len(text))

                        title("QUEST")
                    `,
                    check: py`
                        function("stars")
                        assert printed(function("title"), "HI") == "**\nHI\n**\n", 'title("HI") should print **, HI, **'
                        assert "stars(" in source.split("def title")[-1], "title should USE stars()."
                        assert same_output(output, expected_output), 'Call title("QUEST").'
                    `,
                    hints: ['title calls stars(len(text)) twice, with print(text) in between.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Plan, Then Build',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Py writes a plan as a list of function names.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'kai', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Plan first: write the names of the pieces you need. Then build and test them one at a time.' },
                    ],
                },
                {
                    scene: 'castle',
                    alt: 'The slime hides a variable outside a function.',
                    cast: [
                        { who: 'slime', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Give a function everything it needs through its parameters. Then it works anywhere!' },
                    ],
                    code: py`
                        def describe(name, hp):
                            print(name, "has", hp, "HP")

                        describe("Kai", 30)
                        describe("Slime", 5)
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Kai tests each piece before putting them together.',
                    cast: [{ who: 'kai', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'kai', text: 'Test each small piece on its own. Then the big thing works the first time!' }],
                },
                {
                    scene: 'castle',
                    alt: 'Kai tests one small function with two quick prints.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Test a new piece with quick prints before building more.' },
                        { who: 'kai', text: 'True for 150, False for 7. It works!' },
                    ],
                    code: py`
                        def is_big(n):
                            return n > 100

                        print(is_big(150))
                        print(is_big(7))
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py writes empty spell pages labelled with names, to fill in later.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'kai', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Plan with empty pieces. pass means "fill me in later".' },
                        { who: 'kai', text: 'The plan runs before I build anything!' },
                    ],
                    code: py`
                        def draw_house():
                            pass

                        def draw_tree():
                            pass

                        draw_house()
                        draw_tree()
                        print("The plan works!")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Kai and Slime check off pieces on a plan, one at a time.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'slime', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Plan the pieces, build one, test it, then build the next. Parameters carry what each piece needs.' },
                        { who: 'slime', text: 'Blorp. Small bites are easier to chew!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Build with Pieces',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    turtle: true,
                    title: 'Square of any size',
                    prompt: 'Write `def square(size):`. Draw a square of 30, then (without moving) a square of 60.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *

                        def square(size):
                            for i in range(4):
                                forward(size)
                                left(90)

                        square(30)
                        square(60)
                    `,
                    check: 'function("square")\nassert "square(30)" in source and "square(60)" in source, "Call square(30) and square(60)."',
                    hints: ['Use forward(size) inside the loop.'],
                },
                {
                    id: 'p6',
                    type: 'write',
                    turtle: true,
                    title: 'Row of squares',
                    prompt: '`square(size)` is done. Write `def row(count, size):` that draws `count` squares in a row, hopping `size + 10` forward between them. Call `row(3, 40)`.',
                    starter: py`
                        from turtle import *

                        def square(size):
                            for i in range(4):
                                forward(size)
                                left(90)
                    `,
                    solution: py`
                        from turtle import *

                        def square(size):
                            for i in range(4):
                                forward(size)
                                left(90)

                        def row(count, size):
                            for i in range(count):
                                square(size)
                                penup()
                                forward(size + 10)
                                pendown()

                        row(3, 40)
                    `,
                    check: 'function("row")\nassert "row(3, 40)" in source, "Call row(3, 40)."',
                    hints: ['Loop count times: square(size), then hop forward(size + 10) with the pen up.'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Hidden helper',
                    prompt: '`describe` uses a variable that only exists outside it. Give it a `name` parameter and pass the name in, so it prints the 🎯 Goal.',
                    starter: py`
                        def describe():
                            print(hero, "is ready")

                        describe()
                    `,
                    solution: py`
                        def describe(name):
                            print(name, "is ready")

                        describe("Kai")
                    `,
                    check: py`
                        assert printed(function("describe"), "Ivy") == "Ivy is ready\n", 'describe("Ivy") should print Ivy is ready'
                        assert same_output(output, expected_output), "Kai is ready"
                    `,
                    hints: ['def describe(name): and print(name, "is ready")', 'Call it with describe("Kai").'],
                },
                {
                    id: 'p8',
                    type: 'instruct',
                    title: 'A good plan',
                    prompt: 'You want Bolt to draw the dotted picture. Which instruction breaks it into the right pieces?',
                    turtle: true,
                    goalCode: py`
                        from turtle import *

                        def square(size):
                            for i in range(4):
                                forward(size)
                                left(90)

                        for i in range(3):
                            square(40)
                            penup()
                            forward(50)
                            pendown()
                    `,
                    choices: [
                        { text: 'Draw some squares.', code: py`
                            from turtle import *
                            for i in range(4):
                                forward(40)
                                left(90)
                        ` },
                        { text: 'Make a square(size) function, then use it 3 times with size 40, moving 50 forward each time.', code: py`
                            from turtle import *

                            def square(size):
                                for i in range(4):
                                    forward(size)
                                    left(90)

                            for i in range(3):
                                square(40)
                                penup()
                                forward(50)
                                pendown()
                        ` },
                        { text: 'Draw 3 squares.', code: py`
                            from turtle import *
                            for i in range(3):
                                for j in range(4):
                                    forward(40)
                                    left(90)
                        ` },
                    ],
                    answer: 1,
                    hints: ['"Draw 3 squares" doesn\'t say they should be side by side.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Hero card',
                    prompt: 'Write `def card(name, hp, level):` that prints a 3-line card like the 🎯 Goal. Call it for Kai (30 HP, level 4) and Slime (5 HP, level 1).',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def card(name, hp, level):
                            print("=== " + name + " ===")
                            print("HP:", hp)
                            print("Level:", level)

                        card("Kai", 30, 4)
                        card("Slime", 5, 1)
                    `,
                    check: py`
                        assert printed(function("card"), "Bolt", 99, 9) == "=== Bolt ===\nHP: 99\nLevel: 9\n", "card should print the 3 lines for any hero."
                        assert same_output(output, expected_output), "Make cards for Kai and Slime."
                    `,
                    hints: ['Three parameters, three prints.'],
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
                    title: 'Inner and outer',
                    prompt: 'What will this code print?',
                    code: py`
                        def double(n):
                            return n * 2

                        def quadruple(n):
                            return double(double(n))

                        print(quadruple(3))
                    `,
                    choices: ['6', '12', '9'],
                    answer: '12',
                    hints: ['double(3) is 6. double(6) is...'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Wrong piece',
                    prompt: '`banner` should use `line(len(text))` so the lines match the text. Fix it to print the 🎯 Goal.',
                    starter: py`
                        def line(n):
                            print("=" * n)

                        def banner(text):
                            line(5)
                            print(text)
                            line(5)

                        banner("HERO KAI")
                    `,
                    solution: py`
                        def line(n):
                            print("=" * n)

                        def banner(text):
                            line(len(text))
                            print(text)
                            line(len(text))

                        banner("HERO KAI")
                    `,
                    hints: ['The line length should come from the text, not always 5.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    turtle: true,
                    boss: true,
                    title: 'BOSS: Castle wall',
                    prompt: 'Write `def tower(x):` that jumps to `(x, 0)` and draws a 30 × 30 square. Then write `def wall():` that calls `tower` for x = 0, 40, 80 and 120. Call `wall()`.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *

                        def tower(x):
                            penup()
                            goto(x, 0)
                            pendown()
                            for i in range(4):
                                forward(30)
                                left(90)

                        def wall():
                            for x in [0, 40, 80, 120]:
                                tower(x)

                        wall()
                    `,
                    check: 'function("tower")\nfunction("wall")\nassert "tower(" in source.split("def wall")[-1], "wall() should call tower()."',
                    hints: ['tower(x): penup, goto(x, 0), pendown, then a square.', 'wall(): call tower(0), tower(40), tower(80), tower(120), or loop over the list.'],
                },
            ],
        },
    ],
};
