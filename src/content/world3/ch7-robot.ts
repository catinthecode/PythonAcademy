import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch7: Chapter = {
    id: 'ch7',
    title: "Bolt's Mystery Code",
    emoji: '🤖',
    summary: 'Read code you didn\'t write: guess, trace, explain, and only then trust it.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Read Before You Run',
            panels: [
                {
                    scene: 'room',
                    alt: 'Bolt hands Bix a scroll of code.',
                    wide: true,
                    cast: [
                        { who: 'bolt', pose: 'happy', x: 28 },
                        { who: 'bix', pose: 'think', x: 72, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 50, y: 100 }],
                    bubbles: [
                        { who: 'bolt', text: 'Here\'s some code I wrote for you. Just run it, it\'s fine!' },
                        { who: 'bix', text: 'Hmm. I should understand it first.' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py lists three steps for reading code.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'Reading code: 1) guess from the names, 2) trace it with a small example, 3) run it and compare.' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Bix fills in a trace table on paper.',
                    cast: [
                        { who: 'bix', pose: 'point', x: 30 },
                        { who: 'py', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'bix', text: 'A trace table: write each variable\'s value as the code runs, line by line.' }],
                    code: py`
                        x = [3, 7, 2]
                        y = 0
                        for z in x:
                            y += z
                        print(y)
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Decode It',
            problems: [
                {
                    id: 'q1',
                    type: 'predict',
                    about: 'meaning',
                    title: 'Bad names',
                    prompt: 'What does Bolt\'s code do?',
                    code: py`
                        x = [3, 7, 2]
                        y = 0
                        for z in x:
                            y += z
                        print(y)
                    `,
                    choices: ['It adds up all the numbers in the list.', 'It finds the biggest number.', 'It counts how many numbers there are.'],
                    answer: 'It adds up all the numbers in the list.',
                    hints: ['y starts at 0 and each z is added to it. Which pattern is that?'],
                },
                {
                    id: 'q2',
                    type: 'trace',
                    title: 'Mystery letters',
                    prompt: 'Trace Bolt\'s code: what is `r` each time line 3 finishes?',
                    code: py`
                        r = ""
                        for c in "abc":
                            r = c + r
                    `,
                    line: 3,
                    columns: ['r'],
                    rows: [['a'], ['ba'], ['cba']],
                    hints: ['Each new letter goes in FRONT of r.'],
                },
                {
                    id: 'q3',
                    type: 'predict',
                    title: 'What gets counted?',
                    prompt: 'What will this code print?',
                    code: py`
                        n = 0
                        for w in ["sky", "park", "go"]:
                            if len(w) > 2:
                                n += 1
                        print(n)
                    `,
                    choices: ['1', '2', '3'],
                    answer: '2',
                    hints: ['Which words have more than 2 letters?'],
                },
                {
                    id: 'q4',
                    type: 'predict',
                    about: 'meaning',
                    title: 'Crown',
                    prompt: 'What does this code do?',
                    code: py`
                        a = [4, 11, 6]
                        b = a[0]
                        for c in a:
                            if c > b:
                                b = c
                        print(b)
                    `,
                    choices: ['It finds the biggest number.', 'It finds the smallest number.', 'It adds the numbers.'],
                    answer: 'It finds the biggest number.',
                    hints: ['b only changes when it finds something BIGGER.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Rename it',
                    prompt: 'Rewrite Bolt\'s code (x, y, z) with clear names: `scores`, `total` and `score`. It should still print 12.',
                    starter: py`
                        x = [3, 7, 2]
                        y = 0
                        for z in x:
                            y += z
                        print(y)
                    `,
                    solution: py`
                        scores = [3, 7, 2]
                        total = 0
                        for score in scores:
                            total += score
                        print(total)
                    `,
                    check: py`
                        assert "scores" in source and "total" in source and "for score in scores" in source, "Use the names scores, total and score."
                        assert "x =" not in source and "y =" not in source, "Get rid of the old names x and y."
                        assert same_output(output, expected_output), "It should still print 12."
                    `,
                    hints: ['scores = [3, 7, 2], total = 0, for score in scores:'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Spot the Mystery Bug',
            panels: [
                {
                    scene: 'room',
                    alt: 'Bolt shrugs at its own confusing variable names.',
                    cast: [
                        { who: 'bolt', pose: 'think', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Names like x, y, z make code hard to read. When an AI helps you, ask for clear names!' },
                    ],
                },
                {
                    scene: 'sky',
                    alt: 'Glitch hides a bug inside a loop.',
                    cast: [
                        { who: 'glitch', pose: 'happy', x: 30 },
                        { who: 'bix', pose: 'surprised', x: 72, flip: true },
                    ],
                    props: [{ item: 'bug', x: 52, y: 100 }],
                    bubbles: [{ who: 'glitch', text: 'Code can LOOK right and still be wrong. Test it with different inputs!' }],
                },
                {
                    scene: 'room',
                    alt: 'Bix explains the code out loud in plain words.',
                    cast: [{ who: 'bix', pose: 'talk', x: 40 }],
                    bubbles: [{ who: 'bix', text: 'If I can explain it in plain words, I understand it. If not, I trace it again.' }],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Trust but Test',
            problems: [
                {
                    id: 'q5',
                    type: 'breakit',
                    title: 'Average of three',
                    prompt: 'Bolt\'s code should find the average of ANY list. Find a list that breaks it.',
                    robot: py`print(sum(nums) / 3)`,
                    correct: py`print(sum(nums) / len(nums))`,
                    inputName: 'nums',
                    choices: ['[3, 6, 9]', '[2, 4]', '[1, 1, 1]'],
                    answer: '[2, 4]',
                    hints: ['Bolt always divides by 3. When is that wrong?'],
                },
                {
                    id: 'q6',
                    type: 'trace',
                    title: 'Number chain',
                    prompt: 'Trace Bolt\'s mystery code: what are `a` and `b` each time line 6 finishes?',
                    code: py`
                        a = 0
                        b = 1
                        for i in range(4):
                            c = a + b
                            a = b
                            b = c
                    `,
                    line: 6,
                    columns: ['a', 'b'],
                    rows: [['1', '1'], ['1', '2'], ['2', '3'], ['3', '5']],
                    hints: ['Each time: c is a + b, then a takes b\'s old value, and b takes c.'],
                },
                {
                    id: 'q7',
                    type: 'instruct',
                    title: 'Long words only',
                    prompt: 'Which instruction makes Bolt print the 🎯 Goal?',
                    goalCode: py`
                        words = ["sky", "brick", "park", "go"]
                        for w in words:
                            if len(w) > 3:
                                print(w)
                    `,
                    choices: [
                        { text: 'Print the words.', code: py`
                            words = ["sky", "brick", "park", "go"]
                            for w in words:
                                print(w)
                        ` },
                        { text: 'Print long words.', code: py`
                            words = ["sky", "brick", "park", "go"]
                            for w in words:
                                if len(w) > 4:
                                    print(w)
                        ` },
                        { text: 'Print the words that have more than 3 letters.', code: py`
                            words = ["sky", "brick", "park", "go"]
                            for w in words:
                                if len(w) > 3:
                                    print(w)
                        ` },
                    ],
                    answer: 2,
                    hints: ['"Long" means different things to different people. Numbers are exact.'],
                },
                {
                    id: 'q8',
                    type: 'fix',
                    title: 'Reset trap',
                    prompt: 'Bolt\'s vowel counter always prints 0 or 1. Find the bug and fix it so it prints 3 for "hello world".',
                    starter: py`
                        for letter in "hello world":
                            count = 0
                            if letter in "aeiou":
                                count += 1
                        print(count)
                    `,
                    solution: py`
                        count = 0
                        for letter in "hello world":
                            if letter in "aeiou":
                                count += 1
                        print(count)
                    `,
                    hints: ['count is set back to 0 every time around the loop.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: English to code',
                    prompt: 'Turn this sentence into code: "Make `nums = [3, 8, 5, 10, 7]` and print only the even numbers, one per line."',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        nums = [3, 8, 5, 10, 7]
                        for n in nums:
                            if n % 2 == 0:
                                print(n)
                    `,
                    check: py`
                        assert "for" in source and "%" in source, "Loop over the numbers and use % 2 to spot evens."
                        assert same_output(output, expected_output), "Only 8 and 10 are even."
                    `,
                    hints: ['for n in nums: if n % 2 == 0: print(n)'],
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
                    about: 'meaning',
                    title: 'B words',
                    prompt: 'What does this code do?',
                    code: py`
                        k = 0
                        for q in ["bix", "bolt", "glitch"]:
                            if q[0] == "b":
                                k += 1
                        print(k)
                    `,
                    choices: ['It counts the words that start with b.', 'It counts all the words.', 'It prints the words starting with b.'],
                    answer: 'It counts the words that start with b.',
                    hints: ['q[0] is the first letter of each word, and k counts.'],
                },
                {
                    id: 't2',
                    type: 'trace',
                    title: 'Multiply up',
                    prompt: 'What is `total` each time line 3 finishes?',
                    code: py`
                        total = 1
                        for n in [2, 3, 4]:
                            total *= n
                    `,
                    line: 3,
                    columns: ['total'],
                    rows: [['2'], ['6'], ['24']],
                    hints: ['total *= n means total = total * n.'],
                },
                {
                    id: 'boss',
                    type: 'fix',
                    boss: true,
                    title: "BOSS: Bolt's best player",
                    prompt: 'Bolt\'s code should print the player with the BEST score, but it has TWO bugs. Read it carefully, then fix both.',
                    starter: py`
                        names = ["Bix", "Glitch", "Bolt"]
                        scores = [30, 40, 25]
                        best = 0
                        for i in range(len(scores)):
                            if scores[i] < scores[best]:
                                best = i
                        print("Best:", names[i], "with", scores[best])
                    `,
                    solution: py`
                        names = ["Bix", "Glitch", "Bolt"]
                        scores = [30, 40, 25]
                        best = 0
                        for i in range(len(scores)):
                            if scores[i] > scores[best]:
                                best = i
                        print("Best:", names[best], "with", scores[best])
                    `,
                    check: py`
                        assert "> scores[best]" in source, "The comparison should look for a BIGGER score."
                        assert "names[best]" in source, "After the loop, print the name at the BEST position."
                        assert same_output(output, expected_output), "Glitch has the best score."
                    `,
                    hints: ['Is the comparison looking for bigger or smaller?', 'After the loop, i is just the LAST position. Which variable remembers the best one?'],
                },
            ],
        },
    ],
};
