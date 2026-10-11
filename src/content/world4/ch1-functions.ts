import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch1: Chapter = {
    id: 'ch1',
    title: 'Spellbooks',
    emoji: '📜',
    summary: 'Package steps into a function with def, name it, and use it again and again.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Write a Spell Once',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Kai the young knight meets Py at the castle gates.',
                    wide: true,
                    cast: [
                        { who: 'kai', pose: 'wave', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'I keep writing the same three lines to cheer my team. Boring!' },
                        { who: 'py', text: 'Write them ONCE in a function, a spell with a name. Then cast it whenever you like.' },
                    ],
                    code: py`
                        def cheer():
                            print("Hip hip...")
                            print("HOORAY!")

                        cheer()
                        cheer()
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py labels the parts: def, the name, brackets, colon, pushed-in body.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'def NAME(): then the pushed-in steps. Defining only WRITES the spell. cheer() is what CASTS it.' },
                    ],
                },
                {
                    scene: 'meadow',
                    alt: 'Kai draws two squares using a square spell.',
                    cast: [
                        { who: 'kai', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'kai', text: 'Functions work with turtle drawings too. One square spell, as many squares as I want!' }],
                    code: py`
                        from turtle import *

                        def square():
                            for i in range(4):
                                forward(40)
                                left(90)

                        square()
                        penup()
                        forward(60)
                        pendown()
                        square()
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai waves a wand, but no spell comes out.',
                    cast: [
                        { who: 'kai', pose: 'sad', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'I wrote cheer and nothing happened!' },
                        { who: 'py', text: 'Without ( ) you only NAME the spell. The brackets cast it.' },
                    ],
                    code: py`
                        def cheer():
                            print("Hooray!")

                        cheer
                        print("Was it cast?")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'A giant stomps three times. Kai covers his ears.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'kai', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Cast a spell inside a loop to repeat it.' },
                        { who: 'kai', text: 'STOMP, STOMP, STOMP!' },
                    ],
                    code: py`
                        def stomp():
                            print("STOMP!")

                        for i in range(3):
                            stomp()
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py opens a spellbook. Kai raises a glowing shield.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'def WRITES the spell and name() CASTS it. Pushed-in lines belong to the spell, and you must write it before you cast it.' },
                        { who: 'kai', text: 'Write once, cast forever!' },
                    ],
                    code: py`
                        def shield():
                            print("Shield up!")

                        print("Battle starts")
                        shield()
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Cast Spells',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Cast twice',
                    prompt: 'What will this code print?',
                    code: py`
                        def zap():
                            print("Zap!")

                        zap()
                        zap()
                    `,
                    choices: ['Zap!', 'Zap!\nZap!', 'Nothing'],
                    answer: 'Zap!\nZap!',
                    hints: ['Every zap() runs the function once.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Never cast',
                    prompt: 'Careful! What will this code print?',
                    code: py`
                        def zap():
                            print("Zap!")

                        print("Ready")
                    `,
                    choices: ['Zap!\nReady', 'Ready', 'Ready\nZap!'],
                    answer: 'Ready',
                    hints: ['Defining a function does NOT run it.'],
                },
                {
                    id: 'p3',
                    type: 'fix',
                    title: 'Too early',
                    prompt: 'This crashes: the spell is cast before it\'s written! Fix it.',
                    starter: py`
                        cheer()

                        def cheer():
                            print("Go, team!")
                    `,
                    solution: py`
                        def cheer():
                            print("Go, team!")

                        cheer()
                    `,
                    hints: ['Python reads top to bottom. The def must come before the call.'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Spell inside a spell',
                    prompt: 'What will this code print?',
                    code: py`
                        def hello():
                            print("Hello")

                        def greet_twice():
                            hello()
                            hello()
                            print("Done")

                        greet_twice()
                    `,
                    choices: ['Hello\nHello\nDone', 'Done\nHello\nHello', 'Hello\nDone'],
                    answer: 'Hello\nHello\nDone',
                    hints: ['greet_twice runs hello, hello, then prints Done.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Battle cry',
                    prompt: 'Write a function `battle_cry()` that prints `For the kingdom!` and `Charge!`. Then call it twice.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def battle_cry():
                            print("For the kingdom!")
                            print("Charge!")

                        battle_cry()
                        battle_cry()
                    `,
                    check: py`
                        f = function("battle_cry")
                        assert printed(f) == "For the kingdom!\nCharge!\n", "battle_cry() should print the two lines."
                        assert same_output(output, expected_output), "Call battle_cry() twice."
                    `,
                    hints: ['def battle_cry():', 'Two pushed-in prints, then battle_cry() twice at the bottom (not pushed in).'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Why Spells?',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Py lists three reasons for functions.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'kai', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Functions: 1) no copy-pasting, 2) a name that explains what the steps do, 3) fix a bug in ONE place.' },
                    ],
                },
                {
                    scene: 'castle',
                    alt: 'The slime monster bounces in and causes trouble.',
                    cast: [
                        { who: 'slime', pose: 'happy', x: 30 },
                        { who: 'kai', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'slime', text: 'Blorp! If your square is wrong, you only fix the square function, and every square is fixed!' }],
                },
                {
                    scene: 'meadow',
                    alt: 'Kai draws a house made of a square and a roof function.',
                    cast: [{ who: 'kai', pose: 'point', x: 40 }],
                    bubbles: [{ who: 'kai', text: 'And I can name BIG ideas, like house(), made of smaller steps.' }],
                    code: py`
                        from turtle import *

                        def house():
                            for i in range(4):
                                forward(60)
                                left(90)
                            left(90)
                            forward(60)
                            right(30)
                            forward(60)
                            right(120)
                            forward(60)
                            right(30)
                            forward(60)
                            left(90)

                        house()
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py holds up two spell labels: a mysterious f and a clear cheer_team.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'kai', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Name spells with doing words, joined by _, like cheer_team.' },
                        { who: 'kai', text: 'f() would tell me nothing!' },
                    ],
                    code: py`
                        def cheer_team():
                            print("Go, team!")

                        cheer_team()
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai edits one line in his spellbook and every message changes.',
                    cast: [
                        { who: 'kai', pose: 'happy', x: 25 },
                        { who: 'slime', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'I changed ONE line, and both greetings changed!' },
                        { who: 'slime', text: 'Blorp! Magic!' },
                    ],
                    caption: 'Change the message once, then run again.',
                    code: py`
                        def greet():
                            print("Welcome, hero!")

                        greet()
                        greet()
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'A castle built from wall blocks. Py and Slime admire it.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'slime', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Break big jobs into named spells. Small spells build bigger ones, like bricks build a castle.' },
                        { who: 'slime', text: 'Blorp! Even I can read that code!' },
                    ],
                    code: py`
                        def wall():
                            print("|####|")

                        def castle():
                            print(" CASTLE")
                            wall()
                            wall()

                        castle()
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Spell Crafting',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    turtle: true,
                    title: 'Square spell',
                    prompt: 'Write `def square():` that draws a square with sides of 50. Call it, hop 70 forward with the pen up, and call it again.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *

                        def square():
                            for i in range(4):
                                forward(50)
                                left(90)

                        square()
                        penup()
                        forward(70)
                        pendown()
                        square()
                    `,
                    check: 'function("square")\nassert source.count("square()") >= 3, "Define square() once and call it twice."',
                    hints: ['def square(): with the loop pushed in.', 'Then: square(), penup(), forward(70), pendown(), square()'],
                },
                {
                    id: 'p6',
                    type: 'fill',
                    title: 'Name the spell',
                    prompt: 'Fill in the keyword that starts a function.',
                    template: py`
                        ___ shout():
                            print("HEY!")

                        shout()
                    `,
                    answers: ['def'],
                    hints: ['It\'s short for "define".'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Flat spell',
                    prompt: 'Only the first line belongs to the spell. Fix it so BOTH lines are part of `warn()`, and the code prints the 🎯 Goal.',
                    starter: py`
                        def warn():
                            print("Watch out!")
                        print("Slime ahead!")

                        warn()
                        warn()
                    `,
                    solution: py`
                        def warn():
                            print("Watch out!")
                            print("Slime ahead!")

                        warn()
                        warn()
                    `,
                    hints: ['Lines inside a function are pushed in.'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Loop of spells',
                    prompt: 'What will this code print?',
                    code: py`
                        def star():
                            print("*", end="")

                        for i in range(3):
                            star()
                        print()
                    `,
                    choices: ['***', '*\n*\n*', '*'],
                    answer: '***',
                    hints: ['end="" keeps the stars on one line.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Royal banner',
                    prompt: 'Write `def banner():` that prints `~~~~~~`, `KINGDOM`, `~~~~~~`. Call it twice.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def banner():
                            print("~~~~~~")
                            print("KINGDOM")
                            print("~~~~~~")

                        banner()
                        banner()
                    `,
                    check: py`
                        assert printed(function("banner")) == "~~~~~~\nKINGDOM\n~~~~~~\n", "banner() should print the three lines."
                        assert same_output(output, expected_output), "Call banner() twice."
                    `,
                    hints: ['def banner(): with three pushed-in prints.'],
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
                    title: 'Call order',
                    prompt: 'What will this code print?',
                    code: py`
                        def a():
                            print("A")

                        def b():
                            print("B")
                            a()

                        b()
                        a()
                    `,
                    choices: ['B\nA\nA', 'A\nB\nA', 'B\nA'],
                    answer: 'B\nA\nA',
                    hints: ['b() prints B and then calls a(). Then a() runs again.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Missing call',
                    prompt: 'The spell is written but nothing happens! Make it print the 🎯 Goal.',
                    starter: py`
                        def potion():
                            print("Glug glug!")
                            print("HP restored")
                    `,
                    solution: py`
                        def potion():
                            print("Glug glug!")
                            print("HP restored")

                        potion()
                    `,
                    hints: ['A function only runs when you call it.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    turtle: true,
                    boss: true,
                    title: 'BOSS: Two towers',
                    prompt: 'Write `def tower():` that draws a rectangle 30 wide and 80 tall (start along the bottom, turning left). Draw one tower at the start, then `goto(100, 0)` with the pen up and draw another.',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *

                        def tower():
                            for i in range(2):
                                forward(30)
                                left(90)
                                forward(80)
                                left(90)

                        tower()
                        penup()
                        goto(100, 0)
                        pendown()
                        tower()
                    `,
                    check: 'function("tower")\nassert source.count("tower()") >= 3, "Define tower() once and call it twice."',
                    hints: ['A rectangle: forward 30, left 90, forward 80, left 90, twice.', 'tower(), penup(), goto(100, 0), pendown(), tower()'],
                },
            ],
        },
    ],
};
