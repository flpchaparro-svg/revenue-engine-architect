import React from 'react';
import { motion } from 'framer-motion';

const PillarVisual_Turbine: React.FC = () => {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden">
      
      {/* Outer Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] border border-[#1a1a1a]/20 rounded-full border-dashed"
      />
      
      {/* Middle Ring (Counter-Rotate) */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[280px] h-[280px] border border-[#1a1a1a]/40 rounded-full flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-[#1a1a1a] rounded-full absolute top-0" />
        <div className="w-2 h-2 bg-[#1a1a1a] rounded-full absolute bottom-0" />
      </motion.div>

      {/* Inner Ring (Fast) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute w-[180px] h-[180px] border-2 border-[#1a1a1a] rounded-full border-t-transparent border-l-transparent"
      />

      {/* The Core (Pulsing) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-12 h-12 bg-[#C5A059] rounded-full blur-sm"
      />
      <div className="absolute w-8 h-8 bg-[#C5A059] rounded-full" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#1a1a1a]/30 uppercase tracking-widest pointer-events-none">
        [ KINETIC_ENGINE // ONLINE ]
      </div>
    </div>
  );
};

export default PillarVisual_Turbine;