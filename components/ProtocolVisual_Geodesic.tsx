
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const PHI = (1 + Math.sqrt(5)) / 2;

const getVertices = () => {
  const v = [];
  v.push([-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0]);
  v.push([0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI]);
  v.push([PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]);
  return v;
};

const faces = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
];

const ProtocolVisual_Geodesic: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);

  useAnimationFrame((t) => {
    setRotation({ x: t * 0.0001, y: t * 0.0002 });
  });

  const project = (p: number[], rX: number, rY: number) => {
    let [x, y, z] = p;
    const cosY = Math.cos(rY);
    const sinY = Math.sin(rY);
    let x2 = x * cosY - z * sinY;
    let z2 = z * cosY + x * sinY;
    const cosX = Math.cos(rX);
    const sinX = Math.sin(rX);
    let y2 = y * cosX - z2 * sinX;
    let z3 = z2 * cosX + y * sinX;
    const scale = 200 / (4 + z3); 
    return { x: x2 * scale, y: y2 * scale, z: z3, scale };
  };

  const vertices = getVertices();

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] flex items-center justify-center relative overflow-hidden cursor-crosshair"
    >
      <svg viewBox="-150 -150 300 300" className="w-full h-full pointer-events-none">
        <g>
          {faces.map((face, i) => {
            const p1_3d = vertices[face[0]];
            const p2_3d = vertices[face[1]];
            const p3_3d = vertices[face[2]];
            const p1 = project(p1_3d, rotation.x, rotation.y);
            const p2 = project(p2_3d, rotation.x, rotation.y);
            const p3 = project(p3_3d, rotation.x, rotation.y);
            const zDepth = (p1.z + p2.z + p3.z) / 3;
            const opacity = zDepth > 0.2 ? 0.1 : 1; 
            
            const isHovered = hoveredFace === i;
            const fillColor = isHovered ? '#E21E3F' : (i % 7 === 0 ? '#C5A059' : 'transparent');
            const fillOpacity = isHovered ? 0.2 : (i % 7 === 0 ? 0.1 : 0);
            
            const centroid = { x: (p1.x+p2.x+p3.x)/3, y: (p1.y+p2.y+p3.y)/3 };
            const scaleFactor = isHovered ? 1.2 : 1;
            
            const pathData = `M ${(p1.x - centroid.x)*scaleFactor + centroid.x},${(p1.y - centroid.y)*scaleFactor + centroid.y} 
                              L ${(p2.x - centroid.x)*scaleFactor + centroid.x},${(p2.y - centroid.y)*scaleFactor + centroid.y} 
                              L ${(p3.x - centroid.x)*scaleFactor + centroid.x},${(p3.y - centroid.y)*scaleFactor + centroid.y} Z`;

            return (
              <motion.path
                key={i}
                d={pathData}
                fill={fillColor}
                fillOpacity={fillOpacity}
                stroke={isHovered ? '#E21E3F' : '#1a1a1a'}
                strokeWidth={isHovered ? 1 : 0.5}
                strokeOpacity={opacity}
                style={{ opacity: opacity === 0.1 ? 0.1 : 1 }} 
                pointerEvents="auto"
                onMouseEnter={() => setHoveredFace(i)}
                onMouseLeave={() => setHoveredFace(null)}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};
export default ProtocolVisual_Geodesic;
