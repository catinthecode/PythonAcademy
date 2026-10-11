// An octopus explorer with goggles pushed up on its head (Nova). Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

const GOGGLE = '#7dd3fc';

export function Octopus({ pose, tint = '#9333ea' }: { pose: Pose; tint?: string }) {
    const light = shade(tint, 70);
    const dark = shade(tint, -50);
    // Curly tentacles along the ground
    const tentacle = (x: number, curl: number) => (
        <path
            key={x}
            d={`M${x - 6} -24 Q${x - 8} -8 ${x + curl * 2} -3 Q${x + curl * 10} 0 ${x + curl * 8} -8 Q${x + curl * 2} -8 ${x + 6} -24 Z`}
            fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round"
        />
    );
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {[tentacle(-22, -1), tentacle(-8, -1), tentacle(8, 1), tentacle(22, 1)]}
            {/* big round head */}
            <ellipse cx={0} cy={-52} rx={28} ry={33} fill={tint} stroke={INK} strokeWidth={LINE} />
            <circle cx={-18} cy={-38} r={3.5} fill={light} />
            <circle cx={-12} cy={-28} r={2.5} fill={light} />
            <circle cx={20} cy={-30} r={3} fill={light} />
            {/* goggles on the forehead */}
            <path d="M-27 -66 Q0 -74 27 -66" fill="none" stroke={dark} strokeWidth={5} />
            <circle cx={-6} cy={-70} r={7} fill={GOGGLE} stroke={INK} strokeWidth={2.5} />
            <circle cx={12} cy={-70} r={7} fill={GOGGLE} stroke={INK} strokeWidth={2.5} />
            <path d="M-9 -73 l4 -2 M9 -73 l4 -2" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
            <Eye cx={-5} cy={-50} r={7} pose={pose} lid={tint} />
            <Eye cx={13} cy={-50} r={7} pose={pose} lid={tint} />
            <Mouth cx={5} cy={-33} pose={pose} s={0.8} />
            {/* waving tentacle arm */}
            <g transform={`translate(24 -34) rotate(${FRONT_ARM[pose]})`}>
                <path d="M-5 0 Q-7 14 0 24 Q8 26 7 18 Q3 14 5 0 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
                <circle cx={0} cy={10} r={1.8} fill={light} />
                <circle cx={2} cy={17} r={1.5} fill={light} />
            </g>
        </g>
    );
}
