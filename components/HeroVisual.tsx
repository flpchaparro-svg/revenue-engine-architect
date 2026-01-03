import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

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
  // Density: 100
  const { verts: targetVerts, connections } = useMemo(() => generateDenseGeometry(100), []);
  
  // Motion: Faster Snap (Stiffness 20)
  const progress = useSpring(0, { stiffness: 20, damping: 35, mass: 1 });
  
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
  const [frame, setFrame] = React.useState(0);

  useEffect(() => {
    // Trigger slightly faster
    const timer = setTimeout(() => progress.set(1), 300);
    
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
  }, []);

  useAnimationFrame((time) => {
    const p = progress.get();
    const rx = rotateX.get() + time * 0.00008; 
    const ry = rotateY.get() + time * 0.00015;

    projectedPoints.current = targetVerts.map((target, i) => {
      const start = startVerts[i];
      // Interpolate
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
    setFrame(time);
  });

  const lineOpacity = useTransform(progress, [0.5, 1], [0, 0.5]);
  const shadowOpacity = useTransform(progress, [0.2, 1], [0, 0.4]);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <svg className="w-full h-full max-w-[900px] max-h-[900px]" viewBox="-450 -450 900 900">
        <defs>
          <radialGradient id="shadowGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* SHADOW (Grounding) */}
        <motion.ellipse 
          cx="0" 
          cy="380" 
          rx="200" 
          ry="30" 
          fill="url(#shadowGrad)" 
          style={{ opacity: shadowOpacity, scale: progress }} 
        />

        {/* Lines */}
        <motion.g style={{ opacity: lineOpacity, stroke: '#C5A059', strokeWidth: 1.0 }}>
          {connections.map((conn, i) => {
            const p1 = projectedPoints.current[conn.p1];
            const p2 = projectedPoints.current[conn.p2];
            const depth = (p1.z + p2.z) / 2; 
            return (
              <line 
                key={i}
                x1={p1.x * PROJECT_SCALE} 
                y1={p1.y * PROJECT_SCALE} 
                x2={p2.x * PROJECT_SCALE} 
                y2={p2.y * PROJECT_SCALE} 
                strokeOpacity={0.4 + depth * 0.3} 
              />
            );
          })}
        </motion.g>

        {/* Nodes */}
        {projectedPoints.current.map((pt, i) => (
          <motion.circle
            key={pt.id}
            cx={pt.x * PROJECT_SCALE}
            cy={pt.y * PROJECT_SCALE}
            r={pt.baseSize + (pt.z * 1.5)} 
            fill={pt.color}
            filter={pt.color === '#C5A059' ? 'drop-shadow(0px 0px 4px rgba(197, 160, 89, 0.6))' : 'none'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 + pt.z * 0.2 }} 
            transition={{ duration: 1 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default HeroVisual;