import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    vAngle: number;
    color: string;
    shape: 'rect' | 'circle' | 'star';
    size: number;
    life: number;
    maxLife: number;
}

const COLORS = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#fbbf24', '#06b6d4'];

let globalTrigger: (() => void) | null = null;

export function triggerConfetti() {
    globalTrigger?.();
}

export function Confetti() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrame = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const spawn = () => {
            const width = canvas.width;
            const height = canvas.height;
            const count = 75;
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
                const speed = 7 + Math.random() * 11;
                particles.push({
                    x: width / 2 + (Math.random() - 0.5) * 120,
                    y: height * 0.38 + (Math.random() - 0.5) * 60,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 4,
                    angle: Math.random() * Math.PI * 2,
                    vAngle: (Math.random() - 0.5) * 0.25,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    shape: Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star',
                    size: 7 + Math.random() * 8,
                    life: 0,
                    maxLife: 70 + Math.random() * 45,
                });
            }
            if (!animationFrame) {
                loop();
            }
        };

        globalTrigger = spawn;

        const drawStar = (cx: number, cy: number, spikes: number, outerR: number, innerR: number) => {
            let rot = (Math.PI / 2) * 3;
            let x = cx;
            let y = cy;
            const step = Math.PI / spikes;

            ctx.beginPath();
            ctx.moveTo(cx, cy - outerR);
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerR;
                y = cy + Math.sin(rot) * outerR;
                ctx.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * innerR;
                y = cy + Math.sin(rot) * innerR;
                ctx.lineTo(x, y);
                rot += step;
            }
            ctx.lineTo(cx, cy - outerR);
            ctx.closePath();
            ctx.fill();
        };

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles = particles.filter(p => p.life < p.maxLife);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.26; // gravity
                p.vx *= 0.985; // drag
                p.angle += p.vAngle;
                p.life++;

                const progress = p.life / p.maxLife;
                const alpha = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.color;

                if (p.shape === 'rect') {
                    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.7);
                } else if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    drawStar(0, 0, 5, p.size * 0.7, p.size * 0.35);
                }

                ctx.restore();
            }

            if (particles.length > 0) {
                animationFrame = requestAnimationFrame(loop);
            } else {
                animationFrame = 0;
            }
        };

        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrame) cancelAnimationFrame(animationFrame);
            if (globalTrigger === spawn) globalTrigger = null;
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50 h-full w-full"
            aria-hidden="true"
        />
    );
}

