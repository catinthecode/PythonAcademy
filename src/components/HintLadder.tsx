import { playTap } from '../engine/sound';
import { RichText } from './RichText';
import { SpeechButton } from './SpeechButton';

/** Hints unlock one at a time. Each one revealed costs stars (see starsFor). */
export function HintLadder({ hints, shown, onReveal, disabled }: { hints: string[]; shown: number; onReveal: () => void; disabled?: boolean }) {
    return (
        <div className="space-y-2">
            {hints.slice(0, shown).map((h, i) => (
                <div key={i} className="flex items-start justify-between gap-2 rounded-xl border-2 border-amber-300 bg-amber-50 px-3 py-2 text-stone-800">
                    <div className="flex-1">
                        <span className="mr-1 font-bold">💡 Hint {i + 1}:</span>
                        {h.includes('\n') ? <pre className="mt-1 whitespace-pre-wrap rounded bg-stone-900 p-2 font-mono text-sm text-green-300">{h}</pre> : <RichText text={h} />}
                    </div>
                    <SpeechButton text={`Hint ${i + 1}: ${h}`} className="shrink-0 mt-0.5" title="Read hint aloud" />
                </div>
            ))}
            {shown < hints.length && !disabled && (
                <button
                    onClick={() => { playTap(); onReveal(); }}
                    className="rounded-xl border-2 border-amber-400 bg-amber-100 px-4 py-2 font-bold text-amber-900 hover:bg-amber-200 active:scale-95 transition"
                >
                    💡 Need a hint? ({hints.length - shown} left)
                </button>
            )}
        </div>
    );
}
