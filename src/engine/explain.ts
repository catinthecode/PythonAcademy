import type { PyError } from './python/types';

/** Turns a Python error into something a 7-year-old can act on. */
export function explain(err: PyError): string {
    const at = err.line ? ` (line ${err.line})` : '';
    switch (err.type) {
        case 'TooLong':
        case 'Timeout':
            return '🌀 Infinite loop! Your code kept running forever and crashed the server. Does your loop ever stop?';
        case 'TypeError':
            if (/str/.test(err.msg) && /int/.test(err.msg))
                return `🧪 Python can't mix text and numbers${at}! Text has quotes around it ("5"), numbers don't (5).`;
            return `🧪 Python got its types mixed up${at}: ${err.msg}`;
        case 'NameError': {
            const m = err.msg.match(/'(.+?)'/);
            return `🔍 Python doesn't know anything called "${m ? m[1] : 'that'}"${at}. Check your spelling, and remember capital letters matter!`;
        }
        case 'IndentationError':
        case 'TabError':
            return `📏 The spaces at the start of a line are off${at}. Code inside a loop needs to be pushed in with spaces.`;
        case 'SyntaxError':
            if (/never closed|unterminated string|EOL/.test(err.msg))
                return `📝 Something was opened but never closed${at}. Check that every quote " and bracket ( has a partner.`;
            if (/expected ':'/.test(err.msg))
                return `📝 Python expected a colon : at the end of a line${at}.`;
            return `📝 Python couldn't read your code${at}. Check your quotes, brackets and colons.`;
        case 'ZeroDivisionError':
            return `➗ You can't divide by zero${at}! Not even in Block World.`;
        case 'Crash':
            return `😵 ${err.msg}`;
        default:
            return `💥 ${err.type}${at}: ${err.msg}`;
    }
}
