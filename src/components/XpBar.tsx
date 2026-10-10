import { levelInfo } from '../progress/xp';

/** "Lvl 3 [=====    120 XP] Lvl 4", like Beast Academy's top bar. */
export function XpBar({ xp }: { xp: number }) {
    const { level, progress } = levelInfo(xp);
    return (
        <div className="flex items-center gap-2 text-sm font-bold md:text-base">
            <span className="hidden text-stone-600 sm:inline">Lvl {level}</span>
            <div className="relative h-8 w-28 overflow-hidden rounded-lg bg-indigo-950 sm:w-40 md:w-48">
                <div className="absolute inset-y-0 left-0 bg-sky-400 transition-all duration-700" style={{ width: `${Math.max(progress * 100, 4)}%` }} />
                <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow">{xp} XP</span>
            </div>
            <span className="text-sky-600">Lvl {level + 1}</span>
        </div>
    );
}
