// One component per puzzle type. Each one reports success through onSolved().
import { useMemo, useState } from 'react';
import type { FillPuzzle, FixPuzzle, ParsonsPuzzle, PredictPuzzle, Puzzle, WritePuzzle } from '../../content/schema';
import { fillTemplate } from '../../content/schema';
import { explain } from '../../engine/explain';
import { gradePredict, type Verdict } from '../../engine/grade';
import type { RunResult } from '../../engine/python/types';
import { CodeEditor } from '../CodeEditor';
import { OutputConsole } from '../OutputConsole';
import { TurtleCanvas } from '../TurtleCanvas';
import { CodeWorkspace } from './CodeWorkspace';
import { run, seededShuffle, useDraft, useGrader } from './hooks';
import { BreakItPuzzleView, InstructPuzzleView, TracePuzzleView } from './ThinkingPuzzles';

export interface PuzzleProps<P extends Puzzle = Puzzle> {
    puzzle: P;
    /** Unique per kid + problem, for saving drafts */
    draftKey: string;
    onSolved: () => void;
}

const resetButton = (onClick: () => void) => (
    <button onClick={onClick} className="rounded-xl bg-stone-200 px-4 py-3 font-bold text-stone-700 hover:bg-stone-300">↺ Reset</button>
);

// ---------- Fix the bug / Write it ----------

export function EditorPuzzle({ puzzle, draftKey, onSolved }: PuzzleProps<FixPuzzle | WritePuzzle>) {
    const [code, setCode, reset] = useDraft<string>(draftKey, puzzle.starter + (puzzle.type === 'write' ? '\n' : ''));
    const { running, verdict, check } = useGrader(puzzle, onSolved);
    return (
        <CodeWorkspace
            puzzle={puzzle}
            editLabel={puzzle.type === 'fix' ? '🔧 Fix the code here' : '✏️ Type your code here'}
            onCast={() => check(code)}
            running={running}
            verdict={verdict}
            extraButtons={resetButton(reset)}
        >
            <CodeEditor value={code} onChange={setCode} onRun={() => check(code)} minLines={Math.max(4, code.split('\n').length)} autoFocus />
        </CodeWorkspace>
    );
}

// ---------- Fill in the blank ----------

export function FillPuzzleView({ puzzle, draftKey, onSolved }: PuzzleProps<FillPuzzle>) {
    const gapCount = puzzle.template.match(/___/g)?.length ?? 0;
    const [values, setValues] = useDraft<string[]>(draftKey, Array(gapCount).fill(''));
    const { running, verdict, check } = useGrader(puzzle, onSolved);
    const code = fillTemplate(puzzle.template, values);
    const cast = () => check(code);

    let gap = 0;
    return (
        <CodeWorkspace puzzle={puzzle} editLabel="✏️ Type in the yellow box" onCast={cast} running={running} verdict={verdict}>
            <pre className="overflow-x-auto rounded-xl bg-[#282c34] p-4 font-mono text-[17px] leading-loose text-stone-100">
                {puzzle.template.split('\n').map((line, li) => (
                    <div key={li}>
                        {line.split('___').map((part, pi, arr) => {
                            const i = gap;
                            const input = pi < arr.length - 1;
                            if (input) gap++;
                            return (
                                <span key={pi}>
                                    {part}
                                    {input && (
                                        <input
                                            value={values[i]}
                                            onChange={e => setValues(v => v.map((x, j) => (j === i ? e.target.value : x)))}
                                            onKeyDown={e => e.key === 'Enter' && cast()}
                                            className="mx-0.5 rounded border-2 border-yellow-400 bg-stone-900 px-1 text-center text-yellow-200 caret-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                                            style={{ width: `${Math.max(4, (puzzle.answers[i]?.length ?? 4) + 2, (values[i] ?? '').length + 1)}ch`, caretColor: '#fde047' }}
                                            autoFocus={i === 0}
                                            aria-label={`Gap ${i + 1}`}
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                            spellCheck={false}
                                        />
                                    )}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </pre>
        </CodeWorkspace>
    );
}

// ---------- Parsons (put the lines in order) ----------

interface Tile {
    id: number;
    text: string;
    indent: number;
}

export function ParsonsPuzzleView({ puzzle, draftKey, onSolved }: PuzzleProps<ParsonsPuzzle>) {
    const usesIndent = puzzle.lines.some(l => /^\s/.test(l));
    const initial = useMemo(
        () => ({
            spare: seededShuffle([...puzzle.lines, ...(puzzle.distractors ?? [])], puzzle.id).map((t, id) => ({ id, text: t.trim(), indent: 0 })),
            program: [] as Tile[],
        }),
        [puzzle],
    );
    const [state, setState, reset] = useDraft(draftKey, initial);
    const { spare, program } = state;
    const setProgram = (fn: (p: Tile[]) => Tile[]) => setState(s => ({ ...s, program: fn(s.program) }));
    const { running, verdict, check } = useGrader(puzzle, onSolved);
    const code = program.map(t => '    '.repeat(t.indent) + t.text).join('\n');

    const move = (i: number, by: number) => setProgram(p => {
        const j = i + by;
        if (j < 0 || j >= p.length) return p;
        const next = [...p];
        [next[i], next[j]] = [next[j], next[i]];
        return next;
    });
    const indent = (i: number, by: number) => setProgram(p => p.map((t, k) => (k === i ? { ...t, indent: Math.min(3, Math.max(0, t.indent + by)) } : t)));
    const add = (t: Tile) => setState(s => ({ spare: s.spare.filter(x => x.id !== t.id), program: [...s.program, t] }));
    const remove = (t: Tile) => setState(s => ({ program: s.program.filter(x => x.id !== t.id), spare: [...s.spare, { ...t, indent: 0 }] }));

    const btn = 'h-9 w-9 rounded-lg bg-stone-700 text-white hover:bg-stone-600 disabled:opacity-30';
    return (
        <CodeWorkspace puzzle={puzzle} editLabel="✋ Tap the lines to build your program" onCast={() => check(code)} running={running} verdict={verdict} extraButtons={resetButton(reset)}>
            <div className="rounded-xl bg-[#282c34] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-400">Your program</div>
                {program.length === 0 && <div className="rounded-lg border-2 border-dashed border-stone-600 p-4 text-center text-stone-400">Tap lines below to add them here</div>}
                <ol className="space-y-2">
                    {program.map((t, i) => (
                        <li key={t.id} className="flex items-center gap-1">
                            <div className="min-w-0 flex-1" style={{ paddingLeft: `${t.indent * 2}rem` }}>
                                <div className="truncate rounded-lg bg-stone-100 px-3 py-2 font-mono text-stone-900 shadow">{t.text}</div>
                            </div>
                            {usesIndent && (
                                <>
                                    <button className={btn} onClick={() => indent(i, -1)} disabled={t.indent === 0} aria-label="Indent less">⇤</button>
                                    <button className={btn} onClick={() => indent(i, 1)} disabled={t.indent === 3} aria-label="Indent more">⇥</button>
                                </>
                            )}
                            <button className={btn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
                            <button className={btn} onClick={() => move(i, 1)} disabled={i === program.length - 1} aria-label="Move down">↓</button>
                            <button className={btn} onClick={() => remove(t)} aria-label="Remove line">✕</button>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="rounded-xl border-2 border-stone-300 bg-stone-100 p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">Spare lines (tap to add)</div>
                <div className="flex flex-wrap gap-2">
                    {spare.length === 0 && <span className="text-sm text-stone-400">All used!</span>}
                    {spare.map(t => (
                        <button
                            key={t.id}
                            onClick={() => add(t)}
                            className="rounded-lg border-2 border-stone-400 bg-white px-3 py-2 font-mono text-stone-900 shadow hover:border-blue-500"
                        >
                            {t.text}
                        </button>
                    ))}
                </div>
            </div>
        </CodeWorkspace>
    );
}

// ---------- Predict ----------

export function PredictPuzzleView({ puzzle, onSolved }: PuzzleProps<PredictPuzzle>) {
    const [typed, setTyped] = useState('');
    const [verdict, setVerdict] = useState<Verdict | null>(null);
    const [reveal, setReveal] = useState<RunResult | null>(null);

    const answer = async (a: string) => {
        const v = gradePredict(puzzle, a);
        setVerdict(v);
        if (v.passed) {
            onSolved();
            setReveal(await run({ code: puzzle.code }));
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="min-w-0">
                    <CodeEditor value={puzzle.code} readOnly minLines={2} />
                </div>
                <div className="space-y-2">
                    {puzzle.choices ? (
                        puzzle.choices.map(c => (
                            <button
                                key={c}
                                onClick={() => answer(c)}
                                disabled={verdict?.passed}
                                className="block w-full rounded-xl border-4 border-blue-200 bg-white px-4 py-3 text-left font-mono text-lg text-stone-900 shadow hover:border-blue-500 disabled:opacity-70"
                            >
                                <span className="whitespace-pre-wrap">{c}</span>
                            </button>
                        ))
                    ) : (
                        <div className="flex gap-2">
                            <textarea
                                value={typed}
                                onChange={e => setTyped(e.target.value)}
                                rows={3}
                                className="flex-1 rounded-xl border-2 border-stone-300 p-3 font-mono text-lg text-stone-900"
                                placeholder="Type what Python prints"
                            />
                            <button onClick={() => answer(typed)} className="rounded-xl bg-blue-700 px-5 font-bold text-white hover:bg-blue-600">Check</button>
                        </div>
                    )}
                </div>
            </div>
            {verdict && !verdict.passed && (
                <div role="status" className="rounded-xl border-2 border-orange-300 bg-orange-50 px-4 py-3 text-lg font-bold text-orange-900">{verdict.message}</div>
            )}
            {reveal && (
                <div className="space-y-2">
                    <div className="font-bold text-stone-700">Here's what Python does:</div>
                    {puzzle.about === 'drawing' || reveal.turtle ? (
                        <TurtleCanvas drawing={reveal.turtle} goal={null} />
                    ) : reveal.error ? (
                        <div className="rounded-xl bg-stone-950 p-3 font-mono text-red-300">
                            {reveal.error.type}{reveal.error.msg ? `: ${reveal.error.msg}` : ''}
                            <div className="mt-1 font-sans text-stone-300">{explain(reveal.error)}</div>
                        </div>
                    ) : (
                        <OutputConsole output={reveal.output} />
                    )}
                </div>
            )}
        </div>
    );
}

export function PuzzleView(props: PuzzleProps) {
    const p = props.puzzle;
    switch (p.type) {
        case 'predict': return <PredictPuzzleView {...props} puzzle={p} />;
        case 'fix':
        case 'write': return <EditorPuzzle {...props} puzzle={p} />;
        case 'fill': return <FillPuzzleView {...props} puzzle={p} />;
        case 'parsons': return <ParsonsPuzzleView {...props} puzzle={p} />;
        case 'trace': return <TracePuzzleView {...props} puzzle={p} />;
        case 'breakit': return <BreakItPuzzleView {...props} puzzle={p} />;
        case 'instruct': return <InstructPuzzleView {...props} puzzle={p} />;
    }
}
