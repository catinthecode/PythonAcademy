// Bolt the Robot Helper: writes code from whatever you tell it, exactly as you said it.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';

const METAL = '#cbd5e1';
const METAL_DARK = '#94a3b8';
const SCREEN = '#0f172a';
const GLOW = '#22d3ee';

const ARMS: Record<Pose, { l: number; r: number }> = {
    idle: { l: 8, r: -8 },
    talk: { l: 8, r: -40 },
    wave: { l: 8, r: -160 },
    point: { l: 8, r: -90 },
    think: { l: 8, r: -135 },
    happy: { l: 140, r: -140 },
    surprised: { l: 160, r: -160 },
    sad: { l: 3, r: -3 },
};

function Arm({ x, angle }: { x: number; angle: number }) {
    return (
        <g transform={`translate(${x} -66) rotate(${angle})`}>
            <rect x={-4} y={0} width={8} height={30} fill={METAL_DARK} stroke={INK} strokeWidth={LINE} />
            <circle cx={0} cy={34} r={6} fill={METAL} stroke={INK} strokeWidth={LINE} />
        </g>
    );
}

function Face({ pose }: { pose: Pose }) {
    const eye = (x: number) => {
        if (pose === 'happy') return <path d={`M${x - 5} -88 q5 -6 10 0`} fill="none" stroke={GLOW} strokeWidth={3} strokeLinecap="round" />;
        if (pose === 'sad') return <path d={`M${x - 5} -91 q5 5 10 0`} fill="none" stroke={GLOW} strokeWidth={3} strokeLinecap="round" />;
        const h = pose === 'surprised' ? 10 : 7;
        const dy = pose === 'think' ? -2 : 0;
        return <rect x={x - 3.5} y={-92 - h / 2 + dy} width={7} height={h} rx={2} fill={GLOW} />;
    };
    const mouth = {
        idle: <rect x={-8} y={-80} width={16} height={3} rx={1.5} fill={GLOW} />,
        talk: <path d="M-8 -80 h3 v-3 h3 v6 h3 v-6 h3 v3 h2" fill="none" stroke={GLOW} strokeWidth={2} />,
        point: <path d="M-8 -80 h3 v-3 h3 v6 h3 v-6 h3 v3 h2" fill="none" stroke={GLOW} strokeWidth={2} />,
        wave: <path d="M-8 -81 q8 6 16 0" fill="none" stroke={GLOW} strokeWidth={2.5} />,
        happy: <path d="M-9 -82 q9 9 18 0 z" fill={GLOW} />,
        surprised: <circle cx={0} cy={-80} r={4} fill="none" stroke={GLOW} strokeWidth={2.5} />,
        sad: <path d="M-8 -77 q8 -6 16 0" fill="none" stroke={GLOW} strokeWidth={2.5} />,
        think: <rect x={-2} y={-80} width={10} height={3} rx={1.5} fill={GLOW} />,
    }[pose];
    return <g>{eye(-8)}{eye(8)}{mouth}</g>;
}

export function Robot({ pose }: { pose: Pose }) {
    const arms = ARMS[pose];
    return (
        <g>
            {/* legs */}
            <rect x={-14} y={-26} width={10} height={20} fill={METAL_DARK} stroke={INK} strokeWidth={LINE} />
            <rect x={4} y={-26} width={10} height={20} fill={METAL_DARK} stroke={INK} strokeWidth={LINE} />
            <rect x={-18} y={-8} width={15} height={8} rx={2} fill="#475569" stroke={INK} strokeWidth={LINE} />
            <rect x={3} y={-8} width={15} height={8} rx={2} fill="#475569" stroke={INK} strokeWidth={LINE} />
            {/* body */}
            <rect x={-20} y={-70} width={40} height={46} rx={4} fill={METAL} stroke={INK} strokeWidth={LINE} />
            <rect x={-10} y={-60} width={20} height={14} rx={2} fill={SCREEN} stroke={INK} strokeWidth={2} />
            <circle cx={-4} cy={-53} r={2.5} fill="#ef4444" />
            <circle cx={4} cy={-53} r={2.5} fill="#22c55e" />
            <Arm x={-24} angle={arms.l} />
            <Arm x={24} angle={arms.r} />
            {/* head */}
            <rect x={-22} y={-106} width={44} height={34} rx={6} fill={METAL} stroke={INK} strokeWidth={LINE} />
            <rect x={-17} y={-102} width={34} height={26} rx={4} fill={SCREEN} />
            <Face pose={pose} />
            {/* antenna */}
            <line x1={0} y1={-106} x2={0} y2={-118} stroke={INK} strokeWidth={LINE} />
            <circle cx={0} cy={-121} r={5} fill={pose === 'surprised' ? '#facc15' : '#ef4444'} stroke={INK} strokeWidth={2.5} />
            <rect x={-27} y={-94} width={5} height={12} rx={2} fill={METAL_DARK} stroke={INK} strokeWidth={2} />
            <rect x={22} y={-94} width={5} height={12} rx={2} fill={METAL_DARK} stroke={INK} strokeWidth={2} />
        </g>
    );
}
