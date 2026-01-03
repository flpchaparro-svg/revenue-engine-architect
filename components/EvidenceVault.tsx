import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Activity, ArrowUpRight, X } from 'lucide-react';

// --- DATA ---
const CASE_STUDIES = [
  {
    id: 'logistics',
    client: 'National Trade Fleet',
    result: 100,
    suffix: '% Capture',
    tag: 'REVENUE_CAPTURE',
    stack: ['Vapi.ai', 'Make.com', 'HubSpot'],
    description: 'Deployed a Voice AI interface to handle inbound emergency calls for a 40-van fleet. Eliminated missed-call revenue leakage instantly.',
    metrics: ['Missed Calls: 0%', 'Response Time: <2s', 'Revenue Saved: $45k/mo'],
    bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200'
  },
  {
    id: 'legal',
    client: 'Boutique Law Firm',
    result: 25,
    suffix: 'hrs/wk',
    tag: 'LABOUR_ARBITRAGE',
    stack: ['Claude 3.5', 'Supabase', 'Python'],
    description: 'Automated the extraction of data from client emails directly into the Case Management System. Removed the need for a junior paralegal.',
    metrics: ['Data Entry: 0hrs', 'Accuracy: 100%', 'Billable Gain: +$8k/mo'],
    bg: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200'
  }
];

// --- COMPONENTS ---

const CountingMetric: React.FC<{ value: number, suffix: string }> = ({ value, suffix }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = value;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / end));
        const timer = setInterval(() => {
          start += 1;
          setDisplayValue(start);
          if (start >= end) clearInterval(timer);
        }, stepTime);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-6xl font-sans font-thin tracking-[-0.05em] text-[#C5A059] mb-6 relative z-10 tabular-nums">
      +{displayValue}<span className="text-[0.5em] tracking-normal font-normal ml-1">{suffix}</span>
    </div>
  );
};

const EvidenceCard: React.FC<{ 
  study: typeof CASE_STUDIES[0], 
  index: number, 
  scrollProgress: any, 
  onOpen: (s: any) => void 
}> = ({ study, index, scrollProgress, onOpen }) => {
  
  // 1. SCROLL PHYSICS
  // Even index (Left Column) moves from -200 to 0
  // Odd index (Right Column) moves from 200 to 0
  const xOffset = index % 2 === 0 ? -200 : 200;
  
  // Transform the shared scroll progress into specific X movement for this card
  // Input: [0 (Start), 1 (End)] -> Output: [Offset, 0]
  const x = useTransform(scrollProgress, [0, 1], [xOffset, 0]);
  const opacity = useTransform(scrollProgress, [0, 0.3], [0, 1]); // Fade in quickly

  // 2. MOUSE TILT PHYSICS
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 25, stiffness: 200 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div 
      style={{ x, opacity }} // Bind the Scroll Physics here
      className="h-full"
    >
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: 'preserve-3d',
          boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.1)'
        }}
        whileHover={{ y: -5 }}
        onClick={() => onOpen(study)}
        className="group cursor-pointer bg-[#1a1a1a] border border-white/10 p-12 relative overflow-hidden transition-all duration-500 rounded-none h-full"
      >
        {/* Background Image Logic */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">
           <img src={study.bg} alt="" className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-1000" />
           <div className="absolute inset-0 bg-[#1a1a1a]/80 group-hover:bg-[#1a1a1a]/40 transition-colors" />
        </div>

        {/* Card Content */}
        <div className="flex justify-between items-start mb-12 relative z-10" style={{ transform: 'translateZ(20px)' }}>
          <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.4em] uppercase font-bold">{study.tag}</span>
          <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-all">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <h3 className="font-serif text-4xl text-[#FFF2EC] mb-4 relative z-10" style={{ transform: 'translateZ(30px)' }}>{study.client}</h3>
        <CountingMetric value={study.result} suffix={study.suffix} />
        
        <div className="flex flex-wrap gap-2 mb-8 relative z-10" style={{ transform: 'translateZ(15px)' }}>
          {study.stack.map(tech => (
            <span key={tech} className="px-3 py-1 border border-white/10 text-[9px] font-mono text-white/50 uppercase tracking-widest group-hover:border-[#C5A059]/30 group-hover:text-[#FFF2EC] transition-colors">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono text-white/20 uppercase tracking-widest group-hover:text-[#C5A059] transition-colors relative z-10">
          View System Specs <ArrowUpRight className="w-3 h-3" />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

const EvidenceVault: React.FC = () => {
  const [activeStudy, setActiveStudy] = useState<typeof CASE_STUDIES[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Track Scroll Progress of this specific section
  // "start end" = When top of section hits bottom of viewport (Starts animating)
  // "center center" = When center of section hits center of viewport (Cards meet)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // 2. Add weight/smoothing so it feels like heavy machinery
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef} 
      id="evidence" 
      className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 border-t border-black/5 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-4 block uppercase font-bold">/ DEPLOYMENT LOGS</span>
            <h2 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] leading-none tracking-tighter">Operational <span className="italic text-black/20">Logs.</span></h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-black/30 text-[10px] uppercase tracking-widest text-right">
            <Activity className="w-3 h-3 text-[#C5A059]" />
            LIVE_LOGS // SYNC_ACTIVE
          </div>
        </div>

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[2000px]">
          {CASE_STUDIES.map((study, index) => (
            <EvidenceCard 
              key={study.id} 
              study={study} 
              index={index} 
              scrollProgress={smoothProgress} // Pass the single shared spring
              onOpen={setActiveStudy} 
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeStudy && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveStudy(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="bg-white w-full max-w-4xl relative z-10 p-12 overflow-hidden rounded-none border border-black/20 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setActiveStudy(null)} className="absolute top-8 right-8 text-black/40 hover:text-[#C5A059] transition-colors z-50">
                <X className="w-8 h-8" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-7">
                  <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.4em] uppercase mb-4 block font-bold">Deployment_Verified // {activeStudy.id}</span>
                  <h3 className="font-serif text-5xl lg:text-6xl mb-6 tracking-tighter">{activeStudy.client}</h3>
                  <p className="text-xl text-black/70 italic mb-8 leading-relaxed font-light border-l-2 border-[#C5A059] pl-6">
                    "{activeStudy.description}"
                  </p>
                  <div className="aspect-video bg-[#1a1a1a] flex items-center justify-center group relative cursor-pointer border border-black/10 overflow-hidden rounded-none">
                    <img src={activeStudy.bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity duration-700 group-hover:opacity-40" />
                    <span className="font-mono text-[10px] text-[#C5A059] animate-pulse tracking-[0.2em] relative z-10">[ INITIATE_WALKTHROUGH ]</span>
                  </div>
                </div>
                
                <div className="md:col-span-5 border-l border-black/10 pl-12 flex flex-col justify-center">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-10 text-black/30">Verified Metrics</h4>
                  <ul className="space-y-8">
                    {activeStudy.metrics.map((m, i) => (
                      <li key={i} className="flex items-center gap-6 group">
                        <div className="w-1.5 h-1.5 bg-[#E21E3F] group-hover:rotate-45 transition-transform duration-300"></div>
                        <span className="font-sans font-medium text-xl tracking-tight text-[#1a1a1a]">{m}</span>
                      </li>
                    ))}
                  </ul>

                  <a 
                    href="https://meetings-ap1.hubspot.com/felipe" 
                    target="_blank" 
                    className="group relative mt-16 flex items-center justify-center py-5 px-8 bg-transparent border border-black text-black font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-500 rounded-none overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">[ REPLICATE THIS ARCHITECTURE ]</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EvidenceVault;