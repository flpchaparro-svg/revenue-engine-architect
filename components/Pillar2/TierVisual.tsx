import React from 'react';
import { m } from 'framer-motion';
import { Users, RefreshCw } from 'lucide-react';

const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'capture' && (
        // ANIMATION: "The Funnel"
        <div className="relative flex flex-col items-center">
            {/* Particles falling in */}
            {[...Array(6)].map((_, i) => (
                <m.div 
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[#E21E3F] rounded-full"
                    initial={{ y: -40, x: (Math.random() - 0.5) * 40, opacity: 0 }}
                    animate={{ y: [ -40, 0, 40 ], x: [ (Math.random() - 0.5) * 40, 0, 0 ], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
            ))}
            {/* Funnel Shape */}
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#E21E3F]/20 mb-1" />
            <div className="w-1.5 h-10 bg-[#E21E3F]/40 rounded-sm" />
        </div>
      )}

      {tierKey === 'nurture' && (
        // ANIMATION: "The Tag"
        <div className="relative flex items-center gap-2">
             <div className="w-10 h-10 border border-[#E21E3F] rounded-full flex items-center justify-center bg-[#1a1a1a]">
                <Users className="w-4 h-4 text-[#B91C36]" />
             </div>
             {/* Tag appearing */}
             <m.div 
               animate={{ x: [ -10, 0 ], opacity: [0, 1] }}
               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
               className="px-2 py-1 bg-[#E21E3F] text-[8px] font-mono text-[#1a1a1a] font-bold rounded-sm"
             >
                TAG: VIP
             </m.div>
        </div>
      )}

      {tierKey === 'pipeline' && (
        // ANIMATION: "The Stages"
        <div className="flex gap-2 items-center">
            <div className="w-8 h-12 border border-[#E21E3F]/20 rounded-sm" />
            <div className="w-8 h-12 border border-[#E21E3F]/40 rounded-sm flex items-center justify-center">
                <m.div 
                    className="w-4 h-4 bg-[#E21E3F] rounded-sm"
                    animate={{ x: [ -40, 0, 40 ], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <div className="w-8 h-12 border border-[#E21E3F] rounded-sm shadow-[0_0_10px_#E21E3F]" />
        </div>
      )}

      {tierKey === 'revops' && (
        // ANIMATION: "The Sync"
        <div className="relative w-16 h-16">
            <m.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-[#E21E3F]/30 rounded-full border-t-[#E21E3F]"
            />
            <div className="absolute inset-2 border border-[#E21E3F]/10 rounded-full flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-[#B91C36]" />
            </div>
        </div>
      )}
    </div>
  );
};

export default TierVisual;
