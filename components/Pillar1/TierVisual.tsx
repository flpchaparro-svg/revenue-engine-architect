import React from 'react';
import { m } from 'framer-motion';

const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'velocity' && (
        <div className="relative flex items-center gap-2">
            <m.div
                animate={{ x: [40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-r from-transparent to-red-solid"
            />
            <m.div
                animate={{ x: [40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-r from-transparent to-red-solid absolute left-0"
            />
            
            <div className="relative w-4 h-4 bg-dark border border-red-solid rotate-45 z-10 flex items-center justify-center shadow-[0_0_15px_var(--red-solid)]">
                <div className="w-1.5 h-1.5 bg-red-solid" />
            </div>

            <m.div
                animate={{ x: [-40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-l from-transparent to-red-solid"
            />
             <m.div
                animate={{ x: [-40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "linear" }}
                className="w-16 h-[2px] bg-gradient-to-l from-transparent to-red-solid absolute right-0"
            />
        </div>
      )}

      {tierKey === 'retail' && (
        <div className="relative w-24 h-24 flex items-center justify-center">
             <m.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute w-16 h-16 border border-red-solid/40 rounded-full border-t-red-solid"
             />
             <m.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="absolute w-10 h-10 border border-red-solid/60 rounded-full border-b-red-solid"
             />
             <div className="w-1.5 h-1.5 bg-red-solid rounded-full shadow-[0_0_10px_var(--red-solid)]" />
        </div>
      )}

      {tierKey === 'performance' && (
        <div className="flex items-end gap-2 h-16 pb-0">
            <m.div animate={{ height: [10, 30, 10] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 bg-red-solid/30 rounded-t-sm" />
            <m.div animate={{ height: [20, 50, 20] }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} className="w-1.5 bg-red-solid/60 rounded-t-sm" />
            <m.div animate={{ height: [30, 60, 30] }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} className="w-1.5 bg-red-solid rounded-t-sm shadow-[0_0_10px_var(--red-solid)]" />
            <m.div animate={{ height: [15, 40, 15] }} transition={{ duration: 1.5, delay: 0.1, repeat: Infinity }} className="w-1.5 bg-red-solid/40 rounded-t-sm" />
        </div>
      )}

      {tierKey === 'flagship' && (
        <div className="perspective-500">
            <m.div 
              animate={{ rotateY: 360, rotateX: 180 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border border-red-solid/80 relative transform-style-3d flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
               <div className="absolute inset-0 border border-red-solid/20 rotate-45" />
            </m.div>
        </div>
      )}
    </div>
  );
};

export default TierVisual;
