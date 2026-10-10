import { py } from '../helpers';
import type { Chapter } from '../schema';

const BINARY = py`
    def binary_search(items, target):
        lo = 0
        hi = len(items) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if items[mid] == target:
                return mid
            elif items[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return -1
`;

export const ch2: Chapter = {
    id: 'ch2',
    title: 'Searching and Sorting',
    emoji: '🔎',
    summary: 'Guess the middle to search fast, and swap neighbours to put things in order.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Guess Smarter',
            panels: [
                {
                    scene: 'space',
                    alt: 'Zork thinks of a number from 1 to 100; Nova guesses one at a time.',
                    wide: true,
                    cast: [
                        { who: 'zork', pose: 'happy', x: 22 },
                        { who: 'nova', pose: 'sad', x: 48 },
                        { who: 'py', pose: 'talk', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'nova', text: 'Is it 1? 2? 3? This could take 100 guesses!' },
                        { who: 'py', text: 'Guess the MIDDLE. "Too high" or "too low" throws away half the numbers every time!' },
                    ],
                },
                {
                    scene: 'screen',
                    alt: 'Py halves the range on screen: 1-100, 1-49, 26-49...',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'This is binary search. lo and hi mark where the answer could still be.' }],
                    code: py`
                        lo = 1
                        hi = 100
                        secret = 37
                        while True:
                            guess = (lo + hi) // 2
                            print("Guess:", guess)
                            if guess == secret:
                                break
                            elif guess < secret:
                                lo = guess + 1
                            else:
                                hi = guess - 1
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork shuffles a list and the halving trick stops working.',
                    cast: [
                        { who: 'zork', pose: 'think', x: 30 },
                        { who: 'nova', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'nova', text: 'Catch: halving only works if the list is SORTED. Otherwise "too low" tells you nothing!' }],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Search Party',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Three guesses',
                    prompt: 'The secret is 37. What will this code print?',
                    code: py`
                        lo = 1
                        hi = 100
                        while True:
                            guess = (lo + hi) // 2
                            print(guess)
                            if guess == 37:
                                break
                            elif guess < 37:
                                lo = guess + 1
                            else:
                                hi = guess - 1
                    `,
                    choices: ['50\n25\n37', '50\n37', '1\n2\n37'],
                    answer: '50\n25\n37',
                    hints: ['First guess: (1 + 100) // 2 = 50. Too high, so hi becomes 49.', 'Next: (1 + 49) // 2 = 25. Too low, so lo becomes 26.'],
                },
                {
                    id: 'p2',
                    type: 'write',
                    title: 'One by one',
                    prompt: 'Write `def linear_search(items, target):` that returns the position of target, or -1 if it isn\'t there. Check items one at a time.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def linear_search(items, target):
                            for i in range(len(items)):
                                if items[i] == target:
                                    return i
                            return -1

                        print(linear_search(["ruby", "opal", "jade"], "jade"))
                    `,
                    check: py`
                        f = function("linear_search")
                        assert f([5, 8, 2], 8) == 1, "8 is at position 1."
                        assert f([5, 8, 2], 7) == -1, "Missing items return -1."
                        assert f([], 3) == -1, "An empty list returns -1."
                        assert ".index(" not in source, "Do the search yourself, without .index()."
                    `,
                    hints: ['for i in range(len(items)): if items[i] == target: return i', 'After the loop: return -1'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Swap trick',
                    prompt: 'What will this code print?',
                    code: py`
                        a = 1
                        b = 2
                        a, b = b, a
                        print(a, b)
                    `,
                    choices: ['2 1', '1 2', '2 2'],
                    answer: '2 1',
                    hints: ['a, b = b, a swaps the two values in one go.'],
                },
                {
                    id: 'p4',
                    type: 'trace',
                    title: 'Bubble pass',
                    prompt: 'One pass of bubble sort: swap neighbours that are out of order. What is `nums` each time line 4 finishes?',
                    code: py`
                        nums = [3, 1, 2]
                        for i in range(2):
                            if nums[i] > nums[i + 1]:
                                nums[i], nums[i + 1] = nums[i + 1], nums[i]
                    `,
                    line: 4,
                    columns: ['nums'],
                    rows: [['[1, 3, 2]'], ['[1, 2, 3]']],
                    hints: ['First compare 3 and 1: swap. Then compare 3 and 2: swap.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Is it sorted?',
                    prompt: 'Write `def is_sorted(nums):` that returns True if every item is less than or equal to the next one.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def is_sorted(nums):
                            for i in range(len(nums) - 1):
                                if nums[i] > nums[i + 1]:
                                    return False
                            return True

                        print(is_sorted([1, 2, 2, 5]))
                    `,
                    check: py`
                        f = function("is_sorted")
                        assert f([1, 2, 2, 5]) is True, "[1, 2, 2, 5] is sorted (equal neighbours are fine)."
                        assert f([3, 1]) is False, "[3, 1] is not sorted."
                        assert f([]) is True and f([7]) is True, "Empty and one-item lists count as sorted."
                        import re
                        assert not re.search(r"(?<![\w.])sorted\(", source), "Check the neighbours yourself, without sorted()."
                    `,
                    hints: ['Compare nums[i] with nums[i + 1] for i in range(len(nums) - 1).', 'Return False as soon as one pair is out of order.'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Putting Things in Order',
            panels: [
                {
                    scene: 'space',
                    alt: 'Py swaps two planets that are in the wrong order.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'zork', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Bubble sort: walk along the list swapping neighbours that are out of order. Repeat until no swaps happen.' },
                    ],
                    code: py`
                        nums = [5, 2, 4, 1]
                        for p in range(len(nums) - 1):
                            for i in range(len(nums) - 1):
                                if nums[i] > nums[i + 1]:
                                    nums[i], nums[i + 1] = nums[i + 1], nums[i]
                            print(nums)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py shows that bubble sort is a loop inside a loop.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'Bubble sort is a loop in a loop, so it\'s slow for big lists. Python\'s sorted() uses a much cleverer recipe.' }],
                },
                {
                    scene: 'space',
                    alt: 'Nova puts the two ideas together: sort first, then search fast.',
                    cast: [{ who: 'nova', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'nova', text: 'Sort once, then search super fast with halving, as many times as you like!' }],
                    code: BINARY + '\n' + py`
                        gems = sorted([42, 7, 19, 88, 3, 56])
                        print(gems)
                        print(binary_search(gems, 56))
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Sorting Lab',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Binary search',
                    prompt: 'Write `def binary_search(items, target):` for a SORTED list. Keep `lo` and `hi`; check the middle; move lo or hi; return the position, or -1 if it\'s not there.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: BINARY + '\n' + py`print(binary_search([3, 7, 19, 42, 56, 88], 42))`,
                    check: py`
                        f = function("binary_search")
                        nums = [2, 5, 9, 14, 20, 31, 40]
                        for i in range(len(nums)):
                            assert f(nums, nums[i]) == i, f"binary_search should find {nums[i]} at position {i}."
                        assert f(nums, 10) == -1 and f(nums, 50) == -1 and f([], 3) == -1, "Missing items should return -1."
                    `,
                    hints: ['lo = 0 and hi = len(items) - 1', 'while lo <= hi: mid = (lo + hi) // 2', 'If items[mid] < target, the answer is to the right: lo = mid + 1'],
                },
                {
                    id: 'p6',
                    type: 'predict',
                    title: 'How many guesses?',
                    prompt: 'This counts how many times 1000 can be halved before it\'s used up. That\'s about how many guesses binary search needs for 1000 sorted items. What does it print?',
                    code: py`
                        n = 1000
                        guesses = 0
                        while n >= 1:
                            n //= 2
                            guesses += 1
                        print(guesses)
                    `,
                    choices: ['10', '500', '1000'],
                    answer: '10',
                    hints: ['1000, 500, 250, 125, 62, 31, 15, 7, 3, 1: count them.'],
                },
                {
                    id: 'p7',
                    type: 'write',
                    title: 'Bubble sort',
                    prompt: 'Write `def bubble_sort(nums):` that sorts the list by swapping neighbours (no `sorted()` or `.sort()`!) and returns it.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        def bubble_sort(nums):
                            for p in range(len(nums) - 1):
                                for i in range(len(nums) - 1):
                                    if nums[i] > nums[i + 1]:
                                        nums[i], nums[i + 1] = nums[i + 1], nums[i]
                            return nums

                        print(bubble_sort([5, 2, 4, 1]))
                    `,
                    check: py`
                        f = function("bubble_sort")
                        for case in [[5, 2, 4, 1], [1, 2, 3], [], [9], [3, 3, 1]]:
                            assert f(list(case)) == sorted(case), f"bubble_sort({case}) should give {sorted(case)}."
                        assert "sorted(" not in source and ".sort(" not in source, "Sort it yourself."
                    `,
                    hints: ['A loop inside a loop. The inner loop swaps out-of-order neighbours.', 'nums[i], nums[i + 1] = nums[i + 1], nums[i]'],
                },
                {
                    id: 'p8',
                    type: 'breakit',
                    title: 'Unsorted surprise',
                    prompt: 'Bolt uses binary search to check if 3 is in a list. Find the list where that gives the wrong answer.',
                    robot: py`
                        lo = 0
                        hi = len(items) - 1
                        found = False
                        while lo <= hi:
                            mid = (lo + hi) // 2
                            if items[mid] == 3:
                                found = True
                                break
                            elif items[mid] < 3:
                                lo = mid + 1
                            else:
                                hi = mid - 1
                        print(found)
                    `,
                    correct: py`print(3 in items)`,
                    inputName: 'items',
                    choices: ['[1, 3, 5, 7, 9]', '[9, 7, 5, 3, 1]', '[3]'],
                    answer: '[9, 7, 5, 3, 1]',
                    hints: ['Binary search only works on sorted lists, smallest first.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Count the swaps',
                    prompt: 'Bubble sort `[4, 3, 2, 1]` and count every swap. Print `Swaps:` and the count.',
                    starter: py`nums = [4, 3, 2, 1]`,
                    solution: py`
                        nums = [4, 3, 2, 1]
                        swaps = 0
                        for p in range(len(nums) - 1):
                            for i in range(len(nums) - 1):
                                if nums[i] > nums[i + 1]:
                                    nums[i], nums[i + 1] = nums[i + 1], nums[i]
                                    swaps += 1
                        print("Swaps:", swaps)
                    `,
                    check: py`
                        assert nums == [1, 2, 3, 4], "The list should end up sorted."
                        assert same_output(output, expected_output), "Count every swap."
                    `,
                    hints: ['Add swaps += 1 right after each swap.'],
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
                    title: 'Sorted words',
                    prompt: 'What will this code print?',
                    code: py`print(sorted(["pear", "apple", "fig"]))`,
                    choices: ["['apple', 'fig', 'pear']", "['pear', 'fig', 'apple']", "['fig', 'pear', 'apple']"],
                    answer: "['apple', 'fig', 'pear']",
                    hints: ['Words sort in alphabetical order.'],
                },
                {
                    id: 't2',
                    type: 'fix',
                    title: 'Stuck search',
                    prompt: 'This binary search gets stuck forever when the target is on the right. Fix the bug!',
                    starter: py`
                        def binary_search(items, target):
                            lo = 0
                            hi = len(items) - 1
                            while lo <= hi:
                                mid = (lo + hi) // 2
                                if items[mid] == target:
                                    return mid
                                elif items[mid] < target:
                                    lo = mid
                                else:
                                    hi = mid - 1
                            return -1

                        print(binary_search([1, 3, 5, 7], 7))
                    `,
                    solution: BINARY + '\n' + py`print(binary_search([1, 3, 5, 7], 7))`,
                    hints: ['If the middle is too small, the answer is AFTER mid, so move lo past it.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Mind-reader',
                    prompt: 'Make the COMPUTER guess the player\'s number (1–100) with halving. Each turn print `Is it N?` and ask `Answer? ` (the player types higher, lower or yes). When they type yes, print `Got it in N guesses!`.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        lo = 1
                        hi = 100
                        guesses = 0
                        while True:
                            guess = (lo + hi) // 2
                            guesses += 1
                            print(f"Is it {guess}?")
                            answer = input("Answer? ")
                            if answer == "yes":
                                print(f"Got it in {guesses} guesses!")
                                break
                            elif answer == "higher":
                                lo = guess + 1
                            else:
                                hi = guess - 1
                    `,
                    inputs: ['lower', 'higher', 'yes'],
                    check: py`
                        out = run_with(["lower"] * 5 + ["yes"])
                        assert "Is it 1?" in out and "Got it in 6 guesses!" in out, "For the number 1 it should guess 50, 25, 12, 6, 3, 1."
                        assert "Got it in 1 guesses!" in run_with(["yes"]), "If the first guess is right, it took 1 guess."
                        assert same_output(output, expected_output), "For the number 37: 50 (lower), 25 (higher), 37 (yes)."
                    `,
                    hints: ['guess = (lo + hi) // 2 each turn.', '"higher" means lo = guess + 1; "lower" means hi = guess - 1.'],
                },
            ],
        },
    ],
};
