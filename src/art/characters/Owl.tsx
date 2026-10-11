// A round, wise owl with ear tufts, big eye discs and a little scholar's cap. Tintable.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, shade } from './parts';

const BELLY = '#fde68a';
const DISC = '#fef3c7';
const BEAK = '#f59e0b';

export function Owl({ pose, tint = '#a16207' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -45);
    const open = pose === 'talk' || pose === 'point' || pose === 'happy' || pose === 'surprised';
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {/* feet */}
            <ellipse cx={-9} cy={-3} rx={8} ry={4} fill={BEAK} stroke={INK} strokeWidth={2.5} />
            <ellipse cx={11} cy={-3} rx={8} ry={4} fill={BEAK} stroke={INK} strokeWidth={2.5} />
            {/* back wing */}
            <ellipse cx={-24} cy={-38} rx={8} ry={19} fill={dark} stroke={INK} strokeWidth={LINE} transform="rotate(12 -24 -38)" />
            {/* ear tufts and egg-shaped body */}
            <path d="M-20 -62 L-28 -86 L-8 -70 Z M12 -70 L28 -86 L22 -62 Z" fill={tint} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            <ellipse cx={0} cy={-40} rx={26} ry={36} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={2} cy={-28} rx={16} ry={21} fill={BELLY} />
            <path d="M-6 -36 l3 4 l3 -4 M4 -36 l3 4 l3 -4 M-1 -26 l3 4 l3 -4 M-6 -16 l3 4 l3 -4 M4 -16 l3 4 l3 -4" fill="none" stroke={shade(BELLY, -70)} strokeWidth={1.8} strokeLinecap="round" />
            {/* eye discs */}
            <circle cx={-8} cy={-56} r={12} fill={DISC} stroke={INK} strokeWidth={2} />
            <circle cx={13} cy={-56} r={12} fill={DISC} stroke={INK} strokeWidth={2} />
            <Eye cx={-8} cy={-56} r={7.5} pose={pose} lid={DISC} />
            <Eye cx={13} cy={-56} r={7.5} pose={pose} lid={DISC} />
            {/* beak */}
            {open && <path d="M0 -42 l3.5 6 l3.5 -6 z" fill="#7f1d1d" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />}
            <path d="M-1 -48 l4.5 8 l4.5 -8 z" fill={BEAK} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            {/* scholar's cap */}
            <g transform="translate(2 -76) rotate(-6)">
                <path d="M-11 0 v-6 h22 v6 z" fill="#312e81" stroke={INK} strokeWidth={2.5} />
                <path d="M-20 -6 L0 -14 L20 -6 L0 2 Z" fill="#4338ca" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
                <path d="M-14 -5 q-6 6 -6 12" fill="none" stroke="#facc15" strokeWidth={2.5} strokeLinecap="round" />
            </g>
            {/* front wing */}
            <g transform={`translate(22 -40) rotate(${FRONT_ARM[pose] * 0.6})`}>
                <ellipse cx={0} cy={13} rx={7} ry={16} fill={dark} stroke={INK} strokeWidth={LINE} />
            </g>
        </g>
    );
}
