// A round, friendly critter with big ears and a fluffy tail. Tintable, so one drawing serves as
// a pet (Fizz, World 2) or a glitchy creature (Glitch, World 3).
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { shade } from './parts';

export function Critter({ pose, tint = '#facc15' }: { pose: Pose; tint?: string }) {
    const dark = shade(tint, -60);
    const light = shade(tint, 70);
    const bounce = pose === 'happy' || pose === 'surprised' ? -6 : 0;
    const paw = { wave: -150, point: -90, happy: -130, surprised: -150, talk: -40, think: -130, idle: -15, sad: -5 }[pose];

    const eye = (cx: number) => {
        if (pose === 'happy') return <path d={`M${cx - 6} -46 q6 -7 12 0`} fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />;
        const r = pose === 'surprised' ? 9 : 8;
        return (
            <g>
                <circle cx={cx} cy={-46} r={r} fill="#fff" stroke={INK} strokeWidth={2} />
                <circle cx={cx + 2} cy={pose === 'think' ? -49 : -45} r={4.5} fill={INK} />
                <circle cx={cx + 3.5} cy={pose === 'think' ? -50.5 : -46.5} r={1.5} fill="#fff" />
                {pose === 'sad' && <path d={`M${cx - 9} -50 h18 v-8 h-18 z`} fill={tint} stroke={INK} strokeWidth={2} />}
            </g>
        );
    };
    const mouth = {
        talk: <ellipse cx={2} cy={-30} rx={5} ry={4} fill="#7f1d1d" stroke={INK} strokeWidth={2} />,
        point: <ellipse cx={2} cy={-30} rx={5} ry={4} fill="#7f1d1d" stroke={INK} strokeWidth={2} />,
        happy: <path d="M-8 -33 q10 12 20 0 z" fill="#7f1d1d" stroke={INK} strokeWidth={2} />,
        surprised: <circle cx={2} cy={-30} r={5} fill="#7f1d1d" stroke={INK} strokeWidth={2} />,
        sad: <path d="M-5 -27 q7 -6 14 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />,
        think: <path d="M-2 -30 h9" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />,
        wave: <path d="M-5 -32 q7 6 14 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />,
        idle: <path d="M-4 -31 q6 4 12 0" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />,
    }[pose];

    return (
        <g transform={`translate(0 ${bounce})`}>
            {/* fluffy puff tail */}
            <path d="M-24 -22 q-14 -8 -14 4 q-8 4 -2 10 q0 8 10 4 q8 2 8 -6 z" fill={light} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
            {/* feet */}
            <ellipse cx={-12} cy={-3} rx={9} ry={5} fill={dark} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={14} cy={-3} rx={9} ry={5} fill={dark} stroke={INK} strokeWidth={LINE} />
            {/* round ears */}
            <circle cx={-18} cy={-64} r={11} fill={tint} stroke={INK} strokeWidth={LINE} />
            <circle cx={-18} cy={-64} r={5.5} fill={light} />
            <circle cx={21} cy={-64} r={11} fill={tint} stroke={INK} strokeWidth={LINE} />
            <circle cx={21} cy={-64} r={5.5} fill={light} />
            {/* body */}
            <ellipse cx={1} cy={-34} rx={28} ry={30} fill={tint} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={3} cy={-22} rx={16} ry={14} fill={light} />
            <path d="M3 -28 l2.4 4.8 5.3 .8 -3.8 3.7 .9 5.3 -4.8 -2.5 -4.8 2.5 .9 -5.3 -3.8 -3.7 5.3 -.8 z" fill={dark} opacity={0.6} />
            {/* antenna sprout */}
            <path d="M1 -64 q-2 -12 6 -16" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={8} cy={-81} r={4} fill={light} stroke={INK} strokeWidth={2} />
            {eye(-8)}
            {eye(12)}
            {mouth}
            {/* paw */}
            <g transform={`translate(24 -28) rotate(${paw})`}>
                <ellipse cx={0} cy={9} rx={5} ry={10} fill={tint} stroke={INK} strokeWidth={LINE} />
            </g>
        </g>
    );
}
