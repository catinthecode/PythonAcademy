// A small upright dragon with bat wings, horns and a spade tail (Blazewing). Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

const BELLY = '#fde68a';

export function Dragon({ pose, tint = '#f97316' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -60);
    const wingUp = pose === 'wave' || pose === 'happy' || pose === 'surprised';
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* tail with a spade tip */}
            <path d="M-12 -12 C-40 -8 -52 -22 -50 -40 L-60 -46 L-46 -50 L-42 -40 C-42 -30 -34 -24 -12 -26 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            {/* wing behind the body */}
            <g transform={`translate(-8 -60) rotate(${wingUp ? -28 : 0})`}>
                <path d="M0 0 L-30 -34 L-30 -18 L-46 -16 L-36 -4 L-44 6 L-8 14 Z" fill={dark} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
                <path d="M-2 2 L-30 -18 M-4 6 L-36 -4" stroke={INK} strokeWidth={2} />
            </g>
            {/* legs and feet */}
            <rect x={-17} y={-22} width={13} height={20} rx={5} fill={tint} stroke={INK} strokeWidth={LINE} />
            <rect x={4} y={-22} width={13} height={20} rx={5} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={-9} cy={-3} rx={11} ry={5} fill={dark} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={13} cy={-3} rx={11} ry={5} fill={dark} stroke={INK} strokeWidth={LINE} />
            {/* back spikes and body */}
            <path d="M-20 -60 l-10 -2 l6 -8 z M-24 -44 l-10 0 l7 -8 z M-24 -28 l-10 2 l5 -9 z" fill={dark} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            <ellipse cx={0} cy={-40} rx={24} ry={28} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={7} cy={-35} rx={13} ry={21} fill={BELLY} />
            <path d="M-2 -46 h18 M-4 -36 h21 M-2 -26 h18" stroke={shade(BELLY, -50)} strokeWidth={2} strokeLinecap="round" />
            {/* horns */}
            <path d="M-6 -90 l-8 -16 l13 8 z M6 -93 l2 -16 l8 13 z" fill="#fef3c7" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            {/* head and snout */}
            <ellipse cx={4} cy={-78} rx={20} ry={17} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={24} cy={-71} rx={14} ry={10} fill={tint} stroke={INK} strokeWidth={LINE} />
            <path d="M12 -78 q6 -4 12 -1" fill="none" stroke={tint} strokeWidth={6} />
            <circle cx={31} cy={-74} r={1.8} fill={INK} />
            <circle cx={35} cy={-72} r={1.8} fill={INK} />
            <Eye cx={8} cy={-83} r={6} pose={pose} lid={tint} />
            <Mouth cx={26} cy={-64} pose={pose} s={0.75} />
            {/* a happy puff of fire */}
            {pose === 'happy' && <path d="M40 -74 q8 -6 6 -14 q6 6 2 14 q6 0 6 -6 q4 10 -6 14 z" fill="#fbbf24" stroke={INK} strokeWidth={2} strokeLinejoin="round" />}
            {/* arm */}
            <g transform={`translate(16 -50) rotate(${FRONT_ARM[pose]})`}>
                <rect x={-4.5} y={-2} width={9} height={20} rx={4.5} fill={tint} stroke={INK} strokeWidth={LINE} />
            </g>
        </g>
    );
}
