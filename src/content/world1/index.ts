import type { World } from '../schema';
import { ch1 } from './ch1-hello';
import { ch2 } from './ch2-turtle';
import { ch3 } from './ch3-loops';
import { ch4 } from './ch4-variables';
import { ch5 } from './ch5-patterns';
import { ch6 } from './ch6-bugs';
import { ch7 } from './ch7-robot';
import { ch8 } from './ch8-project';
import { characters } from './world';

export const world1: World = {
    id: 'w1',
    number: 1,
    title: 'First Spells',
    game: 'Block World',
    ages: '7–8',
    emoji: '⛏️',
    blurb: 'Give exact instructions, repeat with loops, remember with variables, and team up with a robot helper.',
    theme: {
        bg: 'from-emerald-950 via-green-900 to-stone-900',
        card: 'bg-stone-800/90',
        accent: 'text-lime-300',
        border: 'border-lime-500',
        button: 'bg-lime-500 hover:bg-lime-400 text-stone-900',
        color: '#65a30d',
    },
    characters,
    chapters: [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8],
};
