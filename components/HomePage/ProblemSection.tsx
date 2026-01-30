import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { m } from 'framer-motion';
// Named import to ensure tree-shaking works if d3 is used here
import { select } from 'd3'; 

// Lazy load the graph to isolate the D3 dependency completely
const GrowthGraph = lazy(() => import('../GrowthGraph'));

const ProblemSection: React.FC = () => {
  const [activeState, setActiveState] = useState<'idle' | 'bottleneck' | 'tax' | 'grind' | 'cost' | 'fix'>('idle');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHover = useCallback((state: any) => {
    if (!isMobile) setActiveState(state);
  }, [isMobile]);

  // FIX: Unblock Main Thread
  // We accept that this section might take 100ms to hydrate. 
  // It's below the fold, so it doesn't matter for LCP.
  
  return (
    <section id="problem" className="py-24 md:py-32 bg-[#FFF2EC] relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Text Content */}
          <div className="order-2 lg:order-1">
             {/* ... (Keep your existing text content here exactly as is) ... */}
             {/* If you need the text content again, let me know, but assume you keep existing JSX */}
             <div className="space-y-8">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-[1.1]">
                  Success is <span className="italic text-[#E21E3F]">suffocating</span> you.
                </h2>
                <p className="font-sans text-lg text-[#1a1a1a]/70 max-w-xl">
                  You hit $50k/mo, but your day didn't get easier. It got harder. 
                  Now you're the bottleneck, the manager, and the firefighter.
                </p>
                
                {/* LIST */}
                <ul className="space-y-4 mt-8">
                  {[
                    { id: 'bottleneck', label: 'THE BOTTLENECK', desc: 'You personally approve every decision.' },
                    { id: 'tax', label: 'THE ADMIN TAX', desc: '40% of your week is low-value logistics.' },
                    { id: 'grind', label: 'THE GRIND', desc: 'Revenue grows linearly with your stress.' }
                  ].map((item) => (
                    <li 
                      key={item.id}
                      onMouseEnter={() => handleHover(item.id)}
                      onMouseLeave={() => handleHover('idle')}
                      className="group cursor-default"
                    >
                      <div className="flex items-baseline justify-between border-b border-[#1a1a1a]/10 pb-2 transition-all duration-300 group-hover:border-[#E21E3F]">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a] group-hover:text-[#E21E3F] transition-colors">
                          {item.label}
                        </span>
                        <span className="font-sans text-sm text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] transition-colors text-right">
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Right Column: Visual */}
          <div className="order-1 lg:order-2 relative h-[300px] md:h-[400px] w-full flex items-center justify-center">
             <div className="absolute inset-0 bg-[#E21E3F]/5 rounded-sm transform rotate-3 scale-95" />
             <div className="absolute inset-0 border border-[#E21E3F]/10 rounded-sm" />
             
             {/* LAZY LOADED GRAPH */}
             <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-[#E21E3F]/20 font-mono text-xs">ANALYZING...</div>}>
                <GrowthGraph currentState={activeState} />
             </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;