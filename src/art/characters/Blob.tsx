// A wobbly slime blob with a shiny highlight and a stretchy arm (Slime). Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { Eye, FRONT_ARM, Mouth, shade } from './parts';

export function Blob({ pose, tint = '#84cc16' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -50);
    const light = shade(tint, 80);
    // Squash when happy, sag when sad, stretch tall when surprised
    const sx = pose === 'happy' ? 1.08 : pose === 'sad' ? 1.1 : pose === 'surprised' ? 0.93 : 1;
    const sy = pose === 'happy' ? 0.94 : pose === 'sad' ? 0.88 : pose === 'surprised' ? 1.08 : 1;
    return (
        <g>
            {/* puddle */}
            <ellipse cx={0} cy={-2} rx={40} ry={6} fill={dark} stroke={INK} strokeWidth={LINE} />
            <g transform={`scale(${sx} ${sy})`}>
                {/* stretchy arm */}
                <g transform={`translate(26 -30) rotate(${FRONT_ARM[pose]})`}>
                    <ellipse cx={0} cy={10} rx={6.5} ry={13} fill={tint} stroke={INK} strokeWidth={LINE} />
                </g>
                {/* body */}
                <path d="M-36 -2 Q-40 -12 -33 -30 Q-24 -68 0 -70 Q24 -68 33 -30 Q40 -12 36 -2 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
                <path d="M-30 -10 q2 8 -2 12" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
                {/* bubbles and shine */}
                <circle cx={-18} cy={-16} r={4} fill={light} opacity={0.7} />
                <circle cx={-8} cy={-10} r={2.5} fill={light} opacity={0.7} />
                <circle cx={20} cy={-12} r={3} fill={light} opacity={0.7} />
                <ellipse cx={-18} cy={-50} rx={5} ry={10} fill="#fff" opacity={0.75} transform="rotate(25 -18 -50)" />
            </g>
            <Eye cx={-4} cy={-42 * sy} r={8} pose={pose} lid={tint} />
            <Eye cx={16} cy={-42 * sy} r={8} pose={pose} lid={tint} />
            <Mouth cx={7} cy={-24 * sy} pose={pose} />
        </g>
    );
}
