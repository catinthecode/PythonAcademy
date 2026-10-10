// "Lvl" is the XP level kids earn (separate from Worlds). Each level needs 50 XP more than the last:
// Lvl 2 at 50 XP, Lvl 3 at 150, Lvl 4 at 300, Lvl 5 at 500...
export const XP = {
    problem: 10,
    boss: 25,
    reading: 15,
};

export function xpForLevel(level: number) {
    return 25 * level * (level - 1);
}

export function levelInfo(xp: number) {
    let level = 1;
    while (xp >= xpForLevel(level + 1)) level++;
    const start = xpForLevel(level);
    const end = xpForLevel(level + 1);
    return { level, into: xp - start, needed: end - start, progress: (xp - start) / (end - start) };
}

/** Stars for a finished problem lesson, from the total hints used in it. */
export function starsFor(hints: number) {
    if (hints === 0) return 3;
    if (hints <= 2) return 2;
    return 1;
}
