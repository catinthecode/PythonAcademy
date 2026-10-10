import { useEffect, useState } from 'react';
import { playStar } from '../engine/sound';

export function StarRow({ stars, max = 3, size = 'text-xl', animated = false }: { stars: number; max?: number; size?: string; animated?: boolean }) {
    const [revealed, setRevealed] = useState(animated ? 0 : stars);

    useEffect(() => {
        if (!animated) {
            setRevealed(stars);
            return;
        }
        setRevealed(0);
        let current = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                current++;
                if (current <= stars) {
                    setRevealed(current);
                    playStar(current - 1);
                }
                if (current >= stars) {
                    clearInterval(interval);
                }
            }, 350);
            return () => clearInterval(interval);
        }, 200);
        return () => clearTimeout(timer);
    }, [stars, animated]);

    return (
        <span className={`inline-flex gap-1 ${size}`} aria-label={`${stars} of ${max} stars`}>
            {Array.from({ length: max }, (_, i) => {
                const active = i < revealed;
                return (
                    <span
                        key={i}
                        className={`inline-block transition-transform duration-300 ${active ? 'scale-110 text-yellow-400 drop-shadow-[0_4px_8px_rgba(250,204,21,0.6)]' : 'scale-90 text-stone-300'}`}
                    >
                        ★
                    </span>
                );
            })}
        </span>
    );
}

