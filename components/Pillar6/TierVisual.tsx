import React from 'react';
import { m } from 'framer-motion';

const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'media' && (
        // ANIMATION: "The Audio Wave"
        <div className="flex items-center gap-1 h-12">
            {[1, 2, 4, 3, 5, 4, 2, 1, 3, 5, 2].map((h, i) => (
                <m.div 
                    key={i}
                    className="w-1.5 bg-gold rounded-full"
                    animate={{ height: [10, h * 8, 10] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                />
            ))}
        </div>
      )}

      {tierKey === 'matrix' && (
        // ANIMATION: "The QR Scan"
        <div className="relative w-20 h-20 border-2 border-gold p-1 flex flex-wrap gap-1 content-start rounded-sm">
             {/* QR Dots */}
             {[...Array(16)].map((_, i) => (
                <m.div 
                    key={i}
                    className="w-3.5 h-3.5 bg-gold/20 rounded-[1px]"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, delay: Math.random(), repeat: Infinity }}
                />
             ))}
             {/* Scanning Line */}
             <m.div 
               animate={{ top: ['0%', '100%', '0%'] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 w-full h-[2px] bg-gold shadow-[0_0_10px_var(--gold)]"
             />
        </div>
      )}

      {tierKey === 'visuals' && (
        // ANIMATION: "The Diagram"
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Top Node */}
            <div className="w-6 h-6 border border-gold flex items-center justify-center absolute top-2">
                <div className="w-1.5 h-1.5 bg-gold" />
            </div>
            {/* Lines */}
            <div className="absolute w-[1px] h-8 bg-gold/40 top-8" />
            <div className="absolute w-16 h-[1px] bg-gold/40 top-16" />
            <div className="absolute w-[1px] h-4 bg-gold/40 top-16 left-[calc(50%-32px)]" />
            <div className="absolute w-[1px] h-4 bg-gold/40 top-16 right-[calc(50%-32px)]" />
            
            {/* Bottom Nodes */}
            <m.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-4 h-4 bg-gold absolute top-[72px] left-[calc(50%-40px)] rounded-sm" 
            />
            <div className="w-4 h-4 border border-gold absolute top-[72px] right-[calc(50%-40px)] rounded-sm" />
        </div>
      )}

      {tierKey === 'analyst' && (
        // ANIMATION: "The Knowledge Node"
        <div className="relative w-full h-full flex items-center justify-center">
            <m.div 
                className="w-10 h-10 bg-dark border border-gold rounded-full z-10 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <div className="w-3 h-3 bg-gold rounded-full shadow-[0_0_15px_var(--gold)]" />
            </m.div>
            <m.div 
                className="absolute w-20 h-20 border border-gold/20 rounded-full border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
             <m.div 
                className="absolute w-28 h-28 border border-gold/10 rounded-full"
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </div>
      )}
    </div>
  );
};

export default TierVisual;
