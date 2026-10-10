import type { World } from '../schema';
import { ch1 } from './ch1-functions';
import { ch2 } from './ch2-params';
import { ch3 } from './ch3-pieces';
import { ch4 } from './ch4-dicts';
import { ch5 } from './ch5-records';
import { ch6 } from './ch6-testing';
import { ch7 } from './ch7-robot';
import { ch8 } from './ch8-project';
import { characters } from './world';

export const world4: World = {
    id: 'w4',
    number: 4,
    title: 'Building Blocks',
    game: 'Hero Kingdom',
    ages: '10–11',
    emoji: '🗡️',
    blurb: 'Functions, parameters and return, breaking problems down, dictionaries, testing, specs, and a text adventure.',
    theme: {
        bg: 'from-amber-950 via-orange-900 to-stone-900',
        card: 'bg-stone-800/90',
        accent: 'text-amber-300',
        border: 'border-amber-400',
        button: 'bg-amber-400 hover:bg-amber-300 text-stone-900',
        color: '#f59e0b',
    },
    characters,
    chapters: [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8],
};
