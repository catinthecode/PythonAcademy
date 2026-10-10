/** Shows what the "player" types when the program calls input(). */
export function PlayerTypes({ inputs }: { inputs: string[] }) {
    return (
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-violet-100 px-3 py-2 text-violet-900">
            <span className="font-bold">⌨️ The player types:</span>
            {inputs.map((v, i) => (
                <code key={i} className="rounded-lg border-2 border-violet-300 bg-white px-2 py-0.5 font-mono text-base">{v}</code>
            ))}
        </div>
    );
}
