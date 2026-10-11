// The world heroes: kids who stand in for the learner in each story. One rig, but each hero has
// their own skin tone, hair, outfit and headgear so they're easy to tell apart.
import type { Pose } from '../../content/schema';
import { INK, LINE } from '../common';
import { bounce, Eye, FRONT_ARM, Mouth, shade } from './parts';

type Hair = 'messy' | 'puffs' | 'spiky' | 'wavy' | 'ponytail';
type Gear = 'minerHelmet' | 'cap' | 'goggles' | 'headset' | 'headband';

interface Look {
    skin: string;
    hair: string;
    hairStyle: Hair;
    shirt: string;
    pants: string;
    shoes: string;
    gear: Gear;
    /** Main colour of the headgear (helmet, cap, goggle strap…) */
    gearColor?: string;
    cape?: string;
    overalls?: string;
    belt?: string;
}

export const LOOKS = {
    kidMiner: { skin: '#f1c27d', hair: '#6b3e1f', hairStyle: 'messy', shirt: '#f97316', pants: '#1e40af', shoes: '#292524', gear: 'minerHelmet', gearColor: '#facc15' },
    kidTrainer: { skin: '#8d5524', hair: '#1c1917', hairStyle: 'puffs', shirt: '#dc2626', pants: '#292524', shoes: '#f5f5f4', gear: 'cap', gearColor: '#dc2626' },
    kidBuilder: { skin: '#e0ac69', hair: '#1c1917', hairStyle: 'spiky', shirt: '#facc15', pants: '#2563eb', shoes: '#78350f', gear: 'goggles', gearColor: '#f97316', overalls: '#2563eb' },
    kidKnight: { skin: '#c68642', hair: '#3f2a1d', hairStyle: 'wavy', shirt: '#16a34a', pants: '#78716c', shoes: '#57534e', gear: 'headband', gearColor: '#dc2626', cape: '#dc2626', belt: '#78350f' },
    kidAstronaut: { skin: '#ffe0bd', hair: '#ea580c', hairStyle: 'ponytail', shirt: '#a78bfa', pants: '#a78bfa', shoes: '#f5f5f4', gear: 'headset', gearColor: '#475569', belt: '#f5f5f4' },
} satisfies Record<string, Look>;

export type KidArt = keyof typeof LOOKS;

/** Hair drawn behind the head (puffs, ponytail). */
function HairBack({ look }: { look: Look }) {
    const p = { fill: look.hair, stroke: INK, strokeWidth: LINE, strokeLinejoin: 'round' as const };
    if (look.hairStyle === 'puffs') {
        return <g><circle cx={-21} cy={-100} r={11} {...p} /><circle cx={21} cy={-100} r={11} {...p} /></g>;
    }
    if (look.hairStyle === 'ponytail') {
        return <path d="M-12 -102 Q-40 -100 -38 -70 Q-36 -56 -28 -60 Q-32 -84 -10 -92 Z" {...p} />;
    }
    return null;
}

/** Hair drawn over the top of the head. */
function HairFront({ look }: { look: Look }) {
    const p = { fill: look.hair, stroke: INK, strokeWidth: LINE, strokeLinejoin: 'round' as const };
    switch (look.hairStyle) {
        case 'messy':
            return <path d="M-21 -86 Q-23 -110 0 -109 Q23 -110 21 -86 Q16 -95 10 -93 Q4 -100 -2 -94 Q-10 -100 -14 -92 Q-18 -95 -21 -86 Z" {...p} />;
        case 'puffs':
            return <path d="M-20 -88 Q-20 -108 0 -108 Q20 -108 20 -88 Q10 -98 0 -97 Q-10 -98 -20 -88 Z" {...p} />;
        case 'spiky':
            return <path d="M-21 -86 L-25 -100 L-15 -99 L-13 -113 L-4 -103 L2 -118 L8 -103 L17 -112 L16 -99 L25 -101 L21 -86 Q0 -98 -21 -86 Z" {...p} />;
        case 'wavy':
            return <path d="M-21 -82 Q-25 -109 0 -109 Q25 -109 22 -85 Q15 -97 5 -95 Q-5 -91 -13 -96 Q-17 -89 -21 -82 Z" {...p} />;
        case 'ponytail':
            return (
                <g>
                    <path d="M-21 -86 Q-21 -109 0 -109 Q21 -109 21 -88 Q12 -100 -2 -96 Q-14 -96 -21 -86 Z" {...p} />
                    <circle cx={-16} cy={-100} r={4} fill="#a78bfa" stroke={INK} strokeWidth={2} />
                </g>
            );
    }
}

function Gear({ look }: { look: Look }) {
    const c = look.gearColor ?? '#64748b';
    switch (look.gear) {
        case 'minerHelmet':
            return (
                <g>
                    <path d="M-22 -94 Q-21 -118 0 -118 Q21 -118 22 -94 Z" fill={c} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
                    <rect x={-25} y={-97} width={50} height={6} rx={3} fill={shade(c, -40)} stroke={INK} strokeWidth={2.5} />
                    <circle cx={0} cy={-108} r={6} fill="#fef9c3" stroke={INK} strokeWidth={2.5} />
                </g>
            );
        case 'cap':
            return (
                <g>
                    <path d="M-21 -94 Q-20 -115 0 -115 Q20 -115 21 -94 Z" fill={c} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />
                    <path d="M14 -96 q16 -4 24 2 q-10 5 -24 3 z" fill={c} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
                    <circle cx={0} cy={-104} r={4.5} fill="#fff" stroke={INK} strokeWidth={2} />
                </g>
            );
        case 'goggles':
            return (
                <g>
                    <path d="M-21 -97 Q0 -103 21 -97" fill="none" stroke={c} strokeWidth={5} />
                    <circle cx={-7} cy={-100} r={6.5} fill="#7dd3fc" stroke={INK} strokeWidth={2.5} />
                    <circle cx={8} cy={-100} r={6.5} fill="#7dd3fc" stroke={INK} strokeWidth={2.5} />
                    <path d="M-10 -103 l3 -2 M5 -103 l3 -2" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
                </g>
            );
        case 'headset':
            return (
                <g fill="none" stroke={INK}>
                    <path d="M-21 -88 Q-22 -114 0 -114 Q22 -114 21 -88" stroke={c} strokeWidth={4} />
                    <rect x={17} y={-93} width={8} height={12} rx={3} fill={c} strokeWidth={2} />
                    <path d="M21 -81 Q20 -72 10 -72" stroke={c} strokeWidth={2.5} />
                    <circle cx={9} cy={-72} r={2.5} fill="#1c1917" strokeWidth={1.5} />
                </g>
            );
        case 'headband':
            return (
                <g>
                    <path d="M-20 -95 Q0 -102 20 -95 L20 -89 Q0 -96 -20 -89 Z" fill={c} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
                    <path d="M-19 -93 l-12 -4 l2 8 z M-19 -92 l-10 6 l6 4 z" fill={c} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                </g>
            );
    }
}

function Arm({ look, angle }: { look: Look; angle: number }) {
    return (
        <g transform={`rotate(${angle})`}>
            <rect x={-5} y={-3} width={10} height={20} rx={5} fill={look.shirt} stroke={INK} strokeWidth={LINE} />
            <circle cx={0} cy={20} r={5.5} fill={look.skin} stroke={INK} strokeWidth={2.5} />
        </g>
    );
}

export function Child({ pose, art }: { pose: Pose; art: KidArt }) {
    const look: Look = LOOKS[art];
    const back = pose === 'happy' || pose === 'surprised' ? 140 : 12;
    return (
        <g transform={`translate(0 ${bounce(pose)})`}>
            {look.cape && <path d="M-14 -64 Q-32 -36 -26 -8 L4 -10 Q-4 -36 6 -64 Z" fill={look.cape} stroke={INK} strokeWidth={LINE} strokeLinejoin="round" />}
            {/* legs and shoes */}
            <rect x={-12} y={-36} width={11} height={32} rx={4} fill={look.pants} stroke={INK} strokeWidth={LINE} />
            <rect x={1} y={-36} width={11} height={32} rx={4} fill={look.pants} stroke={INK} strokeWidth={LINE} />
            <ellipse cx={-8} cy={-4} rx={9} ry={5} fill={look.shoes} stroke={INK} strokeWidth={2.5} />
            <ellipse cx={9} cy={-4} rx={9} ry={5} fill={look.shoes} stroke={INK} strokeWidth={2.5} />
            <g transform="translate(-16 -62)"><Arm look={look} angle={back} /></g>
            {/* body */}
            <rect x={-16} y={-68} width={32} height={36} rx={10} fill={look.shirt} stroke={INK} strokeWidth={LINE} />
            {look.overalls && (
                <g>
                    <path d="M-14 -50 h28 v14 q0 4 -4 4 h-20 q-4 0 -4 -4 z" fill={look.overalls} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
                    <path d="M-10 -50 L-11 -66 M10 -50 L11 -66" stroke={look.overalls} strokeWidth={4} strokeLinecap="round" />
                    <rect x={-5} y={-46} width={10} height={7} rx={2} fill={shade(look.overalls, -40)} />
                </g>
            )}
            {look.belt && <rect x={-16} y={-42} width={32} height={6} fill={look.belt} stroke={INK} strokeWidth={2} />}
            {look.cape && <path d="M-6 -60 h12 v8 q0 6 -6 9 q-6 -3 -6 -9 z" fill="#facc15" stroke={INK} strokeWidth={2} strokeLinejoin="round" />}
            {look.gear === 'headset' && <path d="M-4 -60 l4 -6 l4 6 l-2 6 h-4 z" fill="#facc15" stroke={INK} strokeWidth={1.5} />}
            {/* head */}
            <HairBack look={look} />
            <circle cx={-20} cy={-84} r={4.5} fill={look.skin} stroke={INK} strokeWidth={2} />
            <circle cx={20} cy={-84} r={4.5} fill={look.skin} stroke={INK} strokeWidth={2} />
            <circle cx={0} cy={-86} r={20} fill={look.skin} stroke={INK} strokeWidth={LINE} />
            <HairFront look={look} />
            <Eye cx={-7} cy={-85} r={4.5} pose={pose} lid={look.skin} />
            <Eye cx={8} cy={-85} r={4.5} pose={pose} lid={look.skin} />
            <circle cx={-12} cy={-77} r={3} fill="#f9a8d4" opacity={0.6} />
            <circle cx={13} cy={-77} r={3} fill="#f9a8d4" opacity={0.6} />
            <Mouth cx={1} cy={-74} pose={pose} s={0.7} />
            <Gear look={look} />
            <g transform="translate(16 -62)"><Arm look={look} angle={FRONT_ARM[pose]} /></g>
        </g>
    );
}
