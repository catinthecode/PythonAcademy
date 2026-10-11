// A striped cat standing on two legs, with whiskers and a curly tail. Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

const CREAM = '#fff7ed';
const PINK = '#f9a8d4';

export function Cat({ pose, tint = '#fb923c' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -60);
    const tail = pose === 'sad' ? 'M-14 -12 Q-40 -10 -44 4' : 'M-14 -14 Q-44 -14 -42 -44 Q-41 -56 -32 -58';
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* tail: an ink stroke with a coloured stroke on top */}
            <path d={tail} fill="none" stroke={INK} strokeWidth={13} strokeLinecap="round" />
            <path d={tail} fill="none" stroke={tint} strokeWidth={7} strokeLinecap="round" />
            {/* feet */}
            <ellipse cx={-9} cy={-4} rx={10} ry={5} fill={CREAM} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={11} cy={-4} rx={10} ry={5} fill={CREAM} stroke={INK} strokeWidth={LINE} />
            {/* body with stripes */}
            <ellipse cx={0} cy={-28} rx={18} ry={22} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={4} cy={-24} rx={9} ry={14} fill={CREAM} />
            <path d="M-17 -34 h7 M-18 -26 h8 M-16 -18 h6" stroke={dark} strokeWidth={3} strokeLinecap="round" />
            {/* ears */}
            <path d="M-17 -70 L-18 -94 L-2 -78 Z M6 -78 L20 -94 L21 -70 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <path d="M-14 -74 L-15 -88 L-6 -79 Z M10 -79 L18 -88 L18 -74 Z" fill={PINK} />
            {/* head */}
            <ellipse cx={2} cy={-62} rx={22} ry={18} fill={tint} stroke={INK} strokeWidth={LINE} />
            <path d="M-4 -79 v7 M2 -80 v8 M8 -79 v7" stroke={dark} strokeWidth={3} strokeLinecap="round" />
            <Eye cx={-5} cy={-64} r={6} pose={pose} lid={tint} />
            <Eye cx={11} cy={-64} r={6} pose={pose} lid={tint} />
            <path d="M1 -56 h7 l-3.5 4 z" fill={PINK} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
            <Mouth cx={4.5} cy={-47} pose={pose} s={0.65} />
            <path d="M16 -54 l14 -3 M16 -50 l14 2 M-8 -54 l-14 -3 M-8 -50 l-14 2" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
            {/* paw */}
            <g transform={`translate(15 -36) rotate(${FRONT_ARM[pose]})`}>
                <rect x={-4} y={-2} width={8} height={18} rx={4} fill={tint} stroke={INK} strokeWidth={LINE} />
                <circle cx={0} cy={17} r={4.5} fill={CREAM} stroke={INK} strokeWidth={2} />
            </g>
        </g>
    );
}
