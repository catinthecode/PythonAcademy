// A one-eyed alien with bobbly antennae and three-fingered hands (Zork). Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

export function Alien({ pose, tint = '#22d3ee' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -70);
    const light = shade(tint, 80);
    // Antennae droop when sad and spring up when surprised
    const droop = pose === 'sad' ? 10 : pose === 'surprised' ? -6 : 0;
    const hand = (
        <g>
            <rect x={-3.5} y={-2} width={7} height={20} rx={3.5} fill={tint} stroke={INK} strokeWidth={LINE} />
            <circle cx={-3} cy={21} r={3} fill={tint} stroke={INK} strokeWidth={2} />
            <circle cx={3} cy={21} r={3} fill={tint} stroke={INK} strokeWidth={2} />
            <circle cx={0} cy={23} r={3} fill={tint} stroke={INK} strokeWidth={2} />
        </g>
    );
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* legs */}
            <rect x={-13} y={-24} width={8} height={22} rx={4} fill={tint} stroke={INK} strokeWidth={LINE} />
            <rect x={5} y={-24} width={8} height={22} rx={4} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={-10} cy={-3} rx={9} ry={4.5} fill={dark} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={11} cy={-3} rx={9} ry={4.5} fill={dark} stroke={INK} strokeWidth={LINE} />
            {/* back arm */}
            <g transform="translate(-15 -42) rotate(18)">{hand}</g>
            {/* suit body */}
            <path d="M-17 -22 Q-20 -50 0 -52 Q20 -50 17 -22 Z" fill={dark} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <circle cx={2} cy={-36} r={5} fill="#facc15" stroke={INK} strokeWidth={2} />
            {/* antennae */}
            <path d={`M-8 -86 Q-14 -96 ${-18 - droop / 2} ${-106 + droop}`} fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
            <path d={`M10 -88 Q14 -98 ${18 + droop / 2} ${-108 + droop}`} fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={-18 - droop / 2} cy={-106 + droop} r={4.5} fill={light} stroke={INK} strokeWidth={2} />
            <circle cx={18 + droop / 2} cy={-108 + droop} r={4.5} fill={light} stroke={INK} strokeWidth={2} />
            {/* big head */}
            <ellipse cx={2} cy={-70} rx={26} ry={21} fill={tint} stroke={INK} strokeWidth={LINE} />
            <circle cx={-15} cy={-78} r={3} fill={dark} opacity={0.35} />
            <circle cx={-18} cy={-66} r={2} fill={dark} opacity={0.35} />
            <circle cx={20} cy={-62} r={2.5} fill={dark} opacity={0.35} />
            <Eye cx={5} cy={-74} r={11} pose={pose} lid={tint} />
            <Mouth cx={7} cy={-56} pose={pose} s={0.85} />
            {/* front arm */}
            <g transform={`translate(16 -44) rotate(${FRONT_ARM[pose]})`}>{hand}</g>
        </g>
    );
}
