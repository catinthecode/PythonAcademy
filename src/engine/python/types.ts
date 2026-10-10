export interface PyError {
    type: string;
    msg: string;
    line: number | null;
}

export interface TurtleSegment {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color?: string;
    width?: number;
    jump?: boolean;
}

export interface TurtleDrawing {
    segments: TurtleSegment[];
    dots: { x: number; y: number; size: number; color: string }[];
    bg: string | null;
    end: { x: number; y: number; heading: number; visible: boolean };
}

export interface RunRequest {
    code: string;
    check?: string | null;
    expectedOutput?: string | null;
}

export interface TraceRequest {
    code: string;
    line: number;
    names: string[];
}

export interface TraceResult {
    rows: string[][];
    error: PyError | null;
}

export interface RunResult {
    output: string;
    error: PyError | null;
    vars: Record<string, unknown>;
    turtle: TurtleDrawing | null;
    /** null when no check was run (no check given, or the code errored) */
    passed: boolean | null;
    fail: string | null;
}
