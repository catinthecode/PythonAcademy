import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch7: Chapter = {
    id: 'ch7',
    title: 'Specs for Bolt',
    emoji: '🤖',
    summary: 'Tell a robot exactly what a function should do: its name, inputs, output and examples.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Write a Spec',
            panels: [
                {
                    scene: 'room',
                    alt: 'Kai asks Bolt for "a damage function" and gets something strange.',
                    wide: true,
                    cast: [
                        { who: 'kai', pose: 'talk', x: 25 },
                        { who: 'bolt', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'Bolt, make me a damage function!' },
                        { who: 'bolt', text: 'Done! It returns 7. Always. You didn\'t say anything else!' },
                    ],
                    code: py`
                        def damage():
                            return 7

                        print(damage())
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py shows a spec card with four parts.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'A spec says: 1) the NAME, 2) the INPUTS, 3) what it RETURNS, 4) EXAMPLES, including edge cases.' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Kai reads a clear spec and Bolt builds exactly the right thing.',
                    cast: [
                        { who: 'kai', pose: 'point', x: 28 },
                        { who: 'bolt', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: '"damage(attack, defense) is attack minus defense, but at least 1. damage(2, 9) is 1."' },
                        { who: 'bolt', text: 'Got it! Now I know exactly what to build.' },
                    ],
                    code: py`
                        def damage(attack, defense):
                            return max(attack - defense, 1)

                        print(damage(10, 4), damage(2, 9))
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Bolt proudly shows a name decorated with squiggles. Kai is unsure.',
                    cast: [
                        { who: 'kai', pose: 'talk', x: 25 },
                        { who: 'bolt', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'Bolt, make my name fancy.' },
                        { who: 'bolt', text: 'Fancy means squiggles? I had to guess!' },
                    ],
                    caption: 'Fuzzy words make robots guess.',
                    code: py`
                        def fancy(name):
                            return "~" + name + "~"

                        print(fancy("Kai"))
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Kai holds up an example card: half_hp(5) is 2.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Examples answer the tricky questions, like how to round.' },
                        { who: 'kai', text: 'half_hp(5) is 2, so round DOWN!' },
                    ],
                    code: py`
                        def half_hp(hp):
                            return hp // 2

                        print(half_hp(5))
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Py pins a finished spec card to the wall. Bolt salutes.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'bolt', pose: 'happy', x: 75, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'A good spec gives the name, the inputs, what it returns, and examples, including the edges. Leave nothing to guess.' },
                        { who: 'bolt', text: 'Clear specs make me a much better helper!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Spec It Out',
            problems: [
                {
                    id: 'q1',
                    type: 'instruct',
                    title: 'Which spec?',
                    prompt: 'You want a function that gives the goal output. Which spec should you give Bolt?',
                    goalCode: py`
                        def coins_for(level):
                            return level * 10

                        print(coins_for(3))
                        print(coins_for(0))
                    `,
                    choices: [
                        { text: 'Make a coins function.', code: py`
                            def coins():
                                return 10

                            print(coins())
                        ` },
                        { text: 'coins_for(level) returns level times 10. coins_for(3) is 30, coins_for(0) is 0.', code: py`
                            def coins_for(level):
                                return level * 10

                            print(coins_for(3))
                            print(coins_for(0))
                        ` },
                        { text: 'coins_for(level) gives more coins for higher levels.', code: py`
                            def coins_for(level):
                                return level + 10

                            print(coins_for(3))
                            print(coins_for(0))
                        ` },
                    ],
                    answer: 1,
                    hints: ['"More coins" is fuzzy. Examples make it exact.'],
                },
                {
                    id: 'q2',
                    type: 'breakit',
                    title: 'Spec says at least 1',
                    prompt: 'Spec: "damage(attack, defense) returns attack − defense, but at least 1." Bolt forgot part of it. Find the defense value (attack is 10) that breaks it.',
                    robot: py`
                        def damage(attack, defense):
                            return attack - defense

                        print(damage(10, defense))
                    `,
                    correct: py`
                        def damage(attack, defense):
                            return max(attack - defense, 1)

                        print(damage(10, defense))
                    `,
                    inputName: 'defense',
                    choices: ['3', '9', '15'],
                    answer: '15',
                    hints: ['When does attack − defense drop below 1?'],
                },
                {
                    id: 'q3',
                    type: 'predict',
                    about: 'meaning',
                    title: 'Read the spec',
                    prompt: 'What does this function do?',
                    code: py`
                        def initials(first, last):
                            return first[0] + last[0]

                        print(initials("Kai", "Stone"))
                    `,
                    choices: ['It returns the first letter of each name, joined together.', 'It returns the whole first name.', 'It prints the names.'],
                    answer: 'It returns the first letter of each name, joined together.',
                    hints: ['first[0] is the first letter of first.'],
                },
                {
                    id: 'q4',
                    type: 'write',
                    title: 'Build from a spec',
                    prompt: 'Spec: `xp_needed(level)` returns `level * level * 10`. Examples: xp_needed(1) is 10, xp_needed(3) is 90. Write it, then print `xp_needed(5)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def xp_needed(level):
                            return level * level * 10

                        print(xp_needed(5))
                    `,
                    check: py`
                        f = function("xp_needed")
                        assert f(1) == 10 and f(3) == 90 and f(0) == 0, "Check the spec's examples: xp_needed(3) should be 90."
                        assert same_output(output, expected_output), "print(xp_needed(5))"
                    `,
                    hints: ['return level * level * 10'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Spec as tests',
                    prompt: 'Turn this spec into asserts: "`greet(name)` returns `Hi, <name>!`. greet("Kai") is "Hi, Kai!" and greet("") is "Hi, !"". Bolt\'s greet is already written. Write your 2 asserts, then print `Spec checked`.',
                    starter: py`
                        def greet(name):
                            return "Hi, " + name + "!"

                        # Your asserts here:
                    `,
                    solution: py`
                        def greet(name):
                            return "Hi, " + name + "!"

                        assert greet("Kai") == "Hi, Kai!"
                        assert greet("") == "Hi, !"
                        print("Spec checked")
                    `,
                    check: py`
                        assert source.count("assert greet(") >= 2, "Write the two examples as asserts."
                        assert same_output(output, expected_output), "Print Spec checked."
                    `,
                    hints: ['assert greet("Kai") == "Hi, Kai!"'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Examples Are Tests',
            panels: [
                {
                    scene: 'room',
                    alt: 'Py shows that each example in a spec is really a test.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'kai', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Every example in a spec is a test in disguise. Write them as asserts and check Bolt\'s code automatically!' }],
                },
                {
                    scene: 'room',
                    alt: 'Bolt\'s function fails an edge-case example; Bolt looks sheepish.',
                    cast: [
                        { who: 'bolt', pose: 'sad', x: 30 },
                        { who: 'kai', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'bolt', text: 'My code passed the easy examples, but the edge case caught me. Good spec!' }],
                },
                {
                    scene: 'castle',
                    alt: 'Kai holds a finished spec card like a treasure map.',
                    cast: [{ who: 'kai', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'kai', text: 'Clear specs + tests = robot helpers that actually help.' }],
                },
                {
                    scene: 'room',
                    alt: 'Py copies examples from a spec card straight into asserts.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'kai', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Copy each example straight into an assert.' },
                        { who: 'kai', text: 'Both examples pass!' },
                    ],
                    code: py`
                        def stars(n):
                            return "*" * n

                        assert stars(3) == "***"
                        assert stars(0) == ""
                        print("Spec examples pass!")
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Kai scratches his head at a spec that just says "returns a big number".',
                    cast: [
                        { who: 'kai', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: '"Returns a big number." How do I test that?' },
                        { who: 'py', text: 'You can\'t! Good examples have EXACT answers.' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Kai, Py and Bolt watch every test on the screen turn green.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'kai', pose: 'happy', x: 52 },
                        { who: 'bolt', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Spec, then examples, then asserts, then run them on Bolt\'s code. A failing test means fix the code, or fix the spec if it was unclear.' },
                        { who: 'bolt', text: 'All green. Beep boop!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Check the Robot',
            problems: [
                {
                    id: 'q5',
                    type: 'breakit',
                    title: 'Empty bag',
                    prompt: 'Spec: "count_items(bag) returns how many items, and 0 for an empty bag." Find the bag that breaks Bolt\'s version.',
                    robot: py`
                        def count_items(bag):
                            return bag[0] and len(bag)

                        print(count_items(bag))
                    `,
                    correct: py`
                        def count_items(bag):
                            return len(bag)

                        print(count_items(bag))
                    `,
                    inputName: 'bag',
                    choices: ['["potion", "key"]', '[]', '["map"]'],
                    answer: '[]',
                    hints: ['The spec mentions an edge case. Try it!'],
                },
                {
                    id: 'q6',
                    type: 'fix',
                    title: 'Follow the spec',
                    prompt: 'Spec: "`rank(score)` returns \'gold\' for 90+, \'silver\' for 70+, otherwise \'bronze\'." Bolt\'s version fails the spec\'s examples. Fix it!',
                    starter: py`
                        def rank(score):
                            if score > 90:
                                return "gold"
                            elif score > 70:
                                return "silver"
                            return "bronze"

                        assert rank(95) == "gold"
                        assert rank(90) == "gold"
                        assert rank(70) == "silver"
                        assert rank(10) == "bronze"
                        print("Spec passed")
                    `,
                    solution: py`
                        def rank(score):
                            if score >= 90:
                                return "gold"
                            elif score >= 70:
                                return "silver"
                            return "bronze"

                        assert rank(95) == "gold"
                        assert rank(90) == "gold"
                        assert rank(70) == "silver"
                        assert rank(10) == "bronze"
                        print("Spec passed")
                    `,
                    check: py`
                        assert source.count("assert rank") >= 4, "Keep the spec's tests."
                        assert same_output(output, expected_output), "All the spec tests should pass."
                    `,
                    hints: ['"90+" includes 90.'],
                },
                {
                    id: 'q7',
                    type: 'instruct',
                    title: 'Edge cases in the spec',
                    prompt: 'Which spec makes Bolt handle the empty list correctly?',
                    goalCode: py`
                        def average(nums):
                            if len(nums) == 0:
                                return 0
                            return sum(nums) / len(nums)

                        print(average([4, 6]))
                        print(average([]))
                    `,
                    choices: [
                        { text: 'average(nums) returns the average of the numbers.', code: py`
                            def average(nums):
                                return sum(nums) / len(nums)

                            print(average([4, 6]))
                            print(average([]))
                        ` },
                        { text: 'average(nums) returns the average, and 0 for an empty list. average([4, 6]) is 5.0.', code: py`
                            def average(nums):
                                if len(nums) == 0:
                                    return 0
                                return sum(nums) / len(nums)

                            print(average([4, 6]))
                            print(average([]))
                        ` },
                    ],
                    answer: 1,
                    hints: ['Which spec mentions the empty list?'],
                },
                {
                    id: 'q8',
                    type: 'trace',
                    title: 'Trace Bolt\'s code',
                    prompt: 'Before trusting Bolt\'s `total_gold`, trace it. What is `total` each time line 4 finishes?',
                    code: py`
                        def total_gold(chests):
                            total = 0
                            for c in chests:
                                total += c
                            return total

                        total_gold([5, 10, 20])
                    `,
                    line: 4,
                    columns: ['total'],
                    rows: [['5'], ['15'], ['35']],
                    hints: ['Add each chest to the total.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Spec to code',
                    prompt: 'Spec: "`level_name(level)` returns \'beginner\' for levels below 5, \'hero\' for 5 to 9, and \'legend\' for 10 or more." Write it and print level_name(4), level_name(5) and level_name(10).',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def level_name(level):
                            if level < 5:
                                return "beginner"
                            elif level < 10:
                                return "hero"
                            return "legend"

                        print(level_name(4))
                        print(level_name(5))
                        print(level_name(10))
                    `,
                    check: py`
                        f = function("level_name")
                        assert f(0) == "beginner" and f(9) == "hero" and f(99) == "legend", "Check every part of the spec, especially the edges."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['if level < 5 ... elif level < 10 ... else ...'],
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
                    type: 'instruct',
                    title: 'Exact spec',
                    prompt: 'Which spec gets Bolt to produce the goal output?',
                    goalCode: py`
                        def shout(text):
                            return text.upper() + "!"

                        print(shout("charge"))
                    `,
                    choices: [
                        { text: 'shout(text) makes text louder.', code: py`
                            def shout(text):
                                return text + "!!!"

                            print(shout("charge"))
                        ` },
                        { text: 'shout(text) returns the text in capitals with one "!" added. shout("hi") is "HI!".', code: py`
                            def shout(text):
                                return text.upper() + "!"

                            print(shout("charge"))
                        ` },
                    ],
                    answer: 1,
                    hints: ['Which one has an exact example?'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Negative gold',
                    prompt: 'Spec: "spend(gold, cost) returns the gold left, or the original gold if you can\'t afford it." Find the cost that breaks Bolt\'s code (you have 10 gold).',
                    robot: py`
                        def spend(gold, cost):
                            return gold - cost

                        print(spend(10, cost))
                    `,
                    correct: py`
                        def spend(gold, cost):
                            if cost > gold:
                                return gold
                            return gold - cost

                        print(spend(10, cost))
                    `,
                    inputName: 'cost',
                    choices: ['4', '10', '25'],
                    answer: '25',
                    hints: ['What if you can\'t afford it?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Spec + tests + code',
                    prompt: 'Spec: "`loot_split(gold, heroes)` returns how much gold each hero gets (whole coins only), and 0 if there are no heroes." Write at least 3 asserts from the spec (include the edge case!), then the function so they pass. Print `Ready to share`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def loot_split(gold, heroes):
                            if heroes == 0:
                                return 0
                            return gold // heroes

                        assert loot_split(100, 4) == 25
                        assert loot_split(10, 3) == 3
                        assert loot_split(50, 0) == 0
                        print("Ready to share")
                    `,
                    check: py`
                        f = function("loot_split")
                        assert f(9, 2) == 4, "loot_split(9, 2) should be 4 (whole coins only)."
                        assert f(7, 0) == 0, "No heroes means 0."
                        assert f(12, 3) == 4, "loot_split(12, 3) should be 4."
                        assert source.count("assert") >= 3, "Write at least 3 asserts."
                        assert same_output(output, expected_output), "Print Ready to share."
                    `,
                    hints: ['Whole coins: use //.', 'Check for 0 heroes first, or you\'ll divide by zero!'],
                },
            ],
        },
    ],
};
