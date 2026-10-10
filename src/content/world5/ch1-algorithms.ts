import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch1: Chapter = {
    id: 'ch1',
    title: 'Algorithms',
    emoji: '⏱️',
    summary: 'An algorithm is a recipe. Count its steps to see which recipe is faster.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Recipes for Computers',
            panels: [
                {
                    scene: 'space',
                    alt: 'Nova and Zork float past a thousand boxes in space.',
                    wide: true,
                    cast: [
                        { who: 'nova', pose: 'surprised', x: 22 },
                        { who: 'zork', pose: 'happy', x: 45 },
                        { who: 'py', pose: 'talk', x: 78, flip: true },
                    ],
                    bubbles: [
                        { who: 'nova', text: 'There are a thousand boxes and one has the star gem. Where do we start?' },
                        { who: 'py', text: 'With an algorithm: a step-by-step recipe. And some recipes are MUCH faster than others.' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py adds a step counter to a loop.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'To compare recipes, count the steps. Add 1 to a counter every time the loop does work.' }],
                    code: py`
                        total = 0
                        steps = 0
                        for n in range(1, 21):
                            total += n
                            steps += 1
                        print("Total:", total, "Steps:", steps)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork solves the same sum with one clever line.',
                    cast: [
                        { who: 'zork', pose: 'point', x: 30 },
                        { who: 'nova', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'zork', text: 'Same answer in ONE step: 1 + 2 + ... + n is n × (n + 1) ÷ 2. A smarter recipe!' }],
                    code: py`
                        n = 20
                        print("Total:", n * (n + 1) // 2, "Steps: 1")
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Nova opens boxes one at a time; the gem is in the very last one.',
                    cast: [
                        { who: 'nova', pose: 'sad', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'nova', text: 'I opened boxes one by one. The gem was in the LAST box!' },
                        { who: 'py', text: 'Worst case: 1000 boxes means 1000 steps.' },
                    ],
                    code: py`
                        steps = 0
                        for box in range(1, 1001):
                            steps += 1
                            if box == 1000:
                                break
                        print("Steps:", steps)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Zork stares at a step counter stuck on 1.',
                    cast: [
                        { who: 'zork', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'zork', text: 'My counter says 1 step for 50 numbers?' },
                        { who: 'py', text: 'steps += 1 is outside the loop. Push it in!' },
                    ],
                    code: py`
                        steps = 0
                        for n in range(50):
                            total = n
                        steps += 1
                        print("Steps:", steps)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Two recipe cards float side by side: a long one and a tiny one.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'nova', pose: 'happy', x: 52 },
                        { who: 'zork', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'An algorithm is a recipe. Count the steps to compare recipes: the same answer can take 1000 steps, or just 1.' },
                        { who: 'nova', text: 'A smart recipe beats a fast computer!' },
                    ],
                    code: py`
                        n = 1000
                        print("Loop recipe:", n, "steps")
                        print("Formula recipe: 1 step")
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Count the Steps',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Loop in a loop',
                    prompt: 'How many steps does this take?',
                    code: py`
                        steps = 0
                        for i in range(5):
                            for j in range(5):
                                steps += 1
                        print(steps)
                    `,
                    choices: ['10', '25', '5'],
                    answer: '25',
                    hints: ['The inner loop runs 5 times for each of the 5 outer turns.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    title: 'Shortcut sum',
                    prompt: 'What will this code print?',
                    code: py`print(10 * 11 // 2)`,
                    choices: ['55', '110', '50'],
                    answer: '55',
                    hints: ['110 // 2'],
                },
                {
                    id: 'p3',
                    type: 'write',
                    title: 'Step counter',
                    prompt: 'Add up 1 to 100 with a loop, counting the steps as you go. Print the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        total = 0
                        steps = 0
                        for n in range(1, 101):
                            total += n
                            steps += 1
                        print("Total:", total)
                        print("Steps:", steps)
                    `,
                    check: py`
                        assert "for" in source, "Use a loop (the slow recipe) so there are steps to count."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['Two counters: total += n and steps += 1.'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    about: 'meaning',
                    title: 'How does it grow?',
                    prompt: 'If n doubles, what happens to the number of steps here?',
                    code: py`
                        n = 10
                        steps = 0
                        for i in range(n):
                            for j in range(n):
                                steps += 1
                        print(steps)
                    `,
                    choices: ['It doubles.', 'It becomes about 4 times bigger.', 'It stays the same.'],
                    answer: 'It becomes about 4 times bigger.',
                    hints: ['Steps are n × n. Try n = 10 and n = 20.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: One-step sum',
                    prompt: 'Write `def sum_to(n):` that returns 1 + 2 + ... + n WITHOUT a loop, using the shortcut `n * (n + 1) // 2`. Print `sum_to(100)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def sum_to(n):
                            return n * (n + 1) // 2

                        print(sum_to(100))
                    `,
                    check: py`
                        f = function("sum_to")
                        for n in [0, 1, 7, 50]:
                            assert f(n) == sum(range(n + 1)), f"sum_to({n}) should be {sum(range(n + 1))}."
                        assert "for" not in source and "while" not in source, "No loops: use the one-step shortcut."
                        assert same_output(output, expected_output), "print(sum_to(100))"
                    `,
                    hints: ['return n * (n + 1) // 2'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Faster or Slower',
            panels: [
                {
                    scene: 'space',
                    alt: 'Py halves a pile of boxes again and again.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'nova', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Some recipes cut the problem in HALF each step. 500 → 250 → 125... only a handful of steps!' },
                        { who: 'nova', text: 'Halving shrinks things FAST.' },
                    ],
                    code: py`
                        n = 500
                        steps = 0
                        while n > 1:
                            n = n // 2
                            steps += 1
                        print("Steps:", steps)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A chart shows three lines growing at different speeds.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'Halving: tiny growth. One loop: grows like n. Loop in a loop: grows like n × n. That\'s HUGE for big n!' },
                    ],
                },
                {
                    scene: 'space',
                    alt: 'Zork checks for repeated star gems two different ways.',
                    cast: [
                        { who: 'zork', pose: 'think', x: 30 },
                        { who: 'nova', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'nova', text: 'Finding duplicates: comparing every pair is slow. Remembering what you\'ve seen in a dictionary is fast!' }],
                    code: py`
                        gems = ["ruby", "opal", "jade", "opal"]
                        seen = {}
                        for g in gems:
                            if g in seen:
                                print("Duplicate:", g)
                            seen[g] = True
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A step counter spins faster and faster as n grows.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'nova', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Loop in a loop: watch n × n explode.' },
                        { who: 'nova', text: 'A million steps for n = 1000!' },
                    ],
                    code: py`
                        for n in [10, 100, 1000]:
                            print(n, "->", n * n, "steps")
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork pushes a shiny new computer. Py shakes its head.',
                    cast: [
                        { who: 'zork', pose: 'happy', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'zork', text: 'Easy fix: buy a faster computer!' },
                        { who: 'py', text: 'A million times a million is still too slow. Better recipes win.' },
                    ],
                    code: py`
                        n = 1000000
                        print(n * n, "steps")
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Three rockets race: halving, one loop, and loop-in-a-loop.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'nova', pose: 'happy', x: 52 },
                        { who: 'zork', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Halving is fastest, one loop is fine, and loop-in-a-loop gets slow for big n. Remembering things in a dictionary can turn slow into fast.' },
                        { who: 'nova', text: 'Count the steps, pick the smart recipe!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Smarter Recipes',
            problems: [
                {
                    id: 'p5',
                    type: 'trace',
                    title: 'Doubling',
                    prompt: 'Fill in `n` and `steps` each time line 5 finishes.',
                    code: py`
                        n = 1
                        steps = 0
                        while n < 16:
                            n *= 2
                            steps += 1
                    `,
                    line: 5,
                    columns: ['n', 'steps'],
                    rows: [['2', '1'], ['4', '2'], ['8', '3'], ['16', '4']],
                    hints: ['n doubles each time; steps goes up by 1.'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    title: 'Halve it',
                    prompt: 'What will this code print?',
                    code: py`
                        n = 64
                        count = 0
                        while n > 1:
                            n //= 2
                            count += 1
                        print(count)
                    `,
                    choices: ['6', '32', '8'],
                    answer: '6',
                    hints: ['64 → 32 → 16 → 8 → 4 → 2 → 1'],
                },
                {
                    id: 'p7',
                    type: 'write',
                    title: 'Every pair',
                    prompt: 'Write `def has_duplicate(items):` that compares every pair of positions (a loop in a loop) and returns True if any two items are equal, otherwise False.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def has_duplicate(items):
                            for i in range(len(items)):
                                for j in range(i + 1, len(items)):
                                    if items[i] == items[j]:
                                        return True
                            return False

                        print(has_duplicate(["ruby", "opal", "ruby"]))
                    `,
                    check: py`
                        f = function("has_duplicate")
                        assert f([1, 2, 3]) is False and f([1, 2, 1]) is True and f([]) is False, "Check: no duplicates, a duplicate, and an empty list."
                        assert f([5, 5]) is True, "Two equal items next to each other count too."
                    `,
                    hints: ['for i in range(len(items)): for j in range(i + 1, len(items)):', 'Don\'t compare an item with itself (that\'s why j starts at i + 1).'],
                },
                {
                    id: 'p8',
                    type: 'fill',
                    title: 'Thirty-six',
                    prompt: 'What n makes this loop-in-a-loop take exactly 36 steps?',
                    template: py`
                        n = ___
                        steps = 0
                        for i in range(n):
                            for j in range(n):
                                steps += 1
                        print(steps)
                    `,
                    answers: ['6'],
                    hints: ['n × n = 36'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Fast duplicates',
                    prompt: 'Write `def has_duplicate_fast(items):` that uses ONE loop and a `seen` dictionary: return True as soon as you see an item twice.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def has_duplicate_fast(items):
                            seen = {}
                            for item in items:
                                if item in seen:
                                    return True
                                seen[item] = True
                            return False

                        print(has_duplicate_fast(["ruby", "opal", "ruby"]))
                    `,
                    check: py`
                        f = function("has_duplicate_fast")
                        assert f([1, 2, 3]) is False and f([1, 2, 1]) is True and f([]) is False, "Check: no duplicates, a duplicate, and an empty list."
                        assert source.count("for ") == 1, "Use just ONE loop."
                    `,
                    hints: ['seen = {}', 'if item in seen: return True, then seen[item] = True'],
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
                    title: 'Halving a thousand',
                    prompt: 'What will this code print?',
                    code: py`
                        n = 1000
                        count = 0
                        while n > 1:
                            n //= 2
                            count += 1
                        print(count)
                    `,
                    choices: ['9', '500', '100'],
                    answer: '9',
                    hints: ['1000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Shortcut slip',
                    prompt: 'Bolt\'s shortcut for 1 + 2 + ... + n has a tiny mistake. Find the n that shows it.',
                    robot: py`print(n * (n - 1) // 2)`,
                    correct: py`print(n * (n + 1) // 2)`,
                    inputName: 'n',
                    choices: ['0', '1'],
                    answer: '1',
                    hints: ['The sum up to 1 should be 1.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Search cost',
                    prompt: 'Write `def search_steps(items, target):` that checks items one by one and returns how many checks it took to find target, or len(items) if it\'s not there. Print the results for target 73 and target 500 in `list(range(1, 101))`.',
                    starter: py`numbers = list(range(1, 101))`,
                    solution: py`
                        numbers = list(range(1, 101))

                        def search_steps(items, target):
                            steps = 0
                            for item in items:
                                steps += 1
                                if item == target:
                                    return steps
                            return len(items)

                        print(search_steps(numbers, 73))
                        print(search_steps(numbers, 500))
                    `,
                    check: py`
                        f = function("search_steps")
                        assert f([4, 8, 15], 4) == 1, "Finding the first item takes 1 check."
                        assert f([4, 8, 15], 15) == 3, "Finding the last of 3 items takes 3 checks."
                        assert f([4, 8, 15], 99) == 3, "A missing item takes len(items) checks."
                        assert same_output(output, expected_output), "Print the steps for 73 and for 500."
                    `,
                    hints: ['Count a step for each item you look at.', 'Return as soon as you find it; return len(items) after the loop.'],
                },
            ],
        },
    ],
};
