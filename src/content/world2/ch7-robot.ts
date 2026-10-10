import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch7: Chapter = {
    id: 'ch7',
    title: 'Bolt Tests Battles',
    emoji: '🤖',
    summary: 'One test is never enough. Find the edge cases where robot code goes wrong.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Testing Like a Pro',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Bolt proudly shows a battle program and one passing test.',
                    wide: true,
                    cast: [
                        { who: 'bolt', pose: 'happy', x: 28 },
                        { who: 'py', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'bolt', text: 'I wrote the evolve checker and tried level 20. It works! Done!' },
                        { who: 'py', text: 'One test isn\'t enough, Bolt. Bugs hide where you didn\'t look.' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py lists three kinds of tests on the screen.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'Test three kinds of values: normal ones, EDGE ones (right on the line), and weird ones.' },
                    ],
                    code: py`
                        level = 16
                        print("Bolt says:", level > 16)
                        print("Rule says:", level >= 16)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Rae tests with 16 and catches the bug; Bolt looks embarrassed.',
                    cast: [
                        { who: 'rae', pose: 'happy', x: 28 },
                        { who: 'bolt', pose: 'sad', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Level 16 should evolve, but your code says False!' },
                        { who: 'bolt', text: 'Oops. > and >= only disagree right at the edge.' },
                    ],
                },
                {
                    scene: 'village',
                    alt: 'Fizz holds a cake with 8 slices, but nobody came to the party.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'fizz', pose: 'sad', x: 75, flip: true },
                    ],
                    props: [{ item: 'candy', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Weird values break code. What if 0 friends come?' },
                        { who: 'fizz', text: 'Sharing with nobody... CRASH!' },
                    ],
                    code: py`
                        slices = 8
                        friends = 0
                        print(slices // friends)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Rae points at an HP bar that has dropped below zero.',
                    cast: [
                        { who: 'rae', pose: 'surprised', x: 25 },
                        { who: 'bolt', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'HP is -3, but it says Still fighting!' },
                        { who: 'bolt', text: '== 0 misses negatives. I need <= 0!' },
                    ],
                    code: py`
                        hp = -3
                        if hp == 0:
                            print("Fainted")
                        else:
                            print("Still fighting")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Rae holds up three cards: normal, edge, weird. Bolt salutes.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'point', x: 22 },
                        { who: 'py', pose: 'happy', x: 52 },
                        { who: 'bolt', pose: 'happy', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'My test plan: a NORMAL value, the EDGE value right on the line, and a WEIRD one like 0 or a negative.' },
                        { who: 'bolt', text: 'Three tests, every time. Beep!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Find the Edge',
            problems: [
                {
                    id: 'q1',
                    type: 'breakit',
                    title: 'Coin discount',
                    prompt: 'Shops give a discount when you spend 100 coins OR MORE. Find a value that breaks Bolt\'s code.',
                    robot: py`
                        if coins > 100:
                            print("Discount!")
                        else:
                            print("Full price")
                    `,
                    correct: py`
                        if coins >= 100:
                            print("Discount!")
                        else:
                            print("Full price")
                    `,
                    inputName: 'coins',
                    choices: ['50', '100', '150'],
                    answer: '100',
                    hints: ['Test the edge: exactly 100.'],
                },
                {
                    id: 'q2',
                    type: 'breakit',
                    title: 'Welcome back',
                    prompt: 'The game should welcome Fizz back however the name is typed: Fizz, fizz or FIZZ. Find a name that breaks Bolt\'s code.',
                    robot: py`
                        if name == "Fizz":
                            print("Welcome back, Fizz!")
                        else:
                            print("Who are you?")
                    `,
                    correct: py`
                        if name.lower() == "fizz":
                            print("Welcome back, Fizz!")
                        else:
                            print("Who are you?")
                    `,
                    inputName: 'name',
                    choices: ['"Fizz"', '"FIZZ"', '"Rae"'],
                    answer: '"FIZZ"',
                    hints: ['"Weird" values include different capital letters.'],
                },
                {
                    id: 'q3',
                    type: 'instruct',
                    title: 'Say the rule',
                    prompt: 'You want Bolt to write a type check that prints the 🎯 Goal. Which instruction works?',
                    goalCode: py`
                        attack = "water"
                        defender = "fire"
                        if attack == "water" and defender == "fire":
                            print("Super effective!")
                    `,
                    choices: [
                        { text: 'Print super effective.', code: py`print("super effective")` },
                        { text: 'Check the types.', code: py`
                            attack = "water"
                            defender = "fire"
                            print(attack, defender)
                        ` },
                        { text: 'If attack is water and defender is fire, print "Super effective!".', code: py`
                            attack = "water"
                            defender = "fire"
                            if attack == "water" and defender == "fire":
                                print("Super effective!")
                        ` },
                    ],
                    answer: 2,
                    hints: ['The best instruction says WHEN (the rule) and WHAT to print, exactly.'],
                },
                {
                    id: 'q4',
                    type: 'fix',
                    title: 'No critters?',
                    prompt: 'Bolt\'s berry-sharing code crashes when there are 0 critters (you can\'t divide by zero!). Make it print `No critters!` when critters is 0.',
                    starter: py`
                        berries = 12
                        critters = 0
                        print("Each gets", berries // critters)
                    `,
                    solution: py`
                        berries = 12
                        critters = 0
                        if critters == 0:
                            print("No critters!")
                        else:
                            print("Each gets", berries // critters)
                    `,
                    check: py`
                        assert "if" in source, "Use an if to check for 0 critters first."
                        assert same_output(output, expected_output), "With 0 critters it should print No critters!"
                    `,
                    hints: ['Check for the weird value first: if critters == 0:'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Three tests',
                    prompt: 'Test the evolve rule (level >= 16) yourself: print the answer for a level BELOW 16, EXACTLY 16, and ABOVE 16, like the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        print(10 >= 16)
                        print(16 >= 16)
                        print(20 >= 16)
                    `,
                    check: py`
                        assert source.count(">= 16") >= 3, "Write three tests using >= 16."
                        assert same_output(output, expected_output), "Below, exactly, above: False, True, True."
                    `,
                    hints: ['print(10 >= 16)', 'Then exactly 16, then something bigger.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Edge Cases',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Rae brainstorms strange inputs on a scroll.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'py', pose: 'happy', x: 78, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 52, y: 100 }],
                    bubbles: [
                        { who: 'rae', text: 'What if HP is 0? Negative? Exactly at the limit? A name in CAPITALS?' },
                        { who: 'py', text: 'Great questions! Thinking of strange inputs is a tester\'s superpower.' },
                    ],
                },
                {
                    scene: 'arena',
                    alt: 'Py points at the edge of a cliff where bugs are hiding.',
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'sneak', pose: 'happy', x: 74, flip: true },
                    ],
                    props: [{ item: 'bug', x: 55, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Bugs LOVE edges: 0, exactly at the limit, empty text, capital letters.' },
                        { who: 'sneak', text: 'That\'s where I hide them!' },
                    ],
                },
                {
                    scene: 'meadow',
                    alt: 'A weather sign shows hot, mild and cold. Py points at each one.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'rae', pose: 'think', x: 75, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Every path needs a test. Three paths? Test at least three values.' },
                        { who: 'rae', text: 'Plus the edges, 25 and 10!' },
                    ],
                    caption: 'Try 30, 15 and 5. Then 25 and 10.',
                    code: py`
                        temp = 30
                        if temp > 25:
                            print("Hot")
                        elif temp > 10:
                            print("Mild")
                        else:
                            print("Cold")
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'An empty name box on the screen. Fizz tilts its head.',
                    cast: [
                        { who: 'fizz', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'fizz', text: 'What if the player types nothing at all?' },
                        { who: 'py', text: 'Empty text "" is an edge too. Its len() is 0.' },
                    ],
                    code: py`
                        name = ""
                        if len(name) == 0:
                            print("Please type a name")
                        else:
                            print("Hi", name)
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Bolt types super fast while Rae watches with a checklist.',
                    cast: [
                        { who: 'bolt', pose: 'talk', x: 25 },
                        { who: 'rae', pose: 'point', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bolt', text: 'I write code super fast, but I only test what you ask me to.' },
                        { who: 'rae', text: 'Then I will check your edges myself!' },
                    ],
                },
                {
                    scene: 'arena',
                    alt: 'Bolt gives a thumbs-up, ready to be tested.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'bolt', pose: 'wave', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Normal, edge, weird: test all three before you trust any code, even your own.' },
                        { who: 'bolt', text: 'Test me harder! AI helpers like me make edge mistakes ALL the time.' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Test the Referee',
            problems: [
                {
                    id: 'q5',
                    type: 'breakit',
                    title: 'Danger zone',
                    prompt: 'HP of 20 or less means "Weak". Find the HP that breaks Bolt\'s referee.',
                    robot: py`
                        if hp <= 0:
                            print("Fainted")
                        elif hp < 20:
                            print("Weak")
                        else:
                            print("Fine")
                    `,
                    correct: py`
                        if hp <= 0:
                            print("Fainted")
                        elif hp <= 20:
                            print("Weak")
                        else:
                            print("Fine")
                    `,
                    inputName: 'hp',
                    choices: ['10', '20', '50'],
                    answer: '20',
                    hints: ['Look for the edge in the elif line.'],
                },
                {
                    id: 'q6',
                    type: 'trace',
                    title: 'Only when True',
                    prompt: 'Trace Bolt\'s code. Line 4 only runs when the if is True! Fill in `i` and `hp` each time line 4 finishes.',
                    code: py`
                        hp = 10
                        for i in range(4):
                            if i % 2 == 0:
                                hp = hp + 5
                    `,
                    line: 4,
                    columns: ['i', 'hp'],
                    rows: [['0', '15'], ['2', '20']],
                    hints: ['i goes 0, 1, 2, 3. Which of those are even?', 'Line 4 runs only for even i.'],
                },
                {
                    id: 'q7',
                    type: 'instruct',
                    title: 'Clear hint',
                    prompt: 'The player guessed 15 and the secret is 12. Which instruction gets Bolt to print the 🎯 Goal?',
                    goalCode: py`
                        secret = 12
                        guess = 15
                        if guess > secret:
                            print("Too high!")
                    `,
                    choices: [
                        { text: 'Tell the player they are wrong.', code: py`print("Wrong!")` },
                        { text: 'If the guess is bigger than the secret, print "Too high!".', code: py`
                            secret = 12
                            guess = 15
                            if guess > secret:
                                print("Too high!")
                        ` },
                        { text: 'Compare the numbers.', code: py`print(15 > 12)` },
                    ],
                    answer: 1,
                    hints: ['Which one says exactly what to check and what to print?'],
                },
                {
                    id: 'q8',
                    type: 'fix',
                    title: 'Missing case',
                    prompt: 'Bolt forgot a case! When the guess equals the secret, it should print `Correct!`. Fix it.',
                    starter: py`
                        secret = 12
                        guess = 12
                        if guess > secret:
                            print("Too high!")
                        else:
                            print("Too low!")
                    `,
                    solution: py`
                        secret = 12
                        guess = 12
                        if guess > secret:
                            print("Too high!")
                        elif guess < secret:
                            print("Too low!")
                        else:
                            print("Correct!")
                    `,
                    check: py`
                        assert "elif" in source, "Add an elif for Too low!, and use else for Correct!"
                        assert same_output(output, expected_output), "With guess 12 it should print Correct!"
                    `,
                    hints: ['Three cases need if, elif and else.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Evolve checker',
                    prompt: 'Ask `Level? `. Print `Evolves!` for level 16 or more, otherwise `Not yet`. We\'ll test the edges!',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        level = int(input("Level? "))
                        if level >= 16:
                            print("Evolves!")
                        else:
                            print("Not yet")
                    `,
                    inputs: ['16'],
                    check: py`
                        assert "Not yet" in run_with(["15"]), "Level 15 should print Not yet"
                        assert "Evolves!" in run_with(["30"]), "Level 30 should print Evolves!"
                        assert same_output(output, expected_output), "Level 16 (the edge!) should print Evolves!"
                    `,
                    hints: ['level = int(input("Level? "))', 'if level >= 16:'],
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
                    type: 'breakit',
                    title: 'Ticket check',
                    prompt: 'Critters aged 12 or younger get a child ticket. Find the age that breaks Bolt\'s code.',
                    robot: py`
                        if age < 12:
                            print("Child ticket")
                        else:
                            print("Adult ticket")
                    `,
                    correct: py`
                        if age <= 12:
                            print("Child ticket")
                        else:
                            print("Adult ticket")
                    `,
                    inputName: 'age',
                    choices: ['8', '12', '20'],
                    answer: '12',
                    hints: ['"12 or younger" includes 12.'],
                },
                {
                    id: 't2',
                    type: 'instruct',
                    title: 'Odd one out',
                    prompt: 'For n = 7, which instruction gets Bolt to print the 🎯 Goal?',
                    goalCode: py`
                        n = 7
                        if n % 2 == 1:
                            print("Odd")
                        else:
                            print("Even")
                    `,
                    choices: [
                        { text: 'Say if the number is even.', code: py`print("Even")` },
                        { text: 'Print "Odd" if n % 2 is 1, otherwise "Even".', code: py`
                            n = 7
                            if n % 2 == 1:
                                print("Odd")
                            else:
                                print("Even")
                        ` },
                        { text: 'Divide n by 2.', code: py`print(7 / 2)` },
                    ],
                    answer: 1,
                    hints: ['Which instruction gives Bolt the exact rule?'],
                },
                {
                    id: 'boss',
                    type: 'fix',
                    boss: true,
                    title: "BOSS: Bolt's referee",
                    prompt: 'The rules: HP 0 or less is `Fainted!`, 20 or less is `Danger!`, otherwise `OK`. Bolt\'s referee has TWO edge bugs. Find and fix both. We\'ll test lots of HP values!',
                    starter: py`
                        hp = int(input("HP? "))
                        if hp < 0:
                            print("Fainted!")
                        elif hp < 20:
                            print("Danger!")
                        else:
                            print("OK")
                    `,
                    solution: py`
                        hp = int(input("HP? "))
                        if hp <= 0:
                            print("Fainted!")
                        elif hp <= 20:
                            print("Danger!")
                        else:
                            print("OK")
                    `,
                    inputs: ['0'],
                    check: py`
                        assert "Danger!" in run_with(["20"]), "HP 20 should be Danger!"
                        assert "OK" in run_with(["50"]), "HP 50 should be OK"
                        assert "Fainted!" in run_with(["-5"]), "HP -5 should be Fainted!"
                        assert same_output(output, expected_output), "HP 0 should be Fainted!"
                    `,
                    hints: ['Check each rule at its edge: 0 and 20.', '"or less" means <='],
                },
            ],
        },
    ],
};
