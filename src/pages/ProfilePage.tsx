import { useState } from 'react';
import { href, navigate } from '../app/router';
import { Shell } from '../app/Shell';
import { Avatar, AVATAR_CHOICES } from '../components/Avatar';
import { StarRow } from '../components/StarRow';
import { XpBar } from '../components/XpBar';
import type { World } from '../content/schema';
import { lessonKey, WORLDS } from '../content/worlds';
import { deleteProfile, lessonProgress, streak, switchProfile, updateProfile, useProfile, type Profile } from '../progress/store';
import { homeChapter, tally } from '../progress/unlock';
import { levelInfo } from '../progress/xp';

function Stat({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex justify-between border-b border-stone-200 py-2 text-lg last:border-0">
            <span className="text-blue-800">{label}</span>
            <span className="font-bold">{value}</span>
        </div>
    );
}

function ProfileTab({ profile }: { profile: Profile }) {
    const [editingAvatar, setEditingAvatar] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    let stars = 0, lessons = 0, comics = 0;
    for (const w of WORLDS) {
        for (const c of w.chapters) {
            for (const l of c.lessons) {
                const lp = lessonProgress(profile, lessonKey(w, c, l));
                stars += lp.stars;
                if (lp.done) l.kind === 'read' ? comics++ : lessons++;
            }
        }
    }
    const days = streak(profile);

    return (
        <div className="grid gap-5 md:grid-cols-[300px_1fr]">
            <div className="space-y-3 text-center">
                <div className="relative mx-auto w-fit">
                    <Avatar avatar={profile.avatar} size={200} />
                    <button onClick={() => setEditingAvatar(e => !e)} className="absolute bottom-2 right-2 h-11 w-11 rounded-lg bg-blue-700 text-xl text-white hover:bg-blue-600" aria-label="Change avatar">✏️</button>
                </div>
                {editingAvatar && (
                    <div className="grid grid-cols-5 gap-1 rounded-xl bg-white p-2">
                        {AVATAR_CHOICES.map((a, i) => (
                            <button key={i} onClick={() => { updateProfile({ avatar: a }); setEditingAvatar(false); }} className="rounded-full p-0.5 hover:bg-amber-100">
                                <Avatar avatar={a} size={44} />
                            </button>
                        ))}
                    </div>
                )}
                <div className="rounded-xl bg-blue-800 px-4 py-3 font-display text-3xl text-white">{profile.name}</div>
                <button onClick={() => { switchProfile(null); navigate('who'); }} className="w-full rounded-xl bg-white px-4 py-2 font-bold text-blue-800 hover:bg-amber-100">
                    🔁 Switch player
                </button>
            </div>

            <div className="space-y-5">
                <div className="rounded-2xl bg-white p-4 text-stone-900 shadow">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-2xl text-blue-800">Lvl {levelInfo(profile.xp).level}</h2>
                        <XpBar xp={profile.xp} />
                    </div>
                    <Stat label="⭐ Total stars" value={stars} />
                    <Stat label="✏️ Lessons finished" value={lessons} />
                    <Stat label="📖 Comics read" value={comics} />
                    <Stat label="🔥 Day streak" value={`${days} day${days === 1 ? '' : 's'}`} />
                    <Stat label="📅 Days played" value={profile.days.length} />
                </div>

                <details className="rounded-2xl bg-white/90 p-4 text-stone-900">
                    <summary className="cursor-pointer font-bold">🔧 For grown-ups</summary>
                    <label className="mt-3 flex items-center gap-3">
                        <input type="checkbox" className="h-5 w-5" checked={!!profile.unlockAll} onChange={e => updateProfile({ unlockAll: e.target.checked })} />
                        Unlock every chapter and Test (skip ahead or review)
                    </label>
                    <div className="mt-4">
                        {!confirmDelete ? (
                            <button onClick={() => setConfirmDelete(true)} className="rounded-lg border-2 border-red-300 px-3 py-1 font-bold text-red-700 hover:bg-red-50">Delete this player…</button>
                        ) : (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold text-red-700">Delete {profile.name} and all their progress? This can't be undone.</span>
                                <button onClick={() => { deleteProfile(profile.id); navigate('who'); }} className="rounded-lg bg-red-600 px-3 py-1 font-bold text-white">Yes, delete</button>
                                <button onClick={() => setConfirmDelete(false)} className="rounded-lg bg-stone-200 px-3 py-1 font-bold">Cancel</button>
                            </div>
                        )}
                    </div>
                </details>
            </div>
        </div>
    );
}

function WorldRow({ world, profile, open, onToggle }: { world: World; profile: Profile; open: boolean; onToggle: () => void }) {
    const t = tally(profile, world);
    // How many problem lessons earned 3, 2, 1 or 0 stars
    const dist = [0, 0, 0, 0];
    for (const c of world.chapters) for (const l of c.lessons) if (l.kind !== 'read') dist[3 - lessonProgress(profile, lessonKey(world, c, l)).stars]++;
    const problemLessons = dist.reduce((a, b) => a + b, 0) || 1;

    return (
        <div className="rounded-2xl bg-white text-stone-900 shadow">
            <button onClick={onToggle} className="flex w-full flex-wrap items-center gap-4 p-4 text-left">
                <span className={`text-2xl transition ${open ? 'rotate-90' : ''}`}>▶</span>
                <span className="w-44 font-display text-2xl" style={{ color: world.theme.color }}>{world.emoji} World {world.number}</span>
                <span className="text-xl font-bold text-yellow-500">{t.stars} ★</span>
                <div className="flex h-7 min-w-40 flex-1 overflow-hidden rounded" title="Lessons with 3, 2, 1 and 0 stars">
                    {dist.map((n, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center text-xs font-bold text-white"
                            style={{ width: `${(n / problemLessons) * 100}%`, background: world.theme.color, opacity: 1 - i * 0.22 }}
                        >
                            {n > 0 && '★'.repeat(3 - i)}
                        </div>
                    ))}
                </div>
                <span className="text-xl">{t.done} / {t.total} lessons</span>
            </button>
            {open && (
                <div className="border-t-2 border-stone-100 p-4">
                    {world.chapters.length === 0 ? (
                        <p className="italic text-stone-500">Coming soon!</p>
                    ) : (
                        <div className="flex items-end gap-3 overflow-x-auto">
                            {world.chapters.map((c, i) => {
                                const ct = tally(profile, world, [c]);
                                return (
                                    <a key={c.id} href={href('w', world.id, c.id)} className="flex w-20 shrink-0 flex-col items-center gap-1" title={c.title}>
                                        <div className="relative h-36 w-14 overflow-hidden rounded bg-stone-200">
                                            <div className="absolute inset-x-0 bottom-0" style={{ height: `${(ct.done / ct.total) * 100}%`, background: world.theme.color }} />
                                        </div>
                                        <span className="font-bold">{i + 1}</span>
                                        <StarRow stars={Math.round((ct.stars / Math.max(ct.maxStars, 1)) * 3)} size="text-xs" />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ProgressTab({ profile }: { profile: Profile }) {
    const [openWorld, setOpenWorld] = useState(homeChapter(profile, WORLDS).world.id);
    return (
        <div className="space-y-3">
            {WORLDS.map(w => (
                <WorldRow key={w.id} world={w} profile={profile} open={openWorld === w.id} onToggle={() => setOpenWorld(o => (o === w.id ? '' : w.id))} />
            ))}
        </div>
    );
}

export function ProfilePage({ tab }: { tab: 'profile' | 'progress' }) {
    const profile = useProfile()!;
    const { world } = homeChapter(profile, WORLDS);
    const tabs = [
        { id: 'profile', label: '😀 Profile', to: href('profile') },
        { id: 'progress', label: '⭐ Progress', to: href('profile', 'progress') },
    ];
    return (
        <Shell world={world} eyebrow="Profile" title={`${profile.name}'s page`}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-4 flex gap-2">
                    {tabs.map(t => (
                        <a key={t.id} href={t.to} className={`flex-1 rounded-xl px-4 py-3 text-center text-lg font-bold ${tab === t.id ? 'bg-sky-400 text-white' : 'bg-blue-800 text-white/80 hover:bg-blue-700'}`}>
                            {t.label}
                        </a>
                    ))}
                </div>
                {tab === 'profile' ? <ProfileTab profile={profile} /> : <ProgressTab profile={profile} />}
            </div>
        </Shell>
    );
}
