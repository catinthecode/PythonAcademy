import type { TurtleDrawing } from './python/types';

const STEP = 4; // px between sample points along a line
const TOLERANCE = 6; // px a point may be off and still count

/** Points spaced along every drawn (pen-down) line. */
function samplePoints(d: TurtleDrawing | null): [number, number][] {
    const pts: [number, number][] = [];
    for (const s of d?.segments ?? []) {
        if (s.jump) continue;
        const len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
        const n = Math.max(1, Math.ceil(len / STEP));
        for (let i = 0; i <= n; i++) {
            pts.push([s.x1 + ((s.x2 - s.x1) * i) / n, s.y1 + ((s.y2 - s.y1) * i) / n]);
        }
    }
    return pts;
}

function grid(pts: [number, number][]) {
    const cells = new Map<string, [number, number][]>();
    for (const p of pts) {
        const key = `${Math.floor(p[0] / TOLERANCE)},${Math.floor(p[1] / TOLERANCE)}`;
        const list = cells.get(key);
        if (list) list.push(p);
        else cells.set(key, [p]);
    }
    return cells;
}

function allNear(from: [number, number][], to: Map<string, [number, number][]>) {
    return from.every(([x, y]) => {
        const cx = Math.floor(x / TOLERANCE);
        const cy = Math.floor(y / TOLERANCE);
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (const [px, py] of to.get(`${cx + dx},${cy + dy}`) ?? []) {
                    if (Math.hypot(px - x, py - y) <= TOLERANCE) return true;
                }
            }
        }
        return false;
    });
}

/**
 * True when two drawings cover the same lines, regardless of the order, direction
 * or number of moves used to draw them (4 × forward(50) == forward(200)).
 */
export function drawingsMatch(kid: TurtleDrawing | null, target: TurtleDrawing | null): boolean {
    const a = samplePoints(kid);
    const b = samplePoints(target);
    if (a.length === 0 || b.length === 0) return a.length === b.length;
    return allNear(b, grid(a)) && allNear(a, grid(b));
}
