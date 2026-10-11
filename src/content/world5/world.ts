import { PY } from '../characters';
import type { Character } from '../schema';

export const characters: Record<string, Character> = {
    py: PY,
    nova: { name: 'Nova', art: 'kid', tint: '#9333ea' },
    zork: { name: 'Zork', art: 'alien', tint: '#22d3ee' },
    bolt: { name: 'Bolt', art: 'robot' },
    comet: { name: 'Comet', art: 'fox', tint: '#ea580c' },
};
