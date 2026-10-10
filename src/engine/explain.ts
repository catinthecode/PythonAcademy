import type { PyError } from './python/types';

/** Turns a Python error into something a 7-year-old can act on. */
export function explain(err: PyError): string {
    const at = err.line ? ` (line ${err.line})` : '';
    switch (err.type) {
        case 'TooLong':
        case 'Timeout':
            return '🌀 Infinite loop! Your code kept running forever and crashed the server. Does your loop ever stop?';
        case 'TypeError':
            if (/NoneType/.test(err.msg))
                return `📭 Something gave back None (nothing)${at}. Did a function print its answer instead of returning it?`;
            if (/missing \d+ required positional argument/.test(err.msg))
                return `🎁 A function was called without all the values it needs${at}. Check what goes in the brackets.`;
            if (/invalid keyword argument/.test(err.msg))
                return `⚖️ A single = puts a value in a box${at}. To ASK whether two things are equal, use ==.`;
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
        case 'NoMoreInput':
            return '⌨️ Your program asked the player for more answers than they typed. Check how many times you call input().';
        case 'ValueError':
            if (/invalid literal for int/.test(err.msg))
                return `🔢 int() can only turn number-looking text into a number${at}. "12" works, but "twelve" doesn't!`;
            return `💥 ValueError${at}: ${err.msg}`;
        case 'KeyError':
            return `🗝️ That key isn't in the dictionary${at}: ${err.msg}. Check the spelling, or add it first.`;
        case 'IndexError':
            return `📏 That position is past the end of the list${at}. Remember: the first item is at position 0.`;
        case 'RecursionError':
            return `🌀 Your function kept calling itself forever${at}! Every recursive function needs a base case that stops.`;
        case 'AttributeError':
            return `🔍 That object doesn't have that${at}: ${err.msg}`;
        case 'ZeroDivisionError':
            return `➗ You can't divide by zero${at}! Not even in Block World.`;
        case 'Crash':
            return `😵 ${err.msg}`;
        default:
            return `💥 ${err.type}${at}: ${err.msg}`;
    }
}
