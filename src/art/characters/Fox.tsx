// A fox in a bubble space helmet, with a big white-tipped tail. Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

export function Fox({ pose, tint = '#ea580c' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -70);
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* fluffy tail */}
            <path d="M-12 -16 Q-50 -10 -50 -46 Q-48 -62 -36 -58 Q-40 -30 -12 -30 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <path d="M-50 -46 Q-48 -62 -36 -58 Q-39 -50 -45 -42 Z" fill="#fff" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            {/* legs and feet */}
            <rect x={-13} y={-20} width={10} height={18} rx={4} fill={dark} stroke={INK} strokeWidth={LINE} />
            <rect x={4} y={-20} width={10} height={18} rx={4} fill={dark} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={-8} cy={-3} rx={9} ry={4.5} fill={dark} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={11} cy={-3} rx={9} ry={4.5} fill={dark} stroke={INK} strokeWidth={LINE} />
            {/* body */}
            <ellipse cx={0} cy={-34} rx={17} ry={21} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={5} cy={-36} rx={8} ry={13} fill="#fff" />
            {/* ears */}
            <path d="M-15 -74 L-14 -98 L0 -80 Z M2 -80 L15 -98 L18 -74 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <path d="M-12 -78 L-12 -91 L-4 -81 Z M6 -81 L14 -91 L15 -78 Z" fill={dark} />
            {/* head and pointed snout */}
            <ellipse cx={1} cy={-66} rx={18} ry={15} fill={tint} stroke={INK} strokeWidth={LINE} />
            <path d="M8 -68 Q28 -66 34 -59 Q24 -50 6 -54 Z" fill="#fff" stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <circle cx={33} cy={-60} r={3.5} fill={INK} />
            <Eye cx={-3} cy={-70} r={5.5} pose={pose} lid={tint} />
            <Eye cx={11} cy={-70} r={5.5} pose={pose} lid={tint} />
            <Mouth cx={21} cy={-54} pose={pose} s={0.6} />
            {/* bubble helmet */}
            <circle cx={4} cy={-70} r={33} fill="#bae6fd" fillOpacity={0.22} stroke="#e0f2fe" strokeWidth={3} />
            <circle cx={4} cy={-70} r={33} fill="none" stroke={INK} strokeWidth={1.5} />
            <path d="M-16 -88 q8 -10 20 -11" fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" />
            {/* arm */}
            <g transform={`translate(14 -44) rotate(${FRONT_ARM[pose]})`}>
                <rect x={-4} y={-2} width={8} height={18} rx={4} fill={tint} stroke={INK} strokeWidth={LINE} />
                <circle cx={0} cy={17} r={4.5} fill={dark} stroke={INK} strokeWidth={2} />
            </g>
        </g>
    );
}
