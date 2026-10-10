import { useState } from 'react';
import { explain } from '../engine/explain';
import type { RunResult } from '../engine/python/types';
import { CodeEditor } from './CodeEditor';
import { OutputConsole } from './OutputConsole';
import { run, usePythonStatus } from './puzzles/hooks';
import { TurtleCanvas } from './TurtleCanvas';

/** A runnable example inside a comic. Kids can edit it and play. */
export function TryIt({ code: initial }: { code: string }) {
    const [code, setCode] = useState(initial);
    const [result, setResult] = useState<RunResult | null>(null);
    const [running, setRunning] = useState(false);
    const status = usePythonStatus();

    const go = async () => {
        setRunning(true);
        try {
            setResult(await run({ code }));
        } finally {
            setRunning(false);
        }
    };

    return (
        <div className="space-y-2 rounded-xl border-2 border-blue-300 bg-blue-50 p-3 text-stone-900">
            <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-blue-800">🧪 Try it!</span>
                <div className="flex gap-2">
                    {code !== initial && (
                        <button onClick={() => { setCode(initial); setResult(null); }} className="rounded-lg bg-stone-200 px-3 py-1 font-bold hover:bg-stone-300">↺</button>
                    )}
                    <button
                        onClick={go}
                        disabled={running || status !== 'ready'}
                        className="rounded-lg bg-blue-700 px-4 py-1 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                        {status !== 'ready' ? 'Loading…' : '▶ Run'}
                    </button>
                </div>
            </div>
            <CodeEditor value={code} onChange={setCode} onRun={go} minLines={1} />
            {result && (
                <>
                    {result.error && (
                        <div className="rounded-xl bg-stone-950 p-3 text-orange-300">{explain(result.error)}</div>
                    )}
                    {result.turtle && <TurtleCanvas drawing={result.turtle} goal={null} />}
                    {(!result.turtle || result.output) && !result.error && <OutputConsole output={result.output} />}
                </>
            )}
        </div>
    );
}
