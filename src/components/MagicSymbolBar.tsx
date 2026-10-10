import { playTap } from '../engine/sound';

interface Props {
    onInsert: (snippet: string, cursorOffset?: number) => void;
}

const SYMBOLS: { label: string; snippet: string; offset?: number; title?: string }[] = [
    { label: 'print("…")', snippet: 'print("")', offset: -2, title: 'Insert print function' },
    { label: '“ ”', snippet: '""', offset: -1, title: 'Insert quotes' },
    { label: '( )', snippet: '()', offset: -1, title: 'Insert parentheses' },
    { label: ':', snippet: ':', title: 'Colon' },
    { label: '=', snippet: ' = ', title: 'Assign variable' },
    { label: '==', snippet: ' == ', title: 'Equal to' },
    { label: '+', snippet: ' + ', title: 'Plus' },
    { label: '-', snippet: ' - ', title: 'Minus' },
    { label: '#', snippet: '# ', title: 'Comment' },
];

export function MagicSymbolBar({ onInsert }: Props) {
    const handleInsert = (snippet: string, offset?: number) => {
        playTap();
        onInsert(snippet, offset);
    };

    return (
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50/80 p-2 shadow-inner">
            <span className="text-xs font-bold uppercase tracking-wide text-amber-800 mr-1">
                🪄 Quick Keys:
            </span>
            <div className="flex flex-wrap gap-1.5">
                {SYMBOLS.map((s, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => handleInsert(s.snippet, s.offset)}
                        title={s.title}
                        className="flex h-9 items-center justify-center rounded-lg border-2 border-stone-300 bg-white px-2.5 font-mono text-sm font-bold text-stone-800 shadow-sm transition hover:border-blue-500 hover:bg-blue-50 active:scale-95"
                    >
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

