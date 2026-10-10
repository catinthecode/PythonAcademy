import type { World } from '../schema';
import { ch1 } from './ch1-numbers';
import { ch2 } from './ch2-text';
import { ch3 } from './ch3-booleans';
import { ch4 } from './ch4-if';
import { ch5 } from './ch5-logic';
import { ch6 } from './ch6-input';
import { ch7 } from './ch7-robot';
import { ch8 } from './ch8-project';
import { characters } from './world';

export const world2: World = {
    id: 'w2',
    number: 2,
    title: 'Making Choices',
    game: 'Critter Quest',
    ages: '8–9',
    emoji: '⚡',
    blurb: 'Crunch numbers, play with text, ask True-or-False questions and make your programs choose.',
    theme: {
        bg: 'from-red-950 via-rose-900 to-slate-900',
        card: 'bg-slate-800/90',
        accent: 'text-yellow-300',
        border: 'border-yellow-400',
        button: 'bg-yellow-400 hover:bg-yellow-300 text-slate-900',
        color: '#eab308',
    },
    characters,
    chapters: [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8],
};
