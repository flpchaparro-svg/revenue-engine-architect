import React, { useEffect, useRef, useMemo } from 'react';
import { useSpring, useMotionValue, useTransform } from 'framer-motion';

// --- 3D MATH HELPERS ---
interface Point3D { 
  x: number; 
  y: number; 
  z: number; 
  id: number;
  color: string;
  baseSize: number;
}
interface Connection { p1: number; p2: number }

const PROJECT_SCALE = 350;

// 1. Generate Denser Sphere (100 Nodes)
const generateDenseGeometry = (count: number) => {
  const verts: Point3D[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); 

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; 
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    // Body: 20% Gold Nodes, 80% Ink Nodes
    const isGold = Math.random() > 0.8;
    
    verts.push({ 
      x, y, z, 
      id: i,
      color: isGold ? '#C5A059' : '#1a1a1a',
      baseSize: isGold ? 4.5 : 2.5 
    });
  }

  // Connections (Tuned for 100 nodes)
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
  
  // Density: 100
  const { verts: targetVerts, connections } = useMemo(() => generateDenseGeometry(100), []);
  
  // Motion: Faster Snap (Stiffness increased for quicker assembly)
  const progress = useSpring(0, { stiffness: 40, damping: 30, mass: 0.8 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 40, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 40, damping: 30 });

  // Chaos Start Positions
  const startVerts = useMemo(() => {
    return targetVerts.map((_, i) => ({
      x: (Math.random() - 0.5) * 5, 
      y: (Math.random() - 0.5) * 5,
      z: (Math.random() - 0.5) * 5,
      id: i
    }));
  }, [targetVerts]);

  const projectedPoints = useRef<Point3D[]>(targetVerts.map(v => ({ ...v })));

  const lineOpacity = useTransform(progress, [0.5, 1], [0, 0.5]);
  const shadowOpacity = useTransform(progress, [0.2, 1], [0, 0.4]);

  useEffect(() => {
    // Trigger assembly animation
    progress.set(0);
    const timer = setTimeout(() => {
      progress.set(1);
    }, 50);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.3; 
      const y = (e.clientY / window.innerHeight - 0.5) * 0.3;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [progress, mouseX, mouseY]);

  // Setup Canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Helper function to get size
    const getSize = () => {
      const rect = container.getBoundingClientRect();
      const calculatedSize = Math.min(rect.width || 900, rect.height || 900, 900);
      return calculatedSize > 0 ? calculatedSize : 900;
    };

    // Initialize canvas size
    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = getSize();
      
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      
      return size;
    };

    let size = initCanvas();
    const centerX = size / 2;
    const centerY = size / 2;

    // Create shadow gradient
    const createShadowGradient = (cx: number, cy: number) => {
      const gradient = ctx.createRadialGradient(cx, cy + 380, 0, cx, cy + 380, 200);
      gradient.addColorStop(0, 'rgba(26, 26, 26, 0.6)');
      gradient.addColorStop(1, 'rgba(26, 26, 26, 0)');
      return gradient;
    };

    let shadowGradient = createShadowGradient(centerX, centerY);
    let animationFrameId: number;
    let startTime = performance.now();

    const render = (timestamp: number) => {
      const elapsed = (timestamp - startTime) / 1000;
      
      // Re-check size in case container resized
      const currentSize = getSize();
      if (currentSize !== size && currentSize > 0) {
        size = currentSize;
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        shadowGradient = createShadowGradient(size / 2, size / 2);
      }
      
      const cx = size / 2;
      const cy = size / 2;
      ctx.clearRect(0, 0, size, size);

      // Get progress - use manual animation as fallback
      let p = Math.max(0, Math.min(1, progress.get()));
      if (elapsed > 0.1 && p < 0.01) {
        // Manual animation if spring doesn't work
        p = Math.min(1, (elapsed - 0.1) / 1.5);
        if (p >= 1) progress.set(1);
      }
      
      const rx = rotateX.get() + elapsed * 0.08; 
      const ry = rotateY.get() + elapsed * 0.15;
      const lineOp = Math.max(0, Math.min(1, lineOpacity.get()));
      const shadowOp = Math.max(0, Math.min(1, shadowOpacity.get()));

      // Update projected points
      projectedPoints.current = targetVerts.map((target, i) => {
        const start = startVerts[i];
        let x = start.x + (target.x - start.x) * p;
        let y = start.y + (target.y - start.y) * p;
        let z = start.z + (target.z - start.z) * p;

        // Rotate Y
        let x1 = x * Math.cos(ry) - z * Math.sin(ry);
        let z1 = z * Math.cos(ry) + x * Math.sin(ry);
        // Rotate X
        let y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
        let z2 = z1 * Math.cos(rx) + y * Math.sin(rx);

        return { ...target, x: x1, y: y1, z: z2 };
      });

      // Draw Shadow
      if (shadowOp > 0 && p > 0) {
        ctx.save();
        ctx.globalAlpha = shadowOp * p;
        ctx.fillStyle = shadowGradient;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 380, 200 * p, 30 * p, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }

      // Draw Connections
      if (lineOp > 0 && p > 0.5) {
        ctx.strokeStyle = '#C5A059';
        ctx.lineWidth = 1.0;
        
        connections.forEach((conn) => {
          const p1 = projectedPoints.current[conn.p1];
          const p2 = projectedPoints.current[conn.p2];
          const depth = (p1.z + p2.z) / 2;
          
          ctx.globalAlpha = lineOp * (0.4 + depth * 0.3);
          ctx.beginPath();
          ctx.moveTo(cx + p1.x * PROJECT_SCALE, cy + p1.y * PROJECT_SCALE);
          ctx.lineTo(cx + p2.x * PROJECT_SCALE, cy + p2.y * PROJECT_SCALE);
          ctx.stroke();
        });
      }

      // Draw Nodes
      const sortedPoints = [...projectedPoints.current].sort((a, b) => b.z - a.z);
      
      sortedPoints.forEach((pt) => {
        const x = cx + pt.x * PROJECT_SCALE;
        const y = cy + pt.y * PROJECT_SCALE;
        const radius = pt.baseSize + (pt.z * 1.5);
        const opacity = 0.8 + pt.z * 0.2;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = pt.color;
        
        if (pt.color === '#C5A059') {
          ctx.shadowColor = 'rgba(197, 160, 89, 0.6)';
          ctx.shadowBlur = 4;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Start render loop
    animationFrameId = requestAnimationFrame(render);

    // Handle Resize
    const observer = new ResizeObserver(() => {
      const newSize = getSize();
      if (newSize > 0 && newSize !== size) {
        size = newSize;
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvas.width = newSize * dpr;
        canvas.height = newSize * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${newSize}px`;
        canvas.style.height = `${newSize}px`;
        shadowGradient = createShadowGradient(size / 2, size / 2);
      }
    });
    observer.observe(container);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [targetVerts, startVerts, connections, progress, rotateX, rotateY, lineOpacity, shadowOpacity]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default HeroVisual;
