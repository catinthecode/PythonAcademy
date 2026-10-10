import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch4: Chapter = {
    id: 'ch4',
    title: 'Searching',
    emoji: '🔍',
    summary: 'Find things in lists with in, index() and your own search loops with break.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Is It There?',
            panels: [
                {
                    scene: 'village',
                    alt: 'Bix rummages through a backpack for a key.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'Do I have the key in my backpack?' },
                        { who: 'py', text: 'Ask with in: it answers True or False.' },
                    ],
                    code: py`
                        backpack = ["map", "key", "rope"]
                        print("key" in backpack)
                        print("cake" in backpack)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py points to the position of the key.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [{ who: 'py', text: '.index() tells you WHERE something is.' }],
                    code: py`
                        backpack = ["map", "key", "rope"]
                        print(backpack.index("key"))
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Glitch asks for something that is not there and the program crashes.',
                    cast: [
                        { who: 'glitch', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'Where\'s the cake? Crash! Hehe.' },
                        { who: 'py', text: 'index() crashes if it\'s missing. Check with in first!' },
                    ],
                    code: py`
                        backpack = ["map", "key", "rope"]
                        if "cake" in backpack:
                            print(backpack.index("cake"))
                        else:
                            print("No cake!")
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'In and Index',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Got it?',
                    prompt: 'What will this code print?',
                    code: py`print("blue" in ["red", "blue"])`,
                    choices: ['True', 'False', '1'],
                    answer: 'True',
                    hints: ['in answers True or False.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Where is it?',
                    prompt: 'What will this code print?',
                    code: py`print(["red", "blue", "green"].index("green"))`,
                    choices: ['2', '3', 'green'],
                    answer: '2',
                    hints: ['Positions start at 0.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    about: 'error',
                    title: 'Not there',
                    prompt: 'What happens when Python runs this?',
                    code: py`print(["a", "b"].index("z"))`,
                    choices: ['ValueError', 'IndexError', 'No error'],
                    answer: 'ValueError',
                    hints: ['There\'s no "z" to find.'],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    title: 'Safe search',
                    prompt: 'This crashes when the colour isn\'t in the list. Check with `in` first, and print `Not found` if it\'s missing.',
                    starter: py`
                        colors = ["red", "blue", "green"]
                        target = "pink"
                        print(colors.index(target))
                    `,
                    solution: py`
                        colors = ["red", "blue", "green"]
                        target = "pink"
                        if target in colors:
                            print(colors.index(target))
                        else:
                            print("Not found")
                    `,
                    check: py`
                        assert " in colors" in source, "Check with: if target in colors:"
                        assert same_output(output, expected_output), "pink isn't there, so print Not found."
                    `,
                    hints: ['if target in colors: ... else: print("Not found")'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Locked door',
                    prompt: 'Make `items = ["map", "key", "rope"]`. If "key" is in items, print `You can open the door!`, otherwise `Find the key first`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        items = ["map", "key", "rope"]
                        if "key" in items:
                            print("You can open the door!")
                        else:
                            print("Find the key first")
                    `,
                    check: py`
                        assert " in items" in source and "else" in source, "Use in, and an else for the missing-key message."
                        assert same_output(output, expected_output), "The key is there!"
                    `,
                    hints: ['if "key" in items:'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Search by Hand',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Bix checks bricks one by one looking for a gold one.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'point', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Your own search loop: check each item, and when you find it, break stops the loop right away.' }],
                    code: py`
                        bricks = ["red", "gold", "blue", "gold"]
                        for b in bricks:
                            print("Checking", b)
                            if b == "gold":
                                print("Found gold!")
                                break
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py raises a flag labelled found.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [{ who: 'py', text: 'A "found" flag starts False and flips to True when you find a match.' }],
                    code: py`
                        found = False
                        for item in ["map", "key"]:
                            if item == "key":
                                found = True
                        print("Found the key:", found)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix finds the first big score and stops.',
                    cast: [{ who: 'bix', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'bix', text: 'Searches can look for a RULE too, like the first score over 10.' }],
                    code: py`
                        for s in [4, 9, 15, 22]:
                            if s > 10:
                                print("First big score:", s)
                                break
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Search Loops',
            problems: [
                {
                    id: 'p5',
                    type: 'trace',
                    title: 'Stop early',
                    prompt: 'Fill in `c` each time line 2 finishes. (Watch for the break!)',
                    code: py`
                        for c in ["red", "blue", "green"]:
                            print(c)
                            if c == "blue":
                                break
                    `,
                    line: 2,
                    columns: ['c'],
                    rows: [['red'], ['blue']],
                    hints: ['When c is "blue", break stops the loop. Green is never reached.'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    title: 'First over ten',
                    prompt: 'What will this code print?',
                    code: py`
                        for n in [3, 8, 12, 5, 30]:
                            if n > 10:
                                print(n)
                                break
                    `,
                    choices: ['12', '12\n30', '30'],
                    answer: '12',
                    hints: ['break stops at the FIRST match.'],
                },
                {
                    id: 'p7',
                    type: 'breakit',
                    title: 'Forgetful flag',
                    prompt: 'Bolt\'s search should print True if "key" is ANYWHERE in the list. Find a list that breaks it!',
                    robot: py`
                        found = False
                        for item in items:
                            if item == "key":
                                found = True
                            else:
                                found = False
                        print(found)
                    `,
                    correct: py`
                        found = False
                        for item in items:
                            if item == "key":
                                found = True
                        print(found)
                    `,
                    inputName: 'items',
                    choices: ['["map", "key"]', '["key", "map"]', '["rope", "map"]'],
                    answer: '["key", "map"]',
                    hints: ['What happens to found AFTER it finds the key, if there are more items?'],
                },
                {
                    id: 'p8',
                    type: 'write',
                    title: 'First big score',
                    prompt: 'Make `scores = [4, 9, 15, 22]`. Use a loop and `break` to print only the FIRST score over 10.',
                    starter: py`scores = [4, 9, 15, 22]`,
                    solution: py`
                        scores = [4, 9, 15, 22]
                        for s in scores:
                            if s > 10:
                                print(s)
                                break
                    `,
                    check: py`
                        assert "break" in source, "Use break to stop after the first one."
                        assert same_output(output, expected_output), "Only the first score over 10."
                    `,
                    hints: ['if s > 10: print(s) and then break'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Red count',
                    prompt: 'Make `bricks = ["red", "blue", "red", "green", "red"]`. Count the red bricks with a loop (no `.count()`!) and print `Red bricks:` and the count.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        bricks = ["red", "blue", "red", "green", "red"]
                        count = 0
                        for b in bricks:
                            if b == "red":
                                count += 1
                        print("Red bricks:", count)
                    `,
                    check: py`
                        assert "for" in source and ".count(" not in source, "Use a loop, not .count()."
                        assert same_output(output, expected_output), "There are 3 red bricks."
                    `,
                    hints: ['It\'s the count pattern: if b == "red": count += 1'],
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
                    title: 'On the team?',
                    prompt: 'What will this code print?',
                    code: py`print("Glitch" in ["Bix", "Bolt"])`,
                    choices: ['True', 'False'],
                    answer: 'False',
                    hints: ['Is "Glitch" one of the items?'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Too many',
                    prompt: 'This should print only the FIRST score over 10, but it prints more. Fix it!',
                    starter: py`
                        for s in [5, 12, 30]:
                            if s > 10:
                                print(s)
                    `,
                    solution: py`
                        for s in [5, 12, 30]:
                            if s > 10:
                                print(s)
                                break
                    `,
                    hints: ['Stop the loop once you\'ve found one.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Secret doors',
                    prompt: 'Make `codes = [4021, 1234, 9876, 5555]`. Ask `Code? `. If the code is in the list, print `Door N opens!` where N is its position counting from 1. Otherwise print `Wrong code`.',
                    starter: py`codes = [4021, 1234, 9876, 5555]`,
                    solution: py`
                        codes = [4021, 1234, 9876, 5555]
                        guess = int(input("Code? "))
                        if guess in codes:
                            print("Door", codes.index(guess) + 1, "opens!")
                        else:
                            print("Wrong code")
                    `,
                    inputs: ['9876'],
                    check: py`
                        assert "Wrong code" in run_with(["1111"]), "1111 should print Wrong code"
                        assert "Door 1 opens!" in run_with(["4021"]), "4021 is the first code: Door 1 opens!"
                        assert same_output(output, expected_output), "9876 is the third code: Door 3 opens!"
                    `,
                    hints: ['guess = int(input("Code? "))', 'Positions start at 0, so add 1: codes.index(guess) + 1'],
                },
            ],
        },
    ],
};
