// Shared by the browser worker and the Node content validator.
import type { PyodideAPI } from 'pyodide';
import type { RunRequest, RunResult, TraceRequest, TraceResult } from './types';

export function installAcademy(py: PyodideAPI, turtleSrc: string, harnessSrc: string) {
    // Register our turtle as a real module so `import turtle` and
    // `from turtle import *` both find it.
    py.globals.set('_turtle_src', turtleSrc);
    py.runPython(`
import sys, types
_m = types.ModuleType("turtle")
exec(_turtle_src, _m.__dict__)
sys.modules["turtle"] = _m
del _m, _turtle_src
`);
    py.runPython(harnessSrc);
}

export function traceCode(py: PyodideAPI, req: TraceRequest): TraceResult {
    const fn = py.globals.get('_trace');
    const names = py.toPy(req.names);
    try {
        return JSON.parse(fn(req.code, req.line, names));
    } finally {
        fn.destroy();
        names.destroy();
    }
}

export function runCode(py: PyodideAPI, req: RunRequest): RunResult {
    const fn = py.globals.get('_run');
    try {
        return JSON.parse(fn(req.code, req.check ?? null, req.expectedOutput ?? null));
    } finally {
        fn.destroy();
    }
}
