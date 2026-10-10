import type { ComicPanel, World } from '../content/schema';
import { CharacterArt } from './characters';
import { GROUND_Y, PANEL_H, PANEL_W } from './common';
import { PropArt } from './props';
import { SceneArt } from './scenes';

/** A panel's picture without bubbles, for Library cards. */
export function ComicThumb({ panel, world }: { panel: ComicPanel; world: World }) {
    return (
        <svg viewBox={`0 0 ${PANEL_W} ${PANEL_H}`} className="w-full" role="img" aria-label={panel.alt}>
            <SceneArt scene={panel.scene} />
            {panel.props?.map((p, i) => (
                <g key={i} transform={`translate(${(p.x / 100) * PANEL_W} ${(p.y / 100) * GROUND_Y}) scale(${p.scale ?? 1})`}><PropArt item={p.item} /></g>
            ))}
            {panel.cast.map((c, i) => {
                const character = world.characters[c.who];
                const s = 0.9 * (c.scale ?? 1);
                return character ? (
                    <g key={i} transform={`translate(${(c.x / 100) * PANEL_W} ${((c.y ?? 100) / 100) * GROUND_Y}) scale(${c.flip ? -s : s} ${s})`}>
                        <CharacterArt character={character} pose={c.pose} />
                    </g>
                ) : null;
            })}
        </svg>
    );
}
