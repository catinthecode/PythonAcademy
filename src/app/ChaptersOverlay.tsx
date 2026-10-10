import { useEffect } from 'react';
import { WORLDS } from '../content/worlds';
import { useProfile } from '../progress/store';
import { isChapterDone, isChapterUnlocked } from '../progress/unlock';
import { href } from './router';

/** The "≡" menu: one colour-coded column per World listing its chapters (like Beast Academy's). */
export function ChaptersOverlay({ onClose }: { onClose: () => void }) {
    const profile = useProfile();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black/60 p-3 md:items-center" onClick={onClose}>
            <div className="relative w-full max-w-6xl rounded-2xl border-4 border-amber-100 bg-white p-4 text-stone-900 shadow-2xl md:p-6" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -right-2 -top-2 h-12 w-12 rounded-lg bg-blue-700 text-3xl font-bold text-white hover:bg-blue-600" aria-label="Close">
                    ×
                </button>
                <h2 className="mb-4 text-center text-3xl text-blue-800">🏠 Chapters</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {WORLDS.map(world => (
                        <div key={world.id} className="overflow-hidden rounded-xl border-2 border-stone-200">
                            <div className="px-3 py-2 text-white" style={{ background: world.theme.color }}>
                                <div className="font-display text-2xl drop-shadow">{world.emoji} World {world.number}</div>
                                <div className="text-sm font-bold opacity-90">{world.game} · ages {world.ages}</div>
                            </div>
                            <ol className="space-y-1 p-3" style={{ background: `${world.theme.color}1a` }}>
                                {world.chapters.length === 0 && <li className="italic text-stone-500">Coming soon!</li>}
                                {world.chapters.map((c, i) => {
                                    const open = isChapterUnlocked(profile, world, c);
                                    const done = isChapterDone(profile, world, c);
                                    return (
                                        <li key={c.id}>
                                            {open ? (
                                                <a href={href('w', world.id, c.id)} onClick={onClose} className="block rounded px-1 text-lg hover:bg-white">
                                                    {i + 1}. {c.title} {done && '✅'}
                                                </a>
                                            ) : (
                                                <span className="block px-1 text-lg text-stone-400" title="Pass the previous chapter's Test to unlock">
                                                    {i + 1}. {c.title} 🔒
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
