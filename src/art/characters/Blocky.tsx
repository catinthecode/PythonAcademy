// Blocky humans: the miner (Max-like) and the kid (trainer/builder, tintable cap and shirt).
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';

interface Palette {
    skin: string;
    hair: string;
    shirt: string;
    pants: string;
    shoes: string;
    cap?: string;
}

/** Shoulder angles in degrees (0 = hanging down). Left arm uses positive angles, right arm negative. */
const ARMS: Record<Pose, { l: number; r: number; rElbow?: number }> = {
    idle: { l: 6, r: -6 },
    talk: { l: 6, r: -35 },
    wave: { l: 6, r: -155 },
    point: { l: 6, r: -90 },
    think: { l: 6, r: -20, rElbow: 163 },
    happy: { l: 30, r: -30 },
    surprised: { l: 150, r: -150 },
    sad: { l: 2, r: -2 },
};

function Arm({ x, angle, elbow = 0, p }: { x: number; angle: number; elbow?: number; p: Palette }) {
    // Upper arm then forearm, so poses like "hand on chin" work.
    return (
        <g transform={`translate(${x} -72) rotate(${angle})`}>
            <rect x={-5.5} y={-2} width={11} height={22} fill={p.shirt} stroke={INK} strokeWidth={LINE} />
            <g transform={`translate(0 18) rotate(${elbow})`}>
                <rect x={-5.5} y={0} width={11} height={18} fill={p.skin} stroke={INK} strokeWidth={LINE} />
            </g>
        </g>
    );
}

function Face({ pose }: { pose: Pose }) {
    const eye = (x: number) => {
        if (pose === 'happy') return <path d={`M${x} -88 q3.5 -5 7 0`} fill="none" stroke={INK} strokeWidth={2.5} />;
        const tall = pose === 'surprised' ? 8 : 5;
        const lookUp = pose === 'think' ? -2 : 0;
        return (
            <g>
                <rect x={x} y={-91 - (tall - 5)} width={7} height={tall} fill="#fff" />
                <rect x={x + 3.5} y={-91 - (tall - 5) + lookUp} width={3.5} height={tall + lookUp} fill="#3b82f6" />
            </g>
        );
    };
    const mouth = {
        idle: <rect x={-5} y={-81} width={10} height={3} fill={INK} />,
        talk: <rect x={-5} y={-83} width={10} height={6} fill="#7f1d1d" stroke={INK} strokeWidth={1.5} />,
        wave: <path d="M-6 -82 q6 5 12 0" fill="none" stroke={INK} strokeWidth={2.5} />,
        point: <rect x={-5} y={-83} width={10} height={6} fill="#7f1d1d" stroke={INK} strokeWidth={1.5} />,
        think: <rect x={0} y={-81} width={7} height={3} fill={INK} />,
        happy: <path d="M-8 -83 q8 8 16 0 z" fill="#7f1d1d" stroke={INK} strokeWidth={2} />,
        surprised: <rect x={-3.5} y={-84} width={7} height={8} fill="#7f1d1d" stroke={INK} strokeWidth={1.5} />,
        sad: <path d="M-6 -78 q6 -5 12 0" fill="none" stroke={INK} strokeWidth={2.5} />,
    }[pose];
    return (
        <g>
            {eye(-11)}
            {eye(4)}
            {pose === 'sad' && (
                <g stroke={INK} strokeWidth={2}>
                    <line x1={-12} y1={-96} x2={-4} y2={-98} />
                    <line x1={4} y1={-98} x2={12} y2={-96} />
                </g>
            )}
            {mouth}
        </g>
    );
}

function Blocky({ pose, p }: { pose: Pose; p: Palette }) {
    const arms = ARMS[pose];
    return (
        <g>
            {/* legs */}
            <rect x={-16} y={-36} width={15} height={36} fill={p.pants} stroke={INK} strokeWidth={LINE} />
            <rect x={1} y={-36} width={15} height={36} fill={p.pants} stroke={INK} strokeWidth={LINE} />
            <rect x={-16} y={-7} width={15} height={7} fill={p.shoes} />
            <rect x={1} y={-7} width={15} height={7} fill={p.shoes} />
            {/* body */}
            <rect x={-17} y={-74} width={34} height={40} fill={p.shirt} stroke={INK} strokeWidth={LINE} />
            <Arm x={-22.5} angle={arms.l} p={p} />
            <Arm x={22.5} angle={arms.r} elbow={arms.rElbow} p={p} />
            {/* head */}
            <rect x={-17} y={-108} width={34} height={34} fill={p.skin} stroke={INK} strokeWidth={LINE} />
            <rect x={-17} y={-108} width={34} height={9} fill={p.hair} />
            <rect x={-17} y={-99} width={5} height={7} fill={p.hair} />
            <rect x={-17} y={-108} width={34} height={34} fill="none" stroke={INK} strokeWidth={LINE} />
            {p.cap && (
                <g stroke={INK} strokeWidth={LINE}>
                    <path d="M-19 -100 v-8 q19 -12 38 0 v8 z" fill={p.cap} />
                    <rect x={12} y={-103} width={16} height={5} fill={p.cap} />
                </g>
            )}
            <Face pose={pose} />
        </g>
    );
}

export function Miner({ pose }: { pose: Pose }) {
    return <Blocky pose={pose} p={{ skin: '#c8946a', hair: '#4a2f1b', shirt: '#f97316', pants: '#475569', shoes: '#292524' }} />;
}

export function Kid({ pose, tint = '#dc2626' }: { pose: Pose; tint?: string }) {
    return <Blocky pose={pose} p={{ skin: '#f1c27d', hair: '#292524', shirt: tint, pants: '#1e3a8a', shoes: '#1c1917', cap: tint }} />;
}
