// Checks every puzzle headlessly: reference solutions must pass, buggy starters
// must fail, and predict answers must match what Python actually does.
// Run with: npm run validate-content
import { readFileSync } from 'node:fs';
import { loadPyodide } from 'pyodide';
import { WORLDS } from '../src/content/worlds';
import { solutionCode, type Puzzle } from '../src/content/schema';
import { gradeCode, gradeTrace, normalizeAnswer, tryBreak, tryInstruction, type Runner } from '../src/engine/grade';
import { installAcademy, runCode, traceCode } from '../src/engine/python/core';

const py = await loadPyodide();
installAcademy(
    py,
    readFileSync('src/engine/python/turtle.py', 'utf8'),
    readFileSync('src/engine/python/harness.py', 'utf8'),
);
const run: Runner = async req => runCode(py, req);

let failures = 0;
let count = 0;

async function validate(p: Puzzle): Promise<string[]> {
    const problems: string[] = [];
    if (p.hints.length === 0) problems.push('has no hints');

    if (p.type === 'predict') {
        if (p.choices && !p.choices.includes(p.answer)) problems.push(`answer "${p.answer}" is not one of the choices`);
        const r = await run({ code: p.code, inputs: p.inputs });
        const about = p.about ?? 'output';
        if (about === 'output') {
            if (r.error) problems.push(`code errors: ${r.error.type} ${r.error.msg}`);
            else if (normalizeAnswer(r.output) !== normalizeAnswer(p.answer))
                problems.push(`answer is ${JSON.stringify(p.answer)} but Python prints ${JSON.stringify(r.output)}`);
        } else if (about === 'error') {
            const actual = r.error?.type ?? 'No error';
            if (actual !== p.answer) problems.push(`answer is ${p.answer} but Python gives ${actual}`);
        } else if (r.error && r.error.type !== 'TooLong') {
            // "What does it do?" may describe an infinite loop, so the step limit is fine there.
            problems.push(`code errors: ${r.error.type} ${r.error.msg}`);
        }
        return problems;
    }

    if (p.type === 'trace') {
        const t = traceCode(py, { code: p.code, line: p.line, names: p.columns });
        if (t.error) problems.push(`code errors: ${t.error.type} ${t.error.msg}`);
        else if (t.rows.length !== p.rows.length) problems.push(`line ${p.line} runs ${t.rows.length} times but the table has ${p.rows.length} rows: ${JSON.stringify(t.rows)}`);
        else if (!gradeTrace(t.rows, p.rows).passed) problems.push(`table should be ${JSON.stringify(t.rows)}`);
        return problems;
    }

    if (p.type === 'breakit') {
        if (!p.choices.includes(p.answer)) problems.push('answer is not one of the choices');
        for (const c of p.choices) {
            const { broke } = await tryBreak(run, p, c);
            if (c === p.answer && !broke) problems.push(`answer ${c} does not break the robot's code`);
            if (c !== p.answer && broke) problems.push(`choice ${c} also breaks it (only the answer should)`);
        }
        const fine = await tryBreak(run, p, p.choices.find(c => c !== p.answer) ?? p.answer);
        if (fine.correct.error) problems.push(`correct program errors: ${fine.correct.error.type}`);
        return problems;
    }

    if (p.type === 'instruct') {
        for (let i = 0; i < p.choices.length; i++) {
            const { matches, result } = await tryInstruction(run, p, i);
            if (i === p.answer && !matches) problems.push(`answer choice ${i} doesn't produce the goal${result.error ? ` (${result.error.type})` : ''}`);
            if (i !== p.answer && matches) problems.push(`choice ${i} also produces the goal`);
        }
        return problems;
    }

    const solution = solutionCode(p)!;
    const good = await gradeCode(run, p, solution);
    if (!good.passed) problems.push(`solution fails: ${good.message}`);

    if (p.type === 'fix') {
        const bad = await gradeCode(run, p, p.starter);
        if (bad.passed) problems.push('buggy starter code already passes');
    }
    if (p.type === 'write' && (await gradeCode(run, p, p.starter)).passed) problems.push('starter code already passes');
    if (p.type === 'fill' && (p.template.match(/___/g)?.length ?? 0) !== p.answers.length)
        problems.push('number of ___ gaps does not match answers');
    if (p.type === 'parsons' && p.distractors?.some(d => p.lines.includes(d))) problems.push('a distractor is also a solution line');
    return problems;
}

function report(where: string, problems: string[]) {
    if (problems.length) {
        failures++;
        console.log(`✗ ${where}\n    ${problems.join('\n    ')}`);
    }
}

for (const world of WORLDS) {
    for (const chapter of world.chapters) {
        const lessonIds = new Set<string>();
        const problemIds = new Set<string>();
        const structure: string[] = [];
        for (const lesson of chapter.lessons) {
            if (lessonIds.has(lesson.id)) structure.push(`duplicate lesson id ${lesson.id}`);
            lessonIds.add(lesson.id);
            if (lesson.kind === 'read') {
                for (const [i, panel] of lesson.panels.entries()) {
                    for (const who of [...panel.cast.map(c => c.who), ...panel.bubbles.map(b => b.who)]) {
                        if (!world.characters[who]) structure.push(`${lesson.id} panel ${i + 1}: unknown character "${who}"`);
                    }
                    for (const b of panel.bubbles) {
                        if (!panel.cast.some(c => c.who === b.who)) structure.push(`${lesson.id} panel ${i + 1}: "${b.who}" speaks but is not in the panel`);
                    }
                }
                continue;
            }
            if (lesson.problems.length === 0) structure.push(`${lesson.id} has no problems`);
            for (const p of lesson.problems) {
                count++;
                const problems = await validate(p);
                if (problemIds.has(p.id)) problems.push('duplicate problem id in chapter');
                problemIds.add(p.id);
                report(`W${world.number} ${chapter.id}/${lesson.id}/${p.id}`, problems);
            }
        }
        const tests = chapter.lessons.filter(l => l.kind === 'test');
        if (tests.length !== 1 || chapter.lessons.at(-1)?.kind !== 'test') structure.push('chapter must end with exactly one test lesson');
        report(`W${world.number} ${chapter.id} (structure)`, structure);
    }
}

console.log(`\n${count - failures}/${count} puzzles OK`);
process.exit(failures ? 1 : 0);
