// Puzzles about reading, testing and instructing code, rather than writing it:
// trace tables, "break it", and "better instruction".
import { useEffect, useState } from 'react';
import type { BreakItPuzzle, InstructPuzzle, TracePuzzle } from '../../content/schema';
import { gradeTrace, tryBreak, tryInstruction } from '../../engine/grade';
import { explain } from '../../engine/explain';
import type { RunResult } from '../../engine/python/types';
import { playError, playTap } from '../../engine/sound';
import { CharacterArt } from '../../art/characters';
import { CodeEditor } from '../CodeEditor';
import { OutputConsole } from '../OutputConsole';
import { TurtleCanvas } from '../TurtleCanvas';
import { run, trace, useDraft, useGoal, usePythonStatus } from './hooks';
import type { PuzzleProps } from './Puzzles';

const ROBOT = { name: 'Bolt', art: 'robot' as const };

function RobotSays({ children, pose = 'talk' }: { children: React.ReactNode; pose?: 'talk' | 'happy' | 'sad' | 'think' }) {
    return (
        <div className="flex items-end gap-2">
            <svg viewBox="-35 -130 70 132" className="w-14 shrink-0" aria-hidden><CharacterArt character={ROBOT} pose={pose} /></svg>
            <div className="flex-1 rounded-2xl border-[3px] border-slate-500 bg-slate-100 px-3 py-2 font-semibold text-slate-800">{children}</div>
        </div>
    );
}

function Problem({ text }: { text: string }) {
    return <div role="status" className="rounded-xl border-2 border-orange-300 bg-orange-50 px-4 py-3 text-lg font-bold text-orange-900">{text}</div>;
}

// ---------- Trace table ----------

export function TracePuzzleView({ puzzle, draftKey, onSolved }: PuzzleProps<TracePuzzle>) {
    const [cells, setCells] = useDraft<string[][]>(draftKey, puzzle.rows.map(r => r.map(() => '')));
    const [expected, setExpected] = useState<string[][] | null>(null);
    const [wrong, setWrong] = useState<boolean[][] | null>(null);
    const [solved, setSolved] = useState(false);
    const status = usePythonStatus();

    useEffect(() => {
        let alive = true;
        trace({ code: puzzle.code, line: puzzle.line, names: puzzle.columns }).then(t => alive && setExpected(t.rows));
        return () => { alive = false; };
    }, [puzzle]);

    const check = () => {
        if (!expected) return;
        playTap();
        const g = gradeTrace(expected, cells);
        setWrong(g.wrong);
        if (g.passed) {
            setSolved(true);
            onSolved();
        } else {
            playError();
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="min-w-0">
                    <CodeEditor value={puzzle.code} readOnly minLines={2} />
                    <p className="mt-2 text-sm text-stone-600">Fill in a row each time <b>line {puzzle.line}</b> finishes running.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse overflow-hidden rounded-xl text-lg">
                        <thead>
                            <tr className="bg-blue-700 text-white">
                                <th className="px-3 py-2 text-left">Time</th>
                                {puzzle.columns.map(c => <th key={c} className="px-3 py-2 font-mono">{c}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {cells.map((row, r) => (
                                <tr key={r} className="border-b border-stone-200 bg-white">
                                    <td className="px-3 py-1 font-bold text-stone-500">#{r + 1}</td>
                                    {row.map((v, c) => (
                                        <td key={c} className="px-2 py-1">
                                            <input
                                                value={v}
                                                disabled={solved}
                                                onChange={e => setCells(cs => cs.map((rr, i) => (i === r ? rr.map((x, j) => (j === c ? e.target.value : x)) : rr)))}
                                                onKeyDown={e => e.key === 'Enter' && check()}
                                                autoFocus={r === 0 && c === 0}
                                                style={{ caretColor: '#ca8a04' }}
                                                className={`w-full min-w-16 rounded-lg border-2 px-2 py-1 text-center font-mono focus:outline-none focus:ring-4 focus:ring-yellow-300 ${wrong?.[r]?.[c] ? 'border-red-400 bg-red-50' : wrong ? 'border-green-400 bg-green-50' : 'border-stone-300'}`}
                                                aria-label={`${puzzle.columns[c]} at time ${r + 1}`}
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                spellCheck={false}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {!solved && (
                <button onClick={check} disabled={!expected || status !== 'ready'} className="rounded-xl bg-blue-700 px-6 py-3 text-lg font-bold text-white hover:bg-blue-600 disabled:opacity-50">
                    Check my table ✔
                </button>
            )}
            {wrong && !solved && <Problem text="🤔 The red boxes aren't right yet. Go through the code one line at a time." />}
        </div>
    );
}

// ---------- Break it ----------

export function BreakItPuzzleView({ puzzle, onSolved }: PuzzleProps<BreakItPuzzle>) {
    const [picked, setPicked] = useState<string | null>(null);
    const [outcome, setOutcome] = useState<{ broke: boolean; robot: RunResult; correct: RunResult } | null>(null);
    const [solved, setSolved] = useState(false);
    const status = usePythonStatus();

    const tryIt = async (input: string) => {
        playTap();
        setPicked(input);
        setOutcome(null);
        const o = await tryBreak(run, puzzle, input);
        setOutcome(o);
        if (o.broke) {
            setSolved(true);
            onSolved();
        } else {
            playError();
        }
    };
    const shown = (r: RunResult) => (r.error ? `💥 ${r.error.type}` : r.output.trim() || '(nothing)');

    return (
        <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="min-w-0 space-y-2">
                    <RobotSays>Here's the code I wrote. I'm sure it's perfect! 😎</RobotSays>
                    <CodeEditor value={puzzle.robot} readOnly minLines={2} />
                </div>
                <div className="space-y-2">
                    <div className="font-bold text-stone-700">Try a value for <code className="rounded bg-stone-800 px-1.5 text-green-300">{puzzle.inputName}</code>:</div>
                    <div className="flex flex-wrap gap-2">
                        {puzzle.choices.map((c, i) => (
                            <button
                                key={c}
                                data-choice={i}
                                onClick={() => tryIt(c)}
                                disabled={solved || status !== 'ready'}
                                className={`rounded-xl border-4 px-5 py-3 font-mono text-xl shadow disabled:opacity-60 ${picked === c ? 'border-blue-500 bg-blue-50' : 'border-blue-200 bg-white hover:border-blue-500'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                    {outcome && (
                        <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-xl bg-slate-200 p-3">
                                <div className="text-xs font-bold uppercase text-slate-600">🤖 Robot's answer</div>
                                <pre className="whitespace-pre-wrap font-mono text-lg">{shown(outcome.robot)}</pre>
                            </div>
                            <div className="rounded-xl bg-green-100 p-3">
                                <div className="text-xs font-bold uppercase text-green-700">✅ Right answer</div>
                                <pre className="whitespace-pre-wrap font-mono text-lg">{shown(outcome.correct)}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {outcome && !outcome.broke && <Problem text="😎 The robot got that one right. Try a different value. Where might its code slip up?" />}
            {outcome?.broke && <RobotSays pose="sad">Oops! You found my bug. Good thing you tested me!</RobotSays>}
        </div>
    );
}

// ---------- Better instruction ----------

export function InstructPuzzleView({ puzzle, onSolved }: PuzzleProps<InstructPuzzle>) {
    const goal = useGoal(puzzle);
    const status = usePythonStatus();
    const [picked, setPicked] = useState<number | null>(null);
    const [outcome, setOutcome] = useState<{ matches: boolean; result: RunResult } | null>(null);
    const [solved, setSolved] = useState(false);

    const ask = async (i: number) => {
        playTap();
        setPicked(i);
        setOutcome(null);
        const o = await tryInstruction(run, puzzle, i);
        setOutcome(o);
        if (o.matches) {
            setSolved(true);
            onSolved();
        } else {
            playError();
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                    <div className="font-bold text-stone-700">What should you tell Bolt?</div>
                    {puzzle.choices.map((c, i) => (
                        <button
                            key={i}
                            data-choice={i}
                            onClick={() => ask(i)}
                            disabled={solved || status !== 'ready'}
                            className={`block w-full rounded-2xl border-4 px-4 py-3 text-left text-lg shadow disabled:opacity-60 ${picked === i ? 'border-blue-500 bg-blue-50' : 'border-blue-200 bg-white hover:border-blue-500'}`}
                        >
                            💬 “{c.text}”
                        </button>
                    ))}
                </div>
                <div className="space-y-2">
                    {puzzle.turtle ? (
                        <>
                            <div className="text-sm font-bold text-stone-600">🎯 The goal (dotted){outcome ? ' and what Bolt built' : ''}</div>
                            <TurtleCanvas drawing={outcome?.result.turtle ?? null} goal={goal?.turtle ?? null} />
                        </>
                    ) : (
                        goal && (
                            <div className="rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 p-3">
                                <div className="mb-1 text-xs font-bold uppercase tracking-wide text-blue-700">🎯 Goal output</div>
                                <pre className="whitespace-pre-wrap font-mono text-base text-stone-800">{goal.output.trimEnd()}</pre>
                            </div>
                        )
                    )}
                    {outcome && !puzzle.turtle && <OutputConsole output={outcome.result.output} label="🤖 What Bolt's code printed" />}
                </div>
            </div>
            {picked !== null && outcome && (
                <div className="space-y-2">
                    <RobotSays pose={outcome.matches ? 'happy' : 'think'}>
                        {outcome.matches ? 'Got it! Clear instructions make me super useful. Here is my code:' : 'I did EXACTLY what you said... here is my code. Is that what you meant?'}
                    </RobotSays>
                    <CodeEditor value={puzzle.choices[picked].code} readOnly minLines={2} />
                    {outcome.result.error && <Problem text={explain(outcome.result.error)} />}
                </div>
            )}
            {outcome && !outcome.matches && <Problem text="🤔 Not what we wanted! Pick an instruction that says exactly what you mean." />}
        </div>
    );
}
