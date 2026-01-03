import React from 'react';
import { motion } from 'framer-motion';

const PillarVisual_Helix: React.FC = () => {
  // Generate points for the double helix
  const points = 20;
  const strands = Array.from({ length: points }, (_, i) => i);

  return (
    <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden">
      
      <div className="relative w-[200px] h-[400px]">
         {strands.map((i) => (
           <React.Fragment key={i}>
             {/* Strand A Node */}
             <motion.div
               className="absolute w-3 h-3 bg-[#1a1a1a] rounded-full"
               initial={{ x: 0, scale: 1, opacity: 1 }}
               animate={{ 
                 x: [Math.sin(i * 0.5) * 60, Math.sin(i * 0.5 + Math.PI) * 60, Math.sin(i * 0.5 + Math.PI * 2) * 60],
                 zIndex: [10, 0, 10],
                 scale: [1, 0.8, 1],
                 opacity: [1, 0.5, 1]
               }}
               transition={{ 
                 duration: 4, 
                 repeat: Infinity, 
                 ease: "linear",
                 delay: i * -0.2 // Stagger the delay to create the wave
               }}
               style={{ top: `${(i / points) * 100}%`, left: '50%' }}
             />

             {/* Strand B Node (Opposite Phase) */}
             <motion.div
               className="absolute w-3 h-3 bg-[#1a1a1a] rounded-full"
               initial={{ x: 0, scale: 1, opacity: 1 }}
               animate={{ 
                 x: [Math.sin(i * 0.5 + Math.PI) * 60, Math.sin(i * 0.5 + Math.PI * 2) * 60, Math.sin(i * 0.5 + Math.PI * 3) * 60],
                 zIndex: [0, 10, 0],
                 scale: [0.8, 1, 0.8],
                 opacity: [0.5, 1, 0.5]
               }}
               transition={{ 
                 duration: 4, 
                 repeat: Infinity, 
                 ease: "linear",
                 delay: i * -0.2 
               }}
               style={{ top: `${(i / points) * 100}%`, left: '50%' }}
             />

             {/* Connector Line (The Base Pair) */}
             <motion.div 
                className="absolute h-[1px] bg-[#C5A059] origin-center"
                animate={{ 
                    width: [120, 0, 120], // Appears to rotate as nodes cross
                    opacity: [1, 0.2, 1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * -0.2
                }}
                style={{ top: `${(i / points) * 100 + 1.5}%`, left: '50%', x: '-50%' }}
             />
           </React.Fragment>
         ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#1a1a1a]/30 uppercase tracking-widest pointer-events-none">
        [ CULTURAL_DNA // SEQUENCING ]
      </div>
    </div>
  );
};

export default PillarVisual_Helix;