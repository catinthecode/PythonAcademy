import { py } from '../helpers';
import type { Chapter } from '../schema';

const PLAYERS = py`
    names = ["Bix", "Glitch", "Bolt"]
    scores = [30, 45, 20]
`;

export const ch8: Chapter = {
    id: 'ch8',
    title: 'Project: Leaderboard',
    emoji: '🏆',
    summary: 'Build an obstacle-course leaderboard with lists, loops, totals and rankings.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Plan the Leaderboard',
            panels: [
                {
                    scene: 'sky',
                    alt: 'Bix, Glitch and Bolt finish an obstacle course and look at an empty scoreboard.',
                    wide: true,
                    cast: [
                        { who: 'bix', pose: 'happy', x: 18 },
                        { who: 'glitch', pose: 'surprised', x: 42 },
                        { who: 'bolt', pose: 'wave', x: 80, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'We need a leaderboard for the obstacle course!' },
                        { who: 'bolt', text: 'Beep! I want to be at the top.' },
                    ],
                },
                {
                    scene: 'village',
                    alt: 'Py explains two lists lined up side by side.',
                    cast: [{ who: 'py', pose: 'point', x: 28 }],
                    props: [{ item: 'scroll', x: 68, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'Two lists that line up: names[i] goes with scores[i]. Loop over the positions with range(len(names)).' },
                    ],
                    code: py`
                        names = ["Bix", "Glitch", "Bolt"]
                        scores = [30, 45, 20]
                        for i in range(len(names)):
                            print(names[i], "scored", scores[i])
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Glitch sorts number cards from small to big.',
                    cast: [
                        { who: 'glitch', pose: 'happy', x: 30 },
                        { who: 'py', pose: 'talk', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'sorted() gives a NEW sorted list. Add reverse=True for biggest first.' }],
                    code: py`
                        scores = [12, 40, 25]
                        print(sorted(scores))
                        print(sorted(scores, reverse=True))
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Bix writes a neat line on the scoreboard.',
                    cast: [
                        { who: 'bix', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'bix', text: 'How do I make each line look neat?' },
                        { who: 'py', text: 'An f-string drops the name and score right into a sentence.' },
                    ],
                    code: py`
                        name = "Bix"
                        score = 30
                        print(f"Player {name} has {score} points")
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Glitch is confused: the scores are still in the old order.',
                    cast: [
                        { who: 'glitch', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'I called sorted(scores), but nothing changed!' },
                        { who: 'py', text: 'sorted() makes a NEW list. Save it in a variable!' },
                    ],
                    code: py`
                        scores = [12, 40, 25]
                        sorted(scores)
                        print(scores)
                        ranked = sorted(scores)
                        print(ranked)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Py unrolls the leaderboard plan. Bix and Glitch cheer.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'point', x: 20 },
                        { who: 'bix', pose: 'happy', x: 55 },
                        { who: 'glitch', pose: 'happy', x: 82, flip: true },
                    ],
                    props: [{ item: 'scroll', x: 37, y: 100 }],
                    bubbles: [
                        { who: 'py', text: 'The plan: show every player, work out the total and average, find the winner, then rank them all.' },
                        { who: 'bix', text: 'One part at a time!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Board Parts',
            problems: [
                {
                    id: 's1',
                    type: 'write',
                    title: 'Part 1: Show the scores',
                    prompt: 'Loop over the positions and print each player like the 🎯 Goal.',
                    starter: PLAYERS,
                    solution: PLAYERS + '\n' + py`
                        for i in range(len(names)):
                            print(f"{names[i]}: {scores[i]}")
                    `,
                    check: py`
                        assert "for" in source and "range(len(" in source, "Use for i in range(len(names)):"
                        assert same_output(output, expected_output), "Match the goal lines."
                    `,
                    hints: ['for i in range(len(names)):', 'print(f"{names[i]}: {scores[i]}")'],
                },
                {
                    id: 's2',
                    type: 'predict',
                    title: 'Sorted',
                    prompt: 'What will this code print?',
                    code: py`print(sorted([30, 45, 20]))`,
                    choices: ['[20, 30, 45]', '[45, 30, 20]', '[30, 45, 20]'],
                    answer: '[20, 30, 45]',
                    hints: ['sorted puts them smallest first.'],
                },
                {
                    id: 's3',
                    type: 'predict',
                    title: 'Biggest first',
                    prompt: 'What will this code print?',
                    code: py`print(sorted([30, 45, 20], reverse=True))`,
                    choices: ['[20, 30, 45]', '[45, 30, 20]'],
                    answer: '[45, 30, 20]',
                    hints: ['reverse=True flips the order.'],
                },
                {
                    id: 's4',
                    type: 'write',
                    title: 'Part 2: Total and average',
                    prompt: 'Print the total of the scores and the average rounded to 1 decimal place, like the 🎯 Goal. (`round(x, 1)` rounds x to 1 decimal place.)',
                    starter: PLAYERS,
                    solution: PLAYERS + '\n' + py`
                        total = 0
                        for s in scores:
                            total += s
                        print("Total:", total)
                        print("Average:", round(total / len(scores), 1))
                    `,
                    check: py`
                        assert "round(" in source, "Use round(..., 1) for the average."
                        assert same_output(output, expected_output), "Match both lines."
                    `,
                    hints: ['Use the total pattern (or sum()).', 'print("Average:", round(total / len(scores), 1))'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: The winner',
                    prompt: 'Use a loop to find the POSITION of the best score, then print `Winner:` and that player\'s name.',
                    starter: PLAYERS,
                    solution: PLAYERS + '\n' + py`
                        best = 0
                        for i in range(len(scores)):
                            if scores[i] > scores[best]:
                                best = i
                        print("Winner:", names[best])
                    `,
                    check: py`
                        assert "for" in source and "max(" not in source, "Find the best position with a loop."
                        assert same_output(output, expected_output), "Glitch has the best score."
                    `,
                    hints: ['best = 0, then if scores[i] > scores[best]: best = i', 'print("Winner:", names[best])'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Show It Off',
            panels: [
                {
                    scene: 'village',
                    alt: 'Py writes a ranked list on a scoreboard, with a crown at the top.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'bix', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'To rank players: find the best, print it, take it out of both lists, and repeat until the lists are empty!' },
                    ],
                    code: py`
                        nums = [30, 45, 20]
                        biggest = max(nums)
                        nums.remove(biggest)
                        print(biggest, nums)
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Bix shows that pop takes an item out at a position.',
                    cast: [{ who: 'bix', pose: 'point', x: 40 }],
                    bubbles: [{ who: 'bix', text: 'names.pop(i) takes out the item at position i AND gives it back to you.' }],
                    code: py`
                        names = ["Bix", "Glitch", "Bolt"]
                        taken = names.pop(1)
                        print(taken, names)
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'Bolt waves a checklist: ties, new players, an empty board.',
                    cast: [
                        { who: 'bolt', pose: 'point', x: 30 },
                        { who: 'glitch', pose: 'happy', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'bolt', text: 'Test it! What about a tie? A brand new player? Nobody playing yet?' }],
                },
                {
                    scene: 'village',
                    alt: 'Players leave a queue one by one until it is empty.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'bix', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'While the list is not empty, keep taking items out.' },
                        { who: 'bix', text: 'It empties the list one by one!' },
                    ],
                    code: py`
                        queue = ["Bix", "Glitch"]
                        while len(queue) > 0:
                            print("Next:", queue.pop(0))
                        print("Everyone went!")
                    `,
                },
                {
                    scene: 'village',
                    alt: 'Glitch removed a name but left its score, so the lists no longer line up.',
                    cast: [
                        { who: 'glitch', pose: 'sad', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'glitch', text: 'I popped a name but forgot its score!' },
                        { who: 'py', text: 'Change both lists together, or they stop lining up.' },
                    ],
                    code: py`
                        names = ["Bix", "Glitch", "Bolt"]
                        scores = [30, 45, 20]
                        names.pop(0)
                        print(names[0], scores[0])
                    `,
                },
                {
                    scene: 'sky',
                    alt: 'The finished leaderboard glows. Everyone gathers around it.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 18 },
                        { who: 'bix', pose: 'happy', x: 45 },
                        { who: 'glitch', pose: 'happy', x: 65 },
                        { who: 'bolt', pose: 'wave', x: 85, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'To rank: find the best, show it, pop it from BOTH lists, repeat. Then test ties and an empty board.' },
                        { who: 'bolt', text: 'Our leaderboard is ready!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Rankings',
            problems: [
                {
                    id: 's5',
                    type: 'write',
                    title: 'Part 3: New player',
                    prompt: 'Ask `Name? ` and `Score? `, add them to the two lists, then print how many players there are, like the 🎯 Goal.',
                    starter: PLAYERS,
                    solution: PLAYERS + '\n' + py`
                        name = input("Name? ")
                        score = int(input("Score? "))
                        names.append(name)
                        scores.append(score)
                        print(len(names), "players")
                    `,
                    inputs: ['Pip', '50'],
                    check: py`
                        assert "append" in source, "Append the new name and score."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['Use int(input(...)) for the score.', 'names.append(name) and scores.append(score)'],
                },
                {
                    id: 's6',
                    type: 'fix',
                    title: 'Out of line',
                    prompt: 'This crashes because names and scores don\'t line up. Fix it so each player gets their own score.',
                    starter: PLAYERS + '\n' + py`
                        for i in range(len(names)):
                            print(names[i], scores[i + 1])
                    `,
                    solution: PLAYERS + '\n' + py`
                        for i in range(len(names)):
                            print(names[i], scores[i])
                    `,
                    hints: ['names[i] goes with scores[i], the SAME position.'],
                },
                {
                    id: 's7',
                    type: 'write',
                    title: 'Part 4: Numbered ranks',
                    prompt: 'Sort the scores biggest first, then print them with a rank number like the 🎯 Goal. Use a counter that goes up by 1.',
                    starter: PLAYERS,
                    solution: PLAYERS + '\n' + py`
                        rank = 1
                        for s in sorted(scores, reverse=True):
                            print(f"{rank}. {s}")
                            rank += 1
                    `,
                    check: py`
                        assert "sorted(" in source, "Use sorted(..., reverse=True)."
                        assert same_output(output, expected_output), "Match the ranked list."
                    `,
                    hints: ['rank = 1 before the loop, rank += 1 inside it.', 'print(f"{rank}. {s}")'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: High scorers',
                    prompt: 'Count how many players scored more than 25 and print the 🎯 Goal.',
                    starter: PLAYERS,
                    solution: PLAYERS + '\n' + py`
                        count = 0
                        for s in scores:
                            if s > 25:
                                count += 1
                        print(count, "players scored over 25")
                    `,
                    check: py`
                        assert "for" in source, "Use the count pattern."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['count = 0, then if s > 25: count += 1'],
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
                    title: 'Who is it?',
                    prompt: 'What will this code print?',
                    code: PLAYERS + '\n' + py`print(names[scores.index(max(scores))])`,
                    choices: ['Bix', 'Glitch', 'Bolt'],
                    answer: 'Glitch',
                    hints: ['max(scores) is 45. Where is 45? Who is at that position?'],
                },
                {
                    id: 't2',
                    type: 'breakit',
                    title: 'Tie breaker',
                    prompt: 'On a tie, the player listed FIRST should win. Find the scores that break Bolt\'s winner code.',
                    robot: py`
                        names = ["Bix", "Glitch", "Bolt"]
                        best = 0
                        for i in range(len(scores)):
                            if scores[i] >= scores[best]:
                                best = i
                        print(names[best])
                    `,
                    correct: py`
                        names = ["Bix", "Glitch", "Bolt"]
                        best = 0
                        for i in range(len(scores)):
                            if scores[i] > scores[best]:
                                best = i
                        print(names[best])
                    `,
                    inputName: 'scores',
                    choices: ['[30, 45, 20]', '[45, 30, 45]', '[10, 20, 30]'],
                    answer: '[45, 30, 45]',
                    hints: ['Try a TIE for first place.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: The full leaderboard',
                    prompt: 'Print the whole leaderboard like the 🎯 Goal: a title, every player ranked from best to worst ("1. Glitch - 45"), then the average rounded to 1 decimal place. Hint: find the best, print it, `pop` it out of both lists, repeat!',
                    starter: py`
                        names = ["Bix", "Glitch", "Bolt", "Pip"]
                        scores = [30, 45, 20, 32]
                    `,
                    solution: py`
                        names = ["Bix", "Glitch", "Bolt", "Pip"]
                        scores = [30, 45, 20, 32]
                        average = round(sum(scores) / len(scores), 1)
                        print("=== LEADERBOARD ===")
                        rank = 1
                        while len(scores) > 0:
                            best = 0
                            for i in range(len(scores)):
                                if scores[i] > scores[best]:
                                    best = i
                            print(f"{rank}. {names.pop(best)} - {scores.pop(best)}")
                            rank += 1
                        print("Average:", average)
                    `,
                    check: py`
                        assert same_output(output, expected_output), "Compare your board with the 🎯 Goal, line by line."
                    `,
                    hints: [
                        'Work out the average FIRST, before you pop everything out of the lists.',
                        'while len(scores) > 0: find the best position, print it, pop it from both lists.',
                        'print(f"{rank}. {names.pop(best)} - {scores.pop(best)}") and then rank += 1',
                    ],
                },
            ],
        },
    ],
};
