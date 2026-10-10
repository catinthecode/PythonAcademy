import { useEffect, useState } from 'react';
import { href } from '../app/router';
import { Shell } from '../app/Shell';
import { ComicPanel } from '../art/ComicPanel';
import { TryIt } from '../components/TryIt';
import type { Chapter, ComicPanel as Panel, ReadingLesson, World } from '../content/schema';
import { lessonKey } from '../content/worlds';
import { lessonProgress, recordRead, updateProfile, useProfile } from '../progress/store';

/** Reads a panel's speech bubbles aloud with the browser's built-in voice. */
function ReadAloud({ panel, world }: { panel: Panel; world: World }) {
    const [speaking, setSpeaking] = useState(false);
    useEffect(() => () => window.speechSynthesis?.cancel(), []);
    if (!('speechSynthesis' in window)) return null;

    const speak = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        if (speaking) return setSpeaking(false);
        const lines = [...panel.bubbles.map(b => `${world.characters[b.who]?.name ?? ''} says: ${b.text}`), panel.caption ?? ''].filter(Boolean);
        lines.forEach((text, i) => {
            const u = new SpeechSynthesisUtterance(text.replace(/[`*_]/g, ''));
            u.rate = 0.95;
            if (i === lines.length - 1) u.onend = () => setSpeaking(false);
            synth.speak(u);
        });
        setSpeaking(true);
    };

    return (
        <button
            onClick={speak}
            className="absolute bottom-2 right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-stone-900 bg-white/90 text-xl shadow hover:bg-yellow-100"
            aria-label={speaking ? 'Stop reading' : 'Read this panel aloud'}
        >
            {speaking ? '⏹' : '🔊'}
        </button>
    );
}

export function ComicReader({ world, chapter, lesson }: { world: World; chapter: Chapter; lesson: ReadingLesson }) {
    const profile = useProfile();
    const key = lessonKey(world, chapter, lesson);
    const done = lessonProgress(profile, key).done;
    const [earned, setEarned] = useState<number | null>(null);
    const next = chapter.lessons[chapter.lessons.indexOf(lesson) + 1];
    useEffect(() => {
        if (profile?.lastLesson?.key !== key) updateProfile({ lastLesson: { key, index: 0 } });
    }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
    const chapterNo = world.chapters.indexOf(chapter) + 1;

    return (
        <Shell world={world} eyebrow={`World ${world.number} · Chapter ${chapterNo} · Comic`} title={`📖 ${lesson.title}`}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-3 flex gap-4">
                    <a href={href('w', world.id, chapter.id)} className="inline-flex items-center gap-2 font-bold text-white/90 hover:text-white">← 🗺️ Back to the map</a>
                    <a href={href('library', world.id)} className="inline-flex items-center gap-2 font-bold text-white/70 hover:text-white">📚 Library</a>
                </div>
                <div className="rounded-2xl border-4 border-stone-900 bg-amber-50 p-3 shadow-2xl md:p-5">
                    <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                        {lesson.panels.map((panel, i) => (
                            <div key={i} className={`space-y-2 ${panel.wide ? 'md:col-span-2' : ''}`}>
                                <div className="relative">
                                    <ComicPanel panel={panel} world={world} />
                                    <ReadAloud panel={panel} world={world} />
                                </div>
                                {panel.code && <TryIt code={panel.code} inputs={panel.inputs} />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    {!done ? (
                        <button
                            onClick={() => setEarned(recordRead(key))}
                            className="rounded-2xl bg-green-600 px-8 py-4 text-xl font-bold text-white shadow-lg hover:bg-green-500"
                        >
                            ✅ I finished reading!
                        </button>
                    ) : (
                        <div className="rounded-2xl bg-green-100 px-6 py-3 text-xl font-bold text-green-800">
                            ✅ Read! {earned ? <span className="text-yellow-600">+{earned} XP</span> : null}
                        </div>
                    )}
                    {done && next && (
                        <a href={href('w', world.id, chapter.id, 'lesson', next.id)} className="rounded-2xl bg-blue-700 px-6 py-3 text-xl font-bold text-white shadow-lg hover:bg-blue-600">
                            Next: {next.title} →
                        </a>
                    )}
                </div>
            </div>
        </Shell>
    );
}
