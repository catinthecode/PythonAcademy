/** Renders `inline code` in backticks as code chips. */
export function RichText({ text }: { text: string }) {
    const parts = text.split(/(`[^`]+`)/g);
    return (
        <>
            {parts.map((p, i) =>
                p.startsWith('`') && p.endsWith('`') ? (
                    <code key={i} className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-[0.9em] text-green-300">{p.slice(1, -1)}</code>
                ) : (
                    <span key={i}>{p}</span>
                ),
            )}
        </>
    );
}
