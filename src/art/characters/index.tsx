import type { Character, Pose } from '../../content/schema';
import { Kid, Miner } from './Blocky';
import { Sneak } from './Sneak';
import { Py } from './Py';
import { Robot } from './Robot';
import { Turtle } from './Turtle';

/** Draws a character facing right with its feet at (0, 0). */
export function CharacterArt({ character, pose = 'idle' }: { character: Character; pose?: Pose }) {
    switch (character.art) {
        case 'py':
            return <Py pose={pose} />;
        case 'miner':
            return <Miner pose={pose} />;
        case 'kid':
            return <Kid pose={pose} tint={character.tint} />;
        case 'turtle':
            return <Turtle pose={pose} />;
        case 'sneak':
            return <Sneak pose={pose} />;
        case 'robot':
            return <Robot pose={pose} />;
    }
}
