
import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';

// Musical Intervals (Ratios)
const HARMONICS = [
  { ratio: 1.0, label: 'UNISON', ratioLabel: '1:1', name: 'PERFECT UNISON' },
  { ratio: 1.2, label: 'MINOR 3RD', ratioLabel: '6:5', name: 'MINOR THIRD' },
  { ratio: 1.25, label: 'MAJOR 3RD', ratioLabel: '5:4', name: 'MAJOR THIRD' },
  { ratio: 1.333, label: 'PERFECT 4TH', ratioLabel: '4:3', name: 'PERFECT FOURTH' },
  { ratio: 1.5, label: 'PERFECT 5TH', ratioLabel: '3:2', name: 'PERFECT FIFTH' },
  { ratio: 1.6, label: 'MINOR 6TH', ratioLabel: '8:5', name: 'MINOR SIXTH' },
  { ratio: 2.0, label: 'OCTAVE', ratioLabel: '2:1', name: 'PERFECT OCTAVE' },
  { ratio: 2.5, label: 'MAJOR 10TH', ratioLabel: '5:2', name: 'MAJOR TENTH' },
  { ratio: 3.0, label: 'TWELFTH', ratioLabel: '3:1', name: 'PERFECT TWELFTH' }
];

const AboutVisual_Harmony: React.FC = () => {
  const [activeHarmonic, setActiveHarmonic] = useState<typeof HARMONICS[0] | null>(null);
  
  // Motion values for smooth interaction
  const mouseX = useMotionValue(0.5); 
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  // Capture mouse relative to window to drive the ratio from 1.0 to 3.0
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map screen width to ratio range 1.0 -> 3.0
      const x = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      mouseX.set(x);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  // Animation Loop
  useAnimationFrame((t) => {
    const time = t * 0.001; // Seconds
    const inputX = smoothX.get();
    
    // Calculate Target Ratio based on mouse
    // Range: 1.0 to 3.0
    let rawRatio = 1.0 + inputX * 2.0;
    
    // Resonance Check (Snap logic)
    let currentRatio = rawRatio;
    let harmonicFound = null;

    for (const h of HARMONICS) {
        const dist = Math.abs(rawRatio - h.ratio);
        const threshold = 0.05; // Snap range
        if (dist < threshold) {
            harmonicFound = h;
            // Magnetic snap effect
            const pull = 1 - (dist / threshold); 
            currentRatio = rawRatio + (h.ratio - rawRatio) * pull * 0.8; 
            break;
        }
    }

    if (harmonicFound?.label !== activeHarmonic?.label) {
        setActiveHarmonic(harmonicFound);
    }

    // Lissajous Math
    // x = A * sin(at + delta)
    // y = A * sin(bt)
    // ratio = a/b
    
    const freqBase = 1.5; // Base speed
    const freqX = freqBase * currentRatio; 
    const freqY = freqBase; 
    const phase = time * 0.5; // Slowly rotating phase for 3D feel
    
    // Canvas dimensions (virtual 200x200 space centered at 100,100)
    const cx = 100;
    const cy = 100;
    const radius = 70;

    // Amplitude Modulation (Breathing effect)
    // If chaotic, amplitude jitters. If harmonic, it breathes slowly.
    const ampNoise = harmonicFound ? 0 : (Math.sin(time * 20) * 2);
    const currentRadius = radius + ampNoise;

    const resolution = 300; 
    const loops = 4 * Math.PI; // How much of the curve to draw
    
    let d = `M`;
    let first = true;
    
    // Draw the trail
    for (let i = 0; i <= resolution; i++) {
        const angle = (i / resolution) * loops;
        
        const tStep = time - (angle * 0.5); // Trail behind current time
        
        const x = cx + currentRadius * Math.sin(freqX * tStep + phase);
        const y = cy + currentRadius * Math.sin(freqY * tStep);
        
        if (first) {
            d += ` ${x} ${y}`;
            first = false;
        } else {
            d += ` L ${x} ${y}`;
        }
    }

    // Update Paths
    if (pathRef.current) {
        pathRef.current.setAttribute('d', d);
        if (harmonicFound) {
            pathRef.current.setAttribute('stroke', '#C5A059'); // Gold
            pathRef.current.setAttribute('stroke-width', '2');
            pathRef.current.setAttribute('stroke-opacity', '1');
        } else {
            pathRef.current.setAttribute('stroke', '#1a1a1a'); // Ink
            pathRef.current.setAttribute('stroke-width', '0.5'); // Thin scribbles
            pathRef.current.setAttribute('stroke-opacity', '0.3');
        }
    }
    
    // Glow path (duplicate for bloom effect on resonance)
    if (glowRef.current) {
        if (harmonicFound) {
             glowRef.current.setAttribute('d', d);
             glowRef.current.style.opacity = '0.4';
        } else {
             glowRef.current.style.opacity = '0';
        }
    }

    // Head Node
    if (nodeRef.current) {
        const nx = cx + currentRadius * Math.sin(freqX * time + phase);
        const ny = cy + currentRadius * Math.sin(freqY * time);
        
        nodeRef.current.setAttribute('cx', nx.toString());
        nodeRef.current.setAttribute('cy', ny.toString());
        
        if (harmonicFound) {
            nodeRef.current.setAttribute('fill', '#C5A059');
            nodeRef.current.setAttribute('r', '4');
        } else {
            nodeRef.current.setAttribute('fill', '#E21E3F'); // Red/Friction when chaotic
            nodeRef.current.setAttribute('r', '2');
        }
    }

  });

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent select-none cursor-crosshair">
       <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <defs>
             <filter id="glow-gold">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
             </filter>
          </defs>

          {/* Glow Layer */}
          <path 
             ref={glowRef}
             fill="none"
             stroke="#C5A059"
             strokeWidth="4"
             strokeLinecap="round"
             style={{ transition: 'opacity 0.2s ease' }}
             filter="url(#glow-gold)"
          />

          {/* Main Curve */}
          <path 
             ref={pathRef}
             fill="none"
             strokeLinecap="round"
             strokeLinejoin="round"
             style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }}
          />

          {/* Leading Node */}
          <circle ref={nodeRef} />
       </svg>

       {/* Harmonic UI Overlay */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center w-full">
           <motion.div 
             className="text-center"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ 
                 opacity: activeHarmonic ? 1 : 0,
                 scale: activeHarmonic ? 1 : 0.9,
                 y: activeHarmonic ? 0 : 10
             }}
             transition={{ duration: 0.3 }}
           >
              <div className="text-[10px] font-mono text-[#C5A059] tracking-[0.4em] uppercase font-bold mb-2">
                 HARMONIC_LOCK
              </div>
              <div className="text-5xl md:text-6xl font-serif text-[#1a1a1a] mix-blend-multiply opacity-20">
                 {activeHarmonic ? activeHarmonic.ratioLabel : ""}
              </div>
              <div className="text-xs font-sans text-[#1a1a1a] tracking-widest mt-1 uppercase opacity-60">
                 {activeHarmonic ? activeHarmonic.name : ""}
              </div>
           </motion.div>
       </div>
       
       {/* Instruction Label (Fade out when harmonic found) */}
       <motion.div 
         className="absolute bottom-6 left-0 w-full text-center pointer-events-none"
         animate={{ opacity: activeHarmonic ? 0 : 0.4 }}
       >
          <span className="font-mono text-[9px] text-[#1a1a1a] uppercase tracking-[0.2em]">
             [ MOVE CURSOR TO SYNC FREQUENCIES ]
          </span>
       </motion.div>
    </div>
  );
};

export default AboutVisual_Harmony;
