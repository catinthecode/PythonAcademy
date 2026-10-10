// Opens every page and every lesson in a real browser and fails on blank pages or JS errors.
// Run with: npm run test:e2e
import { expect, test, type Page } from '@playwright/test';
import { WORLDS } from '../src/content/worlds';

const STORE_KEY = 'python-academy.v1';

/** A test player with every chapter unlocked, created before the app loads. */
async function withTestPlayer(page: Page) {
    await page.addInitScript(key => {
        if (localStorage.getItem(key)) return;
        localStorage.setItem(key, JSON.stringify({
            version: 1,
            current: 'tester',
            profiles: [{
                id: 'tester', name: 'Robo Tester', avatar: { art: 'robot' }, createdAt: new Date().toISOString(),
                xp: 0, lessons: {}, days: [], unlockAll: true,
            }],
        }));
    }, STORE_KEY);
}

/** Collects uncaught exceptions and console errors so each route can be checked. */
function watchErrors(page: Page) {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(`exception: ${e.message}`));
    page.on('console', m => {
        if (m.type() === 'error') errors.push(`console: ${m.text()}`);
    });
    return errors;
}

async function expectRendered(page: Page, route: string, errors: string[], title?: string) {
    await page.goto(`#/${route}`);
    // Every real page has a heading; a crashed React tree leaves #root empty.
    const heading = page.locator('h1').first();
    await expect(heading, `#/${route} should render a heading`).toBeVisible({ timeout: 10_000 });
    // Make sure it's THIS page's heading, not the previous page's still on screen.
    if (title) await expect(heading, `#/${route} should show "${title}"`).toContainText(title);
    await page.waitForTimeout(50); // let effects run so their errors are caught here
    expect(errors, `errors on #/${route}`).toEqual([]);
}

test('every page renders without errors', async ({ page }) => {
    await withTestPlayer(page);
    const errors = watchErrors(page);
    for (const route of ['', 'library', 'library/w2', 'profile', 'profile/progress', 'art', 'who']) {
        await expectRendered(page, route, errors);
    }
});

for (const world of WORLDS.filter(w => w.chapters.length > 0)) {
    test(`World ${world.number}: every chapter map and lesson renders`, async ({ page }) => {
        await withTestPlayer(page);
        const errors = watchErrors(page);
        for (const chapter of world.chapters) {
            await expectRendered(page, `w/${world.id}/${chapter.id}`, errors, chapter.title);
            for (const lesson of chapter.lessons) {
                await expectRendered(page, `w/${world.id}/${chapter.id}/lesson/${lesson.id}`, errors, lesson.title);
            }
        }
    });
}

test('a kid can solve problems end to end (real Python in the browser)', async ({ page }) => {
    await withTestPlayer(page);
    const errors = watchErrors(page);
    await page.goto('#/w/w1/ch1/lesson/practice1');

    // Problem 1: predict (multiple choice)
    await page.getByRole('button', { name: 'Hello, Max!', exact: true }).click();
    await expect(page.getByText('You got it!')).toBeVisible();
    await page.getByRole('button', { name: /Next problem/ }).click();

    // Problem 2: write code. The editor is already focused, so a kid can just type.
    await expect(page.getByRole('button', { name: /Cast Spell/ })).toBeEnabled({ timeout: 90_000 }); // Python loaded
    await page.keyboard.press('Control+End');
    await page.keyboard.type('print("I love diamonds")');
    await page.keyboard.press('Control+Enter');
    await expect(page.getByText(/Line 1 should be "I love diamonds!"/)).toBeVisible({ timeout: 30_000 });

    await page.locator('.cm-content').click();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('print("I love diamonds!")');
    await page.keyboard.press('Control+Enter');
    await expect(page.getByText('You got it!')).toBeVisible({ timeout: 30_000 });
    await expect(page.locator('header')).toContainText('20 XP'); // 10 XP per problem

    expect(errors).toEqual([]);
});
