import { RichText } from './RichText';

/** Hints unlock one at a time. Each one revealed costs stars (see starsFor). */
export function HintLadder({ hints, shown, onReveal, disabled }: { hints: string[]; shown: number; onReveal: () => void; disabled?: boolean }) {
    return (
        <div className="space-y-2">
            {hints.slice(0, shown).map((h, i) => (
                <div key={i} className="rounded-xl border-2 border-amber-300 bg-amber-50 px-3 py-2 text-stone-800">
                    <span className="mr-1 font-bold">💡 Hint {i + 1}:</span>
                    {h.includes('\n') ? <pre className="mt-1 whitespace-pre-wrap rounded bg-stone-900 p-2 font-mono text-sm text-green-300">{h}</pre> : <RichText text={h} />}
                </div>
            ))}
            {shown < hints.length && !disabled && (
                <button onClick={onReveal} className="rounded-xl border-2 border-amber-400 bg-amber-100 px-4 py-2 font-bold text-amber-900 hover:bg-amber-200">
                    💡 Need a hint? ({hints.length - shown} left)
                </button>
            )}
        </div>
    );
}
