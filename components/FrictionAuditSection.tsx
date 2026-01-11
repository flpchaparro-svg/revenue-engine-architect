import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- DATA (Restored Original Copy) ---
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

// --- DESKTOP COMPONENTS (Unchanged) ---
interface AuditCubeVisualProps {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const AuditCubeVisual: React.FC<AuditCubeVisualProps> = ({ scrollYProgress }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-10 border-2 border-[#1a1a1a] bg-transparent">
      <motion.div 
        className="absolute inset-0 border-2 border-[#1a1a1a] bg-transparent"
        style={{ rotate, willChange: "transform" }}
      >
         <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#1a1a1a] -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
        <div className="border-r border-b border-[#1a1a1a]/10"></div>
        <div className="border-b border-[#1a1a1a]/10"></div>
        <div className="border-r border-[#1a1a1a]/10"></div>
        <div className=""></div>
      </div>
    </div>
  );
};

interface CardProps {
  data: typeof AUDIT_DATA[0];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  onNavigate?: (v: string) => void;
}

const Card: React.FC<CardProps> = ({ data, index, total, scrollYProgress, onNavigate }) => {
  const step = 0.25; 
  const peak = index * step;
  const range = [peak - step, peak, peak + step];

  const rotateX = useTransform(scrollYProgress, range, [-90, 0, 90]);
  const opacity = useTransform(scrollYProgress, [peak - 0.25, peak - 0.15, peak, peak + 0.15, peak + 0.25], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, range, [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, range, ["50%", "0%", "-50%"]);
  const zIndex = useTransform(scrollYProgress, [peak - 0.01, peak + 0.01], [0, 10]); 
  const pointerEvents = useTransform(opacity, v => v > 0.5 ? 'auto' : 'none');

  return (
    <motion.div
      style={{ opacity, rotateX, scale, y, zIndex, pointerEvents, transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center bg-[#FFF2EC] origin-center"
    >
      <div className="w-full h-full p-6 md:p-12 lg:p-20 flex flex-col justify-center max-w-[1600px] mx-auto">
        {data.type === 'cta' ? (
           <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight mb-10">
                You have seen the <span className="text-[#E21E3F]">leak.</span><br/>
                <span className="italic">Now see the <span className="text-[#C5A059]">fix.</span></span>
              </h2>
              <button onClick={() => document.getElementById('bento')?.scrollIntoView({ behavior: 'smooth' })} className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#1a1a1a] text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all duration-300 hover:border-[#C5A059]">
                 <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                 <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ SEE THE SYSTEM ]</span>
              </button>
           </div>
        ) : (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="flex flex-col space-y-6 md:space-y-8">
                 <div className="flex items-center gap-4">
                    <span className="font-serif text-5xl md:text-6xl text-[#1a1a1a]/10 italic font-bold">{data.id}</span>
                    <div className="h-px flex-1 bg-[#1a1a1a]/20"></div>
                    <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest border border-[#E21E3F]/30 px-2 py-1">[{data.label}]</span>
                 </div>
                 <div>
                    <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] leading-[0.9] mb-6">{data.title}</h3>
                    <div className="inline-block bg-[#E21E3F]/10 px-4 py-2">
                       <span className="font-mono text-xl md:text-2xl text-[#E21E3F] font-bold tracking-tight">{data.metric}</span>
                    </div>
                 </div>
                 <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#E21E3F]/20 pl-6">{data.description}</p>
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
    <section ref={containerRef} className="relative bg-[#FFF2EC] z-30">
       
      {/* DESKTOP LAYOUT (Unchanged - Horizontal/3D) */}
      <div className="hidden md:flex relative h-[500vh]">
         <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
            {[...Array(5)].map((_, i) => (
               <div key={i} className="h-screen w-full snap-start" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'normal' }} />
            ))}
         </div>

         <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-row z-10 border-t border-[#1a1a1a]/10">
           {/* Desktop Left Panel */}
           <div className="w-[450px] h-full border-r border-[#1a1a1a]/10 bg-[#FFF2EC] p-12 xl:p-16 flex flex-col justify-between shrink-0 z-50">
              <div>
                 <div className="mb-8 font-mono text-xs text-[#E21E3F] tracking-[0.2em] uppercase flex items-center gap-2">
                    / THE FRICTION AUDIT
                 </div>
                 <h1 className="font-serif text-5xl xl:text-6xl leading-[0.95] text-[#1a1a1a] mb-8">
                    Where your <br/>
                    <span className="text-[#E21E3F]">margin</span> <br/>
                    <span className="italic">evaporates.</span>
                 </h1>
                 <div className="w-12 h-1 bg-[#1a1a1a] mb-8"></div>
                 <p className="font-sans text-base text-[#1a1a1a]/60 leading-relaxed max-w-xs">
                    Your business isn't broken, but it is leaking. These are the 4 silent fracture points where profit disappears before it hits your bank.
                 </p>
              </div>
              
              <div>
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

           {/* Desktop Right Panel */}
           <div className="flex-1 relative h-full bg-[#FFF2EC] overflow-hidden" style={{ perspective: "1000px" }}>
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
              <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
                style={{ backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
              />
           </div>
         </div>
      </div>

      {/* MOBILE LAYOUT (Split Screen - 40% Header / 60% Scroll) */}
      <div className="md:hidden relative h-[100dvh] flex flex-col overflow-hidden border-t border-[#1a1a1a]/10">
         
         {/* TOP 40%: Sticky Header */}
         <div className="h-[40%] flex-none w-full bg-[#FFF2EC] border-b border-[#1a1a1a]/10 p-6 flex flex-col justify-center relative z-20">
            <div className="font-mono text-[10px] text-[#E21E3F] tracking-[0.2em] uppercase mb-4">
               / THE FRICTION AUDIT
            </div>
            <h1 className="font-serif text-4xl leading-[0.95] text-[#1a1a1a] mb-4">
               Where your <br/>
               <span className="text-[#E21E3F]">margin</span> <br/>
               <span className="italic">evaporates.</span>
            </h1>
            <p className="font-sans text-xs text-[#1a1a1a]/60 leading-relaxed max-w-[280px]">
               These are the 4 fracture points where profit disappears.
            </p>
         </div>

         {/* BOTTOM 60%: Scrollable Cards */}
         <div className="h-[60%] flex-1 overflow-y-auto bg-[#FFF2EC] relative z-10">
            <div className="flex flex-col">
               {AUDIT_DATA.map((data, index) => (
                  <div 
                     key={data.id}
                     // NEWSPAPER STYLE: Sticky, Full Width, Clean Border
                     className="sticky top-0 bg-[#FFF2EC] border-b border-[#1a1a1a]/10 min-h-full p-6 flex flex-col justify-start"
                     style={{ 
                        // Ensure it takes up enough space to feel like a "page"
                        minHeight: '100%',
                        paddingBottom: '3rem' // Add breathing room at bottom
                     }}
                  >
                     {/* No Box. No Shadow. No Dot. Just Type. */}
                     
                     {data.type === 'cta' ? (
                        // CTA CARD
                        <div className="flex flex-col items-center justify-center text-center h-full pt-10">
                           <h2 className="font-serif text-3xl text-[#1a1a1a] leading-tight mb-8">
                              You have seen the <span className="text-[#E21E3F]">leak.</span><br/>
                              <span className="italic">Now see the <span className="text-[#C5A059]">fix.</span></span>
                           </h2>
                           <button onClick={() => document.getElementById('bento')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-4 bg-[#1a1a1a] text-[#FFF2EC] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                              [ SEE THE SYSTEM ]
                           </button>
                        </div>
                     ) : (
                        // DATA CARD (Editorial)
                        <div className="flex flex-col h-full">
                           {/* Eyebrow: Number + Label */}
                           <div className="flex items-center gap-3 mb-6 opacity-80">
                              <span className="font-mono text-xs text-[#E21E3F] font-bold">{data.id}</span>
                              <div className="w-8 h-px bg-[#E21E3F]/30"></div>
                              <span className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest">
                                 {data.label}
                              </span>
                           </div>

                           {/* Title */}
                           <h3 className="font-serif text-4xl text-[#1a1a1a] leading-[0.9] mb-4">
                              {data.title}
                           </h3>

                           {/* Metric */}
                           <div className="mb-6">
                              <span className="font-mono text-xl text-[#E21E3F] font-bold tracking-tight bg-[#E21E3F]/5 px-2 py-1">
                                 {data.metric}
                              </span>
                           </div>

                           {/* Description */}
                           <p className="font-sans text-sm text-[#1a1a1a]/70 leading-relaxed border-l border-[#E21E3F]/20 pl-4">
                              {data.description}
                           </p>
                        </div>
                     )}
                  </div>
               ))}
               
               {/* Spacer to allow the last card to scroll up fully if needed */}
               <div className="h-[20vh] bg-[#FFF2EC]"></div>
            </div>
         </div>

      </div>
    </section>
  );
};

export default FrictionAuditSection;
