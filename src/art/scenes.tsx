// Comic backgrounds, drawn in the 400 × 250 panel space. Blocky voxel-world style.
import type { SceneId } from '../content/schema';
import { GROUND_Y, INK, PANEL_H, PANEL_W } from './common';

function Sky({ top, bottom, id }: { top: string; bottom: string; id: string }) {
    return (
        <>
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={top} />
                    <stop offset="1" stopColor={bottom} />
                </linearGradient>
            </defs>
            <rect width={PANEL_W} height={PANEL_H} fill={`url(#${id})`} />
        </>
    );
}

function GrassGround({ grass = '#4d9e2a', dirt = '#8b5a2b' }: { grass?: string; dirt?: string }) {
    return (
        <g>
            <rect y={GROUND_Y} width={PANEL_W} height={PANEL_H - GROUND_Y} fill={dirt} />
            <rect y={GROUND_Y} width={PANEL_W} height={8} fill={grass} />
            {Array.from({ length: 20 }, (_, i) => (
                <rect key={i} x={i * 20 + (i % 3) * 4} y={GROUND_Y + 8} width={6} height={4} fill={grass} />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
                <rect key={i} x={i * 41 + 12} y={GROUND_Y + 18 + (i % 2) * 6} width={6} height={6} fill="#6b4423" />
            ))}
        </g>
    );
}

function BlockTree({ x, s = 1 }: { x: number; s?: number }) {
    return (
        <g transform={`translate(${x} ${GROUND_Y}) scale(${s})`}>
            <rect x={-6} y={-46} width={12} height={46} fill="#7c5230" stroke={INK} strokeWidth={2} />
            <rect x={-26} y={-86} width={52} height={44} fill="#3f8f2a" stroke={INK} strokeWidth={2} />
            <rect x={-16} y={-100} width={32} height={16} fill="#4fa833" stroke={INK} strokeWidth={2} />
            <rect x={-18} y={-74} width={8} height={8} fill="#5cb83c" />
            <rect x={8} y={-62} width={8} height={8} fill="#2f7a20" />
        </g>
    );
}

function Cloud({ x, y }: { x: number; y: number }) {
    return (
        <g fill="#fff" opacity={0.95}>
            <rect x={x} y={y} width={56} height={14} />
            <rect x={x + 12} y={y - 10} width={30} height={12} />
        </g>
    );
}

function Hills({ color, y }: { color: string; y: number }) {
    return (
        <path
            d={`M0 ${y} h40 v-16 h50 v-10 h60 v18 h50 v-24 h70 v14 h60 v-8 h70 V${GROUND_Y} H0 Z`}
            fill={color}
        />
    );
}

function Meadow() {
    return (
        <g>
            <Sky id="sky-meadow" top="#7cc4f8" bottom="#d6f0ff" />
            <rect x={320} y={22} width={34} height={34} fill="#fde047" stroke="#facc15" strokeWidth={4} />
            <Cloud x={40} y={36} />
            <Cloud x={210} y={58} />
            <Hills color="#93c96b" y={GROUND_Y - 30} />
            <BlockTree x={22} s={0.8} />
            <BlockTree x={380} s={0.9} />
            <GrassGround />
        </g>
    );
}

function Night() {
    return (
        <g>
            <Sky id="sky-night" top="#0b1033" bottom="#27306b" />
            <rect x={60} y={28} width={30} height={30} fill="#f1f5f9" />
            <rect x={66} y={34} width={7} height={7} fill="#cbd5e1" />
            {[[150, 30], [220, 50], [300, 24], [350, 70], [120, 80], [260, 90], [30, 110]].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width={3} height={3} fill="#fff" />
            ))}
            <Hills color="#1e293b" y={GROUND_Y - 30} />
            <BlockTree x={360} s={0.9} />
            <GrassGround grass="#245a1a" dirt="#4a3018" />
            <rect width={PANEL_W} height={PANEL_H} fill="#0b1033" opacity={0.25} />
        </g>
    );
}

function StoneWall({ base, line }: { base: string; line: string }) {
    return (
        <g>
            <rect width={PANEL_W} height={PANEL_H} fill={base} />
            {Array.from({ length: 9 }, (_, row) =>
                Array.from({ length: 11 }, (_, col) => (
                    <rect key={`${row}-${col}`} x={col * 40 - (row % 2) * 20} y={row * 28} width={40} height={28} fill="none" stroke={line} strokeWidth={2} />
                )),
            )}
        </g>
    );
}

function Cave() {
    const ores: [number, number, string][] = [[40, 40, '#22d3ee'], [300, 70, '#fbbf24'], [180, 30, '#ef4444'], [350, 140, '#22d3ee'], [90, 130, '#a3a3a3']];
    return (
        <g>
            <StoneWall base="#6b7280" line="#4b5563" />
            {ores.map(([x, y, c], i) => (
                <g key={i}>
                    <rect x={x} y={y} width={8} height={8} fill={c} />
                    <rect x={x + 12} y={y + 6} width={6} height={6} fill={c} />
                    <rect x={x + 4} y={y + 12} width={6} height={6} fill={c} />
                </g>
            ))}
            <radialGradient id="torchglow">
                <stop offset="0" stopColor="#fde68a" stopOpacity={0.55} />
                <stop offset="1" stopColor="#fde68a" stopOpacity={0} />
            </radialGradient>
            <circle cx={200} cy={90} r={140} fill="url(#torchglow)" />
            <rect y={GROUND_Y} width={PANEL_W} height={PANEL_H - GROUND_Y} fill="#44403c" />
            <rect y={GROUND_Y} width={PANEL_W} height={5} fill="#57534e" />
        </g>
    );
}

function House({ x, w, color }: { x: number; w: number; color: string }) {
    const h = 70;
    return (
        <g transform={`translate(${x} ${GROUND_Y})`}>
            <rect x={0} y={-h} width={w} height={h} fill={color} stroke={INK} strokeWidth={2} />
            {Array.from({ length: 6 }, (_, i) => <line key={i} x1={0} y1={-h + i * 12} x2={w} y2={-h + i * 12} stroke="#7c5230" strokeWidth={1.5} />)}
            <path d={`M-8 ${-h} L${w / 2} ${-h - 36} L${w + 8} ${-h} Z`} fill="#9a3412" stroke={INK} strokeWidth={2} />
            <rect x={w / 2 - 9} y={-30} width={18} height={30} fill="#5b3a1f" stroke={INK} strokeWidth={2} />
            <rect x={8} y={-56} width={14} height={14} fill="#bae6fd" stroke={INK} strokeWidth={2} />
        </g>
    );
}

function Village() {
    return (
        <g>
            <Sky id="sky-village" top="#93c5fd" bottom="#e0f2fe" />
            <Cloud x={150} y={30} />
            <House x={30} w={70} color="#c08a4f" />
            <House x={290} w={80} color="#b07a40" />
            <BlockTree x={200} s={0.7} />
            <GrassGround />
            <rect x={0} y={GROUND_Y + 2} width={PANEL_W} height={6} fill="#d6b87a" opacity={0.8} />
        </g>
    );
}

function Room() {
    return (
        <g>
            <rect width={PANEL_W} height={PANEL_H} fill="#b98b55" />
            {Array.from({ length: 12 }, (_, i) => (
                <g key={i}>
                    <line x1={0} y1={i * 20} x2={PANEL_W} y2={i * 20} stroke="#8a6238" strokeWidth={2} />
                    <line x1={(i * 97) % PANEL_W} y1={i * 20} x2={(i * 97) % PANEL_W} y2={i * 20 + 20} stroke="#8a6238" strokeWidth={2} />
                </g>
            ))}
            <rect x={150} y={36} width={90} height={64} fill="#bae6fd" stroke={INK} strokeWidth={3} />
            <line x1={195} y1={36} x2={195} y2={100} stroke={INK} strokeWidth={3} />
            <line x1={150} y1={68} x2={240} y2={68} stroke={INK} strokeWidth={3} />
            <rect y={GROUND_Y} width={PANEL_W} height={PANEL_H - GROUND_Y} fill="#6b4423" />
            <rect y={GROUND_Y} width={PANEL_W} height={4} fill="#4a2f1b" />
        </g>
    );
}

function Circuit() {
    return (
        <g>
            <StoneWall base="#3f3f46" line="#27272a" />
            <path d="M0 200 h80 v-40 h120 v40 h80 v-60 h120" fill="none" stroke="#ef4444" strokeWidth={5} opacity={0.9} />
            <path d="M0 200 h80 v-40 h120 v40 h80 v-60 h120" fill="none" stroke="#fca5a5" strokeWidth={1.5} />
            {[[80, 160], [200, 200], [280, 140]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={8} fill="#ef4444" opacity={0.5} />)}
            <rect y={GROUND_Y} width={PANEL_W} height={PANEL_H - GROUND_Y} fill="#27272a" />
        </g>
    );
}

function Screen() {
    return (
        <g>
            <Sky id="sky-screen" top="#1e1b4b" bottom="#312e81" />
            {[[30, 30], [370, 50], [340, 200], [20, 180], [200, 18]].map(([x, y], i) => <rect key={i} x={x} y={y} width={3} height={3} fill="#c7d2fe" />)}
            <rect x={150} y={36} width={220} height={130} rx={8} fill="#0f172a" stroke="#818cf8" strokeWidth={4} />
            {[0, 1, 2, 3, 4].map(i => (
                <rect key={i} x={166 + (i % 2) * 14} y={56 + i * 20} width={[120, 90, 140, 70, 110][i]} height={7} rx={3} fill={['#4ade80', '#facc15', '#60a5fa', '#f472b6', '#4ade80'][i]} opacity={0.8} />
            ))}
            <rect y={GROUND_Y} width={PANEL_W} height={PANEL_H - GROUND_Y} fill="#1e1b4b" />
            <rect y={GROUND_Y} width={PANEL_W} height={3} fill="#6366f1" />
        </g>
    );
}

export function SceneArt({ scene }: { scene: SceneId }) {
    switch (scene) {
        case 'meadow': return <Meadow />;
        case 'night': return <Night />;
        case 'cave': return <Cave />;
        case 'village': return <Village />;
        case 'room': return <Room />;
        case 'circuit': return <Circuit />;
        case 'screen': return <Screen />;
    }
}
