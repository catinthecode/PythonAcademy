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


class NoMoreInput(Exception):
    pass


def _make_input(values):
    # Stands in for input(): answers come from the puzzle's list of what the
    # "player" types, echoed like a terminal would show them.
    remaining = [str(v) for v in (values or [])]

    def fake_input(prompt=""):
        if not remaining:
            raise NoMoreInput()
        answer = remaining.pop(0)
        print(str(prompt) + answer)
        return answer

    return fake_input


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


def _run_quiet(src, inputs=None, setup=""):
    # Re-runs a program with different answers for input() (used by checks via run_with).
    ns = {"__name__": "__main__", "input": _make_input(inputs)}
    out = io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = sys.stderr = out
    try:
        if setup:
            exec(setup, ns)
        error = _exec_user(src, ns)
    finally:
        sys.stdout, sys.stderr = old_out, old_err
    if error:
        what = ("when the player types " + ", ".join(str(i) for i in inputs)) if inputs else ("with " + setup.strip()) if setup else ""
        raise AssertionError("Your program crashed " + what + " (" + error["type"] + ")")
    return out.getvalue()


def _need_function(ns, name):
    fn = ns.get(name)
    if not callable(fn):
        raise AssertionError("Define a function called " + name + "(...) first.")
    return fn


def _printed(fn, *args):
    out = io.StringIO()
    old_out = sys.stdout
    sys.stdout = out
    try:
        fn(*args)
    finally:
        sys.stdout = old_out
    return out.getvalue()


def _run(src, check=None, expected_output=None, inputs_json=None):
    _turtle._reset()
    inputs = json.loads(inputs_json) if inputs_json else None
    ns = {"__name__": "__main__", "input": _make_input(inputs)}
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
            # run_with(["7"]) re-runs the kid's program as if the player typed 7;
            # run_with(setup="level = 20") runs it with a variable set first.
            run_with=lambda inputs=None, setup="": _run_quiet(src, inputs, setup),
            # function("double") returns the kid's function, or fails kindly if it's missing.
            function=lambda name: _need_function(ns, name),
            # printed(greet, "Kai") is what greet("Kai") prints.
            printed=_printed,
        )
        # Anything the kid's functions print while being checked is swallowed.
        sys.stdout = io.StringIO()
        try:
            exec(check, env)
            passed = True
        except AssertionError as e:
            passed = False
            fail = str(e) or None
        except Exception as e:
            passed = False
            fail = "Puzzle check crashed (" + type(e).__name__ + ": " + str(e) + ")"
        finally:
            sys.stdout = old_out

    simple = (int, float, str, bool, list, dict, tuple)
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

    def snap(frame):
        # Variables inside a function live in its frame; others are global.
        local = frame.f_locals
        row = []
        for n in names:
            if n in local:
                row.append(_show(local[n]))
            elif n in ns:
                row.append(_show(ns[n]))
            else:
                row.append("")
        rows.append(row)

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != "<spell>":
            return None
        if event in ("line", "return"):
            steps[0] += 1
            if steps[0] > STEP_LIMIT or len(rows) > 200:
                raise _TooLong()
            if prev[0] == line:
                snap(frame)
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
