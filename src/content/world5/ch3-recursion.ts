import { py } from '../helpers';
import type { Chapter } from '../schema';

// One line, so it can be dropped inside an indented py`...` check.
const RECURSIVE = (name: string) =>
    `assert "${name}(" in source.split("def ${name}")[-1].split("\\n\\n")[0], "${name} should call ITSELF (that's recursion)."`;

const TREE = py`
    from turtle import *

    def branch(length):
        if length < 20:
            return
        forward(length)
        left(30)
        branch(length * 0.6)
        right(60)
        branch(length * 0.6)
        left(30)
        backward(length)

    left(90)
    branch(80)
`;

export const ch3: Chapter = {
    id: 'ch3',
    title: 'Recursion',
    emoji: '🪞',
    summary: 'Solve a problem by solving a smaller copy of it: functions that call themselves.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Mirror in a Mirror',
            panels: [
                {
                    scene: 'space',
                    alt: 'Comet looks into a portal that shows smaller and smaller copies of itself.',
                    wide: true,
                    cast: [
                        { who: 'comet', pose: 'surprised', x: 22 },
                        { who: 'py', pose: 'talk', x: 62, flip: true },
                    ],
                    bubbles: [
                        { who: 'comet', text: 'Whoa! The portal shows a portal, inside a portal, inside a portal...' },
                        { who: 'py', text: 'That\'s recursion! A function can call ITSELF to solve a smaller version of the same problem.' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py shows a stairs function that calls itself with n minus 1.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'Every recursive function needs a BASE CASE that stops (n == 0), and a step that makes the problem smaller (n - 1).' },
                    ],
                    code: py`
                        def stairs(n):
                            if n == 0:
                                print("Ground floor!")
                            else:
                                print("Step", n)
                                stairs(n - 1)

                        stairs(3)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork forgets the base case and falls into an endless portal.',
                    cast: [
                        { who: 'zork', pose: 'surprised', x: 30 },
                        { who: 'comet', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'zork', text: 'I forgot the base case! I\'m falling forever... RecursionError!' }],
                    code: py`
                        def fall(n):
                            print("Falling", n)
                            fall(n + 1)

                        fall(1)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A stack of plates: each call waits on top of the next.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'comet', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Each call waits for the smaller call to answer, then adds 1.' },
                        { who: 'comet', text: '"" is 0, so "n" is 1, "on" is 2... "moon" is 4!' },
                    ],
                    code: py`
                        def length(text):
                            if text == "":
                                return 0
                            return 1 + length(text[1:])

                        print(length("moon"))
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork hops down by twos and jumps right over the zero.',
                    cast: [
                        { who: 'zork', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'zork', text: '5, 3, 1, -1... I hopped right past 0!' },
                        { who: 'py', text: 'Use n <= 0, so you can never skip the base case.' },
                    ],
                    code: py`
                        def hop(n):
                            if n == 0:
                                print("Done")
                            else:
                                print(n)
                                hop(n - 2)

                        hop(5)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Portals shrink smaller and smaller until the last tiny one closes.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'comet', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Two rules for recursion: a BASE CASE that stops, and a recursive step that gets SMALLER, closer to that base case every time.' },
                        { who: 'comet', text: 'Shrink, shrink, shrink... stop!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Calling Yourself',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Countdown',
                    prompt: 'What will this code print?',
                    code: py`
                        def countdown(n):
                            if n == 0:
                                print("Liftoff!")
                            else:
                                print(n)
                                countdown(n - 1)

                        countdown(3)
                    `,
                    choices: ['3\n2\n1\nLiftoff!', '3\nLiftoff!', '1\n2\n3\nLiftoff!'],
                    answer: '3\n2\n1\nLiftoff!',
                    hints: ['countdown(3) prints 3, then calls countdown(2)...'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    about: 'error',
                    title: 'No way out',
                    prompt: 'What happens when Python runs this?',
                    code: py`
                        def forever(n):
                            return forever(n + 1)

                        forever(1)
                    `,
                    choices: ['RecursionError', 'SyntaxError', 'No error'],
                    answer: 'RecursionError',
                    hints: ['There\'s no base case, so it never stops calling itself.'],
                },
                {
                    id: 'p3',
                    type: 'write',
                    title: 'Factorial',
                    prompt: 'Write a RECURSIVE `def fact(n):`. fact(0) is 1 (the base case), and fact(n) is n × fact(n − 1). Print `fact(5)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def fact(n):
                            if n == 0:
                                return 1
                            return n * fact(n - 1)

                        print(fact(5))
                    `,
                    check: py`
                        f = function("fact")
                        assert f(0) == 1 and f(1) == 1 and f(4) == 24, "fact(4) should be 24, and fact(0) should be 1."
                        ${RECURSIVE('fact')}
                        assert same_output(output, expected_output), "print(fact(5))"
                    `,
                    hints: ['if n == 0: return 1', 'return n * fact(n - 1)'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Add it up',
                    prompt: 'What will this code print?',
                    code: py`
                        def f(n):
                            if n <= 1:
                                return 1
                            return n + f(n - 1)

                        print(f(4))
                    `,
                    choices: ['10', '24', '4'],
                    answer: '10',
                    hints: ['f(4) = 4 + f(3) = 4 + 3 + f(2)...'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Recursive countdown',
                    prompt: 'Write a recursive `def countdown(n):` that prints n down to 1, then `Go!` when n is 0. Call `countdown(3)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def countdown(n):
                            if n == 0:
                                print("Go!")
                            else:
                                print(n)
                                countdown(n - 1)

                        countdown(3)
                    `,
                    check: py`
                        f = function("countdown")
                        assert printed(f, 2) == "2\n1\nGo!\n", "countdown(2) should print 2, 1, Go!"
                        ${RECURSIVE('countdown')}
                        assert "for" not in source and "while" not in source, "No loops: use recursion!"
                        assert same_output(output, expected_output), "countdown(3)"
                    `,
                    hints: ['Base case: if n == 0: print("Go!")', 'Otherwise print n and call countdown(n - 1).'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Thinking Recursively',
            panels: [
                {
                    scene: 'space',
                    alt: 'Py splits a line of gems into the first one and the rest.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'nova', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Recursive thinking: "the product is the FIRST gem times the product of THE REST." The rest is a smaller problem!' },
                        { who: 'nova', text: 'And an empty list gives 1, so it doesn\'t change the answer.' },
                    ],
                    code: py`
                        def product(nums):
                            if nums == []:
                                return 1
                            return nums[0] * product(nums[1:])

                        print(product([2, 3, 4]))
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'A square spiral winds inward, each line shorter than the last.',
                    cast: [{ who: 'nova', pose: 'happy', x: 30 }],
                    bubbles: [{ who: 'nova', text: 'Recursion draws too! Each line is a bit shorter, until it\'s too small to draw.' }],
                    code: py`
                        from turtle import *

                        def spiral(length):
                            if length < 10:
                                return
                            forward(length)
                            left(90)
                            spiral(length - 10)

                        spiral(100)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Comet spells a word one letter at a time.',
                    cast: [{ who: 'comet', pose: 'point', x: 40 }],
                    bubbles: [{ who: 'comet', text: 'Spell a word: print the first letter, then spell the rest!' }],
                    code: py`
                        def spell(text):
                            if text == "":
                                return
                            print(text[0])
                            spell(text[1:])

                        spell("star")
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Nova passes a bucket down a line of smaller and smaller Novas.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'nova', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Don\'t trace every call. TRUST the smaller call, then do your part.' },
                        { who: 'nova', text: 'Like passing a bucket down a line!' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Folders inside folders inside folders, each holding files.',
                    cast: [
                        { who: 'comet', pose: 'think', x: 25 },
                        { who: 'py', pose: 'point', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'comet', text: 'Couldn\'t a loop do all this?' },
                        { who: 'py', text: 'Often! But folders inside folders need recursion.' },
                    ],
                    code: py`
                        def count_files(folder):
                            total = 0
                            for item in folder:
                                if type(item) == list:
                                    total += count_files(item)
                                else:
                                    total += 1
                            return total

                        print(count_files(["a", ["b", "c", ["d"]], "e"]))
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Nova and Comet stand under a huge branching tree.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'nova', pose: 'happy', x: 52 },
                        { who: 'comet', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Ask two questions: what is the smallest case, and how do I shrink the problem? First plus the rest. A trunk plus smaller trees.' },
                        { who: 'nova', text: 'Problems inside problems. I get it now!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Fractal Lab',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Recursive total',
                    prompt: 'Write `def total(nums):` recursively: 0 for an empty list, otherwise the first number plus the total of the rest (`nums[1:]`). No loops, no `sum()`!',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def total(nums):
                            if nums == []:
                                return 0
                            return nums[0] + total(nums[1:])

                        print(total([5, 10, 20]))
                    `,
                    check: py`
                        f = function("total")
                        assert f([]) == 0 and f([7]) == 7 and f([1, 2, 3, 4]) == 10, "total([1, 2, 3, 4]) should be 10."
                        ${RECURSIVE('total')}
                        assert "for" not in source and "sum(" not in source, "No loops or sum(): use recursion."
                    `,
                    hints: ['if nums == []: return 0', 'return nums[0] + total(nums[1:])'],
                },
                {
                    id: 'p6',
                    type: 'write',
                    turtle: true,
                    title: 'Fractal tree',
                    prompt: 'Draw the fractal tree: `branch(length)` stops if length < 20; otherwise forward(length), left 30, branch(length × 0.6), right 60, branch(length × 0.6), left 30, back(length). Start facing up (`left(90)`) with `branch(80)`.',
                    starter: py`from turtle import *`,
                    solution: TREE,
                    check: RECURSIVE('branch'),
                    hints: ['Follow the steps in the prompt exactly, in order.', 'backward(length) walks back down so the next branch starts in the right place.'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Missing base case',
                    prompt: '`power(base, exp)` multiplies base by itself exp times, but it never stops! Add the base case: anything to the power 0 is 1.',
                    starter: py`
                        def power(base, exp):
                            return base * power(base, exp - 1)

                        print(power(2, 5))
                    `,
                    solution: py`
                        def power(base, exp):
                            if exp == 0:
                                return 1
                            return base * power(base, exp - 1)

                        print(power(2, 5))
                    `,
                    hints: ['if exp == 0: return 1'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Echo',
                    prompt: 'What will this code print?',
                    code: py`
                        def echo(word, n):
                            if n == 0:
                                return ""
                            return word + echo(word, n - 1)

                        print(echo("hi", 3))
                    `,
                    choices: ['hihihi', 'hi', 'hi hi hi'],
                    answer: 'hihihi',
                    hints: ['echo("hi", 3) = "hi" + echo("hi", 2)...'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Reverse',
                    prompt: 'Write a recursive `def reverse(text):`: an empty text reverses to "", otherwise reverse the rest and add the first letter at the end. Print `reverse("galaxy")`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def reverse(text):
                            if text == "":
                                return ""
                            return reverse(text[1:]) + text[0]

                        print(reverse("galaxy"))
                    `,
                    check: py`
                        f = function("reverse")
                        assert f("") == "" and f("ab") == "ba" and f("star") == "rats", 'reverse("star") should be "rats".'
                        ${RECURSIVE('reverse')}
                        assert "[::-1]" not in source and "for" not in source, "Use recursion, not [::-1] or a loop."
                        assert same_output(output, expected_output), 'print(reverse("galaxy"))'
                    `,
                    hints: ['if text == "": return ""', 'return reverse(text[1:]) + text[0]'],
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
                    title: 'Down and up',
                    prompt: 'Tricky! What will this code print?',
                    code: py`
                        def bounce(n):
                            print(n)
                            if n > 0:
                                bounce(n - 1)
                            print(n)

                        bounce(2)
                    `,
                    choices: ['2\n1\n0\n0\n1\n2', '2\n1\n0', '2\n1\n0\n1\n2'],
                    answer: '2\n1\n0\n0\n1\n2',
                    hints: ['Each call prints n, does its smaller call, then prints n AGAIN when that call finishes.'],
                },
                {
                    id: 't2',
                    type: 'predict',
                    title: 'Factorial four',
                    prompt: 'What will this code print?',
                    code: py`
                        def fact(n):
                            if n == 0:
                                return 1
                            return n * fact(n - 1)

                        print(fact(4))
                    `,
                    choices: ['24', '10', '16'],
                    answer: '24',
                    hints: ['4 × 3 × 2 × 1'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    turtle: true,
                    boss: true,
                    title: 'BOSS: Nested squares',
                    prompt: 'Write `def square(size):` and a RECURSIVE `def nest(size):` that draws a square of `size`, then calls `nest(size // 2)`, stopping when size is less than 10. Call `nest(80)` (squares of 80, 40, 20 and 10, all from the same corner).',
                    starter: py`from turtle import *`,
                    solution: py`
                        from turtle import *

                        def square(size):
                            for i in range(4):
                                forward(size)
                                left(90)

                        def nest(size):
                            if size < 10:
                                return
                            square(size)
                            nest(size // 2)

                        nest(80)
                    `,
                    check: RECURSIVE('nest'),
                    hints: ['Base case: if size < 10: return', 'Then square(size) and nest(size // 2).'],
                },
            ],
        },
    ],
};
