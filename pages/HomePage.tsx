import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { m, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
// FIX: Correct Import Paths for components
import CTAButton from '../components/CTAButton';
import ScrambleTitle from '../components/ScrambleTitle';
import BookingCTA from '../components/BookingCTA';
import { usePageTitle } from '../hooks/usePageTitle';
import HeroVisual from '../components/HeroVisual'; 

// Lazy Load Sections
const ProblemSection = lazy(() => import('../components/HomePage/ProblemSection'));
const FrictionAuditSection = lazy(() => import('../components/FrictionAuditSection'));
const SystemPhases = lazy(() => import('../components/SystemPhases'));
const TheArchitect = lazy(() => import('../components/TheArchitect'));
const Feature_Group7 = lazy(() => import('../components/Feature_Group7'));

const TECH_STACK = [
  'WEBSITES', 'CRM', 'AUTOMATION', 'AI ASSISTANTS', 'CONTENT', 'DASHBOARDS'
];

interface HomePageProps {
  onNavigate: (view: string, sectionId?: string) => void;
  onServiceClick?: (service: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onServiceClick }) => {
  usePageTitle('Home');
  
  const [isTickerHovered, setIsTickerHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    // FIX: Use matchMedia to avoid Reflow
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const checkMobile = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    
    checkMobile(mobileQuery);
    mobileQuery.addEventListener('change', checkMobile);
    
    const startAnimation = () => setCanAnimate(true);
    if ('requestIdleCallback' in window) {
       (window as any).requestIdleCallback(startAnimation, { timeout: 2000 });
    } else {
       setTimeout(startAnimation, 2000);
    }

    return () => {
      mobileQuery.removeEventListener('change', checkMobile);
    };
  }, []);

  const scrollLineY = useMotionValue(-100); 
  const scrollLineSpeed = useMotionValue(0.067); 
  const { scrollY } = useScroll();
  const carouselX = useMotionValue(0);
  const xPercent = useTransform(carouselX, (value) => `${value}%`);
  
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useAnimationFrame((time, delta) => {
    if (!canAnimate) return;

    const currentY = scrollLineY.get();
    const speed = scrollLineSpeed.get();
    let newY = currentY + (speed * delta);
    if (newY >= 100) newY = -100;
    scrollLineY.set(newY);

    const tickerSpeed = isTickerHovered ? 0 : 0.0006;
    let moveBy = tickerSpeed * delta;
    const currentX = carouselX.get();
    let nextX = currentX - moveBy;
    if (nextX <= -50) nextX = 0;
    carouselX.set(nextX);
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    const scrollDelta = Math.abs(latest - lastScrollYRef.current);
    
    if (timeDelta > 0 && timeDelta < 200) {
      const velocity = scrollDelta / timeDelta;
      scrollVelocityRef.current = velocity;
      if (decayTimeoutRef.current) { clearTimeout(decayTimeoutRef.current); decayTimeoutRef.current = null; }
      const baseSpeed = 0.067;
      const maxSpeed = 0.133;
      const speedMultiplier = Math.min(1, velocity * 12);
      const newSpeed = baseSpeed + (speedMultiplier * (maxSpeed - baseSpeed));
      scrollLineSpeed.set(newSpeed);
      decayTimeoutRef.current = setTimeout(() => {
        const returnToBase = () => {
          const currentSpeed = scrollLineSpeed.get();
          if (currentSpeed <= baseSpeed + 0.01) { scrollLineSpeed.set(baseSpeed); return; }
          const next = Math.max(baseSpeed, currentSpeed - 0.02);
          scrollLineSpeed.set(next);
          if (next > baseSpeed + 0.01) setTimeout(returnToBase, 50);
        };
        returnToBase();
        scrollVelocityRef.current = 0;
      }, 100);
    }
    lastScrollYRef.current = latest;
    lastTimeRef.current = now;
  });

  return (
    <>
      <section id="hero" aria-label="Hero Section" className="min-h-[100svh] w-full flex items-center pt-32 md:pt-20 overflow-hidden relative z-20 content-layer">
        
        <div className="absolute inset-0 z-[1]">
          <HeroVisual />
        </div>

        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-20">
          <div className="lg:col-span-12 flex flex-col justify-start md:justify-center items-center lg:items-start text-center lg:text-left pt-8 md:pt-0">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-center lg:justify-start">
              <span className="hidden md:inline font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                  SYDNEY BUSINESS AUTOMATION 
                </span>
                <ScrambleTitle />
              </div>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-[6.5rem] leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-8 md:mb-10">
              <div className="overflow-hidden">
                <span className="block reveal-text tracking-tighter font-serif" style={{ letterSpacing: '-0.04em' }}>Stop Doing</span>
              </div>
              <div className="overflow-hidden">
                <span className="block reveal-text tracking-tighter" style={{ animationDelay: '0.2s', letterSpacing: '-0.04em' }}>
                  <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Everyone's Job.</span>
                </span>
              </div>
            </h1>

            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 animate-fade-in text-left mx-auto lg:mx-0 mb-12 md:mb-0" style={{ animationDelay: '0.6s' }}>
              You didn't start a business to chase invoices, re-type data, and answer the same questions all day. I build the systems that do it for you, so you can get back to the work that actually grows revenue.
            </p>

            <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center gap-6 md:gap-12 animate-fade-in relative z-30" style={{ animationDelay: '0.8s' }}>
              <CTAButton theme="light" onClick={() => onNavigate('contact')}>
                {isMobile ? "LET'S TALK" : "[ LET'S TALK ]"}
              </CTAButton>
              <CTAButton variant="bracket" theme="light" onClick={() => onNavigate('system')}>
                SEE THE SYSTEM
              </CTAButton>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-[#1a1a1a]/10 overflow-hidden z-0">
          <m.div 
            style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }}
            className="absolute inset-0 bg-[#1a1a1a]/40 w-full h-full" 
          />
        </div>
      </section>

      <div className="w-full bg-[#1a1a1a]/5 py-12 border-y border-black/5 overflow-hidden relative z-30" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }} onMouseEnter={() => setIsTickerHovered(true)} onMouseLeave={() => setIsTickerHovered(false)}>
        <div className="flex whitespace-nowrap">
          <m.div className="flex items-center pr-0" style={{ x: xPercent }}>
            {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <div key={i} className="flex items-center group cursor-default">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a] opacity-80 group-hover:text-[#C5A059] group-hover:opacity-100 transition-all duration-300 px-12">
                  {tech}
                </span>
                <span className="text-[#A07E3C] font-mono text-[10px] font-bold">/</span>
              </div>
            ))}
          </m.div>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-[500px] bg-[#FFF2EC]" />}>
        <ProblemSection />
        
        <section id="friction-audit" aria-label="Friction Audit Section" className="relative bg-[#FFF2EC] z-30">
          <FrictionAuditSection onNavigate={onNavigate} />
        </section>

        <section id="seven-pillars" className="relative bg-[#FFF2EC] z-30">
          <SystemPhases onNavigate={onNavigate} />
        </section>
        <section id="about" className="relative bg-[#FFF2EC] z-30">
          <TheArchitect />
        </section>
        <section id="case-study" className="relative bg-[#FFF2EC] z-30">
          <Feature_Group7 />
        </section>

        <section id="cta" aria-label="Call to Action Section" className="relative bg-[#FFF2EC] z-30">
          <BookingCTA />
        </section>
      </Suspense>
    </>
  );
};

export default HomePage;