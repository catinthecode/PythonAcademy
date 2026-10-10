// Main-thread side of the Python worker: queues runs, enforces a wall-clock
// timeout, and restarts the worker if a run has to be killed.
import type { PyError, RunRequest, RunResult, TraceRequest, TraceResult } from './types';

export type PythonStatus = 'loading' | 'ready' | 'failed';

const TIMEOUT_MS = 8000;

interface Pending {
    resolve: (r: unknown) => void;
    timer?: ReturnType<typeof setTimeout>;
}

class PythonClient {
    private worker!: Worker;
    private ready!: Promise<void>;
    private pending = new Map<number, Pending>();
    private nextId = 1;
    private queue: Promise<unknown> = Promise.resolve();
    status: PythonStatus = 'loading';
    private listeners = new Set<(s: PythonStatus) => void>();

    constructor() {
        this.start();
    }

    private setStatus(s: PythonStatus) {
        this.status = s;
        this.listeners.forEach(l => l(s));
    }

    subscribe(fn: (s: PythonStatus) => void) {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn);
    }

    private start() {
        this.worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
        this.ready = new Promise((resolve, reject) => {
            this.worker.onmessage = (e: MessageEvent) => {
                const msg = e.data;
                if (msg.type === 'ready') {
                    this.setStatus('ready');
                    resolve();
                } else if (msg.type === 'failed') {
                    this.setStatus('failed');
                    reject(new Error(msg.msg));
                } else if (msg.type === 'result') {
                    const p = this.pending.get(msg.id);
                    if (p) {
                        clearTimeout(p.timer);
                        this.pending.delete(msg.id);
                        p.resolve(msg.result);
                    }
                }
            };
        });
        this.ready.catch(() => {});
    }

    /** Runs one program. Runs are serialized so timeouts apply to a single program. */
    run(req: RunRequest): Promise<RunResult> {
        return this.enqueue<RunResult>('run', req, err => ({ output: '', error: err, vars: {}, turtle: null, passed: null, fail: null }));
    }

    /** Records variable values each time a line finishes (for trace tables). */
    trace(req: TraceRequest): Promise<TraceResult> {
        return this.enqueue<TraceResult>('trace', req, err => ({ rows: [], error: err }));
    }

    private enqueue<T>(op: string, req: unknown, failed: (err: PyError) => T): Promise<T> {
        const job = this.queue.then(() => this.send(op, req, failed));
        this.queue = job.catch(() => {});
        return job;
    }

    private async send<T>(op: string, req: unknown, failed: (err: PyError) => T): Promise<T> {
        try {
            await this.ready;
        } catch {
            return failed({ type: 'Crash', msg: 'Python could not load. Check your internet connection and refresh.', line: null });
        }
        const id = this.nextId++;
        return new Promise<T>(resolve => {
            const timer = setTimeout(() => {
                // The spell is stuck (e.g. a loop with time.sleep). Kill it and start fresh.
                this.pending.delete(id);
                this.worker.terminate();
                this.setStatus('loading');
                this.start();
                resolve(failed({ type: 'Timeout', msg: '', line: null }));
            }, TIMEOUT_MS);
            this.pending.set(id, { resolve: resolve as (r: unknown) => void, timer });
            this.worker.postMessage({ id, req, op });
        });
    }
}

export const python = new PythonClient();
