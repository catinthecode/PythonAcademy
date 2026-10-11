import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch4: Chapter = {
    id: 'ch4',
    title: 'Inventory Boxes',
    emoji: '📦',
    summary: 'Store numbers and words in variables, and change them.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Labeled Chests',
            panels: [
                {
                    scene: 'cave',
                    alt: 'Max is surrounded by a messy pile of diamonds, TNT and swords.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'surprised', x: 30 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [
                        { item: 'diamond', x: 12, y: 100 },
                        { item: 'tnt', x: 46, y: 100 },
                        { item: 'pickaxe', x: 55, y: 100, scale: 0.8 },
                        { item: 'diamond', x: 60, y: 100, scale: 0.7 },
                    ],
                    bubbles: [
                        { who: 'max', text: 'I have SO much stuff. How do I keep track of it all?' },
                        { who: 'py', text: 'With variables! A variable is a chest with a label on it.' },
                    ],
                },
                {
                    scene: 'cave',
                    alt: 'Py drops 5 diamonds into a chest labelled diamonds.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    props: [
                        { item: 'chest', x: 68, y: 100, scale: 1.2 },
                        { item: 'diamond', x: 68, y: 55, scale: 0.8 },
                    ],
                    bubbles: [
                        { who: 'py', text: 'The = sign means "put this in the chest". print(diamonds) shows what is inside. No quotes!' },
                    ],
                    code: py`
                        diamonds = 5
                        print(diamonds)
                    `,
                },
                {
                    scene: 'cave',
                    alt: 'Max writes a label for a new chest while Py checks the spelling.',
                    cast: [
                        { who: 'max', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'chest', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'max', text: 'Can I call a chest anything?' },
                        { who: 'py', text: 'Almost! Small letters, no spaces. Join words with _ like gold_bars.' },
                    ],
                    code: py`
                        gold_bars = 12
                        print(gold_bars)
                    `,
                },
                {
                    scene: 'cave',
                    alt: 'Sneak giggles as print shows the word apples instead of the number in the chest.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'chest', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'sneak', text: 'Hehe! Quotes print the WORD apples!' },
                        { who: 'py', text: 'No quotes: look inside the chest. Quotes: print the word itself.' },
                    ],
                    code: py`
                        apples = 3
                        print(apples)
                        print("apples")
                    `,
                },
                {
                    scene: 'cave',
                    alt: 'Py swaps the diamonds in the chest for a new pile. The old ones are gone.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'max', pose: 'surprised', x: 75, flip: true },
                    ],
                    props: [
                        { item: 'chest', x: 50, y: 100 },
                        { item: 'diamond', x: 50, y: 55, scale: 0.7 },
                    ],
                    bubbles: [
                        { who: 'py', text: 'A chest holds ONE thing. Put in something new and the old thing is gone.' },
                        { who: 'max', text: 'So now it holds 10!' },
                    ],
                    code: py`
                        diamonds = 5
                        diamonds = 10
                        print(diamonds)
                    `,
                },
                {
                    scene: 'cave',
                    alt: 'Max adds 3 more diamonds to the chest.',
                    wide: true,
                    cast: [
                        { who: 'max', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 78, flip: true },
                    ],
                    props: [{ item: 'chest', x: 52, y: 100 }],
                    bubbles: [
                        { who: 'max', text: 'I found 3 more! How do I add them?' },
                        { who: 'py', text: 'diamonds = diamonds + 3. Python works out the right side first: 5 + 3 is 8. Then it puts 8 back in the chest.' },
                    ],
                    code: py`
                        diamonds = 5
                        diamonds = diamonds + 3
                        print(diamonds)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Chest Check',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Open the chest',
                    prompt: 'What will this code print?',
                    code: py`
                        diamonds = 5
                        print(diamonds)
                    `,
                    choices: ['diamonds', '5', '"5"'],
                    answer: '5',
                    hints: ['There are no quotes around diamonds in print, so Python looks inside the chest.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'More blocks',
                    prompt: 'What will this code print?',
                    code: py`
                        blocks = 10
                        blocks = blocks + 5
                        print(blocks)
                    `,
                    choices: ['10', '15', 'blocks + 5'],
                    answer: '15',
                    hints: ['Line 2 takes what is in the chest (10), adds 5, and puts the answer back.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Quote trap',
                    prompt: 'Careful! What will this code print?',
                    code: py`
                        apples = 3
                        print("apples")
                    `,
                    choices: ['3', 'apples', 'apples = 3'],
                    answer: 'apples',
                    hints: [
                        'Look at the quote marks inside print.',
                        'With quotes, Python prints the word itself, not what is in the chest.',
                    ],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    title: 'TNT duplicator',
                    prompt: 'A glitch made this code deploy swords instead of TNT! Change the variable inside print() so it deploys TNT.',
                    starter: py`
                        blocks = "TNT"
                        weapons = "Diamond Sword"

                        # Fix the item name inside print() below:
                        print("Deploying 64 blocks of: " + weapons)
                    `,
                    solution: py`
                        blocks = "TNT"
                        weapons = "Diamond Sword"

                        # Fix the item name inside print() below:
                        print("Deploying 64 blocks of: " + blocks)
                    `,
                    check: py`
                        assert "Diamond Sword" not in output, "Still deploying Diamond Swords! Swap the variable inside print()."
                        assert "TNT" in output, "I don't see any TNT in the output."
                    `,
                    hints: [
                        'Which chest holds "TNT"?',
                        'Change weapons to blocks on the last line.',
                    ],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: "Your turn: Apple chest",
                    prompt: "Make a variable called `apples` that holds 6, then print it.",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        apples = 6
                        print(apples)
                    `,
                    check: 'assert globals().get("apples") == 6, "Make a variable called apples that holds 6."\nassert same_output(output, expected_output), "Print the apples chest (no quotes!)."',
                    hints: ["apples = 6 puts 6 in the chest.","print(apples) shows what is inside."],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Words, Numbers and Glue',
            panels: [
                {
                    scene: 'village',
                    alt: 'Two chests side by side: one holds a name tag, the other a stack of blocks.',
                    wide: true,
                    cast: [{ who: 'py', pose: 'talk', x: 25 }],
                    props: [
                        { item: 'chest', x: 58, y: 100 },
                        { item: 'chest', x: 82, y: 100 },
                    ],
                    bubbles: [{ who: 'py', text: 'Chests can hold text too. Text needs quotes, numbers do not. Print either one the same way: no quotes around the chest name.' }],
                    code: py`
                        name = "Max"
                        blocks = 64
                        print(name)
                        print(blocks)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Sneak glues a 5 block and a 3 block together.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'Hehe! "5" + "3" makes "53"!' },
                        { who: 'py', text: 'Adding text glues it together. Adding numbers does math. Watch your quotes!' },
                    ],
                    code: py`
                        print("5" + "3")
                        print(5 + 3)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Max frowns at the words Hello and Max squashed together with no space.',
                    cast: [
                        { who: 'max', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'Why is the second one squashed?' },
                        { who: 'py', text: '+ glues with NO space. Put the space inside the quotes yourself.' },
                    ],
                    code: py`
                        name = "Max"
                        print("Hello, " + name)
                        print("Hello," + name)
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Py shows that print can show several things separated by commas.',
                    cast: [
                        { who: 'max', pose: 'think', x: 28 },
                        { who: 'py', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'max', text: 'How do I print words AND a number together?' },
                        { who: 'py', text: 'Use commas inside print. It even adds the spaces for you!' },
                    ],
                    code: py`
                        blocks = 64
                        print("I have", blocks, "blocks")
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Sneak tries to glue a word block to a number block, and they spark and crash.',
                    cast: [
                        { who: 'sneak', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'I used + with text AND a number. Crash!' },
                        { who: 'py', text: '+ cannot glue text to a number. Use commas instead!' },
                    ],
                    code: py`
                        blocks = 64
                        print("I have " + blocks + " blocks")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Shelly carries a small chest labelled size on her back.',
                    wide: true,
                    cast: [{ who: 'shelly', pose: 'happy', x: 45 }],
                    props: [{ item: 'chest', x: 70, y: 100, scale: 0.7 }],
                    bubbles: [{ who: 'shelly', text: 'Variables work with me too! Change size once and my whole square changes.' }],
                    code: py`
                        from turtle import *
                        size = 80
                        for i in range(4):
                            forward(size)
                            left(90)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Variable Builder',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    hideGoal: true,
                    title: 'Your gamer tag',
                    prompt: 'Make a variable called `name` that holds your own gamer tag (in quotes). Then print `"Hello, " + name`.',
                    starter: py`
                        name =
                        print("Hello, " + name)
                    `,
                    solution: py`
                        name = "SneakHunter99"
                        print("Hello, " + name)
                    `,
                    check: py`
                        tag = globals().get("name")
                        assert isinstance(tag, str) and tag.strip(), "Make a variable called name, with your gamer tag in quotes."
                        assert output.strip() == ("Hello, " + tag).strip(), 'Print "Hello, " + name'
                    `,
                    hints: [
                        'Text needs quotes: name = "YourTagHere"',
                        'name = "SneakHunter99"\nprint("Hello, " + name)',
                    ],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    title: 'Glue or add?',
                    prompt: 'What will this code print?',
                    code: py`
                        x = "5"
                        y = "3"
                        print(x + y)
                    `,
                    choices: ['8', '53', '5 + 3'],
                    answer: '53',
                    hints: [
                        'Are x and y numbers or text? Look for quotes.',
                        'Adding text glues it together.',
                    ],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Mixing trouble',
                    prompt: 'Python crashes when it tries to glue text and a number. Fix it so it prints `I have 64 blocks`.',
                    starter: py`
                        blocks = 64
                        print("I have " + blocks + " blocks")
                    `,
                    solution: py`
                        blocks = 64
                        print("I have", blocks, "blocks")
                    `,
                    hints: [
                        'print can show several things if you separate them with commas instead of +.',
                        'print("I have", blocks, "blocks")',
                    ],
                },
                {
                    id: 'p8',
                    type: 'fill',
                    turtle: true,
                    title: 'Just the right size',
                    prompt: "What size makes Shelly's square match the dotted goal? Try a number, run it, and adjust!",
                    template: py`
                        from turtle import *
                        size = ___
                        for i in range(4):
                            forward(size)
                            left(90)
                    `,
                    answers: ['120'],
                    hints: [
                        'If your square is too small, try a bigger number. Too big? Go smaller.',
                        'It is between 100 and 150.',
                    ],
                },
                {
                    id: 'p9',
                    type: 'write',
                    turtle: true,
                    title: 'Two chests, two squares',
                    prompt: 'Using a variable called `size`, draw a square of 50 and a square of 100 from the same corner.',
                    starter: py`
                        from turtle import *
                        size = 50
                    `,
                    solution: py`
                        from turtle import *
                        size = 50
                        for i in range(4):
                            forward(size)
                            left(90)
                        size = 100
                        for i in range(4):
                            forward(size)
                            left(90)
                    `,
                    check: 'assert "size" in source, "Use a variable called size."',
                    hints: [
                        'Write a square loop that uses forward(size).',
                        'Then change size = 100 and write the loop again.',
                    ],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: "Your turn: Gold rush",
                    prompt: "Make `gold = 10`, add 5 to it with `gold = gold + 5`, then print the 🎯 Goal line.",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        gold = 10
                        gold = gold + 5
                        print("Gold:", gold)
                    `,
                    check: 'assert globals().get("gold") == 15, "The gold chest should end up holding 15."\nassert same_output(output, expected_output), "Your print line should match the goal."',
                    hints: ["print(\"Gold:\", gold) prints the label and the number."],
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
                    title: 'Torch doubler',
                    prompt: 'What will this code print?',
                    code: py`
                        torches = 2
                        torches = torches + torches
                        print(torches)
                    `,
                    choices: ['2', '4', 'torches + torches'],
                    answer: '4',
                    hints: ['The chest holds 2, so the right side is 2 + 2.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Lost quotes',
                    prompt: 'Fix the bug so Python prints `Hi Alex`.',
                    starter: py`
                        name = Alex
                        print("Hi " + name)
                    `,
                    solution: py`
                        name = "Alex"
                        print("Hi " + name)
                    `,
                    hints: [
                        'Is Alex a chest name, or text?',
                        'Text needs quotes around it.',
                    ],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Trading post',
                    prompt: 'Max has 3 diamonds. He finds 4 more, then trades them for twice as many emeralds. Make `diamonds = 3`, add 4 with `diamonds = diamonds + 4`, make `emeralds = diamonds * 2` (* means times), then print both like the goal.',
                    starter: py`diamonds = 3`,
                    solution: py`
                        diamonds = 3
                        diamonds = diamonds + 4
                        emeralds = diamonds * 2
                        print("Diamonds:", diamonds)
                        print("Emeralds:", emeralds)
                    `,
                    check: py`
                        g = globals()
                        assert g.get("diamonds") == 7, "The diamonds chest should end up holding 7."
                        assert g.get("emeralds") == 14, "The emeralds chest should hold 14 (diamonds * 2)."
                        assert same_output(output, expected_output), "Your print lines should match the goal exactly."
                    `,
                    hints: [
                        'Do it in order: start with 3, add 4, then work out emeralds.',
                        'print("Diamonds:", diamonds) prints the label and the number.',
                        'diamonds = 3\ndiamonds = diamonds + 4\nemeralds = diamonds * 2\nprint("Diamonds:", diamonds)\nprint("Emeralds:", emeralds)',
                    ],
                },
            ],
        },
    ],
};
