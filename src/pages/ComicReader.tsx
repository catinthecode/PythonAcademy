import { useEffect, useState } from 'react';
import { href } from '../app/router';
import { Shell } from '../app/Shell';
import { ComicPanel } from '../art/ComicPanel';
import { triggerConfetti } from '../components/Confetti';
import { TryIt } from '../components/TryIt';
import type { Chapter, ComicPanel as Panel, ReadingLesson, World } from '../content/schema';
import { lessonKey } from '../content/worlds';
import { playReadFinish } from '../engine/sound';
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

const bookAnchor = (lesson: ReadingLesson) => `book-${lesson.id}`;

/** One book of the chapter's comic: its panels, then "I finished reading" and the lesson that follows it. */
function Book({ world, chapter, lesson, number }: { world: World; chapter: Chapter; lesson: ReadingLesson; number: number }) {
    const profile = useProfile();
    const key = lessonKey(world, chapter, lesson);
    const done = lessonProgress(profile, key).done;
    const [earned, setEarned] = useState<number | null>(null);
    const next = chapter.lessons[chapter.lessons.indexOf(lesson) + 1];

    return (
        <section id={bookAnchor(lesson)} className="scroll-mt-28">
            <h2 className="mb-3 flex items-center gap-3 text-2xl text-white md:text-3xl">
                <span className="rounded-full bg-amber-400 px-3 py-0.5 text-base font-extrabold text-stone-900">Book {number}</span>
                📖 {lesson.title}
            </h2>
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
                        onClick={() => {
                            const exp = recordRead(key);
                            setEarned(exp);
                            playReadFinish();
                            triggerConfetti();
                        }}
                        className="rounded-2xl bg-green-600 px-8 py-4 text-xl font-bold text-white shadow-lg hover:bg-green-500 active:scale-95 transition"
                    >
                        ✅ I finished Book {number}!
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
        </section>
    );
}

/**
 * The chapter's whole comic on one page: every reading lesson, one after another.
 * `lesson` is the book the kid opened (from the map or the Library); the page jumps to it.
 * Each book still counts as its own lesson for progress and XP.
 */
export function ComicReader({ world, chapter, lesson }: { world: World; chapter: Chapter; lesson: ReadingLesson }) {
    const profile = useProfile();
    const books = chapter.lessons.filter((l): l is ReadingLesson => l.kind === 'read');
    const key = lessonKey(world, chapter, lesson);
    useEffect(() => {
        if (profile?.lastLesson?.key !== key) updateProfile({ lastLesson: { key, index: 0 } });
        // The first book starts at the top of the page; later books jump to their section.
        const id = requestAnimationFrame(() => {
            if (lesson === books[0]) window.scrollTo(0, 0);
            else document.getElementById(bookAnchor(lesson))?.scrollIntoView();
        });
        return () => cancelAnimationFrame(id);
    }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
    const chapterNo = world.chapters.indexOf(chapter) + 1;

    return (
        <Shell world={world} eyebrow={`World ${world.number} · Chapter ${chapterNo} · Comic`} title={`${chapter.emoji} ${chapter.title}`}>
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a href={href('w', world.id, chapter.id)} className="inline-flex items-center gap-2 font-bold text-white/90 hover:text-white">← 🗺️ Back to the map</a>
                    <a href={href('library', world.id)} className="inline-flex items-center gap-2 font-bold text-white/70 hover:text-white">📚 Library</a>
                    {books.length > 1 && (
                        <nav className="flex flex-wrap gap-2 md:ml-auto" aria-label="Books in this chapter">
                            {books.map((b, i) => {
                                const read = lessonProgress(profile, lessonKey(world, chapter, b)).done;
                                return (
                                    <a
                                        key={b.id}
                                        href={href('w', world.id, chapter.id, 'lesson', b.id)}
                                        aria-current={b === lesson ? 'location' : undefined}
                                        // Same URL means no hashchange, so scroll by hand
                                        onClick={e => {
                                            if (b !== lesson) return;
                                            e.preventDefault();
                                            document.getElementById(bookAnchor(b))?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`rounded-full px-3 py-1 text-sm font-bold ${b === lesson ? 'bg-amber-400 text-stone-900' : 'bg-black/30 text-white hover:bg-black/40'}`}
                                    >
                                        Book {i + 1}: {b.title} {read && '✔'}
                                    </a>
                                );
                            })}
                        </nav>
                    )}
                </div>
                {books.map((b, i) => <Book key={b.id} world={world} chapter={chapter} lesson={b} number={i + 1} />)}
            </div>
        </Shell>
    );
}
