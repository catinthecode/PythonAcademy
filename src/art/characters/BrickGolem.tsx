// A golem built from toy bricks, studs and all (Bix). Tintable: the main bricks take the tint.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

const ACCENT = '#facc15';
const RED = '#ef4444';

/** One brick with studs on top. */
function Brick({ x, y, w, h, fill, studs }: { x: number; y: number; w: number; h: number; fill: string; studs: number }) {
    const gap = w / studs;
    return (
        <g>
            {Array.from({ length: studs }, (_, i) => (
                <rect key={i} x={x + gap * i + gap / 2 - 4} y={y - 4} width={8} height={5} rx={1.5} fill={fill} stroke={INK} strokeWidth={2} />
            ))}
            <rect x={x} y={y} width={w} height={h} rx={2} fill={fill} stroke={INK} strokeWidth={LINE} />
            <rect x={x + 3} y={y + 3} width={w - 6} height={3} rx={1.5} fill="#fff" opacity={0.35} />
        </g>
    );
}

export function BrickGolem({ pose, tint = '#2563eb' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -50);
    const arm = (fill: string) => (
        <g>
            <rect x={-6} y={-2} width={12} height={22} rx={2} fill={fill} stroke={INK} strokeWidth={LINE} />
            <rect x={-7} y={18} width={14} height={9} rx={3} fill={ACCENT} stroke={INK} strokeWidth={2.5} />
        </g>
    );
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* legs */}
            <Brick x={-20} y={-24} w={18} h={24} fill={dark} studs={0} />
            <Brick x={2} y={-24} w={18} h={24} fill={dark} studs={0} />
            {/* back arm */}
            <g transform="translate(-26 -58) rotate(12)">{arm(RED)}</g>
            {/* chest bricks */}
            <Brick x={-24} y={-44} w={48} h={20} fill={tint} studs={0} />
            <Brick x={-24} y={-62} w={30} h={18} fill={RED} studs={0} />
            <Brick x={6} y={-62} w={18} h={18} fill={ACCENT} studs={0} />
            {/* square head with studs on top */}
            <Brick x={-18} y={-98} w={38} h={32} fill={tint} studs={2} />
            <rect x={-12} y={-90} width={28} height={18} rx={3} fill="#fef3c7" stroke={INK} strokeWidth={2} />
            <Eye cx={-4} cy={-83} r={5} pose={pose} lid="#fef3c7" />
            <Eye cx={10} cy={-83} r={5} pose={pose} lid="#fef3c7" />
            <Mouth cx={4} cy={-74} pose={pose} s={0.55} />
            {/* front arm */}
            <g transform={`translate(26 -58) rotate(${FRONT_ARM[pose]})`}>{arm(tint)}</g>
        </g>
    );
}
