import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch6: Chapter = {
    id: 'ch6',
    title: 'Letters',
    emoji: '🔡',
    summary: 'Text is a sequence of letters: loop over it, count, search and build new words.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Text Is a List of Letters',
            panels: [
                {
                    scene: 'sky',
                    alt: 'The letters of PLANK float above the platforms, each with a number.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'bix', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Text works a lot like a list: each letter has a position, starting at 0.' },
                        { who: 'bix', text: 'So word[0] is the first letter!' },
                    ],
                    code: py`
                        word = "PLANK"
                        print(word[0], word[-1], len(word))
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix walks along the letters one at a time.',
                    cast: [{ who: 'bix', pose: 'talk', x: 35 }],
                    bubbles: [{ who: 'bix', text: 'A for loop walks through the letters, one by one!' }],
                    code: py`
                        for letter in "park":
                            print(letter)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Py counts vowels with tally marks.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'glitch', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Use the count pattern with in to count vowels.' }],
                    code: py`
                        count = 0
                        for letter in "brick park":
                            if letter in "aeiou":
                                count += 1
                        print("Vowels:", count)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Each letter of SKY sits on a numbered platform.',
                    cast: [
                        { who: 'bix', pose: 'think', x: 25 },
                        { who: 'py', pose: 'point', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'Can I get each letter AND its position?' },
                        { who: 'py', text: 'Loop over range(len(word)), then use word[i].' },
                    ],
                    code: py`
                        word = "sky"
                        for i in range(len(word)):
                            print(i, word[i])
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Glitch reaches for a sixth letter that is not there.',
                    cast: [
                        { who: 'glitch', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'PLANK has 5 letters, so word[5] is K!' },
                        { who: 'py', text: 'Positions go 0 to 4. The last is [4], or [-1].' },
                    ],
                    code: py`
                        word = "PLANK"
                        print(word[5])
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Py spells Hi! on floating blocks, punctuation and all.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'bix', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Text is like a list of letters: positions start at 0, len() counts them, and for walks through them.' },
                        { who: 'bix', text: 'Even the ! counts as a letter!' },
                    ],
                    code: py`
                        for ch in "Hi!":
                            print(ch)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Letter by Letter',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'First and last',
                    prompt: 'What will this code print?',
                    code: py`
                        word = "BRICK"
                        print(word[0], word[-1])
                    `,
                    choices: ['B K', 'B C', 'R K'],
                    answer: 'B K',
                    hints: ['[0] is the first letter, [-1] the last.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Spell it out',
                    prompt: 'What will this code print?',
                    code: py`
                        for ch in "hey":
                            print(ch)
                    `,
                    choices: ['h\ne\ny', 'hey', 'h e y'],
                    answer: 'h\ne\ny',
                    hints: ['Each letter gets its own print.'],
                },
                {
                    id: 'p3',
                    type: 'trace',
                    title: 'Vowel hunt',
                    prompt: 'Line 4 only runs for vowels. Fill in `ch` and `count` each time line 4 finishes.',
                    code: py`
                        count = 0
                        for ch in "parks":
                            if ch in "aeiou":
                                count += 1
                    `,
                    line: 4,
                    columns: ['ch', 'count'],
                    rows: [['a', '1']],
                    hints: ['Which letters of "parks" are vowels?'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Bananas',
                    prompt: 'What will this code print?',
                    code: py`print("banana".count("a"))`,
                    choices: ['2', '3', '6'],
                    answer: '3',
                    hints: ['b-a-n-a-n-a'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Spell a name',
                    prompt: 'Use a for loop to print each letter of `"Bix"` on its own line.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        for letter in "Bix":
                            print(letter)
                    `,
                    check: py`
                        assert "for" in source, "Use a for loop over the letters."
                        assert same_output(output, expected_output), "B, then i, then x."
                    `,
                    hints: ['for letter in "Bix":'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Building New Text',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Glitch tries to swap a letter in place and the program refuses.',
                    wide: true,
                    cast: [
                        { who: 'glitch', pose: 'sad', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'I want to change the first letter of "mat" to h!' },
                        { who: 'py', text: 'You can\'t change text in place. Build a NEW piece of text: "h" plus everything after the first letter.' },
                    ],
                    code: py`
                        word = "mat"
                        new = "h" + word[1:]
                        print(new)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix builds a word backwards, letter by letter.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'point', x: 25 },
                        { who: 'py', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Build text in a loop! Putting each letter at the FRONT reverses the word.' }],
                    code: py`
                        word = "stone"
                        backwards = ""
                        for letter in word:
                            backwards = letter + backwards
                        print(backwards)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py shows handy text tools on the screen.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'Handy tools: .replace(), .count(), and slices like word[0:3] for the first 3 letters.' }],
                    code: py`
                        word = "sunny"
                        print(word.replace("n", "m"))
                        print(word[0:3])
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix squashes a spaced-out word back together.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'bix', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Add an if to skip letters you don\'t want.' },
                        { who: 'bix', text: 'No more spaces!' },
                    ],
                    code: py`
                        msg = "b r i c k"
                        squashed = ""
                        for ch in msg:
                            if ch != " ":
                                squashed += ch
                        print(squashed)
                    `,
                },
                {
                    scene: 'circuit',
                    alt: 'Glitch forgot to make an empty box before the loop, and the screen flashes red.',
                    cast: [
                        { who: 'glitch', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'NameError?! I was building result!' },
                        { who: 'py', text: 'Start with result = "" before the loop.' },
                    ],
                    code: py`
                        for letter in "abc":
                            result = letter + result
                        print(result)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Py and Bix craft a new word from letter blocks.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'bix', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Text never changes in place. Build new text with +, slices and loops.' },
                        { who: 'bix', text: 'Like crafting a new item from parts!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Word Workshop',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Backwards',
                    prompt: 'Make `word = "brick"` and use a loop to build and print it backwards.',
                    starter: py`word = "brick"`,
                    solution: py`
                        word = "brick"
                        backwards = ""
                        for letter in word:
                            backwards = letter + backwards
                        print(backwards)
                    `,
                    check: py`
                        assert "for" in source and "[::-1]" not in source, "Build it with a loop."
                        assert same_output(output, expected_output), "brick backwards is kcirb."
                    `,
                    hints: ['Start with backwards = ""', 'Inside the loop: backwards = letter + backwards'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    title: 'Capital G',
                    prompt: 'What will this code print?',
                    code: py`print("glitch".replace("g", "G"))`,
                    choices: ['Glitch', 'GLITCH', 'glitch'],
                    answer: 'Glitch',
                    hints: ['Only the g changes.'],
                },
                {
                    id: 'p7',
                    type: 'predict',
                    title: 'Slice',
                    prompt: 'What will this code print?',
                    code: py`print("park"[0:2])`,
                    choices: ['pa', 'par', 'ark'],
                    answer: 'pa',
                    hints: ['[0:2] means from position 0 up to (not including) 2.'],
                },
                {
                    id: 'p8',
                    type: 'fix',
                    title: 'Cat to bat',
                    prompt: 'This crashes because text can\'t be changed in place. Fix it to build a new word and print `bat`.',
                    starter: py`
                        word = "cat"
                        word[0] = "b"
                        print(word)
                    `,
                    solution: py`
                        word = "cat"
                        word = "b" + word[1:]
                        print(word)
                    `,
                    hints: ['word[1:] is everything after the first letter.', 'word = "b" + word[1:]'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Vowel counter',
                    prompt: 'Count the vowels in `"hello world"` with a loop and print `Vowels:` and the count.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        count = 0
                        for letter in "hello world":
                            if letter in "aeiou":
                                count += 1
                        print("Vowels:", count)
                    `,
                    check: py`
                        assert "for" in source, "Use a loop."
                        assert same_output(output, expected_output), "hello world has 3 vowels."
                    `,
                    hints: ['if letter in "aeiou": count += 1'],
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
                    title: 'Spaces count',
                    prompt: 'What will this code print?',
                    code: py`print(len("Brick Park"))`,
                    choices: ['9', '10', '2'],
                    answer: '10',
                    hints: ['The space counts as a character too.'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Shouting vowels',
                    prompt: 'Bolt\'s vowel counter should work for ANY capital letters. Find a word that breaks it!',
                    robot: py`
                        count = 0
                        for letter in word:
                            if letter in "aeiou":
                                count += 1
                        print(count)
                    `,
                    correct: py`
                        count = 0
                        for letter in word.lower():
                            if letter in "aeiou":
                                count += 1
                        print(count)
                    `,
                    inputName: 'word',
                    choices: ['"apple"', '"APPLE"', '"sky"'],
                    answer: '"APPLE"',
                    hints: ['Is "A" in "aeiou"?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Palindrome checker',
                    prompt: 'Ask `Word? `. Print the word backwards (build it with a loop). Then print `Palindrome!` if it\'s the same backwards, otherwise `Not a palindrome`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        word = input("Word? ")
                        backwards = ""
                        for letter in word:
                            backwards = letter + backwards
                        print(backwards)
                        if word == backwards:
                            print("Palindrome!")
                        else:
                            print("Not a palindrome")
                    `,
                    inputs: ['level'],
                    check: py`
                        out = run_with(["brick"])
                        assert "kcirb" in out and "Not a palindrome" in out, "brick should print kcirb and Not a palindrome"
                        assert "Palindrome!" in run_with(["racecar"]), "racecar is a palindrome!"
                        assert same_output(output, expected_output), "level backwards is level: Palindrome!"
                    `,
                    hints: ['Build backwards in a loop, like before.', 'Then compare: if word == backwards:'],
                },
            ],
        },
    ],
};
