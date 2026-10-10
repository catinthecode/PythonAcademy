import { useEffect, useState } from 'react';
import { href, navigate } from '../app/router';
import { Shell } from '../app/Shell';
import { CharacterArt } from '../art/characters';
import { HintLadder } from '../components/HintLadder';
import { PuzzleView } from '../components/puzzles/Puzzles';
import { RichText } from '../components/RichText';
import { StarRow } from '../components/StarRow';
import { PY } from '../content/characters';
import type { Chapter, Pose, ProblemLesson, World } from '../content/schema';
import { lessonKey } from '../content/worlds';
import { clearDrafts } from '../components/puzzles/hooks';
import { lessonProgress, recordHint, recordSolved, restartLesson, updateProfile, useProfile } from '../progress/store';
import { isLessonUnlocked } from '../progress/unlock';
import { starsFor, XP } from '../progress/xp';

const TYPE_LABEL = {
    predict: 'Predict',
    fix: 'Fix the bug',
    write: 'Write it',
    fill: 'Fill the gap',
    parsons: 'Put in order',
    trace: 'Trace table',
    breakit: 'Break it',
    instruct: 'Better instruction',
};

function PyCard({ pose, children }: { pose: Pose; children: React.ReactNode }) {
    return (
        <div className="flex items-end gap-2">
            <svg viewBox="-40 -145 100 150" className="hidden w-20 shrink-0 sm:block md:w-24" aria-hidden>
                <CharacterArt character={PY} pose={pose} />
            </svg>
            <div className="relative flex-1 rounded-2xl border-[3px] border-stone-800 bg-white px-4 py-3 text-lg font-semibold text-stone-900 md:text-xl">
                {children}
            </div>
        </div>
    );
}

export function LessonPlayer({ world, chapter, lesson }: { world: World; chapter: Chapter; lesson: ProblemLesson }) {
    const profile = useProfile();
    const key = lessonKey(world, chapter, lesson);
    const lp = lessonProgress(profile, key);
    const ids = lesson.problems.map(p => p.id);
    const firstOpen = Math.max(0, ids.findIndex(id => !lp.solved.includes(id)));
    const allSolved = ids.every(id => lp.solved.includes(id));

    // index === ids.length means the results screen. Coming back to a lesson resumes on the
    // problem the kid was looking at.
    const [index, setIndex] = useState(() => {
        const saved = profile?.lastLesson?.key === key ? profile.lastLesson.index : -1;
        if (saved >= 0 && saved <= (allSolved ? ids.length : firstOpen)) return saved;
        return allSolved ? ids.length : firstOpen;
    });
    // Bumped on "Restart lesson" so every puzzle starts fresh
    const [round, setRound] = useState(0);
    const [confirmRestart, setConfirmRestart] = useState(false);    const [justEarned, setJustEarned] = useState<number | null>(null);
    useEffect(() => setJustEarned(null), [index]);
    useEffect(() => {
        if (profile?.lastLesson?.key !== key || profile.lastLesson.index !== index) updateProfile({ lastLesson: { key, index } });
    }, [key, index]); // eslint-disable-line react-hooks/exhaustive-deps

    const restart = () => {
        restartLesson(key);
        clearDrafts(`${profile?.id}/${key}/`);
        setRound(r => r + 1);
        setIndex(0);
    };

    if (!isLessonUnlocked(profile, world, chapter, lesson)) {
        return (
            <Shell world={world} title={lesson.title}>
                <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center text-stone-900">
                    🔒 Finish all the practice lessons in this chapter to unlock the Test.
                    <div className="mt-4"><a className="font-bold text-blue-700 underline" href={href('w', world.id, chapter.id)}>Back to the map</a></div>
                </div>
            </Shell>
        );
    }

    const finished = allSolved && index >= ids.length;
    const problem = lesson.problems[Math.min(index, ids.length - 1)];
    const solved = lp.solved.includes(problem.id);
    const hintsShown = lp.hints[problem.id] ?? 0;
    const unlockedUpTo = allSolved ? ids.length - 1 : firstOpen;
    const totalHints = Object.values(lp.hints).reduce((a, b) => a + b, 0);

    const onSolved = () => {
        const earned = recordSolved(key, problem.id, { boss: !!problem.boss, problemIds: ids });
        setJustEarned(earned);
    };

    const goNext = () => setIndex(i => (i + 1 < ids.length ? i + 1 : ids.length));
    const chapterNo = world.chapters.indexOf(chapter) + 1;

    return (
        <Shell world={world} eyebrow={`World ${world.number} · Chapter ${chapterNo} · ${lesson.kind === 'test' ? 'Test' : 'Practice'}`} title={lesson.title}>
            <div className="mx-auto max-w-6xl">
                {/* Top row: back to map + problem circles (Beast Academy style) */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                    <a href={href('w', world.id, chapter.id)} className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-900 bg-blue-600 text-2xl text-white hover:bg-blue-500" aria-label="Back to the chapter map">←</a>
                    <div className="flex flex-wrap gap-2">
                        {lesson.problems.map((p, i) => {
                            const done = lp.solved.includes(p.id);
                            const open = i <= unlockedUpTo;
                            const current = i === index;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => open && setIndex(i)}
                                    disabled={!open}
                                    className={`flex h-12 w-12 items-center justify-center rounded-full border-4 text-lg font-bold shadow ${current ? 'border-yellow-400 ring-4 ring-yellow-300/50' : 'border-white/70'} ${done ? 'bg-green-500 text-white' : open ? 'bg-white text-stone-800' : 'bg-stone-400 text-stone-600'} ${p.boss ? 'rounded-xl' : ''}`}
                                    aria-label={`Problem ${i + 1}${done ? ', solved' : ''}${open ? '' : ', locked'}`}
                                >
                                    {done ? '✔' : open ? (p.boss ? '👾' : i + 1) : '🔒'}
                                </button>
                            );
                        })}
                        {allSolved && (
                            <button
                                key="results"
                                onClick={() => setIndex(ids.length)}
                                className={`flex h-12 items-center rounded-full border-4 px-4 font-bold shadow ${finished ? 'border-yellow-400 bg-yellow-300 text-stone-900' : 'border-white/70 bg-yellow-200 text-stone-800'}`}
                            >
                                🏁 Results
                            </button>
                        )}
                    </div>
                    {lp.solved.length > 0 && (
                        <div className="ml-auto">
                            {confirmRestart ? (
                                <span className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-stone-900">
                                    Start this lesson over?
                                    <button onClick={() => { restart(); setConfirmRestart(false); }} className="rounded-lg bg-orange-500 px-3 py-1 font-bold text-white">Yes</button>
                                    <button onClick={() => setConfirmRestart(false)} className="rounded-lg bg-stone-200 px-3 py-1 font-bold">No</button>
                                </span>
                            ) : (
                                <button onClick={() => setConfirmRestart(true)} className="rounded-xl bg-white/20 px-4 py-2 font-bold text-white hover:bg-white/30">↺ Restart lesson</button>
                            )}
                        </div>
                    )}
                </div>

                {finished ? (
                    <div className="mx-auto max-w-2xl rounded-3xl border-4 border-yellow-400 bg-white p-8 text-center text-stone-900 shadow-2xl">
                        <svg viewBox="-60 -145 120 150" className="mx-auto w-32" aria-hidden><CharacterArt character={PY} pose="happy" /></svg>
                        <h2 className="text-4xl text-blue-800">{lesson.kind === 'test' ? 'Test passed!' : 'Lesson complete!'}</h2>
                        <div className="my-4"><StarRow stars={lp.stars} size="text-6xl" /></div>
                        <p className="mb-6 text-lg">
                            {lp.stars === 3 ? 'Perfect! No hints needed. 🎉' : `You used ${totalHints} hint${totalHints === 1 ? '' : 's'}. Try again without hints for ${starsFor(0)} stars!`}
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <button onClick={() => navigate('w', world.id, chapter.id)} className="rounded-xl bg-blue-700 px-6 py-3 text-lg font-bold text-white hover:bg-blue-600">Back to the map</button>
                            <button onClick={restart} className="rounded-xl bg-stone-200 px-6 py-3 text-lg font-bold hover:bg-stone-300">
                                ↺ {lp.stars < 3 ? 'Replay for more stars' : 'Play again'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`rounded-3xl border-4 bg-amber-50 p-4 text-stone-900 shadow-2xl md:p-6 ${problem.boss ? 'border-fuchsia-500' : 'border-blue-600'}`}>
                        <div className="mb-3 flex flex-wrap items-baseline gap-x-3">
                            <span className={`rounded-full px-3 py-0.5 text-sm font-bold text-white ${problem.boss ? 'bg-fuchsia-600' : 'bg-blue-600'}`}>
                                {problem.boss ? '👾 BOSS' : `Problem ${index + 1}`} · {TYPE_LABEL[problem.type]}
                            </span>
                            <h2 className="text-2xl text-stone-800">{problem.title}</h2>
                        </div>
                        <div className="mb-5">
                            <PyCard pose={solved ? 'happy' : problem.boss ? 'surprised' : 'talk'}>
                                <RichText text={problem.prompt} />
                            </PyCard>
                        </div>

                        <PuzzleView key={`${key}/${problem.id}/${round}`} puzzle={problem} draftKey={`${profile?.id}/${key}/${problem.id}`} onSolved={onSolved} />

                        {solved ? (
                            <div data-testid="solved-banner" className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-4 border-green-500 bg-green-100 px-5 py-4">
                                <div className="text-2xl font-bold text-green-800">
                                    ✅ {problem.boss ? 'Boss defeated!' : 'You got it!'} {justEarned ? <span className="text-yellow-600">+{justEarned} XP</span> : null}
                                </div>
                                <button onClick={goNext} className="rounded-xl bg-green-600 px-6 py-3 text-lg font-bold text-white hover:bg-green-500">
                                    {index + 1 < ids.length ? 'Next problem →' : 'See results 🏁'}
                                </button>
                            </div>
                        ) : (
                            <div className="mt-5">
                                <HintLadder hints={problem.hints} shown={hintsShown} onReveal={() => recordHint(key, problem.id)} />
                                {hintsShown === 0 && <p className="mt-2 text-sm text-stone-500">Solve the whole lesson with no hints for ★★★ ({problem.boss ? XP.boss : XP.problem} XP for this one).</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Shell>
    );
}
