import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode, currentView: string }> = ({ children, currentView }) => {
  // Session Check: Only show preloader on first visit
  const [isLoading, setIsLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem('has_loaded');
    return !hasLoaded;
  });

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('has_loaded');
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handleExitComplete = () => {
    // Cleanup after exit completes
  };

  // Animation Variants for Dark Totem Reveal
  const containerVariants = {
    initial: { opacity: 1, y: 0 },
    exit: { 
      y: '-100%',
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Phase 1: Gold Dot Falls
  const goldDotDropVariants = {
    initial: { 
      y: '-100vh', 
      opacity: 1,
      scale: 1
    },
    drop: { 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeIn"
      }
    },
    impact: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.1,
        delay: 0.6 // Disappears on impact
      }
    }
  };

  // Phase 2: Red Line Expands
  const redLineVariants = {
    initial: { 
      width: 0,
      opacity: 0
    },
    expand: {
      width: 260,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        bounce: 0.4,
        delay: 0.6 // Starts when dot hits
      }
    }
  };

  // Phase 3: Logo Pops Up
  const logoVariants = {
    initial: { 
      y: 20,
      opacity: 0,
      clipPath: "inset(100% 0 0 0)"
    },
    reveal: {
      y: 0,
      opacity: 1,
      clipPath: "inset(0% 0 0 0)",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.7 // After line expands
      }
    }
  };

  // Phase 3: Title Drops Down
  const titleVariants = {
    initial: { 
      y: -20,
      opacity: 0,
      clipPath: "inset(0 0 100% 0)"
    },
    reveal: {
      y: 0,
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.7 // After line expands
      }
    }
  };

  // Phase 3: Subtitle Fades In
  const subtitleVariants = {
    initial: { opacity: 0 },
    reveal: {
      opacity: 0.6,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 1.2 // After logo and title reveal
      }
    }
  };

  const handleSubtitleComplete = () => {
    // After subtitle animation completes (1.2s delay + 0.5s duration = 1.7s), wait then trigger exit
    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('has_loaded', 'true');
    }, 800); // Small pause before exit (total ~2.5s)
  };

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {isLoading && (
          <motion.div
            key="dark-totem-preloader"
            variants={containerVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden shadow-2xl"
          >
            {/* Centered Container */}
            <div className="relative flex flex-col items-center justify-center">
              
              {/* Phase 1: Gold Dot - Falls from Top */}
              <motion.div
                variants={goldDotDropVariants}
                initial="initial"
                animate={["drop", "impact"]}
                className="absolute w-4 h-4 rounded-full bg-[#C5A059] z-50"
              />

              {/* Phase 3: Logo [FC) - Pops Up from Line */}
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="reveal"
                className="bg-[#FFF2EC] text-[#1a1a1a] font-mono text-xs font-bold px-2 py-1 mb-4"
              >
                [FC)
              </motion.div>

              {/* Phase 2: Red Line - Expands from Center */}
              <motion.div
                variants={redLineVariants}
                initial="initial"
                animate="expand"
                className="h-[1px] bg-[#E21E3F] mx-auto"
                style={{ transformOrigin: 'center' }}
              />

              {/* Phase 3: Title - Drops Down from Line */}
              <motion.div
                variants={titleVariants}
                initial="initial"
                animate="reveal"
                className="font-serif text-3xl md:text-4xl text-[#FFF2EC] italic mb-2 mt-4"
              >
                Revenue Engine
              </motion.div>

              {/* Phase 3: Subtitle - Fades In */}
              <motion.div
                variants={subtitleVariants}
                initial="initial"
                animate="reveal"
                onAnimationComplete={handleSubtitleComplete}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFF2EC] mt-2"
              >
                SYDNEY BUSINESS AUTOMATION
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