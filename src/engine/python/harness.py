# Runs a kid's program safely and reports what happened as JSON.
# Loaded once into Pyodide; JS calls _run(...) for every "Cast Spell".
import io
import json
import sys
import traceback

import turtle as _turtle

STEP_LIMIT = 100_000


class _TooLong(Exception):
    pass


def _exec_user(src, ns):
    # Count executed lines of the kid's code so infinite loops end with a
    # friendly message instead of freezing the worker.
    steps = [0]

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != "<spell>":
            return None
        if event == "line":
            steps[0] += 1
            if steps[0] > STEP_LIMIT:
                raise _TooLong()
        return tracer

    sys.settrace(tracer)
    try:
        exec(compile(src, "<spell>", "exec"), ns)
    except _TooLong:
        return {"type": "TooLong", "msg": "", "line": None}
    except SyntaxError as e:
        return {"type": type(e).__name__, "msg": str(e.msg), "line": e.lineno}
    except Exception as e:
        line = None
        for fs in traceback.extract_tb(e.__traceback__):
            if fs.filename == "<spell>":
                line = fs.lineno
        return {"type": type(e).__name__, "msg": str(e), "line": line}
    finally:
        sys.settrace(None)
    return None


def _run(src, check=None, expected_output=None):
    _turtle._reset()
    ns = {"__name__": "__main__"}
    out = io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = sys.stderr = out
    try:
        error = _exec_user(src, ns)
    finally:
        sys.stdout, sys.stderr = old_out, old_err
    output = out.getvalue()

    passed = None
    fail = None
    if error is None and check:
        # Checks see the kid's variables plus a few helpers.
        env = dict(ns)
        env.update(
            source=src,
            output=output,
            output_lines=output.splitlines(),
            expected_output=expected_output,
            same_output=lambda a, b: _norm(a) == _norm(b),
        )
        try:
            exec(check, env)
            passed = True
        except AssertionError as e:
            passed = False
            fail = str(e) or None
        except Exception as e:
            passed = False
            fail = "Puzzle check crashed (" + type(e).__name__ + ": " + str(e) + ")"

    simple = (int, float, str, bool, list)
    variables = {k: v for k, v in ns.items() if not k.startswith("__") and isinstance(v, simple)}
    return json.dumps(
        {
            "output": output,
            "error": error,
            "vars": variables,
            "turtle": _turtle._drawing(),
            "passed": passed,
            "fail": fail,
        },
        default=str,
    )


def _trace(src, line, names):
    # For trace tables: snapshot the named variables every time `line` finishes.
    # A line has finished when the next line event (or the end of the program) arrives.
    _turtle._reset()
    ns = {"__name__": "__main__"}
    rows = []
    prev = [None]
    steps = [0]

    def snap():
        rows.append([_show(ns[n]) if n in ns else "" for n in names])

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != "<spell>":
            return None
        if event in ("line", "return"):
            steps[0] += 1
            if steps[0] > STEP_LIMIT or len(rows) > 200:
                raise _TooLong()
            if prev[0] == line:
                snap()
            prev[0] = frame.f_lineno if event == "line" else None
        return tracer

    old_out = sys.stdout
    sys.stdout = io.StringIO()
    error = None
    sys.settrace(tracer)
    try:
        exec(compile(src, "<spell>", "exec"), ns)
    except Exception as e:
        error = {"type": type(e).__name__, "msg": str(e), "line": None}
    finally:
        sys.settrace(None)
        sys.stdout = old_out
    return json.dumps({"rows": rows, "error": error})


def _show(value):
    # How a value appears in a trace table: like print() shows it.
    return str(value)


def _norm(text):
    # Ignore trailing spaces and trailing blank lines when comparing output.
    return "\n".join(line.rstrip() for line in (text or "").rstrip().splitlines())
