import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode, currentView: string }> = ({ children, currentView }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state on route change to trigger animation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800); // 0.8s artificial delay for smoothness
    return () => clearTimeout(timer);
  }, [currentView]);

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Bezier for "Heavy" feel
            className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col items-center justify-center text-[#FFF2EC]"
          >
            {/* The Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs tracking-[0.3em] text-[#C5A059] uppercase mb-4"
            >
              [ SYSTEM_INITIALIZING ]
            </motion.div>

            {/* The Progress Bar */}
            <div className="w-32 h-[1px] bg-[#333] relative overflow-hidden">
                <motion.div 
                    className="absolute inset-0 bg-[#C5A059]"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
            
            {/* The Pathname (Optional Context) */}
            <div className="absolute bottom-12 font-mono text-[9px] text-[#ffffff]/20 uppercase tracking-widest">
                Loading_Module: {currentView === 'landing' ? 'HOME' : currentView.toUpperCase()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Page Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;