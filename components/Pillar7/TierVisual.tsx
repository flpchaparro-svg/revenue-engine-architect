import React from 'react';
import { m } from 'framer-motion';

const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'pulse' && (
        // ANIMATION: "The Pulse" - White bars on dark bg
        <div className="flex items-end gap-1 h-16 w-24">
            {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8].map((h, i) => (
                <m.div 
                    key={i}
                    className="w-full bg-white rounded-t-sm"
                    animate={{ height: [`${h * 40}%`, `${h * 100}%`, `${h * 40}%`] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                />
            ))}
        </div>
      )}

      {tierKey === 'lab' && (
        // ANIMATION: "The Heatmap" - White/Transparent grid
        <div className="relative w-24 h-24 grid grid-cols-4 grid-rows-4 gap-1">
             {[...Array(16)].map((_, i) => (
                <m.div 
                    key={i}
                    className="bg-white/10 rounded-[1px]"
                    animate={{ backgroundColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.1)"] }}
                    transition={{ duration: 2, delay: Math.random(), repeat: Infinity }}
                />
             ))}
             <m.div 
                className="absolute w-3 h-3 border border-white rounded-full bg-white z-10"
                animate={{ x: [0, 60, 20, 0], y: [0, 20, 60, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             />
        </div>
      )}

      {tierKey === 'oracle' && (
        // ANIMATION: "The Forecast" - White lines
        <div className="relative w-32 h-16">
            <svg className="w-full h-full overflow-visible">
                {/* Historical Data (Solid) */}
                <m.path
                    d="M 0 60 L 40 40 L 70 50"
                    fill="none"
                    stroke="var(--white)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                />
                {/* Prediction (Dashed) */}
                <m.path
                    d="M 70 50 L 100 20 L 130 10"
                    fill="none"
                    stroke="var(--white)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-pulse" style={{ right: '-5px', top: '8px' }} />
            </svg>
        </div>
      )}

      {tierKey === 'tower' && (
        // ANIMATION: "The Control Tower" - White structure
        <div className="relative flex items-center justify-center w-24 h-24">
            {/* Center */}
            <div className="w-6 h-6 border border-white bg-dark z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-white" />
            </div>
            
            {/* Connections */}
            {[0, 90, 180, 270].map((deg, i) => (
                <m.div 
                    key={i}
                    className="absolute w-12 h-[1px] bg-white/40 origin-left left-1/2 top-1/2"
                    style={{ rotate: deg }}
                >
                    <m.div 
                        className="w-2 h-2 bg-white rounded-full absolute right-0 -top-1"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                    />
                </m.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TierVisual;
