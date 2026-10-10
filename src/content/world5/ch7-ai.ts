import { py } from '../helpers';
import type { Chapter } from '../schema';

const LEAP = py`
    def is_leap(year):
        if year % 400 == 0:
            return True
        if year % 100 == 0:
            return False
        return year % 4 == 0
`;

export const ch7: Chapter = {
    id: 'ch7',
    title: 'How AI Helpers Work',
    emoji: '🤖',
    summary: 'AI coding helpers guess likely code. Learn to spec, read, test and steer them, so you stay the captain.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Inside Bolt\'s Head',
            panels: [
                {
                    scene: 'room',
                    alt: 'Bolt opens a panel in its head, full of code snippets.',
                    wide: true,
                    cast: [
                        { who: 'bolt', pose: 'talk', x: 28 },
                        { who: 'nova', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'bolt', text: 'I learned from MILLIONS of programs. When you ask me something, I guess what code usually comes next.' },
                        { who: 'nova', text: 'So you don\'t actually KNOW if it\'s right?' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py shows confident-looking code with a hidden bug.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'AI helpers can be CONFIDENTLY WRONG: the code looks neat and sure of itself, but misses a rule or an edge case.' },
                    ],
                    code: py`
                        def is_leap(year):
                            return year % 4 == 0

                        print(is_leap(2024), is_leap(1900))
                    `,
                },
                {
                    scene: 'room',
                    alt: 'Nova puts on a captain\'s hat; Bolt salutes.',
                    cast: [
                        { who: 'nova', pose: 'happy', x: 30 },
                        { who: 'bolt', pose: 'wave', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'nova', text: '1900 was NOT a leap year! Years divisible by 100 skip it, unless they\'re divisible by 400.' },
                        { who: 'bolt', text: 'You\'re the captain. I\'m the helper. Check my work!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Check the AI',
            problems: [
                {
                    id: 'q1',
                    type: 'breakit',
                    title: 'Leap year',
                    prompt: 'Leap years: divisible by 4, EXCEPT years divisible by 100 aren\'t, UNLESS they\'re divisible by 400. Find the year that breaks Bolt\'s confident code.',
                    robot: py`print(year % 4 == 0)`,
                    correct: LEAP + '\n' + py`print(is_leap(year))`,
                    inputName: 'year',
                    choices: ['2024', '1900', '2023'],
                    answer: '1900',
                    hints: ['Try a year divisible by 100.'],
                },
                {
                    id: 'q2',
                    type: 'instruct',
                    title: 'Prompt with examples',
                    prompt: 'You want Bolt to write a word counter that gives the 🎯 Goal. Which request works?',
                    goalCode: py`
                        def count_words(text):
                            return len(text.split())

                        print(count_words("hello  space   explorers"))
                        print(count_words(""))
                    `,
                    choices: [
                        { text: 'Count the words.', code: py`
                            def count_words(text):
                                return text.count(" ") + 1

                            print(count_words("hello  space   explorers"))
                            print(count_words(""))
                        ` },
                        { text: 'count_words(text) returns how many words there are. Extra spaces don\'t count, and "" has 0 words. Example: count_words("hi  there") is 2.', code: py`
                            def count_words(text):
                                return len(text.split())

                            print(count_words("hello  space   explorers"))
                            print(count_words(""))
                        ` },
                    ],
                    answer: 1,
                    hints: ['Which request mentions the edge cases: extra spaces and empty text?'],
                },
                {
                    id: 'q3',
                    type: 'predict',
                    about: 'meaning',
                    title: 'What did Bolt write?',
                    prompt: 'Bolt wrote this. In plain words, what does it do?',
                    code: py`
                        def f(a):
                            return [x for x in a if x % 2 == 0]

                        print(f([1, 2, 3, 4]))
                    `,
                    choices: ['It keeps only the even numbers from the list.', 'It doubles every number.', 'It counts the even numbers.'],
                    answer: 'It keeps only the even numbers from the list.',
                    hints: ['Run it in your head with [1, 2, 3, 4]: what comes out?'],
                },
                {
                    id: 'q4',
                    type: 'fix',
                    title: 'Off by one',
                    prompt: 'You asked for "a list of the numbers 1 to n". Bolt\'s code misses the last one, a very common AI slip. Fix it.',
                    starter: py`
                        def one_to(n):
                            return list(range(1, n))

                        print(one_to(5))
                    `,
                    solution: py`
                        def one_to(n):
                            return list(range(1, n + 1))

                        print(one_to(5))
                    `,
                    hints: ['range stops BEFORE its second number.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Test the leap years',
                    prompt: 'Here\'s a correct `is_leap`. Write at least 4 asserts that would catch Bolt\'s mistake: include 2024, 2023, 1900 and 2000. Then print `Leap tests passed`.',
                    starter: LEAP + '\n\n# Your asserts here:',
                    solution: LEAP + '\n\n' + py`
                        assert is_leap(2024) == True
                        assert is_leap(2023) == False
                        assert is_leap(1900) == False
                        assert is_leap(2000) == True
                        print("Leap tests passed")
                    `,
                    check: py`
                        assert source.count("assert is_leap(") >= 4, "Write at least 4 asserts."
                        for y in ["1900", "2000"]:
                            assert "is_leap(" + y + ")" in source, "Include a test for " + y + "."
                        assert same_output(output, expected_output), "All tests should pass, then print Leap tests passed."
                    `,
                    hints: ['assert is_leap(1900) == False', '2000 IS a leap year (divisible by 400).'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Working With AI',
            panels: [
                {
                    scene: 'screen',
                    alt: 'Py shows a five-step checklist for working with AI.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [
                        { who: 'py', text: 'The AI checklist: 1) clear spec + examples, 2) READ the code, 3) test the edges, 4) ask it to explain, 5) never run code you don\'t understand on important stuff.' },
                    ],
                },
                {
                    scene: 'room',
                    alt: 'Bolt offers two versions of the same code: one tangled, one clear.',
                    wide: true,
                    cast: [
                        { who: 'bolt', pose: 'point', x: 28 },
                        { who: 'nova', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'bolt', text: 'Here\'s a clever one-liner!' },
                        { who: 'nova', text: 'Clever is nice, but I need to READ it. Rewrite it clearly, with good names.' },
                    ],
                    code: py`
                        print(sum(x for x in range(1, 21) if x % 3 == 0))
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Nova and Bolt fly the ship together, Nova at the wheel.',
                    cast: [
                        { who: 'nova', pose: 'happy', x: 30 },
                        { who: 'bolt', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'nova', text: 'Everything you learned (loops, functions, tests) is what makes you a great captain of AI helpers.' }],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Captain\'s Orders',
            problems: [
                {
                    id: 'q5',
                    type: 'breakit',
                    title: 'Lost order',
                    prompt: 'You asked: "remove duplicates but KEEP the original order." Find the list that shows Bolt ignored part of that.',
                    robot: py`print(sorted(set(items)))`,
                    correct: py`
                        result = []
                        for x in items:
                            if x not in result:
                                result.append(x)
                        print(result)
                    `,
                    inputName: 'items',
                    choices: ['[1, 2, 3]', '[3, 1, 3]', '[1, 1, 2]'],
                    answer: '[3, 1, 3]',
                    hints: ['When does sorting change the order?'],
                },
                {
                    id: 'q6',
                    type: 'trace',
                    title: 'Trace before you trust',
                    prompt: 'Trace Bolt\'s code before running it. What is `result` each time line 4 finishes?',
                    code: py`
                        result = []
                        for x in [3, 1, 3, 2]:
                            if x not in result:
                                result.append(x)
                    `,
                    line: 4,
                    columns: ['result'],
                    rows: [['[3]'], ['[3, 1]'], ['[3, 1, 2]']],
                    hints: ['The second 3 is already in result, so line 4 doesn\'t run for it.'],
                },
                {
                    id: 'q7',
                    type: 'write',
                    title: 'Make it readable',
                    prompt: 'Rewrite Bolt\'s one-liner `sum(x for x in range(1, 21) if x % 3 == 0)` as a clear function `def sum_of_multiples(limit, k):` with a normal loop, returning the sum of the numbers from 1 to limit that divide by k. Print `sum_of_multiples(20, 3)`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def sum_of_multiples(limit, k):
                            total = 0
                            for n in range(1, limit + 1):
                                if n % k == 0:
                                    total += n
                            return total

                        print(sum_of_multiples(20, 3))
                    `,
                    check: py`
                        f = function("sum_of_multiples")
                        assert f(20, 3) == 63 and f(10, 5) == 15 and f(4, 5) == 0, "sum_of_multiples(10, 5) should be 5 + 10 = 15."
                        assert "for" in source and "sum(" not in source, "Use a normal loop, not sum()."
                        assert same_output(output, expected_output), "print(sum_of_multiples(20, 3))"
                    `,
                    hints: ['Loop n from 1 to limit (inclusive!).', 'If n % k == 0, add it to total.'],
                },
                {
                    id: 'q8',
                    type: 'instruct',
                    title: 'Steer the fix',
                    prompt: 'Bolt\'s `average` crashes on an empty list. Which follow-up request gets the 🎯 Goal?',
                    goalCode: py`
                        def average(nums):
                            if len(nums) == 0:
                                return 0
                            return sum(nums) / len(nums)

                        print(average([]))
                        print(average([2, 4]))
                    `,
                    choices: [
                        { text: 'It\'s broken, fix it.', code: py`
                            def average(nums):
                                return sum(nums) / max(len(nums), 2)

                            print(average([]))
                            print(average([2, 4]))
                        ` },
                        { text: 'average([]) crashes. It should return 0 for an empty list and stay the same otherwise.', code: py`
                            def average(nums):
                                if len(nums) == 0:
                                    return 0
                                return sum(nums) / len(nums)

                            print(average([]))
                            print(average([2, 4]))
                        ` },
                    ],
                    answer: 1,
                    hints: ['Say what\'s wrong AND what you want instead.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Test the sorter',
                    prompt: 'Write `def test_sort(f):` with asserts that check a sorting function `f`. We\'ll run it on a correct sorter (must pass) and on a lazy AI one that returns the list unchanged (must FAIL). Then print `Ready`.',
                    starter: py`
                        def test_sort(f):
                            # assert f(...) == ...
                            pass

                        print("Ready")
                    `,
                    solution: py`
                        def test_sort(f):
                            assert f([3, 1, 2]) == [1, 2, 3]
                            assert f([]) == []
                            assert f([5, 5, 1]) == [1, 5, 5]

                        print("Ready")
                    `,
                    check: py`
                        t = function("test_sort")
                        t(lambda xs: sorted(xs))
                        try:
                            t(lambda xs: list(xs))
                            caught = False
                        except AssertionError:
                            caught = True
                        assert caught, "Your tests didn't catch the lazy sorter. Test a list that ISN'T already sorted!"
                        assert same_output(output, expected_output), "Print Ready."
                    `,
                    hints: ['An unsorted list like [3, 1, 2] catches the lazy version.'],
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
                    type: 'breakit',
                    title: 'Empty max',
                    prompt: 'Spec: "biggest(nums) returns the largest number, or None for an empty list." Find the list that breaks Bolt\'s version.',
                    robot: py`
                        def biggest(nums):
                            return max(nums)

                        print(biggest(nums))
                    `,
                    correct: py`
                        def biggest(nums):
                            if len(nums) == 0:
                                return None
                            return max(nums)

                        print(biggest(nums))
                    `,
                    inputName: 'nums',
                    choices: ['[4, 9, 2]', '[]', '[-1]'],
                    answer: '[]',
                    hints: ['Test the edge case from the spec.'],
                },
                {
                    id: 't2',
                    type: 'instruct',
                    title: 'Precise request',
                    prompt: 'Which request gets Bolt to write code that prints the 🎯 Goal?',
                    goalCode: py`
                        def initials(name):
                            parts = name.split()
                            return ".".join(p[0].upper() for p in parts) + "."

                        print(initials("nova star"))
                    `,
                    choices: [
                        { text: 'Make initials from a name.', code: py`
                            def initials(name):
                                return name[0]

                            print(initials("nova star"))
                        ` },
                        { text: 'initials(name) returns the first letter of each word, in capitals, each followed by a dot. initials("ada lovelace") is "A.L.".', code: py`
                            def initials(name):
                                parts = name.split()
                                return ".".join(p[0].upper() for p in parts) + "."

                            print(initials("nova star"))
                        ` },
                    ],
                    answer: 1,
                    hints: ['An exact example removes all the guessing.'],
                },
                {
                    id: 'boss',
                    type: 'fix',
                    boss: true,
                    title: 'BOSS: Bolt\'s grade calculator',
                    prompt: 'Bolt wrote `grade(score)`. The spec\'s tests are below it. Bolt\'s code has THREE bugs. Make every test pass without changing the tests.',
                    starter: py`
                        def grade(score):
                            if score > 90:
                                return "A"
                            if score >= 80:
                                return "B"
                            if score >= 70:
                                return "c"
                            return "F"

                        assert grade(95) == "A"
                        assert grade(90) == "A"
                        assert grade(85) == "B"
                        assert grade(70) == "C"
                        assert grade(69) == "F"
                        assert grade(-5) == "Invalid"
                        print("All grade tests passed")
                    `,
                    solution: py`
                        def grade(score):
                            if score < 0:
                                return "Invalid"
                            if score >= 90:
                                return "A"
                            if score >= 80:
                                return "B"
                            if score >= 70:
                                return "C"
                            return "F"

                        assert grade(95) == "A"
                        assert grade(90) == "A"
                        assert grade(85) == "B"
                        assert grade(70) == "C"
                        assert grade(69) == "F"
                        assert grade(-5) == "Invalid"
                        print("All grade tests passed")
                    `,
                    check: py`
                        assert source.count("assert grade(") >= 6, "Don't remove the tests!"
                        assert same_output(output, expected_output), "Every test should pass."
                    `,
                    hints: ['Look at the 90 edge.', 'Capital letters matter: "c" isn\'t "C".', 'The spec says negative scores are "Invalid". Check for that first.'],
                },
            ],
        },
    ],
};
