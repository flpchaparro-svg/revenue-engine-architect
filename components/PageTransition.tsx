import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode, currentView: string }> = ({ children, currentView }) => {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return false; 
    try {
      const hasLoaded = sessionStorage.getItem('has_loaded');
      return !hasLoaded;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    // SAFETY TIMER: 
    // We give it a minimum of 1.2s so the user sees the "Pulse" at least once.
    // Max of 2.5s for safety.
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
      if (typeof window !== 'undefined') sessionStorage.setItem('has_loaded', 'true');
    }, 2000); 

    return () => clearTimeout(safetyTimer);
  }, []);

  const handleExitComplete = () => {
    window.scrollTo(0, 0);
  };

  // --- ANIMATION VARIANTS (Parallel / Instant) ---

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

  // 1. The Wrapper Pulses while waiting
  const totemWrapperVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.02, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6 // Start pulsing after assembly
      }
    }
  };

  // 2. Fast Drop
  const goldDotDropVariants = {
    initial: { y: '-100vh', opacity: 1 },
    drop: { y: 0, transition: { duration: 0.4, ease: "easeIn" } }, // Faster drop (0.4s)
    impact: { scale: 0, opacity: 0, transition: { duration: 0.01, delay: 0.4 } }
  };

  // 3. Everything Explodes Out AT ONCE (Delay 0.4s)
  const commonTransition = { type: "spring", stiffness: 200, damping: 20, delay: 0.42 };

  const redLineVariants = {
    initial: { width: 0, opacity: 0 },
    expand: { width: 260, opacity: 1, transition: commonTransition }
  };

  const logoVariants = {
    initial: { y: 15, opacity: 0 },
    reveal: { y: 0, opacity: 1, transition: commonTransition }
  };

  const titleVariants = {
    initial: { y: -15, opacity: 0 },
    reveal: { y: 0, opacity: 1, transition: commonTransition }
  };

  const subtitleVariants = {
    initial: { opacity: 0 },
    reveal: { opacity: 0.6, transition: { duration: 0.4, delay: 0.6 } } // Slight delay for hierarchy
  };

  // Logic to dismiss earlier if load is fast
  useEffect(() => {
    // If the browser reports "load" event (everything ready), we can dismiss 
    // BUT we wait at least 1.2s so the animation plays fully.
    const handleLoad = () => {
        setTimeout(() => {
            setIsLoading(false);
            if (typeof window !== 'undefined') sessionStorage.setItem('has_loaded', 'true');
        }, 1200);
    };
    
    if (document.readyState === 'complete') {
        handleLoad();
    } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

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
             {/* PULSING WRAPPER */}
             <motion.div 
                className="relative flex flex-col items-center justify-center"
                variants={totemWrapperVariants}
                animate="pulse"
             >
              {/* Drop */}
              <motion.div variants={goldDotDropVariants} initial="initial" animate={["drop", "impact"]} className="absolute w-1.5 h-1.5 rounded-full bg-[#C5A059] z-50" />
              
              {/* Logo */}
              <div className="overflow-hidden mb-4">
                <motion.div variants={logoVariants} initial="initial" animate="reveal" className="bg-[#FFF2EC] text-[#1a1a1a] font-mono text-xs font-bold px-2 py-1">[FC)</motion.div>
              </div>
              
              {/* Line */}
              <motion.div variants={redLineVariants} initial="initial" animate="expand" className="h-[1px] bg-[#E21E3F] mx-auto" />
              
              {/* Title */}
              <div className="overflow-hidden mt-4 mb-2">
                 <motion.div variants={titleVariants} initial="initial" animate="reveal" className="font-serif text-3xl md:text-4xl text-[#FFF2EC] italic">Revenue Engine</motion.div>
              </div>
              
              {/* Subtitle */}
              <motion.div 
                variants={subtitleVariants} 
                initial="initial" 
                animate="reveal" 
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFF2EC]"
              >
                SYDNEY BUSINESS AUTOMATION
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
