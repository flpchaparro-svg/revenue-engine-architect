import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
// FIX 1: Import Type only (saves bundle size)
import type { GraphState } from '../GrowthGraph';
import CTAButton from '../CTAButton';

// FIX 2: Lazy load the heavy component to stop "Forced Reflow" on load
const GrowthGraph = lazy(() => import('../GrowthGraph'));

const ProblemSection: React.FC = () => {
  const [graphState, setGraphState] = useState<GraphState>('idle');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobileRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Auto-Rotation Logic
  useEffect(() => {
    const startRotation = () => {
      if (!isMobileRef.current) return;
      
      const scannerStates: GraphState[] = ['bottleneck', 'tax', 'grind', 'cost'];
      let currentIndex = 0;

      autoRotateIntervalRef.current = setInterval(() => {
        setGraphState(scannerStates[currentIndex]);
        currentIndex = (currentIndex + 1) % scannerStates.length;
      }, 2500);
    };

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      isMobileRef.current = mobile;
      setIsMobile(mobile);
      
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
      
      if (mobile) {
        setTimeout(startRotation, 3000); 
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      if (autoRotateIntervalRef.current) clearInterval(autoRotateIntervalRef.current);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleGraphHover = (state: GraphState) => {
    if (isMobileRef.current) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setGraphState(state);
  };
  
  const handleGraphLeave = () => {
    if (isMobileRef.current) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setGraphState('idle'), 50);
  };

  return (
    <motion.section 
      id="problem" 
      aria-label="Problem Section" 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true, margin: "-100px" }} 
      className="w-full bg-[#FFF2EC] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 md:h-32 w-[1px] bg-[#1a1a1a]/10" />
      <div className="max-w-[1600px] mx-auto border-t border-l border-[#1a1a1a]/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
            
          {/* 01: THE PROBLEM */}
          <div className="col-span-1 md:col-span-2 p-8 md:p-12 lg:p-16 border-r border-b border-[#1a1a1a]/10 flex flex-col justify-center min-h-[300px] md:min-h-[400px] transition-colors duration-300 hover:bg-[#1a1a1a]/5 group">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 md:mb-10 block">01 / THE PROBLEM</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] text-[#1a1a1a] tracking-tighter">
              You didn't start your business to become an <br className="hidden md:block" />
              <span className="italic text-[#1a1a1a]/60 group-hover:text-[#E21E3F] transition-colors duration-300">administrative hostage.</span>
            </h2>
          </div>

          {/* GRAPH CONTAINER */}
          <div className="col-span-1 border-r border-b border-[#1a1a1a]/10 bg-transparent flex items-center justify-center p-8">
            {/* FIX 3: Suspense Wrapper - Keeps layout intact but loads graph later */}
            <Suspense fallback={<div className="w-full h-full min-h-[300px] flex items-center justify-center font-mono text-xs text-[#E21E3F]/30 tracking-widest">LOADING DATA...</div>}>
               <GrowthGraph currentState={graphState} />
            </Suspense>
          </div>

          {/* 02: SYMPTOMS */}
          <div className="col-span-1 p-8 md:p-12 border-r border-b border-[#1a1a1a]/10 min-h-[300px] md:min-h-[400px] flex flex-col">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 md:mb-8 block">02 / SYMPTOMS</span>
            <ul className="space-y-6">
              <li onMouseEnter={() => handleGraphHover('bottleneck')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-[#1a1a1a]/5 transition-colors duration-200">
                <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-1 pointer-events-none" />
                <div className="pointer-events-none leading-relaxed">
                  <strong className="font-serif text-xl md:text-2xl text-[#1a1a1a] tracking-tight block mb-1">The Bottleneck Boss</strong>
                  <span className="font-sans text-base md:text-lg leading-relaxed text-[#1a1a1a]/70">Your team asks you 20 questions a day instead of just doing the work.</span>
                </div>
              </li>
              <li onMouseEnter={() => handleGraphHover('tax')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-[#1a1a1a]/5 transition-colors duration-200">
                <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-1 pointer-events-none" />
                <div className="pointer-events-none leading-relaxed">
                  <strong className="font-serif text-xl md:text-2xl text-[#1a1a1a] tracking-tight block mb-1">The Double-Entry Tax</strong>
                  <span className="font-sans text-base md:text-lg leading-relaxed text-[#1a1a1a]/70">The same data gets typed into three different apps by three different people.</span>
                </div>
              </li>
              <li onMouseEnter={() => handleGraphHover('grind')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-[#1a1a1a]/5 transition-colors duration-200">
                <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-1 pointer-events-none" />
                <div className="pointer-events-none leading-relaxed">
                  <strong className="font-serif text-xl md:text-2xl text-[#1a1a1a] tracking-tight block mb-1">The Sunday Dread</strong>
                  <span className="font-sans text-base md:text-lg leading-relaxed text-[#1a1a1a]/70">You spend weekends on invoicing and admin instead of with your family.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 03: THE COST */}
          <div onMouseEnter={() => handleGraphHover('cost')} onMouseLeave={handleGraphLeave} className="col-span-1 p-8 md:p-12 border-r border-b border-[#1a1a1a]/10 bg-[#E21E3F]/5 min-h-[250px] md:min-h-[400px] hover:bg-[#E21E3F]/10 transition-colors duration-300 relative overflow-hidden group flex flex-col justify-center">
            <div className="absolute inset-0 bg-[#E21E3F]/0 group-hover:bg-[#E21E3F]/10 transition-colors duration-500" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block relative z-10">03 / THE COST</span>
            <div className="space-y-4 relative z-10">
              <div className="font-mono text-3xl md:text-4xl font-bold text-[#E21E3F] uppercase tracking-tighter">BURNING YOUR BEST PEOPLE</div>
              <p className="font-mono text-sm md:text-base text-[#E21E3F]/80 leading-relaxed uppercase tracking-[0.15em] font-medium max-w-xs">
                You're paying skilled staff to do unskilled work. They get bored. They leave. You start again.
              </p>
            </div>
          </div>

          {/* 04: THE FIX */}
          <div onMouseEnter={() => handleGraphHover('fix')} onMouseLeave={handleGraphLeave} className="col-span-1 p-8 md:p-12 border-r border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-white min-h-[250px] md:min-h-[400px] flex flex-col justify-between border-l-2 border-l-[#C5A059]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] block mb-4 md:mb-0">04 / THE FIX</span>
            <p className="font-serif text-3xl md:text-4xl leading-tight mb-6 md:mb-8 hover:text-[#C5A059] transition-colors duration-300">
              I build the systems that do the boring work automatically. Your team gets their time back. You get your business back.
            </p>
            <CTAButton 
              variant="bracket" 
              theme="dark" 
              onClick={() => document.getElementById('seven-pillars')?.scrollIntoView({behavior: 'smooth'})}
            >
              SEE THE SYSTEM
            </CTAButton>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProblemSection;
