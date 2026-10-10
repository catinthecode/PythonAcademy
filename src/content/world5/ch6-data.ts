import { py } from '../helpers';
import type { Chapter } from '../schema';

const VOTES = py`votes = ["red", "blue", "red", "green", "blue", "red", "blue", "red"]`;

export const ch6: Chapter = {
    id: 'ch6',
    title: 'Data Detective',
    emoji: '📊',
    summary: 'Collect data, count it, summarise it and draw it, and know when it might be misleading.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Collect and Count',
            panels: [
                {
                    scene: 'space',
                    alt: 'Nova surveys aliens about their favourite colour.',
                    wide: true,
                    cast: [
                        { who: 'nova', pose: 'talk', x: 25 },
                        { who: 'zork', pose: 'happy', x: 50 },
                        { who: 'py', pose: 'point', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'nova', text: 'I asked every alien their favourite colour. Now what?' },
                        { who: 'py', text: 'Count them with a dictionary: colour → number of votes.' },
                    ],
                    code: VOTES + '\n' + py`
                        counts = {}
                        for v in votes:
                            counts[v] = counts.get(v, 0) + 1
                        print(counts)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'Py finds the colour with the most votes.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'The winner: loop over the counts and keep the biggest.' }],
                    code: py`
                        counts = {"red": 4, "blue": 3, "green": 1}
                        best = None
                        for colour in counts:
                            if best is None or counts[colour] > counts[best]:
                                best = colour
                        print("Most popular:", best)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork reads temperature numbers from a thermometer.',
                    cast: [{ who: 'zork', pose: 'think', x: 40 }],
                    bubbles: [{ who: 'zork', text: 'Numbers data: biggest, smallest and average tell the story fast.' }],
                    code: py`
                        temps = [21, 25, 19, 30, 24]
                        print("High:", max(temps), "Low:", min(temps))
                        print("Average:", sum(temps) / len(temps))
                    `,
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Crunch the Numbers',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Tally',
                    prompt: 'What will this code print?',
                    code: py`
                        counts = {}
                        for v in ["red", "blue", "red"]:
                            counts[v] = counts.get(v, 0) + 1
                        print(counts)
                    `,
                    choices: ["{'red': 2, 'blue': 1}", "{'red': 1, 'blue': 1}", "{'blue': 1, 'red': 2}"],
                    answer: "{'red': 2, 'blue': 1}",
                    hints: ['Keys appear in the order they were first added.'],
                },
                {
                    id: 'p2',
                    type: 'write',
                    title: 'Count votes',
                    prompt: 'Write `def count_votes(votes):` that returns a dictionary of how many times each vote appears. Print `count_votes(votes)`.',
                    starter: VOTES,
                    solution: VOTES + '\n' + py`
                        def count_votes(votes):
                            counts = {}
                            for v in votes:
                                counts[v] = counts.get(v, 0) + 1
                            return counts

                        print(count_votes(votes))
                    `,
                    check: py`
                        f = function("count_votes")
                        assert f(["a", "b", "a"]) == {"a": 2, "b": 1} and f([]) == {}, "count_votes should work for any list (and an empty one)."
                        assert same_output(output, expected_output), "print(count_votes(votes))"
                    `,
                    hints: ['counts[v] = counts.get(v, 0) + 1', 'Return counts at the end.'],
                },
                {
                    id: 'p3',
                    type: 'predict',
                    title: 'Most popular',
                    prompt: 'What will this code print?',
                    code: py`
                        counts = {"red": 4, "blue": 5, "green": 1}
                        best = None
                        for colour in counts:
                            if best is None or counts[colour] > counts[best]:
                                best = colour
                        print(best)
                    `,
                    choices: ['red', 'blue', 'green'],
                    answer: 'blue',
                    hints: ['Which colour has the biggest count?'],
                },
                {
                    id: 'p4',
                    type: 'write',
                    title: 'Average temperature',
                    prompt: 'Print the average of `temps = [21, 25, 19, 30, 24]`, rounded to 1 decimal place.',
                    starter: py`temps = [21, 25, 19, 30, 24]`,
                    solution: py`
                        temps = [21, 25, 19, 30, 24]
                        print("Average:", round(sum(temps) / len(temps), 1))
                    `,
                    check: py`
                        assert "len(" in source, "Divide by len(temps), not a typed-in number."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['round(sum(temps) / len(temps), 1)'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Text bar chart',
                    prompt: 'Make `counts = {"red": 3, "blue": 5, "green": 2}` and print a bar chart: each colour followed by that many `#`, like the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        counts = {"red": 3, "blue": 5, "green": 2}
                        for colour in counts:
                            print(colour, "#" * counts[colour])
                    `,
                    check: py`
                        assert "for" in source, "Loop over the dictionary."
                        assert same_output(output, expected_output), "Match the chart."
                    `,
                    hints: ['for colour in counts: print(colour, "#" * counts[colour])'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Picture It, Question It',
            panels: [
                {
                    scene: 'screen',
                    alt: 'A turtle draws a bar chart on the big screen.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'Pictures make data easy to see. Shelly the turtle can draw bar charts!' }],
                    code: py`
                        from turtle import *
                        for value in [3, 5, 2]:
                            left(90)
                            forward(value * 20)
                            right(90)
                            forward(20)
                            right(90)
                            forward(value * 20)
                            left(90)
                            penup()
                            forward(10)
                            pendown()
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork holds a sign saying 100% of aliens love purple, with a tiny "1 answer" note.',
                    wide: true,
                    cast: [
                        { who: 'zork', pose: 'happy', x: 30 },
                        { who: 'nova', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'zork', text: '100% of aliens love purple!' },
                        { who: 'nova', text: 'How many did you ask?' },
                        { who: 'zork', text: '...One. Me.' },
                    ],
                },
                {
                    scene: 'space',
                    alt: 'Py lists questions a data detective asks.',
                    cast: [{ who: 'py', pose: 'talk', x: 40 }],
                    bubbles: [{ who: 'py', text: 'Data detectives ask: how much data? Who was asked? Is anything missing or weird?' }],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Detective Work',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Most common',
                    prompt: 'Write `def most_common(items):` that returns the item that appears most often (if there\'s a tie, the one that reached that count first in the counts dictionary).',
                    starter: VOTES,
                    solution: VOTES + '\n' + py`
                        def most_common(items):
                            counts = {}
                            for item in items:
                                counts[item] = counts.get(item, 0) + 1
                            best = None
                            for item in counts:
                                if best is None or counts[item] > counts[best]:
                                    best = item
                            return best

                        print(most_common(votes))
                    `,
                    check: py`
                        f = function("most_common")
                        assert f(["x", "y", "y"]) == "y", 'most_common(["x", "y", "y"]) should be "y".'
                        assert f([3, 1, 3, 1, 3]) == 3, "It should work for numbers too."
                        assert same_output(output, expected_output), "print(most_common(votes))"
                    `,
                    hints: ['First count everything in a dictionary.', 'Then find the key with the biggest count.'],
                },
                {
                    id: 'p6',
                    type: 'write',
                    turtle: true,
                    title: 'Bar chart',
                    prompt: 'Draw a bar chart for `[3, 5, 2]`: each bar is 20 wide and value × 20 tall, with a gap of 10 between bars (start facing right, along the bottom).',
                    starter: py`
                        from turtle import *
                        data = [3, 5, 2]
                    `,
                    solution: py`
                        from turtle import *
                        data = [3, 5, 2]
                        for value in data:
                            left(90)
                            forward(value * 20)
                            right(90)
                            forward(20)
                            right(90)
                            forward(value * 20)
                            left(90)
                            penup()
                            forward(10)
                            pendown()
                    `,
                    hints: ['Each bar: up value × 20, across 20, down value × 20.', 'Then hop forward 10 with the pen up.'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Wrong average',
                    prompt: 'This average is too big. Find the bug and fix it.',
                    starter: py`
                        scores = [8, 6, 10]
                        print(sum(scores) / (len(scores) - 1))
                    `,
                    solution: py`
                        scores = [8, 6, 10]
                        print(sum(scores) / len(scores))
                    `,
                    hints: ['Divide by how many scores there are.'],
                },
                {
                    id: 'p8',
                    type: 'predict',
                    about: 'meaning',
                    title: 'Suspicious survey',
                    prompt: 'This prints "Purple: 100%". What\'s the problem?',
                    code: py`
                        votes = ["purple"]
                        percent = votes.count("purple") / len(votes) * 100
                        print(f"Purple: {percent:.0f}%")
                    `,
                    choices: [
                        'Only one answer was collected, so it can\'t tell us what all aliens like.',
                        'The maths is wrong.',
                        'Nothing. Every alien loves purple.',
                    ],
                    answer: 'Only one answer was collected, so it can\'t tell us what all aliens like.',
                    hints: ['How long is votes?'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Alien heights',
                    prompt: 'Make `heights = [120, 95, 140, 110, 135]`. Print the tallest, the shortest and the average (rounded to 1 decimal place), like the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        heights = [120, 95, 140, 110, 135]
                        print("Tallest:", max(heights))
                        print("Shortest:", min(heights))
                        print("Average:", round(sum(heights) / len(heights), 1))
                    `,
                    check: py`
                        assert same_output(output, expected_output), "Match the three goal lines."
                    `,
                    hints: ['max(), min(), and sum() / len() with round(..., 1).'],
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
                    title: 'Count it',
                    prompt: 'What will this code print?',
                    code: py`print(["red", "blue", "red", "red"].count("red"))`,
                    choices: ['3', '2', '4'],
                    answer: '3',
                    hints: ['Count the "red"s.'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'No data',
                    prompt: 'Bolt\'s average should say 0 when there\'s no data at all. Find the list that breaks it.',
                    robot: py`print(sum(nums) / len(nums))`,
                    correct: py`print(sum(nums) / len(nums) if nums else 0)`,
                    inputName: 'nums',
                    choices: ['[2, 4]', '[]', '[7]'],
                    answer: '[]',
                    hints: ['What if nobody answered?'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Survey report',
                    prompt: 'Print a report for `votes` like the 🎯 Goal: a title, then each colour with its count and a bar, MOST votes first, then the total number of votes.',
                    starter: VOTES,
                    solution: VOTES + '\n' + py`
                        counts = {}
                        for v in votes:
                            counts[v] = counts.get(v, 0) + 1
                        print("=== SURVEY ===")
                        while len(counts) > 0:
                            best = None
                            for colour in counts:
                                if best is None or counts[colour] > counts[best]:
                                    best = colour
                            print(f"{best}: {counts[best]} {'#' * counts[best]}")
                            del counts[best]
                        print("Total votes:", len(votes))
                    `,
                    check: py`
                        assert same_output(output, expected_output), "Compare your report with the 🎯 Goal, line by line."
                    `,
                    hints: [
                        'Count the votes in a dictionary first.',
                        'To print most-first: repeatedly find the biggest count, print it, and remove it (del counts[best]).',
                        "f\"{best}: {counts[best]} {'#' * counts[best]}\"",
                    ],
                },
            ],
        },
    ],
};
