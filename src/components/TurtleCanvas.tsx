import { useEffect, useRef } from 'react';
import type { TurtleDrawing } from '../engine/python/types';

const SIZE = 360;
const PAD = 24;

/** Shows the goal drawing as a dotted ghost and animates the kid's drawing on top. */
export function TurtleCanvas({ drawing, goal }: { drawing: TurtleDrawing | null; goal: TurtleDrawing | null }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = SIZE * dpr;
        canvas.height = SIZE * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Fit both drawings (and the start point) into the canvas.
        const xs = [0];
        const ys = [0];
        for (const d of [drawing, goal]) {
            for (const s of d?.segments ?? []) {
                xs.push(s.x1, s.x2);
                ys.push(s.y1, s.y2);
            }
        }
        const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
        const span = Math.max(maxX - minX, maxY - minY, 160);
        const scale = (SIZE - 2 * PAD) / span;
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        const toX = (x: number) => SIZE / 2 + (x - cx) * scale;
        const toY = (y: number) => SIZE / 2 - (y - cy) * scale;

        const background = () => {
            ctx.fillStyle = drawing?.bg ?? '#fffdf5';
            ctx.fillRect(0, 0, SIZE, SIZE);
            ctx.strokeStyle = '#eee7d6';
            ctx.lineWidth = 1;
            for (let g = 0; g <= SIZE; g += 30) {
                ctx.beginPath(); ctx.moveTo(g, 0); ctx.lineTo(g, SIZE); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, g); ctx.lineTo(SIZE, g); ctx.stroke();
            }
            if (goal) {
                ctx.save();
                ctx.setLineDash([6, 8]);
                ctx.strokeStyle = '#94a3b8';
                ctx.lineWidth = 5;
                ctx.lineCap = 'round';
                for (const s of goal.segments) {
                    if (s.jump) continue;
                    ctx.beginPath(); ctx.moveTo(toX(s.x1), toY(s.y1)); ctx.lineTo(toX(s.x2), toY(s.y2)); ctx.stroke();
                }
                ctx.restore();
            }
            // start marker
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath(); ctx.arc(toX(0), toY(0), 4, 0, Math.PI * 2); ctx.fill();
        };

        const segs = drawing?.segments ?? [];
        const lengths = segs.map(s => Math.hypot(s.x2 - s.x1, s.y2 - s.y1));
        const total = lengths.reduce((a, b) => a + b, 0);
        const duration = Math.min(2200, 400 + total * 1.5);
        let raf = 0;
        const start = performance.now();

        const frame = (now: number) => {
            background();
            let budget = total * Math.min(1, (now - start) / duration);
            let tx = 0, ty = 0, heading = 0;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            for (let i = 0; i < segs.length; i++) {
                const s = segs[i];
                const part = lengths[i] === 0 ? 1 : Math.min(1, budget / lengths[i]);
                const x2 = s.x1 + (s.x2 - s.x1) * part;
                const y2 = s.y1 + (s.y2 - s.y1) * part;
                if (!s.jump) {
                    ctx.strokeStyle = s.color && s.color !== 'black' ? s.color : '#16a34a';
                    ctx.lineWidth = Math.max(3, (s.width ?? 2) * 1.5);
                    ctx.beginPath(); ctx.moveTo(toX(s.x1), toY(s.y1)); ctx.lineTo(toX(x2), toY(y2)); ctx.stroke();
                }
                if (lengths[i] > 0) heading = Math.atan2(s.y2 - s.y1, s.x2 - s.x1);
                tx = x2; ty = y2;
                budget -= lengths[i];
                if (budget <= 0) break;
            }
            if (budget > 0 && drawing) heading = (drawing.end.heading * Math.PI) / 180;
            for (const d of drawing?.dots ?? []) {
                ctx.fillStyle = d.color;
                ctx.beginPath(); ctx.arc(toX(d.x), toY(d.y), d.size / 2, 0, Math.PI * 2); ctx.fill();
            }
            if (!drawing || drawing.end.visible) {
                // The turtle: a green arrow pointing where Shelly faces
                ctx.save();
                ctx.translate(toX(tx), toY(ty));
                ctx.rotate(-heading);
                ctx.fillStyle = '#15803d';
                ctx.strokeStyle = '#1c1917';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(-8, 8); ctx.lineTo(-4, 0); ctx.lineTo(-8, -8); ctx.closePath();
                ctx.fill(); ctx.stroke();
                ctx.restore();
            }
            if (now - start < duration) raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
    }, [drawing, goal]);

    return (
        <canvas
            ref={ref}
            className="aspect-square w-full max-w-[360px] rounded-xl border-4 border-stone-800"
            role="img"
            aria-label={goal ? 'Turtle drawing with the dotted goal picture' : 'Turtle drawing'}
        />
    );
}
