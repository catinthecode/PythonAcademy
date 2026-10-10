import { href } from '../app/router';
import { Shell } from '../app/Shell';
import { ComicThumb } from '../art/ComicThumb';
import type { World } from '../content/schema';
import { lessonKey, WORLDS } from '../content/worlds';
import { lessonProgress, useProfile } from '../progress/store';
import { isChapterUnlocked } from '../progress/unlock';

/** Every comic section, grouped by chapter. Re-read any time (Beast Academy's Guide books). */
export function Library({ world }: { world: World }) {
    const profile = useProfile();
    return (
        <Shell world={world} eyebrow="Library" title="📚 Library">
            <div className="mx-auto max-w-6xl">
                <p className="mb-4 rounded-xl bg-black/30 px-4 py-3 text-white/90">
                    Every 📖 comic lesson in one place, so you can re-read any of them. To solve problems and pass tests, go to the{' '}
                    <a href={href()} className="font-bold underline">🏠 Home</a> map.
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                    {WORLDS.map(w => (
                        <a
                            key={w.id}
                            href={href('library', w.id)}
                            className={`rounded-t-xl px-4 py-2 font-bold ${w.id === world.id ? 'bg-amber-50 text-stone-900' : 'bg-black/30 text-white hover:bg-black/40'}`}
                        >
                            {w.emoji} World {w.number}
                        </a>
                    ))}
                </div>
                <div className="space-y-6 rounded-2xl bg-amber-50 p-4 text-stone-900 md:p-6">
                    {world.chapters.length === 0 && <p className="text-lg italic text-stone-500">World {world.number} ({world.game}) is coming soon!</p>}
                    {world.chapters.map((chapter, ci) => {
                        const open = isChapterUnlocked(profile, world, chapter);
                        return (
                            <section key={chapter.id} className="border-b-2 border-stone-200 pb-5 last:border-0">
                                <h2 className="mb-3 text-2xl text-blue-800">{ci + 1}. {chapter.emoji} {chapter.title} {!open && '🔒'}</h2>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {chapter.lessons.map(lesson => {
                                        if (lesson.kind !== 'read') return null;
                                        const read = lessonProgress(profile, lessonKey(world, chapter, lesson)).done;
                                        const card = (
                                            <div className={`overflow-hidden rounded-xl border-4 border-blue-500 bg-white shadow ${open ? 'transition hover:-translate-y-1 hover:shadow-xl' : 'opacity-50 grayscale'}`}>
                                                <ComicThumb panel={lesson.panels[0]} world={world} />
                                                <div className="flex items-center justify-between px-3 py-2">
                                                    <span className="font-display text-lg">{lesson.title}</span>
                                                    {read && <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-green-800" title="Read">✔</span>}
                                                </div>
                                            </div>
                                        );
                                        return open
                                            ? <a key={lesson.id} href={href('w', world.id, chapter.id, 'lesson', lesson.id)}>{card}</a>
                                            : <div key={lesson.id}>{card}</div>;
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </Shell>
    );
}
