import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'concierge' && (
        // ANIMATION: "The Smart Filter"
        <div className="relative flex flex-col items-center">
            {/* Incoming Stream */}
            <div className="relative h-12 w-24 overflow-hidden mb-2">
                {[...Array(6)].map((_, i) => (
                   <motion.div
                     key={i}
                     initial={{ y: -20, opacity: 0 }}
                     animate={{ y: 40, opacity: [0, 1, 0] }}
                     transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                     className="absolute w-1.5 h-1.5 rounded-full"
                     style={{ left: `${20 + i * 12}%`, backgroundColor: i % 2 === 0 ? 'rgba(26,26,26,0.2)' : '#C5A059' }}
                   />
                ))}
            </div>
            
            {/* The Filter Gate */}
            <div className="w-16 h-1 bg-[#C5A059] rounded-full shadow-[0_0_15px_#C5A059]" />
            
            {/* Outgoing Stream (Pure Gold) */}
            <div className="relative h-12 w-24 overflow-hidden mt-2">
                 <motion.div
                     animate={{ y: [0, 30], opacity: [1, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity }}
                     className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C5A059] rounded-full"
                 />
            </div>
        </div>
      )}

      {tierKey === 'analyst' && (
        // ANIMATION: "The Scanner"
        <div className="relative w-24 h-16 grid grid-cols-6 gap-1">
             {[...Array(18)].map((_, i) => (
                <div key={i} className="w-full h-full bg-[#C5A059]/10 rounded-[1px]" />
             ))}
             {/* The Scanning Beam */}
             <motion.div 
               animate={{ left: ["0%", "100%", "0%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent"
             />
             {/* The "Found" Answer */}
             <motion.div 
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#C5A059] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#C5A059]"
             />
        </div>
      )}

      {tierKey === 'voice' && (
        // ANIMATION: "The Waveform"
        <div className="flex gap-1 items-center h-16">
            {[...Array(5)].map((_, i) => (
                <motion.div 
                   key={i}
                   animate={{ height: [10, 40, 10] }}
                   transition={{ 
                     duration: 0.8, 
                     repeat: Infinity, 
                     delay: i * 0.1,
                     ease: "easeInOut"
                   }}
                   className="w-2 bg-[#C5A059] rounded-full"
                />
            ))}
        </div>
      )}

      {tierKey === 'custom' && (
        // ANIMATION: "The Vault"
        <div className="relative flex items-center justify-center w-24 h-24">
            {/* The Core */}
            <div className="absolute w-3 h-3 bg-[#C5A059] rounded-sm z-10" />
            
            {/* Rotating Shield 1 */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute w-12 h-12 border-2 border-[#C5A059]/40 rounded-sm"
            />
             {/* Rotating Shield 2 */}
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="absolute w-16 h-16 border border-[#C5A059]/20 rounded-full border-t-[#C5A059]"
            />
        </div>
      )}
    </div>
  );
};

export default TierVisual;
