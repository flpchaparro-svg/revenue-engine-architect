import React, { useEffect, useRef, useMemo } from 'react';

// --- CONFIGURATION ---
const PROJECT_SCALE = 350;
const GOLD_COLOR = '#C5A059';
const INK_COLOR = '#1a1a1a';
const PARTICLE_COUNT = 100; // Keep 100 for desktop, safe for canvas

interface Point3D {
  x: number;
  y: number;
  z: number;
  id: number;
  color: string;
  baseSize: number;
  // Store chaotic start positions directly in the point to simplify logic
  startX: number;
  startY: number;
  startZ: number;
}
interface Connection { p1: number; p2: number }

// 1. Generate Geometry (Pure Math)
const generateGeometry = () => {
  const verts: Point3D[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); 

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2; 
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    const isGold = Math.random() > 0.8;
    
    verts.push({ 
      x, y, z, 
      id: i,
      color: isGold ? GOLD_COLOR : INK_COLOR,
      baseSize: isGold ? 4.5 : 2.5,
      // Chaos Positions
      startX: (Math.random() - 0.5) * 5,
      startY: (Math.random() - 0.5) * 5,
      startZ: (Math.random() - 0.5) * 5,
    });
  }

  const connections: Connection[] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d = Math.sqrt(
        Math.pow(verts[i].x - verts[j].x, 2) +
        Math.pow(verts[i].y - verts[j].y, 2) +
        Math.pow(verts[i].z - verts[j].z, 2)
      );
      if (d < 0.55) connections.push({ p1: i, p2: j }); 
    }
  }
  return { verts, connections };
};

const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Stable Geometry
  const { verts, connections } = useMemo(() => generateGeometry(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // State for Animation
    let startTime = performance.now();
    let animationFrameId: number;
    
    // Mouse State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    // Handle Resize
    const resize = () => {
      const rect = container.getBoundingClientRect();
      // Fallback to window size if container is collapsed (layout bug prevention)
      const width = rect.width || window.innerWidth; 
      const height = rect.height || window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    // Handle Mouse
    const onMouseMove = (e: MouseEvent) => {
      // Normalize mouse -0.5 to 0.5
      mouseX = (e.clientX / window.innerWidth - 0.5);
      mouseY = (e.clientY / window.innerHeight - 0.5);
    };

    // --- RENDER LOOP ---
    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000; // seconds
      
      // 1. Calculate Progress (Ease Out Cubic)
      // Runs from 0 to 1 over 2.5 seconds (slower, more elegant)
      let progress = Math.min(1, elapsed / 2.5);
      progress = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      // 2. Smooth Rotation Physics
      const targetX = mouseY * 0.5; // Scale down sensitivity
      const targetY = mouseX * 0.5;
      
      // Lerp current rotation towards target
      currentRotX += (targetX - currentRotX) * 0.05;
      currentRotY += (targetY - currentRotY) * 0.05;

      // Auto spin + Mouse interaction
      const rotX = currentRotX + elapsed * 0.05;
      const rotY = currentRotY + elapsed * 0.1;

      // 3. Clear Canvas
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const cx = width / 2;
      const cy = height / 2;
      
      ctx.clearRect(0, 0, width, height);

      // 4. Project Points
      const projected = verts.map(p => {
        // Interpolate Position (Chaos -> Sphere)
        let x = p.startX + (p.x - p.startX) * progress;
        let y = p.startY + (p.y - p.startY) * progress;
        let z = p.startZ + (p.z - p.startZ) * progress;

        // Rotation
        // Rotate Y
        let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        let z1 = z * Math.cos(rotY) + x * Math.sin(rotY);
        // Rotate X
        let y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);

        // Simple 3D projection
        // We use PROJECT_SCALE as a pseudo-FOV
        return {
          x: cx + x1 * PROJECT_SCALE,
          y: cy + y1 * PROJECT_SCALE,
          z: z2,
          color: p.color,
          baseSize: p.baseSize
        };
      });

      // 5. Draw Shadow
      if (progress > 0.1) {
        ctx.save();
        const shadowOp = Math.min(0.4, progress * 0.4);
        ctx.globalAlpha = shadowOp;
        
        // Dynamic gradient based on current size
        const grad = ctx.createRadialGradient(cx, cy + 380, 0, cx, cy + 380, 200);
        grad.addColorStop(0, 'rgba(26,26,26, 0.8)');
        grad.addColorStop(1, 'rgba(26,26,26, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        // Scale shadow with progress
        ctx.ellipse(cx, cy + 380, 200 * progress, 30 * progress, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6. Draw Connections
      const lineOp = Math.max(0, (progress - 0.5) * 2); // Start fading in halfway
      if (lineOp > 0.01) {
        ctx.strokeStyle = GOLD_COLOR;
        ctx.lineWidth = 1; // Keep thin for elegance
        
        // Batch drawing for performance
        ctx.beginPath();
        for (let i = 0; i < connections.length; i++) {
          const p1 = projected[connections[i].p1];
          const p2 = projected[connections[i].p2];
          
          // Optimization: Depth check
          const depth = (p1.z + p2.z) / 2;
          if (depth < -2) continue; // Don't draw very far back lines

          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        // Apply global alpha for lines
        ctx.globalAlpha = lineOp * 0.15; 
        ctx.stroke();
      }

      // 7. Draw Nodes (Sorted by Z)
      projected.sort((a, b) => a.z - b.z); // Painter's algorithm
      
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        
        // Size attenuation
        // z range is roughly -1 to 1.
        // scale 0.5 at back, 1.5 at front
        const scale = 1 + (p.z * 0.3);
        const r = Math.max(0, p.baseSize * scale * progress);

        if (r < 0.5) continue;

        ctx.globalAlpha = Math.min(1, 0.6 + p.z * 0.4); // Fade back nodes
        ctx.fillStyle = p.color;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Optional: Glow for gold nodes in front
        if (p.color === GOLD_COLOR && p.z > 0.2) {
            ctx.shadowColor = 'rgba(197, 160, 89, 0.5)';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Init
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();
    render(performance.now());

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [verts, connections]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default HeroVisual;
