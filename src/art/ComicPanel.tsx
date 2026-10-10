import { useLayoutEffect, useRef, useState } from 'react';
import type { CastMember, ComicPanel as Panel, World } from '../content/schema';
import { CharacterArt } from './characters';
import { CHARACTER_HEIGHT, GROUND_Y, INK, PANEL_H, PANEL_W } from './common';
import { PropArt } from './props';
import { SceneArt } from './scenes';

/** Characters are drawn a little smaller than 1:1 so bubbles fit above them. */
const BASE_SCALE = 0.9;

const feetY = (c: CastMember) => ((c.y ?? 100) / 100) * GROUND_Y;

export function ComicPanel({ panel, world }: { panel: Panel; world: World }) {
    const box = useRef<HTMLDivElement>(null);
    const bubbleEls = useRef<(HTMLDivElement | null)[]>([]);
    const [tails, setTails] = useState<string[]>([]);

    const speakerX = (who: string) => panel.cast.find(c => c.who === who)?.x ?? 50;
    // Bubbles keep reading order. If the speakers stand left-to-right in that order the bubbles
    // sit side by side; otherwise they stack, each one leaning toward its speaker.
    const inRow = panel.bubbles.every((b, i) => i === 0 || speakerX(panel.bubbles[i - 1].who) <= speakerX(b.who));

    useLayoutEffect(() => {
        const el = box.current;
        if (!el) return;
        const measure = () => {
            const outer = el.getBoundingClientRect();
            const sx = outer.width / PANEL_W;
            const sy = outer.height / PANEL_H;
            const next: string[] = [];
            panel.bubbles.forEach((b, i) => {
                const bubble = bubbleEls.current[i];
                const member = panel.cast.find(c => c.who === b.who);
                const character = world.characters[b.who];
                if (!bubble || !member || !character) return;
                const r = bubble.getBoundingClientRect();
                const headTop = feetY(member) - CHARACTER_HEIGHT[character.art] * BASE_SCALE * (member.scale ?? 1);
                const target = { x: (member.x / 100) * PANEL_W * sx, y: (headTop - 4) * sy };
                const baseY = r.bottom - outer.top - 2;
                const baseX = Math.min(Math.max(target.x, r.left - outer.left + 22), r.right - outer.left - 22);
                // A short tail pointing at the speaker, not all the way down to them.
                const dx = target.x - baseX;
                const dy = Math.max(target.y - baseY, 10);
                const len = Math.hypot(dx, dy);
                const reach = Math.min(len, 14 * sy + 10);
                const tip = { x: baseX + (dx / len) * reach, y: baseY + (dy / len) * reach };
                next.push(`${baseX - 9},${baseY} ${baseX + 9},${baseY} ${tip.x},${tip.y}`);
            });
            setTails(next);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [panel, world]);

    const fontSize = panel.wide ? 'clamp(12px, 2.4cqw, 20px)' : 'clamp(12px, 4.3cqw, 19px)';

    return (
        <div
            ref={box}
            className="relative w-full overflow-hidden rounded-lg border-[3px] border-stone-900 bg-sky-200"
            style={{ aspectRatio: `${PANEL_W} / ${PANEL_H}`, containerType: 'inline-size' }}
        >
            <svg viewBox={`0 0 ${PANEL_W} ${PANEL_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label={panel.alt}>
                <SceneArt scene={panel.scene} />
                {panel.props?.map((p, i) => (
                    <g key={i} transform={`translate(${(p.x / 100) * PANEL_W} ${(p.y / 100) * GROUND_Y}) scale(${p.scale ?? 1})`}>
                        <PropArt item={p.item} />
                    </g>
                ))}
                {panel.cast.map((c, i) => {
                    const character = world.characters[c.who];
                    if (!character) return null;
                    const s = BASE_SCALE * (c.scale ?? 1);
                    return (
                        <g key={i} transform={`translate(${(c.x / 100) * PANEL_W} ${feetY(c)}) scale(${c.flip ? -s : s} ${s})`}>
                            <CharacterArt character={character} pose={c.pose} />
                        </g>
                    );
                })}
            </svg>

            {/* Tails sit under the bubbles so the bubble border covers their base */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
                {tails.map((points, i) => (
                    <polygon key={i} points={points} fill="#fff" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
                ))}
            </svg>

            <div
                className={`absolute inset-x-[2.5%] top-[3%] flex gap-[1.5%] ${inRow ? 'flex-row items-start' : 'flex-col'}`}
                style={{ fontSize }}
            >
                {panel.bubbles.map((b, i) => {
                    const x = speakerX(b.who);
                    const align = inRow ? undefined : x < 40 ? 'flex-start' : x > 60 ? 'flex-end' : 'center';
                    return (
                        <div
                            key={i}
                            ref={el => { bubbleEls.current[i] = el; }}
                            className="min-w-0 rounded-[1.2em] border-[2.5px] border-stone-900 bg-white px-[0.8em] py-[0.4em] font-comic font-bold leading-snug text-stone-900"
                            style={{
                                flex: inRow ? '1 1 0' : undefined,
                                alignSelf: align,
                                maxWidth: inRow ? (panel.bubbles.length === 1 ? '72%' : undefined) : '78%',
                            }}
                        >
                            {b.text}
                        </div>
                    );
                })}
            </div>

            {panel.caption && (
                <div
                    className="absolute bottom-[3%] left-[2.5%] max-w-[70%] border-2 border-stone-900 bg-yellow-200 px-[0.6em] py-[0.2em] font-bold uppercase tracking-wide text-stone-900"
                    style={{ fontSize: panel.wide ? 'clamp(10px, 1.8cqw, 15px)' : 'clamp(10px, 3.2cqw, 14px)' }}
                >
                    {panel.caption}
                </div>
            )}
        </div>
    );
}
