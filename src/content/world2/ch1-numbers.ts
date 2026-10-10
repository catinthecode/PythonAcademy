import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch1: Chapter = {
    id: 'ch1',
    title: 'Number Crunch',
    emoji: '🧮',
    summary: 'Python is a super calculator: + − × ÷, whole-number division and leftovers.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Critter Math',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Rae and Fizz arrive at the battle arena. Py greets them.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'wave', x: 18 },
                        { who: 'fizz', pose: 'happy', x: 42 },
                        { who: 'py', pose: 'talk', x: 78, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Fizz has 12 HP and just drank a potion worth 8. How much HP now?' },
                        { who: 'py', text: 'Python is a super calculator! + adds, - takes away, * times, / divides.' },
                    ],
                    code: py`
                        print(12 + 8)
                        print(12 - 5)
                        print(3 * 4)
                        print(10 / 4)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Py splits 10 berries between 4 critters; 2 berries are left over.',
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'fizz', pose: 'think', x: 72, flip: true },
                    ],
                    props: [{ item: 'candy', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: '/ always gives a decimal: 10 / 4 is 2.5. Use // to share out whole berries: 10 // 4 is 2.' },
                    ],
                    code: py`
                        print(10 / 4)
                        print(10 // 4)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Fizz holds the two leftover berries.',
                    cast: [
                        { who: 'fizz', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: '% gives the LEFTOVER: 10 % 4 is 2. And if n % 2 is 0, n is even!' },
                    ],
                    code: py`
                        print(10 % 4)
                        print(8 % 2)
                        print(7 % 2)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Rae holds a basket of 14 eggs next to egg boxes that each fit 6.',
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'chest', x: 50, y: 100, scale: 0.7 }],
                    bubbles: [
                        { who: 'rae', text: '14 eggs, boxes of 6. How many full boxes?' },
                        { who: 'py', text: '14 // 6 is 2 full boxes. 14 % 6 is 2 eggs left.' },
                    ],
                    code: py`
                        print(14 // 6)
                        print(14 % 6)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Fizz frowns at a screen showing 5.0 instead of 5.',
                    cast: [
                        { who: 'fizz', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'fizz', text: '10 / 2 gave me 5.0, not 5!' },
                        { who: 'py', text: '/ ALWAYS gives a decimal. Want a whole number? Use //.' },
                    ],
                    code: py`
                        print(10 / 2)
                        print(10 // 2)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Py stands by a scoreboard listing the six math symbols. Rae and Fizz cheer.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 20 },
                        { who: 'rae', pose: 'happy', x: 58 },
                        { who: 'fizz', pose: 'happy', x: 82, flip: true },
                    ],
                    props: [{ item: 'sign', x: 38, y: 100 }],
                    bubbles: [
                        { who: 'py', text: '+ - * / do normal math. // counts whole groups. % finds what is left over.' },
                        { who: 'rae', text: 'Python is the best calculator in the arena!' },
                    ],
                    code: py`print(25 // 7, 25 % 7)`,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Calculator',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Times first',
                    prompt: 'What will this code print?',
                    code: py`print(7 + 3 * 2)`,
                    choices: ['20', '13', '17'],
                    answer: '13',
                    hints: ['Like in math class, * happens before +.', '3 * 2 is 6. Then 7 + 6.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Sharing pizza',
                    prompt: 'What will this code print?',
                    code: py`print(10 / 4)`,
                    choices: ['2', '2.5', '2.0'],
                    answer: '2.5',
                    hints: ['A single / gives the exact answer, decimals and all.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Whole groups',
                    prompt: '17 berries go into bags of 5. How many FULL bags?',
                    code: py`print(17 // 5)`,
                    choices: ['3', '3.4', '2'],
                    answer: '3',
                    hints: ['// divides and drops the leftover.'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Leftovers',
                    prompt: 'And how many berries are left over?',
                    code: py`print(17 % 5)`,
                    choices: ['2', '3', '12'],
                    answer: '2',
                    hints: ['3 full bags of 5 is 15. 17 - 15 = ?'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Berry count',
                    prompt: 'Fizz has 3 bags with 12 berries in each. Use `*` to print the total number of berries.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`print(3 * 12)`,
                    check: py`
                        assert "*" in source, "Use * to multiply."
                        assert same_output(output, expected_output), "3 bags of 12 berries... how many is that?"
                    `,
                    hints: ['print(3 * 12)'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Order Matters',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Fizz confidently says the wrong answer while Py shakes its head.',
                    wide: true,
                    cast: [
                        { who: 'fizz', pose: 'happy', x: 28 },
                        { who: 'py', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'fizz', text: '2 + 3 * 4 is 20, right?' },
                        { who: 'py', text: 'Nope! Times goes first: 3 * 4 is 12, then 2 + 12 is 14.' },
                    ],
                    code: py`
                        print(2 + 3 * 4)
                        print((2 + 3) * 4)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Rae draws brackets in the air.',
                    cast: [
                        { who: 'rae', pose: 'point', x: 30 },
                        { who: 'fizz', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Brackets ( ) go first of all. You choose the order!' },
                        { who: 'fizz', text: 'So (2 + 3) * 4 is 5 * 4. That is 20!' },
                    ],
                    code: py`print((2 + 3) * 4)`,
                },
                {
                    scene: 'village',
                    alt: 'Rae counts coins at a shop stall selling potions and shields.',
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'coin', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'rae', text: '3 potions at 4 coins each, plus a 5-coin shield?' },
                        { who: 'py', text: 'Times first: 3 * 4 is 12. Then + 5. That is 17!' },
                    ],
                    code: py`print(3 * 4 + 5)`,
                },
                {
                    scene: 'arena',
                    alt: 'Fizz looks puzzled at a half that came out too big.',
                    cast: [
                        { who: 'fizz', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'fizz', text: 'Half of 6 + 4 should be 5, but I got 8.0!' },
                        { who: 'py', text: 'Only the 4 got halved. Bracket the sum first!' },
                    ],
                    code: py`
                        print(6 + 4 / 2)
                        print((6 + 4) / 2)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Py writes attack and damage on two chests.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'rae', pose: 'happy', x: 75, flip: true },
                    ],
                    props: [{ item: 'chest', x: 50, y: 100, scale: 0.8 }],
                    bubbles: [
                        { who: 'py', text: 'Math works on chests too. Python looks inside, then does the sum.' },
                        { who: 'rae', text: 'attack is 3, so damage is 6!' },
                    ],
                    code: py`
                        attack = 3
                        damage = attack * 2
                        print(damage)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Blazewing takes a hit; its HP bar goes down.',
                    wide: true,
                    cast: [
                        { who: 'blaze', pose: 'sad', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'blaze', text: 'Ouch! I just took 6 damage!' },
                        { who: 'py', text: 'hp = hp - 6 means "take 6 away from the hp chest and put the answer back".' },
                    ],
                    code: py`
                        hp = 30
                        hp = hp - 6
                        print("Blazewing HP:", hp)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Battle Math',
            problems: [
                {
                    id: 'p5',
                    type: 'fill',
                    title: 'Ouch!',
                    prompt: 'Fizz takes 8 damage. Fill in the missing symbol so the code prints the 🎯 Goal.',
                    template: py`
                        hp = 30
                        hp = hp ___ 8
                        print(hp)
                    `,
                    answers: ['-'],
                    hints: ['Damage makes HP go down.'],
                },
                {
                    id: 'p6',
                    type: 'fix',
                    title: 'Bracket fix',
                    prompt: 'Rae has 5 berries and Fizz has 3. They each double their berries. Fix the code so it adds 5 and 3 FIRST, then times 2, to print the 🎯 Goal.',
                    starter: py`print("Total:", 5 + 3 * 2)`,
                    solution: py`print("Total:", (5 + 3) * 2)`,
                    hints: ['Put brackets around the part that should happen first.'],
                },
                {
                    id: 'p7',
                    type: 'trace',
                    title: 'Three hits',
                    prompt: 'Blazewing gets hit 3 times. What is `hp` each time line 3 finishes?',
                    code: py`
                        hp = 20
                        for i in range(3):
                            hp = hp - 6
                    `,
                    line: 3,
                    columns: ['hp'],
                    rows: [['14'], ['8'], ['2']],
                    hints: ['Take 6 away each time: 20 → 14 → ...'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Even or odd?',
                    prompt: 'What will this code print?',
                    code: py`print(8 % 2, 9 % 2)`,
                    choices: ['0 1', '4 4', '1 0'],
                    answer: '0 1',
                    hints: ['8 shares into 2s perfectly. 9 has one left over.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Fair shares',
                    prompt: 'Share 23 berries between 4 critters. Print how many each gets and how many are left over, like the 🎯 Goal. Use `//` and `%`.',
                    starter: py`
                        berries = 23
                        critters = 4
                    `,
                    solution: py`
                        berries = 23
                        critters = 4
                        print("Each gets", berries // critters)
                        print("Left over", berries % critters)
                    `,
                    check: py`
                        assert "//" in source and "%" in source, "Use // for the shares and % for the leftovers."
                        assert same_output(output, expected_output), "Match the two goal lines."
                    `,
                    hints: ['print("Each gets", berries // critters)', 'print("Left over", berries % critters)'],
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
                    title: 'Brackets and divide',
                    prompt: 'What will this code print?',
                    code: py`print((4 + 6) / 5)`,
                    choices: ['2.0', '5.2', '2'],
                    answer: '2.0',
                    hints: ['Brackets first: 10. Then / always gives a decimal.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Average score',
                    prompt: 'This should print the AVERAGE of three scores (add them up, then divide by 3). Fix it!',
                    starter: py`print(8 + 6 + 10 / 3)`,
                    solution: py`print((8 + 6 + 10) / 3)`,
                    hints: ['Only 10 is being divided. Put brackets around the whole sum.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Level up!',
                    prompt: 'Blazewing goes up one level for every 15 XP. It has `xp = 100`. Print its level and its extra XP, like the 🎯 Goal. Use `//` and `%`.',
                    starter: py`xp = 100`,
                    solution: py`
                        xp = 100
                        print("Level:", xp // 15)
                        print("Extra XP:", xp % 15)
                    `,
                    check: py`
                        assert "//" in source and "%" in source, "Use // for the level and % for the extra XP."
                        assert same_output(output, expected_output), "Match the goal lines exactly."
                    `,
                    hints: ['How many whole 15s fit in 100? That is xp // 15.', 'What is left over? xp % 15.'],
                },
            ],
        },
    ],
};
