import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { XCircle, ArrowRight } from 'lucide-react';
import HeroVisual from '../components/HeroVisual';
import BentoGrid from '../components/BentoGrid';
import TheArchitect from '../components/TheArchitect';
import Feature_Group7 from '../components/Feature_Group7';
import BookingCTA from '../components/BookingCTA';
import BookAuditButton from '../components/BookAuditButton';
import FrictionAuditSection from '../components/FrictionAuditSection';
import GrowthGraph, { GraphState } from '../components/GrowthGraph';
import { ServiceDetail } from '../types';

const TECH_STACK = [
  'WEBSITES', 'CRM', 'MARKETING AUTOMATION', 'AI ASSISTANTS', 'CONTENT MARKETING', 'DASHBOARDS'
];

interface HomePageProps {
  onNavigate: (view: string, sectionId?: string) => void;
  onServiceClick?: (service: ServiceDetail) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onServiceClick }) => {
  const [scrambleText, setScrambleText] = useState("ARCHITECT");
  const [isTickerHovered, setIsTickerHovered] = useState(false);
  const [graphState, setGraphState] = useState<GraphState>('idle');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobileRef = useRef(false);
  
  // --- MOBILE GRAPH AUTO-ROTATION ---
  useEffect(() => {
    // Check if we are on mobile (using width < 768px as standard breakpoint)
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      isMobileRef.current = isMobile;
      
      // Clear any existing interval
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
      
      // Only run this loop on mobile. Desktop relies on Hover.
      if (!isMobile) return;

      // UPDATED LOOP: Removed 'problem' (redundant) and 'idle'.
      // Now it only loops through states that have DIFFERENT numbers.
      const scannerStates: GraphState[] = ['bottleneck', 'tax', 'grind', 'cost'];
      let currentIndex = 0;

      // Start the loop
      autoRotateIntervalRef.current = setInterval(() => {
        setGraphState(scannerStates[currentIndex]);
        currentIndex = (currentIndex + 1) % scannerStates.length;
      }, 2500); // Change every 2.5 seconds (enough time to read)
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Stable hover handler to prevent flickering (Desktop only)
  const handleGraphHover = (state: GraphState) => {
    // On mobile, don't interfere with auto-rotation
    if (isMobileRef.current) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setGraphState(state);
  };
  
  const handleGraphLeave = () => {
    // On mobile, don't interfere with auto-rotation
    if (isMobileRef.current) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setGraphState('idle');
    }, 50); // Small delay to prevent flicker when moving between items
  };
  const scrollLineY = useMotionValue(-100); // Start at top (-100%)
  const scrollLineSpeed = useMotionValue(0.067); // Base speed: % per ms (for 3s duration: 200% in 3000ms)

  const { scrollY } = useScroll();
  const carouselX = useMotionValue(0);
  const xPercent = useTransform(carouselX, (value) => `${value}%`);
  
  // Track scroll velocity to accelerate scroll line
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Manual animation loop for continuous line movement
  useAnimationFrame((time, delta) => {
    const currentY = scrollLineY.get();
    const speed = scrollLineSpeed.get();
    
    // Move line down continuously
    // Speed is in % per second, delta is in ms, so convert: speed * (delta / 1000)
    // For 3s base duration: need to move 200% (from -100% to +100%) in 3000ms = 0.067% per ms
    // For 1.5s fast duration: 200% in 1500ms = 0.133% per ms
    // So base speed should be around 0.067, max around 0.133
    let newY = currentY + (speed * delta);
    
    // Loop back to top when it reaches bottom
    if (newY >= 100) {
      newY = -100;
    }
    
    scrollLineY.set(newY);
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    const scrollDelta = Math.abs(latest - lastScrollYRef.current);
    
    if (timeDelta > 0 && timeDelta < 200) {
      const velocity = scrollDelta / timeDelta; // pixels per millisecond
      scrollVelocityRef.current = velocity;
      
      // Clear existing decay timeout when scrolling
      if (decayTimeoutRef.current) {
        clearTimeout(decayTimeoutRef.current);
        decayTimeoutRef.current = null;
      }
      
      // Subtle acceleration: Base speed 0.067, can go up to 0.133 when scrolling
      // Base: 0.067 (% per ms) = 3s duration (200% in 3000ms)
      // Fast: 0.133 (% per ms) = 1.5s duration (200% in 1500ms)
      const baseSpeed = 0.067;
      const maxSpeed = 0.133;
      const speedMultiplier = Math.min(1, velocity * 12);
      const newSpeed = baseSpeed + (speedMultiplier * (maxSpeed - baseSpeed));
      
      scrollLineSpeed.set(newSpeed);
      
      // Return to normal speed when scrolling stops
      decayTimeoutRef.current = setTimeout(() => {
        // Gradually return to base speed
        const returnToBase = () => {
          const currentSpeed = scrollLineSpeed.get();
          if (currentSpeed <= baseSpeed + 0.01) {
            scrollLineSpeed.set(baseSpeed); // Reached base speed
            return;
          }
          const next = Math.max(baseSpeed, currentSpeed - 0.02);
          scrollLineSpeed.set(next);
          // Continue decaying if not at base speed
          if (next > baseSpeed + 0.01) {
            setTimeout(returnToBase, 50);
          }
        };
        returnToBase();
        scrollVelocityRef.current = 0;
      }, 100);
    }
    
    lastScrollYRef.current = latest;
    lastTimeRef.current = now;
  });

  useAnimationFrame((t, delta) => {
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
    return () => {
      clearInterval(scrambleInterval);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section id="hero" aria-label="Hero Section" className="min-h-[100svh] w-full flex items-center pt-24 md:pt-20 relative z-20 content-layer">
        <HeroVisual />
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-20">
          <div className="lg:col-span-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full">
            
            {/* EYEBROW */}
            <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#1a1a1a]">/</span>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#1a1a1a] mt-[1px]">
                SYDNEY BUSINESS AUTOMATION 
                <span className="font-mono font-bold ml-2 text-[#C5A059]">
                  [ {scrambleText} ]
                </span>
              </span>
            </div>

            {/* HEADLINE: Fixed Responsive Scaling (5xl -> 6xl -> 7xl -> 8xl) */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
              <div className="overflow-hidden"><span className="block reveal-text">Stop Doing</span></div>
              <div className="overflow-hidden"><span className="block reveal-text" style={{ animationDelay: '0.2s' }}><span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Everyone's Job.</span></span></div>
            </h1>

            {/* BODY COPY: Fixed Responsive Scaling */}
            <p className="font-sans text-lg md:text-lg lg:text-xl font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l-2 border-[#C5A059] pl-6 animate-fade-in text-left mx-auto lg:mx-0 mb-12 md:mb-0" style={{ animationDelay: '0.6s' }}>
              You didn't start a business to chase invoices, re-type data, and answer the same questions all day. I build the systems that do it for you — websites, CRMs, automations, and AI — so you can get back to the work that actually grows revenue.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center gap-6 md:gap-12 animate-fade-in relative z-30" style={{ animationDelay: '0.8s' }}>
              <button onClick={() => onNavigate('contact')} className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-widest font-bold overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ LET'S TALK ]</span>
              </button>
              
              {/* FIXED: Scroll Button anchor */}
              <a href="#friction-audit" id="scroll-trigger" onClick={(e) => { e.preventDefault(); document.getElementById('friction-audit')?.scrollIntoView({behavior: 'smooth'}); }} className="relative group flex items-center gap-3 cursor-pointer">
                <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 group-hover:border-b-2 group-hover:pb-1 transition-all duration-300 font-bold">SEE HOW IT WORKS</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* SCROLL LINE - FIXED Position to track from the button area properly */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 md:h-24 w-[1px] bg-[#1a1a1a]/10 overflow-hidden">
          <motion.div 
            style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }}
            className="absolute inset-0 bg-[#1a1a1a]/40 w-full h-full" 
          />
        </div>
      </section>

      {/* CAROUSEL */}
      {/* UPGRADE: Adjusted padding for better breathing room */}
      <div className="w-full bg-[#1a1a1a]/5 py-12 border-y border-black/5 overflow-hidden relative z-30" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }} onMouseEnter={() => setIsTickerHovered(true)} onMouseLeave={() => setIsTickerHovered(false)}>
        <div className="flex whitespace-nowrap">
          <motion.div className="flex items-center pr-0" style={{ x: xPercent }}>
            {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <div key={i} className="flex items-center group cursor-default">
                <span className="font-mono text-sm font-bold tracking-[0.2em] text-[#1a1a1a]/40 group-hover:text-[#C5A059] transition-colors duration-300 px-12">{tech}</span>
                <span className="text-[#C5A059] text-xs opacity-50">//</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. PROBLEM SECTION */}
      <motion.section id="problem" aria-label="Problem Section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="w-full bg-[#FFF2EC] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 md:h-32 w-[1px] bg-[#1a1a1a]/10" />
        <div className="max-w-[1600px] mx-auto border-t border-l border-[#1a1a1a]/10">
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* 01: THE PROBLEM */}
            <div className="col-span-1 md:col-span-2 p-8 md:p-12 lg:p-16 border-r border-b border-[#1a1a1a]/10 flex flex-col justify-center min-h-[300px] md:min-h-[400px] transition-colors duration-300 hover:bg-[#1a1a1a]/5 group">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-6 md:mb-10 block">01 / THE PROBLEM</span>
              {/* FIXED: Intermediate text size text-5xl for laptops */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.9] text-[#1a1a1a] tracking-tighter">
                You didn't start your business to become an <br className="hidden md:block" />
                <span className="italic text-[#1a1a1a]/60 group-hover:text-[#E21E3F] transition-colors duration-300">administrative hostage.</span>
              </h2>
            </div>

            {/* GRAPH CONTAINER */}
            <div className="col-span-1 border-r border-b border-[#1a1a1a]/10 bg-transparent flex items-center justify-center p-8">
              <GrowthGraph currentState={graphState} />
            </div>

            {/* 02: SYMPTOMS */}
            <div className="col-span-1 p-8 md:p-12 border-r border-b border-[#1a1a1a]/10 min-h-[300px] md:min-h-[400px] flex flex-col">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-6 md:mb-8 block">02 / SYMPTOMS</span>
              <ul className="space-y-6">
                <li onMouseEnter={() => handleGraphHover('bottleneck')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-[#1a1a1a]/5 transition-colors duration-200">
                  <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-1 pointer-events-none" />
                  {/* FIXED: Text size intermediate for laptops */}
                  <div className="font-sans text-[#1a1a1a]/70 pointer-events-none leading-relaxed">
                    <strong className="text-base md:text-lg lg:text-xl text-[#1a1a1a] block mb-1">The Bottleneck Boss</strong>
                    <span className="text-base md:text-lg">You are answering questions instead of doing deep work.</span>
                  </div>
                </li>
                <li onMouseEnter={() => handleGraphHover('tax')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-[#1a1a1a]/5 transition-colors duration-200">
                  <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-1 pointer-events-none" />
                  <div className="font-sans text-[#1a1a1a]/70 pointer-events-none leading-relaxed">
                    <strong className="text-base md:text-lg lg:text-xl text-[#1a1a1a] block mb-1">The Double-Entry Tax</strong>
                    <span className="text-base md:text-lg">Typing the same data into two different apps.</span>
                  </div>
                </li>
                <li onMouseEnter={() => handleGraphHover('grind')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-[#1a1a1a]/5 transition-colors duration-200">
                  <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-1 pointer-events-none" />
                  <div className="font-sans text-[#1a1a1a]/70 pointer-events-none leading-relaxed">
                    <strong className="text-base md:text-lg lg:text-xl text-[#1a1a1a] block mb-1">The Sunday Grind</strong>
                    <span className="text-base md:text-lg">Invoicing and admin eating your weekends.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* 03: THE COST */}
            <div onMouseEnter={() => handleGraphHover('cost')} onMouseLeave={handleGraphLeave} className="col-span-1 p-8 md:p-12 border-r border-b border-[#1a1a1a]/10 bg-[#E21E3F]/5 min-h-[250px] md:min-h-[400px] hover:bg-[#E21E3F]/10 transition-colors duration-300 relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute inset-0 bg-[#E21E3F]/0 group-hover:bg-[#E21E3F]/10 transition-colors duration-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-6 block relative z-10">03 / THE COST</span>
              <div className="space-y-4 relative z-10">
                <div className="font-sans text-3xl md:text-4xl font-bold text-[#E21E3F] uppercase tracking-tighter">BURNING TALENT</div>
                <p className="font-sans text-sm md:text-base text-[#E21E3F]/80 leading-relaxed uppercase tracking-widest font-medium max-w-xs">
                  Paying high-value staff to do low-value data entry.
                </p>
              </div>
            </div>

            {/* 04: THE FIX */}
            <div onMouseEnter={() => handleGraphHover('fix')} onMouseLeave={handleGraphLeave} className="col-span-1 p-8 md:p-12 border-r border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-white min-h-[250px] md:min-h-[400px] flex flex-col justify-between border-l-2 border-l-[#C5A059] group">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] block mb-4 md:mb-0">04 / THE FIX</span>
              <p className="font-serif text-2xl md:text-3xl leading-tight mb-6 md:mb-8 group-hover:text-[#C5A059] transition-colors duration-300">
                I build the systems that do the boring work for you. <span className="text-white">You get your business back.</span>
              </p>
              <button onClick={() => document.getElementById('friction-audit')?.scrollIntoView({behavior: 'smooth'})} className="flex items-center gap-3 font-mono text-xs text-[#C5A059] uppercase tracking-[0.3em] hover:text-white transition-colors cursor-pointer group">
                [ SEE HOW IT WORKS ]
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. FRICTION AUDIT SECTION */}
      <section id="friction-audit" aria-label="Friction Audit Section" className="relative bg-[#FFF2EC] z-30">
        <FrictionAuditSection onNavigate={onNavigate} />
      </section>

      {/* 4. 7 PILLARS SECTION */}
      <section id="seven-pillars" aria-label="Seven Pillars Section" className="relative bg-[#FFF2EC] z-30">
        <BentoGrid onServiceClick={onServiceClick || ((s) => onNavigate(s.id))} />
      </section>

      {/* 5. ABOUT SECTION */}
      <section id="about" aria-label="About Section" className="relative bg-[#FFF2EC] z-30">
        <TheArchitect />
      </section>

      {/* 6. CASE STUDY SECTION */}
      <section id="case-study" aria-label="Case Study Section" className="relative bg-[#FFF2EC] z-30">
        <Feature_Group7 />
      </section>

      {/* 7. CTA SECTION */}
      <section id="cta" aria-label="Call to Action Section" className="relative bg-[#FFF2EC] z-30">
        <BookingCTA />
      </section>

      {/* Floating Book Audit Button */}
      <BookAuditButton onNavigate={onNavigate} />
    </>
  );
};

export default HomePage;
