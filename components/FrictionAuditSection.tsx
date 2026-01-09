import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- DATA ---
export const AUDIT_DATA = [
  {
    id: '01',
    title: 'Lead Evaporation',
    metric: '-$500 / DAY',
    label: 'REVENUE LEAK',
    description: "Demand hits your site and vanishes. Your website captures names but loses intent. You are paying for leads that go cold in the inbox.",
    type: 'data'
  },
  {
    id: '02',
    title: 'The Double-Entry Tax',
    metric: '15 HRS / WK',
    label: 'TIME LEAK',
    description: "Sales types it. Ops types it again. Finance types it a third time. You are paying triple wages for the same data entry errors.",
    type: 'data'
  },
  {
    id: '03',
    title: 'Admin Paralysis',
    metric: '40% OF YOUR WEEK',
    label: 'GROWTH BLOCKER',
    description: "You are the 'Chief Admin Officer'. You spend 40% of your week fixing invoices and scheduling instead of steering the ship.",
    type: 'data'
  },
  {
    id: '04',
    title: 'Profit Blindness',
    metric: 'NO VISIBILITY',
    label: 'BLIND SPOT',
    description: "You know your Revenue, but not your Real-Time Margin. You are flying a 747 through a storm with no radar.",
    type: 'data'
  },
  {
    id: '05',
    title: 'You see the leak.',
    metric: 'Now see the fix.',
    description: "",
    type: 'cta'
  }
];

/**
 * AuditCubeVisual
 * The rotating wireframe cube (Sandbox version).
 */
interface AuditCubeVisualProps {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const AuditCubeVisual: React.FC<AuditCubeVisualProps> = ({ scrollYProgress }) => {
  // FASTER ROTATION: 0 to 720 degrees (2 full spins)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-10 border-2 border-[#1a1a1a] bg-transparent">
      {/* Inner Rotating Cube */}
      <motion.div 
        className="absolute inset-0 border-2 border-[#1a1a1a] bg-transparent"
        style={{ 
          rotate,
          willChange: "transform" // Optimize rotation performance
        }}
      >
         <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#1a1a1a] -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
        <div className="border-r border-b border-[#1a1a1a]/10"></div>
        <div className="border-b border-[#1a1a1a]/10"></div>
        <div className="border-r border-[#1a1a1a]/10"></div>
        <div className=""></div>
      </div>
    </div>
  );
};

/**
 * Card Component
 */
interface CardProps {
  data: typeof AUDIT_DATA[0];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  onNavigate?: (v: string) => void;
}

const Card: React.FC<CardProps> = ({ data, index, total, scrollYProgress, onNavigate }) => {
  const step = 0.25; // 100% / 4 intervals
  const peak = index * step;
  
  // RANGE DEFINITION:
  // The card is "active" during a window of +/- 0.25 (one full step).
  // It enters from (peak - 0.25) and exits at (peak + 0.25).
  const range = [peak - step, peak, peak + step];

  // 1. ROTATION: -90deg (bottom) -> 0deg (flat) -> 90deg (top)
  const rotateX = useTransform(scrollYProgress, range, [-90, 0, 90]);
  
  // 2. OPACITY: Fade in, hold, sharp fade out
  // We cut opacity to 0 at +/- 0.20 to prevent "messy overlap" at the extremes
  const opacity = useTransform(scrollYProgress, 
    [peak - 0.25, peak - 0.15, peak, peak + 0.15, peak + 0.25], 
    [0, 1, 1, 1, 0]
  );

  // 3. SCALE: Slight depth effect (0.8 -> 1 -> 0.8) moves it "back" in space
  const scale = useTransform(scrollYProgress, range, [0.8, 1, 0.8]);

  // 4. VERTICAL OFFSET: Helps the "wheel" feeling by moving y concurrently
  const y = useTransform(scrollYProgress, range, ["50%", "0%", "-50%"]);

  // 5. Z-INDEX & POINTER EVENTS
  // Only the active card is clickable and on top
  const zIndex = useTransform(scrollYProgress, [peak - 0.01, peak + 0.01], [0, 10]); // Low z-index unless active
  const pointerEvents = useTransform(opacity, v => v > 0.5 ? 'auto' : 'none');

  return (
    <motion.div
      style={{ 
        opacity, 
        rotateX, 
        scale, 
        y, 
        zIndex, 
        pointerEvents,
        transformStyle: "preserve-3d", // Crucial for 3D effect
        backfaceVisibility: "hidden",    // Crucial: Hides text when rotated behind
        willChange: "opacity, transform" // Hint browser to promote to GPU for performance
      }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center bg-[#FFF2EC] origin-center"
    >
      <div className="w-full h-full p-6 md:p-12 lg:p-20 flex flex-col justify-center max-w-[1600px] mx-auto">
        
        {data.type === 'cta' ? (
           // --- CTA CARD (FIXED: Reduced Size) ---
           <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight mb-10">
                You have seen the <span className="text-[#E21E3F]">leak.</span><br/>
                <span className="italic">Now see the <span className="text-[#C5A059]">fix.</span></span>
              </h2>
              <button 
                onClick={() => document.getElementById('bento')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#1a1a1a] text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all duration-300 hover:border-[#C5A059]"
              >
                 <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                 <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ SEE THE SYSTEM ]</span>
              </button>
           </div>
        ) : (
           // --- DATA CARD LAYOUT ---
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="flex flex-col space-y-6 md:space-y-8">
                 <div className="flex items-center gap-4">
                    <span className="font-serif text-5xl md:text-6xl text-[#1a1a1a]/10 italic font-bold">
                       {data.id}
                    </span>
                    <div className="h-px flex-1 bg-[#1a1a1a]/20"></div>
                    <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest border border-[#E21E3F]/30 px-2 py-1">
                       [{data.label}]
                    </span>
                 </div>
                 
                 <div>
                    <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] leading-[0.9] mb-6">
                       {data.title}
                    </h3>
                    <div className="inline-block bg-[#E21E3F]/10 px-4 py-2">
                       <span className="font-mono text-xl md:text-2xl text-[#E21E3F] font-bold tracking-tight">
                          {data.metric}
                       </span>
                    </div>
                 </div>

                 <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#E21E3F]/20 pl-6">
                    {data.description}
                 </p>
              </div>

              <div className="hidden lg:flex items-center justify-center h-full min-h-[400px]">
                 <AuditCubeVisual scrollYProgress={scrollYProgress} />
              </div>
           </div>
        )}
      </div>
    </motion.div>
  );
};

// --- MAIN SECTION ---
interface FrictionAuditSectionProps {
  onNavigate: (v: string) => void;
}

const FrictionAuditSection: React.FC<FrictionAuditSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // Height: Auto on mobile, 500vh on desktop for scroll animation
    <section ref={containerRef} className="relative h-auto md:h-[500vh] bg-[#FFF2EC] z-30">
       
       {/* Snap Anchors: Desktop only - Allows momentum scrolling */}
       <div className="hidden md:block absolute inset-0 flex flex-col pointer-events-none z-0">
          {[...Array(5)].map((_, i) => (
             <div 
                key={i} 
                className="h-screen w-full snap-start" 
                style={{ scrollSnapAlign: 'start', scrollSnapStop: 'normal' }}
             />
          ))}
       </div>

      {/* Mobile Layout: Vertical Stack | Desktop: Sticky Side-by-Side */}
      <div className="md:sticky md:top-0 w-full md:h-screen md:overflow-hidden flex flex-col md:flex-row z-10 border-t border-[#1a1a1a]/10">
        
        {/* Left Panel (Static) */}
        <div className="w-full md:w-[450px] md:h-full border-b md:border-b-0 md:border-r border-[#1a1a1a]/10 bg-[#FFF2EC] p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col justify-between shrink-0 z-50 min-h-[50vh] md:min-h-0">
           <div>
              <div className="mb-6 md:mb-8 font-mono text-xs text-[#E21E3F] tracking-[0.2em] uppercase flex items-center gap-2">
                 <div className="w-2 h-2 bg-[#E21E3F]"></div>
                 02 // THE FRICTION AUDIT
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[0.95] text-[#1a1a1a] mb-6 md:mb-8">
                 Where your <br/>
                 <span className="text-[#E21E3F]">margin</span> <br/>
                 <span className="italic">evaporates.</span>
              </h1>
              <div className="w-12 h-1 bg-[#1a1a1a] mb-6 md:mb-8"></div>
              <p className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed max-w-xs">
                 Your business isn't broken, but it is leaking. These are the 4 silent fracture points where profit disappears before it hits your bank.
              </p>
           </div>
           
           {/* Audit Progress Indicator */}
           <div className="hidden md:block">
              <div className="font-mono text-[10px] text-[#1a1a1a]/40 uppercase mb-2">Audit Progress</div>
              <div className="w-full h-1 bg-[#1a1a1a]/10 relative overflow-hidden">
                 <motion.div 
                    className="h-full bg-[#E21E3F]" 
                    style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                 />
              </div>
              <div className="mt-2 text-right font-mono text-[10px] text-[#1a1a1a]">
                 <motion.span>
                    {useTransform(scrollYProgress, v => `${Math.min(100, Math.round(v * 100))}%`)}
                 </motion.span>
              </div>
           </div>
        </div>

        {/* Right Panel: Mobile (Vertical Stack) | Desktop (Dynamic 3D Scene) */}
        <div 
            className="flex-1 relative md:h-full bg-[#FFF2EC] md:overflow-hidden"
            style={{ perspective: "1000px" }} // ADDS 3D DEPTH on desktop
        >
           {/* Mobile: Simple vertical stack */}
           <div className="md:hidden flex flex-col border-t border-[#1a1a1a]/10">
             {AUDIT_DATA.map((data, index) => (
               <div 
                 key={data.id} 
                 className="w-full bg-[#FFF2EC] min-h-[50vh] border-b border-[#1a1a1a]/10 flex flex-col justify-center py-12 px-6"
               >
                 <div className="w-full max-w-[1600px] mx-auto">
                   {data.type === 'cta' ? (
                     <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-12">
                       <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight mb-10">
                         You have seen the <span className="text-[#E21E3F]">leak.</span><br/>
                         <span className="italic">Now see the <span className="text-[#C5A059]">fix.</span></span>
                       </h2>
                       <button 
                         onClick={() => document.getElementById('bento')?.scrollIntoView({ behavior: 'smooth' })}
                         className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#1a1a1a] text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all duration-300 hover:border-[#C5A059]"
                       >
                         <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                         <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ SEE THE SYSTEM ]</span>
                       </button>
                     </div>
                   ) : (
                     <div className="flex flex-col space-y-4">
                       <div className="flex items-center gap-4">
                         <span className="font-serif text-4xl md:text-6xl text-[#1a1a1a]/20 italic font-bold">
                           {data.id}
                         </span>
                         <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest border border-[#E21E3F]/30 px-2 py-1">
                           [{data.label}]
                         </span>
                       </div>
                       
                       <div>
                         <h3 className="font-serif text-3xl md:text-6xl lg:text-7xl text-[#1a1a1a] leading-[0.9] mb-4">
                           {data.title}
                         </h3>
                         <div className="inline-block bg-[#E21E3F]/10 px-4 py-2">
                           <span className="font-mono text-lg md:text-2xl text-[#E21E3F] font-bold tracking-tight">
                             {data.metric}
                           </span>
                         </div>
                       </div>

                       <p className="font-sans text-sm md:text-lg text-[#1a1a1a]/70 leading-relaxed max-w-md pl-0">
                         {data.description}
                       </p>
                     </div>
                   )}
                 </div>
               </div>
             ))}
           </div>

           {/* Desktop: 3D Animated Cards */}
           <div className="hidden md:block relative h-full overflow-hidden">
             {AUDIT_DATA.map((data, index) => (
               <Card 
                 key={data.id}
                 data={data}
                 index={index}
                 total={AUDIT_DATA.length}
                 scrollYProgress={scrollYProgress}
                 onNavigate={onNavigate}
               />
             ))}
             
             {/* Grid Texture Overlay */}
             <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
               style={{ backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
             />
           </div>
        </div>
        
      </div>
    </section>
  );
};

export default FrictionAuditSection;
