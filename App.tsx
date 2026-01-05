import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as d3 from 'd3';
import BentoGrid from './components/BentoGrid';
import Modal from './components/Modal';
import TheArchitect from './components/TheArchitect';
import BookingCTA from './components/BookingCTA';
import EvidencePage from './components/EvidencePage';
import EvidenceVaultPage from './components/EvidenceVaultPage'; // Added Import
import AboutPage from './components/AboutPage'; 
import ArchitecturePage from './components/ArchitecturePage';
import ProtocolPage from './components/ProtocolPage';
import ContactPage from './components/ContactPage';
import Pillar1 from './components/Pillar1';
import Pillar2 from './components/Pillar2';
import PillarPage_Automation from './components/PillarPage_Automation';
import PillarPage_Cognitive from './components/PillarPage_Cognitive';
import PillarPage_Media from './components/PillarPage_Media';
import PillarPage_Adoption from './components/PillarPage_Adoption';
import PillarPage_Intelligence from './components/PillarPage_Intelligence';
import GlobalFooter from './components/GlobalFooter';
import GlobalHeader from './components/GlobalHeader';
import HeroVisual from './components/HeroVisual';
import PageTransition from './components/PageTransition';
import Feature_Group7 from './components/Feature_Group7';
import { ServiceDetail } from './types';
import { XCircle } from 'lucide-react';

const TECH_STACK = [
  'XERO', 'SHOPIFY', 'PYTHON', 'OPENAI_API', 'MAKE', 'HUBSPOT', 
  'TWILIO', 'SUPABASE', 'KLAVIYO', 'STRIPE_CONNECT'
];

// --- HELPERS (GrowthGraph, FrictionVisual, MagneticField) ---
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
    const barHeight = 12; const gap = 60;
    const prodG = chart.append('g').attr('transform', `translate(0, ${chartHeight / 2 - gap / 2})`);
    prodG.append('text').attr('y', -12).attr('class', 'font-mono text-[9px] uppercase tracking-[0.2em] fill-[#1a1a1a] opacity-40').text('REVENUE_VELOCITY');
    prodG.append('rect').attr('width', chartWidth).attr('height', barHeight).attr('fill', '#1a1a1a').attr('opacity', 0.03);
    const prodBar = prodG.append('rect').attr('width', 0).attr('height', barHeight).attr('fill', '#C5A059');
    const prodVal = prodG.append('text').attr('x', 0).attr('y', barHeight / 2 + 4).attr('class', 'font-mono text-[10px] font-bold fill-[#C5A059]').attr('dx', 8).text('0%');
    const adminG = chart.append('g').attr('transform', `translate(0, ${chartHeight / 2 + gap / 2})`);
    adminG.append('text').attr('y', -12).attr('class', 'font-mono text-[9px] uppercase tracking-[0.2em] fill-[#1a1a1a] opacity-40').text('OPERATIONAL_DRAG');
    adminG.append('rect').attr('width', chartWidth).attr('height', barHeight).attr('fill', '#1a1a1a').attr('opacity', 0.03);
    const adminBar = adminG.append('rect').attr('width', chartWidth).attr('height', barHeight).attr('fill', '#E21E3F');
    const adminVal = adminG.append('text').attr('x', chartWidth).attr('y', barHeight / 2 + 4).attr('class', 'font-mono text-[10px] font-bold fill-[#E21E3F]').attr('dx', 8).text('100%');
    function animate() {
      const duration = 4000; const ease = d3.easeCubicInOut;
      prodBar.attr('width', 0); prodVal.attr('x', 0).text('0%');
      adminBar.attr('width', chartWidth); adminVal.attr('x', chartWidth).text('100%');
      prodBar.transition().duration(duration).ease(ease).attr('width', chartWidth * 0.95);
      prodVal.transition().duration(duration).ease(ease).attr('x', chartWidth * 0.95).tween('text', function() { const i = d3.interpolate(0, 95); return (t) => { prodVal.text(`${Math.round(i(t))}%`); }; });
      adminBar.transition().duration(duration).ease(ease).attr('width', chartWidth * 0.12);
      adminVal.transition().duration(duration).ease(ease).attr('x', chartWidth * 0.12).tween('text', function() { const i = d3.interpolate(100, 12); return (t) => { adminVal.text(`${Math.round(i(t))}%`); }; }).on('end', () => { d3.timeout(animate, 2000); });
    }
    animate();
  }, []);
  return <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center bg-transparent" />;
};

const MagneticField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles: {x:number, y:number, bx:number, by:number}[] = [];
    const spacing = 100;
    const rows = Math.ceil(height / spacing);
    const cols = Math.ceil(width / spacing);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            particles.push({ x: i * spacing, y: j * spacing, bx: i * spacing, by: j * spacing });
        }
    }
    let mouse = { x: -1000, y: -1000 };
    const handleMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMove);
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = Math.max(0, 300 - dist) / 300;
            const angle = Math.atan2(dy, dx);
            const moveX = Math.cos(angle) * force * -40;
            const moveY = Math.sin(angle) * force * -40;
            p.x += (p.bx + moveX - p.x) * 0.1;
            p.y += (p.by + moveY - p.y) * 0.1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(26, 26, 26, ${0.05 + force * 0.1})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('mousemove', handleMove); window.removeEventListener('resize', handleResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const FrictionVisual: React.FC<{ type: string }> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    // Cleanup
    d3.select(container).selectAll('*').remove();
    
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;
    const svg = d3.select(container).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('overflow', 'visible');
      
    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);
    const ink = '#1a1a1a';
    const alert = '#E21E3F';

    // 1. LEAKAGE: Continuous smooth flow upwards
    if (type === 'leakage') {
       // Base
       g.append('line').attr('x1', -50).attr('x2', 50).attr('y1', 60).attr('y2', 60).attr('stroke', ink).attr('stroke-width', 2).attr('opacity', 0.2);
       
       const particleGroup = g.append('g');
       const emitParticle = () => {
         particleGroup.append('circle')
           .attr('cx', (Math.random() - 0.5) * 60)
           .attr('cy', 60)
           .attr('r', Math.random() * 2 + 1)
           .attr('fill', alert)
           .attr('opacity', 0.8)
           .transition().duration(2500).ease(d3.easeSinOut)
           .attr('cy', -80) // Float up
           .attr('opacity', 0)
           .remove();
       };
       // High frequency emission for "Flow" feel
       const timer = d3.interval(emitParticle, 100); 
       return () => timer.stop();
    }

    // 2. SILOS: Fluid repulsion/attraction (Organic)
    else if (type === 'silos') {
       const c1 = g.append('circle').attr('r', 15).attr('fill', 'none').attr('stroke', ink).attr('stroke-width', 2);
       const c2 = g.append('circle').attr('r', 15).attr('fill', 'none').attr('stroke', ink).attr('stroke-width', 2);
       
       // Center marker (The gap)
       g.append('line').attr('y1', -20).attr('y2', 20).attr('stroke', alert).attr('stroke-width', 1).attr('stroke-dasharray', '2,2');

       d3.timer((t) => {
          // Smooth sine wave movement
          const x = 30 + Math.sin(t * 0.002) * 15;
          c1.attr('cx', -x);
          c2.attr('cx', x);
          // Pulse opacity
          const op = 0.5 + Math.sin(t * 0.005) * 0.3;
          c1.attr('opacity', op);
          c2.attr('opacity', op);
       });
    }

    // 3. TRAP: Heavy Breathing (Square)
    else if (type === 'trap') {
       const rect = g.append('rect')
         .attr('x', -30).attr('y', -30)
         .attr('width', 60).attr('height', 60)
         .attr('fill', 'none')
         .attr('stroke', ink).attr('stroke-width', 2);
       
       const inner = g.append('rect')
         .attr('x', -10).attr('y', -10)
         .attr('width', 20).attr('height', 20)
         .attr('fill', alert).attr('opacity', 0.8);

       d3.timer((t) => {
          // Slow, heavy breathe
          const scale = 1 + Math.sin(t * 0.001) * 0.1;
          rect.attr('transform', `scale(${scale})`);
          // Inner box rotates slowly
          inner.attr('transform', `rotate(${t * 0.05})`);
       });
    }

    // 4. BLIND: Searching Radar (Scanning)
    else if (type === 'blind') {
       const radar = g.append('circle').attr('r', 40).attr('fill', 'none').attr('stroke', ink).attr('stroke-width', 1).attr('opacity', 0.3);
       const scanLine = g.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', -40).attr('stroke', alert).attr('stroke-width', 2);
       
       d3.timer((t) => {
          scanLine.attr('transform', `rotate(${t * 0.1})`);
          // Random blips
          if (Math.random() > 0.95) {
             g.append('circle')
               .attr('cx', (Math.random()-0.5)*60)
               .attr('cy', (Math.random()-0.5)*60)
               .attr('r', 2).attr('fill', ink).attr('opacity', 1)
               .transition().duration(500).attr('opacity', 0).remove();
          }
       });
    }
  }, [type]);
  return <div ref={containerRef} className="w-full h-full" />;
};

// ... (Rest of existing Helpers: FrictionAuditSection, BookAuditButton) ...
// Keeping existing helper code as is, only updating the App component return structure.

const FrictionAuditSection: React.FC<{ onNavigate: (v:string)=>void }> = ({ onNavigate }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activePoint, setActivePoint] = useState(1);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = Number(entry.target.getAttribute('data-index'));
                    if (!isNaN(idx)) setActivePoint(idx + 1);
                }
            });
        }, { threshold: 0.5 });

        const items = document.querySelectorAll('.friction-item');
        items.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);
    
    // ... data ...
    const FRICTION_POINTS = [
      { id: 'leakage', number: '01', label: 'CRITICAL_FAILURE', title: 'Lead Evaporation', stat: '-$500 / DAY', body: "Demand hits your site and vanishes. Your current form logic is a sieve, not a catcher. You are paying for leads that expire in the inbox." },
      { id: 'silos', number: '02', label: 'INEFFICIENCY', title: 'The Double-Entry Tax', stat: '15 HRS / WK', body: "Sales types it. Ops types it again. Finance types it a third time. You are paying triple wages for the same data entry errors." },
      { id: 'trap', number: '03', label: 'BOTTLENECK', title: 'Admin Paralysis', stat: 'GROWTH CAP', body: "You are the 'Chief Admin Officer'. You spend 40% of your week fixing invoices and scheduling instead of steering the ship." },
      { id: 'blind', number: '04', label: 'HIGH_RISK', title: 'Profit Blindness', stat: 'UNKNOWN', body: "You know your Revenue, but not your Real-Time Margin. You are flying a 747 through a storm with no radar." }
    ];

    return (
        <section ref={sectionRef} className="relative bg-[#FFF2EC] z-30 border-t border-[#1a1a1a]/5">
            <MagneticField />
            <div className="max-w-[1450px] mx-auto flex flex-col md:flex-row relative z-10 border-x border-[#1a1a1a]/5 bg-[#FFF2EC]/80 backdrop-blur-sm">
                <div className="w-full md:w-2/5 h-auto md:h-screen sticky top-0 flex flex-col justify-center px-12 md:px-20 border-r border-[#1a1a1a]/5">
                    <div className="max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest font-bold opacity-70">02 // THE FRICTION AUDIT</span>
                            <span className="font-mono text-xl font-bold text-[#E21E3F]">0{activePoint} / 04</span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-[0.9] tracking-tighter mb-8">Where your <br /><span className="text-[#E21E3F]">margin</span> <br /><span className="italic text-[#E21E3F]">evaporates.</span></h2>
                        <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed border-l-2 border-[#E21E3F]/30 pl-6">Your business isn't broken, but it is leaking. These are the 4 silent fracture points where profit disappears before it hits your bank.</p>
                    </div>
                </div>
                <div className="w-full md:w-3/5 bg-transparent relative">
                    {FRICTION_POINTS.map((point, idx) => (
                        <div key={point.id} data-index={idx} className="friction-item min-h-[80vh] flex flex-col justify-center p-12 md:p-24 border-b border-[#1a1a1a]/5">
                            <div className="max-w-xl">
                                <div className="flex items-center gap-4 mb-4">
                                   <span className="font-serif italic text-4xl opacity-20">{point.number}</span>
                                   <span className="font-mono text-xs text-red-600 border border-red-600/20 px-2 py-1 rounded-full font-bold">[{point.label}]</span>
                                </div>
                                <h3 className="font-serif text-4xl md:text-5xl mb-4 text-[#1a1a1a] tracking-tight leading-none">{point.title}</h3>
                                <div className="font-mono text-xl text-red-600 font-bold mb-6">{point.stat}</div>
                                <p className="font-sans text-lg md:text-xl opacity-70 mb-10 border-l-2 border-red-600/20 pl-6 leading-relaxed font-light">{point.body}</p>
                                <div className="w-full h-48 mt-12 relative flex items-center justify-center">
                                    <div className="absolute inset-0 bg-transparent border-t border-b border-[#1a1a1a]/5" />
                                    <FrictionVisual type={point.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="h-[80vh] flex items-center justify-center p-12 md:p-24 bg-[#FFF2EC]">
                        <div className="text-center max-w-2xl">
                            <h3 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] leading-[0.9] mb-12">You have seen the <span className="text-[#E21E3F] italic">leak.</span> <br/>Now see the <span className="text-[#C5A059] italic">fix.</span></h3>
                            <button onClick={() => onNavigate('architecture')} className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#1a1a1a] text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all duration-300">
                                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                                <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ EXPLORE_ARCHITECTURE ]</span>
                            </button>
                        </div>
                    </div>
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
  
  type ViewState = 'landing' | 'about' | 'architecture' | 'protocol' | 'evidence' | 'evidence-vault' | 'contact' | 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4' | 'pillar5' | 'pillar6' | 'pillar7';
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const { scrollY } = useScroll();
  const carouselX = useMotionValue(0);
  const xPercent = useTransform(carouselX, (value) => `${value}%`);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useAnimationFrame((t, delta) => {
    if (currentView !== 'landing') return;
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
            {currentView === 'landing' && (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* HERO SECTION */}
                <section id="hero" className="min-h-screen w-full flex items-center pt-20 overflow-hidden relative z-20 content-layer">
                  <HeroVisual />
                  <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                    <div className="lg:col-span-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                      <div className="flex items-center gap-4 mb-10 overflow-hidden justify-center lg:justify-start">
                        <span className="h-[1px] w-12 bg-[#1a1a1a]"></span>
                        <span className="text-xs font-bold tracking-widest uppercase text-[#1a1a1a] mt-[1px]">
                          SYDNEY BUSINESS GROWTH 
                          <span className="font-mono font-bold ml-2 text-[#C5A059]">
                            [ {scrambleText} ]
                          </span>
                        </span>
                      </div>
                      <h1 className="font-serif text-5xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tighter text-[#1a1a1a] mb-10">
                        <div className="overflow-hidden"><span className="block reveal-text">Built on Logic,</span></div>
                        <div className="overflow-hidden"><span className="block reveal-text" style={{ animationDelay: '0.2s' }}>not <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Guesswork.</span></span></div>
                      </h1>
                      <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-[#1a1a1a]/20 pl-6 animate-fade-in text-left mx-auto lg:mx-0" style={{ animationDelay: '0.6s' }}>Stop burning your best people. I build the digital systems that exit you from the daily grind. Precision is not optional.</p>
                      <div className="mt-16 flex flex-col sm:flex-row items-center gap-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <button onClick={() => handleGlobalNavigate('contact')} className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-widest font-bold overflow-hidden transition-all duration-300">
                          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ START_DIAGNOSIS ]</span>
                        </button>
                        <a href="#architecture" onClick={(e) => { e.preventDefault(); document.getElementById('architecture')?.scrollIntoView({behavior: 'smooth'}); }} className="relative group flex items-center gap-3 cursor-pointer">
                          <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 group-hover:border-b-2 group-hover:pb-1 transition-all duration-300 font-bold">SEE THE SYSTEM</span>
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
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-10 block">01 / THE DIAGNOSIS</span>
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
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-8 block">03 / ERROR DETECTED</span>
                        <div className="space-y-4">
                          <div className="font-sans text-3xl font-bold text-[#E21E3F] uppercase tracking-tighter">BURNING_TALENT</div>
                          <p className="font-sans text-sm text-[#E21E3F]/70 leading-relaxed uppercase tracking-widest">Paying high-value staff to do low-value data entry.</p>
                        </div>
                      </div>
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-white min-h-[300px] flex flex-col justify-between border-l-2 border-l-[#C5A059]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] block">04 / RESOLUTION</span>
                        <p className="font-serif text-2xl md:text-3xl leading-tight mb-8">I engineer the exit. We replace human friction with digital code.</p>
                        <button onClick={() => document.getElementById('architecture')?.scrollIntoView({behavior: 'smooth'})} className="flex items-center gap-3 font-mono text-[10px] text-[#C5A059] uppercase tracking-[0.3em] hover:text-white transition-colors cursor-pointer group">[ VIEW PROTOCOL ]</button>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <FrictionAuditSection onNavigate={handleGlobalNavigate} />
                <BentoGrid onServiceClick={(s) => { setSelectedService(s); setIsModalOpen(true); }} />
                <TheArchitect />
                <Feature_Group7 />
                <BookingCTA />
                <BookAuditButton onNavigate={handleGlobalNavigate} />
              </motion.div>
            )}

            {currentView === 'about' && <AboutPage onBack={() => handleGlobalNavigate('landing')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'architecture' && <ArchitecturePage onBack={() => handleGlobalNavigate('landing')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'protocol' && <ProtocolPage onBack={() => handleGlobalNavigate('landing')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'evidence' && <EvidencePage onBack={() => handleGlobalNavigate('landing')} onNavigate={handleGlobalNavigate} />}
            {/* ADDED ROUTE FOR VAULT */}
            {currentView === 'evidence-vault' && <EvidenceVaultPage onBack={() => handleGlobalNavigate('evidence')} />}
            {currentView === 'contact' && <ContactPage onBack={() => handleGlobalNavigate('landing')} />}
            
            {/* PILLARS */}
            {currentView === 'pillar1' && <Pillar1 onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar2' && <Pillar2 onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar3' && <PillarPage_Automation onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar4' && <PillarPage_Cognitive onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar5' && <PillarPage_Media onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar6' && <PillarPage_Adoption onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
            {currentView === 'pillar7' && <PillarPage_Intelligence onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}

          </AnimatePresence>
        </main>
      </PageTransition>

      {/* FOOTER & MODAL */}
      {/* GlobalFooter appears on all pages except ArchitecturePage which has its own footer */}
      {currentView !== 'architecture' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(id) => handleGlobalNavigate(id)} />
    </div>
  );
};

export default App;
