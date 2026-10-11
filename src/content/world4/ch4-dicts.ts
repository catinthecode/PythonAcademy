import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch4: Chapter = {
    id: 'ch4',
    title: 'Dictionaries',
    emoji: '🗝️',
    summary: 'Store things by name instead of by position: keys and values.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Look It Up',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Hoot opens a bag with labelled pockets.',
                    wide: true,
                    cast: [
                        { who: 'hoot', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'hoot', text: 'Hoo! How many potions do I have? A list makes me remember positions...' },
                        { who: 'py', text: 'Use a dictionary: look things up by NAME. Each key has a value.' },
                    ],
                    code: py`
                        bag = {"potion": 2, "key": 1, "gold": 80}
                        print(bag["potion"])
                        print(bag["gold"])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py adds a new pocket to the bag and updates another.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [{ who: 'py', text: 'Put a value at a key to add it, or to change what\'s already there.' }],
                    code: py`
                        bag = {"arrow": 10}
                        bag["bow"] = 1
                        bag["arrow"] = bag["arrow"] + 5
                        print(bag)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'The slime asks for a missing key and the program crashes.',
                    cast: [
                        { who: 'slime', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'slime', text: 'Gimme the dragon egg! KeyError! Blorp!' },
                        { who: 'py', text: 'A missing key crashes. .get(key, default) safely gives the default.' },
                    ],
                    code: py`
                        bag = {"arrow": 10}
                        print(bag.get("map", 0))
                        print(bag["map"])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Hoot frowns at a crash after leaving the quotes off a key.',
                    cast: [
                        { who: 'hoot', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'hoot', text: 'bag[arrow] crashed with a NameError!' },
                        { who: 'py', text: 'Text keys need quotes: bag["arrow"].' },
                    ],
                    code: py`
                        bag = {"arrow": 10}
                        print(bag[arrow])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py compares a numbered list with a labelled hero sheet.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'hoot', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Lists find things by position. Dictionaries find them by name.' },
                        { who: 'hoot', text: 'hero["level"] beats hero[2]!' },
                    ],
                    code: py`
                        hero = {"name": "Hoot", "hp": 30, "level": 4}
                        print(hero["level"])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Hoot checks its stats on a glowing scroll after taking damage.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'hoot', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'A dictionary holds key: value pairs. d[key] reads, d[key] = value adds or changes, and .get() asks safely.' },
                        { who: 'hoot', text: 'No mana key? .get gives me 0 instead of a crash!' },
                    ],
                    code: py`
                        stats = {"hp": 30}
                        stats["hp"] -= 5
                        print(stats.get("hp", 0), stats.get("mana", 0))
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Keys and Values',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Gold check',
                    prompt: 'What will this code print?',
                    code: py`
                        bag = {"potion": 3, "gold": 50}
                        print(bag["gold"])
                    `,
                    choices: ['gold', '50', '3'],
                    answer: '50',
                    hints: ['The key "gold" has the value 50.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Shopping',
                    prompt: 'What will this code print?',
                    code: py`
                        bag = {"potion": 3}
                        bag["potion"] = bag["potion"] + 2
                        print(bag["potion"])
                    `,
                    choices: ['3', '5', '2'],
                    answer: '5',
                    hints: ['The old value 3, plus 2.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    about: 'error',
                    title: 'No egg',
                    prompt: 'What happens when Python runs this?',
                    code: py`
                        bag = {"potion": 3}
                        print(bag["egg"])
                    `,
                    choices: ['KeyError', 'IndexError', 'No error'],
                    answer: 'KeyError',
                    hints: ['There\'s no "egg" key.'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Safe lookup',
                    prompt: 'What will this code print?',
                    code: py`
                        bag = {"potion": 3}
                        print(bag.get("egg", 0))
                    `,
                    choices: ['0', 'None', 'KeyError'],
                    answer: '0',
                    hints: ['.get gives the default when the key is missing.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Hero sheet',
                    prompt: 'Make `hero = {"name": "Kai", "hp": 30}`. Print `Kai has 30 HP` using the dictionary values.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        hero = {"name": "Kai", "hp": 30}
                        print(hero["name"], "has", hero["hp"], "HP")
                    `,
                    check: py`
                        assert globals().get("hero") == {"name": "Kai", "hp": 30}, 'Make hero = {"name": "Kai", "hp": 30}'
                        assert 'hero["name"]' in source or "hero['name']" in source, 'Use hero["name"] to get the name.'
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['hero["name"] is "Kai" and hero["hp"] is 30.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Loop Through a Dictionary',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Hoot empties its bag onto a table, item by item.',
                    wide: true,
                    cast: [
                        { who: 'hoot', pose: 'point', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'A for loop over a dictionary gives you each KEY. Use it to look up the value.' }],
                    code: py`
                        bag = {"apple": 4, "torch": 2, "rope": 1}
                        for item in bag:
                            print(item, bag[item])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py checks whether a key exists with in.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [{ who: 'py', text: 'in checks the KEYS. len() counts how many keys there are.' }],
                    code: py`
                        bag = {"apple": 4, "torch": 2}
                        print("torch" in bag)
                        print(len(bag))
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Hoot tallies letters in a word using a dictionary.',
                    cast: [{ who: 'hoot', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'hoot', text: 'Counting with a dictionary: .get(thing, 0) + 1 works even the first time!' }],
                    code: py`
                        counts = {}
                        for letter in "banana":
                            counts[letter] = counts.get(letter, 0) + 1
                        print(counts)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Hoot adds up the prices on a shop sign.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'hoot', pose: 'think', x: 75, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Loop over the keys and add up every value.' },
                        { who: 'hoot', text: 'Buying one of everything costs 8!' },
                    ],
                    code: py`
                        prices = {"potion": 5, "map": 3}
                        total = 0
                        for item in prices:
                            total += prices[item]
                        print(total)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Slime is confused that 3 is not found in a bag holding 3 potions.',
                    cast: [
                        { who: 'slime', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'slime', text: '3 in bag is False? I HAVE 3 potions!' },
                        { who: 'py', text: 'in looks at the KEYS, not the values.' },
                    ],
                    code: py`
                        bag = {"potion": 3}
                        print(3 in bag)
                        print("potion" in bag)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Hoot tips out its bag and counts everything with a tally sheet.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'hoot', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Looping over a dictionary gives you the keys. in checks the keys. And .get(key, 0) + 1 can count anything.' },
                        { who: 'hoot', text: 'My bag is finally organised!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Bags and Shops',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'How many keys?',
                    prompt: 'What will this code print?',
                    code: py`print(len({"potion": 3, "key": 1, "gold": 50}))`,
                    choices: ['3', '54', '6'],
                    answer: '3',
                    hints: ['len counts the keys.'],
                },
                {
                    id: 'p6',
                    type: 'trace',
                    title: 'Letter tally',
                    prompt: 'What is `counts` each time line 3 finishes?',
                    code: py`
                        counts = {}
                        for letter in "aab":
                            counts[letter] = counts.get(letter, 0) + 1
                    `,
                    line: 3,
                    columns: ['counts'],
                    rows: [["{'a': 1}"], ["{'a': 2}"], ["{'a': 2, 'b': 1}"]],
                    hints: ['Write it the way Python prints a dictionary: {\'a\': 1}', 'The first time, "a" isn\'t there, so .get gives 0, plus 1.'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Safe bag',
                    prompt: 'This crashes because there\'s no "egg". Use `.get` so it prints 0 instead.',
                    starter: py`
                        bag = {"potion": 3, "key": 1}
                        print(bag["egg"])
                    `,
                    solution: py`
                        bag = {"potion": 3, "key": 1}
                        print(bag.get("egg", 0))
                    `,
                    hints: ['bag.get("egg", 0)'],
                },
                {
                    id: 'p8',
                    type: 'write',
                    title: 'List the bag',
                    prompt: 'Make `bag = {"potion": 3, "key": 1, "gold": 50}`. Loop over it and print each item like the 🎯 Goal.',
                    starter: py`bag = {"potion": 3, "key": 1, "gold": 50}`,
                    solution: py`
                        bag = {"potion": 3, "key": 1, "gold": 50}
                        for item in bag:
                            print(f"{item}: {bag[item]}")
                    `,
                    check: py`
                        assert "for" in source, "Loop over the dictionary."
                        assert same_output(output, expected_output), "Match the goal lines."
                    `,
                    hints: ['for item in bag:', 'print(f"{item}: {bag[item]}")'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: The shop',
                    prompt: 'Make `prices = {"potion": 5, "shield": 20, "map": 3}`. Ask `Buy what? `. Print `That costs N gold` if it\'s sold, otherwise `Not sold here`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        prices = {"potion": 5, "shield": 20, "map": 3}
                        item = input("Buy what? ")
                        if item in prices:
                            print("That costs", prices[item], "gold")
                        else:
                            print("Not sold here")
                    `,
                    inputs: ['shield'],
                    check: py`
                        assert "Not sold here" in run_with(["dragon"]), "dragon isn't sold: Not sold here"
                        assert "That costs 3 gold" in run_with(["map"]), "map costs 3 gold"
                        assert same_output(output, expected_output), "shield costs 20 gold"
                    `,
                    hints: ['item = input("Buy what? ")', 'if item in prices: ... else: ...'],
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
                    title: 'New pocket',
                    prompt: 'What will this code print?',
                    code: py`
                        bag = {"potion": 1}
                        bag["rope"] = 2
                        print(bag)
                    `,
                    choices: ["{'potion': 1, 'rope': 2}", "{'rope': 2}", "{'potion': 1}"],
                    answer: "{'potion': 1, 'rope': 2}",
                    hints: ['Adding a key keeps the old ones.'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Crashy shop',
                    prompt: 'Bolt\'s price checker should say "Unknown" for items it doesn\'t know. Find an item that breaks it.',
                    robot: py`
                        prices = {"potion": 5, "shield": 20}
                        print(prices[item])
                    `,
                    correct: py`
                        prices = {"potion": 5, "shield": 20}
                        print(prices.get(item, "Unknown"))
                    `,
                    inputName: 'item',
                    choices: ['"potion"', '"dragon"', '"shield"'],
                    answer: '"dragon"',
                    hints: ['Try something that isn\'t in the shop.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Loot function',
                    prompt: 'Write `def add_loot(bag, item, amount):` that adds amount to bag[item] (start from 0 if the item is new) and returns the bag. Then add 2 "potion" and 1 "crown" to `{"potion": 3}` and print it.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def add_loot(bag, item, amount):
                            bag[item] = bag.get(item, 0) + amount
                            return bag

                        bag = {"potion": 3}
                        add_loot(bag, "potion", 2)
                        add_loot(bag, "crown", 1)
                        print(bag)
                    `,
                    check: py`
                        f = function("add_loot")
                        assert f({"gold": 5}, "gold", 10) == {"gold": 15}, "Adding 10 gold to 5 gold should give 15."
                        assert f({}, "egg", 1) == {"egg": 1}, "A new item should start from 0."
                        assert same_output(output, expected_output), "Match the goal bag."
                    `,
                    hints: ['bag[item] = bag.get(item, 0) + amount', 'Remember to return bag.'],
                },
            ],
        },
    ],
};
