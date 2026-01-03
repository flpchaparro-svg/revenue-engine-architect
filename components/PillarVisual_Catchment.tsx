import React from 'react';
import { motion } from 'framer-motion';

const PillarVisual_Catchment: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden select-none">
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px] max-h-[500px]">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFF2EC" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central Pulse */}
        <motion.circle 
          cx="200" cy="200" r="40" 
          fill="url(#grad1)"
          animate={{ r: [40, 60, 40], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Core Node */}
        <circle cx="200" cy="200" r="10" fill="#E21E3F" />
        <circle cx="200" cy="200" r="15" fill="none" stroke="#E21E3F" strokeWidth="1" strokeOpacity="0.5" />

        {/* Concentric Catchment Rings */}
        {[60, 100, 140, 180].map((r, i) => (
          <motion.circle
            key={i}
            cx="200" cy="200" r={r}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            opacity="0.2"
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Incoming Data Streams (Particles moving to center) */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={`p-${i}`}
            r="2"
            fill="#1a1a1a"
            initial={{ opacity: 0, cx: 200, cy: 200 }}
            animate={{ 
              opacity: [0, 1, 0],
              cx: [
                200 + Math.cos(i * 30 * (Math.PI / 180)) * 180, 
                200 
              ],
              cy: [
                200 + Math.sin(i * 30 * (Math.PI / 180)) * 180, 
                200 
              ]
            }}
            transition={{ 
              duration: 2 + Math.random(), 
              repeat: Infinity, 
              ease: "easeIn",
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Labels */}
        <text x="200" y="380" textAnchor="middle" className="font-mono text-[8px] uppercase tracking-[0.3em] fill-black/20">
          [ ACTIVE_LISTENING_PROTOCOL ]
        </text>
      </svg>
    </div>
  );
};

export default PillarVisual_Catchment;