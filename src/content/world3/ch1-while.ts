import { py } from '../helpers';
import type { Chapter } from '../schema';

const USE_WHILE = 'assert "while" in source, "Use a while loop!"';

export const ch1: Chapter = {
    id: 'ch1',
    title: 'Keep Going Until',
    emoji: '🔄',
    summary: 'While loops repeat until something changes, so make sure it does!',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'The While Loop',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Bix stacks bricks into a tower in the floating park.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'talk', x: 25 },
                        { who: 'py', pose: 'point', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'I want to keep stacking bricks until my tower is 5 tall.' },
                        { who: 'py', text: 'Use a while loop: it keeps going WHILE a question is True.' },
                    ],
                    code: py`
                        height = 0
                        while height < 5:
                            height = height + 1
                            print("Tower height:", height)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py compares a for loop and a while loop side by side.',
                    cast: [{ who: 'py', pose: 'talk', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'for repeats a set number of times. while repeats until something changes. Like "save until you have 100 coins".' },
                    ],
                },
                {
                    scene: 'sky',
                    alt: 'Glitch watches coins pour out forever.',
                    cast: [
                        { who: 'glitch', pose: 'happy', x: 30 },
                        { who: 'bix', pose: 'surprised', x: 72, flip: true },
                    ],
                    props: [{ item: 'coin', x: 50, y: 60 }, { item: 'coin', x: 55, y: 85 }],
                    bubbles: [
                        { who: 'glitch', text: 'If nothing inside the loop changes, it NEVER stops. Infinite coins! Hehe!' },
                    ],
                    code: py`
                        coins = 0
                        while coins < 3:
                            print("🪙 coin")
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix counts down hearts floating above his head.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'bix', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Trace it like Python: ask the question, run the inside, ask again.' },
                        { who: 'bix', text: '3, 2, 1... at 0 the question is False. Stop!' },
                    ],
                    code: py`
                        lives = 3
                        while lives > 0:
                            print("Lives left:", lives)
                            lives = lives - 1
                        print("Game over")
                    `,
                },
                {
                    scene: 'circuit',
                    alt: 'Glitch stares at a blank screen, puzzled.',
                    cast: [
                        { who: 'glitch', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'My loop printed NOTHING. Not even once!' },
                        { who: 'py', text: 'The question was False at the very start, so the inside never ran.' },
                    ],
                    code: py`
                        energy = 10
                        while energy < 5:
                            print("Charging...")
                            energy = energy + 1
                        print("Done")
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Py holds up three signs: start, ask, change. Bix fills a fuel tank.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'bix', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Every while loop needs 3 things: a starting value, a question, and a change inside that moves toward stopping.' },
                        { who: 'bix', text: 'Start, ask, change. My rocket is fuelled!' },
                    ],
                    code: py`
                        fuel = 0
                        while fuel < 30:
                            fuel = fuel + 10
                            print("Fuel:", fuel)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Loop Until',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Count up',
                    prompt: 'What will this code print?',
                    code: py`
                        n = 1
                        while n <= 3:
                            print(n)
                            n = n + 1
                    `,
                    choices: ['1\n2\n3', '1\n2\n3\n4', '0\n1\n2'],
                    answer: '1\n2\n3',
                    hints: ['When n becomes 4, is 4 <= 3?'],
                },
                {
                    id: 'p2',
                    type: 'fix',
                    title: 'Coin spawner',
                    prompt: 'Run it first to watch the server crash 😱. Then add a line inside the loop that counts up by 1, so exactly 50 coins spawn.',
                    starter: py`
                        coins_spawned = 0
                        while coins_spawned < 50:
                            print("🪙 Coin Spawned!")
                            # Add your line right here!
                    `,
                    solution: py`
                        coins_spawned = 0
                        while coins_spawned < 50:
                            print("🪙 Coin Spawned!")
                            coins_spawned = coins_spawned + 1
                    `,
                    check: py`
                        coins = output_lines.count("🪙 Coin Spawned!")
                        assert coins == 50, f"The server spawned {coins} coins. We need exactly 50!"
                    `,
                    hints: ['coins_spawned never changes, so it is always less than 50.', 'coins_spawned = coins_spawned + 1, pushed in like the print line.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Countdown',
                    prompt: 'What will this code print? (`n -= 1` is a shortcut for `n = n - 1`.)',
                    code: py`
                        n = 3
                        while n > 0:
                            print(n)
                            n -= 1
                        print("Go!")
                    `,
                    choices: ['3\n2\n1\nGo!', '3\n2\n1\n0\nGo!', '3\nGo!\n2\nGo!\n1\nGo!'],
                    answer: '3\n2\n1\nGo!',
                    hints: ['When n becomes 0, the loop stops. Go! is outside the loop.'],
                },
                {
                    id: 'p4',
                    type: 'trace',
                    title: 'Doubling up',
                    prompt: 'Fill in `power` each time line 3 finishes.',
                    code: py`
                        power = 1
                        while power < 20:
                            power = power * 2
                    `,
                    line: 3,
                    columns: ['power'],
                    rows: [['2'], ['4'], ['8'], ['16'], ['32']],
                    hints: ['Keep doubling. Stop when power is no longer less than 20.', 'After 16 doubles to 32, is 32 < 20?'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Even steps',
                    prompt: 'Use a while loop to print the even numbers from 2 to 10, like the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        n = 2
                        while n <= 10:
                            print(n)
                            n += 2
                    `,
                    check: py`
                        ${USE_WHILE}
                        assert same_output(output, expected_output), "Print 2, 4, 6, 8, 10."
                    `,
                    hints: ['Start at n = 2 and add 2 each time.', 'Keep going while n <= 10.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Shortcuts and Savings',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Py shows shortcut signs: plus-equals and minus-equals.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'bix', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Shortcuts! coins += 5 means coins = coins + 5. There\'s also -=, *= and /=.' },
                        { who: 'bix', text: 'Less typing, same result. I like it!' },
                    ],
                    code: py`
                        coins = 10
                        coins += 5
                        coins -= 3
                        print(coins)
                    `,
                },
                {
                    scene: 'circuit',
                    alt: 'A slime blob doubles in size twice. Bix backs away.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'bix', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: '*= 2 doubles a value right where it is.' },
                        { who: 'bix', text: '1, then 2, then 4. It is growing!' },
                    ],
                    code: py`
                        slime = 1
                        slime *= 2
                        slime *= 2
                        print(slime)
                    `,
                },
                {
                    scene: 'circuit',
                    alt: 'Glitch watches a counter climb higher and higher, never stopping.',
                    cast: [
                        { who: 'glitch', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'I count UP, but stop when n is 0 or less. Hehe!' },
                        { who: 'py', text: 'n only grows, so n > 0 stays True forever!' },
                    ],
                    code: py`
                        n = 1
                        while n > 0:
                            n += 1
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Bix drops coins into a piggy bank each week.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'happy', x: 28 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    props: [{ item: 'chest', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'bix', text: 'I save 20 coins a week. How many weeks until I have 150?' },
                        { who: 'py', text: 'You don\'t know the number of weeks yet. That\'s a job for while!' },
                    ],
                    code: py`
                        coins = 0
                        weeks = 0
                        while coins < 150:
                            coins += 20
                            weeks += 1
                        print("Weeks:", weeks)
                        print("Coins:", coins)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Glitch tries to sneak a forever loop past Bix, who checks it.',
                    cast: [
                        { who: 'glitch', pose: 'think', x: 30 },
                        { who: 'bix', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'Run my loop, Bix. Trust me!' },
                        { who: 'bix', text: 'First I check: does something inside move toward stopping?' },
                    ],
                },
                {
                    scene: 'sky',
                    alt: 'Py sums up the chapter on a floating sign.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'bix', pose: 'happy', x: 75, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Use while when you don\'t know how many times. Check it can stop!' },
                        { who: 'bix', text: 'And += saves me typing.' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Savings and Stops',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'Overshoot',
                    prompt: 'What will this code print?',
                    code: py`
                        x = 10
                        while x > 0:
                            x -= 3
                        print(x)
                    `,
                    choices: ['1', '-2', '0'],
                    answer: '-2',
                    hints: ['10 → 7 → 4 → 1 → ... is 1 > 0?'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    about: 'meaning',
                    title: 'Forever?',
                    prompt: 'What does this code do?',
                    code: py`
                        n = 5
                        while n > 0:
                            print(n)
                    `,
                    choices: ['It prints 5, 4, 3, 2, 1.', 'It prints 5 forever and never stops.', 'It prints nothing.'],
                    answer: 'It prints 5 forever and never stops.',
                    hints: ['Does n ever change inside the loop?'],
                },
                {
                    id: 'p7',
                    type: 'fill',
                    title: 'Level up to 10',
                    prompt: 'Fill in the comparison so the loop prints the 🎯 Goal.',
                    template: py`
                        level = 7
                        while level ___ 10:
                            level += 1
                            print(level)
                    `,
                    answers: ['<'],
                    hints: ['The last number printed is 10, so stop once level reaches 10.'],
                },
                {
                    id: 'p8',
                    type: 'write',
                    title: 'Piggy bank',
                    prompt: 'Bix saves 15 coins a week, starting from 0. Use a while loop to find how many weeks until he has at least 100 coins. Print the 🎯 Goal.',
                    starter: py`
                        coins = 0
                        weeks = 0
                    `,
                    solution: py`
                        coins = 0
                        weeks = 0
                        while coins < 100:
                            coins += 15
                            weeks += 1
                        print("Weeks:", weeks)
                        print("Coins:", coins)
                    `,
                    check: py`
                        ${USE_WHILE}
                        assert same_output(output, expected_output), "Match both goal lines."
                    `,
                    hints: ['while coins < 100: add 15 coins and 1 week.', 'Print AFTER the loop (not pushed in).'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Blast off',
                    prompt: 'Use a while loop to count down from 5 to 1, then print `Blast off!`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        n = 5
                        while n > 0:
                            print(n)
                            n -= 1
                        print("Blast off!")
                    `,
                    check: py`
                        ${USE_WHILE}
                        assert same_output(output, expected_output), "5, 4, 3, 2, 1, Blast off!"
                    `,
                    hints: ['Start at 5. Take 1 off each time. Blast off! goes after the loop.'],
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
                    title: 'By twos',
                    prompt: 'What will this code print?',
                    code: py`
                        count = 0
                        while count < 4:
                            count += 2
                        print(count)
                    `,
                    choices: ['4', '2', '6'],
                    answer: '4',
                    hints: ['0 → 2 → 4. Is 4 < 4?'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Stuck countdown',
                    prompt: 'This countdown never ends! Fix it so it prints the 🎯 Goal.',
                    starter: py`
                        n = 3
                        while n > 0:
                            print(n)
                        print("Go!")
                    `,
                    solution: py`
                        n = 3
                        while n > 0:
                            print(n)
                            n -= 1
                        print("Go!")
                    `,
                    hints: ['Something inside the loop must change n.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Brick doubler',
                    prompt: 'Start with `bricks = 1`. Keep doubling bricks (and printing them) until there are more than 50. Then print how many doublings it took, like the 🎯 Goal.',
                    starter: py`bricks = 1`,
                    solution: py`
                        bricks = 1
                        doublings = 0
                        while bricks <= 50:
                            bricks *= 2
                            doublings += 1
                            print("Bricks:", bricks)
                        print("Done in", doublings, "doublings")
                    `,
                    check: py`
                        ${USE_WHILE}
                        assert same_output(output, expected_output), "Compare your lines with the 🎯 Goal."
                    `,
                    hints: [
                        '"More than 50" means keep going while bricks <= 50.',
                        'Keep a second counter: doublings += 1 each time around.',
                        'Print "Done in", doublings, "doublings" after the loop.',
                    ],
                },
            ],
        },
    ],
};
