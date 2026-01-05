
import React, { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

const CUBE_SIZE = 60;
const STACK_GAP = 65; 
const FL = 850; 
const CUBE_COUNT = 5;

// --- MATH HELPERS ---
const rotateX = (x: number, y: number, z: number, angle: number) => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x, y: y * c - z * s, z: y * s + z * c };
};

const rotateY = (x: number, y: number, z: number, angle: number) => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c + z * s, y, z: -x * s + z * c };
};

const rotateZ = (x: number, y: number, z: number, angle: number) => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c - y * s, y: x * s + y * c, z };
};

const project = (x: number, y: number, z: number) => {
  const scale = FL / (FL + z);
  return { x: x * scale, y: y * scale, scale };
};

const HeroVisual_Suspension: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);
  const cubeRefs = useRef<(SVGPathElement | null)[]>([]);
  const coreRef = useRef<SVGPathElement>(null);

  // Physics State
  const state = useRef({
    mouseX: 0,
    currentSway: 0,
    rotation: 0,
    coreRotation: 0
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    // Normalize -1 to 1
    state.current.mouseX = (e.clientX - rect.left - centerX) / centerX;
  };

  const handleMouseLeave = () => {
    state.current.mouseX = 0;
  };

  // --- RENDER LOOP ---
  useAnimationFrame((t) => {
    if (!containerRef.current) return;
    
    // 1. Update Physics (Smooth Lerp)
    const targetSway = state.current.mouseX * 0.2; // Max sway angle
    state.current.currentSway += (targetSway - state.current.currentSway) * 0.05; // Ease factor
    state.current.rotation = t * 0.0005; // Constant spin
    state.current.coreRotation = t * -0.0008; // Counter-spin for core

    const { currentSway, rotation, coreRotation } = state.current;
    
    // 2. Render Stack (5 Cubes)
    // We pivot around the Center Cube (Index 2) for a "Levitating" feel
    const pivotIndex = 2; 

    for (let i = 0; i < CUBE_COUNT; i++) {
        const r = CUBE_SIZE / 2;
        // Base Vertices
        const verts = [
            { x: -r, y: -r, z: -r }, { x: r, y: -r, z: -r }, { x: r, y: r, z: -r }, { x: -r, y: r, z: -r }, // Front
            { x: -r, y: -r, z: r }, { x: r, y: -r, z: r }, { x: r, y: r, z: r }, { x: -r, y: r, z: r }      // Back
        ];

        // Edges
        const edges = [
            [0,1], [1,2], [2,3], [3,0],
            [4,5], [5,6], [6,7], [7,4],
            [0,4], [1,5], [2,6], [3,7]
        ];

        const yOffset = (i - pivotIndex) * STACK_GAP; // Relative to center

        // Transform
        const projected = verts.map(v => {
            let px = v.x;
            let py = v.y + yOffset;
            let pz = v.z;

            // Rigid Sway (Rotate whole column around Z axis)
            const swayed = rotateZ(px, py, pz, -currentSway); 
            px = swayed.x; py = swayed.y; pz = swayed.z;

            // Global Spin (Y axis)
            const spun = rotateY(px, py, pz, rotation);
            
            return project(spun.x, spun.y, spun.z);
        });

        // Draw Wireframe
        if (cubeRefs.current[i]) {
            let d = "";
            edges.forEach(edge => {
               d += `M ${projected[edge[0]].x} ${projected[edge[0]].y} L ${projected[edge[1]].x} ${projected[edge[1]].y} `;
            });
            cubeRefs.current[i]!.setAttribute('d', d);
            // Dynamic opacity based on sway intensity
            cubeRefs.current[i]!.setAttribute('stroke-opacity', `${0.3 + Math.abs(currentSway)}`);
        }

        // --- RENDER CORE (Wireframe Gold Octahedron/Diamond inside Index 2) ---
        if (i === 2 && coreRef.current) {
            const cr = CUBE_SIZE * 0.35;
            const coreVerts = [
                { x: 0, y: -cr, z: 0 },   // Top
                { x: 0, y: cr, z: 0 },    // Bottom
                { x: -cr, y: 0, z: 0 },   // Left
                { x: cr, y: 0, z: 0 },    // Right
                { x: 0, y: 0, z: -cr },   // Front
                { x: 0, y: 0, z: cr }     // Back
            ];
            
            // Define edges for octahedron (12 edges connecting vertices)
            const coreEdges = [
                [0, 2], [0, 3], [0, 4], [0, 5], // Top to all 4 sides
                [1, 2], [1, 3], [1, 4], [1, 5], // Bottom to all 4 sides
                [2, 4], [2, 5],                  // Left to front/back
                [3, 4], [3, 5]                   // Right to front/back
            ];

            const projectedCore = coreVerts.map(v => {
               // Apply counter-spin rotation (coreRotation)
               let { x, y, z } = rotateY(v.x, v.y, v.z, coreRotation);
               
               // Apply Global Physics (Same as parent)
               let py = y + yOffset;
               const swayed = rotateZ(x, py, z, -currentSway);
               const spun = rotateY(swayed.x, swayed.y, swayed.z, rotation);
               return project(spun.x, spun.y, spun.z);
            });

            // Draw Core Wireframe (edges only)
            let coreD = "";
            coreEdges.forEach(edge => {
                coreD += `M ${projectedCore[edge[0]].x} ${projectedCore[edge[0]].y} L ${projectedCore[edge[1]].x} ${projectedCore[edge[1]].y} `;
            });
            coreRef.current.setAttribute('d', coreD);
        }
    }

    // Shadow Logic
    if (shadowRef.current) {
        // Shadow moves opposite to sway to simulate ground plane perspective
        const sx = currentSway * 100; 
        shadowRef.current.setAttribute('transform', `translate(${sx}, 0)`);
    }
  });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[600px] flex items-center justify-center overflow-visible cursor-crosshair"
    >
      <svg viewBox="-300 -300 600 600" className="w-full h-full overflow-visible pointer-events-none">
        <g transform="translate(0, 50)">
           {/* SHADOW */}
           <ellipse 
             ref={shadowRef}
             cx="0" cy="280" rx="60" ry="10" 
             fill="#1a1a1a" opacity="0.1" 
             style={{ filter: 'blur(8px)', transition: 'transform 0.1s linear' }} 
           />

           {/* WIREFRAME CUBES */}
           {[0, 1, 2, 3, 4].map(i => (
             <path 
               key={i}
               ref={(el) => { cubeRefs.current[i] = el; }}
               fill="none"
               stroke="#1a1a1a"
               strokeWidth="1.2"
               strokeLinecap="round"
               strokeLinejoin="round"
             />
           ))}

           {/* WIREFRAME GOLD CORE (Rendered last to appear inside/on top) */}
           <path 
             ref={coreRef}
             fill="none"
             stroke="#C5A059"
             strokeWidth="1.5"
             strokeLinecap="round"
             strokeLinejoin="round"
             style={{ filter: 'drop-shadow(0 0 6px rgba(197, 160, 89, 0.4))' }}
           />
        </g>
      </svg>
    </div>
  );
};

export default HeroVisual_Suspension;
