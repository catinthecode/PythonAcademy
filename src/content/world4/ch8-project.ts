import { py } from '../helpers';
import type { Chapter } from '../schema';

const ROOMS = py`
    rooms = {
        "gate": {"text": "You stand at the castle gate.", "north": "hall"},
        "hall": {"text": "A great hall with a long table.", "south": "gate", "east": "vault"},
        "vault": {"text": "Gold everywhere! You found the treasure!", "west": "hall"},
    }
`;

export const ch8: Chapter = {
    id: 'ch8',
    title: 'Project: Text Adventure',
    emoji: '🏰',
    summary: 'Build a text adventure: rooms in a dictionary, moves from input(), and functions to tie it together.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Map of Rooms',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Kai stands at the castle gate, looking at a map.',
                    wide: true,
                    cast: [
                        { who: 'kai', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'kai', text: 'Let\'s make a game where you explore the castle by typing!' },
                        { who: 'py', text: 'A text adventure! Each room is a dictionary: its description, and where each exit leads.' },
                    ],
                    code: ROOMS + '\n' + py`print(rooms["gate"]["text"])`,
                },
                {
                    scene: 'castle',
                    alt: 'Py traces a path from room to room on the map.',
                    cast: [{ who: 'py', pose: 'point', x: 30 }],
                    bubbles: [{ who: 'py', text: 'rooms["gate"]["north"] is "hall", the room to the north. A variable remembers where you are.' }],
                    code: ROOMS + '\n' + py`
                        here = "gate"
                        here = rooms[here]["north"]
                        print("You walk to the", here)
                        print(rooms[here]["text"])
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'The slime blocks a doorway that doesn\'t exist.',
                    cast: [
                        { who: 'slime', pose: 'happy', x: 30 },
                        { who: 'kai', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'kai', text: 'If there\'s no exit that way, check with in before you move!' }],
                    code: ROOMS + '\n' + py`
                        here = "gate"
                        if "west" in rooms[here]:
                            here = rooms[here]["west"]
                        else:
                            print("You can't go that way.")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py traces its tail from the vault back to the hall on the map.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Read it left to right: first the room, then its exit.' },
                        { who: 'kai', text: 'West from the vault leads to the hall!' },
                    ],
                    code: ROOMS + '\n' + py`print(rooms["vault"]["west"])`,
                },
                {
                    scene: 'castle',
                    alt: 'Slime types a room name with a capital letter and the game crashes.',
                    cast: [
                        { who: 'slime', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'slime', text: 'rooms["Hall"] crashed! Blorp!' },
                        { who: 'py', text: 'Keys must match exactly. "Hall" is not "hall".' },
                    ],
                    code: ROOMS + '\n' + py`print(rooms["Hall"]["text"])`,
                },
                {
                    scene: 'castle',
                    alt: 'Kai stands in the hall on a big castle map, marked "you are here".',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Each room maps "text" to its description, and each direction to the next room. A "here" variable remembers where the player stands.' },
                        { who: 'kai', text: 'The whole castle fits in one dictionary!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Rooms and Moves',
            problems: [
                {
                    id: 's1',
                    type: 'predict',
                    title: 'Where to?',
                    prompt: 'What will this code print?',
                    code: ROOMS + '\n' + py`print(rooms["hall"]["east"])`,
                    choices: ['vault', 'gate', 'hall'],
                    answer: 'vault',
                    hints: ['Look at the hall\'s "east" exit.'],
                },
                {
                    id: 's2',
                    type: 'write',
                    title: 'Part 1: Describe',
                    prompt: 'Write `def describe(room):` that prints the room\'s text and then its exits, like the 🎯 Goal. (Every key except "text" is an exit.) Call `describe("hall")`.',
                    starter: ROOMS,
                    solution: ROOMS + '\n' + py`
                        def describe(room):
                            print(rooms[room]["text"])
                            exits = []
                            for key in rooms[room]:
                                if key != "text":
                                    exits.append(key)
                            print("Exits:", exits)

                        describe("hall")
                    `,
                    check: py`
                        f = function("describe")
                        assert printed(f, "gate") == "You stand at the castle gate.\nExits: ['north']\n", 'describe("gate") should show its text and its one exit.'
                        assert same_output(output, expected_output), 'Call describe("hall").'
                    `,
                    hints: ['Loop over rooms[room] (its keys) and collect every key that isn\'t "text".', 'print("Exits:", exits)'],
                },
                {
                    id: 's3',
                    type: 'write',
                    title: 'Part 2: Move',
                    prompt: 'Write `def move(here, direction):` that returns the new room if that exit exists, otherwise prints `You can\'t go that way.` and returns `here`. Print `move("gate", "north")` and `move("gate", "west")`.',
                    starter: ROOMS,
                    solution: ROOMS + '\n' + py`
                        def move(here, direction):
                            if direction in rooms[here]:
                                return rooms[here][direction]
                            print("You can't go that way.")
                            return here

                        print(move("gate", "north"))
                        print(move("gate", "west"))
                    `,
                    check: py`
                        f = function("move")
                        assert f("hall", "east") == "vault", 'move("hall", "east") should return "vault".'
                        assert f("vault", "up") == "vault", "A missing exit should return the same room."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['if direction in rooms[here]: return rooms[here][direction]', 'Otherwise print the message and return here.'],
                },
                {
                    id: 's4',
                    type: 'trace',
                    title: 'The journey',
                    prompt: 'The player goes north, then east. What is `here` each time line 4 finishes?',
                    code: py`
                        exits = {"gate": "hall", "hall": "vault"}
                        here = "gate"
                        for step in range(2):
                            here = exits[here]
                    `,
                    line: 4,
                    columns: ['here'],
                    rows: [['hall'], ['vault']],
                    hints: ['From gate you go to hall. From hall you go to...'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Add a room',
                    prompt: 'Add a "tower" room with the text `Wind howls at the top of the tower.`, reached by going "up" from the hall (and "down" back to the hall). Print the tower\'s text by following the hall\'s "up" exit.',
                    starter: ROOMS,
                    solution: ROOMS + '\n' + py`
                        rooms["tower"] = {"text": "Wind howls at the top of the tower.", "down": "hall"}
                        rooms["hall"]["up"] = "tower"
                        print(rooms[rooms["hall"]["up"]]["text"])
                    `,
                    check: py`
                        assert rooms.get("hall", {}).get("up") == "tower", 'The hall needs an "up" exit to "tower".'
                        assert rooms.get("tower", {}).get("down") == "hall", 'The tower needs a "down" exit back to "hall".'
                        assert same_output(output, expected_output), "Print the tower's text."
                    `,
                    hints: ['rooms["tower"] = {"text": "...", "down": "hall"}', 'rooms["hall"]["up"] = "tower"'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'The Game Loop',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Py draws a circle of arrows: look, ask, move, repeat.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'kai', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Games run in a loop: describe the room, ask for a move, move, repeat, until you win or quit.' },
                    ],
                    code: ROOMS + '\n' + py`
                        here = "gate"
                        moves = 0
                        while here != "vault":
                            direction = input("Go which way? ")
                            if direction in rooms[here]:
                                here = rooms[here][direction]
                            moves += 1
                        print("Treasure in", moves, "moves!")
                    `,
                    inputs: ['north', 'west', 'east'],
                },
                {
                    scene: 'castle',
                    alt: 'Kai adds a "quit" door to the game loop.',
                    cast: [{ who: 'kai', pose: 'point', x: 40 }],
                    bubbles: [{ who: 'kai', text: 'Let players type quit to stop. break leaves the loop right away.' }],
                },
                {
                    scene: 'castle',
                    alt: 'Bolt holds up a list of moves to test with.',
                    cast: [
                        { who: 'bolt', pose: 'point', x: 30 },
                        { who: 'slime', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'bolt', text: 'Test every path: the winning route, a wrong direction, and quitting early!' }],
                },
                {
                    scene: 'castle',
                    alt: 'A player types " North " with a capital and spaces. Py tidies it up.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: '.strip() trims spaces, .lower() fixes capitals.' },
                        { who: 'kai', text: '" North " becomes "north"!' },
                    ],
                    code: py`
                        direction = input("Go which way? ").strip().lower()
                        print("You typed:", direction)
                    `,
                    inputs: [' North '],
                },
                {
                    scene: 'castle',
                    alt: 'Kai calls a describe function from a short, neat loop.',
                    cast: [
                        { who: 'kai', pose: 'point', x: 25 },
                        { who: 'py', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'My functions keep the loop short and easy to read.' },
                        { who: 'py', text: 'Small pieces, one clear game!' },
                    ],
                    code: ROOMS + '\n' + py`
                        def describe(room):
                            print(rooms[room]["text"])

                        describe("gate")
                        describe("vault")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Py draws a loop of arrows: show, ask, check, move. Kai and Slime cheer.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'kai', pose: 'happy', x: 52 },
                        { who: 'slime', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'The game loop: show the room, ask for a move, check the exit, move, and repeat until the player wins or quits.' },
                        { who: 'kai', text: 'Time to build MY castle!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Play Loop',
            problems: [
                {
                    id: 's5',
                    type: 'write',
                    title: 'Part 3: Game loop',
                    prompt: 'Start at "gate". Loop until the player reaches "vault": print the room\'s text, ask `Go which way? `, and move if the exit exists (otherwise print `You can\'t go that way.`). Finally print the vault\'s text.',
                    starter: ROOMS,
                    solution: ROOMS + '\n' + py`
                        here = "gate"
                        while here != "vault":
                            print(rooms[here]["text"])
                            direction = input("Go which way? ")
                            if direction in rooms[here]:
                                here = rooms[here][direction]
                            else:
                                print("You can't go that way.")
                        print(rooms[here]["text"])
                    `,
                    inputs: ['north', 'east'],
                    check: py`
                        out = run_with(["north", "west", "east"])
                        assert "You can't go that way." in out and "treasure" in out, "A wrong direction should print the message, and the game should continue."
                        assert same_output(output, expected_output), "north then east should reach the treasure."
                    `,
                    hints: ['while here != "vault":', 'Inside: print the text, ask, then if/else to move.'],
                },
                {
                    id: 's6',
                    type: 'fix',
                    title: 'Never ending',
                    prompt: 'This game never ends because `here` never changes! Fix the move.',
                    starter: ROOMS + '\n' + py`
                        here = "gate"
                        while here != "vault":
                            direction = input("Go which way? ")
                            if direction in rooms[here]:
                                print("You go", direction)
                        print("Treasure!")
                    `,
                    solution: ROOMS + '\n' + py`
                        here = "gate"
                        while here != "vault":
                            direction = input("Go which way? ")
                            if direction in rooms[here]:
                                print("You go", direction)
                                here = rooms[here][direction]
                        print("Treasure!")
                    `,
                    inputs: ['north', 'east'],
                    hints: ['After printing, update here to the new room.'],
                },
                {
                    id: 's7',
                    type: 'write',
                    title: 'Part 4: Quit',
                    prompt: 'Make a loop that keeps asking `Command? ` and prints `You said: <command>`, until the player types `quit`. Then print `Goodbye!`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        while True:
                            command = input("Command? ")
                            if command == "quit":
                                break
                            print("You said:", command)
                        print("Goodbye!")
                    `,
                    inputs: ['look', 'north', 'quit'],
                    check: py`
                        assert "Goodbye!" in run_with(["quit"]), "Typing quit straight away should just say Goodbye!"
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['while True: ... if command == "quit": break', 'Print Goodbye! after the loop.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Inventory',
                    prompt: 'Make `inventory = []`. Ask `Take what? ` three times and append each answer. Then print `You carry:` and the list.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        inventory = []
                        for i in range(3):
                            item = input("Take what? ")
                            inventory.append(item)
                        print("You carry:", inventory)
                    `,
                    inputs: ['torch', 'key', 'map'],
                    check: py`
                        assert "You carry: ['a', 'b', 'c']" in run_with(["a", "b", "c"]), "It should work for any three items."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['A for loop with range(3), asking and appending each time.'],
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
                    title: 'Exits',
                    prompt: 'What will this code print?',
                    code: ROOMS + '\n' + py`print("west" in rooms["hall"])`,
                    choices: ['True', 'False'],
                    answer: 'False',
                    hints: ['The hall has south and east exits.'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Bad direction',
                    prompt: 'Bolt\'s move code should say "You can\'t go that way." for missing exits. Find a direction that breaks it (you\'re at the gate).',
                    robot: py`
                        exits = {"north": "hall"}
                        print("You go to the", exits[direction])
                    `,
                    correct: py`
                        exits = {"north": "hall"}
                        if direction in exits:
                            print("You go to the", exits[direction])
                        else:
                            print("You can't go that way.")
                    `,
                    inputName: 'direction',
                    choices: ['"north"', '"south"'],
                    answer: '"south"',
                    hints: ['What if there\'s no exit that way?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    hideGoal: true,
                    title: 'BOSS: Your adventure',
                    prompt: 'Make YOUR adventure! It needs: at least 4 rooms in a dictionary; a `describe(room)` function; a game loop with `input()` that moves between rooms; a message for exits that don\'t exist; and a way to WIN (reaching a treasure room ends the game with a win message containing "win"). Use "go" commands like north/south/east/west.',
                    starter: py`
                        rooms = {
                            # Your rooms here
                        }

                        def describe(room):
                            pass

                        # Your game loop here
                    `,
                    solution: py`
                        rooms = {
                            "gate": {"text": "The castle gate.", "north": "hall"},
                            "hall": {"text": "A great hall.", "south": "gate", "east": "kitchen", "north": "tower"},
                            "kitchen": {"text": "Smells like pie.", "west": "hall"},
                            "tower": {"text": "Treasure! You win!", "south": "hall"},
                        }

                        def describe(room):
                            print(rooms[room]["text"])

                        here = "gate"
                        while here != "tower":
                            describe(here)
                            direction = input("Go which way? ")
                            if direction in rooms[here]:
                                here = rooms[here][direction]
                            else:
                                print("You can't go that way.")
                        describe(here)
                        print("You win the adventure!")
                    `,
                    inputs: ['north', 'north'],
                    check: py`
                        assert isinstance(globals().get("rooms"), dict) and len(rooms) >= 4, "Make at least 4 rooms in the rooms dictionary."
                        function("describe")
                        assert "while" in source and "input(" in source, "Use a game loop with input()."
                        out = output.lower()
                        assert "win" in out, "Playing should be able to reach a win message. (We tried the moves in the purple box. Make sure they lead to your treasure, or change your map!)"
                    `,
                    hints: [
                        'Start from the rooms dictionary and game loop you built in Part 3.',
                        'The purple box shows the moves we test with: north, north. Make those lead to your treasure room!',
                        'End the loop when you reach the treasure room, then print a message with "win" in it.',
                    ],
                },
            ],
        },
    ],
};
