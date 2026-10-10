import { useEffect, useState } from 'react';
import { href } from '../app/router';
import { Shell } from '../app/Shell';
import { StarRow } from '../components/StarRow';
import type { Chapter, Lesson, World } from '../content/schema';
import { findLesson, lessonKey } from '../content/worlds';
import { lessonProgress, updateProfile, useProfile } from '../progress/store';
import { isChapterDone, isChapterUnlocked, isLessonUnlocked, tally } from '../progress/unlock';

// Reading lessons look like books (blue, square); problem lessons look like challenges (round).
const KIND = {
    read: {
        icon: '📖', label: 'Read the comic', shape: 'rounded-lg',
        medal: 'border-sky-600 bg-white', card: 'border-sky-500 bg-sky-50', tag: 'bg-sky-500',
    },
    practice: {
        icon: '✏️', label: 'Solve problems', shape: 'rounded-full',
        medal: 'border-orange-800 bg-orange-400', card: 'border-orange-500 bg-amber-50', tag: 'bg-orange-500',
    },
    test: {
        icon: '🏆', label: 'Chapter test', shape: 'rounded-full',
        medal: 'border-fuchsia-900 bg-fuchsia-500', card: 'border-fuchsia-500 bg-fuchsia-50', tag: 'bg-fuchsia-600',
    },
};

/** A big open comic book (the 📖 emoji renders too small on some systems). */
function BookIcon() {
    return (
        <svg viewBox="0 0 48 40" className="w-[80%]" aria-hidden>
            <path d="M24 8 C17 3 8 3 2 6 V36 C8 33 17 33 24 38 Z" fill="#fff" stroke="#0c4a6e" strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M24 8 C31 3 40 3 46 6 V36 C40 33 31 33 24 38 Z" fill="#fff" stroke="#0c4a6e" strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M2 6 V36 C8 33 17 33 24 38 C31 33 40 33 46 36 V6" fill="none" stroke="#0284c7" strokeWidth={4} strokeLinejoin="round" />
            <path d="M7 13 h12 M7 19 h12 M7 25 h9 M29 13 h12 M29 19 h12 M29 25 h9" stroke="#38bdf8" strokeWidth={2.5} strokeLinecap="round" />
            <line x1={24} y1={8} x2={24} y2={38} stroke="#0c4a6e" strokeWidth={2.5} />
        </svg>
    );
}

function useNarrow() {
    const query = '(max-width: 700px)';
    const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const on = () => setNarrow(mq.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);
    return narrow;
}

interface Spot {
    /** Node on the path, in % of the map */
    x: number;
    y: number;
    /** Card position, in % of the map */
    cx: number;
    cy: number;
}

/** Horizontal map on wide screens, vertical on phones. Cards alternate sides of the path. */
function layout(n: number, narrow: boolean): { spots: Spot[]; gate: { x: number; y: number } } {
    const spots: Spot[] = [];
    for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const side = i % 2 === 0 ? -1 : 1;
        if (narrow) {
            const y = 7 + t * 80;
            const x = 50 + side * 14;
            spots.push({ x, y, cx: 50 - side * 22, cy: y });
        } else {
            const x = 10 + t * 76;
            const y = 52 + side * 9;
            spots.push({ x, y, cx: x, cy: 52 - side * 32 });
        }
    }
    return { spots, gate: narrow ? { x: 50, y: 96 } : { x: 95, y: 52 } };
}

function pathThrough(points: { x: number; y: number }[], w: number, h: number) {
    const p = points.map(pt => ({ x: (pt.x / 100) * w, y: (pt.y / 100) * h }));
    let d = `M${p[0].x} ${p[0].y}`;
    for (let i = 1; i < p.length; i++) {
        const a = p[i - 1];
        const b = p[i];
        const vertical = Math.abs(b.y - a.y) > Math.abs(b.x - a.x);
        d += vertical
            ? ` C${a.x} ${(a.y + b.y) / 2} ${b.x} ${(a.y + b.y) / 2} ${b.x} ${b.y}`
            : ` C${(a.x + b.x) / 2} ${a.y} ${(a.x + b.x) / 2} ${b.y} ${b.x} ${b.y}`;
    }
    return d;
}

function MapBackground({ w, h, path }: { w: number; h: number; path: string }) {
    const blocks = Array.from({ length: 40 }, (_, i) => ({ x: (i * 137) % w, y: (i * 89) % h, c: i % 3 }));
    const trees = [[0.03, 0.08], [0.97, 0.1], [0.04, 0.92], [0.96, 0.9], [0.5, 0.04], [0.5, 0.97]];
    return (
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <rect width={w} height={h} fill="#5fae3a" />
            {blocks.map((b, i) => <rect key={i} x={b.x} y={b.y} width={14} height={14} fill={['#6cbf45', '#4f9a2f', '#78c850'][b.c]} />)}
            {trees.map(([tx, ty], i) => (
                <g key={i} transform={`translate(${tx * w} ${ty * h})`}>
                    <rect x={-24} y={-24} width={48} height={48} fill="#2f7a20" stroke="#1c1917" strokeWidth={3} />
                    <rect x={-12} y={-12} width={12} height={12} fill="#3f8f2a" />
                </g>
            ))}
            <path d={path} fill="none" stroke="#8b5a2b" strokeWidth={86} strokeLinecap="round" />
            <path d={path} fill="none" stroke="#e8d3a0" strokeWidth={72} strokeLinecap="round" />
            <path d={path} fill="none" stroke="#fffbeb" strokeWidth={20} strokeLinecap="round" />
            <path d={path} fill="none" stroke="#3b82f6" strokeWidth={6} strokeLinecap="round" />
        </svg>
    );
}

function LessonNode({ world, chapter, lesson, spot }: { world: World; chapter: Chapter; lesson: Lesson; spot: Spot }) {
    const profile = useProfile();
    const lp = lessonProgress(profile, lessonKey(world, chapter, lesson));
    const open = isLessonUnlocked(profile, world, chapter, lesson);
    const kind = KIND[lesson.kind];
    const to = href('w', world.id, chapter.id, 'lesson', lesson.id);
    const count = lesson.kind === 'read' ? `${lesson.panels.length} comic panels` : `${lesson.problems.length} problems`;

    const card = (
        <div
            className={`w-36 overflow-hidden rounded-xl border-4 text-center shadow-lg transition md:w-44 ${open ? `${kind.card} hover:-translate-y-1 hover:shadow-2xl` : 'border-stone-400 bg-stone-200/90'}`}
        >
            <div className={`px-1 py-0.5 text-xs font-extrabold uppercase tracking-wider text-white ${open ? kind.tag : 'bg-stone-400'}`}>{kind.icon} {kind.label}</div>
            <div className="p-2">
                <div className="font-display text-lg leading-tight text-stone-800 md:text-xl">{lesson.title}</div>
                <div className="text-xs text-stone-500">{open ? count : '🔒 Finish the practice first'}</div>
            </div>
        </div>
    );

    // Medallion on the path keeps the lesson's icon; a ✔ badge is added when done.
    const medallion = (
        <div className={`relative flex h-16 w-16 items-center justify-center border-[5px] text-4xl shadow-lg md:h-20 md:w-20 md:text-5xl ${kind.shape} ${open ? kind.medal : 'border-stone-500 bg-stone-400'} ${lp.done ? 'ring-4 ring-yellow-300' : ''}`}>
            {!open ? '🔒' : lesson.kind === 'read' ? <BookIcon /> : kind.icon}
            {lp.done && <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-green-500 text-sm font-bold text-white">✔</span>}
        </div>
    );

    return (
        <>
            {/* dotted connector between card and path */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                <line x1={`${spot.x}%`} y1={`${spot.y}%`} x2={`${spot.cx}%`} y2={`${spot.cy}%`} stroke="#1e40af" strokeWidth={4} strokeDasharray="2 8" strokeLinecap="round" />
            </svg>
            <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${spot.cx}%`, top: `${spot.cy}%` }}>
                {open ? <a href={to}>{card}</a> : card}
            </div>
            <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
                {open ? <a href={to} aria-label={`${kind.label}: ${lesson.title}`}>{medallion}</a> : medallion}
                {lp.done && lesson.kind !== 'read' && (
                    <div className="-mt-2 rounded-full bg-white/90 px-1"><StarRow stars={lp.stars} size="text-base" /></div>
                )}
            </div>
        </>
    );
}

export function ChapterMap({ world, chapter }: { world: World; chapter: Chapter }) {
    const profile = useProfile();
    const narrow = useNarrow();
    const key = `${world.id}/${chapter.id}`;

    useEffect(() => {
        if (profile && profile.lastChapter !== key && isChapterUnlocked(profile, world, chapter)) updateProfile({ lastChapter: key });
    }, [profile, key, world, chapter]);

    const index = world.chapters.indexOf(chapter);
    const next = world.chapters[index + 1];
    const unlocked = isChapterUnlocked(profile, world, chapter);
    const passed = isChapterDone(profile, world, chapter);
    const { spots, gate } = layout(chapter.lessons.length, narrow);
    const W = narrow ? 400 : 1000;
    const H = narrow ? 1000 : 560;
    const path = pathThrough([narrow ? { x: 50, y: 0 } : { x: 0, y: 52 }, ...spots, gate], W, H);
    const t = tally(profile, world, [chapter]);
    const prev = world.chapters[index - 1];

    // "Continue" button for the lesson the kid was last in, if it isn't finished
    const last = profile?.lastLesson ? profile.lastLesson.key.split('/') : null;
    const lastFound = last ? findLesson(last[0], last[1], last[2]) : null;
    const resume = lastFound && !lessonProgress(profile, profile!.lastLesson!.key).done ? lastFound : null;

    return (
        <Shell world={world} eyebrow={`World ${world.number} · ${world.game} · Chapter ${index + 1}`} title={`${chapter.emoji} ${chapter.title}`}>
            <div className="mx-auto mb-3 flex max-w-[1400px] flex-wrap items-center gap-3">
                {prev ? (
                    <a href={href('w', world.id, prev.id)} className="rounded-xl bg-black/30 px-4 py-2 font-bold text-white hover:bg-black/40">◀ Chapter {index}</a>
                ) : <span />}
                <p className="flex-1 text-center text-white/90">
                    🗺️ Your path through this chapter: <b>📖 read</b> the comics, <b>✏️ solve</b> the problems, then pass the <b>🏆 test</b>.
                </p>
                {next && (
                    <a href={href('w', world.id, next.id)} className="rounded-xl bg-black/30 px-4 py-2 font-bold text-white hover:bg-black/40">Chapter {index + 2} ▶</a>
                )}
            </div>
            {resume && (
                <a
                    href={href('w', resume.world.id, resume.chapter.id, 'lesson', resume.lesson.id)}
                    className="mx-auto mb-4 flex max-w-xl items-center justify-center gap-3 rounded-2xl border-4 border-yellow-300 bg-green-600 px-6 py-3 text-xl font-bold text-white shadow-xl hover:bg-green-500"
                >
                    ▶ Continue: {resume.lesson.title}
                    <span className="text-sm font-normal opacity-80">(Chapter {resume.world.chapters.indexOf(resume.chapter) + 1})</span>
                </a>
            )}
            {!unlocked && (
                <div className="mb-4 rounded-xl border-2 border-yellow-300 bg-yellow-100 p-3 font-bold text-stone-800">
                    🔒 Pass the Chapter {index} Test to unlock this chapter. (A grown-up can unlock everything from the Profile page.)
                </div>
            )}
            <div
                className={`relative mx-auto w-full overflow-hidden rounded-3xl border-4 border-stone-900 ${unlocked ? '' : 'pointer-events-none opacity-60 grayscale'}`}
                style={{ aspectRatio: `${W} / ${H}`, maxWidth: narrow ? 480 : 1400 }}
            >
                <MapBackground w={W} h={H} path={path} />
                {chapter.lessons.map((lesson, i) => (
                    <LessonNode key={lesson.id} world={world} chapter={chapter} lesson={lesson} spot={spots[i]} />
                ))}
                <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${gate.x}%`, top: `${gate.y}%` }}>
                    {next ? (
                        passed ? (
                            <a href={href('w', world.id, next.id)} className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-900 bg-blue-600 font-display text-lg text-white shadow-lg hover:bg-blue-500" title={`Chapter ${index + 2}: ${next.title}`}>
                                CH{index + 2}
                            </a>
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-500 bg-stone-400 text-2xl" title="Pass the Test to open the next chapter">🔒</div>
                        )
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-yellow-600 bg-yellow-300 text-3xl" title="Last chapter in this World">🏁</div>
                    )}
                </div>
            </div>
            <div className="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/30 p-4">
                <p className="text-lg">{chapter.summary}</p>
                <div className="flex items-center gap-4 font-bold">
                    <span>{t.done}/{t.total} lessons</span>
                    <span className="text-yellow-300">★ {t.stars}/{t.maxStars}</span>
                </div>
            </div>
        </Shell>
    );
}
