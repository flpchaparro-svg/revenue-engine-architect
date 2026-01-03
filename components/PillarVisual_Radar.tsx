import React from 'react';
import { motion } from 'framer-motion';

const PillarVisual_Radar: React.FC = () => {
  return (
    <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden">
      
      {/* Radar Grid Circles */}
      {[100, 200, 300, 400].map((size, i) => (
        <div 
            key={i}
            className="absolute rounded-full border border-[#1a1a1a]/10"
            style={{ width: size, height: size }}
        />
      ))}
      
      {/* Crosshairs */}
      <div className="absolute w-[400px] h-[1px] bg-[#1a1a1a]/10" />
      <div className="absolute h-[400px] w-[1px] bg-[#1a1a1a]/10" />

      {/* The Sweep Line */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200px] h-[200px] origin-bottom-right"
        style={{ 
            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(197, 160, 89, 0.2) 360deg)',
            top: 'calc(50% - 200px)',
            left: 'calc(50% - 200px)',
            borderRight: '1px solid #C5A059'
        }}
      />

      {/* Blips (Data Points) */}
      {[
          { x: 50, y: -80, delay: 0.5 },
          { x: -120, y: 40, delay: 1.2 },
          { x: 80, y: 100, delay: 2.5 },
          { x: -60, y: -150, delay: 3.0 }
      ].map((blip, i) => (
          <motion.div
             key={i}
             className="absolute w-2 h-2 bg-[#C5A059] rounded-full shadow-[0_0_10px_#C5A059]"
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
             transition={{ duration: 2, repeat: Infinity, delay: blip.delay }}
             style={{ marginLeft: blip.x, marginTop: blip.y }}
          />
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#1a1a1a]/30 uppercase tracking-widest pointer-events-none">
        [ SENSOR_ARRAY // SCANNING ]
      </div>
    </div>
  );
};

export default PillarVisual_Radar;