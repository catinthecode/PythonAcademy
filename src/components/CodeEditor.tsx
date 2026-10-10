import { indentUnit } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { EditorSelection, Prec } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, keymap, placeholder as placeholderExt } from '@codemirror/view';
import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

export interface CodeEditorHandle {
    insertSnippet: (snippet: string, offset?: number) => void;
    focus: () => void;
}

interface Props {
    value: string;
    onChange?: (v: string) => void;
    /** Ctrl/Cmd+Enter */
    onRun?: () => void;
    readOnly?: boolean;
    minLines?: number;
    /** Put the cursor at the end, ready to type, as soon as the editor appears */
    autoFocus?: boolean;
    placeholder?: string;
}

const kidTheme = EditorView.theme({
    '&': { fontSize: '17px', borderRadius: '12px', overflow: 'hidden' },
    // No ligatures: kids must see "====" and "==" as separate characters they can count
    // (Cascadia Mono is Cascadia Code without them)
    '.cm-content': { fontFamily: "ui-monospace, 'Cascadia Mono', Consolas, Menlo, monospace", fontVariantLigatures: 'none', padding: '10px 0' },
    '.cm-gutters': { borderRight: 'none' },
    // A thick, bright, blinking cursor that young eyes can find
    '.cm-cursor, .cm-dropCursor': { borderLeft: '3px solid #facc15' },
    '&.cm-focused': { outline: '3px solid #facc15', outlineOffset: '0px' },
    '.cm-placeholder': { color: '#94a3b8', fontStyle: 'italic' },
});

export const CodeEditor = forwardRef<CodeEditorHandle, Props>(function CodeEditor(
    { value, onChange, onRun, readOnly, minLines = 4, autoFocus, placeholder },
    forwardedRef,
) {
    const ref = useRef<ReactCodeMirrorRef>(null);
    const extensions = useMemo(
        () => [
            python(),
            indentUnit.of('    '),
            kidTheme,
            Prec.highest(keymap.of([{ key: 'Mod-Enter', run: () => { onRun?.(); return true; } }])),
            EditorView.lineWrapping,
            ...(placeholder ? [placeholderExt(placeholder)] : []),
        ],
        [onRun, placeholder],
    );

    useImperativeHandle(forwardedRef, () => ({
        insertSnippet(snippet: string, offset = 0) {
            const view = ref.current?.view;
            if (!view) return;
            const sel = view.state.selection.main;
            const from = sel.from;
            const to = sel.to;
            const targetPos = Math.max(0, from + snippet.length + offset);
            view.dispatch({
                changes: { from, to, insert: snippet },
                selection: EditorSelection.cursor(targetPos),
                scrollIntoView: true,
            });
            view.focus();
        },
        focus() {
            ref.current?.view?.focus();
        },
    }));

    useEffect(() => {
        if (!autoFocus || readOnly) return;
        // Wait a frame so the editor exists, then focus it with the cursor at the very end.
        const t = setTimeout(() => {
            const view = ref.current?.view;
            if (!view) return;
            view.focus();
            view.dispatch({ selection: EditorSelection.cursor(view.state.doc.length), scrollIntoView: false });
        }, 50);
        return () => clearTimeout(t);
    }, [autoFocus, readOnly]);

    return (
        <CodeMirror
            ref={ref}
            value={value}
            onChange={onChange}
            extensions={extensions}
            theme={oneDark}
            readOnly={readOnly}
            editable={!readOnly}
            minHeight={`${minLines * 1.6 + 1.2}em`}
            basicSetup={{ foldGutter: false, highlightActiveLine: !readOnly, autocompletion: false, searchKeymap: false }}
            aria-label="Python code"
        />
    );
});

