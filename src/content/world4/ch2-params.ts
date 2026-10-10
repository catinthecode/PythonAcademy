import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch2: Chapter = {
    id: 'ch2',
    title: 'Inputs and Outputs',
    emoji: '🎁',
    summary: 'Give functions information with parameters, and get answers back with return.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Spells with Blanks',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Kai holds a healing potion with a blank label.',
                    wide: true,
                    cast: [
                        { who: 'kai', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'My heal spell should work on ANY hero, with any HP.' },
                        { who: 'py', text: 'Give it a parameter: a blank in the brackets that gets filled in each time you call it.' },
                    ],
                    code: py`
                        def heal(hp):
                            print("HP is now", hp + 10)

                        heal(12)
                        heal(30)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py shows a function with two blanks.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [{ who: 'py', text: 'You can have several parameters, separated by commas. They\'re filled in order.' }],
                    code: py`
                        def attack(name, damage):
                            print(name, "hits for", damage)

                        attack("Kai", 7)
                        attack("Ivy", 4)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'The slime bounces, labelled with its HP.',
                    cast: [
                        { who: 'slime', pose: 'happy', x: 30 },
                        { who: 'kai', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'kai', text: 'The value you pass in is the argument. Inside the function, it goes by the parameter\'s name.' }],
                },
                {
                    scene: 'castle',
                    alt: 'Kai frowns at a message where the name and the number swapped places.',
                    cast: [
                        { who: 'kai', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'It says "7 hits for Kai"? Backwards!' },
                        { who: 'py', text: 'Arguments fill the parameters in ORDER. Swap them back.' },
                    ],
                    code: py`
                        def attack(name, damage):
                            print(name, "hits for", damage)

                        attack(7, "Kai")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'A small square and a big square, drawn by the same spell.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'kai', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Parameters make drawings flexible too. square(size) draws ANY size.' },
                        { who: 'kai', text: 'One spell, small and big!' },
                    ],
                    code: py`
                        from turtle import *

                        def square(size):
                            for i in range(4):
                                forward(size)
                                left(90)

                        square(25)
                        square(50)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai drinks a potion with his name on the label.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Parameters are the blanks in the def line. Arguments are the values you fill in when you call it, in the same order.' },
                        { who: 'kai', text: 'Blanks in the spell, values in the call!' },
                    ],
                    code: py`
                        def potion(name, amount):
                            print(f"{name} drinks a potion: +{amount} HP")

                        potion("Kai", 15)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Fill the Blanks',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Heal up',
                    prompt: 'What will this code print?',
                    code: py`
                        def heal(hp):
                            print(hp + 10)

                        heal(5)
                        heal(20)
                    `,
                    choices: ['15\n30', '5\n20', '15'],
                    answer: '15\n30',
                    hints: ['The first time hp is 5, the second time 20.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'In order',
                    prompt: 'What will this code print?',
                    code: py`
                        def attack(name, damage):
                            print(name, "hits for", damage)

                        attack("Slime", 2)
                    `,
                    choices: ['Slime hits for 2', '2 hits for Slime', 'name hits for damage'],
                    answer: 'Slime hits for 2',
                    hints: ['The first value fills the first parameter.'],
                },
                {
                    id: 'p3',
                    type: 'write',
                    title: 'Greetings',
                    prompt: 'Write `def greet(name):` that prints `Hello, <name>!`. Call it with "Kai" and then "Ivy".',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def greet(name):
                            print(f"Hello, {name}!")

                        greet("Kai")
                        greet("Ivy")
                    `,
                    check: py`
                        assert printed(function("greet"), "Zed") == "Hello, Zed!\n", 'greet("Zed") should print Hello, Zed!'
                        assert same_output(output, expected_output), "Call it with Kai, then Ivy."
                    `,
                    hints: ['def greet(name):', 'print(f"Hello, {name}!")'],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    title: 'Missing argument',
                    prompt: 'This crashes because the function needs a value. Fix the CALL so it prints `Shield up: 5`.',
                    starter: py`
                        def shield(power):
                            print("Shield up:", power)

                        shield()
                    `,
                    solution: py`
                        def shield(power):
                            print("Shield up:", power)

                        shield(5)
                    `,
                    hints: ['Put the value in the brackets when you call it.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Damage report',
                    prompt: 'Write `def report(name, hp):` that prints `<name> has <hp> HP`. Call it for "Kai" with 30 and "Slime" with 8.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def report(name, hp):
                            print(f"{name} has {hp} HP")

                        report("Kai", 30)
                        report("Slime", 8)
                    `,
                    check: py`
                        assert printed(function("report"), "Bolt", 99) == "Bolt has 99 HP\n", 'report("Bolt", 99) should print Bolt has 99 HP'
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['Two parameters: def report(name, hp):'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Getting Answers Back',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Py hands a gift box back to Kai, labelled return.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'kai', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'print shows a value on screen. return HANDS IT BACK, so you can store it or do more math with it!' },
                    ],
                    code: py`
                        def half(n):
                            return n / 2

                        x = half(10)
                        print(x + 1)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py compares print and return.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'A function with no return gives back None, which means "nothing".' }],
                    code: py`
                        def wave():
                            print("*waves*")

                        result = wave()
                        print(result)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai uses a function answer inside an if.',
                    cast: [{ who: 'kai', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'kai', text: 'Returned answers can go anywhere: in an if, in a variable, into another function!' }],
                    code: py`
                        def is_strong(hp):
                            return hp >= 20

                        if is_strong(25):
                            print("Ready for the boss!")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py slams a door labelled return; the lines behind it never get read.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'kai', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'return ENDS the function right away.' },
                        { who: 'kai', text: 'So the line after it never runs!' },
                    ],
                    code: py`
                        def check(hp):
                            return "OK"
                            print("You never see this")

                        print(check(5))
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai stares at an empty screen after calling a function.',
                    cast: [
                        { who: 'kai', pose: 'sad', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'I called bonus(10), but nothing showed up!' },
                        { who: 'py', text: 'A returned value vanishes unless you print it or store it.' },
                    ],
                    code: py`
                        def bonus(score):
                            return score + 5

                        bonus(10)
                        print(bonus(10))
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai levels up, glowing. Py hands him a gift box labelled return.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'print SHOWS a value. return GIVES IT BACK. Return answers so the rest of your code can use them.' },
                        { who: 'kai', text: 'Level 4, here I come!' },
                    ],
                    code: py`
                        def level_up(level):
                            return level + 1

                        new_level = level_up(3)
                        print("New level:", new_level)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Return to Sender',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Double it',
                    prompt: 'Write `def double(n):` that RETURNS n times 2 (don\'t print inside it!). Then print `double(7)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def double(n):
                            return n * 2

                        print(double(7))
                    `,
                    check: py`
                        f = function("double")
                        assert f(5) == 10 and f(0) == 0, "double(5) should RETURN 10."
                        assert printed(f, 3) == "", "double should return the answer, not print it."
                        assert same_output(output, expected_output), "print(double(7)) should show 14."
                    `,
                    hints: ['def double(n):\n    return n * 2'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    title: 'Print is not return',
                    prompt: 'What will this code print?',
                    code: py`
                        def f():
                            print("hi")

                        x = f()
                        print(x)
                    `,
                    choices: ['hi\nhi', 'hi\nNone', 'None'],
                    answer: 'hi\nNone',
                    hints: ['f prints hi, but returns nothing, which is None.'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Lost answer',
                    prompt: 'This crashes because `add` prints instead of returning. Fix `add` so the program prints 6.',
                    starter: py`
                        def add(a, b):
                            print(a + b)

                        total = add(2, 3) + 1
                        print(total)
                    `,
                    solution: py`
                        def add(a, b):
                            return a + b

                        total = add(2, 3) + 1
                        print(total)
                    `,
                    hints: ['add(2, 3) needs to GIVE BACK 5 so you can add 1 to it.'],
                },
                {
                    id: 'p8',
                    type: 'fill',
                    title: 'Give it back',
                    prompt: 'Fill in the keyword that hands the answer back.',
                    template: py`
                        def triple(n):
                            ___ n * 3

                        print(triple(4))
                    `,
                    answers: ['return'],
                    hints: ['It starts with "ret".'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Room area',
                    prompt: 'Write `def area(width, height):` that returns width × height. Print `area(3, 4)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def area(width, height):
                            return width * height

                        print(area(3, 4))
                    `,
                    check: py`
                        f = function("area")
                        assert f(5, 5) == 25 and f(2, 7) == 14, "area(5, 5) should return 25."
                        assert same_output(output, expected_output), "print(area(3, 4)) should show 12."
                    `,
                    hints: ['return width * height'],
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
                    title: 'Chain it',
                    prompt: 'What will this code print?',
                    code: py`
                        def add_one(n):
                            return n + 1

                        print(add_one(add_one(5)))
                    `,
                    choices: ['6', '7', '5'],
                    answer: '7',
                    hints: ['Work from the inside out: add_one(5) is 6.'],
                },
                {
                    id: 't2',
                    type: 'write',
                    title: 'Is it even?',
                    prompt: 'Write `def is_even(n):` that returns True if n is even and False if not. Print `is_even(10)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def is_even(n):
                            return n % 2 == 0

                        print(is_even(10))
                    `,
                    check: py`
                        f = function("is_even")
                        assert f(4) is True and f(7) is False and f(0) is True, "is_even should return True for even numbers, False for odd ones."
                        assert same_output(output, expected_output), "print(is_even(10)) should show True."
                    `,
                    hints: ['return n % 2 == 0'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Damage formula',
                    prompt: 'Write `def damage(attack, defense):` that returns attack minus defense, but never less than 1 (every hit does at least 1). Print `damage(10, 4)` and `damage(3, 8)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def damage(attack, defense):
                            result = attack - defense
                            if result < 1:
                                return 1
                            return result

                        print(damage(10, 4))
                        print(damage(3, 8))
                    `,
                    check: py`
                        f = function("damage")
                        assert f(10, 4) == 6, "damage(10, 4) should return 6."
                        assert f(5, 5) == 1, "damage(5, 5) is 0, but every hit does at least 1."
                        assert f(3, 8) == 1, "damage(3, 8) should return 1, not a negative number."
                        assert f(20, 1) == 19, "damage(20, 1) should return 19."
                        assert same_output(output, expected_output), "Print damage(10, 4) and damage(3, 8)."
                    `,
                    hints: ['Work out attack - defense first.', 'If that is less than 1, return 1. Otherwise return it.'],
                },
            ],
        },
    ],
};
