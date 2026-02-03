import React from 'react';
import { m } from 'framer-motion';

const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'synthetic' && (
        // ANIMATION: "The Clone"
        <div className="relative flex items-center justify-center gap-4">
            {/* The Source (Real) */}
            <div className="w-8 h-8 border border-gold rounded-full flex items-center justify-center bg-dark z-10">
               <div className="w-2 h-2 bg-gold rounded-full" />
            </div>
            
            {/* The Transfer */}
            <div className="w-12 h-[1px] bg-gold/30 overflow-hidden relative">
               <m.div 
                 animate={{ x: [-48, 48] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 bottom-0 w-1/3 bg-gold"
               />
            </div>

            {/* The Clone (Digital) */}
            <m.div 
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-8 h-8 border border-gold border-dashed rounded-full flex items-center justify-center bg-dark z-10"
            >
               <div className="w-2 h-2 bg-gold rounded-full" />
            </m.div>
        </div>
      )}

      {tierKey === 'authority' && (
        // ANIMATION: "The Network"
        <div className="relative w-24 h-24 flex items-center justify-center">
             {/* Center Node */}
             <div className="w-3 h-3 bg-gold rounded-full z-10" />
             
             {/* Satellite Nodes */}
             {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{ rotate: `${deg}deg` }}
                >
                   <div className="w-[1px] h-8 bg-gold/30 absolute top-1/2 left-1/2 origin-top -translate-x-1/2" />
                   <div className="w-1.5 h-1.5 border border-gold rounded-full absolute top-[85%] bg-dark" />
                </m.div>
             ))}
        </div>
      )}

      {tierKey === 'distribution' && (
        // ANIMATION: "The Broadcast"
        <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 bg-gold rounded-sm z-10" />
            
            {[0, 1, 2].map((i) => (
                <m.div 
                   key={i}
                   initial={{ width: 10, height: 10, opacity: 1 }}
                   animate={{ width: 80, height: 80, opacity: 0 }}
                   transition={{ duration: 2, delay: i * 0.6, repeat: Infinity, ease: "easeOut" }}
                   className="absolute border border-gold rounded-sm"
                />
            ))}
        </div>
      )}

      {tierKey === 'terminal' && (
        // ANIMATION: "The Launch"
        <div className="relative h-20 w-12 border-x border-gold/20 flex justify-center overflow-hidden">
            <m.div 
               animate={{ y: [-80, 80] }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               className="w-1 h-8 bg-gold"
            />
            {/* Landing Pad */}
            <div className="absolute bottom-0 w-8 h-[2px] bg-gold" />
        </div>
      )}
    </div>
  );
};

export default TierVisual;
