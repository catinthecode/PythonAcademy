import { PY } from '../characters';
import type { Character } from '../schema';

export const characters: Record<string, Character> = {
    py: PY,
    rae: { name: 'Rae', art: 'kid', tint: '#dc2626' },
    fizz: { name: 'Fizz', art: 'critter', tint: '#2dd4bf' },
    blaze: { name: 'Blazewing', art: 'dragon', tint: '#f97316' },
    bolt: { name: 'Bolt', art: 'robot' },
    sneak: { name: 'Sneak', art: 'sneak' },
    hop: { name: 'Hop', art: 'bunny', tint: '#f5f5f4' },
};
