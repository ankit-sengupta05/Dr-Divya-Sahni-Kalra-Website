import { useRef, useEffect } from 'react';

interface OrganicCanvasProps {
  className?: string;
}

export default function OrganicCanvas({ className = '' }: OrganicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const xoffsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const threadCount = 30;
    const threadPart = 600;
    const threadLength = 15;

    let cw = window.innerWidth;
    let ch = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const rnd = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;

      const time = Date.now() / 1000;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;
      const safeDt = Math.min(dt, 0.05);

      xoffsetRef.current += 75 * safeDt;
      const xoffset = xoffsetRef.current;
      const invHeight = 1 / ch;

      const layers = [
        { color: 'rgba(22, 65, 147, 0.45)' },
        { color: 'rgba(163, 212, 255, 0.55)' },
      ];

      for (let layerIdx = 0; layerIdx < layers.length; layerIdx++) {
        ctx.clearRect(0, 0, cw, ch);

        for (let i = 0; i < threadCount; i++) {
          const seed = i * 123.45 + layerIdx * 500;
          let seedVal = seed;

          const baseX = rnd(seedVal++) * cw;
          let x = baseX;
          let y = rnd(seedVal++) * ch;
          let thickness = rnd(seedVal++) * 1 + 0.4;
          let angle = rnd(seedVal++) * Math.PI * 2;

          ctx.strokeStyle = layers[layerIdx].color;

          for (let j = 0; j < threadPart; j++) {
            const prevX = x;
            const prevY = y;
            const speed = thickness * 0.3;

            angle += Math.sin(y * invHeight + xoffset * 0.05) * 0.08 + (Math.random() - 0.5) * 0.1;
            x += Math.cos(angle) * threadLength * speed;
            y += Math.sin(angle) * threadLength * speed;

            const undulation = Math.sin(j * 0.2 + xoffset) * (thickness * 5);
            const peristalsis = Math.sin(j * 0.05 - xoffset) * (thickness * 0.5);

            ctx.beginPath();
            ctx.moveTo(prevX, prevY - undulation);
            ctx.quadraticCurveTo(prevX, prevY - undulation, x, y - undulation);
            ctx.lineWidth = Math.max(0.1, (thickness + peristalsis) * (j / threadPart));
            ctx.stroke();
          }
        }

        // Pulsing center thread
        const cx = cw / 2;
        const cy = ch / 2;
        let px = cx;
        let py = cy;
        let pAngle = rnd(999) * Math.PI * 2;
        const pThickness = 1.2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';

        for (let j = 0; j < threadPart; j++) {
          const prevPX = px;
          const prevPY = py;
          pAngle += Math.sin(py * invHeight + xoffset * 0.05) * 0.08 + (Math.random() - 0.5) * 0.1;
          px += Math.cos(pAngle) * threadLength * (pThickness * 0.3);
          py += Math.sin(pAngle) * threadLength * (pThickness * 0.3);

          const und = Math.sin(j * 0.2 + xoffset) * (pThickness * 5);
          const per = Math.sin(j * 0.05 - xoffset) * (pThickness * 0.5);

          ctx.beginPath();
          ctx.moveTo(prevPX, prevPY - und);
          ctx.quadraticCurveTo(prevPX, prevPY - und, px, py - und);
          ctx.lineWidth = Math.max(0.1, (pThickness + per) * (j / threadPart));
          ctx.stroke();
        }
      }
    };

    lastTimeRef.current = Date.now() / 1000;
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
