import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu } from 'lucide-react';

const TierVisual = ({ tierKey }: { tierKey: string }) => {
  return (
    <div className="h-32 w-full mb-6 flex items-center justify-center relative bg-transparent">
      
      {tierKey === 'linear' && (
        // ANIMATION: Linear Connection (A -> B)
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 border border-[#E21E3F]/40 rounded-sm bg-[#1a1a1a] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#E21E3F] rounded-full" />
            </div>
            <motion.div 
                className="w-16 h-[2px] bg-[#E21E3F]/20 relative overflow-hidden"
            >
                <motion.div 
                    className="absolute top-0 left-0 w-8 h-full bg-[#E21E3F]"
                    animate={{ x: [-32, 64] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
            <div className="w-8 h-8 border border-[#E21E3F] rounded-sm bg-[#1a1a1a] flex items-center justify-center shadow-[0_0_15px_rgba(226,30,63,0.3)]">
                <Zap className="w-4 h-4 text-[#E21E3F]" />
            </div>
        </div>
      )}

      {tierKey === 'logic' && (
        // ANIMATION: Branching Logic
        <div className="relative w-32 h-20 flex items-center">
             <div className="absolute left-0 w-2 h-2 bg-[#E21E3F] rounded-full" />
             <svg className="w-full h-full overflow-visible">
                <motion.path 
                    d="M 10 40 L 40 40 L 60 10 L 100 10" 
                    fill="none" 
                    stroke="#E21E3F" 
                    strokeWidth="2"
                    strokeOpacity="0.3"
                />
                <motion.path 
                    d="M 10 40 L 40 40 L 60 70 L 100 70" 
                    fill="none" 
                    stroke="#E21E3F" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
             </svg>
             <div className="absolute right-0 top-2 w-2 h-2 border border-[#E21E3F] rounded-full" />
             <div className="absolute right-0 bottom-2 w-2 h-2 bg-[#E21E3F] rounded-full shadow-[0_0_10px_#E21E3F]" />
        </div>
      )}

      {tierKey === 'engine' && (
        // ANIMATION: The Engine (Rotating Gears/Cycle)
        <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div 
               className="absolute inset-0 border-2 border-[#E21E3F]/20 rounded-full border-t-[#E21E3F]"
               animate={{ rotate: 360 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
               className="absolute inset-4 border-2 border-[#E21E3F]/40 rounded-full border-b-[#E21E3F]"
               animate={{ rotate: -360 }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <Cpu className="w-8 h-8 text-[#E21E3F]" />
        </div>
      )}

      {tierKey === 'autonomous' && (
        // ANIMATION: AI Network
        <div className="relative w-24 h-24 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
                <motion.div 
                    key={i}
                    className="w-full h-full bg-[#E21E3F]/10 rounded-full"
                    animate={{ backgroundColor: ["rgba(226,30,63,0.1)", "rgba(226,30,63,0.8)", "rgba(226,30,63,0.1)"] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
            ))}
        </div>
      )}
    </div>
  );
};

export default TierVisual;
