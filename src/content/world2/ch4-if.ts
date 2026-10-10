import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch4: Chapter = {
    id: 'ch4',
    title: 'Forks in the Road',
    emoji: '🔀',
    summary: 'Let your program make choices with if, elif and else.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Choose Your Path',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Rae and Fizz stand where the path splits in two.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'fizz', pose: 'sad', x: 48 },
                        { who: 'py', pose: 'talk', x: 78, flip: true },
                    ],
                    props: [{ item: 'sign', x: 62, y: 100 }],
                    bubbles: [
                        { who: 'rae', text: 'If Fizz is tired, we rest. Otherwise, we battle!' },
                        { who: 'py', text: 'That\'s exactly how an if works. Python checks the question and picks a path.' },
                    ],
                    code: py`
                        hp = 5
                        if hp < 10:
                            print("Rest at the camp")
                        else:
                            print("Battle!")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Py points out the colon and the pushed-in lines.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [
                        { who: 'py', text: 'Colons and pushed-in lines, like loops! Only ONE path runs. A line after, not pushed in, always runs.' },
                    ],
                    code: py`
                        hp = 50
                        if hp < 10:
                            print("Rest")
                        else:
                            print("Battle!")
                        print("Let's go, Fizz!")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Fizz looks at three signs: strong, OK, weak.',
                    cast: [
                        { who: 'fizz', pose: 'think', x: 28 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'fizz', text: 'What if there are MORE than two choices?' },
                        { who: 'py', text: 'Add elif ("else if") in the middle. You can have as many as you like!' },
                    ],
                    code: py`
                        hp = 15
                        if hp > 20:
                            print("Strong")
                        elif hp > 10:
                            print("OK")
                        else:
                            print("Weak")
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Rae checks her coin pouch outside a potion shop.',
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'coin', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'rae', text: 'Do I always need an else?' },
                        { who: 'py', text: 'No! Without else, a False question just skips its lines.' },
                    ],
                    code: py`
                        coins = 2
                        if coins >= 10:
                            print("Buy a potion")
                        print("Keep walking")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Sneak wrote one equals sign in an if, and the screen flashes red.',
                    cast: [
                        { who: 'sneak', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'My if crashed! What did I do?' },
                        { who: 'py', text: 'An if asks a question, so it needs ==, not =.' },
                    ],
                    code: py`
                        coins = 0
                        if coins = 0:
                            print("Broke!")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Fizz flaps its little wings, choosing a move. Rae and Py watch.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'fizz', pose: 'happy', x: 50 },
                        { who: 'rae', pose: 'happy', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'if works with text too: compare with == and keep the quotes around the word.' },
                        { who: 'rae', text: 'Now Fizz can choose its own moves!' },
                    ],
                    code: py`
                        move = "fly"
                        if move == "fly":
                            print("Up we go!")
                        else:
                            print("Stay on the ground")
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Pick a Path',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Tired?',
                    prompt: 'What will this code print?',
                    code: py`
                        hp = 5
                        if hp < 10:
                            print("Rest")
                        else:
                            print("Battle!")
                    `,
                    choices: ['Rest', 'Battle!', 'Rest\nBattle!'],
                    answer: 'Rest',
                    hints: ['Is 5 less than 10? Then only the if part runs.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Three ways',
                    prompt: 'What will this code print?',
                    code: py`
                        hp = 25
                        if hp > 20:
                            print("Strong")
                        elif hp > 10:
                            print("OK")
                        else:
                            print("Weak")
                    `,
                    choices: ['Strong', 'OK', 'Strong\nOK'],
                    answer: 'Strong',
                    hints: ['Python stops at the FIRST question that is True.'],
                },
                {
                    id: 'p3',
                    type: 'fix',
                    title: 'Missing colon',
                    prompt: 'This crashes. Fix it so it prints the 🎯 Goal.',
                    starter: py`
                        berries = 8
                        if berries > 5
                            print("Feast!")
                    `,
                    solution: py`
                        berries = 8
                        if berries > 5:
                            print("Feast!")
                    `,
                    hints: ['Every if line ends with a colon :'],
                },
                {
                    id: 'p4',
                    type: 'parsons',
                    title: 'Rest or battle',
                    prompt: 'Put the lines in order (and push lines in with ⇥) so the program prints the 🎯 Goal. One line is not needed.',
                    lines: [
                        'hp = 3',
                        'if hp < 10:',
                        '    print("Rest")',
                        'else:',
                        '    print("Battle!")',
                    ],
                    distractors: ['    print("Run away!")'],
                    hints: ['hp = 3 comes first, so the if can check it.', 'Each print belongs inside its path, so push it in.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Feast or snack',
                    prompt: 'Make `berries = 7`. If berries is 5 or more, print `Feast!`, otherwise print `Snack`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        berries = 7
                        if berries >= 5:
                            print("Feast!")
                        else:
                            print("Snack")
                    `,
                    check: py`
                        assert "if" in source and "else" in source, "Use if and else."
                        assert same_output(output, expected_output), "With 7 berries it should print Feast!"
                    `,
                    hints: ['if berries >= 5:', 'Don\'t forget the colons and the pushed-in prints.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Checking in Order',
            panels: [
                {
                    scene: 'screen',
                    alt: 'Py follows the questions from top to bottom with an arrow.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'rae', pose: 'think', x: 78, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Python asks the questions top to bottom and runs ONLY the first one that is True. The rest are skipped.' },
                        { who: 'rae', text: 'Even if a later question is True too?' },
                    ],
                    code: py`
                        hp = 40
                        if hp > 30:
                            print("Super strong")
                        elif hp > 20:
                            print("Strong")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Sneak swaps the order of two questions and giggles.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 30 },
                        { who: 'blaze', pose: 'sad', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'I swapped the order! Now Blazewing is never "Strong". Hehehe!' },
                    ],
                    code: py`
                        hp = 30
                        if hp > 10:
                            print("OK")
                        elif hp > 20:
                            print("Strong")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Rae fixes the order and Blazewing cheers.',
                    cast: [
                        { who: 'rae', pose: 'happy', x: 30 },
                        { who: 'blaze', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Put the hardest test first, then the easier ones!' },
                        { who: 'blaze', text: 'Yay, I can be Strong again!' },
                    ],
                },
                {
                    scene: 'arena',
                    alt: 'Py points at the number 10 sitting right on a line between two zones.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'fizz', pose: 'surprised', x: 75, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'A badge needs 10 points or more. Try 9, 10 and 11!' },
                        { who: 'fizz', text: '10 gets no badge. The > is wrong!' },
                    ],
                    caption: 'Bugs love edges. Test the number right on the line.',
                    code: py`
                        points = 10
                        if points > 10:
                            print("Badge!")
                        else:
                            print("No badge")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Rae wonders what Fizz will do when it is neither happy nor hungry.',
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'What if Fizz is not happy OR hungry?' },
                        { who: 'py', text: 'Then else runs. It catches everything the questions missed.' },
                    ],
                    code: py`
                        mood = "sleepy"
                        if mood == "happy":
                            print("Fizz dances")
                        elif mood == "hungry":
                            print("Fizz eats")
                        else:
                            print("Fizz naps")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Py draws a path that stops at the first open gate. Rae and Blazewing cheer.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'rae', pose: 'happy', x: 55 },
                        { who: 'blaze', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Remember: top to bottom, the FIRST True path wins, and else catches the rest. Test the edges!' },
                        { who: 'rae', text: 'Hardest question first. Got it!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Order Matters',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: "Sneak's order",
                    prompt: 'What will this code print?',
                    code: py`
                        hp = 30
                        if hp > 10:
                            print("OK")
                        elif hp > 20:
                            print("Strong")
                    `,
                    choices: ['OK', 'Strong', 'OK\nStrong'],
                    answer: 'OK',
                    hints: ['30 > 10 is True, so Python stops right there.'],
                },
                {
                    id: 'p6',
                    type: 'fix',
                    title: 'Fix the order',
                    prompt: 'With hp = 30 this should print `Strong`. Fix the order of the questions!',
                    starter: py`
                        hp = 30
                        if hp > 10:
                            print("OK")
                        elif hp > 20:
                            print("Strong")
                    `,
                    solution: py`
                        hp = 30
                        if hp > 20:
                            print("Strong")
                        elif hp > 10:
                            print("OK")
                    `,
                    check: py`
                        assert "elif" in source, "Keep both questions: if and elif."
                        assert same_output(output, expected_output), "With hp = 30 it should print Strong."
                    `,
                    hints: ['Ask the hardest question (> 20) first.'],
                },
                {
                    id: 'p7',
                    type: 'breakit',
                    title: 'Healthy or hurt?',
                    prompt: 'The rule: 50 HP or more is "Healthy". Bolt wrote this. Find an HP value that shows its bug!',
                    robot: py`
                        if hp > 50:
                            print("Healthy")
                        else:
                            print("Hurt")
                    `,
                    correct: py`
                        if hp >= 50:
                            print("Healthy")
                        else:
                            print("Hurt")
                    `,
                    inputName: 'hp',
                    choices: ['30', '50', '80'],
                    answer: '50',
                    hints: ['Bugs love the edges. Try the number right on the line.'],
                },
                {
                    id: 'p8',
                    type: 'fill',
                    title: 'Fainted',
                    prompt: 'Fill in the gap so it prints `Fainted` when hp is exactly 0.',
                    template: py`
                        hp = 0
                        if hp ___ 0:
                            print("Fainted")
                    `,
                    answers: ['=='],
                    hints: ['Which symbol ASKS whether two things are equal?'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Weather boost',
                    prompt: 'Make `weather = "rain"`. If it\'s "rain", print `Water critters get a boost!`. If it\'s "sun", print `Fire critters get a boost!`. Otherwise print `No boost`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        weather = "rain"
                        if weather == "rain":
                            print("Water critters get a boost!")
                        elif weather == "sun":
                            print("Fire critters get a boost!")
                        else:
                            print("No boost")
                    `,
                    check: py`
                        assert "elif" in source and "else" in source, "Use if, elif and else."
                        assert same_output(output, expected_output), "With rain it should print the water boost."
                    `,
                    hints: ['Compare text with ==, and keep the quotes: weather == "rain"'],
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
                    title: 'In the middle',
                    prompt: 'What will this code print?',
                    code: py`
                        hp = 15
                        if hp > 20:
                            print("Strong")
                        elif hp > 10:
                            print("OK")
                        else:
                            print("Weak")
                    `,
                    choices: ['Strong', 'OK', 'Weak'],
                    answer: 'OK',
                    hints: ['Is 15 > 20? Is 15 > 10?'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Grade bug',
                    prompt: 'Scores of 90 or more get an A, 80 or more a B. Find a score that shows Bolt\'s bug!',
                    robot: py`
                        if score > 90:
                            print("A")
                        elif score >= 80:
                            print("B")
                        else:
                            print("C")
                    `,
                    correct: py`
                        if score >= 90:
                            print("A")
                        elif score >= 80:
                            print("B")
                        else:
                            print("C")
                    `,
                    inputName: 'score',
                    choices: ['95', '90', '70'],
                    answer: '90',
                    hints: ['Look at the first question. Which number is right on its edge?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Choose your move',
                    prompt: 'Make `attack = "grass"`. Print `Splash!` for "water", `Blaze!` for "fire", `Vine whip!` for "grass", and `Tackle!` for anything else.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        attack = "grass"
                        if attack == "water":
                            print("Splash!")
                        elif attack == "fire":
                            print("Blaze!")
                        elif attack == "grass":
                            print("Vine whip!")
                        else:
                            print("Tackle!")
                    `,
                    check: py`
                        assert source.count("elif") >= 2 and "else" in source, "Use if, two elifs and an else."
                        for word in ["Splash!", "Blaze!", "Vine whip!", "Tackle!"]:
                            assert word in source, "Your program needs a path that prints " + word
                        assert same_output(output, expected_output), "With grass it should print Vine whip!"
                    `,
                    hints: ['Start with: if attack == "water":', 'Then elif for fire, elif for grass, and else for everything else.'],
                },
            ],
        },
    ],
};
