import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch2: Chapter = {
    id: 'ch2',
    title: 'Text Tricks',
    emoji: '🔤',
    summary: 'Glue text together, count letters, and drop variables into f-strings.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Words in Boxes',
            panels: [
                {
                    scene: 'meadow',
                    alt: 'Rae cheers Fizz on before a battle.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'point', x: 28 },
                        { who: 'fizz', pose: 'happy', x: 70, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Go, Fizz! Hey Py, how do I put Fizz\'s name into a sentence?' },
                        { who: 'fizz', text: 'Fizz fizz!' },
                    ],
                    code: py`
                        name = "Fizz"
                        print("Go, " + name + "!")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Py counts the letters of a name on its tail.',
                    cast: [
                        { who: 'py', pose: 'point', x: 30 },
                        { who: 'fizz', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'len() counts the letters (and spaces!) in a piece of text.' }],
                    code: py`
                        print(len("Fizz"))
                        print(len("Blazewing"))
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Py shows a sentence with blanks where variables go.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'rae', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Gluing with + gets messy. Put f before the quotes and drop variables right in with { }!' },
                    ],
                    code: py`
                        name = "Fizz"
                        hp = 40
                        print(f"{name} has {hp} HP")
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Rae counts the letters of Hi Fizz on her fingers and forgets the space.',
                    cast: [
                        { who: 'rae', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'len("Hi Fizz") is 7? I only count 6 letters!' },
                        { who: 'py', text: 'The space counts too. Every character counts!' },
                    ],
                    code: py`print(len("Hi Fizz"))`,
                },
                {
                    scene: 'meadow',
                    alt: 'Rae frowns at curly brackets printed on the screen.',
                    cast: [
                        { who: 'rae', pose: 'sad', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'My sentence printed {name} instead of Fizz!' },
                        { who: 'py', text: 'You forgot the f. Without it, { } is just text.' },
                    ],
                    code: py`
                        name = "Fizz"
                        print("Go {name}!")
                        print(f"Go {name}!")
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Py shows three ways to build text while Rae and Fizz watch.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'rae', pose: 'happy', x: 55 },
                        { who: 'fizz', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Three text tools: + glues pieces, len() counts characters, and f-strings drop values in with { }.' },
                        { who: 'rae', text: 'And f-strings work with numbers, so no more crashes!' },
                    ],
                    code: py`
                        level = 7
                        print(f"Fizz is level {level}!")
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Glue and Count',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Cheer',
                    prompt: 'What will this code print?',
                    code: py`
                        name = "Fizz"
                        print("Go, " + name + "!")
                    `,
                    choices: ['Go, Fizz!', 'Go, name!', 'Go,Fizz!'],
                    answer: 'Go, Fizz!',
                    hints: ['name has no quotes in print, so Python uses what is inside it.', 'Look closely at the space after the comma in "Go, ".'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Long name',
                    prompt: 'What will this code print?',
                    code: py`print(len("Blazewing"))`,
                    choices: ['8', '9', '10'],
                    answer: '9',
                    hints: ['Count the letters: B-l-a-z-e-w-i-n-g.'],
                },
                {
                    id: 'p3',
                    type: 'fix',
                    title: 'Mixing again',
                    prompt: 'Python can\'t glue text and a number with +. Fix it so it prints the 🎯 Goal. (Try an f-string!)',
                    starter: py`
                        hp = 25
                        print("HP: " + hp)
                    `,
                    solution: py`
                        hp = 25
                        print(f"HP: {hp}")
                    `,
                    hints: ['print(f"HP: {hp}")', 'str(hp) also turns the number into text.'],
                },
                {
                    id: 'p4',
                    type: 'fill',
                    title: 'Say hi',
                    prompt: 'Fill in the gap so the f-string greets Rae.',
                    template: py`
                        name = "Rae"
                        print(f"Hi, {___}!")
                    `,
                    answers: ['name'],
                    hints: ['Which variable holds "Rae"?'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Status line',
                    prompt: 'Make `critter = "Fizz"` and `hp = 40`, then use an f-string to print the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        critter = "Fizz"
                        hp = 40
                        print(f"{critter} has {hp} HP")
                    `,
                    check: py`
                        g = globals()
                        assert g.get("critter") == "Fizz" and g.get("hp") == 40, "Make critter = \"Fizz\" and hp = 40."
                        assert 'f"' in source or "f'" in source, "Use an f-string: f\"...\""
                        assert same_output(output, expected_output), "Match the goal line."
                    `,
                    hints: ['print(f"{critter} has {hp} HP")'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Text Superpowers',
            panels: [
                {
                    scene: 'arena',
                    alt: 'Rae shouts Fizz\'s name in big capital letters.',
                    wide: true,
                    cast: [
                        { who: 'rae', pose: 'surprised', x: 30 },
                        { who: 'fizz', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: '.upper() makes text SHOUT. .lower() makes it whisper.' },
                        { who: 'fizz', text: 'FIZZ! ...fizz.' },
                    ],
                    code: py`
                        name = "Fizz"
                        print(name.upper())
                        print(name.lower())
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Fizz zaps three times in a row.',
                    cast: [{ who: 'fizz', pose: 'surprised', x: 40 }],
                    bubbles: [{ who: 'fizz', text: 'Text times a number repeats it. Zap zap zap!' }],
                    code: py`print("Zap! " * 3)`,
                },
                {
                    scene: 'arena',
                    alt: 'Py points at the dot between a variable and upper.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'rae', pose: 'think', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'The dot means "do this to that text". team.upper() shouts team.' },
                        { who: 'rae', text: 'Like giving the text an order!' },
                    ],
                    code: py`
                        team = "red team"
                        print(team.upper())
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Sneak giggles at a strange message on the screen instead of a shout.',
                    cast: [
                        { who: 'sneak', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'sneak', text: 'I took away the ( ). What a weird message!' },
                        { who: 'py', text: 'Without ( ), upper never runs. Methods need brackets!' },
                    ],
                    code: py`
                        name = "Fizz"
                        print(name.upper)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Rae draws a border of equals signs above and below the word ARENA.',
                    cast: [
                        { who: 'rae', pose: 'happy', x: 25 },
                        { who: 'fizz', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'rae', text: 'Repeating makes borders! "=" * 12 is a line.' },
                        { who: 'fizz', text: 'Fancy! Fizz likes it!' },
                    ],
                    code: py`
                        print("=" * 12)
                        print("ARENA")
                        print("=" * 12)
                    `,
                },
                {
                    scene: 'arena',
                    alt: 'Py builds a name tag out of stars.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'blaze', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Mix the tricks: "*" * len(name) makes a line of stars exactly as long as the name!' },
                        { who: 'blaze', text: 'A name tag that fits me perfectly!' },
                    ],
                    code: py`
                        name = "Blazewing"
                        print("*" * len(name))
                        print(name)
                        print("*" * len(name))
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Text Magic',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'Laugh track',
                    prompt: 'What will this code print?',
                    code: py`print("ha" * 3)`,
                    choices: ['ha ha ha', 'hahaha', 'ha3'],
                    answer: 'hahaha',
                    hints: ['Repeating text doesn\'t add spaces.'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    title: 'Shout!',
                    prompt: 'What will this code print?',
                    code: py`print("Fizz".upper())`,
                    choices: ['fizz', 'FIZZ', 'Fizz'],
                    answer: 'FIZZ',
                    hints: ['upper means capital letters.'],
                },
                {
                    id: 'p7',
                    type: 'predict',
                    title: 'Star line',
                    prompt: 'What will this code print?',
                    code: py`print("*" * len("Fizz"))`,
                    choices: ['****', '*Fizz*', '*'],
                    answer: '****',
                    hints: ['len("Fizz") is 4. Then "*" * 4.'],
                },
                {
                    id: 'p8',
                    type: 'write',
                    title: 'Level-up shout',
                    prompt: 'Make `shout = "level up"`, then print it in capitals followed by `!!!`, like the 🎯 Goal.',
                    starter: py`shout = "level up"`,
                    solution: py`
                        shout = "level up"
                        print(shout.upper() + "!!!")
                    `,
                    check: py`
                        assert ".upper()" in source, "Use .upper() to make the capitals."
                        assert same_output(output, expected_output), "Match the goal line."
                    `,
                    hints: ['shout.upper() gives LEVEL UP. Then glue on "!!!" with +.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Name tag',
                    prompt: 'Make `name = "Blaze"` and print a name tag like the 🎯 Goal. Use `len(name)` so the stars always fit the name!',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        name = "Blaze"
                        print("*" * len(name))
                        print(name)
                        print("*" * len(name))
                    `,
                    check: py`
                        assert "len(name)" in source, "Use len(name) to make the stars the right length."
                        assert same_output(output, expected_output), "Match the goal: stars, name, stars."
                    `,
                    hints: ['"*" * len(name) makes a line of stars.', 'print("*" * len(name))\nprint(name)\nprint("*" * len(name))'],
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
                    title: 'Math in braces',
                    prompt: 'What will this code print?',
                    code: py`print(f"{2 + 3} critters")`,
                    choices: ['2 + 3 critters', '5 critters', '{2 + 3} critters'],
                    answer: '5 critters',
                    hints: ['Python works out what is inside { } first.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Capital mistake',
                    prompt: 'This crashes. Fix it so it prints `Go Fizz!`',
                    starter: py`
                        name = "Fizz"
                        print(f"Go {Name}!")
                    `,
                    solution: py`
                        name = "Fizz"
                        print(f"Go {name}!")
                    `,
                    hints: ['Variable names care about capital letters too.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Battle banner',
                    prompt: 'Make `critter = "Blazewing"` and `level = 12`. Print the 🎯 Goal banner using `.upper()`, `len()` and an f-string.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        critter = "Blazewing"
                        level = 12
                        print(f"=== {critter.upper()} ===")
                        print(f"Level {level} | {len(critter)} letters")
                    `,
                    check: py`
                        assert ".upper()" in source and "len(" in source, "Use .upper() and len()."
                        assert same_output(output, expected_output), "Match both goal lines exactly."
                    `,
                    hints: [
                        'Line 1: f"=== {critter.upper()} ==="',
                        'Line 2: f"Level {level} | {len(critter)} letters"',
                    ],
                },
            ],
        },
    ],
};
