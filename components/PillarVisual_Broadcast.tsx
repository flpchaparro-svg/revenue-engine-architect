import React from 'react';
import { motion } from 'framer-motion';

const PillarVisual_Broadcast: React.FC = () => {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden">
      
      {/* Central Source */}
      <div className="relative z-10 w-4 h-4 bg-[#C5A059] rounded-full shadow-[0_0_30px_rgba(197,160,89,0.8)]" />
      <motion.div 
         animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.4, 0.8] }}
         transition={{ duration: 2, repeat: Infinity }}
         className="absolute z-10 w-12 h-12 border border-[#C5A059] rounded-full"
      />

      {/* Broadcast Waves */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0.5, 0], scale: 2.5 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut"
          }}
          className="absolute border border-[#1a1a1a] rounded-full w-[200px] h-[200px]"
          style={{ borderWidth: '1px' }}
        />
      ))}

      {/* Satellite Nodes (The Channels) */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 180;
        const y = Math.sin(rad) * 180;
        
        return (
            <motion.div 
                key={i}
                className="absolute w-2 h-2 bg-[#1a1a1a] rounded-full"
                style={{ x, y }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
        );
      })}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#1a1a1a]/30 uppercase tracking-widest pointer-events-none">
        [ SIGNAL_PROPAGATION // ACTIVE ]
      </div>
    </div>
  );
};

export default PillarVisual_Broadcast;