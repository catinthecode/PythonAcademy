// Dev page (#/art): every character in every pose, every scene and prop. Handy when drawing.
import { CharacterArt } from '../art/characters';
import { ComicPanel } from '../art/ComicPanel';
import { PropArt } from '../art/props';
import { SceneArt } from '../art/scenes';
import type { Character, Pose, PropId, SceneId, World } from '../content/schema';
import { WORLDS } from '../content/worlds';

const POSES: Pose[] = ['idle', 'talk', 'wave', 'point', 'think', 'happy', 'surprised', 'sad'];
const SCENES: SceneId[] = ['meadow', 'night', 'cave', 'village', 'room', 'circuit', 'screen', 'arena', 'sky', 'castle', 'space'];
const PROPS: PropId[] = ['commandBlock', 'chest', 'diamond', 'tnt', 'repeater', 'sign', 'magnifier', 'pickaxe', 'torch', 'bug', 'cow', 'candy', 'coin', 'quote', 'scroll', 'swatter'];

export function ArtGallery() {
    const world: World = WORLDS[0];
    const cast: Character[] = [
        ...Object.values(world.characters),
        { name: 'Kid (tinted)', art: 'kid', tint: '#2563eb' },
        { name: 'Critter (yellow)', art: 'critter', tint: '#facc15' },
        { name: 'Critter (lime)', art: 'critter', tint: '#84cc16' },
    ];
    return (
        <div className="mx-auto max-w-6xl space-y-10 p-6">
            <h1 className="text-3xl">Art gallery</h1>
            {cast.map(c => (
                <section key={c.name}>
                    <h2 className="mb-2 text-xl">{c.name}</h2>
                    <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
                        {POSES.map(pose => (
                            <figure key={pose} className="rounded bg-sky-100 text-center text-xs text-stone-700">
                                <svg viewBox="-60 -150 120 160" className="w-full">
                                    <CharacterArt character={c} pose={pose} />
                                </svg>
                                <figcaption>{pose}</figcaption>
                            </figure>
                        ))}
                    </div>
                </section>
            ))}
            <section>
                <h2 className="mb-2 text-xl">Props</h2>
                <div className="grid grid-cols-8 gap-2">
                    {PROPS.map(p => (
                        <figure key={p} className="rounded bg-sky-100 text-center text-xs text-stone-700">
                            <svg viewBox="-45 -60 90 70" className="w-full"><PropArt item={p} /></svg>
                            <figcaption>{p}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="mb-2 text-xl">Scenes</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {SCENES.map(s => (
                        <figure key={s} className="text-center text-xs">
                            <svg viewBox="0 0 400 250" className="w-full rounded"><SceneArt scene={s} /></svg>
                            <figcaption>{s}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="mb-2 text-xl">Panels (World 1, Chapter 1)</h2>
                <div className="grid gap-3 md:grid-cols-2">
                    {world.chapters[0].lessons.flatMap(l => (l.kind === 'read' ? l.panels : [])).map((p, i) => (
                        <div key={i} className={p.wide ? 'md:col-span-2' : ''}>
                            <ComicPanel panel={p} world={world} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
