// Decides whether a kid's answer solves a puzzle. Shared by the app and the
// content validator, so both judge answers exactly the same way.
import type { BreakItPuzzle, CodePuzzle, InstructPuzzle, PredictPuzzle, Puzzle } from '../content/schema';
import { solutionCode } from '../content/schema';
import { explain } from './explain';
import type { RunRequest, RunResult, TraceRequest, TraceResult } from './python/types';
import { drawingsMatch } from './turtleMatch';

export type Runner = (req: RunRequest) => Promise<RunResult>;
export type Tracer = (req: TraceRequest) => Promise<TraceResult>;

export interface Verdict {
    passed: boolean;
    message: string;
    result?: RunResult;
}

const MISMATCH = '__OUTPUT_MISMATCH__';
const DEFAULT_CHECK = `assert same_output(output, expected_output), "${MISMATCH}"`;

const goalCache = new Map<string, Promise<RunResult>>();

/** What the reference solution prints/draws. Cached per solution. */
export function goalFor(run: Runner, p: Puzzle): Promise<RunResult> | null {
    const code = solutionCode(p);
    if (code === null) return null;
    const inputs = 'inputs' in p ? p.inputs : undefined;
    const cacheKey = code + '\u0000' + JSON.stringify(inputs ?? null);
    let goal = goalCache.get(cacheKey);
    if (!goal) {
        goal = run({ code, inputs });
        goalCache.set(cacheKey, goal);
        goal.catch(() => goalCache.delete(cacheKey));
    }
    return goal;
}

export function checkFor(p: CodePuzzle): string | null {
    if (p.check) return p.check;
    return p.turtle ? null : DEFAULT_CHECK;
}

export async function gradeCode(run: Runner, p: CodePuzzle, code: string): Promise<Verdict> {
    const goal = await goalFor(run, p)!;
    const result = await run({ code, check: checkFor(p), expectedOutput: goal.output, inputs: p.inputs });

    if (result.error) return { passed: false, message: explain(result.error), result };
    if (result.passed === false) {
        let message = `🤔 ${result.fail}`;
        if (!result.fail || result.fail === MISMATCH) {
            message = p.hideGoal
                ? '🤔 Not quite! Read the question again.'
                : `🤔 ${describeMismatch(goal.output, result.output)}`;
        }
        return { passed: false, message, result };
    }
    if (p.turtle && !drawingsMatch(result.turtle, goal.turtle)) {
        const message = result.turtle
            ? "🐢 Close! Your drawing doesn't match the dotted goal picture yet."
            : "🐢 The turtle didn't draw anything. Did you tell it to move?";
        return { passed: false, message, result };
    }
    return { passed: true, message: '', result };
}

/** Ignores spacing and capital letters, so "Dig  dig" matches "dig dig". */
export function normalizeAnswer(s: string): string {
    return s.split('\n').map(l => l.trim().replace(/\s+/g, ' ')).filter(Boolean).join('\n').toLowerCase();
}

/** Points at the first line where the kid's output differs from the goal. */
export function describeMismatch(goal: string, got: string): string {
    if (!got.trim()) return "Your code didn't print anything yet. Use print(...) to show what's in the 🎯 Goal box.";
    const g = goal.trimEnd().split('\n').map(l => l.trimEnd());
    const k = got.trimEnd().split('\n').map(l => l.trimEnd());
    for (let i = 0; i < Math.max(g.length, k.length); i++) {
        if (g[i] === k[i]) continue;
        const n = i + 1;
        if (g[i] === undefined) return `Your code printed an extra line ${n}: "${k[i]}". The 🎯 Goal only has ${g.length} line${g.length === 1 ? '' : 's'}.`;
        if (k[i] === undefined) return `Line ${n} is missing. The 🎯 Goal has "${g[i]}" there.`;
        let tip = '';
        if (g[i].toLowerCase() === k[i].toLowerCase()) tip = ' Check your capital letters!';
        else if (g[i].replace(/\s/g, '') === k[i].replace(/\s/g, '')) tip = ' Check your spaces!';
        return `Line ${n} should be "${g[i]}" but your code printed "${k[i]}".${tip}`;
    }
    return 'Compare what your code printed with the 🎯 Goal box.';
}

/** Same rule as the Python side: ignore trailing spaces and trailing blank lines. */
export function sameOutput(a: string, b: string) {
    const norm = (t: string) => t.trimEnd().split('\n').map(l => l.trimEnd()).join('\n');
    return norm(a) === norm(b);
}

// ---------- Trace tables ----------

/** "TNT", 'TNT' and TNT all count as the same answer. */
export function normalizeCell(s: string) {
    return s.trim().replace(/^(["'])(.*)\1$/, '$2').trim().toLowerCase();
}

/** Which cells are wrong. The table passes when none are. */
export function gradeTrace(expected: string[][], kid: string[][]) {
    const wrong = expected.map((row, r) => row.map((cell, c) => normalizeCell(kid[r]?.[c] ?? '') !== normalizeCell(cell)));
    return { passed: wrong.every(row => row.every(w => !w)), wrong };
}

// ---------- Break it ----------

/** Runs the Robot's program and the correct one on the same input. It "breaks" if they disagree. */
export async function tryBreak(run: Runner, p: BreakItPuzzle, input: string) {
    const setup = `${p.inputName} = ${input}\n`;
    const [robot, correct] = await Promise.all([run({ code: setup + p.robot }), run({ code: setup + p.correct })]);
    const broke = (robot.error?.type ?? null) !== (correct.error?.type ?? null) || !sameOutput(robot.output, correct.output);
    return { broke, robot, correct };
}

// ---------- Better instruction ----------

/** Runs the code the Robot writes for one instruction and compares it with the goal. */
export async function tryInstruction(run: Runner, p: InstructPuzzle, choice: number) {
    const goal = await goalFor(run, p)!;
    const result = await run({ code: p.choices[choice].code });
    const matches = !result.error && (p.turtle ? drawingsMatch(result.turtle, goal.turtle) : sameOutput(result.output, goal.output));
    return { matches, result, goal };
}

export function gradePredict(p: PredictPuzzle, answer: string): Verdict {
    return normalizeAnswer(answer) === normalizeAnswer(p.answer)
        ? { passed: true, message: '' }
        : { passed: false, message: '🤔 Not quite. Read the code again one line at a time, like Python does.' };
}
