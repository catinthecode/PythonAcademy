// Sneak: a mischievous little gremlin who plants bugs in code. Pointy ears, sly grin.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';

const SKIN = '#84cc16';
const SKIN_DARK = '#4d7c0f';
const SPOT = '#a855f7';

const ARMS: Record<Pose, { l: number; r: number }> = {
    idle: { l: 20, r: -20 },
    talk: { l: 20, r: -60 },
    wave: { l: 20, r: -150 },
    point: { l: 20, r: -95 },
    think: { l: 20, r: -140 },
    happy: { l: 130, r: -130 },
    surprised: { l: 155, r: -155 },
    sad: { l: 5, r: -5 },
};

function Face({ pose }: { pose: Pose }) {
    const eye = (cx: number, flip: number) => {
        if (pose === 'happy') return <path d={`M${cx - 5} -66 q5 -6 10 0`} fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />;
        const r = pose === 'surprised' ? 7 : 6;
        return (
            <g>
                <circle cx={cx} cy={-66} r={r} fill="#fef08a" stroke={INK} strokeWidth={2} />
                <circle cx={cx + 1.5} cy={pose === 'think' ? -68 : -66} r={2.8} fill={INK} />
                {/* sly eyebrows (worried when sad) */}
                <line
                    x1={cx - 7 * flip} y1={pose === 'sad' ? -76 : -78}
                    x2={cx + 6 * flip} y2={pose === 'sad' ? -79 : -74}
                    stroke={INK} strokeWidth={2.5} strokeLinecap="round"
                />
            </g>
        );
    };
    const mouth = pose === 'sad'
        ? <path d="M-8 -50 q8 -6 16 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
        : pose === 'surprised'
            ? <ellipse cx={0} cy={-52} rx={4} ry={5} fill="#7f1d1d" stroke={INK} strokeWidth={2} />
            : (
                <g>
                    <path d="M-11 -56 q11 12 22 0 z" fill="#7f1d1d" stroke={INK} strokeWidth={2} />
                    <path d="M-7 -55.5 v3 l2 -3 M5 -55.5 v3 l2 -3" fill="#fff" stroke="#fff" strokeWidth={1.5} />
                </g>
            );
    return <g>{eye(-8, 1)}{eye(8, -1)}{mouth}</g>;
}

export function Sneak({ pose }: { pose: Pose }) {
    const arms = ARMS[pose];
    const tilt = { talk: -4, point: -6, happy: 3, surprised: 0, sad: 0, think: 5, wave: -4, idle: 0 }[pose];
    return (
        <g transform={`rotate(${tilt} 0 0)`}>
            {/* feet */}
            <ellipse cx={-9} cy={-4} rx={9} ry={5} fill={SKIN_DARK} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={9} cy={-4} rx={9} ry={5} fill={SKIN_DARK} stroke={INK} strokeWidth={LINE} />
            {/* arms */}
            {[[-15, arms.l], [15, arms.r]].map(([x, a], i) => (
                <g key={i} transform={`translate(${x} -34) rotate(${a})`}>
                    <rect x={-3.5} y={0} width={7} height={18} rx={3.5} fill={SKIN} stroke={INK} strokeWidth={LINE} />
                </g>
            ))}
            {/* round body */}
            <ellipse cx={0} cy={-26} rx={17} ry={20} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            <circle cx={-6} cy={-22} r={3} fill={SPOT} />
            <circle cx={7} cy={-30} r={2.5} fill={SPOT} />
            <circle cx={4} cy={-15} r={2} fill={SPOT} />
            {/* pointy ears */}
            <path d="M-18 -66 L-34 -82 L-14 -76 Z" fill={SKIN} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <path d="M18 -66 L34 -82 L14 -76 Z" fill={SKIN} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            {/* head */}
            <ellipse cx={0} cy={-62} rx={21} ry={19} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            <path d="M-6 -80 q3 -10 9 -12 q-2 6 2 12" fill={SKIN_DARK} stroke={INK} strokeWidth={2} />
            <Face pose={pose} />
        </g>
    );
}
