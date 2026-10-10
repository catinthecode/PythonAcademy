import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch8: Chapter = {
    id: 'ch8',
    title: 'Project: Critter Battle',
    emoji: '⚔️',
    summary: 'Plan and build a battle turn: stats, moves from input(), damage math and a winner.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Plan the Battle',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Rae and Fizz face Blazewing across the arena.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'happy', x: 15 },
                        { who: 'fizz', pose: 'surprised', x: 35 },
                        { who: 'blaze', pose: 'talk', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Let\'s make our own battle game!' },
                        { who: 'blaze', text: 'Bring it on!' },
                    ],
                },
                {
                    scene: 'arena',
                    alt: 'Py unrolls a plan scroll with four steps.',
                    cast: [{ who: 'py', pose: 'point', x: 28 }],
                    props: [{ item: 'scroll', x: 68, y: 100, scale: 1.2 }],
                    bubbles: [
                        { who: 'py', text: 'Plan: 1) stats as variables, 2) choose a move with input(), 3) damage math, 4) if to pick the winner.' },
                    ],
                },
                {
                    scene: 'arena',
                    alt: 'Fizz shows its HP and the enemy HP as numbers.',
                    cast: [
                        { who: 'fizz', pose: 'talk', x: 30 },
                        { who: 'blaze', pose: 'idle', x: 74, flip: true },
                    ],
                    bubbles: [{ who: 'fizz', text: 'Stats are just variables. An f-string shows them nicely!' }],
                    code: py`
                        my_hp = 30
                        enemy_hp = 25
                        print(f"Fizz: {my_hp} HP | Blazewing: {enemy_hp} HP")
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Battle Parts',
            problems: [
                {
                    id: 's1',
                    type: 'write',
                    title: 'Part 1: Stats',
                    prompt: 'Make `my_hp = 30` and `enemy_hp = 25`, then print the 🎯 Goal status line with an f-string.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        my_hp = 30
                        enemy_hp = 25
                        print(f"You: {my_hp} HP | Enemy: {enemy_hp} HP")
                    `,
                    check: py`
                        g = globals()
                        assert g.get("my_hp") == 30 and g.get("enemy_hp") == 25, "Make my_hp = 30 and enemy_hp = 25."
                        assert same_output(output, expected_output), "Match the status line."
                    `,
                    hints: ['print(f"You: {my_hp} HP | Enemy: {enemy_hp} HP")'],
                },
                {
                    id: 's2',
                    type: 'write',
                    title: 'Part 2: Zap!',
                    prompt: 'Ask `Move? `. If the player types `zap`, take 10 off `enemy_hp`. Then print `Enemy HP:` and enemy_hp.',
                    starter: py`enemy_hp = 25`,
                    solution: py`
                        enemy_hp = 25
                        move = input("Move? ")
                        if move == "zap":
                            enemy_hp = enemy_hp - 10
                        print("Enemy HP:", enemy_hp)
                    `,
                    inputs: ['zap'],
                    check: py`
                        assert "Enemy HP: 25" in run_with(["wait"]), "Any other move should leave Enemy HP: 25"
                        assert same_output(output, expected_output), "Zap should take enemy_hp down to 15."
                    `,
                    hints: ['move = input("Move? ")', 'if move == "zap":\n    enemy_hp = enemy_hp - 10', 'The print goes AFTER the if (not pushed in), so it always runs.'],
                },
                {
                    id: 's3',
                    type: 'fill',
                    title: 'Part 3: Heal',
                    prompt: 'Healing should add enough HP to print the 🎯 Goal. Fill in the number.',
                    template: py`
                        my_hp = 30
                        move = input("Move? ")
                        if move == "heal":
                            my_hp = my_hp + ___
                        print("My HP:", my_hp)
                    `,
                    answers: ['8'],
                    inputs: ['heal'],
                    hints: ['Look at the 🎯 Goal. How much more than 30 is it?'],
                },
                {
                    id: 's4',
                    type: 'predict',
                    title: 'Part 4: Who won?',
                    prompt: 'What will this code print?',
                    code: py`
                        my_hp = 12
                        enemy_hp = 0
                        if enemy_hp <= 0:
                            print("You win!")
                        elif my_hp <= 0:
                            print("You lose!")
                        else:
                            print("Keep fighting!")
                    `,
                    choices: ['You win!', 'You lose!', 'Keep fighting!'],
                    answer: 'You win!',
                    hints: ['Is enemy_hp <= 0?'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Confused critter',
                    prompt: 'Ask `Move? `. Print `Zap!` for zap, `Heal!` for heal, and `Fizz is confused!` for anything else.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        move = input("Move? ")
                        if move == "zap":
                            print("Zap!")
                        elif move == "heal":
                            print("Heal!")
                        else:
                            print("Fizz is confused!")
                    `,
                    inputs: ['dance'],
                    check: py`
                        assert "Zap!" in run_with(["zap"]), "zap should print Zap!"
                        assert "Heal!" in run_with(["heal"]), "heal should print Heal!"
                        assert same_output(output, expected_output), "dance (not a real move) should print Fizz is confused!"
                    `,
                    hints: ['if / elif / else, comparing move to "zap" and "heal".'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Make It Fair',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Py explains that every move needs its own path.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'fizz', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Give each move its own if/elif path, and use else for typos.' }],
                },
                {
                    scene: 'arena',
                    alt: 'Blazewing faints dramatically; Rae cheers.',
                    cast: [
                        { who: 'blaze', pose: 'sad', x: 30 },
                        { who: 'rae', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'rae', text: 'After the move, check the HPs to see if anyone has won.' }],
                },
                {
                    scene: 'arena',
                    alt: 'Bolt waves a checklist of things to test.',
                    wide: true,
                    cast: [
                        { who: 'bolt', pose: 'point', x: 30 },
                        { who: 'py', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'bolt', text: 'Then test every move, a typo, AND the edge: what if HP lands exactly on 0?' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'A Full Turn',
            problems: [
                {
                    id: 's5',
                    type: 'write',
                    title: 'Part 5: One full turn',
                    prompt: 'Start with `my_hp = 30` and `enemy_hp = 25`. Ask `Move? `: zap takes 10 off enemy_hp, heal adds 8 to my_hp. Then print the status line from the 🎯 Goal.',
                    starter: py`
                        my_hp = 30
                        enemy_hp = 25
                    `,
                    solution: py`
                        my_hp = 30
                        enemy_hp = 25
                        move = input("Move? ")
                        if move == "zap":
                            enemy_hp = enemy_hp - 10
                        elif move == "heal":
                            my_hp = my_hp + 8
                        print(f"You: {my_hp} HP | Enemy: {enemy_hp} HP")
                    `,
                    inputs: ['zap'],
                    check: py`
                        assert "You: 38 HP | Enemy: 25 HP" in run_with(["heal"]), "heal should give You: 38 HP | Enemy: 25 HP"
                        assert same_output(output, expected_output), "zap should give You: 30 HP | Enemy: 15 HP"
                    `,
                    hints: ['Use if/elif for the two moves.', 'Print the status line at the end, not pushed in.'],
                },
                {
                    id: 's6',
                    type: 'fix',
                    title: 'Healing the enemy?!',
                    prompt: 'Zap is supposed to hurt the enemy, but it HEALS it! Fix the damage math.',
                    starter: py`
                        enemy_hp = 25
                        move = input("Move? ")
                        if move == "zap":
                            enemy_hp = enemy_hp + 10
                        print("Enemy HP:", enemy_hp)
                    `,
                    solution: py`
                        enemy_hp = 25
                        move = input("Move? ")
                        if move == "zap":
                            enemy_hp = enemy_hp - 10
                        print("Enemy HP:", enemy_hp)
                    `,
                    inputs: ['zap'],
                    hints: ['Damage should take away HP.'],
                },
                {
                    id: 's7',
                    type: 'breakit',
                    title: 'Exactly zero',
                    prompt: 'You win when the enemy has 0 HP or less. Find the HP that shows Bolt\'s winner check is buggy.',
                    robot: py`
                        if enemy_hp < 0:
                            print("You win!")
                        else:
                            print("Keep fighting!")
                    `,
                    correct: py`
                        if enemy_hp <= 0:
                            print("You win!")
                        else:
                            print("Keep fighting!")
                    `,
                    inputName: 'enemy_hp',
                    choices: ['5', '0', '-3'],
                    answer: '0',
                    hints: ['What happens when HP lands EXACTLY on the edge?'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Critical hit',
                    prompt: 'Ask `Roll (1-6)? ` for a number. Damage is 10, but a roll of 6 is a critical hit and does 20. Print `Damage:` and the damage.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        roll = int(input("Roll (1-6)? "))
                        damage = 10
                        if roll == 6:
                            damage = 20
                        print("Damage:", damage)
                    `,
                    inputs: ['6'],
                    check: py`
                        assert "Damage: 10" in run_with(["3"]), "A roll of 3 should do Damage: 10"
                        assert same_output(output, expected_output), "A roll of 6 should do Damage: 20"
                    `,
                    hints: ['Set damage = 10 first, then change it to 20 only if roll == 6.'],
                },
            ],
        },
        {
            kind: 'test',
            id: 'test',
            title: 'Project Showcase',
            problems: [
                {
                    id: 't1',
                    type: 'predict',
                    title: 'Fair fight?',
                    prompt: 'What will this code print?',
                    code: py`
                        my_hp = 0
                        enemy_hp = 5
                        if enemy_hp <= 0:
                            print("You win!")
                        elif my_hp <= 0:
                            print("You lose!")
                        else:
                            print("Keep fighting!")
                    `,
                    choices: ['You win!', 'You lose!', 'Keep fighting!'],
                    answer: 'You lose!',
                    hints: ['The enemy still has HP. What about you?'],
                },
                {
                    id: 't2',
                    type: 'instruct',
                    title: 'Precise rules',
                    prompt: 'The enemy has 0 HP. Which instruction gets Bolt to print the 🎯 Goal?',
                    goalCode: py`
                        enemy_hp = 0
                        if enemy_hp <= 0:
                            print("Blazewing fainted!")
                    `,
                    choices: [
                        { text: 'Check if the battle is over.', code: py`print("Over?")` },
                        { text: 'If enemy_hp is 0 or less, print "Blazewing fainted!".', code: py`
                            enemy_hp = 0
                            if enemy_hp <= 0:
                                print("Blazewing fainted!")
                        ` },
                        { text: 'If enemy_hp is less than 0, print "Blazewing fainted!".', code: py`
                            enemy_hp = 0
                            if enemy_hp < 0:
                                print("Blazewing fainted!")
                        ` },
                    ],
                    answer: 1,
                    hints: ['"Less than 0" and "0 or less" are different at exactly 0!'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    hideGoal: true,
                    title: 'BOSS: Your battle turn',
                    prompt: 'Build YOUR battle turn! Rules: ask for a move with `input()`; `zap` and `heal` must do different things; any other move gets an else message; change an HP variable; and print `You win!` if the enemy\'s HP drops to 0 or less. Pick your own numbers and messages!',
                    starter: py`
                        my_hp = 30
                        enemy_hp = 10

                        # 1. Ask for a move
                        # 2. Do the move (zap / heal / else)
                        # 3. Show the HPs
                        # 4. Check for a winner
                    `,
                    solution: py`
                        my_hp = 30
                        enemy_hp = 10
                        move = input("Move? ")
                        if move == "zap":
                            enemy_hp = enemy_hp - 10
                            print("Zap!")
                        elif move == "heal":
                            my_hp = my_hp + 8
                            print("Heal!")
                        else:
                            print("Fizz is confused!")
                        print(f"You: {my_hp} HP | Enemy: {enemy_hp} HP")
                        if enemy_hp <= 0:
                            print("You win!")
                    `,
                    inputs: ['zap'],
                    check: py`
                        assert "input(" in source, "Ask for the move with input()."
                        assert "elif" in source and "else" in source, "Use if, elif and else for the moves."
                        zap, heal, other = run_with(["zap"]), run_with(["heal"]), run_with(["dance"])
                        assert zap != heal and heal != other and zap != other, "zap, heal and other moves should each do something different."
                        assert "You win!" in run_with(["zap"], setup="") or "You win!" in source, "Print You win! when the enemy's HP is 0 or less."
                        assert "<= 0" in source or "< 1" in source, "Check for a winner with enemy HP <= 0."
                    `,
                    hints: [
                        'Start with move = input("Move? ")',
                        'Copy the moves from Part 5, then add your own messages.',
                        'End with: if enemy_hp <= 0: print("You win!")',
                    ],
                },
            ],
        },
    ],
};
