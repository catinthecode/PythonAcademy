import { PY } from '../characters';
import type { Character } from '../schema';

export const characters: Record<string, Character> = {
    py: PY,
    max: { name: 'Max', art: 'miner' },
    shelly: { name: 'Shelly', art: 'turtle' },
    sneak: { name: 'Sneak', art: 'sneak' },
    bolt: { name: 'Bolt', art: 'robot' },
};
