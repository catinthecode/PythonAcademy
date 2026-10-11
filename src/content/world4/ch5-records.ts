import { py } from '../helpers';
import type { Chapter } from '../schema';

const PARTY = py`
    party = [
        {"name": "Kai", "hp": 30, "level": 4},
        {"name": "Ivy", "hp": 12, "level": 3},
        {"name": "Rook", "hp": 0, "level": 5},
    ]
`;

export const ch5: Chapter = {
    id: 'ch5',
    title: 'Lists of Things',
    emoji: '🛡️',
    summary: 'Model real things as dictionaries and keep many of them in a list.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'A Party of Heroes',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Hoot gathers a party of three heroes.',
                    wide: true,
                    cast: [
                        { who: 'hoot', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'hoot', text: 'My party has three heroes, and each has a name, HP and a level.' },
                        { who: 'py', text: 'Each hero is a dictionary. The party is a LIST of dictionaries!' },
                    ],
                    code: PARTY + '\n' + py`
                        print(party[0]["name"])
                        print(party[1]["hp"])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py slithers along the line of heroes.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [{ who: 'py', text: 'Loop over the list: each turn, hero is one whole dictionary.' }],
                    code: PARTY + '\n' + py`
                        for hero in party:
                            print(hero["name"], "is level", hero["level"])
                    `,
                },
                {
                    scene: 'meadow',
                    alt: 'Hoot adds a new hero to the party.',
                    cast: [{ who: 'hoot', pose: 'point', x: 40 }],
                    bubbles: [{ who: 'hoot', text: 'New heroes are just new dictionaries, appended to the list.' }],
                    code: PARTY + '\n' + py`
                        party.append({"name": "Pip", "hp": 20, "level": 1})
                        print(len(party), "heroes")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Hoot pours a healing potion over Ivy.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'hoot', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Pick a hero, then a key, and change it in place.' },
                        { who: 'hoot', text: 'Ivy is healed to 22 HP!' },
                    ],
                    code: PARTY + '\n' + py`
                        party[1]["hp"] += 10
                        print(party[1])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Slime asks the whole party for its name, and the program crashes.',
                    cast: [
                        { who: 'slime', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'slime', text: 'party["name"] crashed! Blorp?' },
                        { who: 'py', text: 'party is a LIST. Pick a hero first: party[0]["name"].' },
                    ],
                    code: PARTY + '\n' + py`print(party["name"])`,
                },
                {
                    scene: 'castle',
                    alt: 'Py points at a hero card in a row of cards, then at one line on it.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'hoot', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'In a list of dictionaries, [position] picks a hero and ["key"] picks a detail. Read it left to right.' },
                        { who: 'hoot', text: 'party[2]["name"]: the third hero\'s name!' },
                    ],
                    code: PARTY + '\n' + py`print(party[2]["name"], "has", party[2]["hp"], "HP")`,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Meet the Party',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Second hero',
                    prompt: 'What will this code print?',
                    code: PARTY + '\n' + py`print(party[1]["name"])`,
                    choices: ['Kai', 'Ivy', 'Rook'],
                    answer: 'Ivy',
                    hints: ['party[1] is the second hero.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Levels',
                    prompt: 'What will this code print?',
                    code: PARTY + '\n' + py`
                        for hero in party:
                            print(hero["level"])
                    `,
                    choices: ['4\n3\n5', 'Kai\nIvy\nRook', '12'],
                    answer: '4\n3\n5',
                    hints: ['Each hero dictionary has a "level".'],
                },
                {
                    id: 'p3',
                    type: 'write',
                    title: 'Roll call',
                    prompt: 'Loop over the party and print each hero like the 🎯 Goal.',
                    starter: PARTY,
                    solution: PARTY + '\n' + py`
                        for hero in party:
                            print(f"{hero['name']}: {hero['hp']} HP")
                    `,
                    check: py`
                        assert "for" in source, "Loop over the party."
                        assert same_output(output, expected_output), "Match the goal lines."
                    `,
                    hints: ['for hero in party:', 'print(f"{hero[\'name\']}: {hero[\'hp\']} HP")'],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    title: 'Wrong key',
                    prompt: 'This crashes: there\'s no key called "health". Fix it to use the right key.',
                    starter: PARTY + '\n' + py`
                        for hero in party:
                            print(hero["name"], hero["health"])
                    `,
                    solution: PARTY + '\n' + py`
                        for hero in party:
                            print(hero["name"], hero["hp"])
                    `,
                    hints: ['Look at the keys each hero has.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Total HP',
                    prompt: 'Add up the HP of the whole party and print `Party HP:` and the total.',
                    starter: PARTY,
                    solution: PARTY + '\n' + py`
                        total = 0
                        for hero in party:
                            total += hero["hp"]
                        print("Party HP:", total)
                    `,
                    check: py`
                        assert "for" in source, "Use the total pattern with a loop."
                        assert same_output(output, expected_output), "30 + 12 + 0"
                    `,
                    hints: ['total += hero["hp"] inside the loop.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Filter and Find',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Py picks out only the heroes who are still standing.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'kai', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Filter: loop over the list and keep only the ones that match a rule.' },
                        { who: 'kai', text: 'Who needs healing? Anyone under 20 HP!' },
                    ],
                    code: PARTY + '\n' + py`
                        hurt = []
                        for hero in party:
                            if hero["hp"] < 20:
                                hurt.append(hero["name"])
                        print(hurt)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai searches the party for a hero by name.',
                    cast: [{ who: 'kai', pose: 'point', x: 35 }],
                    bubbles: [{ who: 'kai', text: 'Find: loop until a hero\'s name matches, then use that hero.' }],
                    code: PARTY + '\n' + py`
                        for hero in party:
                            if hero["name"] == "Ivy":
                                print("Found Ivy at level", hero["level"])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'The slime tries to sneak into the party.',
                    cast: [
                        { who: 'hoot', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Lists of dictionaries are how real apps store things: players, songs, messages...' }],
                },
                {
                    scene: 'castle',
                    alt: 'Kai writes every hero name in capitals on a banner.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Turn the heroes into a simple list of names.' },
                        { who: 'kai', text: 'KAI, IVY, ROOK. Banner ready!' },
                    ],
                    code: PARTY + '\n' + py`
                        names = []
                        for hero in party:
                            names.append(hero["name"].upper())
                        print(names)
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Hoot searches for Ivy but never finds her, even though she is right there.',
                    cast: [
                        { who: 'hoot', pose: 'sad', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'hoot', text: 'if hero == "Ivy" never matches!' },
                        { who: 'py', text: 'hero is a whole dictionary. Compare hero["name"].' },
                    ],
                    code: PARTY + '\n' + py`
                        for hero in party:
                            if hero == "Ivy":
                                print("Found her!")
                        print("Done searching")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai sorts hero cards into piles while Py nods.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Filter keeps every match. Find looks for one. Both look inside each dictionary with ["key"].' },
                        { who: 'kai', text: 'So that is how real apps keep track of things!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Party Tools',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Still standing',
                    prompt: 'Make a list of the names of heroes with more than 0 HP, and print it.',
                    starter: PARTY,
                    solution: PARTY + '\n' + py`
                        standing = []
                        for hero in party:
                            if hero["hp"] > 0:
                                standing.append(hero["name"])
                        print(standing)
                    `,
                    check: py`
                        assert "append" in source, "Build the list with append."
                        assert same_output(output, expected_output), "Rook has 0 HP, so only Kai and Ivy."
                    `,
                    hints: ['standing = [] first, then append hero["name"] when hero["hp"] > 0.'],
                },
                {
                    id: 'p6',
                    type: 'trace',
                    title: 'Highest level',
                    prompt: 'What is `best` each time line 4 finishes? (It only runs when the if is True.)',
                    code: py`
                        best = 0
                        for level in [4, 3, 5]:
                            if level > best:
                                best = level
                    `,
                    line: 4,
                    columns: ['best'],
                    rows: [['4'], ['5']],
                    hints: ['4 > 0, so best is 4. Is 3 > 4? Is 5 > 4?'],
                },
                {
                    id: 'p7',
                    type: 'write',
                    title: 'Find by name',
                    prompt: 'Ask `Hero? `. If a hero with that name is in the party, print `<name> is level <level>`. Otherwise print `No such hero`.',
                    starter: PARTY,
                    solution: PARTY + '\n' + py`
                        name = input("Hero? ")
                        found = False
                        for hero in party:
                            if hero["name"] == name:
                                print(name, "is level", hero["level"])
                                found = True
                        if not found:
                            print("No such hero")
                    `,
                    inputs: ['Rook'],
                    check: py`
                        assert "No such hero" in run_with(["Zed"]), "Zed isn't in the party: No such hero"
                        assert "Kai is level 4" in run_with(["Kai"]), "Kai is level 4"
                        assert same_output(output, expected_output), "Rook is level 5"
                    `,
                    hints: ['Use a found flag that starts False.', 'After the loop: if not found: print("No such hero")'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Count the strong',
                    prompt: 'What will this code print?',
                    code: PARTY + '\n' + py`
                        count = 0
                        for hero in party:
                            if hero["level"] >= 4:
                                count += 1
                        print(count)
                    `,
                    choices: ['1', '2', '3'],
                    answer: '2',
                    hints: ['Levels are 4, 3 and 5.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Level up!',
                    prompt: 'Give every hero +1 level (change each dictionary), then print each hero\'s name and new level.',
                    starter: PARTY,
                    solution: PARTY + '\n' + py`
                        for hero in party:
                            hero["level"] += 1
                        for hero in party:
                            print(hero["name"], hero["level"])
                    `,
                    check: py`
                        assert [h["level"] for h in party] == [5, 4, 6], "Each hero's level should go up by 1."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['hero["level"] += 1 inside the loop.'],
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
                    title: 'Deep dive',
                    prompt: 'What will this code print?',
                    code: PARTY + '\n' + py`print(party[-1]["hp"] + party[0]["level"])`,
                    choices: ['4', '34', '5'],
                    answer: '4',
                    hints: ['party[-1] is Rook (0 HP). party[0] is Kai (level 4).'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Name search',
                    prompt: 'Bolt\'s hero finder should work however the name is typed. Find a name that breaks it.',
                    robot: py`
                        party = [{"name": "Kai"}, {"name": "Ivy"}]
                        found = False
                        for hero in party:
                            if hero["name"] == name:
                                found = True
                        print(found)
                    `,
                    correct: py`
                        party = [{"name": "Kai"}, {"name": "Ivy"}]
                        found = False
                        for hero in party:
                            if hero["name"].lower() == name.lower():
                                found = True
                        print(found)
                    `,
                    inputName: 'name',
                    choices: ['"Kai"', '"ivy"', '"Zed"'],
                    answer: '"ivy"',
                    hints: ['Try different capital letters.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Party report',
                    prompt: 'Write `def report(party):` that prints how many heroes are standing (hp > 0), the name of the highest-level hero, and the total HP, like the 🎯 Goal. Call `report(party)`.',
                    starter: PARTY,
                    solution: PARTY + '\n' + py`
                        def report(party):
                            standing = 0
                            total = 0
                            best = party[0]
                            for hero in party:
                                if hero["hp"] > 0:
                                    standing += 1
                                total += hero["hp"]
                                if hero["level"] > best["level"]:
                                    best = hero
                            print("Standing:", standing)
                            print("Top level:", best["name"])
                            print("Total HP:", total)

                        report(party)
                    `,
                    check: py`
                        f = function("report")
                        other = [{"name": "A", "hp": 5, "level": 1}, {"name": "B", "hp": 0, "level": 9}]
                        assert printed(f, other) == "Standing: 1\nTop level: B\nTotal HP: 5\n", "report should work for ANY party, not just this one."
                        assert same_output(output, expected_output), "Match the goal for this party."
                    `,
                    hints: [
                        'One loop can do three jobs: count standing heroes, add up HP, and track the best level.',
                        'Track the best HERO (the whole dictionary), so you can print its name.',
                    ],
                },
            ],
        },
    ],
};
