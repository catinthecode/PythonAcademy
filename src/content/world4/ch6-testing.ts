import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch6: Chapter = {
    id: 'ch6',
    title: 'Testing',
    emoji: '✅',
    summary: 'Write tests with assert so the computer checks your functions for you.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Assert Yourself',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Kai checks his sword every morning before battle.',
                    wide: true,
                    cast: [
                        { who: 'kai', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'kai', text: 'I keep checking my functions by hand. Again and again.' },
                        { who: 'py', text: 'Let Python check for you! assert says "this MUST be true". If it isn\'t, the program stops.' },
                    ],
                    code: py`
                        def double(n):
                            return n * 2

                        assert double(2) == 4
                        assert double(0) == 0
                        print("All tests passed!")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'An alarm bell rings when a test fails.',
                    cast: [
                        { who: 'slime', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'A failing assert raises an AssertionError, like an alarm bell: "something is broken HERE!"' }],
                    code: py`
                        def double(n):
                            return n + 2

                        assert double(2) == 4
                        assert double(5) == 10
                        print("All tests passed!")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Kai adds a message tag to his test.',
                    cast: [{ who: 'kai', pose: 'point', x: 40 }],
                    bubbles: [{ who: 'kai', text: 'Add a message after a comma to say what went wrong.' }],
                    code: py`
                        hp = -5
                        assert hp >= 0, "HP can never be negative!"
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'First Tests',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Quiet pass',
                    prompt: 'What will this code print?',
                    code: py`
                        assert 2 + 2 == 4
                        print("OK")
                    `,
                    choices: ['True\nOK', 'OK', 'Nothing'],
                    answer: 'OK',
                    hints: ['A passing assert prints nothing at all.'],
                },
                {
                    id: 'p2',
                    type: 'predict',
                    about: 'error',
                    title: 'Alarm bell',
                    prompt: 'What happens when Python runs this?',
                    code: py`
                        assert 2 + 2 == 5
                        print("OK")
                    `,
                    choices: ['AssertionError', 'SyntaxError', 'No error'],
                    answer: 'AssertionError',
                    hints: ['Is 2 + 2 equal to 5?'],
                },
                {
                    id: 'p3',
                    type: 'fix',
                    title: 'Make the tests pass',
                    prompt: 'The tests are right; the function is wrong. Fix `triple` so all the tests pass.',
                    starter: py`
                        def triple(n):
                            return n + 3

                        assert triple(1) == 3
                        assert triple(4) == 12
                        assert triple(0) == 0
                        print("All tests passed!")
                    `,
                    solution: py`
                        def triple(n):
                            return n * 3

                        assert triple(1) == 3
                        assert triple(4) == 12
                        assert triple(0) == 0
                        print("All tests passed!")
                    `,
                    check: py`
                        assert source.count("assert") >= 3, "Don't delete the tests! Fix the function instead."
                        assert same_output(output, expected_output), "All the tests should pass."
                    `,
                    hints: ['triple(4) should be 12. Is 4 + 3 equal to 12?'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Which test fails?',
                    prompt: 'What happens? Pick the first line that fails.',
                    code: py`
                        def is_even(n):
                            return n % 2 == 0

                        assert is_even(2) == True
                        assert is_even(3) == False
                        assert is_even(0) == True
                        print("All passed")
                    `,
                    choices: ['All passed', 'The test on line 4 fails', 'The test on line 5 fails'],
                    answer: 'All passed',
                    about: 'output',
                    hints: ['Check each one: is 2 even? 3? 0?'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Test the healer',
                    prompt: '`heal(hp)` adds 10 but never goes above 100. Write at least 3 `assert` tests for it (a normal case, one that hits the max, and one right at the edge), then print `Tests passed`.',
                    starter: py`
                        def heal(hp):
                            return min(hp + 10, 100)

                        # Your tests here:
                    `,
                    solution: py`
                        def heal(hp):
                            return min(hp + 10, 100)

                        assert heal(50) == 60
                        assert heal(95) == 100
                        assert heal(90) == 100
                        print("Tests passed")
                    `,
                    check: py`
                        assert source.count("assert heal(") >= 3, "Write at least 3 tests: assert heal(...) == ..."
                        assert same_output(output, expected_output), "All your tests should pass, then print Tests passed."
                    `,
                    hints: ['assert heal(50) == 60', 'What should heal(95) be? Not 105!'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Tests That Catch Bugs',
            panels: [
                {
                    scene: 'castle',
                    alt: 'Py points at the edges of a bridge where bugs hide.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 28 },
                        { who: 'kai', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Good tests try the EDGES: zero, negative numbers, empty lists, exactly at the limit.' }],
                },
                {
                    scene: 'castle',
                    alt: 'Kai writes the tests before the function.',
                    cast: [{ who: 'kai', pose: 'happy', x: 35 }],
                    bubbles: [{ who: 'kai', text: 'I can even write the tests FIRST. Then I know when my function is done.' }],
                    code: py`
                        def biggest(nums):
                            best = nums[0]
                            for n in nums:
                                if n > best:
                                    best = n
                            return best

                        assert biggest([3, 9, 2]) == 9
                        assert biggest([-4, -2]) == -2
                        assert biggest([7]) == 7
                        print("biggest works!")
                    `,
                },
                {
                    scene: 'castle',
                    alt: 'Bolt hands over a function, and Kai runs his tests on it.',
                    cast: [
                        { who: 'bolt', pose: 'happy', x: 30 },
                        { who: 'kai', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'kai', text: 'When Bolt gives me code, I run my tests on it. Tests don\'t care who wrote the code!' }],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Test Builder',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Pass the tests',
                    prompt: 'Write `def clamp(n):` that returns n, but never below 0 or above 10. The tests are already written. Make them all pass!',
                    starter: py`
                        # Write clamp here


                        assert clamp(5) == 5
                        assert clamp(-3) == 0
                        assert clamp(15) == 10
                        assert clamp(0) == 0
                        assert clamp(10) == 10
                        print("clamp works!")
                    `,
                    solution: py`
                        def clamp(n):
                            if n < 0:
                                return 0
                            if n > 10:
                                return 10
                            return n


                        assert clamp(5) == 5
                        assert clamp(-3) == 0
                        assert clamp(15) == 10
                        assert clamp(0) == 0
                        assert clamp(10) == 10
                        print("clamp works!")
                    `,
                    check: py`
                        assert source.count("assert clamp") >= 5, "Keep all 5 tests!"
                        assert same_output(output, expected_output), "All tests should pass."
                    `,
                    hints: ['If n < 0 return 0. If n > 10 return 10. Otherwise return n.'],
                },
                {
                    id: 'p6',
                    type: 'breakit',
                    title: 'Weak test',
                    prompt: 'Bolt says its `is_adult` works because "it passed my test with age 30". Find an age that shows the bug. (Adults are 18 or older.)',
                    robot: py`print(age > 18)`,
                    correct: py`print(age >= 18)`,
                    inputName: 'age',
                    choices: ['30', '18', '10'],
                    answer: '18',
                    hints: ['One test at 30 never checks the edge.'],
                },
                {
                    id: 'p7',
                    type: 'write',
                    title: 'Catch the bug',
                    prompt: 'Write `def test_double(f):` with asserts that check a doubling function `f`. We\'ll run your tests on a CORRECT version (they must pass) and a BUGGY one that adds 2 instead (they must fail!). Then print `Ready`.',
                    starter: py`
                        def test_double(f):
                            # assert f(...) == ...
                            pass

                        print("Ready")
                    `,
                    solution: py`
                        def test_double(f):
                            assert f(3) == 6
                            assert f(0) == 0
                            assert f(10) == 20

                        print("Ready")
                    `,
                    check: py`
                        t = function("test_double")
                        t(lambda n: n * 2)
                        try:
                            t(lambda n: n + 2)
                            caught = False
                        except AssertionError:
                            caught = True
                        assert caught, "Your tests didn't catch the buggy version (n + 2). Try a test where n + 2 and n * 2 are different!"
                        assert same_output(output, expected_output), "Print Ready."
                    `,
                    hints: ['Careful: 2 + 2 and 2 × 2 are both 4! Pick numbers where they differ.', 'assert f(3) == 6'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    title: 'Empty list',
                    prompt: 'What happens when this test runs?',
                    code: py`
                        def average(nums):
                            if len(nums) == 0:
                                return 0
                            return sum(nums) / len(nums)

                        assert average([]) == 0
                        assert average([2, 4]) == 3
                        print("Edge cases handled!")
                    `,
                    choices: ['Edge cases handled!', 'ZeroDivisionError', 'AssertionError'],
                    answer: 'Edge cases handled!',
                    hints: ['The function checks for an empty list first.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Test first',
                    prompt: 'Write `def is_vowel(letter):` that returns True for a, e, i, o, u (capital letters too!). Add at least 3 asserts, including a capital letter, then print `Done`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def is_vowel(letter):
                            return letter.lower() in "aeiou"

                        assert is_vowel("a") == True
                        assert is_vowel("E") == True
                        assert is_vowel("z") == False
                        print("Done")
                    `,
                    check: py`
                        f = function("is_vowel")
                        assert f("o") and f("U") and not f("k"), "is_vowel should work for capital letters too."
                        assert source.count("assert") >= 3, "Write at least 3 asserts."
                        assert same_output(output, expected_output), "Print Done."
                    `,
                    hints: ['letter.lower() in "aeiou"'],
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
                    about: 'error',
                    title: 'Does it pass?',
                    prompt: 'What happens when Python runs this?',
                    code: py`
                        def area(w, h):
                            return w + h

                        assert area(2, 2) == 4
                        assert area(3, 5) == 15
                    `,
                    choices: ['AssertionError', 'No error'],
                    answer: 'AssertionError',
                    hints: ['2 + 2 happens to be 4. What about 3 + 5?'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Fix to pass',
                    prompt: 'Fix `last` so all the tests pass.',
                    starter: py`
                        def last(items):
                            return items[1]

                        assert last([1, 2, 3]) == 3
                        assert last(["a"]) == "a"
                        print("Passed")
                    `,
                    solution: py`
                        def last(items):
                            return items[-1]

                        assert last([1, 2, 3]) == 3
                        assert last(["a"]) == "a"
                        print("Passed")
                    `,
                    check: py`
                        assert source.count("assert") >= 2, "Keep the tests."
                        assert same_output(output, expected_output), "The tests should pass."
                    `,
                    hints: ['Which index always means "the last one"?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Password checker',
                    prompt: 'Write `def strong(password):` that returns True only if the password has at least 8 characters AND contains at least one digit. Write at least 4 asserts (too short, no digit, exactly 8 with a digit, long and strong), then print `All good`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def strong(password):
                            has_digit = False
                            for ch in password:
                                if ch in "0123456789":
                                    has_digit = True
                            return len(password) >= 8 and has_digit

                        assert strong("abc1") == False
                        assert strong("abcdefgh") == False
                        assert strong("abcdefg1") == True
                        assert strong("dragon2024slayer") == True
                        print("All good")
                    `,
                    check: py`
                        f = function("strong")
                        assert f("hero1234") is True, "hero1234 is 8 long with digits: strong."
                        assert f("hero123") is False, "hero123 is only 7 long."
                        assert f("herokingdom") is False, "herokingdom has no digit."
                        assert source.count("assert") >= 4, "Write at least 4 asserts."
                        assert same_output(output, expected_output), "Print All good."
                    `,
                    hints: ['Loop over the characters to look for a digit (ch in "0123456789").', 'return len(password) >= 8 and has_digit'],
                },
            ],
        },
    ],
};
