// A mole miner in overalls and a hard hat with a headlamp (Max).
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

const FUR = '#6b5b53';
const PINK = '#f9a8d4';
const HAT = '#facc15';

export function Mole({ pose, tint = '#f97316' }: { pose: Pose; tint?: string }) {
    const dark = shade(FUR, -30);
    const paw = (
        <g>
            <rect x={-5} y={-2} width={10} height={18} rx={5} fill={FUR} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={0} cy={19} rx={7} ry={5} fill={PINK} stroke={INK} strokeWidth={2} />
            <path d="M-4 23 v3 M0 24 v3 M4 23 v3" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
        </g>
    );
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* feet */}
            <ellipse cx={-10} cy={-4} rx={11} ry={5} fill={PINK} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={12} cy={-4} rx={11} ry={5} fill={PINK} stroke={INK} strokeWidth={LINE} />
            {/* back paw */}
            <g transform="translate(-19 -46) rotate(14)">{paw}</g>
            {/* round furry body in overalls */}
            <ellipse cx={0} cy={-36} rx={23} ry={30} fill={FUR} stroke={INK} strokeWidth={LINE} />
            <path d="M-21 -30 Q-20 -6 0 -6 Q20 -6 21 -30 L14 -30 L14 -44 L-14 -44 L-14 -30 Z" fill={tint} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M-14 -44 L-10 -60 M14 -44 L10 -60" stroke={tint} strokeWidth={4} strokeLinecap="round" />
            <circle cx={-11} cy={-40} r={2.5} fill={HAT} stroke={INK} strokeWidth={1.5} />
            <circle cx={11} cy={-40} r={2.5} fill={HAT} stroke={INK} strokeWidth={1.5} />
            <rect x={-6} y={-28} width={12} height={8} rx={2} fill={shade(tint, -40)} />
            {/* head with a long snout and pink nose */}
            <ellipse cx={4} cy={-72} rx={19} ry={16} fill={FUR} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={20} cy={-65} rx={11} ry={7} fill={FUR} stroke={INK} strokeWidth={LINE} />
            <path d="M10 -70 q6 -2 10 0" fill="none" stroke={FUR} strokeWidth={6} />
            <circle cx={30} cy={-66} r={5} fill={PINK} stroke={INK} strokeWidth={2} />
            <path d="M22 -61 l10 3 M22 -64 l11 0" stroke={dark} strokeWidth={1.5} strokeLinecap="round" />
            <Eye cx={2} cy={-74} r={4.5} pose={pose} lid={FUR} />
            <Eye cx={13} cy={-74} r={4.5} pose={pose} lid={FUR} />
            <Mouth cx={18} cy={-57} pose={pose} s={0.6} />
            {/* hard hat with a headlamp */}
            <path d="M-15 -82 Q-14 -102 5 -102 Q24 -102 25 -82 Z" fill={HAT} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <rect x={-19} y={-84} width={48} height={6} rx={3} fill={shade(HAT, -40)} stroke={INK} strokeWidth={2.5} />
            <path d="M5 -102 v18" stroke={shade(HAT, -40)} strokeWidth={3} />
            <circle cx={21} cy={-92} r={5.5} fill="#fef9c3" stroke={INK} strokeWidth={2.5} />
            {/* front paw */}
            <g transform={`translate(19 -46) rotate(${FRONT_ARM[pose]})`}>{paw}</g>
        </g>
    );
}
