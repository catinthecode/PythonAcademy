import type { Character, Pose } from '../../content/schema';
import { Alien } from './Alien';
import { Kid, Miner } from './Blocky';
import { Blob } from './Blob';
import { BrickGolem } from './BrickGolem';
import { Bunny } from './Bunny';
import { Cat } from './Cat';
import { Child } from './Child';
import { Critter } from './Critter';
import { Dragon } from './Dragon';
import { Fox } from './Fox';
import { FrogKnight } from './FrogKnight';
import { Mole } from './Mole';
import { Octopus } from './Octopus';
import { Owl } from './Owl';
import { Parrot } from './Parrot';
import { Py } from './Py';
import { Raccoon } from './Raccoon';
import { Robot } from './Robot';
import { Sneak } from './Sneak';
import { Turtle } from './Turtle';

/** Draws a character facing right with its feet at (0, 0). */
export function CharacterArt({ character, pose = 'idle' }: { character: Character; pose?: Pose }) {
    const tint = character.tint;
    switch (character.art) {
        case 'py':
            return <Py pose={pose} />;
        case 'miner':
            return <Miner pose={pose} />;
        case 'kid':
            return <Kid pose={pose} tint={tint} />;
        case 'turtle':
            return <Turtle pose={pose} />;
        case 'sneak':
            return <Sneak pose={pose} />;
        case 'robot':
            return <Robot pose={pose} />;
        case 'critter':
            return <Critter pose={pose} tint={tint} />;
        case 'dragon':
            return <Dragon pose={pose} tint={tint} />;
        case 'blob':
            return <Blob pose={pose} tint={tint} />;
        case 'alien':
            return <Alien pose={pose} tint={tint} />;
        case 'parrot':
            return <Parrot pose={pose} tint={tint} />;
        case 'bunny':
            return <Bunny pose={pose} tint={tint} />;
        case 'cat':
            return <Cat pose={pose} tint={tint} />;
        case 'owl':
            return <Owl pose={pose} tint={tint} />;
        case 'fox':
            return <Fox pose={pose} tint={tint} />;
        case 'mole':
            return <Mole pose={pose} tint={tint} />;
        case 'raccoon':
            return <Raccoon pose={pose} tint={tint} />;
        case 'golem':
            return <BrickGolem pose={pose} tint={tint} />;
        case 'frog':
            return <FrogKnight pose={pose} tint={tint} />;
        case 'octopus':
            return <Octopus pose={pose} tint={tint} />;
        case 'kidMiner':
        case 'kidTrainer':
        case 'kidBuilder':
        case 'kidKnight':
        case 'kidAstronaut':
            return <Child pose={pose} art={character.art} />;
    }
}
