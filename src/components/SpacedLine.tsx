import type { ReactNode } from 'react';

/** Spaces that are hard to count: at the start of a line, or two or more in a row. */
const TRICKY = /^ +| {2,}/g;

/** Space cells on the white 🎯 Goal background */
export const GOAL_SPACE = 'bg-sky-100 shadow-[inset_0_0_0_1px_#7dd3fc]';

export function hasTrickySpaces(text: string) {
    return text.split('\n').some(l => new RegExp(TRICKY.source).test(l));
}

/**
 * One line of program output where each hard-to-count space is drawn as a shaded
 * cell, so " ====" visibly starts with one space. The cell is still a real space
 * character, so copying the text copies spaces.
 */
export function SpacedLine({ line, cellClass }: { line: string; cellClass: string }) {
    const parts: ReactNode[] = [];
    let last = 0;
    for (const m of line.matchAll(TRICKY)) {
        parts.push(line.slice(last, m.index));
        for (let i = 0; i < m[0].length; i++) parts.push(<span key={`${m.index}-${i}`} className={`rounded-sm ${cellClass}`}> </span>);
        last = m.index + m[0].length;
    }
    parts.push(line.slice(last));
    return <>{parts}</>;
}
