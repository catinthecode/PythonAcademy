import { CharacterArt } from '../art/characters';
import type { CharacterArt as Art } from '../content/schema';
import type { Avatar as AvatarData } from '../progress/store';

/** Which part of each drawing to show as a round headshot. */
const CROP: Record<Art, string> = {
    py: '-22 -142 70 70',
    miner: '-30 -120 60 60',
    kid: '-30 -122 60 60',
    turtle: '-56 -72 116 80',
    sneak: '-36 -96 72 72',
    robot: '-30 -128 60 60',
};

const NAMES: Record<Art, string> = { py: 'Py', miner: 'Miner', kid: 'Kid', turtle: 'Shelly', sneak: 'Sneak', robot: 'Robot' };

export const AVATAR_CHOICES: AvatarData[] = [
    { art: 'miner' },
    { art: 'kid', tint: '#dc2626' },
    { art: 'kid', tint: '#2563eb' },
    { art: 'kid', tint: '#9333ea' },
    { art: 'kid', tint: '#16a34a' },
    { art: 'kid', tint: '#ea580c' },
    { art: 'py' },
    { art: 'turtle' },
    { art: 'sneak' },
    { art: 'robot' },
];

export function Avatar({ avatar, size = 48, className = '' }: { avatar: AvatarData; size?: number; className?: string }) {
    return (
        <svg
            viewBox={CROP[avatar.art]}
            width={size}
            height={size}
            className={`shrink-0 rounded-full border-[3px] border-yellow-400 bg-sky-200 ${className}`}
            role="img"
            aria-label={`${NAMES[avatar.art]} avatar`}
        >
            <CharacterArt character={{ name: '', art: avatar.art, tint: avatar.tint }} pose="happy" />
        </svg>
    );
}
