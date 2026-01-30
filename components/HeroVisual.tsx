import React, { useEffect, useRef, useState } from 'react';

// --- CONFIGURATION ---
const GOLD_COLOR = '#C5A059';
const INK_COLOR = '#1a1a1a';

// DESKTOP SETTINGS
const DESKTOP_COUNT = 100;
const DESKTOP_DIST = 0.55;

// MOBILE SETTINGS (tuned to look "full" but run fast)
const MOBILE_COUNT = 60; // Increased from 35
const MOBILE_DIST = 0.85; // Increased range so lines actually connect

interface Point3D {
  x: number;
  y: number;
  z: number;
  id: number;
  color: string;
  baseSize: number;
  startX: number;
  startY: number;
  startZ: number;
}
interface Connection { p1: number; p2: number }

// --- GEOMETRY GENERATOR ---
const generateGeometry = (isMobile: boolean) => {
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
  const connectionDist = isMobile ? MOBILE_DIST : DESKTOP_DIST;

  const verts: Point3D[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); 

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; 
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    // More gold on mobile to make it pop
    const isGold = Math.random() > (isMobile ? 0.7 : 0.8);
    
    verts.push({ 
      x, y, z, 
      id: i,
      color: isGold ? GOLD_COLOR : INK_COLOR,
      baseSize: isGold ? 4.5 : 2.5,
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
      if (d < connectionDist) connections.push({ p1: i, p2: j }); 
    }
  }
  return { verts, connections };
};

const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<{verts: Point3D[], connections: Connection[]} | null>(null);

  useEffect(() => {
    // 1. Detect Mobile
    const isMobile = window.innerWidth < 768;
    
    // 2. Generate Geometry (Delayed slightly to prioritize LCP Text)
    const timer = setTimeout(() => {
       setGeometry(generateGeometry(isMobile));
    }, 100); // Reduced delay so it doesn't feel "broken" or missing
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!geometry) return;
    
    const { verts, connections } = geometry;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let startTime = performance.now();
    let animationFrameId: number | null = null;
    let isIntersecting = true;
    
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance

    let mouseX = 0;
    let mouseY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width; 
      const h = rect.height;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const onMouseMove = (e: MouseEvent) => {
      // Smoother mouse tracking
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    // Auto-rotation fallback for mobile
    let autoRotateAngle = 0;

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      
      // Smooth fade in
      let progress = Math.min(1, elapsed / 1.5);
      progress = 1 - Math.pow(1 - progress, 3); 

      // Rotation Logic
      autoRotateAngle += 0.005; // Constant slow rotation
      
      const targetX = mouseY * 0.5;
      const targetY = mouseX * 0.5;
      
      // Blend Mouse + Auto Rotation
      currentRotX += (targetX - currentRotX) * 0.05;
      currentRotY += (targetY - currentRotY) * 0.05;

      const rotX = currentRotX + (elapsed * 0.05); 
      const rotY = currentRotY + (elapsed * 0.08);

      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const isMobile = w < 768; 
      
      const cx = w / 2;
      const cy = isMobile ? h * 0.35 : h * 0.45; // Adjusted mobile height
      
      const minDimension = Math.min(w, h);
      const adaptiveScale = minDimension * (isMobile ? 0.45 : 0.35); // Larger on mobile
      
      ctx.clearRect(0, 0, w, h);

      // --- PROJECTION ---
      const projected = verts.map(p => {
        let x = p.startX + (p.x - p.startX) * progress;
        let y = p.startY + (p.y - p.startY) * progress;
        let z = p.startZ + (p.z - p.startZ) * progress;

        let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        let z1 = z * Math.cos(rotY) + x * Math.sin(rotY);
        
        let y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = z1 * Math.cos(rotX) + y * Math.sin(rotX);

        return {
          x: cx + x1 * adaptiveScale,
          y: cy + y1 * adaptiveScale,
          z: z2,
          color: p.color,
          baseSize: p.baseSize
        };
      });

      // --- SHADOW ---
      if (progress > 0.1) {
        ctx.save();
        const maxOpacity = isMobile ? 0.15 : 0.2;
        const shadowOp = Math.min(maxOpacity, progress * maxOpacity);
        ctx.globalAlpha = shadowOp;
        
        const shadowRadius = adaptiveScale * 0.7;
        const shadowHeight = adaptiveScale * 0.1;
        const shadowY = cy + adaptiveScale * 1.3;
        
        const grad = ctx.createRadialGradient(cx, shadowY, 0, cx, shadowY, shadowRadius);
        grad.addColorStop(0, 'rgba(26,26,26, 0.8)');
        grad.addColorStop(1, 'rgba(26,26,26, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, shadowY, shadowRadius * progress, shadowHeight * progress, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // --- CONNECTIONS ---
      // Fix: Lines appear sooner and clearer
      const lineOp = Math.max(0, (progress - 0.2) * 1.5); 
      
      if (lineOp > 0.01) {
        ctx.strokeStyle = GOLD_COLOR;
        ctx.lineWidth = isMobile ? 0.8 : 1; // Thicker lines on mobile
        
        ctx.beginPath();
        for (let i = 0; i < connections.length; i++) {
          const p1 = projected[connections[i].p1];
          const p2 = projected[connections[i].p2];
          
          const depth = (p1.z + p2.z) / 2;
          // Culling far lines for performance
          if (depth < -2.5) continue; 

          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        // Fix: Higher opacity on mobile so lines are actually visible
        ctx.globalAlpha = lineOp * (isMobile ? 0.2 : 0.15); 
        ctx.stroke();
      }

      // --- PARTICLES ---
      projected.sort((a, b) => a.z - b.z); 
      
      const baseOpacity = 0.6; 
      const opacityRange = 0.4; 
      
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        
        const scale = 1 + (p.z * 0.3);
        const r = Math.max(0, p.baseSize * scale * progress);

        if (r < 0.5) continue;

        ctx.globalAlpha = Math.min(1, baseOpacity + p.z * opacityRange); 
        ctx.fillStyle = p.color;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect for Gold particles (optimized)
        if (p.color === GOLD_COLOR && p.z > 0.2) {
            ctx.shadowColor = 'rgba(197, 160, 89, 0.4)';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }

      if (isIntersecting) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Observer to pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0].isIntersecting;
        if (isIntersecting && !animationFrameId) {
           startTime = performance.now() - (performance.now() - startTime); 
           render(performance.now());
        } else if (!isIntersecting && animationFrameId) {
           cancelAnimationFrame(animationFrameId);
           animationFrameId = null;
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);
    resize();
    render(performance.now());

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [geometry]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none select-none overflow-hidden"
      role="img"
      aria-label="Interactive 3D network visualization"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default HeroVisual;