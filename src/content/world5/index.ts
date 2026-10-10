import type { World } from '../schema';
import { ch1 } from './ch1-algorithms';
import { ch2 } from './ch2-search-sort';
import { ch3 } from './ch3-recursion';
import { ch4 } from './ch4-objects';
import { ch5 } from './ch5-game-loops';
import { ch6 } from './ch6-data';
import { ch7 } from './ch7-ai';
import { ch8 } from './ch8-capstone';
import { characters } from './world';

export const world5: World = {
    id: 'w5',
    number: 5,
    title: 'Thinking Like a Programmer',
    game: 'The Multiverse',
    ages: '11–12',
    emoji: '🌌',
    blurb: 'Algorithms, searching and sorting, recursion, objects, game loops, data, AI helpers, and your capstone.',
    theme: {
        bg: 'from-violet-950 via-fuchsia-900 to-slate-900',
        card: 'bg-slate-800/90',
        accent: 'text-fuchsia-300',
        border: 'border-fuchsia-400',
        button: 'bg-fuchsia-400 hover:bg-fuchsia-300 text-slate-900',
        color: '#c026d3',
    },
    characters,
    chapters: [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8],
};
