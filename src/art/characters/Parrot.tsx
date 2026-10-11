// A chatty parrot with a crest, a hooked beak and a long tail. Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, shade } from './parts';

const BEAK = '#facc15';
const WING = '#2563eb';
const LEGS = '#f59e0b';

export function Parrot({ pose, tint = '#ef4444' }: { pose: Pose; tint?: string }) {
    const light = shade(tint, 70);
    const open = pose === 'talk' || pose === 'point' || pose === 'happy' || pose === 'surprised';
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* tail feathers */}
            <path d="M-12 -26 L-34 4 L-24 6 L-6 -18 Z" fill={WING} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <path d="M-8 -22 L-22 8 L-12 8 L0 -16 Z" fill={BEAK} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            {/* legs */}
            <path d="M-6 -16 v14 M6 -16 v14" stroke={LEGS} strokeWidth={4} strokeLinecap="round" />
            <path d="M-12 -2 h12 M0 -2 h12" stroke={INK} strokeWidth={3} strokeLinecap="round" />
            {/* body */}
            <ellipse cx={0} cy={-40} rx={20} ry={27} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={7} cy={-34} rx={10} ry={17} fill={light} />
            {/* crest */}
            <path d="M-4 -86 q-10 -14 -20 -12 q10 4 12 14 z M2 -89 q-2 -16 -10 -22 q12 2 14 20 z M8 -89 q4 -14 0 -22 q8 6 6 22 z" fill={tint} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            {/* head with a white face patch */}
            <circle cx={5} cy={-74} r={17} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={13} cy={-75} rx={8} ry={9} fill="#fff" />
            <Eye cx={13} cy={-77} r={5} pose={pose} lid="#fff" />
            {/* hooked beak: the lower half drops when talking */}
            <path d={`M20 ${-69 + (open ? 4 : 0)} q8 2 9 8 q-7 1 -9 -4 z`} fill={shade(BEAK, -60)} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            <path d="M19 -78 q16 -3 13 16 q-4 -7 -13 -7 z" fill={BEAK} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            {/* wing: lifts less than an arm would so it stays clear of the face */}
            <g transform={`translate(4 -52) rotate(${FRONT_ARM[pose] * 0.55})`}>
                <path d="M-8 0 Q-12 22 0 38 Q10 20 8 0 Z" fill={WING} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
                <path d="M-3 22 l3 10 l3 -10" fill="none" stroke={BEAK} strokeWidth={2} />
            </g>
        </g>
    );
}
