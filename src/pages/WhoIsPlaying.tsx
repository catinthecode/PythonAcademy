import { useState } from 'react';
import { navigate } from '../app/router';
import { Avatar, AVATAR_CHOICES } from '../components/Avatar';
import { createProfile, switchProfile, useProgress, type Avatar as AvatarData } from '../progress/store';
import { levelInfo } from '../progress/xp';

export function WhoIsPlaying() {
    const { profiles } = useProgress();
    const [adding, setAdding] = useState(profiles.length === 0);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState<AvatarData>(AVATAR_CHOICES[0]);

    const start = () => {
        if (!name.trim()) return;
        createProfile(name, avatar);
        navigate();
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-green-900 to-stone-900 p-4">
            <div className="mb-6 text-center">
                <div className="text-6xl">🐍</div>
                <h1 className="text-4xl text-yellow-300 drop-shadow md:text-5xl">Python Academy</h1>
            </div>

            {!adding ? (
                <div className="w-full max-w-3xl rounded-3xl border-4 border-amber-100 bg-white p-6 text-center text-stone-900 shadow-2xl">
                    <h2 className="mb-6 text-3xl text-blue-800">Who's playing?</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {profiles.map(p => (
                            <button
                                key={p.id}
                                onClick={() => { switchProfile(p.id); navigate(); }}
                                className="flex w-32 flex-col items-center gap-2 rounded-2xl p-3 hover:bg-amber-100"
                            >
                                <Avatar avatar={p.avatar} size={96} />
                                <span className="text-lg font-bold">{p.name}</span>
                                <span className="text-sm text-stone-500">Lvl {levelInfo(p.xp).level}</span>
                            </button>
                        ))}
                        <button onClick={() => setAdding(true)} className="flex w-32 flex-col items-center gap-2 rounded-2xl p-3 hover:bg-amber-100">
                            <span className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-dashed border-stone-300 text-5xl text-stone-400">+</span>
                            <span className="text-lg font-bold">New player</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-xl rounded-3xl border-4 border-amber-100 bg-white p-6 text-stone-900 shadow-2xl">
                    <h2 className="mb-4 text-center text-3xl text-blue-800">New player</h2>
                    <label className="mb-1 block font-bold" htmlFor="player-name">What's your name?</label>
                    <input
                        id="player-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && start()}
                        maxLength={20}
                        autoFocus
                        className="mb-5 w-full rounded-xl border-2 border-stone-300 px-4 py-3 text-xl focus:border-blue-500 focus:outline-none"
                        placeholder="Your name or nickname"
                    />
                    <div className="mb-2 font-bold">Pick your avatar</div>
                    <div className="mb-6 grid grid-cols-5 gap-2 sm:grid-cols-9">
                        {AVATAR_CHOICES.map((a, i) => {
                            const picked = a.art === avatar.art && a.tint === avatar.tint;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setAvatar(a)}
                                    className={`rounded-full p-1 ${picked ? 'bg-blue-500' : 'hover:bg-amber-100'}`}
                                    aria-pressed={picked}
                                >
                                    <Avatar avatar={a} size={52} />
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex gap-3">
                        {profiles.length > 0 && (
                            <button onClick={() => setAdding(false)} className="rounded-xl bg-stone-200 px-5 py-3 font-bold hover:bg-stone-300">Back</button>
                        )}
                        <button
                            onClick={start}
                            disabled={!name.trim()}
                            className="flex-1 rounded-xl bg-blue-700 px-5 py-3 text-xl font-bold text-white hover:bg-blue-600 disabled:opacity-40"
                        >
                            Let's go! 🚀
                        </button>
                    </div>
                    <p className="mt-4 text-center text-sm text-stone-500">Progress is saved in this browser on this device.</p>
                </div>
            )}
        </div>
    );
}
