import type { World } from '../schema';
import { ch1 } from './ch1-while';
import { ch2 } from './ch2-lists';
import { ch3 } from './ch3-patterns';
import { ch4 } from './ch4-search';
import { ch5 } from './ch5-grids';
import { ch6 } from './ch6-letters';
import { ch7 } from './ch7-robot';
import { ch8 } from './ch8-project';
import { characters } from './world';

export const world3: World = {
    id: 'w3',
    number: 3,
    title: 'Loops and Lists',
    game: 'Brick Park',
    ages: '9–10',
    emoji: '🧱',
    blurb: 'While loops, lists, loop patterns, searching, grids, letters, reading code, and a leaderboard.',
    theme: {
        bg: 'from-sky-950 via-cyan-900 to-slate-900',
        card: 'bg-slate-800/90',
        accent: 'text-cyan-300',
        border: 'border-cyan-400',
        button: 'bg-cyan-400 hover:bg-cyan-300 text-slate-900',
        color: '#06b6d4',
    },
    characters,
    chapters: [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8],
};
