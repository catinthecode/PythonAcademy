// Py: a yellow python in a purple wizard hat. Coiled on the ground, head up, facing right.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';

const BODY = '#facc15';
const BODY_DARK = '#ca8a04';
const BELLY = '#fef08a';

const TAILS: Partial<Record<Pose, string>> = {
    wave: 'M24 -12 C42 -16 50 -40 42 -62',
    point: 'M24 -12 C40 -18 52 -30 70 -38',
    think: 'M24 -12 C46 -22 48 -58 36 -70',
    happy: 'M24 -12 C40 -14 48 -30 44 -44',
    surprised: 'M24 -12 C44 -14 52 -34 50 -52',
};

function Eyes({ pose }: { pose: Pose }) {
    const eye = (cx: number, cy: number) => {
        if (pose === 'happy') return <path d={`M${cx - 5} ${cy + 1} q5 -7 10 0`} fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />;
        const r = pose === 'surprised' ? 7.5 : 6.5;
        const dy = pose === 'think' ? -2.5 : 0;
        return (
            <g>
                <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={INK} strokeWidth={2} />
                <circle cx={cx + 2} cy={cy + dy} r={3.2} fill={INK} />
                <circle cx={cx + 3} cy={cy + dy - 1.2} r={1} fill="#fff" />
                {pose === 'sad' && <path d={`M${cx - 7} ${cy - 2} h14 v-6 h-14 z`} fill={BODY} stroke={INK} strokeWidth={2} />}
            </g>
        );
    };
    return (
        <g>
            {eye(6, -89)}
            {eye(20, -90)}
        </g>
    );
}

function Mouth({ pose }: { pose: Pose }) {
    switch (pose) {
        case 'talk':
        case 'point':
        case 'wave':
            return (
                <g>
                    <ellipse cx={32} cy={-74} rx={5} ry={3.5} fill="#7f1d1d" stroke={INK} strokeWidth={1.5} />
                    <path d="M36 -73 l7 1 m-3 -1 l3 -2.5 m-3 2.5 l3 2.5" stroke="#dc2626" strokeWidth={1.6} fill="none" strokeLinecap="round" />
                </g>
            );
        case 'happy':
            return <path d="M22 -77 q9 9 17 -1" fill="#7f1d1d" stroke={INK} strokeWidth={2} />;
        case 'surprised':
            return <ellipse cx={31} cy={-74} rx={3.5} ry={4.5} fill="#7f1d1d" stroke={INK} strokeWidth={1.5} />;
        case 'sad':
            return <path d="M24 -72 q7 -6 14 0" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />;
        default:
            return <path d="M25 -75 q6 3 12 0" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />;
    }
}

export function Py({ pose }: { pose: Pose }) {
    const tail = TAILS[pose] ?? 'M24 -12 C34 -10 40 -6 36 -2';
    const neck = 'M-4 -22 C-6 -46 16 -50 8 -74';
    return (
        <g>
            {/* coils */}
            <ellipse cx={-4} cy={-9} rx={32} ry={10} fill={BODY_DARK} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={-2} cy={-19} rx={24} ry={9} fill={BODY} stroke={INK} strokeWidth={LINE} />
            {/* tail */}
            <path d={tail} fill="none" stroke={INK} strokeWidth={13} strokeLinecap="round" />
            <path d={tail} fill="none" stroke={BODY} strokeWidth={8} strokeLinecap="round" />
            {/* neck */}
            <path d={neck} fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" />
            <path d={neck} fill="none" stroke={BODY} strokeWidth={16} strokeLinecap="round" />
            <path d={neck} fill="none" stroke={BELLY} strokeWidth={5} strokeLinecap="round" transform="translate(4 0)" />
            {/* head */}
            <ellipse cx={14} cy={-84} rx={20} ry={16} fill={BODY} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={29} cy={-77} rx={11} ry={8} fill={BODY} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={22} cy={-80} rx={12} ry={6} fill={BODY} />
            <circle cx={36} cy={-80} r={1.2} fill={INK} />
            <Eyes pose={pose} />
            <Mouth pose={pose} />
            {/* wizard hat */}
            <path d="M-4 -97 Q8 -128 24 -138 Q18 -122 30 -98 Z" fill="#7c3aed" stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <ellipse cx={13} cy={-97} rx={22} ry={5} fill="#6d28d9" stroke={INK} strokeWidth={LINE} />
            <path d="M14 -116 l1.8 3.6 4 .6 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.6 z" fill="#fde047" />
        </g>
    );
}
