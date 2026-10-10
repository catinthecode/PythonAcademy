import { useState, type ReactNode } from 'react';
import { Avatar } from '../components/Avatar';
import { Confetti } from '../components/Confetti';
import { SoundToggle } from '../components/SoundToggle';
import { XpBar } from '../components/XpBar';
import type { World } from '../content/schema';
import { streak, useProfile } from '../progress/store';
import { ChaptersOverlay } from './ChaptersOverlay';
import { href, useRoute } from './router';

const NAV = [
    { id: 'home', label: 'Home', icon: '🏠', to: href() },
    { id: 'library', label: 'Library', icon: '📚', to: href('library') },
    { id: 'lab', label: 'Magic Lab', icon: '🧪', to: href('lab') },
    { id: 'profile', label: 'Profile', icon: '⭐', to: href('profile') },
];

interface Props {
    world: World;
    /** Small line above the title, e.g. "World 1 · Chapter 2" */
    eyebrow?: string;
    title: string;
    children: ReactNode;
}

export function Shell({ world, eyebrow, title, children }: Props) {
    const profile = useProfile();
    const route = useRoute();
    const [menu, setMenu] = useState(false);
    const active = route[0] === 'library' ? 'library' : route[0] === 'lab' ? 'lab' : route[0] === 'profile' ? 'profile' : 'home';
    const streakDays = profile ? streak(profile) : 0;

    return (
        <div className={`min-h-screen bg-gradient-to-br ${world.theme.bg}`}>
            <Confetti />
            {/* Sidebar on wide screens, bottom bar on phones */}
            <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t-2 border-stone-300 bg-amber-50 py-1 md:inset-y-0 md:left-0 md:right-auto md:w-24 md:flex-col md:justify-start md:gap-2 md:border-r-2 md:border-t-0 md:px-2 md:py-4">
                <a href={href()} className="mb-4 hidden text-center leading-tight md:block">
                    <div className="text-4xl">🐍</div>
                    <div className="font-display text-sm text-red-600">Python Academy</div>
                </a>
                {NAV.map(item => (
                    <a
                        key={item.id}
                        href={item.to}
                        className={`flex flex-col items-center rounded-2xl px-3 py-1 text-sm font-bold text-blue-800 md:py-3 ${active === item.id ? 'bg-yellow-300' : 'hover:bg-amber-100'}`}
                    >
                        <span className="text-2xl md:text-3xl">{item.icon}</span>
                        {item.label}
                    </a>
                ))}
            </nav>

            <div className="pb-20 md:ml-24 md:pb-6">
                <header className="sticky top-0 z-20 px-3 pt-3 md:px-6">
                    <div className="flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/90 px-3 py-2 text-stone-900 shadow-lg backdrop-blur">
                        <button
                            onClick={() => setMenu(true)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-700 text-2xl text-white hover:bg-blue-600"
                            aria-label="All chapters"
                        >
                            ☰
                        </button>
                        <div className="min-w-0 flex-1">
                            {eyebrow && <div className="truncate text-xs font-bold uppercase tracking-wide text-blue-700 md:text-sm">{eyebrow}</div>}
                            <h1 className="truncate text-xl md:text-2xl">{title}</h1>
                        </div>
                        {profile && (
                            <>
                                <div className="hidden sm:block"><XpBar xp={profile.xp} /></div>
                                {streakDays > 0 && (
                                    <div
                                        className="flex items-center gap-1 rounded-xl border border-orange-300 bg-orange-100 px-2.5 py-1 text-sm font-bold text-orange-700 shadow-sm"
                                        title={`${streakDays} day streak! Keep it burning tomorrow!`}
                                    >
                                        <span className="text-base">🔥</span>
                                        <span>{streakDays}</span>
                                    </div>
                                )}
                                <SoundToggle />
                                <a href={href('profile')} title={`${profile.name}'s profile`}>
                                    <Avatar avatar={profile.avatar} size={44} />
                                </a>
                            </>
                        )}
                    </div>
                </header>
                <main className="px-3 pt-4 md:px-6">{children}</main>
            </div>

            {menu && <ChaptersOverlay onClose={() => setMenu(false)} />}
        </div>
    );
}
