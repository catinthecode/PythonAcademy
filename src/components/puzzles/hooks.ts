import { useEffect, useState, useSyncExternalStore } from 'react';
import type { CodePuzzle, Puzzle } from '../../content/schema';
import { goalFor, gradeCode, type Runner, type Tracer, type Verdict } from '../../engine/grade';
import { python } from '../../engine/python/client';
import type { RunResult } from '../../engine/python/types';

export const run: Runner = req => python.run(req);
export const trace: Tracer = req => python.trace(req);

export function usePythonStatus() {
    return useSyncExternalStore(fn => python.subscribe(fn), () => python.status);
}

/** The reference solution's result: the goal output / goal drawing. */
export function useGoal(puzzle: Puzzle): RunResult | null {
    const [goal, setGoal] = useState<RunResult | null>(null);
    useEffect(() => {
        let alive = true;
        setGoal(null);
        goalFor(run, puzzle)?.then(g => alive && setGoal(g));
        return () => { alive = false; };
    }, [puzzle]);
    return goal;
}

export function useGrader(puzzle: CodePuzzle, onSolved: () => void) {
    const [running, setRunning] = useState(false);
    const [verdict, setVerdict] = useState<Verdict | null>(null);
    useEffect(() => setVerdict(null), [puzzle]);

    const check = async (code: string) => {
        if (running) return;
        setRunning(true);
        try {
            const v = await gradeCode(run, puzzle, code);
            setVerdict(v);
            if (v.passed) onSolved();
        } finally {
            setRunning(false);
        }
    };
    return { running, verdict, check };
}

const DRAFT_PREFIX = 'python-academy.draft.';

function readDraft<T>(storageKey: string, initial: T): T {
    try {
        const raw = localStorage.getItem(storageKey);
        return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
        return initial;
    }
}

/**
 * Keeps a kid's unfinished work on a problem (code, filled gaps, line order, trace table)
 * in this browser, so leaving and coming back picks up where they were.
 */
export function useDraft<T>(key: string, initial: T): [T, (v: T | ((old: T) => T)) => void, () => void] {
    const storageKey = DRAFT_PREFIX + key;
    const [value, setValue] = useState<T>(() => readDraft(storageKey, initial));
    useEffect(() => setValue(readDraft(storageKey, initial)), [storageKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const set = (v: T | ((old: T) => T)) => {
        setValue(old => {
            const next = typeof v === 'function' ? (v as (o: T) => T)(old) : v;
            try {
                localStorage.setItem(storageKey, JSON.stringify(next));
            } catch {
                // ignore: drafts are a convenience
            }
            return next;
        });
    };
    const reset = () => {
        setValue(initial);
        try {
            localStorage.removeItem(storageKey);
        } catch {
            // ignore
        }
    };
    return [value, set, reset];
}

/** Forget every draft whose key starts with `prefix` (used when replaying a lesson). */
export function clearDrafts(prefix: string) {
    try {
        Object.keys(localStorage)
            .filter(k => k.startsWith(DRAFT_PREFIX + prefix))
            .forEach(k => localStorage.removeItem(k));
    } catch {
        // ignore
    }
}

/** Same shuffle every time for a given puzzle, and never already in the right order. */
export function seededShuffle<T>(items: T[], seed: string): T[] {
    let h = 0;
    for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const rand = () => {
        h = (h * 1664525 + 1013904223) >>> 0;
        return h / 2 ** 32;
    };
    const out = [...items];
    for (let attempt = 0; attempt < 5; attempt++) {
        for (let i = out.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [out[i], out[j]] = [out[j], out[i]];
        }
        if (out.length < 2 || out.some((x, i) => x !== items[i])) break;
    }
    return out;
}
