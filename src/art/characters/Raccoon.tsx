// A raccoon critter trainer: bandit mask, ringed tail and a trainer's cap (Rae).
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth } from './parts';

const FUR = '#a8a29e';
const FUR_DARK = '#44403c';
const CREAM = '#f5f5f4';

export function Raccoon({ pose, tint = '#dc2626' }: { pose: Pose; tint?: string }) {
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* ringed tail */}
            <g transform="translate(-14 -22) rotate(-35)">
                <ellipse cx={-6} cy={-26} rx={10} ry={28} fill={FUR} stroke={INK} strokeWidth={LINE} />
                <path d="M-15 -14 h18 M-16 -28 h20 M-14 -42 h16" stroke={FUR_DARK} strokeWidth={6} />
                <ellipse cx={-6} cy={-26} rx={10} ry={28} fill="none" stroke={INK} strokeWidth={LINE} />
            </g>
            {/* legs and feet */}
            <rect x={-13} y={-20} width={10} height={18} rx={4} fill={FUR_DARK} stroke={INK} strokeWidth={LINE} />
            <rect x={4} y={-20} width={10} height={18} rx={4} fill={FUR_DARK} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={-8} cy={-3} rx={9} ry={4.5} fill={FUR_DARK} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={11} cy={-3} rx={9} ry={4.5} fill={FUR_DARK} stroke={INK} strokeWidth={LINE} />
            {/* body in a trainer vest */}
            <ellipse cx={0} cy={-36} rx={18} ry={22} fill={FUR} stroke={INK} strokeWidth={LINE} />
            <path d="M-17 -44 Q-18 -18 -6 -16 L-4 -54 Q-12 -54 -17 -44 Z M17 -44 Q18 -18 6 -16 L4 -54 Q12 -54 17 -44 Z" fill={tint} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            <ellipse cx={0} cy={-34} rx={5} ry={12} fill={CREAM} />
            {/* ears */}
            <path d="M-17 -74 L-16 -92 L-4 -80 Z M8 -80 L18 -92 L20 -74 Z" fill={FUR} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            {/* head with a bandit mask */}
            <ellipse cx={2} cy={-66} rx={20} ry={16} fill={FUR} stroke={INK} strokeWidth={LINE} />
            <path d="M-17 -70 Q2 -80 22 -70 Q20 -60 12 -62 Q6 -66 1 -62 Q-6 -58 -14 -62 Z" fill={FUR_DARK} />
            <ellipse cx={16} cy={-58} rx={10} ry={7} fill={CREAM} stroke={INK} strokeWidth={2} />
            <circle cx={25} cy={-60} r={3.5} fill={INK} />
            <Eye cx={-4} cy={-68} r={5} pose={pose} lid={FUR_DARK} />
            <Eye cx={11} cy={-68} r={5} pose={pose} lid={FUR_DARK} />
            <Mouth cx={17} cy={-53} pose={pose} s={0.6} />
            {/* trainer cap with the peak to the front */}
            <path d="M-16 -76 Q-14 -94 4 -94 Q20 -94 20 -78 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <path d="M14 -79 q14 -4 20 2 q-8 4 -20 2 z" fill={tint} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            <circle cx={2} cy={-86} r={4} fill="#fff" stroke={INK} strokeWidth={2} />
            {/* paw */}
            <g transform={`translate(15 -46) rotate(${FRONT_ARM[pose]})`}>
                <rect x={-4} y={-2} width={8} height={18} rx={4} fill={FUR} stroke={INK} strokeWidth={LINE} />
                <circle cx={0} cy={17} r={4.5} fill={FUR_DARK} stroke={INK} strokeWidth={2} />
            </g>
        </g>
    );
}
