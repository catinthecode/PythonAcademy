import type { Profile } from './store';
import { WORLDS } from '../content/worlds';
import { levelInfo } from './xp';
import { streak } from './store';

export interface Badge {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'spells' | 'stars' | 'streaks' | 'special';
    unlocked: boolean;
    progress: number;
    max: number;
}

export function getBadges(profile: Profile | null): Badge[] {
    if (!profile) return [];

    let totalSolved = 0;
    let bossesSolved = 0;
    let turtleSolved = 0;
    let fixSolved = 0;
    let predictSolved = 0;
    let comicsRead = 0;
    let totalStars = 0;
    let perfectLessons = 0;

    for (const w of WORLDS) {
        for (const c of w.chapters) {
            for (const l of c.lessons) {
                const lp = profile.lessons[`${w.id}/${c.id}/${l.id}`];
                if (!lp) continue;

                if (l.kind === 'read') {
                    if (lp.done) comicsRead++;
                } else {
                    totalStars += lp.stars;
                    if (lp.done && lp.stars === 3) perfectLessons++;

                    for (const pid of lp.solved) {
                        totalSolved++;
                        const prob = l.problems.find(p => p.id === pid);
                        if (prob) {
                            if (prob.boss) bossesSolved++;
                            if ('turtle' in prob && prob.turtle) turtleSolved++;
                            if (prob.type === 'fix') fixSolved++;
                            if (prob.type === 'predict') predictSolved++;
                        }
                    }
                }
            }
        }
    }

    const currentStreak = streak(profile);
    const level = levelInfo(profile.xp).level;

    return [
        {
            id: 'first-spell',
            title: 'First Spell',
            description: 'Solve your very first Python problem',
            icon: '🪄',
            category: 'spells',
            unlocked: totalSolved >= 1,
            progress: Math.min(totalSolved, 1),
            max: 1,
        },
        {
            id: 'boss-buster',
            title: 'Boss Buster',
            description: 'Defeat a chapter boss problem',
            icon: '👾',
            category: 'spells',
            unlocked: bossesSolved >= 1,
            progress: Math.min(bossesSolved, 1),
            max: 1,
        },
        {
            id: 'bug-catcher',
            title: 'Bug Catcher',
            description: 'Fix 5 broken programs',
            icon: '🐛',
            category: 'spells',
            unlocked: fixSolved >= 5,
            progress: Math.min(fixSolved, 5),
            max: 5,
        },
        {
            id: 'code-detective',
            title: 'Code Detective',
            description: 'Predict what Python does 5 times',
            icon: '🔍',
            category: 'spells',
            unlocked: predictSolved >= 5,
            progress: Math.min(predictSolved, 5),
            max: 5,
        },
        {
            id: 'turtle-artist',
            title: 'Turtle Artist',
            description: 'Complete 3 turtle drawing challenges',
            icon: '🐢',
            category: 'spells',
            unlocked: turtleSolved >= 3,
            progress: Math.min(turtleSolved, 3),
            max: 3,
        },
        {
            id: 'star-collector',
            title: 'Star Collector',
            description: 'Collect 20 stars across all worlds',
            icon: '⭐',
            category: 'stars',
            unlocked: totalStars >= 20,
            progress: Math.min(totalStars, 20),
            max: 20,
        },
        {
            id: 'star-hoarder',
            title: 'Star Hoarder',
            description: 'Collect 50 stars across all worlds',
            icon: '🌟',
            category: 'stars',
            unlocked: totalStars >= 50,
            progress: Math.min(totalStars, 50),
            max: 50,
        },
        {
            id: 'flawless',
            title: 'Flawless Wizard',
            description: 'Complete a lesson with 3 stars (0 hints used)',
            icon: '🎯',
            category: 'special',
            unlocked: perfectLessons >= 1,
            progress: Math.min(perfectLessons, 1),
            max: 1,
        },
        {
            id: 'bookworm',
            title: 'Comic Fan',
            description: 'Read 5 comic stories in the library',
            icon: '📚',
            category: 'special',
            unlocked: comicsRead >= 5,
            progress: Math.min(comicsRead, 5),
            max: 5,
        },
        {
            id: 'level-up',
            title: 'Power Level',
            description: 'Reach Level 4 or higher',
            icon: '⚡',
            category: 'special',
            unlocked: level >= 4,
            progress: Math.min(level, 4),
            max: 4,
        },
        {
            id: 'streak-3',
            title: 'Spark of Fire',
            description: 'Play 3 days in a row',
            icon: '🔥',
            category: 'streaks',
            unlocked: currentStreak >= 3,
            progress: Math.min(currentStreak, 3),
            max: 3,
        },
        {
            id: 'streak-7',
            title: 'Super Streak',
            description: 'Play 7 days in a row',
            icon: '🌋',
            category: 'streaks',
            unlocked: currentStreak >= 7,
            progress: Math.min(currentStreak, 7),
            max: 7,
        },
    ];
}

