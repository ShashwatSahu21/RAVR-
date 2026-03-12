'use client';

import React, { useEffect, useRef } from 'react';

export default function HeatmapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dots: any[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      createDots();
    };

    const createDots = () => {
      dots = [];
      // Lower density for cleaner look
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      const colors = ['#FF3D5A', '#9B5DE5', '#00F5C4', '#FFE03D'];
      
      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 1,
          maxR: Math.random() * 150 + 100, // Larger, softer blobs
          color,
          alpha: Math.random() * 0.2 + 0.05, // Much subtler
          speed: Math.random() * 0.005 + 0.002,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const drawHeatmap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        
        // Wrap around
        if (d.x < -200) d.x = canvas.width + 200;
        if (d.x > canvas.width + 200) d.x = -200;
        if (d.y < -200) d.y = canvas.height + 200;
        if (d.y > canvas.height + 200) d.y = -200;

        const pulse = Math.sin(t * d.speed * 50 + d.phase);
        const currentR = d.maxR * (0.8 + 0.2 * pulse);
        const currentAlpha = d.alpha * (0.7 + 0.3 * Math.abs(pulse));

        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, currentR);
        // Create proper rgba string from hex
        const r = parseInt(d.color.slice(1, 3), 16);
        const g = parseInt(d.color.slice(3, 5), 16);
        const b = parseInt(d.color.slice(5, 7), 16);
        
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, currentR, 0, Math.PI * 2);
        ctx.fill();

        // Tiny center spark
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha * 2})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawHeatmap);
    };

    resizeCanvas();
    drawHeatmap();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" 
      style={{ filter: 'blur(30px)' }} // Added extra blur for "heatmap" feel
    />
  );
}

