import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import * as d3 from 'd3';
import BentoGrid from './components/BentoGrid';
import Modal from './components/Modal';
import TheArchitect from './components/TheArchitect';
import BookingCTA from './components/BookingCTA';
import ProofPage from './components/ProofPage';
import EvidenceVaultPage from './components/EvidenceVaultPage';
import ArchitectPage from './components/ArchitectPage'; 
import SystemPage from './components/SystemPage';
import ProcessPage from './components/ProcessPage';
import ContactPage from './components/ContactPage';
import Pillar1 from './components/Pillar1';
import Pillar2 from './components/Pillar2';
import Pillar3 from './components/Pillar3';
import Pillar4 from './components/Pillar4';
import Pillar5 from './components/Pillar5';
import Pillar6 from './components/Pillar6';
import Pillar7 from './components/Pillar7';
import GlobalFooter from './components/GlobalFooter';
import GlobalHeader from './components/GlobalHeader';
import HeroVisual from './components/HeroVisual';
import PageTransition from './components/PageTransition';
import Feature_Group7 from './components/Feature_Group7';
import { ServiceDetail } from './types';
import { XCircle } from 'lucide-react';

const TECH_STACK = [
  'WEBSITES', 'CRM', 'MARKETING AUTOMATION', 'AI ASSISTANTS', 'CONTENT MARKETING', 'DASHBOARDS'
];

// --- HOOK: SCREEN SIZE CHECK ---
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false); // Default false for safety
  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
}

// --- HELPERS (GrowthGraph) ---
const GrowthGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const width = 400; const height = 240;
    const margin = { top: 40, right: 60, bottom: 40, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    d3.select(containerRef.current).selectAll('*').remove();
    const svg = d3.select(containerRef.current).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    const xTicks = [0, 0.25, 0.5, 0.75, 1];
    chart.selectAll('.grid-line').data(xTicks).enter().append('line').attr('x1', d => d * chartWidth).attr('x2', d => d * chartWidth).attr('y1', -10).attr('y2', chartHeight + 10).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.05).attr('stroke-dasharray', '2,2');
    const barHeight = 12;
    const statG = chart.append('g').attr('transform', `translate(0, ${chartHeight / 2})`);
    statG.append('text').attr('y', -12).attr('class', 'font-mono text-[9px] uppercase tracking-[0.2em] fill-[#1a1a1a] opacity-40').text('AVERAGE TIME LOST');
    statG.append('rect').attr('width', chartWidth).attr('height', barHeight).attr('fill', '#1a1a1a').attr('opacity', 0.03);
    const statBar = statG.append('rect').attr('width', 0).attr('height', barHeight).attr('fill', '#C5A059');
    const statVal = statG.append('text').attr('x', 0).attr('y', barHeight / 2 + 4).attr('class', 'font-mono text-[10px] font-bold fill-[#C5A059]').attr('dx', 8).text('0 HRS/WEEK');
    statG.append('text').attr('x', chartWidth).attr('y', barHeight + 20).attr('class', 'font-mono text-[8px] uppercase tracking-[0.2em] fill-[#1a1a1a] opacity-40').attr('text-anchor', 'end').text('ON MANUAL ADMIN');
    function animate() {
      const duration = 4000; const ease = d3.easeCubicInOut;
      statBar.attr('width', 0); statVal.attr('x', 0).text('0 HRS/WEEK');
      statBar.transition().duration(duration).ease(ease).attr('width', chartWidth * 0.75);
      statVal.transition().duration(duration).ease(ease).attr('x', chartWidth * 0.75).tween('text', function() { const i = d3.interpolate(0, 15); return (t) => { statVal.text(`${Math.round(i(t))} HRS/WEEK`); }; }).on('end', () => { d3.timeout(animate, 2000); });
    }
    animate();
  }, []);
  return <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center bg-transparent" />;
};

// --- DATA ---
const AUDIT_DATA = [
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

// --- SUB-COMPONENTS ---

interface AuditCubeVisualProps {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const AuditCubeVisual: React.FC<AuditCubeVisualProps> = ({ scrollYProgress }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-10 border-2 border-[#1a1a1a] bg-transparent">
      <motion.div 
        className="absolute inset-0 border-2 border-[#1a1a1a] bg-transparent"
        style={{ rotate }}
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
  isDesktop: boolean;
}

const MobileCard: React.FC<{ data: typeof AUDIT_DATA[0], onNavigate?: (v: string) => void }> = ({ data, onNavigate }) => {
  const renderContent = () => (
    <div className="w-full h-full p-6 md:p-12 lg:p-20 flex flex-col justify-center max-w-[1600px] mx-auto">
      {data.type === 'cta' ? (
         <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto py-12 md:py-0">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight mb-10">
              You have seen the <span className="text-[#E21E3F]">leak.</span><br/>
              <span className="italic">Now see the <span className="text-[#C5A059]">fix.</span></span>
            </h2>
            <button 
              onClick={() => onNavigate && onNavigate('system')}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#1a1a1a] text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all duration-300 hover:border-[#C5A059]"
            >
               <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
               <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ SEE THE SYSTEM ]</span>
            </button>
         </div>
      ) : (
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
                  <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#1a1a1a] leading-[0.9] mb-6">
                     {data.title}
                  </h3>
                  <div className="inline-block bg-[#E21E3F]/10 px-4 py-2">
                     <span className="font-mono text-lg md:text-2xl text-[#E21E3F] font-bold tracking-tight">
                        {data.metric}
                     </span>
                  </div>
               </div>

               <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#E21E3F]/20 pl-6">
                  {data.description}
               </p>
            </div>
         </div>
      )}
    </div>
  );

  return (
    <div className="relative w-full border-b border-[#1a1a1a]/10 last:border-0 bg-[#FFF2EC] min-h-[50vh] flex flex-col justify-center">
      {renderContent()}
    </div>
  );
};

const DesktopCard: React.FC<CardProps> = ({ data, index, total, scrollYProgress, onNavigate }) => {
  const step = 0.25; 
  const peak = index * step;
  const range = [peak - step, peak, peak + step];
  
  const rotateX = useTransform(scrollYProgress, range, [-90, 0, 90]);
  const opacity = useTransform(scrollYProgress, 
    [peak - 0.25, peak - 0.15, peak, peak + 0.15, peak + 0.25], 
    [0, 1, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, range, [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, range, ["50%", "0%", "-50%"]);
  const zIndex = useTransform(scrollYProgress, [peak - 0.01, peak + 0.01], [0, 10]);
  const pointerEvents = useTransform(opacity, v => v > 0.5 ? 'auto' : 'none');

  const renderContent = () => (
    <div className="w-full h-full p-6 md:p-12 lg:p-20 flex flex-col justify-center max-w-[1600px] mx-auto">
      {data.type === 'cta' ? (
         <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto py-12 md:py-0">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight mb-10">
              You have seen the <span className="text-[#E21E3F]">leak.</span><br/>
              <span className="italic">Now see the <span className="text-[#C5A059]">fix.</span></span>
            </h2>
            <button 
              onClick={() => onNavigate && onNavigate('system')}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#1a1a1a] text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all duration-300 hover:border-[#C5A059]"
            >
               <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
               <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ SEE THE SYSTEM ]</span>
            </button>
         </div>
      ) : (
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
                  <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#1a1a1a] leading-[0.9] mb-6">
                     {data.title}
                  </h3>
                  <div className="inline-block bg-[#E21E3F]/10 px-4 py-2">
                     <span className="font-mono text-lg md:text-2xl text-[#E21E3F] font-bold tracking-tight">
                        {data.metric}
                     </span>
                  </div>
               </div>

               <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#E21E3F]/20 pl-6">
                  {data.description}
               </p>
            </div>

            <div className="hidden lg:flex items-center justify-center h-full min-h-[400px]">
               <AuditCubeVisual scrollYProgress={scrollYProgress} />
            </div>
         </div>
      )}
    </div>
  );

  return (
    <motion.div
      style={{ opacity, rotateX, scale, y, zIndex, pointerEvents, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center bg-[#FFF2EC] origin-center"
    >
      {renderContent()}
    </motion.div>
  );
};

const Card: React.FC<CardProps> = ({ data, index, total, scrollYProgress, onNavigate, isDesktop }) => {
  if (!isDesktop) {
    return <MobileCard data={data} onNavigate={onNavigate} />;
  }
  return <DesktopCard data={data} index={index} total={total} scrollYProgress={scrollYProgress} onNavigate={onNavigate} isDesktop={isDesktop} />;
};

const FrictionAuditSection: React.FC<{ onNavigate: (v: string) => void }> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  
  const { scrollYProgress: realScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const dummyScrollProgress = useMotionValue(0.5);
  const scrollYProgress = isDesktop ? realScrollProgress : dummyScrollProgress;

  return (
    <section 
        ref={containerRef} 
        className={`relative bg-[#FFF2EC] z-30 ${isDesktop ? 'h-[500vh]' : 'h-auto py-20'}`}
    >
       {isDesktop && (
         <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
            {[...Array(5)].map((_, i) => (
               <div key={i} className="h-screen w-full snap-start" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
            ))}
         </div>
       )}

      <div className={`${isDesktop ? 'sticky top-0 h-screen overflow-hidden' : 'relative h-auto'} w-full flex flex-col md:flex-row z-10 border-t border-[#1a1a1a]/10`}>
        
        {/* Left Panel */}
        <div className={`w-full md:w-[450px] border-b md:border-b-0 md:border-r border-[#1a1a1a]/10 bg-[#FFF2EC] p-8 md:p-12 lg:p-16 flex flex-col justify-between shrink-0 z-50 ${isDesktop ? 'md:h-full' : 'h-auto'}`}>
           <div>
              <div className="mb-8 font-mono text-xs text-[#E21E3F] tracking-[0.2em] uppercase flex items-center gap-2">
                 <div className="w-2 h-2 bg-[#E21E3F]"></div>
                 02 // THE FRICTION AUDIT
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-[#1a1a1a] mb-8">
                 Where your <br/>
                 <span className="text-[#E21E3F]">margin</span> <br/>
                 <span className="italic">evaporates.</span>
              </h1>
              <div className="w-12 h-1 bg-[#1a1a1a] mb-8"></div>
              <p className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed max-w-xs">
                 Your business isn't broken, but it is leaking. These are the 4 silent fracture points where profit disappears before it hits your bank.
              </p>
           </div>
           
           {isDesktop && (
             <div className="hidden md:block">
                <div className="font-mono text-[10px] text-[#1a1a1a]/40 uppercase mb-2">Audit Progress</div>
                <div className="w-full h-1 bg-[#1a1a1a]/10 relative overflow-hidden">
                   <motion.div className="h-full bg-[#E21E3F]" style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} />
                </div>
                <div className="mt-2 text-right font-mono text-[10px] text-[#1a1a1a]">
                   <motion.span>{useTransform(scrollYProgress, v => `${Math.min(100, Math.round(v * 100))}%`)}</motion.span>
                </div>
             </div>
           )}
        </div>

        {/* Right Panel */}
        <div 
            className={`flex-1 relative bg-[#FFF2EC] ${isDesktop ? 'h-full overflow-hidden' : 'h-auto flex flex-col'}`}
            style={isDesktop ? { perspective: "1000px" } : {}}
        >
           {AUDIT_DATA.map((data, index) => (
             <Card 
               key={data.id}
               data={data}
               index={index}
               total={AUDIT_DATA.length}
               scrollYProgress={scrollYProgress}
               onNavigate={onNavigate}
               isDesktop={isDesktop}
             />
           ))}
           
           {isDesktop && (
             <div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{ backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
           )}
        </div>
      </div>
    </section>
  );
};

const BookAuditButton: React.FC<{ onNavigate: (v: string) => void }> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const archSection = document.getElementById('architecture');
      if (archSection) {
        const rect = archSection.getBoundingClientRect();
        if (rect.top < 0) setVisible(true); else setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          onClick={() => onNavigate('contact')}
          className="fixed bottom-8 right-8 z-50 bg-[#1a1a1a] text-[#FFF2EC] px-6 py-3 rounded-full shadow-2xl font-mono text-[10px] uppercase tracking-widest font-bold border border-[#C5A059]/50 hover:bg-[#C5A059] hover:text-[#1a1a1a] transition-colors duration-300 hidden md:flex items-center gap-2"
        >
          <span>[ BOOK AUDIT ]</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrambleText, setScrambleText] = useState("ARCHITECT");
  const [isTickerHovered, setIsTickerHovered] = useState(false);
  
  type ViewState = 'homepage' | 'architect' | 'system' | 'process' | 'proof' | 'evidence-vault' | 'contact' | 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4' | 'pillar5' | 'pillar6' | 'pillar7';
  const [currentView, setCurrentView] = useState<ViewState>('homepage');

  const { scrollY } = useScroll();
  const carouselX = useMotionValue(0);
  const xPercent = useTransform(carouselX, (value) => `${value}%`);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useAnimationFrame((t, delta) => {
    if (currentView !== 'homepage') return;
    const speed = isTickerHovered ? 0 : 0.0006;
    let moveBy = speed * delta;
    const currentX = carouselX.get();
    let nextX = currentX - moveBy;
    if (nextX <= -50) nextX = 0;
    carouselX.set(nextX);
  });

  useEffect(() => {
    const roles = ["ARCHITECT", "NAVIGATOR", "ENGINEER"];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roleIndex = 0;
    const scrambleInterval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      const target = roles[roleIndex];
      let iterations = 0;
      const interval = setInterval(() => {
        setScrambleText(prev => target.split("").map((_, i) => i < iterations ? target[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
        if (iterations >= target.length) clearInterval(interval);
        iterations += 1;
      }, 60);
    }, 7000);
    return () => clearInterval(scrambleInterval);
  }, []);

  const handleGlobalNavigate = (view: string, sectionId?: string) => {
    setCurrentView(view as ViewState);
    window.scrollTo(0,0);
  };

  return (
    <div className="bg-[#FFF2EC] selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col">
      {currentView !== 'contact' && (
        <GlobalHeader currentView={currentView} onNavigate={handleGlobalNavigate} scrolled={scrolled} />
      )}

      <PageTransition currentView={currentView}>
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {currentView === 'homepage' && (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* HERO SECTION */}
                <section id="hero" className="min-h-screen w-full flex items-center pt-20 overflow-hidden relative z-20 content-layer">
                  <HeroVisual />
                  <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                    <div className="lg:col-span-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                      <div className="flex items-center gap-4 mb-10 overflow-hidden justify-center lg:justify-start">
                        <span className="text-xs font-bold tracking-widest uppercase text-[#1a1a1a]">/</span>
                        <span className="text-xs font-bold tracking-widest uppercase text-[#1a1a1a] mt-[1px]">
                          SYDNEY BUSINESS AUTOMATION 
                          <span className="font-mono font-bold ml-2 text-[#C5A059]">
                            [ {scrambleText} ]
                          </span>
                        </span>
                      </div>
                      <h1 className="font-serif text-5xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tighter text-[#1a1a1a] mb-10">
                        <div className="overflow-hidden"><span className="block reveal-text">Stop Doing</span></div>
                        <div className="overflow-hidden"><span className="block reveal-text" style={{ animationDelay: '0.2s' }}><span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Everyone's Job.</span></span></div>
                      </h1>
                      <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-[#1a1a1a]/20 pl-6 animate-fade-in text-left mx-auto lg:mx-0" style={{ animationDelay: '0.6s' }}>You didn't start a business to chase invoices, re-type data, and answer the same questions all day. I build the systems that do it for you — websites, CRMs, automations, and AI — so you can get back to the work that actually grows revenue.</p>
                      <div className="mt-16 flex flex-col sm:flex-row items-center gap-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <button onClick={() => handleGlobalNavigate('contact')} className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-widest font-bold overflow-hidden transition-all duration-300">
                          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ LET'S TALK ]</span>
                        </button>
                        <a href="#architecture" onClick={(e) => { e.preventDefault(); document.getElementById('architecture')?.scrollIntoView({behavior: 'smooth'}); }} className="relative group flex items-center gap-3 cursor-pointer">
                          <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 group-hover:border-b-2 group-hover:pb-1 transition-all duration-300 font-bold">SEE HOW IT WORKS</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[1px] bg-[#1a1a1a]/10 overflow-hidden">
                     <motion.div initial={{ y: '-100%' }} animate={{ y: '100%' }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-[#1a1a1a]/40" />
                  </div>
                </section>

                {/* CAROUSEL */}
                <div className="w-full bg-[#1a1a1a]/5 py-10 border-y border-black/5 overflow-hidden relative z-30" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }} onMouseEnter={() => setIsTickerHovered(true)} onMouseLeave={() => setIsTickerHovered(false)}>
                  <div className="flex whitespace-nowrap">
                    <motion.div className="flex items-center pr-0" style={{ x: xPercent }}>
                      {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                        <div key={i} className="flex items-center group cursor-default">
                            <span className="font-mono text-sm font-bold tracking-[0.2em] text-[#1a1a1a]/40 group-hover:text-[#C5A059] transition-colors duration-300 px-12">{tech}</span>
                            <span className="text-[#C5A059] text-[10px] opacity-50">//</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* DIAGNOSIS SECTION (Global #01) */}
                <motion.section id="diagnosis" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-[1px] bg-[#1a1a1a]/10" />
                  <div className="max-w-[1600px] mx-auto border-t border-l border-[#1a1a1a]/10">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-1 md:col-span-2 p-12 md:p-16 border-r border-b border-[#1a1a1a]/10 flex flex-col justify-center min-h-[350px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-10 block">01 / THE PROBLEM</span>
                        <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] text-[#1a1a1a] tracking-tighter">You didn't start your business to become an <br /><span className="italic text-[#1a1a1a]/60">administrative hostage.</span></h2>
                      </div>
                      <div className="col-span-1 border-r border-b border-[#1a1a1a]/10 bg-transparent">
                        <GrowthGraph />
                      </div>
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 min-h-[300px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-8 block">02 / SYMPTOMS</span>
                        <ul className="space-y-6">
                           <li className="flex items-start gap-4"><XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-0.5" /><div className="font-sans text-lg text-[#1a1a1a]/70"><strong className="text-[#1a1a1a]">The Bottleneck Boss:</strong> You are answering questions instead of doing deep work.</div></li>
                           <li className="flex items-start gap-4"><XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-0.5" /><div className="font-sans text-lg text-[#1a1a1a]/70"><strong className="text-[#1a1a1a]">The Double-Entry Tax:</strong> Typing the same data into two different apps.</div></li>
                           <li className="flex items-start gap-4"><XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-0.5" /><div className="font-sans text-lg text-[#1a1a1a]/70"><strong className="text-[#1a1a1a]">The Sunday Grind:</strong> Invoicing and admin eating your weekends.</div></li>
                        </ul>
                      </div>
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#E21E3F]/5 min-h-[300px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-8 block">03 / THE COST</span>
                        <div className="space-y-4">
                          <div className="font-sans text-3xl font-bold text-[#E21E3F] uppercase tracking-tighter">BURNING TALENT</div>
                          <p className="font-sans text-sm text-[#E21E3F]/70 leading-relaxed uppercase tracking-widest">Paying high-value staff to do low-value data entry.</p>
                        </div>
                      </div>
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-white min-h-[300px] flex flex-col justify-between border-l-2 border-l-[#C5A059]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] block">04 / THE FIX</span>
                        <p className="font-serif text-2xl md:text-3xl leading-tight mb-8">I build the systems that do the boring work for you. Your team gets their time back. You get your business back.</p>
                        <button onClick={() => document.getElementById('architecture')?.scrollIntoView({behavior: 'smooth'})} className="flex items-center gap-3 font-mono text-[10px] text-[#C5A059] uppercase tracking-[0.3em] hover:text-white transition-colors cursor-pointer group">[ SEE HOW IT WORKS ]</button>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <FrictionAuditSection onNavigate={handleGlobalNavigate} />
                <BentoGrid onServiceClick={(s) => {
                  if (window.innerWidth >= 1024) {
                    setSelectedService(s);
                    setIsModalOpen(true);
                  } else {
                    handleGlobalNavigate(s.id);
                  }
                }} />
                <TheArchitect />
                <Feature_Group7 />
                <BookingCTA />
                <BookAuditButton onNavigate={handleGlobalNavigate} />
              </motion.div>
            )}

            {currentView === 'architect' && <ArchitectPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'system' && <SystemPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'process' && <ProcessPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'proof' && <ProofPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'evidence-vault' && <EvidenceVaultPage onBack={() => handleGlobalNavigate('proof')} />}
            {currentView === 'contact' && <ContactPage onBack={() => handleGlobalNavigate('homepage')} />}
            
            {/* PILLARS */}
            {currentView === 'pillar1' && <Pillar1 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar2' && <Pillar2 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar3' && <Pillar3 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar4' && <Pillar4 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar5' && <Pillar5 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar6' && <Pillar6 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar7' && <Pillar7 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />}

          </AnimatePresence>
        </main>
      </PageTransition>

      {/* FOOTER & MODAL */}
      {currentView !== 'system' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(id) => handleGlobalNavigate(id)} />
    </div>
  );
};

export default App;