
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ArchitectureVisual_Layers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interaction: 0 = Top (Expanded), 1 = Bottom (Collapsed)
  const mouseY = useMotionValue(0); 
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  // Expansion Logic: Maps mouse Y to vertical spacing between layers
  const spacing = useTransform(smoothMouseY, [0, 1], [110, 15]); 
  
  const y1 = useTransform(spacing, s => s * -1.5);
  const y2 = useTransform(spacing, s => s * -0.5);
  const y3 = useTransform(spacing, s => s * 0.5);
  const y4 = useTransform(spacing, s => s * 1.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = (e.clientY - rect.top) / rect.height;
    mouseY.set(Math.max(0, Math.min(1, relativeY)));
  };

  const handleMouseLeave = () => {
    mouseY.set(0); 
  };

  const W = 260; 
  const H = 130; 

  // --- UPDATED LAYERS FOR ENGINEERING BLUEPRINT ---
  const layers = [
    { 
      id: 'l1', y: y1, color: '#E21E3F', 
      title: 'SYS_01_ACQUISITION', sub: 'The Catchment' 
    },
    { 
      id: 'l2', y: y2, color: '#C5A059', 
      title: 'SYS_02_VELOCITY', sub: 'Automation & AI' 
    },
    { 
      id: 'l3', y: y3, color: '#1a1a1a', 
      title: 'SYS_03_INTELLIGENCE', sub: 'Data & Dashboards' 
    },
    { 
      id: 'l4', y: y4, color: '#1a1a1a', 
      title: 'L4_FOUNDATION', sub: 'Infrastructure' 
    },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-[600px] relative flex items-center justify-center cursor-ns-resize select-none"
    >
      <svg width="100%" height="100%" viewBox="0 0 800 600" className="overflow-visible pointer-events-none">
        <defs>
           <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
           </pattern>
        </defs>

        <g transform="translate(400, 300)">
          
          {/* CENTRAL AXIS SPINE */}
          <motion.line 
            x1="0" 
            y1={useTransform(y1, y => y)} 
            x2="0" 
            y2={useTransform(y4, y => y)} 
            stroke="#1a1a1a" 
            strokeWidth="1" 
            strokeDasharray="4 4"
            opacity="0.3"
          />

          {layers.map((layer) => (
            <motion.g key={layer.id} style={{ y: layer.y }}>
              
              {/* Connector Line to Label (Left Side) */}
              <motion.path 
                d={`M -${W/2} 0 L -220 0`} 
                stroke={layer.color} 
                strokeWidth="1" 
                fill="none"
                opacity="0.6"
              />
              <circle cx="-220" cy="0" r="1.5" fill={layer.color} />
              
              {/* Text Label */}
              <text 
                x="-230" 
                y="4" 
                textAnchor="end" 
                fill={layer.color} 
                className="font-mono text-[11px] font-bold tracking-widest uppercase"
              >
                {layer.title}
              </text>
              <text 
                x="-230" 
                y="18" 
                textAnchor="end" 
                fill={layer.color} 
                className="font-mono text-[9px] tracking-widest uppercase opacity-60"
              >
                {layer.sub}
              </text>

              {/* The Isometric Rhombus Frame */}
              <path 
                d={`M 0 -${H/2} L ${W/2} 0 L 0 ${H/2} L -${W/2} 0 Z`} 
                fill="transparent" 
                stroke={layer.color} 
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Internal Mesh (Grid) */}
              <g opacity="0.25" stroke={layer.color} strokeWidth="1" strokeDasharray="3 3">
                 <path d={`M -${W/2} 0 L ${W/2} 0`} />
                 <path d={`M 0 -${H/2} L 0 ${H/2}`} />
                 <path d={`M 0 -${H/4} L ${W/4} 0 L 0 ${H/4} L -${W/4} 0 Z`} />
              </g>

              {/* Central Node Indicator */}
              <circle cx="0" cy="0" r="2" fill={layer.color} />

            </motion.g>
          ))}
        </g>
        
        {/* Expansion Range Indicator (Right Side) */}
        <g transform="translate(720, 300)" opacity="0.3">
           <line x1="0" y1="-120" x2="0" y2="120" stroke="#1a1a1a" strokeDasharray="2 2" />
           <rect x="-3" y="-10" width="6" height="20" fill="#E21E3F" rx="2">
              <animate attributeName="y" values="-120;100;-120" dur="4s" repeatCount="indefinite" />
           </rect>
           <text x="15" y="0" className="font-mono text-[9px] uppercase tracking-widest fill-black" style={{ writingMode: 'vertical-rl' }}>
              Expansion_Active
           </text>
        </g>

      </svg>
      
      {/* Interactive Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-30">
         <div className="h-8 w-[1px] bg-black/50 mx-auto mb-2" />
         <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
            [ SCROLL VERTICALLY TO INSPECT STACK ]
         </span>
      </div>
    </div>
  );
};

export default ArchitectureVisual_Layers;
