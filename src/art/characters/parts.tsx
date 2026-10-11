// Shared bits for the animal characters: colour shading, a cartoon eye and mouth, and arm angles.
import type { Pose } from '../../content/schema';
import { INK } from '../common';

/** Lighten (positive) or darken (negative) a #rrggbb colour. */
export function shade(hex: string, amount: number) {
    const n = parseInt(hex.slice(1), 16);
    const c = (v: number) => Math.max(0, Math.min(255, Math.round(v + amount)));
    return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => c(v).toString(16).padStart(2, '0')).join('')}`;
}

/** Front arm (or wing, or paw) angle in degrees: 0 hangs down, -90 points forward, -180 straight up. */
export const FRONT_ARM: Record<Pose, number> = {
    idle: -12,
    talk: -45,
    wave: -150,
    point: -90,
    think: -135,
    happy: -130,
    surprised: -155,
    sad: -4,
};

/** Happy and surprised characters hop a little. */
export const bounce = (pose: Pose) => (pose === 'happy' || pose === 'surprised' ? -5 : 0);

/** A round eye at (cx, cy). Happy closes it to an arc; sad drops a lid coloured `lid`. */
export function Eye({ cx, cy, r = 6, pose, lid }: { cx: number; cy: number; r?: number; pose: Pose; lid: string }) {
    if (pose === 'happy') {
        return <path d={`M${cx - r * 0.8} ${cy} q${r * 0.8} ${-r} ${r * 1.6} 0`} fill="none" stroke={INK} strokeWidth={2.8} strokeLinecap="round" />;
    }
    const big = pose === 'surprised' ? r * 1.15 : r;
    const look = pose === 'think' ? -r * 0.35 : 0;
    return (
        <g>
            <circle cx={cx} cy={cy} r={big} fill="#fff" stroke={INK} strokeWidth={2} />
            <circle cx={cx + r * 0.25} cy={cy + look} r={r * 0.55} fill={INK} />
            <circle cx={cx + r * 0.45} cy={cy + look - r * 0.22} r={r * 0.2} fill="#fff" />
            {pose === 'sad' && (
                <path d={`M${cx - big - 1} ${cy - 1} a${big + 1} ${big + 1} 0 0 1 ${2 * big + 2} 0 z`} fill={lid} stroke={INK} strokeWidth={2} />
            )}
        </g>
    );
}

/** A mouth centred on (cx, cy), drawn at scale `s`. */
export function Mouth({ cx, cy, pose, s = 1 }: { cx: number; cy: number; pose: Pose; s?: number }) {
    const shape = {
        talk: <ellipse cx={0} cy={0} rx={5} ry={4} fill="#7f1d1d" stroke={INK} strokeWidth={2} />,
        point: <ellipse cx={0} cy={0} rx={5} ry={4} fill="#7f1d1d" stroke={INK} strokeWidth={2} />,
        happy: <path d="M-7 -2 q7 10 14 0 z" fill="#7f1d1d" stroke={INK} strokeWidth={2} strokeLinejoin="round" />,
        surprised: <circle cx={0} cy={0} r={4.5} fill="#7f1d1d" stroke={INK} strokeWidth={2} />,
        sad: <path d="M-6 3 q6 -6 12 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />,
        think: <path d="M-3 0 h8" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />,
        wave: <path d="M-6 -1 q6 6 12 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />,
        idle: <path d="M-5 -1 q5 4 10 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />,
    }[pose];
    return <g transform={`translate(${cx} ${cy}) scale(${s})`}>{shape}</g>;
}
