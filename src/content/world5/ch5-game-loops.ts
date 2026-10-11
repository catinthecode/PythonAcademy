import { py } from '../helpers';
import type { Chapter } from '../schema';

export const ch5: Chapter = {
    id: 'ch5',
    title: 'Game Loops',
    emoji: '🎮',
    summary: 'Games change their state a little every frame: move, check for collisions, repeat.',
    lessons: [
        {
            kind: 'read',
            id: 'read1',
            title: 'Frame by Frame',
            panels: [
                {
                    scene: 'space',
                    alt: 'Comet watches a rocket move across the screen in small jumps.',
                    wide: true,
                    cast: [
                        { who: 'comet', pose: 'think', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'comet', text: 'How do games make things move?' },
                        { who: 'py', text: 'A game loop! Each frame: update the state (like position), draw it, repeat, many times a second.' },
                    ],
                    code: py`
                        x = 0
                        speed = 3
                        for frame in range(5):
                            x += speed
                            print("Frame", frame, "x =", x)
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A text rocket moves to the right, one line per frame.',
                    cast: [{ who: 'py', pose: 'point', x: 26 }],
                    bubbles: [{ who: 'py', text: 'Draw each frame with spaces in front: more spaces, further right!' }],
                    code: py`
                        x = 0
                        for frame in range(6):
                            print(" " * x + "🚀")
                            x += 2
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork bounces off the edge of the screen.',
                    cast: [
                        { who: 'zork', pose: 'happy', x: 30 },
                        { who: 'comet', pose: 'surprised', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'zork', text: 'To bounce, flip the speed when I hit a wall: speed = -speed!' }],
                    code: py`
                        x = 0
                        speed = 4
                        for frame in range(8):
                            x += speed
                            if x >= 12 or x <= 0:
                                speed = -speed
                            print(" " * x + "o")
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A game screen shows a score and a row of heart lives.',
                    cast: [
                        { who: 'py', pose: 'point', x: 25 },
                        { who: 'comet', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Everything that changes is a variable: position, score, lives.' },
                        { who: 'comet', text: 'Frame 2 costs me a life!' },
                    ],
                    code: py`
                        score = 0
                        lives = 3
                        for frame in range(4):
                            score += 10
                            if frame == 2:
                                lives -= 1
                            print(f"Frame {frame}: score {score}, lives {lives}")
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Zork\'s rocket keeps snapping back to the start.',
                    cast: [
                        { who: 'zork', pose: 'surprised', x: 25 },
                        { who: 'py', pose: 'talk', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'zork', text: 'My rocket is stuck at 2!' },
                        { who: 'py', text: 'x = 0 is inside the loop, so it resets every frame.' },
                    ],
                    code: py`
                        for frame in range(3):
                            x = 0
                            x += 2
                            print("x =", x)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'A loop of arrows around a game screen: set up, update, check, draw.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'comet', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Every game loop: set up the state BEFORE the loop, then each frame update it, check the rules (like walls), and draw it.' },
                        { who: 'comet', text: 'Set up, update, check, draw!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice1',
            title: 'Moving Things',
            problems: [
                {
                    id: 'p1',
                    type: 'predict',
                    title: 'Where now?',
                    prompt: 'What will this code print?',
                    code: py`
                        x = 0
                        for frame in range(4):
                            x += 5
                        print(x)
                    `,
                    choices: ['20', '5', '25'],
                    answer: '20',
                    hints: ['4 frames, 5 each.'],
                },
                {
                    id: 'p2',
                    type: 'trace',
                    title: 'Frames',
                    prompt: 'What is `x` each time line 4 finishes?',
                    code: py`
                        x = 0
                        speed = 3
                        for frame in range(3):
                            x += speed
                    `,
                    line: 4,
                    columns: ['x'],
                    rows: [['3'], ['6'], ['9']],
                    hints: ['Add the speed each frame.'],
                },
                {
                    id: 'p3',
                    type: 'write',
                    title: 'Flying arrow',
                    prompt: 'Animate an arrow `>` moving right: 5 frames, starting with 0 spaces and adding 2 spaces each frame. Match the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        for frame in range(5):
                            print(" " * (frame * 2) + ">")
                    `,
                    check: py`
                        assert "for" in source or "while" in source, "Use a loop: one print per frame."
                        assert same_output(output, expected_output), "Match the frames."
                    `,
                    hints: ['" " * (frame * 2) gives 0, 2, 4... spaces.'],
                },
                {
                    id: 'p4',
                    type: 'predict',
                    title: 'Bounce back',
                    prompt: 'What will this code print?',
                    code: py`
                        x = 8
                        speed = 3
                        for frame in range(3):
                            x += speed
                            if x > 10:
                                speed = -speed
                        print(x)
                    `,
                    choices: ['5', '17', '11'],
                    answer: '5',
                    hints: ['Frame 1: x = 11, which is > 10, so speed becomes -3.', 'Then 8, then 5.'],
                },
                {
                    id: 'y1',
                    type: 'write',
                    title: 'Your turn: Shield timer',
                    prompt: 'A shield starts at `time = 10` and loses 3 every frame. While time is above 0, take 3 off and print it.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        time = 10
                        while time > 0:
                            time -= 3
                            print(time)
                    `,
                    check: py`
                        assert "while" in source, "Use a while loop: keep going while time > 0."
                        assert same_output(output, expected_output), "Match the goal (the last number goes below 0)."
                    `,
                    hints: ['while time > 0: time -= 3, then print(time)'],
                },
            ],
        },
        {
            kind: 'read',
            id: 'read2',
            title: 'Gravity and Crashes',
            panels: [
                {
                    scene: 'space',
                    alt: 'A ball falls faster and faster toward a planet.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 28 },
                        { who: 'nova', pose: 'think', x: 72, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Gravity changes the SPEED each frame, and the speed changes the position.' },
                        { who: 'nova', text: 'So it falls faster and faster!' },
                    ],
                    code: py`
                        y = 30
                        vy = 0
                        while y > 0:
                            vy -= 2
                            y += vy
                            print("Height:", y)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Comet zooms past a wall without touching it.',
                    cast: [
                        { who: 'comet', pose: 'surprised', x: 30 },
                        { who: 'py', pose: 'point', x: 72, flip: true },
                    ],
                    bubbles: [{ who: 'py', text: 'Careful: moving 6 at a time, x jumps from 18 to 24 and never equals 20. Use >= instead of ==.' }],
                    code: py`
                        x = 0
                        while True:
                            x += 6
                            if x >= 20:
                                print("Hit the wall at", x)
                                break
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Nova steers her ship with arrow keys.',
                    cast: [{ who: 'nova', pose: 'happy', x: 40 }],
                    bubbles: [{ who: 'nova', text: 'Player input each frame changes the state too. That\'s how you steer!' }],
                    code: py`
                        x = 5
                        for move in ["right", "right", "left"]:
                            if move == "right":
                                x += 1
                            elif move == "left":
                                x -= 1
                            print(move, "-> x =", x)
                    `,
                },
                {
                    scene: 'space',
                    alt: 'A ship and a rock get close. A warning light flashes.',
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'comet', pose: 'surprised', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Things crash when they are CLOSE, not just on the exact same spot.' },
                        { who: 'comet', text: 'abs() gives the distance. 2 is too close!' },
                    ],
                    code: py`
                        ship = 7
                        rock = 9
                        if abs(ship - rock) <= 2:
                            print("Too close! Crash!")
                    `,
                },
                {
                    scene: 'screen',
                    alt: 'A rock appears on screen every third frame.',
                    cast: [
                        { who: 'nova', pose: 'point', x: 25 },
                        { who: 'py', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'nova', text: 'Can I make a rock appear every 3 frames?' },
                        { who: 'py', text: 'Use the frame number: frame % 3 == 0.' },
                    ],
                    code: py`
                        for frame in range(7):
                            if frame % 3 == 0:
                                print("Frame", frame, ": rock appears!")
                    `,
                },
                {
                    scene: 'space',
                    alt: 'Nova\'s ship weaves through falling asteroids.',
                    wide: true,
                    cast: [
                        { who: 'py', pose: 'talk', x: 25 },
                        { who: 'nova', pose: 'happy', x: 75, flip: true },
                    ],
                    bubbles: [
                        { who: 'py', text: 'Gravity changes speed, and speed changes position. Check collisions with >= or "close enough", never an exact ==.' },
                        { who: 'nova', text: 'Now I can dodge anything!' },
                    ],
                },
            ],
        },
        {
            kind: 'practice',
            id: 'practice2',
            title: 'Physics Lab',
            problems: [
                {
                    id: 'p5',
                    type: 'write',
                    title: 'Falling star',
                    prompt: 'Start with `y = 20` and `vy = 0`. While y is above 0: take 1 off vy, add vy to y, and print y.',
                    starter: py`
                        y = 20
                        vy = 0
                    `,
                    solution: py`
                        y = 20
                        vy = 0
                        while y > 0:
                            vy -= 1
                            y += vy
                            print(y)
                    `,
                    check: py`
                        assert "while" in source, "Use a while loop."
                        assert same_output(output, expected_output), "Match the falling heights."
                    `,
                    hints: ['vy -= 1, then y += vy, then print(y)'],
                },
                {
                    id: 'p6',
                    type: 'write',
                    turtle: true,
                    title: 'Throw a ball',
                    prompt: 'Draw a ball\'s path: start at (0, 0) with `vy = 20`. For 10 frames: x goes up by 10, y goes up by vy, vy goes down by 4, and `goto(x, y)`.',
                    starter: py`
                        from turtle import *
                        x = 0
                        y = 0
                        vy = 20
                    `,
                    solution: py`
                        from turtle import *
                        x = 0
                        y = 0
                        vy = 20
                        for frame in range(10):
                            x += 10
                            y += vy
                            vy -= 4
                            goto(x, y)
                    `,
                    hints: ['Inside a loop of 10: x += 10, y += vy, vy -= 4, goto(x, y)'],
                },
                {
                    id: 'p7',
                    type: 'fix',
                    title: 'Ghost wall',
                    prompt: 'The ship moves 3 at a time and should stop when it reaches the wall at 10. But it flies through forever! Fix the collision check.',
                    starter: py`
                        x = 0
                        while True:
                            x += 3
                            if x == 10:
                                print("Hit at", x)
                                break
                    `,
                    solution: py`
                        x = 0
                        while True:
                            x += 3
                            if x >= 10:
                                print("Hit at", x)
                                break
                    `,
                    hints: ['x goes 3, 6, 9, 12... it never equals 10 exactly.'],
                },
                {
                    id: 'p8',
                    type: 'breakit',
                    title: 'Edge of the wall',
                    prompt: 'The ship crashes if x reaches the wall at 10 or goes past it. Find the x that breaks Bolt\'s check.',
                    robot: py`print("Crash!" if x > 10 else "Safe")`,
                    correct: py`print("Crash!" if x >= 10 else "Safe")`,
                    inputName: 'x',
                    choices: ['5', '10', '15'],
                    answer: '10',
                    hints: ['"Reaches" includes exactly 10.'],
                },
                {
                    id: 'y2',
                    type: 'write',
                    title: 'Your turn: Race',
                    prompt: 'Racer A moves 3 per frame and racer B moves 4. Both start at 0. Loop frame by frame until someone reaches 20, then print who won and on which frame, like the 🎯 Goal.',
                    starter: py`# Your turn! Write it all yourself.`,
                    solution: py`
                        a = 0
                        b = 0
                        frame = 0
                        while a < 20 and b < 20:
                            frame += 1
                            a += 3
                            b += 4
                        if b >= 20:
                            print("B wins on frame", frame)
                        else:
                            print("A wins on frame", frame)
                    `,
                    check: py`
                        assert "while" in source, "Loop frame by frame with while."
                        assert same_output(output, expected_output), "Match the goal."
                    `,
                    hints: ['Keep going while both are below 20.', 'Count frames; then check who reached 20.'],
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
                    title: 'Speeding up',
                    prompt: 'What will this code print?',
                    code: py`
                        x = 0
                        speed = 1
                        for frame in range(3):
                            speed += 1
                            x += speed
                        print(x)
                    `,
                    choices: ['9', '6', '3'],
                    answer: '9',
                    hints: ['Speeds are 2, 3, 4.'],
                },
                {
                    id: 't2',
                    type: 'fill',
                    title: 'Bounce',
                    prompt: 'Fill in the gap so the ball bounces back when it hits the wall.',
                    template: py`
                        x = 0
                        speed = 5
                        for frame in range(4):
                            x += speed
                            if x >= 10:
                                speed = ___speed
                            print(x)
                    `,
                    answers: ['-'],
                    hints: ['Bouncing means going the opposite way.'],
                },
                {
                    id: 'boss',
                    type: 'write',
                    boss: true,
                    title: 'BOSS: Asteroid dodge',
                    prompt: 'The ship starts at x = 5. Asteroids fall at `asteroids = [5, 4, 6]` (one per frame). Each frame, ask `Move? ` (left, right or stay) and move the ship 1. Print `Frame N: ship at X`. If the ship is where that frame\'s asteroid is, print `Crash!` and stop. If it survives all frames, print `Survived!`.',
                    starter: py`asteroids = [5, 4, 6]`,
                    solution: py`
                        asteroids = [5, 4, 6]
                        x = 5
                        crashed = False
                        for frame in range(len(asteroids)):
                            move = input("Move? ")
                            if move == "left":
                                x -= 1
                            elif move == "right":
                                x += 1
                            print(f"Frame {frame + 1}: ship at {x}")
                            if x == asteroids[frame]:
                                print("Crash!")
                                crashed = True
                                break
                        if not crashed:
                            print("Survived!")
                    `,
                    inputs: ['left', 'right', 'left'],
                    check: py`
                        out = run_with(["stay", "stay", "stay"])
                        assert "Crash!" in out and "Survived!" not in out, "Staying at 5 hits the first asteroid: Crash!"
                        assert "Frame 2" not in out, "Stop the game after a crash."
                        assert same_output(output, expected_output), "left, right, left dodges everything: Survived!"
                    `,
                    hints: ['Loop over the frames; move first, print, then check the asteroid.', 'Use a crashed flag (or break) so Survived! only prints if you made it.'],
                },
            ],
        },
    ],
};
