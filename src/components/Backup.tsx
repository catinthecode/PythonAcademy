// Save a player's progress to a file, load it back (here or on another device), and show
// whether the browser has agreed to keep this site's data.
import { useEffect, useRef, useState } from 'react';
import { importProfile, useProgress, type Profile } from '../progress/store';
import { downloadProfile, isStorageKept, readProfileFile } from '../progress/transfer';
import { levelInfo } from '../progress/xp';

export function SaveProgressButton({ profile }: { profile: Profile }) {
    const [saved, setSaved] = useState(false);
    return (
        <button
            onClick={() => { downloadProfile(profile); setSaved(true); }}
            className="rounded-lg bg-blue-700 px-3 py-2 font-bold text-white hover:bg-blue-600"
        >
            💾 {saved ? 'Saved! Save again' : `Save ${profile.name}'s progress to a file`}
        </button>
    );
}

/** Pick a progress file and load it. Asks first if that player is already on this device. */
export function LoadProgressButton({ onLoaded, className = '' }: { onLoaded?: (p: Profile) => void; className?: string }) {
    const { profiles } = useProgress();
    const input = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [pending, setPending] = useState<{ incoming: Profile; existing: Profile } | null>(null);

    const finish = (p: Profile) => {
        importProfile(p);
        setPending(null);
        onLoaded?.(p);
    };

    const pick = async (file: File | undefined) => {
        setError('');
        if (!file) return;
        const result = readProfileFile(await file.text());
        if (!result.ok) return setError(result.error);
        const existing = profiles.find(p => p.id === result.profile.id);
        if (existing) setPending({ incoming: result.profile, existing });
        else finish(result.profile);
    };

    return (
        <div className={className}>
            <input
                ref={input}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={e => { void pick(e.target.files?.[0]); e.target.value = ''; }}
            />
            <button onClick={() => input.current?.click()} className="rounded-lg border-2 border-blue-700 px-3 py-2 font-bold text-blue-800 hover:bg-blue-50">
                📂 Load progress from a file
            </button>
            {error && <p className="mt-2 font-bold text-red-700">{error}</p>}
            {pending && <ReplacePrompt {...pending} onReplace={() => finish(pending.incoming)} onCancel={() => setPending(null)} />}
        </div>
    );
}

const solvedCount = (p: Profile) => Object.values(p.lessons).reduce((n, l) => n + l.solved.length + (l.done ? 1 : 0), 0);

/** Replacing a player loses whatever they did here since the file was saved, so say so and offer a backup first. */
function ReplacePrompt({ incoming, existing, onReplace, onCancel }: { incoming: Profile; existing: Profile; onReplace: () => void; onCancel: () => void }) {
    const [backedUp, setBackedUp] = useState(false);
    const describe = (p: Profile) => `Lvl ${levelInfo(p.xp).level}, ${p.xp} XP`;
    const fileIsBehind = incoming.xp < existing.xp || solvedCount(incoming) < solvedCount(existing);
    return (
        <div className="mt-3 max-w-xl rounded-xl border-2 border-amber-300 bg-amber-50 p-3 text-left">
            <p className="font-bold">{existing.name} is already on this device. Replace this device's copy with the file's copy?</p>
            <ul className="my-2 text-sm">
                <li>📱 This device: {describe(existing)}</li>
                <li>📄 The file: {describe(incoming)}</li>
            </ul>
            {fileIsBehind && <p className="mb-2 font-bold text-red-700">⚠️ The file has less progress than this device.</p>}
            <p className="mb-2 text-sm">Anything {existing.name} did on this device since the file was saved will be lost.</p>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => { downloadProfile(existing); setBackedUp(true); }}
                    className="rounded-lg bg-blue-700 px-3 py-1 font-bold text-white hover:bg-blue-600"
                >
                    💾 {backedUp ? 'Saved! Save again' : "Save this device's copy first"}
                </button>
                <button onClick={onReplace} className="rounded-lg bg-amber-500 px-3 py-1 font-bold text-white hover:bg-amber-600">Replace</button>
                <button onClick={onCancel} className="rounded-lg bg-stone-200 px-3 py-1 font-bold hover:bg-stone-300">Cancel</button>
            </div>
        </div>
    );
}

/** One line saying whether the browser promised to keep this site's data. */
export function StorageStatus() {
    const [kept, setKept] = useState<boolean | null>(null);
    useEffect(() => { void isStorageKept().then(setKept); }, []);
    if (kept === null) return null;
    return (
        <p className="text-sm text-stone-600">
            {kept
                ? '✅ This browser has agreed to keep Python Academy\'s saved progress.'
                : '⚠️ This browser may clear saved progress if space runs low or the site isn\'t used for a while (Safari: after 7 days). Save a backup file now and then.'}
        </p>
    );
}
