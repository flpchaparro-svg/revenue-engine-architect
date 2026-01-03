import React, { useEffect, useRef } from 'react';

const PillarVisual_Brain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 600;
    
    // Brain shape approximation (ellipse)
    const centerX = width / 2;
    const centerY = height / 2;
    const radiusX = 150;
    const radiusY = 120;

    const particles: {x: number, y: number, vx: number, vy: number, life: number}[] = [];
    
    // Init particles inside brain shape
    for(let i=0; i<300; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 0.9; // Distribute mostly inside
        particles.push({
            x: centerX + r * radiusX * Math.cos(angle),
            y: centerY + r * radiusY * Math.sin(angle),
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            life: Math.random()
        });
    }

    let pulses: {x: number, y: number, targetX: number, targetY: number, progress: number}[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Randomly spawn neural pulses
      if (Math.random() > 0.95) {
          const start = particles[Math.floor(Math.random() * particles.length)];
          const end = particles[Math.floor(Math.random() * particles.length)];
          pulses.push({x: start.x, y: start.y, targetX: end.x, targetY: end.y, progress: 0});
      }

      // Draw Particles
      particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          
          // Keep within bounds roughly
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          if ((dx*dx)/(radiusX*radiusX) + (dy*dy)/(radiusY*radiusY) > 1) {
              p.vx *= -1;
              p.vy *= -1;
          }

          ctx.fillStyle = `rgba(26, 26, 26, ${0.1 + Math.sin(Date.now() * 0.001 + p.life) * 0.1})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
      });

      // Draw Pulses
      ctx.strokeStyle = '#C5A059';
      ctx.lineWidth = 1;
      pulses.forEach((pulse, index) => {
          pulse.progress += 0.05;
          const currX = pulse.x + (pulse.targetX - pulse.x) * pulse.progress;
          const currY = pulse.y + (pulse.targetY - pulse.y) * pulse.progress;
          
          ctx.beginPath();
          ctx.moveTo(pulse.x, pulse.y);
          ctx.lineTo(currX, currY);
          ctx.stroke();

          if (pulse.progress >= 1) pulses.splice(index, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden">
      <canvas ref={canvasRef} />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#1a1a1a]/30 uppercase tracking-widest pointer-events-none">
        [ COGNITIVE_LAYER // REASONING ]
      </div>
    </div>
  );
};

export default PillarVisual_Brain;