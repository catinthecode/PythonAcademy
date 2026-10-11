// A bouncy bunny with long ears that droop when sad and perk up when surprised. Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

const PINK = '#f9a8d4';

export function Bunny({ pose, tint = '#f5f5f4' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -45);
    const back = pose === 'sad' ? -80 : pose === 'surprised' ? -4 : -16;
    const front = pose === 'sad' ? -60 : pose === 'surprised' ? 12 : 6;
    const ear = (x: number, y: number, angle: number) => (
        <g transform={`translate(${x} ${y}) rotate(${angle})`}>
            <ellipse cx={0} cy={-18} rx={7.5} ry={20} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={0} cy={-17} rx={3.5} ry={14} fill={PINK} />
        </g>
    );
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {ear(-6, -80, back)}
            {/* cotton tail and big feet */}
            <circle cx={-22} cy={-20} r={8} fill="#fff" stroke={INK} strokeWidth={LINE} />
            <ellipse cx={-8} cy={-5} rx={14} ry={6} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={14} cy={-5} rx={14} ry={6} fill={tint} stroke={INK} strokeWidth={LINE} />
            {/* body */}
            <ellipse cx={0} cy={-31} rx={21} ry={24} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={5} cy={-27} rx={11} ry={15} fill={shade(tint, -12)} />
            {/* head */}
            <ellipse cx={4} cy={-66} rx={20} ry={18} fill={tint} stroke={INK} strokeWidth={LINE} />
            {ear(9, -82, front)}
            <circle cx={-6} cy={-58} r={4} fill={PINK} opacity={0.6} />
            <Eye cx={2} cy={-70} r={5.5} pose={pose} lid={tint} />
            <Eye cx={15} cy={-70} r={5.5} pose={pose} lid={tint} />
            <ellipse cx={22} cy={-62} rx={3.5} ry={2.5} fill={PINK} stroke={INK} strokeWidth={1.5} />
            <Mouth cx={16} cy={-54} pose={pose} s={0.7} />
            <path d="M12 -60 h-10 M12 -57 l-10 3" stroke={dark} strokeWidth={1.5} strokeLinecap="round" />
            {/* paw */}
            <g transform={`translate(17 -40) rotate(${FRONT_ARM[pose]})`}>
                <ellipse cx={0} cy={8} rx={5} ry={10} fill={tint} stroke={INK} strokeWidth={LINE} />
            </g>
        </g>
    );
}
