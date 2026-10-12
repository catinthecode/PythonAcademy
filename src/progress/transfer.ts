// Backup and move a player's progress as a small JSON file, so it survives the browser clearing
// its storage and can be loaded on another device. Imported files are untrusted: everything is
// checked and anything unknown is dropped. Nothing here talks to a server.
import { CHARACTER_HEIGHT } from '../art/common';
import type { CharacterArt } from '../content/schema';
import { lessonKey, WORLDS } from '../content/worlds';
import type { Avatar, LessonProgress, Profile } from './store';

const APP = 'python-academy';
const KIND = 'player-progress';
const FORMAT = 1;
/** Real files are a few KB; anything far bigger isn't ours. */
const MAX_BYTES = 512 * 1024;

interface ProgressFile {
    app: typeof APP;
    kind: typeof KIND;
    format: typeof FORMAT;
    exportedAt: string;
    profile: Profile;
}

// ---------- export ----------

export function profileFile(profile: Profile): string {
    const file: ProgressFile = { app: APP, kind: KIND, format: FORMAT, exportedAt: new Date().toISOString(), profile };
    return JSON.stringify(file, null, 2);
}

export function fileName(profile: Profile, date = new Date()) {
    const safe = profile.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'player';
    const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return `python-academy-${safe}-${day}.json`;
}

export function downloadProfile(profile: Profile) {
    const url = URL.createObjectURL(new Blob([profileFile(profile)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName(profile);
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- import ----------

export type ImportResult = { ok: true; profile: Profile } | { ok: false; error: string };

/** Every lesson key in the course, with the problem ids it contains (empty for comics). */
function courseLessons() {
    const lessons = new Map<string, Set<string>>();
    for (const w of WORLDS) {
        for (const c of w.chapters) {
            for (const l of c.lessons) {
                lessons.set(lessonKey(w, c, l), new Set(l.kind === 'read' ? [] : l.problems.map(p => p.id)));
            }
        }
    }
    return lessons;
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const count = (v: unknown, max: number) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(Math.max(Math.floor(v), 0), max) : 0);
const ART = new Set(Object.keys(CHARACTER_HEIGHT));
const COLOUR = /^#[0-9a-f]{6}$/i;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

function readAvatar(v: unknown): Avatar {
    if (!isObject(v) || typeof v.art !== 'string' || !ART.has(v.art)) return { art: 'kidMiner' };
    const avatar: Avatar = { art: v.art as CharacterArt };
    if (typeof v.tint === 'string' && COLOUR.test(v.tint)) avatar.tint = v.tint;
    return avatar;
}

function readLesson(v: unknown, problems: Set<string>): LessonProgress | null {
    if (!isObject(v)) return null;
    const solved = Array.isArray(v.solved) ? [...new Set(v.solved.filter((id): id is string => typeof id === 'string' && problems.has(id)))] : [];
    const hints: Record<string, number> = {};
    if (isObject(v.hints)) {
        for (const [id, n] of Object.entries(v.hints)) if (problems.has(id)) hints[id] = count(n, 99);
    }
    return { done: v.done === true, stars: count(v.stars, 3), solved, hints };
}

/** Reads a progress file. Returns a clean profile, or a message a grown-up can understand. */
export function readProfileFile(text: string): ImportResult {
    const notOurs: ImportResult = { ok: false, error: "This doesn't look like a Python Academy progress file." };
    if (text.length > MAX_BYTES) return notOurs;
    let file: unknown;
    try {
        file = JSON.parse(text);
    } catch {
        return notOurs;
    }
    if (!isObject(file) || file.app !== APP || file.kind !== KIND) return notOurs;
    if (file.format !== FORMAT) return { ok: false, error: 'This file was made by a newer version of Python Academy. Reload the page and try again.' };
    const p = file.profile;
    if (!isObject(p) || typeof p.id !== 'string' || typeof p.name !== 'string') return notOurs;

    const id = p.id.replace(/[^a-z0-9]/gi, '').slice(0, 24);
    const name = p.name.trim().slice(0, 20);
    if (!id || !name) return notOurs;

    const course = courseLessons();
    const lessons: Record<string, LessonProgress> = {};
    if (isObject(p.lessons)) {
        for (const [key, value] of Object.entries(p.lessons)) {
            const problems = course.get(key);
            const lesson = problems && readLesson(value, problems);
            if (lesson) lessons[key] = lesson;
        }
    }
    const days = Array.isArray(p.days) ? [...new Set(p.days.filter((d): d is string => typeof d === 'string' && DAY.test(d)))].sort().slice(-5000) : [];

    const profile: Profile = {
        id,
        name,
        avatar: readAvatar(p.avatar),
        createdAt: typeof p.createdAt === 'string' && !Number.isNaN(Date.parse(p.createdAt)) ? p.createdAt : new Date().toISOString(),
        xp: count(p.xp, 1_000_000),
        lessons,
        days,
    };
    if (p.unlockAll === true) profile.unlockAll = true;
    if (typeof p.lastChapter === 'string' && /^w\d+\/ch\d+$/.test(p.lastChapter)) profile.lastChapter = p.lastChapter;
    if (isObject(p.lastLesson) && typeof p.lastLesson.key === 'string' && course.has(p.lastLesson.key)) {
        profile.lastLesson = { key: p.lastLesson.key, index: count(p.lastLesson.index, 50) };
    }
    return { ok: true, profile };
}

// ---------- keeping storage ----------

/**
 * Asks the browser not to clear this site's saved data when space runs low. Chrome and Edge
 * decide quietly; Firefox may ask the user once. Safari can still clear data from sites not
 * visited for 7 days unless the app is on the home screen, so the backup file still matters.
 */
export async function keepStorage(): Promise<boolean> {
    try {
        if (!navigator.storage?.persist) return false;
        if (await navigator.storage.persisted()) return true;
        return await navigator.storage.persist();
    } catch {
        return false;
    }
}

export async function isStorageKept(): Promise<boolean | null> {
    try {
        return navigator.storage?.persisted ? await navigator.storage.persisted() : null;
    } catch {
        return null;
    }
}
