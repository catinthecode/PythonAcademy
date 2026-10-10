import { useEffect, useState } from 'react';
import { isMuted, playTap, subscribeSound, toggleMute } from '../engine/sound';

export function SoundToggle({ className = '' }: { className?: string }) {
    const [muted, setMuted] = useState(isMuted);

    useEffect(() => {
        return subscribeSound(setMuted);
    }, []);

    const onClick = () => {
        const next = toggleMute();
        if (!next) {
            playTap();
        }
    };

    return (
        <button
            onClick={onClick}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-stone-200 bg-white text-xl shadow hover:bg-amber-100 active:scale-95 transition ${className}`}
            title={muted ? 'Unmute sounds' : 'Mute sounds'}
            aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
        >
            {muted ? '🔇' : '🔊'}
        </button>
    );
}

