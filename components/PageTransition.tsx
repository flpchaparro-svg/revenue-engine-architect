import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode, currentView: string }> = ({ children, currentView }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Smart Session Check: Only show preloader on first visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('revenue-engine-visited');
    
    if (!hasVisited) {
      // First visit: Show preloader
      setIsLoading(true);
      sessionStorage.setItem('revenue-engine-visited', 'true');
    } else {
      // Returning/Navigating: Skip preloader
      setIsLoading(false);
    }
  }, []); // Only run once on mount, not on route changes

  const handleAnimationComplete = () => {
    // Exit animation complete: Hide preloader
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="signature-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleAnimationComplete}
            className="fixed inset-0 z-[9999] bg-[#FFF2EC] flex flex-col items-center justify-center"
          >
            {/* Container for centered content */}
            <div className="relative w-full max-w-2xl px-8 flex flex-col items-center justify-center">
              
              {/* The Red Line - Draws horizontally */}
              <div className="relative w-full h-[1px] mb-8">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.2
                  }}
                  className="absolute inset-0 origin-left bg-[#E21E3F]"
                  style={{ transformOrigin: 'left center' }}
                />
                
                {/* Gold Square - Pops in at the end */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.34, 1.56, 0.64, 1], // Pop effect
                    delay: 1.4 // After line finishes
                  }}
                  className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[6px] h-[6px] bg-[#C5A059]"
                />
              </div>

              {/* The Text - Fades in upward */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 1.2 // Starts as line finishes
                }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] tracking-tight"
              >
                Revenue Engine
              </motion.div>
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