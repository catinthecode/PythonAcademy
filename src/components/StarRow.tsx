export function StarRow({ stars, max = 3, size = 'text-xl' }: { stars: number; max?: number; size?: string }) {
    return (
        <span className={`inline-flex ${size}`} aria-label={`${stars} of ${max} stars`}>
            {Array.from({ length: max }, (_, i) => (
                <span key={i} className={i < stars ? 'text-yellow-400 drop-shadow' : 'text-stone-300'}>★</span>
            ))}
        </span>
    );
}
