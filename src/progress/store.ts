// Kid profiles and their progress. Saved in this browser for now; everything goes through
// the `backend` object, so a server-backed version can replace it later without touching pages.
import { useSyncExternalStore } from 'react';
import type { CharacterArt } from '../content/schema';
import { keepStorage } from './transfer';
import { starsFor, XP } from './xp';

export interface Avatar {
    art: CharacterArt;
    tint?: string;
}

export interface LessonProgress {
    done: boolean;
    /** Problem lessons only: 1–3 once done */
    stars: number;
    /** Problem ids solved so far */
    solved: string[];
    /** Hints used per problem id (counted until the problem is solved) */
    hints: Record<string, number>;
}

export interface Profile {
    id: string;
    name: string;
    avatar: Avatar;
    createdAt: string;
    xp: number;
    /** Keyed by "w1/ch2/practice1" */
    lessons: Record<string, LessonProgress>;
    /** Days with activity, "YYYY-MM-DD", for the streak */
    days: string[];
    /** Grown-up switch: open every chapter and lesson */
    unlockAll?: boolean;
    /** Chapter to show on Home: "w1/ch2" */
    lastChapter?: string;
    /** Lesson in progress, for "Continue" and for coming back to the same problem */
    lastLesson?: { key: string; index: number };
}

interface Data {
    version: 1;
    profiles: Profile[];
    current: string | null;
}

interface Backend {
    load(): Data | null;
    save(data: Data): void;
}

const KEY = 'python-academy.v1';

const localBackend: Backend = {
    load() {
        try {
            const raw = localStorage.getItem(KEY);
            return raw ? (JSON.parse(raw) as Data) : null;
        } catch {
            return null;
        }
    },
    save(data) {
        try {
            localStorage.setItem(KEY, JSON.stringify(data));
        } catch {
            // Private mode or storage full: progress lasts for this visit only.
        }
    },
};

const backend: Backend = localBackend;
let data: Data = backend.load() ?? { version: 1, profiles: [], current: null };
const listeners = new Set<() => void>();
// Once there's progress worth keeping, ask the browser not to clear it.
if (data.profiles.length > 0) void keepStorage();

function commit(next: Data) {
    data = next;
    backend.save(data);
    listeners.forEach(l => l());
}

function subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export function useProgress() {
    return useSyncExternalStore(subscribe, () => data);
}

export function useProfile(): Profile | null {
    const d = useProgress();
    return d.profiles.find(p => p.id === d.current) ?? null;
}

function updateCurrent(fn: (p: Profile) => Profile) {
    commit({ ...data, profiles: data.profiles.map(p => (p.id === data.current ? fn(p) : p)) });
}

function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function markActive(p: Profile): Profile {
    const day = today();
    return p.days.includes(day) ? p : { ...p, days: [...p.days, day] };
}

const emptyLesson = (): LessonProgress => ({ done: false, stars: 0, solved: [], hints: {} });

// ---------- profiles ----------

export function createProfile(name: string, avatar: Avatar) {
    const profile: Profile = {
        id: Math.random().toString(36).slice(2, 10),
        name: name.trim(),
        avatar,
        createdAt: new Date().toISOString(),
        xp: 0,
        lessons: {},
        days: [],
    };
    commit({ ...data, profiles: [...data.profiles, profile], current: profile.id });
    void keepStorage();
}

/** Adds a player loaded from a backup file. A player with the same id is replaced by the file's copy. */
export function importProfile(profile: Profile) {
    const exists = data.profiles.some(p => p.id === profile.id);
    const profiles = exists ? data.profiles.map(p => (p.id === profile.id ? profile : p)) : [...data.profiles, profile];
    commit({ ...data, profiles, current: profile.id });
    void keepStorage();
}

export function switchProfile(id: string | null) {
    commit({ ...data, current: id });
}

export function updateProfile(changes: Partial<Pick<Profile, 'name' | 'avatar' | 'unlockAll' | 'lastChapter' | 'lastLesson'>>) {
    updateCurrent(p => ({ ...p, ...changes }));
}

export function deleteProfile(id: string) {
    commit({ ...data, profiles: data.profiles.filter(p => p.id !== id), current: data.current === id ? null : data.current });
}

// ---------- progress ----------

export function lessonProgress(p: Profile | null, key: string): LessonProgress {
    return p?.lessons[key] ?? emptyLesson();
}

export function recordHint(key: string, problemId: string) {
    updateCurrent(p => {
        const lp = lessonProgress(p, key);
        if (lp.solved.includes(problemId)) return p;
        return { ...p, lessons: { ...p.lessons, [key]: { ...lp, hints: { ...lp.hints, [problemId]: (lp.hints[problemId] ?? 0) + 1 } } } };
    });
}

/** Marks a problem solved. Returns the XP earned (0 if it was already solved). */
export function recordSolved(key: string, problemId: string, opts: { boss: boolean; problemIds: string[] }): number {
    let earned = 0;
    updateCurrent(p => {
        const lp = lessonProgress(p, key);
        if (lp.solved.includes(problemId)) return p;
        earned = opts.boss ? XP.boss : XP.problem;
        const solved = [...lp.solved, problemId];
        const done = opts.problemIds.every(id => solved.includes(id));
        const totalHints = Object.values(lp.hints).reduce((a, b) => a + b, 0);
        const next: LessonProgress = { ...lp, solved, done: lp.done || done, stars: done ? Math.max(lp.stars, starsFor(totalHints)) : lp.stars };
        return markActive({ ...p, xp: p.xp + earned, lessons: { ...p.lessons, [key]: next } });
    });
    return earned;
}

/** Replay a finished lesson for more stars: clears solved problems and hints, keeps best stars. */
export function restartLesson(key: string) {
    updateCurrent(p => {
        const lp = lessonProgress(p, key);
        return { ...p, lessons: { ...p.lessons, [key]: { ...lp, solved: [], hints: {} } } };
    });
}

export function recordRead(key: string): number {
    let earned = 0;
    updateCurrent(p => {
        const lp = lessonProgress(p, key);
        if (lp.done) return markActive(p);
        earned = XP.reading;
        return markActive({ ...p, xp: p.xp + earned, lessons: { ...p.lessons, [key]: { ...lp, done: true } } });
    });
    return earned;
}

/** Consecutive active days ending today (or yesterday, so the streak survives until tonight). */
export function streak(p: Profile): number {
    const days = new Set(p.days);
    const d = new Date();
    const fmt = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
    if (!days.has(fmt(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (days.has(fmt(d))) {
        n++;
        d.setDate(d.getDate() - 1);
    }
    return n;
}
