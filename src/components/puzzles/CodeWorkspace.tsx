import type { ReactNode } from 'react';
import type { CodePuzzle } from '../../content/schema';
import type { Verdict } from '../../engine/grade';
import { OutputConsole } from '../OutputConsole';
import { TurtleCanvas } from '../TurtleCanvas';
import { useGoal, usePythonStatus } from './hooks';

interface Props {
    puzzle: CodePuzzle;
    /** Heading over the editing area, e.g. "✏️ Type your code here" */
    editLabel: string;
    /** The editing UI (editor, gaps, line tiles) */
    children: ReactNode;
    onCast: () => void;
    running: boolean;
    verdict: Verdict | null;
    extraButtons?: ReactNode;
}

/** The 🎯 Goal box: exactly what the kid's program should print. Big and impossible to miss. */
function GoalBox({ output }: { output: string }) {
    return (
        <div className="rounded-2xl border-4 border-yellow-400 bg-yellow-50 p-3 shadow-[0_0_0_4px_rgba(250,204,21,0.25)]">
            <div className="mb-1 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-yellow-800">
                <span className="text-2xl">🎯</span> Goal: make Python print exactly this
            </div>
            <pre className="max-h-48 overflow-auto rounded-xl bg-white px-4 py-3 font-mono text-xl text-stone-900">{output.replace(/\n$/, '') || '(nothing)'}</pre>
        </div>
    );
}

/** Shared layout for every puzzle that runs code. */
export function CodeWorkspace({ puzzle, editLabel, children, onCast, running, verdict, extraButtons }: Props) {
    const status = usePythonStatus();
    const goal = useGoal(puzzle);
    const result = verdict?.result;
    const showTextGoal = !puzzle.turtle && !puzzle.hideGoal;

    return (
        <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="min-w-0 space-y-3">
                    <div className="text-sm font-extrabold uppercase tracking-wide text-blue-800">{editLabel}</div>
                    {children}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={onCast}
                            disabled={running || status !== 'ready'}
                            className="rounded-xl bg-blue-700 px-6 py-3 text-lg font-bold text-white shadow hover:bg-blue-600 active:scale-95 disabled:cursor-wait disabled:opacity-50"
                        >
                            {status !== 'ready' ? '🐍 Waking up Python…' : running ? 'Casting… ✨' : 'Cast Spell 🪄'}
                        </button>
                        {extraButtons}
                        <span className="hidden text-xs text-stone-500 sm:inline">Ctrl+Enter runs too</span>
                    </div>
                </div>

                <div className="min-w-0 space-y-3">
                    {showTextGoal && goal && <GoalBox output={goal.output} />}
                    {puzzle.turtle ? (
                        <div>
                            <div className="mb-1 text-sm font-extrabold uppercase tracking-wide text-yellow-800">🎯 Goal: match the dotted picture</div>
                            <TurtleCanvas drawing={result?.turtle ?? null} goal={goal?.turtle ?? null} />
                        </div>
                    ) : result?.turtle ? (
                        // Open-ended drawing (no goal picture): just show what they made
                        <div>
                            <div className="mb-1 text-sm font-bold text-stone-600">🎨 Your drawing</div>
                            <TurtleCanvas drawing={result.turtle} goal={null} />
                        </div>
                    ) : null}
                    {result && (result.output !== '' || (!puzzle.turtle && !result.turtle && !result.error)) && <OutputConsole output={result.output} label="📜 Your output" />}
                    {!result && showTextGoal && <div className="rounded-xl border-2 border-dashed border-stone-300 p-4 text-center text-stone-400">Your output will appear here when you Cast Spell 🪄</div>}
                </div>
            </div>

            {verdict && !verdict.passed && (
                <div role="status" className="rounded-xl border-2 border-orange-300 bg-orange-50 px-4 py-3 text-lg font-bold text-orange-900">
                    {verdict.message}
                </div>
            )}
        </div>
    );
}
