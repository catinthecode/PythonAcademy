import { PY } from './characters';
import { py } from './helpers';
import type { Chapter, Lesson, World } from './schema';
import { world1 } from './world1';

// Worlds 2–5 are placeholders for now. Worlds 2 and 3 each have one sneak-peek
// chapter (from the original single-page missions) until their full chapters are written.

const world2: World = {
    id: 'w2',
    number: 2,
    title: 'Making Choices',
    game: 'Critter Quest',
    ages: '8–9',
    emoji: '⚡',
    blurb: 'Math, text tricks, asking questions, and if/else decisions.',
    theme: {
        bg: 'from-red-950 via-rose-900 to-slate-900',
        card: 'bg-slate-800/90',
        accent: 'text-yellow-300',
        border: 'border-yellow-400',
        button: 'bg-yellow-400 hover:bg-yellow-300 text-slate-900',
        color: '#eab308',
    },
    characters: {
        py: PY,
        trainer: { name: 'Trainer', art: 'kid', tint: '#dc2626' },
    },
    chapters: [
        {
            id: 'ch1',
            title: 'Sneak Peek: Shiny Evolver',
            emoji: '✨',
            summary: 'A taste of World 2: numbers vs text.',
            lessons: [
                {
                    kind: 'read',
                    id: 'read1',
                    title: 'Level Up Candy',
                    panels: [
                        {
                            scene: 'meadow',
                            alt: 'A young trainer holds out a level-up candy. Py watches.',
                            wide: true,
                            cast: [
                                { who: 'trainer', pose: 'happy', x: 30 },
                                { who: 'py', pose: 'think', x: 72, flip: true },
                            ],
                            props: [{ item: 'candy', x: 45, y: 60 }],
                            bubbles: [
                                { who: 'trainer', text: 'My Blazewing is level 35. One candy should make it 36!' },
                                { who: 'py', text: "Only if the candy is a number, not text. Let's check!" },
                            ],
                        },
                    ],
                },
                {
                    kind: 'test',
                    id: 'test',
                    title: 'Sneak Peek Challenge',
                    problems: [
                        {
                            id: 'p1',
                            type: 'fix',
                            title: 'Shiny evolver',
                            prompt: 'Python refuses to add text and a number! Fix the candy so Blazewing reaches level 36.',
                            starter: py`
                                dragon_level = 35
                                level_up_candy = "1"  # It is trapped in text quotes!

                                new_level = dragon_level + level_up_candy
                                print("Blazewing is now level", new_level)
                            `,
                            solution: py`
                                dragon_level = 35
                                level_up_candy = 1

                                new_level = dragon_level + level_up_candy
                                print("Blazewing is now level", new_level)
                            `,
                            check: 'assert globals().get("new_level") == 36, "Blazewing should reach level 36!"',
                            hints: [
                                '"1" with quotes is text. 1 without quotes is a number.',
                                'Remove the quotes around 1.',
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

const world3: World = {
    id: 'w3',
    number: 3,
    title: 'Loops and Lists',
    game: 'Brick Park',
    ages: '9–10',
    emoji: '🧱',
    blurb: 'While loops, lists, nested loops and string superpowers.',
    theme: {
        bg: 'from-sky-950 via-cyan-900 to-slate-900',
        card: 'bg-slate-800/90',
        accent: 'text-cyan-300',
        border: 'border-cyan-400',
        button: 'bg-cyan-400 hover:bg-cyan-300 text-slate-900',
        color: '#06b6d4',
    },
    characters: {
        py: PY,
        builder: { name: 'Builder', art: 'kid', tint: '#2563eb' },
    },
    chapters: [
        {
            id: 'ch1',
            title: 'Sneak Peek: Coin Spawner',
            emoji: '🪙',
            summary: 'A taste of World 3: while loops that know when to stop.',
            lessons: [
                {
                    kind: 'read',
                    id: 'read1',
                    title: 'The Endless Coins',
                    panels: [
                        {
                            scene: 'village',
                            alt: 'Coins pour out endlessly while the builder looks shocked and Py facepalms.',
                            wide: true,
                            cast: [
                                { who: 'builder', pose: 'surprised', x: 28 },
                                { who: 'py', pose: 'sad', x: 74, flip: true },
                            ],
                            props: [
                                { item: 'coin', x: 45, y: 40 },
                                { item: 'coin', x: 52, y: 60 },
                                { item: 'coin', x: 48, y: 85 },
                            ],
                            bubbles: [
                                { who: 'builder', text: "My coin spawner won't stop! The server is crashing!" },
                                { who: 'py', text: 'A while loop keeps going until its condition is false. Yours never changes!' },
                            ],
                        },
                    ],
                },
                {
                    kind: 'test',
                    id: 'test',
                    title: 'Sneak Peek Challenge',
                    problems: [
                        {
                            id: 'p1',
                            type: 'fix',
                            title: 'Coin spawner',
                            prompt: 'Run it first to watch the server crash 😱. Then add a line at the bottom of the loop that counts up by 1, so exactly 50 coins spawn.',
                            starter: py`
                                coins_spawned = 0
                                while coins_spawned < 50:
                                    print("🪙 Coin Spawned!")
                                    # Add your line right here!
                            `,
                            solution: py`
                                coins_spawned = 0
                                while coins_spawned < 50:
                                    print("🪙 Coin Spawned!")
                                    coins_spawned = coins_spawned + 1
                            `,
                            check: py`
                                coins = output_lines.count("🪙 Coin Spawned!")
                                assert coins == 50, f"The server spawned {coins} coins. We need exactly 50!"
                            `,
                            hints: [
                                'coins_spawned never changes, so it is always less than 50.',
                                'coins_spawned = coins_spawned + 1 (or the shortcut coins_spawned += 1), pushed in like the print line.',
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

const world4: World = {
    id: 'w4',
    number: 4,
    title: 'Building Blocks',
    game: 'Hero Kingdom',
    ages: '10–11',
    emoji: '🗡️',
    blurb: 'Functions, dictionaries, debugging, and your own text adventure.',
    theme: {
        bg: 'from-amber-950 via-orange-900 to-stone-900',
        card: 'bg-stone-800/90',
        accent: 'text-amber-300',
        border: 'border-amber-400',
        button: 'bg-amber-400 hover:bg-amber-300 text-stone-900',
        color: '#f59e0b',
    },
    characters: { py: PY },
    chapters: [],
};

const world5: World = {
    id: 'w5',
    number: 5,
    title: 'Thinking Like a Programmer',
    game: 'The Multiverse',
    ages: '11–12',
    emoji: '🌌',
    blurb: 'Classes, recursion, algorithms, and real games.',
    theme: {
        bg: 'from-violet-950 via-fuchsia-900 to-slate-900',
        card: 'bg-slate-800/90',
        accent: 'text-fuchsia-300',
        border: 'border-fuchsia-400',
        button: 'bg-fuchsia-400 hover:bg-fuchsia-300 text-slate-900',
        color: '#c026d3',
    },
    characters: { py: PY },
    chapters: [],
};

export const WORLDS: World[] = [world1, world2, world3, world4, world5];

export function findWorld(id: string) {
    return WORLDS.find(w => w.id === id);
}

export function findChapter(worldId: string, chapterId: string): { world: World; chapter: Chapter } | null {
    const world = findWorld(worldId);
    const chapter = world?.chapters.find(c => c.id === chapterId);
    return world && chapter ? { world, chapter } : null;
}

export function findLesson(worldId: string, chapterId: string, lessonId: string) {
    const found = findChapter(worldId, chapterId);
    const lesson = found?.chapter.lessons.find(l => l.id === lessonId);
    return found && lesson ? { ...found, lesson } : null;
}

/** Stable key for saving progress: "w1/ch2/practice1" */
export function lessonKey(world: World, chapter: Chapter, lesson: Lesson) {
    return `${world.id}/${chapter.id}/${lesson.id}`;
}
