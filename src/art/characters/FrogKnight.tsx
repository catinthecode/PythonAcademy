// A frog knight with a cape, a belt and a little sword (Kai). Tintable: the cape takes the tint.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth } from './parts';

const SKIN = '#4ade80';
const SKIN_DARK = '#15803d';
const BELLY = '#ecfccb';
const STEEL = '#e2e8f0';

export function FrogKnight({ pose, tint = '#dc2626' }: { pose: Pose; tint?: string }) {
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* cape */}
            <path d="M-14 -56 Q-34 -30 -30 -4 L6 -8 Q-4 -30 8 -56 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            {/* sword at the hip */}
            <g transform="translate(-20 -26) rotate(-30)">
                <rect x={-2.5} y={-2} width={5} height={30} fill={STEEL} stroke={INK} strokeWidth={2} />
                <rect x={-8} y={-6} width={16} height={5} rx={2} fill="#a16207" stroke={INK} strokeWidth={2} />
                <rect x={-2.5} y={-14} width={5} height={8} fill="#a16207" stroke={INK} strokeWidth={2} />
            </g>
            {/* webbed feet and bent legs */}
            <path d="M-22 -2 l6 -5 l6 5 l6 -5 l2 5 z M4 -2 l6 -5 l6 5 l6 -5 l2 5 z" fill={SKIN_DARK} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            <ellipse cx={-10} cy={-14} rx={9} ry={11} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={13} cy={-14} rx={9} ry={11} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            {/* body, belly and belt */}
            <ellipse cx={0} cy={-34} rx={19} ry={22} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={3} cy={-32} rx={11} ry={15} fill={BELLY} />
            <rect x={-19} y={-30} width={38} height={6} fill="#78350f" stroke={INK} strokeWidth={2} />
            <rect x={-1} y={-31} width={8} height={8} fill="#facc15" stroke={INK} strokeWidth={2} />
            {/* wide head with eyes on top */}
            <ellipse cx={2} cy={-62} rx={25} ry={14} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            <circle cx={-8} cy={-76} r={9.5} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            <circle cx={13} cy={-76} r={9.5} fill={SKIN} stroke={INK} strokeWidth={LINE} />
            <path d="M-17 -72 h40" stroke={SKIN} strokeWidth={6} />
            <Eye cx={-8} cy={-76} r={6} pose={pose} lid={SKIN} />
            <Eye cx={13} cy={-76} r={6} pose={pose} lid={SKIN} />
            {/* little crown */}
            <path d="M-6 -90 l3 -9 l4 6 l4 -8 l4 8 l4 -6 l2 9 z" fill="#facc15" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            <circle cx={-14} cy={-58} r={3.5} fill="#f9a8d4" opacity={0.7} />
            <Mouth cx={6} cy={-56} pose={pose} s={0.9} />
            {/* front arm */}
            <g transform={`translate(17 -44) rotate(${FRONT_ARM[pose]})`}>
                <rect x={-4} y={-2} width={8} height={18} rx={4} fill={SKIN} stroke={INK} strokeWidth={LINE} />
                <circle cx={0} cy={18} r={5} fill={SKIN} stroke={INK} strokeWidth={2} />
            </g>
        </g>
    );
}
