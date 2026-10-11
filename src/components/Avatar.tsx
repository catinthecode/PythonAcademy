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
    critter: '-40 -92 80 80',
    dragon: '-26 -112 66 66',
    blob: '-42 -78 84 84',
    alien: '-30 -114 66 66',
    parrot: '-20 -108 58 58',
    bunny: '-24 -98 56 56',
    cat: '-28 -100 60 60',
    owl: '-32 -96 66 66',
    fox: '-32 -106 72 72',
    mole: '-24 -106 62 62',
    raccoon: '-24 -98 60 60',
    golem: '-26 -106 62 62',
    frog: '-26 -102 62 62',
    octopus: '-34 -90 70 70',
    kidMiner: '-30 -122 60 60',
    kidTrainer: '-34 -120 68 68',
    kidBuilder: '-30 -122 60 60',
    kidKnight: '-30 -116 60 60',
    kidAstronaut: '-40 -118 68 68',
};

const NAMES: Record<Art, string> = {
    py: 'Py', miner: 'Miner', kid: 'Kid', turtle: 'Shelly', sneak: 'Sneak', robot: 'Robot', critter: 'Critter',
    dragon: 'Dragon', blob: 'Slime', alien: 'Alien', parrot: 'Parrot', bunny: 'Bunny', cat: 'Cat', owl: 'Owl', fox: 'Fox',
    mole: 'Mole', raccoon: 'Raccoon', golem: 'Brick golem', frog: 'Frog knight', octopus: 'Octopus',
    kidMiner: 'Miner kid', kidTrainer: 'Trainer kid', kidBuilder: 'Builder kid', kidKnight: 'Knight kid', kidAstronaut: 'Astronaut kid',
};

export const AVATAR_CHOICES: AvatarData[] = [
    { art: 'kidMiner' },
    { art: 'kidTrainer' },
    { art: 'kidBuilder' },
    { art: 'kidKnight' },
    { art: 'kidAstronaut' },
    { art: 'py' },
    { art: 'turtle' },
    { art: 'sneak' },
    { art: 'robot' },
    { art: 'critter', tint: '#38bdf8' },
    { art: 'critter', tint: '#f97316' },
    { art: 'dragon' },
    { art: 'alien' },
    { art: 'parrot' },
    { art: 'bunny' },
    { art: 'cat' },
    { art: 'owl' },
    { art: 'fox' },
    { art: 'blob' },
    { art: 'mole' },
    { art: 'raccoon' },
    { art: 'golem' },
    { art: 'frog' },
    { art: 'octopus' },
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
