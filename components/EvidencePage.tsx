
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Activity, Database, ArrowRight, ArrowLeft } from 'lucide-react';
import EvidenceVisual_Compare from './EvidenceVisual_Compare';

interface EvidencePageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- HELPER: ANIMATED COUNTER ---
const CountUp: React.FC<{ value: number, suffix?: string }> = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const incrementTime = duration / value;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const EvidencePage: React.FC<EvidencePageProps> = ({ onBack, onNavigate }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 relative z-[150] overflow-x-hidden flex flex-col">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow pb-32">
        
        {/* HEADER (Restored) */}
        <div className="flex justify-between items-center mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Engine
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30">CASE_LOG: GROUP_7</span>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
           <div>
              <span className="font-mono text-xs text-[#C5A059] tracking-widest mb-6 block uppercase font-bold">/ ENGINEERING_AUDIT_001</span>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-8">
                 Is your architecture <br/><span className="italic text-[#C5A059]">leaking?</span>
              </h1>
              <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6">
                 We don't guess. We measure. Here is what happens when you replace "Opinion" with "Engineering."
              </p>
           </div>
           <div>
              {/* THE VISUAL SLIDER */}
              <EvidenceVisual_Compare />
           </div>
        </div>

        {/* METRICS GRID (With Live Counters) */}
        <div className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <Activity className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Google Speed Index</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#C5A059] transition-colors">
                 <CountUp value={94} suffix="/100" />
              </div>
              <p className="text-sm text-black/50">Up from 42/100. Friction eliminated.</p>
           </div>
           
           <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <Database className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Data Integrity</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#C5A059] transition-colors">
                 <CountUp value={100} suffix="%" />
              </div>
              <p className="text-sm text-black/50">Tracking accuracy. Zero lost leads.</p>
           </div>

           <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Lead Velocity</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#C5A059] transition-colors">
                 <CountUp value={12} suffix="s" />
              </div>
              <p className="text-sm text-black/50">Time to first response (Automation).</p>
           </div>
        </div>

        {/* BOOKING CTA - FIXED: DARK THEME + EMERALD ACCENT + SLIDE ANIMATION */}
        <div className="bg-zinc-900 border border-zinc-800 text-zinc-100 p-12 md:p-24 relative overflow-hidden mb-32 rounded-sm shadow-2xl">
           <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="font-serif text-5xl md:text-6xl mb-8">
                 Stop leaking <span className="italic text-emerald-500">revenue.</span>
              </h2>
              
              <button 
                onClick={() => onNavigate('landing', 'booking')}
                className="group relative px-10 py-5 bg-transparent text-zinc-100 border border-zinc-700 font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300 hover:border-zinc-500"
              >
                 {/* Slide Up Background Layer */}
                 <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                 
                 {/* Content Layer */}
                 <span className="relative z-10 group-hover:text-zinc-900 transition-colors duration-500 flex items-center gap-3">
                    [ SCHEDULE_DIAGNOSTIC ] <ArrowRight className="w-4 h-4" />
                 </span>
              </button>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default EvidencePage;
