import { py } from '../helpers';
import type { Chapter } from '../schema';

const ALIEN = py`
    class Alien:
        def __init__(self, name):
            self.name = name
            self.energy = 10

        def speak(self):
            print(self.name + " says: Greetings!")

        def rest(self):
            self.energy += 5
`;

export const ch4: Chapter = {
    id: 'ch4',
    title: 'Objects',
    emoji: '👾',
    summary: 'Use a class as a blueprint to make objects that bundle data and actions together.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Blueprints',
            panels: [
                {
                    scene: 'space',
                    alt: 'Nova designs an alien crew on a blueprint.',
                    wide: true,
                    cast: [
                        { who: 'nova', pose: 'talk', x: 25 },
                        { who: 'py', pose: 'point', x: 75, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'nova', text: 'Every alien on my crew has a name and energy, and they can all speak.' },
                        { who: 'py', text: 'Write a class: a BLUEPRINT. Then make as many objects from it as you like!' },
                    ],
                    code: py`
                        class Alien:
                            def __init__(self, name):
                                self.name = name
                                self.energy = 10

                        zork = Alien("Zork")
                        print(zork.name, zork.energy)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py labels __init__ and self.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: '__init__ runs when a new object is made. self means "this particular object", so self.name is THIS alien\'s name.' },
                    ],
                },
                {
                    scene: 'space',
                    alt: 'Two aliens made from the same blueprint, each with its own name.',
                    cast: [
                        { who: 'zork', pose: 'happy', x: 30 },
                        { who: 'nova', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'zork', text: 'Each object keeps its OWN data. Changing my energy doesn\'t change Blip\'s!' }],
                    code: ALIEN + '\n' + py`
                        zork = Alien("Zork")
                        blip = Alien("Blip")
                        zork.energy = 3
                        print(zork.energy, blip.energy)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Make Objects',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Starting energy',
                    prompt: 'What will this code print?',
                    code: ALIEN + '\n' + py`
                        zork = Alien("Zork")
                        print(zork.energy)
                    `,
                    choices: ['10', 'Zork', '0'],
                    answer: '10',
                    hints: ['__init__ sets self.energy = 10.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Separate objects',
                    prompt: 'What will this code print?',
                    code: ALIEN + '\n' + py`
                        a = Alien("Zork")
                        b = Alien("Blip")
                        a.energy = 2
                        print(a.energy, b.energy)
                    `,
                    choices: ['2 10', '2 2', '10 10'],
                    answer: '2 10',
                    hints: ['Each object has its own energy.'],
                },
                {
                    id: 'p3',
                    type: 'write',
                    title: 'Planet blueprint',
                    prompt: 'Write `class Planet:` whose `__init__(self, name, moons)` stores both. Make `earth = Planet("Earth", 1)` and print its name and moons.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        class Planet:
                            def __init__(self, name, moons):
                                self.name = name
                                self.moons = moons

                        earth = Planet("Earth", 1)
                        print(earth.name, earth.moons)
                    `,
                    check: py`
                        P = function("Planet")
                        mars = P("Mars", 2)
                        assert mars.name == "Mars" and mars.moons == 2, 'Planet("Mars", 2) should store name and moons.'
                        assert same_output(output, expected_output), "Print earth's name and moons."
                    `,
                    hints: ['def __init__(self, name, moons):', 'self.name = name and self.moons = moons'],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    title: 'Forgot self',
                    prompt: 'This crashes: a method always needs `self` as its first parameter. Fix it so it prints the 🎯 Goal.',
                    starter: py`
                        class Alien:
                            def __init__(self, name):
                                self.name = name

                            def speak():
                                print(self.name + " says hi")

                        Alien("Zork").speak()
                    `,
                    solution: py`
                        class Alien:
                            def __init__(self, name):
                                self.name = name

                            def speak(self):
                                print(self.name + " says hi")

                        Alien("Zork").speak()
                    `,
                    hints: ['def speak(self):'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Robot class',
                    prompt: 'Write `class Robot:` with `__init__(self, name)` and a method `greet(self)` that prints `Beep! I am <name>`. Make robots "Bolt" and "Zip" and call greet on both.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        class Robot:
                            def __init__(self, name):
                                self.name = name

                            def greet(self):
                                print("Beep! I am " + self.name)

                        Robot("Bolt").greet()
                        Robot("Zip").greet()
                    `,
                    check: py`
                        R = function("Robot")
                        assert printed(R("Test").greet) == "Beep! I am Test\n", 'Robot("Test").greet() should print Beep! I am Test'
                        assert same_output(output, expected_output), "Greet with Bolt, then Zip."
                    `,
                    hints: ['Store self.name in __init__.', 'greet prints "Beep! I am " + self.name'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Methods: Things Objects Do',
            panels: [
                {
                    scene: 'space',
                    alt: 'Zork speaks and then takes a nap to recharge.',
                    wide: true,
                    cast: [
                        { who: 'zork', pose: 'talk', x: 28 },
                        { who: 'py', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Methods are functions that belong to an object. They can use and change the object\'s data through self.' }],
                    code: ALIEN + '\n' + py`
                        zork = Alien("Zork")
                        zork.speak()
                        zork.rest()
                        print("Energy:", zork.energy)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'A spaceship with a fuel gauge.',
                    cast: [{ who: 'nova', pose: 'point', x: 35 }],
                    bubbles: [{ who: 'nova', text: 'Methods can return answers too, like a status report.' }],
                    code: py`
                        class Ship:
                            def __init__(self):
                                self.fuel = 100

                            def fly(self, distance):
                                self.fuel -= distance

                            def status(self):
                                return f"Fuel: {self.fuel}"

                        ship = Ship()
                        ship.fly(30)
                        print(ship.status())
                    `,
                },
                {
                    scene: 'space',
                    alt: 'A whole crew of aliens lines up.',
                    cast: [
                        { who: 'zork', pose: 'happy', x: 30 },
                        { who: 'nova', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'zork', text: 'Objects go in lists too. A crew is a list of Aliens!' }],
                    code: ALIEN + '\n' + py`
                        crew = [Alien("Zork"), Alien("Blip"), Alien("Quix")]
                        for alien in crew:
                            alien.speak()
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Objects in Action',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Spaceship',
                    prompt: 'Write `class Ship:`. `__init__(self)` sets fuel to 100. `fly(self, distance)` takes distance away from fuel. `status(self)` RETURNS `Fuel: <fuel>`. Fly 30, then 25, then print the status.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        class Ship:
                            def __init__(self):
                                self.fuel = 100

                            def fly(self, distance):
                                self.fuel -= distance

                            def status(self):
                                return f"Fuel: {self.fuel}"

                        ship = Ship()
                        ship.fly(30)
                        ship.fly(25)
                        print(ship.status())
                    `,
                    check: py`
                        S = function("Ship")
                        s = S()
                        assert s.fuel == 100, "A new ship starts with fuel 100."
                        s.fly(40)
                        assert s.status() == "Fuel: 60", "After flying 40, status() should RETURN Fuel: 60"
                        assert same_output(output, expected_output), "Fly 30, fly 25, then print the status."
                    `,
                    hints: ['self.fuel -= distance', 'return f"Fuel: {self.fuel}"'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    title: 'Rest up',
                    prompt: 'What will this code print?',
                    code: ALIEN + '\n' + py`
                        zork = Alien("Zork")
                        zork.rest()
                        zork.rest()
                        print(zork.energy)
                    `,
                    choices: ['20', '15', '10'],
                    answer: '20',
                    hints: ['Each rest adds 5 to 10.'],
                },
                {
                    id: 'p7',
                    type: 'breakit',
                    title: 'Negative energy',
                    prompt: 'Energy should never go below 0. Bolt\'s `tire` method has a bug. Find the amount that shows it (energy starts at 10).',
                    robot: py`
                        class Alien:
                            def __init__(self):
                                self.energy = 10

                            def tire(self, amount):
                                self.energy -= amount

                        a = Alien()
                        a.tire(amount)
                        print(a.energy)
                    `,
                    correct: py`
                        class Alien:
                            def __init__(self):
                                self.energy = 10

                            def tire(self, amount):
                                self.energy = max(0, self.energy - amount)

                        a = Alien()
                        a.tire(amount)
                        print(a.energy)
                    `,
                    inputName: 'amount',
                    choices: ['3', '10', '25'],
                    answer: '25',
                    hints: ['What happens if you tire it by more than it has?'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Crew roll call',
                    prompt: 'What will this code print?',
                    code: ALIEN + '\n' + py`
                        crew = [Alien("Zork"), Alien("Blip")]
                        crew[1].rest()
                        for alien in crew:
                            print(alien.name, alien.energy)
                    `,
                    choices: ['Zork 10\nBlip 15', 'Zork 15\nBlip 15', 'Zork 10\nBlip 10'],
                    answer: 'Zork 10\nBlip 15',
                    hints: ['Only crew[1] (Blip) rested.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Click counter',
                    prompt: 'Write `class Counter:` with `count` starting at 0, a `click(self)` method that adds 1, and a `reset(self)` method that sets it back to 0. Click 3 times and print the count.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        class Counter:
                            def __init__(self):
                                self.count = 0

                            def click(self):
                                self.count += 1

                            def reset(self):
                                self.count = 0

                        c = Counter()
                        c.click()
                        c.click()
                        c.click()
                        print(c.count)
                    `,
                    check: py`
                        C = function("Counter")
                        c = C()
                        c.click()
                        c.click()
                        assert c.count == 2, "Two clicks should make count 2."
                        c.reset()
                        assert c.count == 0, "reset() should set count back to 0."
                        assert same_output(output, expected_output), "Click 3 times, then print the count."
                    `,
                    hints: ['self.count = 0 in __init__.', 'click: self.count += 1. reset: self.count = 0.'],
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
                    title: 'Status report',
                    prompt: 'What will this code print?',
                    code: py`
                        class Ship:
                            def __init__(self, fuel):
                                self.fuel = fuel

                            def fly(self):
                                self.fuel -= 10
                                return self.fuel

                        s = Ship(50)
                        s.fly()
                        print(s.fly())
                    `,
                    choices: ['30', '40', '50'],
                    answer: '30',
                    hints: ['It flies twice: 50 → 40 → 30.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Typo',
                    prompt: 'This crashes with an AttributeError. Find the typo and fix it.',
                    starter: py`
                        class Alien:
                            def __init__(self, name):
                                self.name = name
                                self.energy = 10

                        zork = Alien("Zork")
                        print(zork.name, zork.enrgy)
                    `,
                    solution: py`
                        class Alien:
                            def __init__(self, name):
                                self.name = name
                                self.energy = 10

                        zork = Alien("Zork")
                        print(zork.name, zork.energy)
                    `,
                    hints: ['Check the spelling of energy.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Crew manager',
                    prompt: '`Alien` is done. Write `class Crew:` with a list of aliens (empty to start), `add(self, alien)`, and `strongest(self)` that RETURNS the name of the alien with the most energy. Add Zork (rested once), Blip, and Quix (rested twice), then print the strongest.',
                    starter: ALIEN,
                    solution: ALIEN + '\n' + py`
                        class Crew:
                            def __init__(self):
                                self.aliens = []

                            def add(self, alien):
                                self.aliens.append(alien)

                            def strongest(self):
                                best = self.aliens[0]
                                for alien in self.aliens:
                                    if alien.energy > best.energy:
                                        best = alien
                                return best.name

                        zork = Alien("Zork")
                        zork.rest()
                        quix = Alien("Quix")
                        quix.rest()
                        quix.rest()
                        crew = Crew()
                        crew.add(zork)
                        crew.add(Alien("Blip"))
                        crew.add(quix)
                        print(crew.strongest())
                    `,
                    check: py`
                        A = function("Alien")
                        C = function("Crew")
                        c = C()
                        x = A("X")
                        y = A("Y")
                        y.rest()
                        c.add(x)
                        c.add(y)
                        assert c.strongest() == "Y", "strongest() should RETURN the name of the alien with the most energy."
                        assert same_output(output, expected_output), "Quix rested twice, so Quix is strongest."
                    `,
                    hints: ['self.aliens = [] in __init__.', 'strongest: the biggest pattern, comparing alien.energy, then return best.name.'],
                },
            ],
        },
    ],
};
