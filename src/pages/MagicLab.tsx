import { useState } from 'react';
import { Shell } from '../app/Shell';
import { CodeEditor, type CodeEditorHandle } from '../components/CodeEditor';
import { MagicSymbolBar } from '../components/MagicSymbolBar';
import { OutputConsole } from '../components/OutputConsole';
import { run, usePythonStatus } from '../components/puzzles/hooks';
import { TurtleCanvas } from '../components/TurtleCanvas';
import { WORLDS } from '../content/worlds';
import { explain } from '../engine/explain';
import type { RunResult } from '../engine/python/types';
import { playSuccess, playTap } from '../engine/sound';
import { triggerConfetti } from '../components/Confetti';
import { useProfile } from '../progress/store';
import { homeChapter } from '../progress/unlock';
import { useRef } from 'react';

interface Template {
    id: string;
    name: string;
    icon: string;
    code: string;
}

const TEMPLATES: Template[] = [
    {
        id: 'rainbow-spiral',
        name: 'Rainbow Spiral',
        icon: '🌈',
        code: `# Rainbow Spiral!
import turtle
t = turtle.Turtle()
colors = ["red", "orange", "yellow", "green", "blue", "purple"]

for x in range(30):
    t.pencolor(colors[x % 6])
    t.width(x / 5 + 1)
    t.forward(x * 4)
    t.left(59)
`,
    },
    {
        id: 'star-flower',
        name: 'Star Flower',
        icon: '🌸',
        code: `# Star Flower!
import turtle
t = turtle.Turtle()
t.pencolor("magenta")
t.width(3)

for i in range(8):
    t.forward(60)
    t.left(135)
`,
    },
    {
        id: 'golden-star',
        name: 'Golden Star',
        icon: '⭐',
        code: `# Golden Star!
import turtle
t = turtle.Turtle()
t.pencolor("gold")
t.width(4)

for i in range(5):
    t.forward(80)
    t.right(144)
`,
    },
    {
        id: 'joke-bot',
        name: 'Joke Bot',
        icon: '🤖',
        code: `# Tell a silly joke!
print("Why did the Python snake cross the road?")
print("...")
print("To get to the other byte! 🐍😂")
`,
    },
];

export function MagicLab() {
    const profile = useProfile();
    const { world } = homeChapter(profile, WORLDS);
    const editorRef = useRef<CodeEditorHandle>(null);
    const [code, setCode] = useState(TEMPLATES[0].code);
    const [result, setResult] = useState<RunResult | null>(null);
    const [running, setRunning] = useState(false);
    const status = usePythonStatus();

    const handleRun = async () => {
        playTap();
        setRunning(true);
        try {
            const res = await run({ code });
            setResult(res);
            if (!res.error) {
                playSuccess();
                triggerConfetti();
            }
        } finally {
            setRunning(false);
        }
    };

    const loadTemplate = (t: Template) => {
        playTap();
        setCode(t.code);
        setResult(null);
    };

    const downloadCanvas = () => {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
        if (!canvas) return;
        playTap();
        const link = document.createElement('a');
        link.download = 'my-python-art.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <Shell world={world} eyebrow="Free Play" title="🧪 Magic Lab">
            <div className="mx-auto max-w-6xl space-y-4">
                {/* Intro & Template bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/90 p-4 text-stone-900 shadow backdrop-blur">
                    <div>
                        <h2 className="text-xl text-blue-800">Your Creative Coding Playground</h2>
                        <p className="text-sm text-stone-600">Draw whatever you imagine with Shelly, or write any Python spell!</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wide text-stone-500">Pick a starter:</span>
                        {TEMPLATES.map(t => (
                            <button
                                key={t.id}
                                onClick={() => loadTemplate(t)}
                                className="flex items-center gap-1 rounded-xl border border-stone-300 bg-amber-50 px-3 py-1.5 font-bold text-stone-800 shadow-sm transition hover:border-blue-500 hover:bg-yellow-200 active:scale-95"
                            >
                                <span>{t.icon}</span>
                                <span className="text-sm">{t.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Workspace */}
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Left: Code Editor with Quick Symbol Bar */}
                    <div className="space-y-3 rounded-2xl bg-amber-50 p-4 shadow-xl border-2 border-stone-300">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-extrabold uppercase tracking-wide text-blue-800">
                                ✏️ Write your spell
                            </span>
                            <button
                                onClick={() => { playTap(); setCode(''); setResult(null); }}
                                className="text-xs font-bold text-stone-500 hover:text-stone-800"
                            >
                                Clear all ✕
                            </button>
                        </div>

                        <MagicSymbolBar onInsert={(s, offset) => editorRef.current?.insertSnippet(s, offset)} />

                        <CodeEditor
                            ref={editorRef}
                            value={code}
                            onChange={setCode}
                            onRun={handleRun}
                            minLines={12}
                        />

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                onClick={handleRun}
                                disabled={running || status !== 'ready'}
                                className="rounded-xl bg-green-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-green-500 active:scale-95 disabled:opacity-50"
                            >
                                {status !== 'ready' ? '🐍 Waking up Python…' : running ? 'Casting… ✨' : '▶ Cast Spell! 🪄'}
                            </button>
                            <span className="text-xs text-stone-500 hidden sm:inline">Ctrl+Enter runs too</span>
                        </div>
                    </div>

                    {/* Right: Results / Turtle Canvas & Console */}
                    <div className="space-y-3 rounded-2xl bg-white p-4 shadow-xl border-2 border-stone-300 min-h-[380px] flex flex-col justify-start">
                        <div className="flex items-center justify-between border-b pb-2">
                            <span className="text-sm font-extrabold uppercase tracking-wide text-stone-700">
                                🎨 What Python Created
                            </span>
                            {result?.turtle && (
                                <button
                                    onClick={downloadCanvas}
                                    className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 hover:bg-blue-200 active:scale-95 transition"
                                >
                                    💾 Save Picture
                                </button>
                            )}
                        </div>

                        {!result && (
                            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-stone-400 border-2 border-dashed border-stone-200 rounded-xl">
                                <span className="text-5xl mb-2">🪄</span>
                                <p className="font-bold text-lg">Your drawing or text will appear here!</p>
                                <p className="text-sm">Tap <b>Cast Spell</b> to run your code.</p>
                            </div>
                        )}

                        {result?.error && (
                            <div className="rounded-xl bg-orange-100 border-2 border-orange-300 p-4 text-orange-950">
                                <div className="font-bold text-lg mb-1">🤔 Oops! Python noticed something:</div>
                                <p>{explain(result.error)}</p>
                            </div>
                        )}

                        {result?.turtle && (
                            <div className="flex justify-center">
                                <TurtleCanvas drawing={result.turtle} goal={null} />
                            </div>
                        )}

                        {result && result.output && (
                            <OutputConsole output={result.output} label="📜 Printed Output" />
                        )}
                    </div>
                </div>
            </div>
        </Shell>
    );
}

