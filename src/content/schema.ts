// Content is plain data: adding a chapter means writing one of these files,
// never touching the engine. Checks are Python snippets (see harness.py).

// ---------- Characters & comics (drawn as SVG, see src/art) ----------

export type CharacterArt =
    | 'py' | 'miner' | 'turtle' | 'sneak' | 'kid' | 'robot' | 'critter'
    | 'dragon' | 'blob' | 'alien' | 'parrot' | 'bunny' | 'cat' | 'owl' | 'fox';
export type Pose = 'idle' | 'talk' | 'wave' | 'point' | 'think' | 'happy' | 'surprised' | 'sad';
export type SceneId = 'meadow' | 'night' | 'cave' | 'village' | 'room' | 'circuit' | 'screen' | 'arena' | 'sky' | 'castle' | 'space';
export type PropId =
    | 'commandBlock' | 'chest' | 'diamond' | 'tnt' | 'repeater' | 'sign' | 'magnifier'
    | 'pickaxe' | 'torch' | 'bug' | 'cow' | 'candy' | 'coin' | 'quote' | 'scroll' | 'swatter';

export interface Character {
    name: string;
    art: CharacterArt;
    /** Main colour for characters that can be tinted (kid, critter and the animals) */
    tint?: string;
}

export interface CastMember {
    who: string;
    pose?: Pose;
    /** Horizontal position of the character's centre, 0 (left) to 100 (right) */
    x: number;
    /** Where the character's feet are, 0 (top) to 100 (ground). Default 100; lower to stand on a prop */
    y?: number;
    /** Face left instead of right */
    flip?: boolean;
    scale?: number;
}

export interface PropPlacement {
    item: PropId;
    /** 0–100 across the panel */
    x: number;
    /** 0–100 down the panel (100 = ground line at the bottom) */
    y: number;
    scale?: number;
}

export interface ComicPanel {
    scene: SceneId;
    /** What happens in the panel, for screen readers */
    alt: string;
    cast: CastMember[];
    props?: PropPlacement[];
    /** Bubbles point at the speaker automatically */
    bubbles: { who: string; text: string }[];
    caption?: string;
    /** A runnable "Try it" example shown under the panel */
    code?: string;
    /** Starting answers for input() in the Try it box (kids can change them) */
    inputs?: string[];
    /** Span both columns of the comic page */
    wide?: boolean;
}

// ---------- Problems ----------

interface PuzzleBase {
    id: string;
    title: string;
    /** The question. Supports `inline code` in backticks. */
    prompt: string;
    hints: string[];
    boss?: boolean;
}

/** Read code and say what happens. */
export interface PredictPuzzle extends PuzzleBase {
    type: 'predict';
    code: string;
    /** Omit for a typed answer */
    choices?: string[];
    answer: string;
    /**
     * What the answer describes, so the validator can confirm it by running the code:
     * output (default) = what it prints, error = the error type ("No error" if none),
     * drawing = a description of the turtle picture, meaning = a plain-English
     * description of what the code does ("What does it do?"). The last two aren't auto-checked.
     */
    about?: 'output' | 'error' | 'drawing' | 'meaning';
    /** What the "player" types, answering each input() call in order */
    inputs?: string[];
}

/**
 * Trace table: fill in the value of each variable every time `line` finishes running.
 * `rows` are the answers (one row per time the line runs); the validator confirms them.
 */
export interface TracePuzzle extends PuzzleBase {
    type: 'trace';
    code: string;
    line: number;
    columns: string[];
    rows: string[][];
}

/**
 * Break it: the Robot's program has a bug. Pick an input that makes it give a different
 * answer from the correct program. Both programs read the variable `inputName`.
 */
export interface BreakItPuzzle extends PuzzleBase {
    type: 'breakit';
    robot: string;
    correct: string;
    inputName: string;
    /** Python values to try, e.g. ["5", "10", "15"]. The validator requires exactly one to break it. */
    choices: string[];
    answer: string;
}

/**
 * Better instruction: each choice is something the kid could ask the Robot, plus the code the
 * Robot writes for it. Only one choice produces the goal (same output, or same drawing).
 */
export interface InstructPuzzle extends PuzzleBase {
    type: 'instruct';
    goalCode: string;
    turtle?: boolean;
    choices: { text: string; code: string }[];
    answer: number;
}

/** Puzzles where the kid's program is run and graded. */
interface CodePuzzleBase extends PuzzleBase {
    /** Reference solution; its output/drawing is the goal and the validator must pass it */
    solution: string;
    /**
     * Python assertions run after the kid's code. Available names: the kid's variables,
     * `output`, `output_lines`, `source`, `expected_output`, `same_output(a, b)`.
     * Default: output must match the solution's output.
     */
    check?: string;
    /** Grade by comparing the turtle drawing with the solution's drawing */
    turtle?: boolean;
    /** Don't show the solution's output as the goal (for open-ended answers) */
    hideGoal?: boolean;
    /** What the "player" types, answering each input() call in order */
    inputs?: string[];
}

/** Starter code is broken; fix it. Validator also confirms the starter fails. */
export interface FixPuzzle extends CodePuzzleBase {
    type: 'fix';
    starter: string;
}

/** Open challenge. */
export interface WritePuzzle extends CodePuzzleBase {
    type: 'write';
    starter: string;
}

/** Code with ___ gaps; `answers` gives one value per gap for the validator. */
export interface FillPuzzle extends Omit<CodePuzzleBase, 'solution'> {
    type: 'fill';
    template: string;
    answers: string[];
}

/** Put shuffled lines in order (and indent them). `lines` carry their indentation. */
export interface ParsonsPuzzle extends Omit<CodePuzzleBase, 'solution'> {
    type: 'parsons';
    lines: string[];
    /** Extra lines that don't belong */
    distractors?: string[];
}

export type Puzzle =
    | PredictPuzzle | FixPuzzle | WritePuzzle | FillPuzzle | ParsonsPuzzle
    | TracePuzzle | BreakItPuzzle | InstructPuzzle;
/** Puzzles where the kid's own program is run and graded. */
export type CodePuzzle = FixPuzzle | WritePuzzle | FillPuzzle | ParsonsPuzzle;

// ---------- Lessons, chapters, worlds ----------

/** A comic section (Beast Academy's "Guide" pages). Also listed in the Library. */
export interface ReadingLesson {
    kind: 'read';
    id: string;
    title: string;
    panels: ComicPanel[];
}

/** A run of problems that unlock one after another. */
export interface ProblemLesson {
    kind: 'practice' | 'test';
    id: string;
    title: string;
    problems: Puzzle[];
}

export type Lesson = ReadingLesson | ProblemLesson;

export interface Chapter {
    id: string;
    title: string;
    emoji: string;
    summary: string;
    /** In map order. A chapter ends with one test lesson. */
    lessons: Lesson[];
}

export interface WorldTheme {
    /** Page background gradient (Tailwind from/via/to classes) */
    bg: string;
    card: string;
    accent: string;
    border: string;
    button: string;
    /** Solid colour for SVG fills (hex) */
    color: string;
}

export interface World {
    id: string;
    number: number;
    title: string;
    game: string;
    ages: string;
    emoji: string;
    blurb: string;
    theme: WorldTheme;
    characters: Record<string, Character>;
    chapters: Chapter[];
}

// ---------- Helpers ----------

/** The program a puzzle's reference answer represents. */
export function solutionCode(p: Puzzle): string | null {
    switch (p.type) {
        case 'fix':
        case 'write':
            return p.solution;
        case 'fill':
            return fillTemplate(p.template, p.answers);
        case 'parsons':
            return p.lines.join('\n');
        case 'instruct':
            return p.goalCode;
        case 'predict':
        case 'trace':
        case 'breakit':
            return null;
    }
}

export const GAP = '___';

export function fillTemplate(template: string, values: string[]): string {
    let i = 0;
    return template.replace(/___/g, () => values[i++] ?? '');
}
