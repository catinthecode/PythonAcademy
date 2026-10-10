import { SpacedLine } from './SpacedLine';

const MAX_LINES = 80;

export function OutputConsole({ output, label = '📜 Output' }: { output: string; label?: string }) {
    const lines = output.replace(/\n$/, '').split('\n');
    const shown = lines.slice(0, MAX_LINES);
    return (
        <div className="max-h-64 overflow-auto rounded-xl bg-stone-950 p-3 font-mono text-base text-green-300">
            <div className="mb-1 font-sans text-xs font-bold uppercase tracking-wide text-stone-400">{label}</div>
            {output === '' ? (
                <div className="text-stone-500">(nothing printed)</div>
            ) : (
                <>
                    {shown.map((l, i) => <div key={i} className="whitespace-pre-wrap"><SpacedLine line={l} cellClass="bg-green-900/60 shadow-[inset_0_0_0_1px_#166534]" />{l ? '' :' '}</div>)}
                    {lines.length > MAX_LINES && <div className="text-stone-500">… and {lines.length - MAX_LINES} more lines</div>}
                </>
            )}
        </div>
    );
}
