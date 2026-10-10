import type { Chapter, Lesson, World } from './schema';
import { world1 } from './world1';
import { world2 } from './world2';
import { world3 } from './world3';
import { world4 } from './world4';
import { world5 } from './world5';

export const WORLDS: World[] = [world1, world2, world3, world4, world5];

export function findWorld(id: string) {
    return WORLDS.find(w => w.id === id);
}

export function findChapter(worldId: string, chapterId: string): { world: World; chapter: Chapter } | null {
    const world = findWorld(worldId);
    const chapter = world?.chapters.find(c => c.id === chapterId);
    return world && chapter ? { world, chapter } : null;
}

export function findLesson(worldId: string, chapterId: string, lessonId: string) {
    const found = findChapter(worldId, chapterId);
    const lesson = found?.chapter.lessons.find(l => l.id === lessonId);
    return found && lesson ? { ...found, lesson } : null;
}

/** Stable key for saving progress: "w1/ch2/practice1" */
export function lessonKey(world: World, chapter: Chapter, lesson: Lesson) {
    return `${world.id}/${chapter.id}/${lesson.id}`;
}
