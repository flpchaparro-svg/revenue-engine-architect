import React from 'react';
import { m } from 'framer-motion';

export const VizAcquisition = ({ color = '#E21E3F' }: { color?: string }) => (
  <div className="w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center">
    <div className="absolute w-1.5 h-1.5 rounded-full z-10" style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }} />
    <m.div 
      className="absolute border rounded-full opacity-40" 
      style={{ borderColor: color, width: '40px', height: '40px', borderWidth: '1px' }} 
      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.2, 0.4] }} 
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
    />
    {[0, 1, 2].map((i) => (
      <m.div 
        key={i} 
        className="absolute border rounded-full" 
        style={{ borderColor: color, borderWidth: '0.5px' }} 
        initial={{ width: '100px', height: '100px', opacity: 0 }} 
        animate={{ width: '4px', height: '4px', opacity: [0, 0.8, 0] }} 
        transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "circIn" }} 
      />
    ))}
  </div>
);

export const VizVelocity = ({ color = '#C5A059' }: { color?: string }) => (
  <div className="w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center">
    <div className="absolute w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <m.div 
      className="absolute w-12 h-12 md:w-16 md:h-16 border-dashed rounded-full border-t border-r border-transparent" 
      style={{ borderTopColor: color, borderRightColor: color, borderWidth: '1px' }} 
      animate={{ rotate: 360 }} 
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
    />
    <m.div 
      className="absolute w-20 h-20 md:w-24 md:h-24 border rounded-full opacity-30" 
      style={{ borderColor: color, borderWidth: '1px' }} 
      animate={{ rotate: -360, scale: [1, 1.02, 1] }} 
      transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
    </m.div>
    <m.div 
      className="absolute w-24 h-24 md:w-32 md:h-32 border border-dashed rounded-full opacity-20" 
      style={{ borderColor: color, borderWidth: '1px' }} 
      animate={{ rotate: 360 }} 
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
    />
  </div>
);

export const VizIntelligence = ({ color = '#1a1a1a' }: { color?: string }) => (
  <div className="w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center border rounded-full" style={{ borderColor: `${color}33` }}>
    <div className="absolute w-full h-[1px]" style={{ backgroundColor: `${color}33` }} />
    <div className="absolute h-full w-[1px]" style={{ backgroundColor: `${color}33` }} />
    <m.div 
      className="absolute w-1/2 h-[2px] top-1/2 left-1/2 origin-left" 
      style={{ backgroundColor: color }} 
      animate={{ rotate: 360 }} 
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
    />
    <m.div 
      className="absolute w-2 h-2 rounded-full" 
      style={{ backgroundColor: color, top: '25%', right: '25%' }} 
      animate={{ opacity: [0, 1, 0] }} 
      transition={{ duration: 2, repeat: Infinity }} 
    />
  </div>
);

// --- THIS IS THE FIX ---
// We add this Default Export so TheArchitect.tsx can import it without error.
const ArchitecturePageVisuals = () => {
  return (
    <div className="w-full h-full flex items-center justify-center opacity-80">
      <VizVelocity />
    </div>
  );
};

export default ArchitecturePageVisuals;