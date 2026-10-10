import { PY } from '../characters';
import type { Character } from '../schema';

export const characters: Record<string, Character> = {
    py: PY,
    bix: { name: 'Bix', art: 'kid', tint: '#2563eb' },
    glitch: { name: 'Glitch', art: 'critter', tint: '#a855f7' },
    bolt: { name: 'Bolt', art: 'robot' },
};
