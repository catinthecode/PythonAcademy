/// <reference lib="webworker" />
// Python lives in this worker so a long-running spell never freezes the page.
// If a spell runs too long, the client simply terminates this worker.
import type { PyodideAPI } from 'pyodide';
import { installAcademy, runCode, traceCode } from './core';
import harnessSrc from './harness.py?raw';
import turtleSrc from './turtle.py?raw';

declare const self: DedicatedWorkerGlobalScope;

const indexURL = new URL(`${import.meta.env.BASE_URL}pyodide/`, self.location.origin).href;

const ready: Promise<PyodideAPI> = (async () => {
    // Loaded at runtime from our own site (see scripts/copy-pyodide.mjs), not bundled.
    const { loadPyodide } = await import(/* @vite-ignore */ `${indexURL}pyodide.mjs`);
    const py: PyodideAPI = await loadPyodide({ indexURL });
    installAcademy(py, turtleSrc, harnessSrc);
    return py;
})();

ready.then(
    () => self.postMessage({ type: 'ready' }),
    err => self.postMessage({ type: 'failed', msg: String(err) }),
);

self.onmessage = async (e: MessageEvent) => {
    const { id, req, op } = e.data;
    const py = await ready;
    try {
        const result = op === 'trace' ? traceCode(py, req) : runCode(py, req);
        self.postMessage({ type: 'result', id, result });
    } catch (err) {
        self.postMessage({
            type: 'result',
            id,
            result: { output: '', error: { type: 'Crash', msg: String(err), line: null }, vars: {}, turtle: null, passed: null, fail: null },
        });
    }
};
