import type { CharacterArt, Pose } from '../content/schema';

/** Outline colour used by every drawing, for the bold comic look. */
export const INK = '#1c1917';
export const LINE = 3;

/** Comic panels use this coordinate space. */
export const PANEL_W = 400;
export const PANEL_H = 250;
export const GROUND_Y = 222;

export interface ArtProps {
    pose: Pose;
    tint?: string;
}

/** Approximate height of each character at scale 1 (feet to top of head). */
export const CHARACTER_HEIGHT: Record<CharacterArt, number> = {
    py: 136,
    miner: 108,
    kid: 112,
    turtle: 92,
    sneak: 90,
    robot: 124,
    critter: 90,
    dragon: 108,
    blob: 70,
    alien: 110,
    parrot: 100,
    bunny: 116,
    cat: 94,
    owl: 90,
    fox: 103,
    mole: 102,
    raccoon: 94,
    golem: 102,
    frog: 98,
    octopus: 86,
    kidMiner: 118,
    kidTrainer: 115,
    kidBuilder: 118,
    kidKnight: 109,
    kidAstronaut: 114,
};
