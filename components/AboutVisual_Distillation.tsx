
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const AboutVisual_Distillation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interaction State
  // 0 = Cold/Stagnant, 1 = Hot/Boiling
  const heatLevel = useMotionValue(0); 
  const smoothHeat = useSpring(heatLevel, { damping: 20, stiffness: 100 });
  const [statusLabel, setStatusLabel] = useState("SYSTEM_IDLE");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;

    // Physics Constants
    const particles: Particle[] = [];
    const maxParticles = 300;
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: 'crude' | 'vapor' | 'gold';
      life: number;
      maxLife: number;

      constructor(type: 'crude' | 'vapor' | 'gold', x?: number, y?: number) {
        this.type = type;
        this.life = 0;
        
        if (type === 'crude') {
          // Dark bubbles start at bottom
          this.x = width * 0.4 + Math.random() * width * 0.2; // Center column
          this.y = height * 0.9;
          this.size = Math.random() * 3 + 1;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = -(Math.random() * 0.5 + 0.1);
          this.maxLife = 200 + Math.random() * 100;
        } else if (type === 'vapor') {
          // Vapor starts mid-column
          this.x = width * 0.4 + Math.random() * width * 0.2;
          this.y = height * 0.6;
          this.size = Math.random() * 4 + 2;
          this.vx = (Math.random() - 0.5) * 1;
          this.vy = -(Math.random() * 1 + 0.5);
          this.maxLife = 100;
        } else {
          // Gold starts at top condenser
          this.x = width * 0.65; // Offset to right
          this.y = height * 0.15;
          this.size = Math.random() * 3 + 2;
          this.vx = 0;
          this.vy = Math.random() * 2 + 1; // Falls down
          this.maxLife = 200;
        }
      }

      update(temp: number) {
        this.life++;
        
        if (this.type === 'crude') {
          // Heat makes them rise faster and jitter more
          this.y += this.vy * (1 + temp * 3);
          this.x += this.vx + (Math.random() - 0.5) * temp * 2;
          
          // Friction plates logic (simple bounds)
          if (this.x < width * 0.35 || this.x > width * 0.65) this.vx *= -1;

          // If cold, they die early or fall back
          if (temp < 0.2 && this.y < height * 0.7) {
             this.vy += 0.05; // Gravity takes over
          }
        } 
        else if (this.type === 'vapor') {
           this.y += this.vy * (1 + temp * 2);
           this.size *= 0.99; // Shrink
        }
        else if (this.type === 'gold') {
           this.y += this.vy;
           // Collect at bottom right
           if (this.y > height * 0.8) {
             this.vy = 0;
             this.size *= 0.95; // Dissolve into collection
           }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.type === 'crude') {
          ctx.fillStyle = `rgba(26, 26, 26, ${1 - this.life/this.maxLife})`;
        } else if (this.type === 'vapor') {
          ctx.fillStyle = `rgba(100, 100, 100, ${0.5 * (1 - this.life/this.maxLife)})`;
        } else {
          // Gold Glow
          ctx.fillStyle = '#C5A059';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#C5A059';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const render = () => {
      const temp = smoothHeat.get(); // 0 to 1
      
      // Update Label based on temp
      if (temp < 0.3) setStatusLabel("OPERATIONS: STAGNANT");
      else if (temp < 0.7) setStatusLabel("PROCESS: FILTERING_NOISE");
      else setStatusLabel("OUTPUT: PURE_LEVERAGE");

      ctx.clearRect(0, 0, width, height);

      // Spawn Particles based on Heat
      if (Math.random() < 0.1 + temp * 0.5) {
        particles.push(new Particle('crude'));
      }
      
      // High heat generates Vapor
      if (temp > 0.4 && Math.random() < temp * 0.2) {
        particles.push(new Particle('vapor'));
      }

      // Very high heat generates Gold
      if (temp > 0.8 && Math.random() < 0.1) {
        particles.push(new Particle('gold'));
      }

      // Update & Draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(temp);
        p.draw(ctx);
        if (p.life > p.maxLife || p.y < 0 || p.size < 0.5) {
          particles.splice(i, 1);
        }
      }

      // Draw Apparatus (Glassware Outline)
      ctx.strokeStyle = "rgba(26, 26, 26, 0.1)";
      ctx.lineWidth = 2;
      
      // Main Column
      ctx.beginPath();
      ctx.moveTo(width * 0.35, height * 0.9);
      ctx.lineTo(width * 0.35, height * 0.2); // Left wall
      ctx.lineTo(width * 0.65, height * 0.2); // Top connect
      ctx.lineTo(width * 0.65, height * 0.9); // Right wall
      ctx.stroke();

      // Bulb bottom
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.9, width * 0.15, 0, Math.PI, false);
      ctx.stroke();

      // Condenser arm (Right side)
      if (temp > 0.8) {
         ctx.strokeStyle = "rgba(197, 160, 89, 0.5)"; // Gold when active
      }
      ctx.beginPath();
      ctx.moveTo(width * 0.65, height * 0.25);
      ctx.lineTo(width * 0.8, height * 0.15); // Arm up
      ctx.lineTo(width * 0.8, height * 0.8); // Drip tube
      ctx.stroke();

      // Filter Plates (Horizontal lines in column)
      ctx.strokeStyle = "rgba(26, 26, 26, 0.05)";
      for(let i=1; i<5; i++) {
         const y = height * 0.9 - (i * (height * 0.12));
         ctx.beginPath();
         // Staggered plates
         if (i % 2 === 0) {
            ctx.moveTo(width * 0.35, y);
            ctx.lineTo(width * 0.6, y);
         } else {
            ctx.moveTo(width * 0.4, y);
            ctx.lineTo(width * 0.65, y);
         }
         ctx.stroke();
      }

      // Heat Indicator (Red Glow at bottom)
      if (temp > 0.1) {
        const glowSize = temp * 100;
        const gradient = ctx.createRadialGradient(width*0.5, height*0.95, 10, width*0.5, height*0.95, glowSize);
        gradient.addColorStop(0, `rgba(226, 30, 63, ${temp * 0.4})`);
        gradient.addColorStop(1, 'rgba(226, 30, 63, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, height*0.8, width, height*0.2);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        width = canvas.width = canvas.clientWidth;
        height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [smoothHeat]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const normalizedY = Math.max(0, Math.min(1, y / rect.height));
    // Invert so bottom is 0 (cold), top is 1 (hot)
    heatLevel.set(1 - normalizedY);
  };

  const handleMouseLeave = () => {
    heatLevel.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative overflow-hidden bg-transparent select-none cursor-ns-resize group"
    >
       <canvas ref={canvasRef} className="w-full h-full" />

       {/* Overlay UI */}
       <div className="absolute top-6 left-6 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-[#1a1a1a] group-hover:bg-[#E21E3F] transition-colors" />
             <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/60">
                DISTILLATION_UNIT
             </span>
          </div>
          <div className="font-serif text-2xl text-[#1a1a1a]">
             {statusLabel}
          </div>
       </div>

       {/* Heat Gauge */}
       <div className="absolute right-6 top-1/2 -translate-y-1/2 h-32 w-1 bg-[#1a1a1a]/5 rounded-full overflow-hidden">
          <motion.div 
             className="w-full bg-[#E21E3F] absolute bottom-0"
             style={{ height: useTransform(smoothHeat, [0, 1], ["0%", "100%"]) }}
          />
       </div>
       
       <div className="absolute bottom-6 w-full text-center pointer-events-none opacity-40">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
             [ DRAG UP TO APPLY PRESSURE ]
          </span>
       </div>
    </div>
  );
};

export default AboutVisual_Distillation;
