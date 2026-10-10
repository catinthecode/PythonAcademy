import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch5: Chapter = {
    id: 'ch5',
    title: 'Logic Puzzles',
    emoji: '🧩',
    summary: 'Combine questions with and, or and not.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'And, Or, Not',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Rae checks two things before sending Fizz into battle.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'fizz', pose: 'idle', x: 48 },
                        { who: 'py', pose: 'talk', x: 78, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Fizz can battle if its HP is above 0 AND it is not asleep.' },
                        { who: 'py', text: 'Python has those exact words: and, or, not!' },
                    ],
                    code: py`
                        hp = 10
                        asleep = False
                        print(hp > 0 and not asleep)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A screen shows what and, or and not do.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'and: BOTH must be True. or: at least ONE must be True. not: flips True and False.' },
                    ],
                    code: py`
                        print(True and False)
                        print(True or False)
                        print(not True)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Fizz yawns; it is asleep.',
                    cast: [
                        { who: 'fizz', pose: 'sad', x: 30 },
                        { who: 'rae', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'rae', text: 'If Fizz is asleep, not asleep is False, so the whole "and" is False.' }],
                    code: py`
                        hp = 10
                        asleep = True
                        print(hp > 0 and not asleep)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Logic Basics',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Both?',
                    prompt: 'What will this code print?',
                    code: py`print(True and False)`,
                    choices: ['True', 'False'],
                    answer: 'False',
                    hints: ['and needs BOTH sides to be True.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Either?',
                    prompt: 'What will this code print?',
                    code: py`print(True or False)`,
                    choices: ['True', 'False'],
                    answer: 'True',
                    hints: ['or needs at least ONE side to be True.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Flip it',
                    prompt: 'What will this code print?',
                    code: py`print(not True)`,
                    choices: ['True', 'False'],
                    answer: 'False',
                    hints: ['not flips True to False and False to True.'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Ready to battle?',
                    prompt: 'What will this code print?',
                    code: py`
                        hp = 10
                        asleep = False
                        print(hp > 0 and not asleep)
                    `,
                    choices: ['True', 'False'],
                    answer: 'True',
                    hints: ['hp > 0 is True. not asleep is not False, which is True.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Gym badge',
                    prompt: 'Make `level = 12` and `badges = 2`. Print whether level is at least 10 AND badges is at least 3.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        level = 12
                        badges = 2
                        print(level >= 10 and badges >= 3)
                    `,
                    check: py`
                        assert " and " in source, "Use and to join the two questions."
                        assert same_output(output, expected_output), "Only one of the questions is True, so..."
                    `,
                    hints: ['print(level >= 10 and badges >= 3)'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Combining Conditions',
            panels: [
                {
                    scene: 'castle',
                    alt: 'A guard sign at the tournament gate lists two rules.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 26 },
                        { who: 'blaze', pose: 'happy', x: 74, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Use and/or right inside an if. The gate opens for level 10+ AND 3+ badges.' }],
                    code: py`
                        level = 14
                        badges = 3
                        if level >= 10 and badges >= 3:
                            print("Enter the tournament!")
                        else:
                            print("Not yet")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Sneak changes "and" to "or" and lets everyone in.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 30 },
                        { who: 'rae', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'sneak', text: 'I changed and to or! Now critters with ONE thing get in too. Hehe!' }],
                    code: py`
                        level = 4
                        badges = 3
                        if level >= 10 or badges >= 3:
                            print("Enter the tournament!")
                        else:
                            print("Not yet")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Rae holds up a pair of brackets.',
                    cast: [{ who: 'rae', pose: 'point', x: 35 }],
                    bubbles: [{ who: 'rae', text: 'When a rule gets long, brackets make it easier to read.' }],
                    code: py`
                        level = 12
                        badges = 1
                        champion = True
                        print((level >= 10 and badges >= 3) or champion)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Logic Gates',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'Or opens the door',
                    prompt: 'What will this code print?',
                    code: py`
                        level = 5
                        badges = 4
                        if level >= 10 or badges >= 3:
                            print("Enter")
                        else:
                            print("Wait")
                    `,
                    choices: ['Enter', 'Wait'],
                    answer: 'Enter',
                    hints: ['Is level >= 10? Is badges >= 3? With or, one is enough.'],
                },
                {
                    id: 'p6',
                    type: 'breakit',
                    title: 'Junior league',
                    prompt: 'Critters aged 7 to 12 (including 7 and 12) play in the Junior league. Find an age that shows Bolt\'s bug!',
                    robot: py`
                        if age > 7 and age < 12:
                            print("Junior league")
                        else:
                            print("Other league")
                    `,
                    correct: py`
                        if age >= 7 and age <= 12:
                            print("Junior league")
                        else:
                            print("Other league")
                    `,
                    inputName: 'age',
                    choices: ['9', '12', '15'],
                    answer: '12',
                    hints: ['"Including 12" means 12 should be Junior. What does Bolt do with 12?'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'And, not or',
                    prompt: 'Fizz should only battle if hp > 0 AND it is not asleep. Right now it battles with 0 HP! Fix the rule.',
                    starter: py`
                        hp = 0
                        asleep = False
                        if hp > 0 or not asleep:
                            print("Battle!")
                        else:
                            print("Rest")
                    `,
                    solution: py`
                        hp = 0
                        asleep = False
                        if hp > 0 and not asleep:
                            print("Battle!")
                        else:
                            print("Rest")
                    `,
                    hints: ['"Both things must be true" is and, not or.'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Not bigger',
                    prompt: 'What will this code print?',
                    code: py`print(not (5 > 3))`,
                    choices: ['True', 'False'],
                    answer: 'False',
                    hints: ['5 > 3 is True. Then not flips it.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Rainy day',
                    prompt: 'Make `is_raining = True` and `has_umbrella = False`. If it is raining AND Fizz has no umbrella, print `Fizz gets wet!`, otherwise `Fizz stays dry`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        is_raining = True
                        has_umbrella = False
                        if is_raining and not has_umbrella:
                            print("Fizz gets wet!")
                        else:
                            print("Fizz stays dry")
                    `,
                    check: py`
                        assert " and " in source and "not " in source, "Use and + not."
                        assert same_output(output, expected_output), "Raining and no umbrella... Fizz gets wet!"
                    `,
                    hints: ['if is_raining and not has_umbrella:'],
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
                    title: 'One false',
                    prompt: 'What will this code print?',
                    code: py`print(3 > 1 and 2 > 5)`,
                    choices: ['True', 'False'],
                    answer: 'False',
                    hints: ['Is 2 > 5?'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Rest stop',
                    prompt: 'Critters with 20 HP or LESS should rest. Find the HP that shows Bolt\'s bug.',
                    robot: py`
                        if hp < 20:
                            print("Rest")
                        else:
                            print("Battle")
                    `,
                    correct: py`
                        if hp <= 20:
                            print("Rest")
                        else:
                            print("Battle")
                    `,
                    inputName: 'hp',
                    choices: ['15', '20', '50'],
                    answer: '20',
                    hints: ['"20 or less" includes 20.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Grand Cup gate',
                    prompt: 'Make `level = 14`, `badges = 3` and `banned = False`. Print `Welcome to the Grand Cup!` if level is at least 10 AND badges is at least 3 AND the critter is NOT banned. Otherwise print `Not yet!`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        level = 14
                        badges = 3
                        banned = False
                        if level >= 10 and badges >= 3 and not banned:
                            print("Welcome to the Grand Cup!")
                        else:
                            print("Not yet!")
                    `,
                    check: py`
                        assert " and " in source and "not " in source and "else" in source, "Use and, not, and an else."
                        assert "Not yet!" in source, "Remember the else path: Not yet!"
                        assert same_output(output, expected_output), "This critter should get in!"
                    `,
                    hints: ['You can chain: a and b and c', 'if level >= 10 and badges >= 3 and not banned:'],
                },
            ],
        },
    ],
};
