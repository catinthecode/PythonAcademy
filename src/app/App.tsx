import { findChapter, findLesson, findWorld, WORLDS } from '../content/worlds';
import { ArtGallery } from '../pages/ArtGallery';
import { ChapterMap } from '../pages/ChapterMap';
import { ComicReader } from '../pages/ComicReader';
import { LessonPlayer } from '../pages/LessonPlayer';
import { Library } from '../pages/Library';
import { ProfilePage } from '../pages/ProfilePage';
import { WhoIsPlaying } from '../pages/WhoIsPlaying';
import { useProfile } from '../progress/store';
import { homeChapter } from '../progress/unlock';
import { useRoute } from './router';

/**
 * Routes:
 *   #/who                          pick or create a player
 *   #/                             home = the current chapter map
 *   #/w/w1/ch2                     chapter map
 *   #/w/w1/ch2/lesson/practice1    a reading or problem lesson
 *   #/library[/w1]                 comics library
 *   #/profile[/progress]           profile and progress tabs
 *   #/art                          dev gallery of all the art
 */
export function App() {
    const route = useRoute();
    const profile = useProfile();

    if (route[0] === 'art') return <ArtGallery />;
    if (route[0] === 'who' || !profile) return <WhoIsPlaying />;

    if (route[0] === 'w' && route[4] && route[3] === 'lesson') {
        const found = findLesson(route[1], route[2], route[4]);
        if (found) {
            const { world, chapter, lesson } = found;
            return lesson.kind === 'read'
                ? <ComicReader key={lesson.id} world={world} chapter={chapter} lesson={lesson} />
                : <LessonPlayer key={`${chapter.id}/${lesson.id}`} world={world} chapter={chapter} lesson={lesson} />;
        }
    }
    if (route[0] === 'w' && route[2]) {
        const found = findChapter(route[1], route[2]);
        if (found) return <ChapterMap world={found.world} chapter={found.chapter} />;
    }
    if (route[0] === 'library') {
        const world = findWorld(route[1] ?? '') ?? homeChapter(profile, WORLDS).world;
        return <Library world={world} />;
    }
    if (route[0] === 'profile') return <ProfilePage tab={route[1] === 'progress' ? 'progress' : 'profile'} />;

    const { world, chapter } = homeChapter(profile, WORLDS);
    return <ChapterMap world={world} chapter={chapter} />;
}
