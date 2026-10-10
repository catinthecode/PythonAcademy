import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch2: Chapter = {
    id: 'ch2',
    title: 'Lists',
    emoji: '📋',
    summary: 'Keep many things in one variable, find them by position, and change the list.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Lists of Things',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Bix holds up three bricks: red, blue and green.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'point', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'I have a red, a blue and a green brick. Do I need three variables?' },
                        { who: 'py', text: 'No! A list keeps many things in ONE variable, inside square brackets.' },
                    ],
                    code: py`
                        colors = ["red", "blue", "green"]
                        print(colors)
                        print(len(colors))
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Py numbers the bricks 0, 1, 2.',
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'bix', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Each item has a position called an index, and counting starts at 0!' }],
                    code: py`
                        blocks = ["oak", "stone", "glass"]
                        print(blocks[0])
                        print(blocks[2])
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Glitch reaches for a fourth brick that is not there.',
                    cast: [
                        { who: 'glitch', pose: 'surprised', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'Give me brick number 3!' },
                        { who: 'py', text: '3 blocks means positions 0 to 2. But [-1] always gets the LAST one.' },
                    ],
                    code: py`
                        blocks = ["oak", "stone", "glass"]
                        print(blocks[-1])
                        print(blocks[3])
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix holds a profile card listing his name, level and a checkmark.',
                    cast: [
                        { who: 'bix', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'Can one list hold words AND numbers?' },
                        { who: 'py', text: 'Yes! Text, numbers, even True. Each keeps its own index.' },
                    ],
                    code: py`
                        profile = ["Bix", 10, True]
                        print(profile[0])
                        print(profile[1] + 5)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Glitch points at the wrong block, counting from 1 instead of 0.',
                    cast: [
                        { who: 'glitch', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'I want the first block, so blocks[1]!' },
                        { who: 'py', text: 'Index 1 is the SECOND block. The first is [0].' },
                    ],
                    code: py`
                        blocks = ["oak", "stone", "glass"]
                        print(blocks[1])
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Py lines up blocks with index numbers under them. Bix counts along.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'bix', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Square brackets make a list. [0] is the first item, [-1] is the last, and len() counts them all.' },
                        { who: 'bix', text: 'So the last index is always len minus 1!' },
                    ],
                    code: py`
                        blocks = ["oak", "stone", "glass", "brick"]
                        print(len(blocks))
                        print(blocks[len(blocks) - 1])
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Find by Position',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Second brick',
                    prompt: 'What will this code print?',
                    code: py`
                        colors = ["red", "blue", "green"]
                        print(colors[1])
                    `,
                    choices: ['red', 'blue', 'green'],
                    answer: 'blue',
                    hints: ['Index 0 is red. So index 1 is...'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'How many?',
                    prompt: 'What will this code print?',
                    code: py`print(len(["red", "blue", "green"]))`,
                    choices: ['2', '3', '4'],
                    answer: '3',
                    hints: ['len counts the items.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    about: 'error',
                    title: 'Too far',
                    prompt: 'What happens when Python runs this?',
                    code: py`
                        colors = ["red", "blue", "green"]
                        print(colors[3])
                    `,
                    choices: ['IndexError', 'NameError', 'No error'],
                    answer: 'IndexError',
                    hints: ['3 items have positions 0, 1, 2.'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'From the end',
                    prompt: 'What will this code print?',
                    code: py`
                        colors = ["red", "blue", "green"]
                        print(colors[-1])
                    `,
                    choices: ['red', 'green', 'IndexError'],
                    answer: 'green',
                    hints: ['-1 means "the last one".'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: First and last',
                    prompt: 'Make `bricks = ["red", "blue", "green", "yellow"]`, then print the first brick and the last brick.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        bricks = ["red", "blue", "green", "yellow"]
                        print(bricks[0])
                        print(bricks[-1])
                    `,
                    check: py`
                        assert "[0]" in source, "Use bricks[0] for the first one."
                        assert same_output(output, expected_output), "First red, then yellow."
                    `,
                    hints: ['bricks[0] is the first. bricks[-1] (or bricks[3]) is the last.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Changing Lists',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Bix adds a yellow brick to the end of the row.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'I found a new brick! Where does it go?' },
                        { who: 'py', text: '.append() adds an item to the END of the list. The list grows by one.' },
                    ],
                    code: py`
                        colors = ["red", "blue"]
                        colors.append("yellow")
                        print(colors)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix swaps the blue brick for a purple one.',
                    cast: [{ who: 'bix', pose: 'point', x: 40 }],
                    bubbles: [{ who: 'bix', text: 'To change one item, put a new value at its position.' }],
                    code: py`
                        blocks = ["oak", "stone", "glass"]
                        blocks[2] = "gold"
                        print(blocks)
                    `,
                },
                {
                    scene: 'circuit',
                    alt: 'A machine stamps out square numbers onto a growing list.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'bix', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Append inside a loop to build a list fast.' },
                        { who: 'bix', text: '1, 4, 9, 16. A list of squares!' },
                    ],
                    code: py`
                        squares = []
                        for i in range(1, 5):
                            squares.append(i * i)
                        print(squares)
                    `,
                },
                {
                    scene: 'circuit',
                    alt: 'Glitch stares at the word None where its list used to be.',
                    cast: [
                        { who: 'glitch', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'My list turned into None!' },
                        { who: 'py', text: 'append changes the list itself. Never write list = list.append(...).' },
                    ],
                    code: py`
                        colors = ["red"]
                        colors = colors.append("pink")
                        print(colors)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Bix adds 5 bonus points to the first score on a board.',
                    cast: [
                        { who: 'bix', pose: 'point', x: 25 },
                        { who: 'py', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'Can I add bonus points to one score?' },
                        { who: 'py', text: 'Sure: scores[0] += 5 changes just that item.' },
                    ],
                    code: py`
                        scores = [10, 20]
                        scores[0] += 5
                        print(scores)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py shows a list of scores on a scoreboard.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'glitch', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Lists can start empty: [ ]. Append as you go, change items by index, and len() tells you the size.' },
                        { who: 'glitch', text: 'An empty list I can fill? Ooh!' },
                    ],
                    code: py`
                        scores = []
                        scores.append(5)
                        scores.append(9)
                        print(scores, len(scores))
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Grow and Change',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'New pet',
                    prompt: 'What will this code print?',
                    code: py`
                        pets = ["cat"]
                        pets.append("dog")
                        print(pets)
                    `,
                    choices: ["['cat', 'dog']", "['dog', 'cat']", "['cat']"],
                    answer: "['cat', 'dog']",
                    hints: ['append adds to the END.'],
                },
                {
                    id: 'p6',
                    type: 'fix',
                    title: 'Wrong brick',
                    prompt: 'This should change BLUE to purple, but it changes red! Fix the index.',
                    starter: py`
                        colors = ["red", "blue", "green"]
                        colors[0] = "purple"
                        print(colors)
                    `,
                    solution: py`
                        colors = ["red", "blue", "green"]
                        colors[1] = "purple"
                        print(colors)
                    `,
                    hints: ['Blue is the second item. What index is that?'],
                },
                {
                    id: 'p7',
                    type: 'trace',
                    title: 'Growing list',
                    prompt: 'Fill in `items` each time line 3 finishes.',
                    code: py`
                        items = []
                        for i in range(3):
                            items.append(i * 10)
                    `,
                    line: 3,
                    columns: ['items'],
                    rows: [['[0]'], ['[0, 10]'], ['[0, 10, 20]']],
                    hints: ['i is 0, 1, 2, so the new items are 0, 10, 20.', 'Write the list the way Python prints it: [0, 10]'],
                },
                {
                    id: 'p8',
                    type: 'fill',
                    title: 'Add a score',
                    prompt: 'Fill in the method that adds 7 to the end of the list.',
                    template: py`
                        scores = [5, 9, 3]
                        scores.___(7)
                        print(scores)
                    `,
                    answers: ['append'],
                    hints: ['It starts with "app".'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Build a team',
                    prompt: 'Start with an empty list `team = []`. Append "Bix", "Glitch" and "Bolt". Then print how many are on the team, and the team.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        team = []
                        team.append("Bix")
                        team.append("Glitch")
                        team.append("Bolt")
                        print(len(team))
                        print(team)
                    `,
                    check: py`
                        assert "append" in source, "Use append to add each member."
                        assert same_output(output, expected_output), "Match the goal: the count, then the list."
                    `,
                    hints: ['team = []', 'team.append("Bix") and so on.'],
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
                    title: 'Add two',
                    prompt: 'What will this code print?',
                    code: py`
                        nums = [4, 8, 15]
                        print(nums[0] + nums[2])
                    `,
                    choices: ['12', '19', '23'],
                    answer: '19',
                    hints: ['nums[0] is 4 and nums[2] is 15.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Last one',
                    prompt: 'This crashes. Fix it so it prints the LAST colour.',
                    starter: py`
                        colors = ["red", "blue", "green"]
                        print(colors[3])
                    `,
                    solution: py`
                        colors = ["red", "blue", "green"]
                        print(colors[-1])
                    `,
                    hints: ['The last of 3 items is index 2, or use -1.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Inventory',
                    prompt: 'Make `inventory = ["sword", "shield"]`. Append "potion". Change the FIRST item to "magic sword". Then print the 🎯 Goal.',
                    starter: py`inventory = ["sword", "shield"]`,
                    solution: py`
                        inventory = ["sword", "shield"]
                        inventory.append("potion")
                        inventory[0] = "magic sword"
                        print(inventory)
                        print("Items:", len(inventory))
                    `,
                    check: py`
                        assert "append" in source and "[0]" in source, "Use append and inventory[0] = ..."
                        assert same_output(output, expected_output), "Match both goal lines."
                    `,
                    hints: ['inventory.append("potion")', 'inventory[0] = "magic sword"', 'print("Items:", len(inventory))'],
                },
            ],
        },
    ],
};
