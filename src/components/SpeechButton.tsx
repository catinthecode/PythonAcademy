import { useEffect, useState } from 'react';

interface Props {
    text: string;
    className?: string;
    title?: string;
}

export function SpeechButton({ text, className = '', title = 'Read aloud' }: Props) {
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return null;
    }

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const synth = window.speechSynthesis;
        synth.cancel();

        if (speaking) {
            setSpeaking(false);
            return;
        }

        const cleanText = text.replace(/[`*_~#]/g, '').trim();
        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.92; // Slightly slower, very friendly and clear for young ears
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);

        synth.speak(utterance);
        setSpeaking(true);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-stone-300 bg-white text-base shadow-sm transition hover:border-amber-400 hover:bg-amber-100 active:scale-95 ${speaking ? 'border-amber-500 bg-amber-200 ring-2 ring-amber-300' : ''} ${className}`}
            title={speaking ? 'Stop reading' : title}
            aria-label={speaking ? 'Stop reading' : title}
        >
            {speaking ? '⏹' : '🔊'}
        </button>
    );
}

