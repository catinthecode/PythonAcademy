import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch3: Chapter = {
    id: 'ch3',
    title: 'Loop Patterns',
    emoji: '🔁',
    summary: 'Loop over lists to count, total and find the biggest: patterns you\'ll use forever.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Loop Over a List',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Bix points at each brick in a row, one at a time.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'point', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'A for loop can walk through a list, one item at a time. brick holds each item in turn.' },
                    ],
                    code: py`
                        bricks = ["red", "blue", "green"]
                        for brick in bricks:
                            print("Placing", brick)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py adds coins to a running total.',
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'bix', pose: 'think', x: 72, flip: true },
                    ],
                    props: [{ item: 'coin', x: 52, y: 100 }],
                    bubbles: [{ who: 'py', text: 'The TOTAL pattern: start at 0, add each item.' }],
                    code: py`
                        scores = [2, 9, 4]
                        total = 0
                        for s in scores:
                            total += s
                        print("Total:", total)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Bix makes a tally mark for every big score.',
                    cast: [{ who: 'bix', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'bix', text: 'The COUNT pattern: start at 0, add 1 every time something is true.' }],
                    code: py`
                        scores = [3, 8, 6, 10]
                        count = 0
                        for s in scores:
                            if s > 5:
                                count += 1
                        print("Big scores:", count)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix holds up a brick instead of a position number.',
                    cast: [
                        { who: 'bix', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'Do I still need [0], [1], [2]?' },
                        { who: 'py', text: 'No! brick IS the item itself, not its position.' },
                    ],
                    code: py`
                        bricks = ["red", "blue", "green"]
                        for brick in bricks:
                            print(brick, len(brick))
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Glitch made a tally mark for every score, even the small ones.',
                    cast: [
                        { who: 'glitch', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'It counted 4, but only 2 scores are big!' },
                        { who: 'py', text: 'count += 1 must be INSIDE the if. Push it in further.' },
                    ],
                    code: py`
                        scores = [3, 8, 6, 2]
                        count = 0
                        for s in scores:
                            if s > 5:
                                print("Big one!")
                            count += 1
                        print("Big scores:", count)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Py holds two signs, TOTAL and COUNT. Bix copies them into a notebook.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'bix', pose: 'happy', x: 75, flip: true },
                    ],
                    props: [{ item: 'sign', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'TOTAL adds every item. COUNT adds 1 only when something is true. Both start at 0, BEFORE the loop.' },
                        { who: 'bix', text: 'Two patterns I will use forever!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Count and Total',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Shout the colours',
                    prompt: 'What will this code print?',
                    code: py`
                        for c in ["red", "blue"]:
                            print(c.upper())
                    `,
                    choices: ['RED\nBLUE', 'red\nblue', 'RED BLUE'],
                    answer: 'RED\nBLUE',
                    hints: ['Each item gets its own print.'],
                },
                {
                    id: 'p2',
                    type: 'trace',
                    title: 'Running total',
                    prompt: 'Fill in `s` and `total` each time line 3 finishes.',
                    code: py`
                        total = 0
                        for s in [3, 5, 2]:
                            total += s
                    `,
                    line: 3,
                    columns: ['s', 'total'],
                    rows: [['3', '3'], ['5', '8'], ['2', '10']],
                    hints: ['Each time, add the new s to the old total.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Count the evens',
                    prompt: 'What will this code print?',
                    code: py`
                        nums = [1, 2, 3, 4, 6]
                        count = 0
                        for n in nums:
                            if n % 2 == 0:
                                count += 1
                        print(count)
                    `,
                    choices: ['2', '3', '5'],
                    answer: '3',
                    hints: ['Which of 1, 2, 3, 4, 6 are even?'],
                },
                {
                    id: 'p4',
                    type: 'fix',
                    title: 'Forgetful total',
                    prompt: 'This should add up all the scores (15), but it only gets the last one. Fix it!',
                    starter: py`
                        scores = [4, 5, 6]
                        for s in scores:
                            total = 0
                            total += s
                        print(total)
                    `,
                    solution: py`
                        scores = [4, 5, 6]
                        total = 0
                        for s in scores:
                            total += s
                        print(total)
                    `,
                    hints: ['total = 0 runs every time around the loop, wiping the total.', 'Move total = 0 above the loop.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Add them up',
                    prompt: 'Make `scores = [7, 3, 9, 4]`. Use the total pattern (no `sum()`!) and print `Total:` and the total.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        scores = [7, 3, 9, 4]
                        total = 0
                        for s in scores:
                            total += s
                        print("Total:", total)
                    `,
                    check: py`
                        assert "for" in source and "sum(" not in source, "Use a for loop, not sum()."
                        assert same_output(output, expected_output), "The total should be 23."
                    `,
                    hints: ['total = 0 before the loop, total += s inside it.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Biggest and Smallest',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Py holds a crown over the best score so far.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'bix', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'The BIGGEST pattern: remember the best so far. If you find a bigger one, it becomes the new best.' },
                    ],
                    code: py`
                        scores = [4, 11, 7]
                        best = scores[0]
                        for s in scores:
                            if s > best:
                                best = s
                        print("Best:", best)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Glitch shows shortcut buttons: sum, max, min.',
                    cast: [
                        { who: 'glitch', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'Python has shortcuts: sum(), max(), min()!' },
                        { who: 'py', text: 'True! But patterns can do more, like counting only BIG scores.' },
                    ],
                    code: py`
                        scores = [3, 8, 5]
                        print(sum(scores), max(scores), min(scores))
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Bix divides the total by how many scores there are.',
                    cast: [{ who: 'bix', pose: 'point', x: 40 }],
                    bubbles: [{ who: 'bix', text: 'Average = total ÷ how many. That\'s total / len(scores).' }],
                    code: py`
                        scores = [3, 6, 9]
                        print("Average:", sum(scores) / len(scores))
                    `,
                },
                {
                    scene: 'village',
                    alt: 'A podium with three names. Py places a crown on the winner.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'bix', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Track TWO things: the best score, and who got it.' },
                        { who: 'bix', text: 'Glitch wins with 9!' },
                    ],
                    code: py`
                        names = ["Bix", "Glitch", "Bolt"]
                        scores = [7, 9, 4]
                        best = scores[0]
                        winner = names[0]
                        for i in range(len(scores)):
                            if scores[i] > best:
                                best = scores[i]
                                winner = names[i]
                        print(winner, best)
                    `,
                },
                {
                    scene: 'circuit',
                    alt: 'Glitch tries to average an empty list and the screen flashes red.',
                    cast: [
                        { who: 'glitch', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'The average of NO scores... CRASH!' },
                        { who: 'py', text: 'len is 0, and nothing divides by 0. Check first!' },
                    ],
                    code: py`
                        scores = []
                        print(sum(scores) / len(scores))
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bix and Glitch hold up trophies for biggest and smallest.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 20 },
                        { who: 'bix', pose: 'happy', x: 55 },
                        { who: 'glitch', pose: 'happy', x: 82, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Biggest: start with the FIRST item and keep the best so far. sum, max and min are handy shortcuts.' },
                        { who: 'bix', text: 'And patterns for anything special!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Best and Worst',
            problems: [
                {
                    id: 'p5',
                    type: 'predict',
                    title: 'King of the hill',
                    prompt: 'What will this code print?',
                    code: py`
                        best = 0
                        for s in [3, 8, 5]:
                            if s > best:
                                best = s
                        print(best)
                    `,
                    choices: ['3', '8', '5'],
                    answer: '8',
                    hints: ['best becomes 3, then 8. Is 5 bigger than 8?'],
                },
                {
                    id: 'p6',
                    type: 'breakit',
                    title: 'Starting at zero',
                    prompt: 'Bolt\'s "biggest" code starts with best = 0. Find a list that shows why that\'s a bug!',
                    robot: py`
                        best = 0
                        for s in scores:
                            if s > best:
                                best = s
                        print(best)
                    `,
                    correct: py`
                        best = scores[0]
                        for s in scores:
                            if s > best:
                                best = s
                        print(best)
                    `,
                    inputName: 'scores',
                    choices: ['[3, 8, 5]', '[-4, -2, -9]', '[10]'],
                    answer: '[-4, -2, -9]',
                    hints: ['What if EVERY number is smaller than 0?'],
                },
                {
                    id: 'p7',
                    type: 'write',
                    title: 'Big scores',
                    prompt: 'Make `scores = [7, 3, 9, 4, 5]`. Count how many are 5 or more and print the 🎯 Goal.',
                    starter: py`scores = [7, 3, 9, 4, 5]`,
                    solution: py`
                        scores = [7, 3, 9, 4, 5]
                        count = 0
                        for s in scores:
                            if s >= 5:
                                count += 1
                        print("Big scores:", count)
                    `,
                    check: py`
                        assert "for" in source, "Use the count pattern with a for loop."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['count = 0, then inside the loop: if s >= 5: count += 1'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Average',
                    prompt: 'What will this code print?',
                    code: py`print(sum([2, 4, 6]) / 3)`,
                    choices: ['4', '4.0', '12'],
                    answer: '4.0',
                    hints: ['12 / 3, and / always gives a decimal.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Smallest',
                    prompt: 'Make `scores = [7, 3, 9, 4]`. Find the smallest with a loop (no `min()`!) and print `Smallest:` and the number.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        scores = [7, 3, 9, 4]
                        smallest = scores[0]
                        for s in scores:
                            if s < smallest:
                                smallest = s
                        print("Smallest:", smallest)
                    `,
                    check: py`
                        assert "for" in source and "min(" not in source, "Use the pattern with a loop, not min()."
                        assert same_output(output, expected_output), "The smallest is 3."
                    `,
                    hints: ['Like the biggest pattern, but flip the comparison.', 'smallest = scores[0], then if s < smallest: smallest = s'],
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
                    title: 'Letter total',
                    prompt: 'What will this code print?',
                    code: py`
                        total = 0
                        for w in ["hi", "bye"]:
                            total += len(w)
                        print(total)
                    `,
                    choices: ['2', '5', 'hibye'],
                    answer: '5',
                    hints: ['len("hi") is 2 and len("bye") is 3.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Upside down',
                    prompt: 'This should find the BEST score, but it finds the worst. Fix it!',
                    starter: py`
                        scores = [6, 9, 2]
                        best = scores[0]
                        for s in scores:
                            if s < best:
                                best = s
                        print("Best:", best)
                    `,
                    solution: py`
                        scores = [6, 9, 2]
                        best = scores[0]
                        for s in scores:
                            if s > best:
                                best = s
                        print("Best:", best)
                    `,
                    hints: ['Look at the comparison in the if.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Score report',
                    prompt: 'Make `scores = [12, 7, 25, 18, 3]`. Using loops (no `sum()` or `max()`), print the total, the average and the best score, like the 🎯 Goal.',
                    starter: py`scores = [12, 7, 25, 18, 3]`,
                    solution: py`
                        scores = [12, 7, 25, 18, 3]
                        total = 0
                        best = scores[0]
                        for s in scores:
                            total += s
                            if s > best:
                                best = s
                        print("Total:", total)
                        print("Average:", total / len(scores))
                        print("Best:", best)
                    `,
                    check: py`
                        assert "sum(" not in source and "max(" not in source, "Use the loop patterns, not sum() or max()."
                        assert same_output(output, expected_output), "Match all three goal lines."
                    `,
                    hints: ['One loop can do both: add to total AND check for a new best.', 'Average is total / len(scores).'],
                },
            ],
        },
    ],
};
