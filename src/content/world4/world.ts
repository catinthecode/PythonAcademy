import { PY } from '../characters';
import type { Character } from '../schema';

export const characters: Record<string, Character> = {
    py: PY,
    kai: { name: 'Kai', art: 'kidKnight' },
    slime: { name: 'Slime', art: 'blob', tint: '#84cc16' },
    bolt: { name: 'Bolt', art: 'robot' },
    hoot: { name: 'Hoot', art: 'owl', tint: '#a16207' },
};
