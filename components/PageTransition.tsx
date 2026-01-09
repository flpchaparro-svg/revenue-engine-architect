import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode, currentView: string }> = ({ children, currentView }) => {
  // Session Check: Only show preloader on first visit
  const [isLoading, setIsLoading] = useState(() => {
    const sessionLoaded = sessionStorage.getItem('session_loaded');
    return !sessionLoaded;
  });

  useEffect(() => {
    const sessionLoaded = sessionStorage.getItem('session_loaded');
    if (sessionLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handleExitComplete = () => {
    // Cleanup after exit completes
  };

  // Animation Variants for Clean Orchestration
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

  const goldDotVariants = {
    initial: { 
      y: -300, 
      opacity: 1,
      scale: 1
    },
    drop: { 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeIn" // Heavy gravity
      }
    },
    impact: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.1,
        delay: 0.8 // Disappears on impact
      }
    }
  };

  const redLineVariants = {
    initial: { 
      width: 0,
      opacity: 0
    },
    expand: {
      width: 240,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        bounce: 0.3,
        delay: 0.8 // Starts when dot hits
      }
    }
  };

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
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: 1.2 // After line expands
      }
    }
  };

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
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: 1.2 // After line expands
      }
    }
  };

  const subtitleVariants = {
    initial: { opacity: 0 },
    reveal: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 2.0 // After logo and title reveal
      }
    }
  };

  const handleSubtitleComplete = () => {
    // After subtitle animation completes (2.0s delay + 0.5s duration = 2.5s), trigger exit
    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('session_loaded', 'true');
    }, 800); // Wait for exit curtain lift duration
  };

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {isLoading && (
          <motion.div
            key="ignition-preloader"
            variants={containerVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[9999] bg-[#FFF2EC] flex flex-col items-center justify-center overflow-hidden shadow-2xl"
          >
            {/* Centered Container */}
            <div className="relative flex flex-col items-center justify-center">
              
              {/* Phase 1 & 2: Gold Dot - Falls and Disappears on Impact */}
              <motion.div
                variants={goldDotVariants}
                initial="initial"
                animate={["drop", "impact"]}
                className="absolute w-4 h-4 rounded-full bg-[#C5A059] z-50"
              />

              {/* Phase 3: Logo [FC) - Reveals Upwards from Line */}
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="reveal"
                className="bg-[#1a1a1a] text-[#FFF2EC] font-mono text-xs font-bold px-2 py-1 mb-4"
              >
                [FC)
              </motion.div>

              {/* Phase 2: Red Line - Expands from Center (Shockwave) */}
              <motion.div
                variants={redLineVariants}
                initial="initial"
                animate="expand"
                className="h-[2px] bg-[#E21E3F] mx-auto"
                style={{ transformOrigin: 'center' }}
              />

              {/* Phase 3: Title - Reveals Downwards from Line */}
              <motion.div
                variants={titleVariants}
                initial="initial"
                animate="reveal"
                className="font-serif text-3xl md:text-4xl text-[#1a1a1a] italic mb-2 mt-4"
              >
                Revenue Engine
              </motion.div>

              {/* Phase 4: Subtitle - Fades In */}
              <motion.div
                variants={subtitleVariants}
                initial="initial"
                animate="reveal"
                onAnimationComplete={handleSubtitleComplete}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] mt-2"
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