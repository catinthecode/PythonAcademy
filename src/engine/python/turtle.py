# A tiny stand-in for Python's turtle module. Instead of opening a window it
# records every move, and the page animates them on a canvas.
# Coordinates match real turtle: start at (0, 0) facing east, y points up.
import math

_segments = []
_dots = []
_screen = {"bg": None}


class Turtle:
    def __init__(self):
        self._x = 0.0
        self._y = 0.0
        self._heading = 0.0
        self._pen = True
        self._color = "black"
        self._width = 2
        self._visible = True

    # --- movement ---
    def forward(self, distance):
        rad = math.radians(self._heading)
        self._move_to(self._x + distance * math.cos(rad), self._y + distance * math.sin(rad))

    def backward(self, distance):
        self.forward(-distance)

    def left(self, angle):
        self._heading = (self._heading + angle) % 360

    def right(self, angle):
        self.left(-angle)

    def goto(self, x, y=None):
        if y is None:
            x, y = x
        self._move_to(float(x), float(y))

    def setx(self, x):
        self._move_to(float(x), self._y)

    def sety(self, y):
        self._move_to(self._x, float(y))

    def setheading(self, angle):
        self._heading = angle % 360

    def home(self):
        self._move_to(0.0, 0.0)
        self._heading = 0.0

    def circle(self, radius, extent=360, steps=None):
        # Same approach as CPython's turtle: a circle is many short lines.
        if steps is None:
            steps = 1 + int(min(11 + abs(radius) / 6.0, 59.0) * abs(extent) / 360.0)
        w = extent / steps
        length = 2.0 * radius * math.sin(math.radians(w / 2.0))
        if radius < 0:
            length, w = -length, -w
        self.left(w / 2.0)
        for _ in range(steps):
            self.forward(length)
            self.left(w)
        self.left(-w / 2.0)

    def dot(self, size=None, color=None):
        _dots.append({"x": self._x, "y": self._y, "size": size or max(self._width + 4, 2 * self._width),
                      "color": _color_name(color) if color else self._color})

    # --- pen ---
    def penup(self):
        self._pen = False

    def pendown(self):
        self._pen = True

    def isdown(self):
        return self._pen

    def pensize(self, width=None):
        if width is None:
            return self._width
        self._width = width

    def color(self, *args):
        if args:
            self._color = _color_name(args[0])

    def pencolor(self, *args):
        if not args:
            return self._color
        self._color = _color_name(args[0])

    def fillcolor(self, *args):
        pass

    def begin_fill(self):
        pass

    def end_fill(self):
        pass

    # --- state ---
    def position(self):
        return (round(self._x, 2), round(self._y, 2))

    def xcor(self):
        return round(self._x, 2)

    def ycor(self):
        return round(self._y, 2)

    def heading(self):
        return round(self._heading, 2)

    def speed(self, *args):
        pass

    def hideturtle(self):
        self._visible = False

    def showturtle(self):
        self._visible = True

    def shape(self, *args):
        pass

    def _move_to(self, x, y):
        if self._pen:
            _segments.append({"x1": self._x, "y1": self._y, "x2": x, "y2": y,
                              "color": self._color, "width": self._width})
        else:
            _segments.append({"x1": self._x, "y1": self._y, "x2": x, "y2": y, "jump": True})
        self._x, self._y = x, y

    # Short names kids see in tutorials
    fd = forward
    bk = back = backward
    lt = left
    rt = right
    pu = up = penup
    pd = down = pendown
    width = pensize
    setpos = setposition = goto
    seth = setheading
    pos = position
    ht = hideturtle
    st = showturtle


class _Screen:
    def bgcolor(self, color=None):
        if color is not None:
            _screen["bg"] = _color_name(color)

    def setup(self, *args, **kwargs):
        pass

    def title(self, *args):
        pass

    def tracer(self, *args):
        pass

    def update(self):
        pass

    def mainloop(self):
        pass

    def exitonclick(self):
        pass


def _color_name(c):
    if isinstance(c, (tuple, list)):
        r, g, b = (int(v * 255) if isinstance(v, float) and v <= 1 else int(v) for v in c[:3])
        return "#%02x%02x%02x" % (r, g, b)
    return str(c)


_default = Turtle()
_the_screen = _Screen()


def Screen():
    return _the_screen


def _reset():
    global _default
    _segments.clear()
    _dots.clear()
    _screen["bg"] = None
    _default = Turtle()


def _drawing():
    if not _segments and not _dots:
        return None
    return {"segments": list(_segments), "dots": list(_dots), "bg": _screen["bg"],
            "end": {"x": _default._x, "y": _default._y, "heading": _default._heading,
                    "visible": _default._visible}}


def _forward_to_default(name):
    def call(*args, **kwargs):
        return getattr(_default, name)(*args, **kwargs)
    call.__name__ = name
    return call


# Module-level functions (from turtle import *) drive the default turtle.
for _name in ["forward", "fd", "backward", "bk", "back", "left", "lt", "right", "rt",
              "goto", "setpos", "setposition", "setx", "sety", "setheading", "seth", "home",
              "circle", "dot", "penup", "pu", "up", "pendown", "pd", "down", "isdown",
              "pensize", "width", "color", "pencolor", "fillcolor", "begin_fill", "end_fill",
              "position", "pos", "xcor", "ycor", "heading", "speed", "hideturtle", "ht",
              "showturtle", "st", "shape"]:
    globals()[_name] = _forward_to_default(_name)


def bgcolor(color=None):
    _the_screen.bgcolor(color)


def done():
    pass


mainloop = exitonclick = done

__all__ = [n for n in globals() if not n.startswith("_") and n != "math"]
