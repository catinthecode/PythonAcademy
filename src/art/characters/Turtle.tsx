// Shelly: a green builder turtle with a pencil strapped to her shell. Side view, facing right.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';

const SKIN = '#86efac';
const SHELL = '#16a34a';
const SHELL_DARK = '#166534';

function Leg({ x, raised }: { x: number; raised?: boolean }) {
    return (
        <g transform={raised ? `translate(${x + 5} -14) rotate(-55)` : `translate(${x + 5} -14)`}>
            <rect x={-6} y={0} width={12} height={15} rx={4} fill={SKIN} stroke={INK} strokeWidth={LINE} />
        </g>
    );
}

function Face({ pose }: { pose: Pose }) {
    const eye = pose === 'happy'
        ? <path d="M49 -35 q4.5 -6 9 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
        : (
            <g>
                <circle cx={53} cy={-35} r={pose === 'surprised' ? 6.5 : 5.5} fill="#fff" stroke={INK} strokeWidth={2} />
                <circle cx={55} cy={pose === 'think' ? -37.5 : -35} r={2.8} fill={INK} />
                {pose === 'sad' && <path d="M46 -37 h14 v-6 h-14 z" fill={SKIN} stroke={INK} strokeWidth={2} />}
            </g>
        );
    const mouth = {
        talk: <ellipse cx={58} cy={-24} rx={3.5} ry={2.5} fill="#7f1d1d" stroke={INK} strokeWidth={1.5} />,
        point: <ellipse cx={58} cy={-24} rx={3.5} ry={2.5} fill="#7f1d1d" stroke={INK} strokeWidth={1.5} />,
        wave: <path d="M51 -26 q5 5 10 0" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />,
        happy: <path d="M50 -27 q6 8 12 0 z" fill="#7f1d1d" stroke={INK} strokeWidth={1.8} />,
        surprised: <circle cx={57} cy={-24} r={3} fill="#7f1d1d" stroke={INK} strokeWidth={1.5} />,
        sad: <path d="M51 -22 q5 -5 10 0" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />,
        think: <path d="M53 -24 h7" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />,
        idle: <path d="M52 -25 q4 3 8 0" fill="none" stroke={INK} strokeWidth={2.2} strokeLinecap="round" />,
    }[pose];
    return <g>{eye}{mouth}</g>;
}

export function Turtle({ pose }: { pose: Pose }) {
    const wave = pose === 'wave' || pose === 'point' || pose === 'happy';
    return (
        // Shifted left so her body (not her head) is centred on x = 0
        <g transform="translate(-8 0)">
            {/* tail and back legs */}
            <path d="M-38 -16 l-12 4 l12 4 z" fill={SKIN} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <Leg x={-30} />
            <Leg x={-10} />
            <Leg x={8} />
            <Leg x={24} raised={wave} />
            {/* neck and head */}
            <path d="M30 -22 Q40 -24 44 -30" stroke={INK} strokeWidth={16} strokeLinecap="round" fill="none" />
            <path d="M30 -22 Q40 -24 44 -30" stroke={SKIN} strokeWidth={10} strokeLinecap="round" fill="none" />
            <ellipse cx={52} cy={-30} rx={14} ry={13} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            <Face pose={pose} />
            {/* pencil on the shell */}
            <g transform="translate(-6 -56) rotate(-22)">
                <rect x={-4.5} y={-34} width={9} height={30} fill="#facc15" stroke={INK} strokeWidth={2.5} />
                <rect x={-4.5} y={-40} width={9} height={7} fill="#f472b6" stroke={INK} strokeWidth={2.5} />
                <path d="M-4.5 -4 L0 6 L4.5 -4 Z" fill="#fde68a" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            </g>
            {/* shell */}
            <path d="M-38 -16 Q-36 -62 0 -62 Q36 -62 38 -16 Z" fill={SHELL} stroke={INK} strokeWidth={LINE} />
            <path d="M-14 -50 l14 -6 l14 6 v14 l-14 6 l-14 -6 z" fill="#22c55e" stroke={SHELL_DARK} strokeWidth={2} />
            <path d="M-32 -30 l10 -10 h8 v14 h-14 z M18 -40 h8 l8 10 v4 h-16 z" fill="#22c55e" stroke={SHELL_DARK} strokeWidth={2} />
            <rect x={-42} y={-20} width={84} height={8} rx={4} fill={SHELL_DARK} stroke={INK} strokeWidth={LINE} />
        </g>
    );
}
