// Unlock rules. Every World is open (kids pick their starting point). Inside a World:
// chapter 1 is open; each next chapter opens when the previous chapter's Test is passed.
// Inside a chapter, reading and practice lessons are open in any order; the Test opens
// once every practice lesson is done.
import type { Chapter, Lesson, World } from '../content/schema';
import { lessonKey } from '../content/worlds';
import { lessonProgress, type Profile } from './store';

export function isLessonDone(p: Profile | null, world: World, chapter: Chapter, lesson: Lesson) {
    return lessonProgress(p, lessonKey(world, chapter, lesson)).done;
}

export function isChapterDone(p: Profile | null, world: World, chapter: Chapter) {
    const test = chapter.lessons.find(l => l.kind === 'test');
    return !!test && isLessonDone(p, world, chapter, test);
}

export function isChapterUnlocked(p: Profile | null, world: World, chapter: Chapter) {
    if (p?.unlockAll) return true;
    const i = world.chapters.indexOf(chapter);
    return i <= 0 || isChapterDone(p, world, world.chapters[i - 1]);
}

export function isLessonUnlocked(p: Profile | null, world: World, chapter: Chapter, lesson: Lesson) {
    if (!isChapterUnlocked(p, world, chapter)) return false;
    if (p?.unlockAll || lesson.kind !== 'test') return true;
    return chapter.lessons.filter(l => l.kind === 'practice').every(l => isLessonDone(p, world, chapter, l));
}

/** Done / total lessons, and stars earned / possible, for a set of chapters. */
export function tally(p: Profile | null, world: World, chapters: Chapter[] = world.chapters) {
    let done = 0;
    let total = 0;
    let stars = 0;
    let maxStars = 0;
    for (const c of chapters) {
        for (const l of c.lessons) {
            total++;
            const lp = lessonProgress(p, lessonKey(world, c, l));
            if (lp.done) done++;
            if (l.kind !== 'read') {
                maxStars += 3;
                stars += lp.stars;
            }
        }
    }
    return { done, total, stars, maxStars };
}

/** The chapter a kid should see on Home: their last one, else the first unfinished unlocked chapter. */
export function homeChapter(p: Profile | null, worlds: World[]): { world: World; chapter: Chapter } {
    if (p?.lastChapter) {
        const [wid, cid] = p.lastChapter.split('/');
        const world = worlds.find(w => w.id === wid);
        const chapter = world?.chapters.find(c => c.id === cid);
        if (world && chapter) return { world, chapter };
    }
    const world = worlds[0];
    const chapter = world.chapters.find(c => isChapterUnlocked(p, world, c) && !isChapterDone(p, world, c)) ?? world.chapters[0];
    return { world, chapter };
}
