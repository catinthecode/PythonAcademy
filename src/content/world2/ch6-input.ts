import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch6: Chapter = {
    id: 'ch6',
    title: 'Ask the Player',
    emoji: '⌨️',
    summary: 'Ask questions with input(), turn answers into numbers, and handle silly answers.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Talk to Me',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Py holds up a sign with a question mark and waits for an answer.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'rae', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'input() asks the player a question and WAITS for their answer.' },
                        { who: 'rae', text: 'So my game can talk to whoever is playing!' },
                    ],
                    code: py`
                        name = input("What's your name? ")
                        print("Hi, " + name + "!")
                    `,
                    inputs: ['Rae'],
                },
                {
                    scene: 'screen',
                    alt: 'Py shows that the answer 9 comes back as text in quotes.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'input() ALWAYS gives back text, even "9". Use int() to turn it into a number you can do math with.' },
                    ],
                    code: py`
                        age = int(input("How old are you? "))
                        print("Next year you'll be", age + 1)
                    `,
                    inputs: ['9'],
                },
                {
                    scene: 'meadow',
                    alt: 'Fizz points at a purple box labelled "The player types".',
                    cast: [{ who: 'fizz', pose: 'point', x: 40 }],
                    bubbles: [
                        { who: 'fizz', text: 'In this app, the purple ⌨️ box shows what the player types. Change it in Try it!' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Rae frowns: the question and the answer are squashed together with no space.',
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Why does it say Name?Rae all squashed?' },
                        { who: 'py', text: 'End your question with a space, inside the quotes.' },
                    ],
                    code: py`
                        name = input("Name?")
                        print("Hi", name)
                    `,
                    inputs: ['Rae'],
                },
                {
                    scene: 'meadow',
                    alt: 'Rae measures a garden plot with two questions: how wide and how long.',
                    cast: [
                        { who: 'rae', pose: 'talk', x: 25 },
                        { who: 'py', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Can I ask two questions?' },
                        { who: 'py', text: 'Sure! Each input() waits for its own answer, in order.' },
                    ],
                    code: py`
                        width = int(input("Width? "))
                        length = int(input("Length? "))
                        print("Garden size:", width * length)
                    `,
                    inputs: ['4', '6'],
                },
                {
                    scene: 'meadow',
                    alt: 'Fizz types its own name into the purple box and Py cheers.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'fizz', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'input() asks and waits. The answer is always text, so wrap it in int() before you do math.' },
                        { who: 'fizz', text: 'Let me be the player! Type fizz and watch it shout.' },
                    ],
                    code: py`
                        critter = input("Favourite critter? ")
                        print(critter.upper() + "!!!")
                    `,
                    inputs: ['fizz'],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Questions and Answers',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Echo',
                    prompt: 'The player types `Fizz`. What appears on the screen? (The question and answer show up too!)',
                    code: py`
                        name = input("Name? ")
                        print("Go, " + name + "!")
                    `,
                    inputs: ['Fizz'],
                    choices: ['Name? Fizz\nGo, Fizz!', 'Go, Fizz!', 'Name? Fizz\nGo, name!'],
                    answer: 'Name? Fizz\nGo, Fizz!',
                    hints: ['First the question appears with the player\'s answer, then the print.'],
                },
                {
                    id: 'p2',
                    type: 'fix',
                    title: 'Text or number?',
                    prompt: 'This crashes because input() gives text. Fix it so it prints the 🎯 Goal.',
                    starter: py`
                        age = input("Age? ")
                        print(age + 1)
                    `,
                    solution: py`
                        age = int(input("Age? "))
                        print(age + 1)
                    `,
                    inputs: ['9'],
                    hints: ['Wrap the input in int( ) to make it a number.'],
                },
                {
                    id: 'p3',
                    type: 'write',
                    title: 'Ready check',
                    prompt: 'Ask `What is your critter\'s name? ` and then print `<name> is ready!`. We\'ll test it with different names!',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        name = input("What is your critter's name? ")
                        print(name + " is ready!")
                    `,
                    inputs: ['Blaze'],
                    check: py`
                        assert "input(" in source, "Use input() to ask the question."
                        assert "Zap is ready!" in run_with(["Zap"]), "When the player types Zap, it should print: Zap is ready!"
                        assert same_output(output, expected_output), "Match the 🎯 Goal (question line, then answer line)."
                    `,
                    hints: ['name = input("What is your critter\'s name? ")', 'print(name + " is ready!")'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Double it',
                    prompt: 'The player types `21`. What appears?',
                    code: py`
                        n = int(input())
                        print(n * 2)
                    `,
                    inputs: ['21'],
                    choices: ['21\n42', '42', '21\n2121'],
                    answer: '21\n42',
                    hints: ['The answer 21 shows up first. Then int makes it a number, so * 2 does math.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Potion time',
                    prompt: 'Ask `HP? ` and `Potion? ` (both numbers), then print `New HP:` and the two added together.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        hp = int(input("HP? "))
                        potion = int(input("Potion? "))
                        print("New HP:", hp + potion)
                    `,
                    inputs: ['30', '15'],
                    check: py`
                        assert "New HP: 15" in run_with(["10", "5"]), "With HP 10 and potion 5, it should print New HP: 15"
                        assert same_output(output, expected_output), "Match the 🎯 Goal."
                    `,
                    hints: ['Use int(input(...)) for each question.', 'print("New HP:", hp + potion)'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Smart Questions',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Rae plays a guessing game with Py.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'py', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Can my game answer back?' },
                        { who: 'py', text: 'Yes! Mix input with if, and your program reacts to the player.' },
                    ],
                    code: py`
                        secret = 4
                        guess = int(input("Guess my number: "))
                        if guess == secret:
                            print("Lucky guess!")
                        else:
                            print("Try again!")
                    `,
                    inputs: ['4'],
                },
                {
                    scene: 'arena',
                    alt: 'Sneak types the word "seven" and the program crashes.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'I typed "seven" instead of 7. Crash! Hehehe.' },
                    ],
                    code: py`n = int(input("Number? "))`,
                    inputs: ['seven'],
                },
                {
                    scene: 'arena',
                    alt: 'Py catches the crash in a net labelled try.',
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'rae', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'try: means "try this". except ValueError: means "if it can\'t become a number, do this instead".' },
                    ],
                    code: py`
                        try:
                            n = int(input("Number? "))
                            print("Doubled:", n * 2)
                        except ValueError:
                            print("That's not a number!")
                    `,
                    inputs: ['seven'],
                },
                {
                    scene: 'screen',
                    alt: 'Py draws an arrow that jumps from a failing line straight down to except.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'rae', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'When a line under try fails, Python jumps straight to except.' },
                        { who: 'rae', text: 'So the line after it never runs!' },
                    ],
                    code: py`
                        try:
                            n = int("ten")
                            print("This line is skipped")
                        except ValueError:
                            print("Jumped to except!")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Fizz holds up a sign saying YES in capital letters.',
                    cast: [
                        { who: 'fizz', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'fizz', text: 'What if the player types YES in capitals?' },
                        { who: 'py', text: 'Use .lower() first, then YES and yes both match.' },
                    ],
                    code: py`
                        answer = input("Battle? ")
                        if answer.lower() == "yes":
                            print("Let's go!")
                        else:
                            print("Maybe later")
                    `,
                    inputs: ['YES'],
                },
                {
                    scene: 'arena',
                    alt: 'Rae high-fives Py while Sneak sulks, unable to crash the game.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'happy', x: 20 },
                        { who: 'py', pose: 'happy', x: 50 },
                        { who: 'sneak', pose: 'sad', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'input plus if makes my game react. try/except stops silly answers from crashing it!' },
                        { who: 'sneak', text: 'Hmph. Sneak-proof!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Game Questions',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Guess my number',
                    prompt: 'Make `secret = 7`. Ask `Guess: ` for a number. Print `You got it!` if the guess equals the secret, otherwise `Nope!`.',
                    starter: py`secret = 7`,
                    solution: py`
                        secret = 7
                        guess = int(input("Guess: "))
                        if guess == secret:
                            print("You got it!")
                        else:
                            print("Nope!")
                    `,
                    inputs: ['7'],
                    check: py`
                        assert "You got it!" in run_with(["7"]), "Typing 7 should print You got it!"
                        assert "Nope!" in run_with(["3"]), "Typing 3 should print Nope!"
                        assert same_output(output, expected_output), "Match the 🎯 Goal."
                    `,
                    hints: ['guess = int(input("Guess: "))', 'Then if guess == secret: ... else: ...'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    about: 'error',
                    title: 'Word, not number',
                    prompt: 'What happens when Python runs this?',
                    code: py`print(int("seven"))`,
                    choices: ['ValueError', 'TypeError', 'No error'],
                    answer: 'ValueError',
                    hints: ['int() can only change number-looking text, like "7".'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Don\'t crash!',
                    prompt: 'When the player types `ten`, this crashes. Use try/except so it prints `That\'s not a number!` instead.',
                    starter: py`
                        n = int(input("Number? "))
                        print("Doubled:", n * 2)
                    `,
                    solution: py`
                        try:
                            n = int(input("Number? "))
                            print("Doubled:", n * 2)
                        except ValueError:
                            print("That's not a number!")
                    `,
                    inputs: ['ten'],
                    check: py`
                        assert "try" in source and "except" in source, "Use try: and except ValueError:"
                        assert "Doubled: 10" in run_with(["5"]), "Typing 5 should still print Doubled: 10"
                        assert same_output(output, expected_output), "Typing ten should print That's not a number!"
                    `,
                    hints: ['Put the risky lines under try: (pushed in).', 'except ValueError:\n    print("That\'s not a number!")'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Sneaky text',
                    prompt: 'The player types `4`. There\'s no int() this time! What appears?',
                    code: py`
                        x = input("? ")
                        print(x * 2)
                    `,
                    inputs: ['4'],
                    choices: ['? 4\n8', '? 4\n44', '? 4\n4 4'],
                    answer: '? 4\n44',
                    hints: ['Without int(), x is the TEXT "4". Text times 2 repeats it.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Higher or lower',
                    prompt: 'Make `secret = 12`. Ask `Guess: `. Print `Too high!`, `Too low!` or `Correct!`.',
                    starter: py`secret = 12`,
                    solution: py`
                        secret = 12
                        guess = int(input("Guess: "))
                        if guess > secret:
                            print("Too high!")
                        elif guess < secret:
                            print("Too low!")
                        else:
                            print("Correct!")
                    `,
                    inputs: ['15'],
                    check: py`
                        assert "Too low!" in run_with(["5"]), "Typing 5 should print Too low!"
                        assert "Correct!" in run_with(["12"]), "Typing 12 should print Correct!"
                        assert same_output(output, expected_output), "Typing 15 should print Too high!"
                    `,
                    hints: ['Three paths: if guess > secret, elif guess < secret, else.'],
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
                    title: 'Number or text?',
                    prompt: 'The player types `5`. What appears?',
                    code: py`
                        n = int(input("Pick: "))
                        print(n + n)
                    `,
                    inputs: ['5'],
                    choices: ['Pick: 5\n10', 'Pick: 5\n55', '10'],
                    answer: 'Pick: 5\n10',
                    hints: ['int() made it a number, so + adds.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Never correct',
                    prompt: 'The player types 7 (the right answer) but it says Wrong! Fix the bug.',
                    starter: py`
                        guess = input("Guess: ")
                        if guess == 7:
                            print("Correct!")
                        else:
                            print("Wrong!")
                    `,
                    solution: py`
                        guess = int(input("Guess: "))
                        if guess == 7:
                            print("Correct!")
                        else:
                            print("Wrong!")
                    `,
                    inputs: ['7'],
                    hints: ['The text "7" is not equal to the number 7.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Berry shop',
                    prompt: 'Berries cost 3 coins each and you have 20 coins. Ask `How many berries? `. If the cost is 20 or less, print `Bought! Coins left:` and what\'s left. Otherwise print `Not enough coins!`. If the player doesn\'t type a number, print `Please type a number`.',
                    starter: py`coins = 20`,
                    solution: py`
                        coins = 20
                        try:
                            berries = int(input("How many berries? "))
                            cost = berries * 3
                            if cost <= coins:
                                print("Bought! Coins left:", coins - cost)
                            else:
                                print("Not enough coins!")
                        except ValueError:
                            print("Please type a number")
                    `,
                    inputs: ['4'],
                    check: py`
                        assert "Not enough coins!" in run_with(["10"]), "10 berries cost 30 coins: Not enough coins!"
                        assert "Please type a number" in run_with(["lots"]), "Typing lots should print Please type a number"
                        assert "Bought! Coins left: 2" in run_with(["6"]), "6 berries cost 18, leaving 2 coins."
                        assert same_output(output, expected_output), "Match the 🎯 Goal for 4 berries."
                    `,
                    hints: [
                        'cost = berries * 3',
                        'if cost <= coins: print("Bought! Coins left:", coins - cost)',
                        'Wrap it all in try: ... except ValueError: print("Please type a number")',
                    ],
                },
            ],
        },
    ],
};
