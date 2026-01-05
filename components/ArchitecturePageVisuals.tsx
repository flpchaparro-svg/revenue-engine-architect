import React from 'react';
import { motion } from 'framer-motion';

export const VizAcquisition = ({ color }: { color: string }) => (
  <div className="w-32 h-32 relative flex items-center justify-center">
    <div className="absolute w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        className="absolute inset-0 border rounded-full"
        style={{ borderColor: color }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.5, 0], scale: [0.5, 1, 1.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
      />
    ))}
  </div>
);

export const VizVelocity = ({ color }: { color: string }) => (
  <div className="w-32 h-32 relative flex items-center justify-center" style={{ perspective: '800px' }}>
    <div className="absolute w-2.5 h-2.5 rounded-full shadow-[0_0_15px_currentColor]" style={{ backgroundColor: color, color: color }} />
    <motion.div
      className="absolute w-24 h-24 border rounded-full"
      style={{ borderColor: color, borderWidth: '1px' }}
      animate={{ rotateY: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
       <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
    </motion.div>
    <motion.div
      className="absolute w-28 h-28 border rounded-full"
      style={{ borderColor: color, borderWidth: '1px' }}
      animate={{ rotateX: 360, rotateZ: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute w-28 h-28 border rounded-full opacity-60"
      style={{ borderColor: color, borderWidth: '1px' }}
      animate={{ rotateX: -360, rotateY: 180 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export const VizIntelligence = ({ color }: { color: string }) => (
  <div className="w-32 h-32 relative flex items-center justify-center border rounded-full" style={{ borderColor: `${color}33` }}>
    <div className="absolute w-full h-[1px]" style={{ backgroundColor: `${color}33` }} />
    <div className="absolute h-full w-[1px]" style={{ backgroundColor: `${color}33` }} />
    <motion.div
      className="absolute w-1/2 h-[2px] top-1/2 left-1/2 origin-left"
      style={{ backgroundColor: color }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ backgroundColor: color, top: '25%', right: '25%' }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

