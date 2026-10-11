import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch1: Chapter = {
    id: 'ch1',
    title: 'Hello, Max!',
    emoji: '💬',
    summary: 'Make Python talk with print, and learn why quotes matter.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Meet Py',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Max finds a glowing magic block in a meadow. Py the snake pops out of it.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'wave', x: 30, y: 75 },
                        { who: 'max', pose: 'surprised', x: 72, flip: true },
                    ],
                    props: [{ item: 'commandBlock', x: 30, y: 100, scale: 1.3 }],
                    bubbles: [
                        { who: 'py', text: "Hi Max! I'm Py. I live inside this magic block, and I speak Python!" },
                        { who: 'max', text: 'Python? Can it help me build stuff?' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py points at a big floating screen.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [
                        { who: 'py', text: 'Computers do EXACTLY what you tell them. To make Python say something, use print.' },
                    ],
                    code: py`print("Hello, Max!")`,
                },
                {
                    scene: 'screen',
                    alt: 'Max looks closely at a print line on the screen while Py names each part.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'max', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Every print has 3 parts: print, round brackets ( ), and text in quotes.' },
                        { who: 'max', text: 'The brackets hug the quotes, and the quotes hug the words!' },
                    ],
                    code: py`print("Let's build!")`,
                },
                {
                    scene: 'meadow',
                    alt: 'Max scratches his head at two giant floating quote marks.',
                    cast: [
                        { who: 'max', pose: 'think', x: 30 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'quote', x: 52, y: 45 }],
                    bubbles: [
                        { who: 'max', text: 'Why the quote marks?' },
                        { who: 'py', text: 'Quotes mean TEXT. Python shows what is inside them exactly as you typed it.' },
                    ],
                    code: py`print("I love diamonds!")`,
                },
                {
                    scene: 'screen',
                    alt: 'Max gasps at a screen showing his message with odd capitals and extra spaces, copied exactly.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'max', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Python never fixes your text. It copies every letter, capital and space exactly.' },
                        { who: 'max', text: 'Even my typos? Yikes!' },
                    ],
                    code: py`print("hELLO    max!!")`,
                },
                {
                    scene: 'village',
                    alt: 'Py slithers past three signs in a row, reading them top to bottom.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 18 },
                        { who: 'max', pose: 'happy', x: 86, flip: true },
                    ],
                    props: [
                        { item: 'sign', x: 42, y: 100 },
                        { item: 'sign', x: 57, y: 100 },
                        { item: 'sign', x: 72, y: 100 },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Every print starts a new line. Python reads your code from top to bottom, one line at a time.' },
                        { who: 'max', text: "It's like a to-do list!" },
                    ],
                    code: py`
                        print("Dig")
                        print("Build")
                        print("Sleep")
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Print Practice',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'What does Python say?',
                    prompt: 'What will this code print?',
                    code: py`print("Hello, Max!")`,
                    choices: ['Hello, Max!', '"Hello, Max!"', 'print Hello, Max!'],
                    answer: 'Hello, Max!',
                    hints: [
                        'print shows what is inside the quotes.',
                        'The quote marks tell Python where the text starts and stops. They are not printed.',
                    ],
                },
                {
                    id: 'p2',
                    type: 'write',
                    title: 'Diamond fan',
                    prompt: 'Make Python print exactly: `I love diamonds!`',
                    starter: py`# Type your print line below`,
                    solution: py`print("I love diamonds!")`,
                    hints: [
                        'Use print( ) with the words inside quote marks.',
                        'Capital letters and the ! count. Copy it exactly.',
                        'print("I love diamonds!")',
                    ],
                },
                {
                    id: 'p3',
                    type: 'fix',
                    title: 'Missing piece',
                    prompt: 'Something is missing from this line. Fix it so Python prints `Mine some blocks`.',
                    starter: py`print("Mine some blocks)`,
                    solution: py`print("Mine some blocks")`,
                    hints: [
                        'Text needs a quote mark at the start AND at the end.',
                        'Add a " right before the closing bracket.',
                    ],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Top to bottom',
                    prompt: 'What will this code print?',
                    code: py`
                        print("Dig")
                        print("Build")
                    `,
                    choices: ['Dig\nBuild', 'Build\nDig', 'Dig Build'],
                    answer: 'Dig\nBuild',
                    hints: [
                        'Python reads from the top line down.',
                        'Each print starts a new line.',
                    ],
                },
                {
                    id: 'p5',
                    type: 'parsons',
                    title: "Max's morning",
                    prompt: 'Put the lines in order so Max wakes up, eats bread, then goes mining.',
                    lines: [
                        'print("Wake up")',
                        'print("Eat bread")',
                        'print("Go mining")',
                    ],
                    hints: [
                        'What does Max do first when the day starts?',
                        'The line that runs first goes at the top.',
                    ],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: "Your turn: Two lines",
                    prompt: "Make Python print the two lines in the 🎯 Goal box. Type every line yourself!",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        print("Hello, Py!")
                        print("I can code!")
                    `,
                    hints: ["One print( ) for each line.","print(\"Hello, Py!\")\nprint(\"I can code!\")"],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'The Quote Thief',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Sneak sneaks away carrying a giant quote mark.',
                    wide: true,
                    cast: [{ who: 'sneak', pose: 'happy', x: 60 }],
                    props: [{ item: 'quote', x: 75, y: 50 }],
                    bubbles: [{ who: 'sneak', text: "Sssss... I'll steal a quote mark!" }],
                    caption: 'Uh oh. Press Run and see what Python says now.',
                    code: py`print("Boom)`,
                },
                {
                    scene: 'meadow',
                    alt: 'Py and Pip the parrot look at a red error message through a magnifying glass, like detectives.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'pip', pose: 'think', x: 72, flip: true },
                    ],
                    props: [{ item: 'magnifier', x: 50, y: 70 }],
                    bubbles: [
                        { who: 'py', text: 'Confused Python shows an error. Errors are clues, not failures!' },
                        { who: 'pip', text: 'Squawk! I\'m Pip. SyntaxError... what is the clue?' },
                    ],
                },
                {
                    scene: 'meadow',
                    alt: 'Pip puts the giant quote mark back at the end of the line, and Py cheers.',
                    cast: [
                        { who: 'pip', pose: 'happy', x: 28 },
                        { who: 'py', pose: 'happy', x: 74, flip: true },
                    ],
                    props: [{ item: 'quote', x: 50, y: 45 }],
                    bubbles: [
                        { who: 'pip', text: 'The quote at the end is missing!' },
                        { who: 'py', text: 'Yes! Quotes come in pairs. So do brackets: every ( needs a ).' },
                    ],
                    code: py`print("Boom")`,
                },
                {
                    scene: 'screen',
                    alt: 'Py holds up two signs: one says print, the other says Print with a big X.',
                    cast: [
                        { who: 'py', pose: 'point', x: 30 },
                        { who: 'pip', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Capitals matter! Python knows print, but has never heard of Print.' },
                        { who: 'pip', text: 'One big letter breaks it?' },
                    ],
                    code: py`Print("Hi")`,
                },
                {
                    scene: 'village',
                    alt: 'Pip counts on its wing feathers while Py shows numbers floating with and without quotes.',
                    cast: [
                        { who: 'pip', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Without quotes, Python does math with numbers. With quotes, it just shows the text.' },
                    ],
                    code: py`
                        print(5 + 3)
                        print("5 + 3")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Py counts off three rules on a sign while Pip and Sneak listen. Sneak looks grumpy.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'pip', pose: 'happy', x: 58 },
                        { who: 'sneak', pose: 'sad', x: 85, flip: true },
                    ],
                    props: [{ item: 'sign', x: 38, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Remember: print is all small letters, quotes and brackets come in pairs, and only numbers without quotes do math.' },
                        { who: 'pip', text: "Let's solve some puzzles!" },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Text and Numbers',
            problems: [
                {
                    id: 'p6',
                    type: 'fix',
                    title: 'Big letter trouble',
                    prompt: 'This code crashes. Fix it so Python prints `Craft a pickaxe`.',
                    starter: py`Print("Craft a pickaxe")`,
                    solution: py`print("Craft a pickaxe")`,
                    hints: [
                        'Python cares about capital letters. Print and print are different words to Python!',
                        'Change Print to print.',
                    ],
                },
                {
                    id: 'p7',
                    type: 'predict',
                    title: 'Math or text? (part 1)',
                    prompt: 'What will this code print?',
                    code: py`print("5 + 3")`,
                    choices: ['8', '5 + 3', '53'],
                    answer: '5 + 3',
                    hints: [
                        'Look at the quote marks.',
                        'Anything inside quotes is text, so Python prints it exactly as written.',
                    ],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Math or text? (part 2)',
                    prompt: 'No quotes this time! What will this code print?',
                    code: py`print(5 + 3)`,
                    choices: ['8', '5 + 3', '53'],
                    answer: '8',
                    hints: [
                        'Without quotes, Python treats 5 and 3 as numbers.',
                        'Numbers can be added up.',
                    ],
                },
                {
                    id: 'p9',
                    type: 'fill',
                    title: 'Say hi to Alex',
                    prompt: 'Fill in the missing word so Python says `Hello, Alex!`',
                    template: py`___("Hello, Alex!")`,
                    answers: ['print'],
                    hints: [
                        'Which word makes Python show text?',
                        'It starts with p and has 5 letters.',
                    ],
                },
                {
                    id: 'p10',
                    type: 'write',
                    title: 'Tower builder',
                    prompt: 'Build a tower! Make Python print the goal picture: three `[#]` blocks stacked up.',
                    starter: py`# One print for each block`,
                    solution: py`
                        print("[#]")
                        print("[#]")
                        print("[#]")
                    `,
                    hints: [
                        'Each print makes one line, so you need 3 prints.',
                        'print("[#]") makes one block.',
                        'print("[#]")\nprint("[#]")\nprint("[#]")',
                    ],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: "Your turn: Text and math",
                    prompt: "Print the 🎯 Goal: first the words `10 + 5`, then the answer to 10 + 5.",
                    starter: py`
                        # Your turn! Write it all yourself.
                    `,
                    solution: py`
                        print("10 + 5")
                        print(10 + 5)
                    `,
                    hints: ["Quotes for the first line, no quotes for the second."],
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
                    type: 'fix',
                    title: 'Broken bracket',
                    prompt: 'Fix this line so Python prints `Build a house`.',
                    starter: py`print("Build a house"`,
                    solution: py`print("Build a house")`,
                    hints: [
                        'Every ( needs a partner ).',
                        'Add ) at the very end.',
                    ],
                },
                {
                    id: 't2',
                    type: 'predict',
                    title: 'Quick math',
                    prompt: 'What will this code print?',
                    code: py`print(2 + 2)`,
                    choices: ['4', '2 + 2', '22'],
                    answer: '4',
                    hints: ['No quotes means numbers, and numbers do math.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Forge a diamond sword',
                    prompt: 'Make Python print this sword exactly, spaces and all. Each blue box in the 🎯 Goal is one space. You need 5 print lines!',
                    starter: py`# Look carefully at the spaces at the start of each line`,
                    solution: py`
                        print("  []")
                        print("  []")
                        print("  []")
                        print(" ====")
                        print("  ||")
                    `,
                    hints: [
                        'Spaces inside the quotes count! The blade has 2 spaces before [].',
                        'The handle guard ==== has 1 space before it.',
                        'print("  []")\nprint("  []")\nprint("  []")\nprint(" ====")\nprint("  ||")',
                    ],
                },
            ],
        },
    ],
};
