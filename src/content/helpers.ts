/**
 * Write Python naturally inside content files:
 *   code: py`
 *       for i in range(3):
 *           print("Moo")
 *   `
 * Strips the shared indentation and surrounding blank lines. Uses the raw
 * string so Python escapes like "\n" stay intact.
 */
export function py(strings: TemplateStringsArray, ...values: unknown[]): string {
    const raw = String.raw({ raw: strings.raw }, ...values);
    const lines = raw.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
    const indent = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)![0].length));
    return lines.map(l => l.slice(indent)).join('\n');
}
