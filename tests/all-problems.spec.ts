// Plays EVERY problem in the course through the real UI, the way a kid would:
// types code, fills gaps, taps line tiles, picks choices, fills trace tables,
// and checks that each one is accepted. Slow (several minutes).
// Run with: npm run test:all
import { expect, test, type Page } from '@playwright/test';
import type { Puzzle } from '../src/content/schema';
import { WORLDS } from '../src/content/worlds';

const STORE_KEY = 'python-academy.v1';

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

/** Replace the editor's contents with `code`, exactly (no auto-indent). */
async function typeCode(page: Page, code: string) {
    const editor = page.locator('.cm-content').first();
    await editor.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    await page.keyboard.insertText(code);
}

async function castSpell(page: Page) {
    await page.getByRole('button', { name: /Cast Spell/ }).click();
}

/** Enter the correct answer for one problem through the UI. */
async function solve(page: Page, p: Puzzle) {
    switch (p.type) {
        case 'predict':
            if (p.choices) await page.locator(`[data-choice="${p.choices.indexOf(p.answer)}"]`).click();
            else {
                await page.getByPlaceholder('Type what Python prints').fill(p.answer);
                await page.getByRole('button', { name: 'Check', exact: true }).click();
            }
            return;
        case 'fix':
        case 'write':
            await typeCode(page, p.solution);
            await castSpell(page);
            return;
        case 'fill':
            for (let i = 0; i < p.answers.length; i++) await page.getByLabel(`Gap ${i + 1}`).fill(p.answers[i]);
            await castSpell(page);
            return;
        case 'parsons':
            for (let k = 0; k < p.lines.length; k++) {
                const line = p.lines[k];
                // Spare tiles are the buttons in the "Spare lines" box
                await page.locator('div:has(> div:text("Spare lines (tap to add)")) button', { hasText: line.trim() }).first().click();
                const indent = (line.length - line.trimStart().length) / 4;
                for (let n = 0; n < indent; n++) {
                    await page.locator('ol > li').nth(k).getByRole('button', { name: 'Indent more' }).click();
                }
            }
            await castSpell(page);
            return;
        case 'trace':
            for (let r = 0; r < p.rows.length; r++) {
                for (let c = 0; c < p.columns.length; c++) {
                    await page.getByLabel(`${p.columns[c]} at time ${r + 1}`).fill(p.rows[r][c]);
                }
            }
            await page.getByRole('button', { name: /Check my table/ }).click();
            return;
        case 'breakit':
            await page.locator(`[data-choice="${p.choices.indexOf(p.answer)}"]`).click();
            return;
        case 'instruct':
            await page.locator(`[data-choice="${p.answer}"]`).click();
            return;
    }
}

for (const world of WORLDS) {
    test(`World ${world.number}: every problem can be solved in the UI`, async ({ page }) => {
        test.setTimeout(30 * 60_000);
        await withTestPlayer(page);
        const errors: string[] = [];
        page.on('pageerror', e => errors.push(e.message));
        let solved = 0;

        for (const chapter of world.chapters) {
            for (const lesson of chapter.lessons) {
                if (lesson.kind === 'read') continue;
                await page.goto(`#/w/${world.id}/${chapter.id}/lesson/${lesson.id}`);
                for (const [i, p] of lesson.problems.entries()) {
                    const where = `W${world.number} ${chapter.id}/${lesson.id}/${p.id} "${p.title}"`;
                    await expect(page.locator('h2').first(), `${where}: wrong problem on screen`).toContainText(p.title);
                    // Wait until Python is ready (buttons enabled) before answering code problems
                    if (['fix', 'write', 'fill', 'parsons'].includes(p.type)) {
                        await expect(page.getByRole('button', { name: /Cast Spell/ })).toBeEnabled({ timeout: 90_000 });
                    }
                    await solve(page, p);
                    const banner = page.getByTestId('solved-banner');
                    const problem = page.locator('[role=status]');
                    await expect(banner, `${where}: not accepted`)
                        .toBeVisible({ timeout: 45_000 })
                        .catch(async err => {
                            const msg = (await problem.allTextContents()).join(' | ');
                            throw new Error(`${where} was NOT accepted. Feedback shown: ${msg || '(none)'}\n${err}`);
                        });
                    solved++;
                    const last = i === lesson.problems.length - 1;
                    await page.getByRole('button', { name: last ? /See results/ : /Next problem/ }).click();
                }
                await expect(page.getByText(/Lesson complete!|Test passed!/)).toBeVisible();
            }
        }
        expect(errors, 'uncaught page errors').toEqual([]);
        console.log(`World ${world.number}: ${solved} problems solved through the UI`);
    });
}
