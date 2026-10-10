// Small objects placed in comic panels. Each is drawn with its bottom-centre at (0, 0).
import type { PropId } from '../content/schema';
import { INK } from './common';

const S = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: 'round' as const };

const PROPS: Record<PropId, () => React.JSX.Element> = {
    commandBlock: () => (
        <g>
            <rect x={-22} y={-44} width={44} height={44} fill="#ea8c2e" {...S} />
            <rect x={-14} y={-36} width={28} height={28} fill="#c2410c" stroke="#7c2d12" strokeWidth={2} />
            <path d="M-6 -28 l8 6 -8 6" fill="none" stroke="#fde68a" strokeWidth={3} />
            <rect x={-22} y={-44} width={44} height={44} fill="none" stroke="#fde68a" strokeWidth={1} opacity={0.6} />
        </g>
    ),
    chest: () => (
        <g>
            <rect x={-22} y={-30} width={44} height={30} fill="#a16207" {...S} />
            <rect x={-22} y={-38} width={44} height={10} fill="#ca8a04" {...S} />
            <rect x={-4} y={-32} width={8} height={9} fill="#e5e7eb" {...S} strokeWidth={2} />
        </g>
    ),
    diamond: () => (
        <g>
            <path d="M-12 -18 l6 -8 h12 l6 8 l-12 18 z" fill="#67e8f9" {...S} />
            <path d="M-12 -18 h24 M-6 -26 l6 26 l6 -26" fill="none" stroke="#0891b2" strokeWidth={1.5} />
        </g>
    ),
    tnt: () => (
        <g>
            <rect x={-20} y={-40} width={40} height={40} fill="#dc2626" {...S} />
            <rect x={-20} y={-27} width={40} height={14} fill="#f5f5f4" />
            <text x={0} y={-16} textAnchor="middle" fontSize={11} fontWeight={900} fill={INK} fontFamily="monospace">TNT</text>
            <rect x={-20} y={-40} width={40} height={40} fill="none" {...S} />
        </g>
    ),
    repeater: () => (
        <g>
            <rect x={-24} y={-12} width={48} height={12} fill="#a8a29e" {...S} />
            <rect x={-14} y={-20} width={6} height={8} fill="#ef4444" {...S} strokeWidth={1.5} />
            <rect x={8} y={-20} width={6} height={8} fill="#ef4444" {...S} strokeWidth={1.5} />
            <circle cx={-11} cy={-24} r={4} fill="#fca5a5" opacity={0.8} />
            <circle cx={11} cy={-24} r={4} fill="#fca5a5" opacity={0.8} />
        </g>
    ),
    sign: () => (
        <g>
            <rect x={-3} y={-30} width={6} height={30} fill="#7c5230" {...S} />
            <rect x={-20} y={-52} width={40} height={24} fill="#c08a4f" {...S} />
            <path d="M-14 -44 h28 M-14 -36 h20" stroke="#7c5230" strokeWidth={2.5} />
        </g>
    ),
    magnifier: () => (
        <g>
            <path d="M8 -8 L20 4" stroke="#7c5230" strokeWidth={7} strokeLinecap="round" />
            <circle cx={0} cy={-18} r={14} fill="#e0f2fe" fillOpacity={0.6} stroke={INK} strokeWidth={4} />
        </g>
    ),
    pickaxe: () => (
        <g>
            <path d="M-2 0 L10 -36" stroke="#7c5230" strokeWidth={5} strokeLinecap="round" />
            <path d="M-8 -34 Q10 -48 28 -30" fill="none" stroke="#67e8f9" strokeWidth={7} strokeLinecap="round" />
            <path d="M-8 -34 Q10 -48 28 -30" fill="none" stroke={INK} strokeWidth={1.5} />
        </g>
    ),
    torch: () => (
        <g>
            <rect x={-3} y={-26} width={6} height={26} fill="#7c5230" {...S} strokeWidth={2} />
            <rect x={-5} y={-34} width={10} height={9} fill="#facc15" {...S} strokeWidth={2} />
            <circle cx={0} cy={-32} r={10} fill="#fde68a" opacity={0.35} />
        </g>
    ),
    bug: () => (
        <g>
            <path d="M-10 -2 l-6 4 M-10 -8 l-7 0 M10 -2 l6 4 M10 -8 l7 0 M-4 -16 l-4 -6 M4 -16 l4 -6" stroke={INK} strokeWidth={2} />
            <ellipse cx={0} cy={-8} rx={11} ry={9} fill="#a21caf" {...S} />
            <line x1={0} y1={-17} x2={0} y2={1} stroke={INK} strokeWidth={1.5} />
            <circle cx={-4} cy={-11} r={2} fill="#fff" />
            <circle cx={4} cy={-11} r={2} fill="#fff" />
        </g>
    ),
    cow: () => (
        <g>
            <rect x={-26} y={-34} width={44} height={22} fill="#f5f5f4" {...S} />
            <rect x={-18} y={-30} width={12} height={10} fill="#292524" />
            <rect x={2} y={-24} width={10} height={8} fill="#292524" />
            <rect x={-24} y={-12} width={8} height={12} fill="#f5f5f4" {...S} strokeWidth={2} />
            <rect x={8} y={-12} width={8} height={12} fill="#f5f5f4" {...S} strokeWidth={2} />
            <rect x={16} y={-42} width={18} height={18} fill="#f5f5f4" {...S} />
            <rect x={26} y={-32} width={10} height={7} fill="#fbcfe8" {...S} strokeWidth={1.5} />
            <rect x={20} y={-38} width={3} height={3} fill={INK} />
        </g>
    ),
    candy: () => (
        <g>
            <path d="M-18 -10 l-8 -6 v12 z M18 -10 l8 -6 v12 z" fill="#f472b6" {...S} strokeWidth={2} />
            <circle cx={0} cy={-10} r={12} fill="#fb7185" {...S} />
            <path d="M-6 -14 q6 -6 12 0" fill="none" stroke="#fff" strokeWidth={2.5} />
        </g>
    ),
    coin: () => (
        <g>
            <circle cx={0} cy={-12} r={12} fill="#facc15" {...S} />
            <circle cx={0} cy={-12} r={7} fill="none" stroke="#ca8a04" strokeWidth={2} />
        </g>
    ),
    quote: () => (
        <g fill="#fde047" stroke={INK} strokeWidth={3}>
            <path d="M-26 -10 q-6 -20 10 -30 l3 5 q-8 6 -6 12 h6 v13 z" />
            <path d="M4 -10 q-6 -20 10 -30 l3 5 q-8 6 -6 12 h6 v13 z" />
        </g>
    ),
    scroll: () => (
        <g>
            <path d="M-40 0 h70 q10 0 10 -8 v-2 h-70 z" fill="#fef3c7" {...S} />
            <circle cx={40} cy={-6} r={6} fill="#fde68a" {...S} />
            {[0, 1, 2].map(i => <line key={i} x1={-34 + i * 22} y1={-5} x2={-22 + i * 22} y2={-5} stroke="#a8a29e" strokeWidth={2} />)}
        </g>
    ),
    swatter: () => (
        <g>
            <path d="M0 0 L0 -26" stroke="#7c5230" strokeWidth={4} strokeLinecap="round" />
            <rect x={-12} y={-50} width={24} height={24} rx={4} fill="#60a5fa" {...S} />
            <path d="M-6 -50 v24 M0 -50 v24 M6 -50 v24 M-12 -42 h24 M-12 -34 h24" stroke="#1d4ed8" strokeWidth={1} />
        </g>
    ),
};

export function PropArt({ item }: { item: PropId }) {
    return PROPS[item]();
}
