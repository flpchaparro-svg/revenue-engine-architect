import React, { useRef, lazy, Suspense } from 'react';
import { 
  m, 
  useScroll, 
  useMotionValueEvent, 
  useAnimationFrame, 
  useMotionValue, 
  useTransform 
} from 'framer-motion';
import GlobalFooter from '../../components/GlobalFooter';
import HeroVisual_Suspension from '../../components/HeroVisual_Suspension';
import FAQSection from '../../components/FAQSection';
import { getSystemPageFAQs } from '../../constants/faqData';
import BackButton from '../../components/BackButton';
import SystemGrid from '../../components/SystemGrid';
import { usePageTitle } from '../../hooks/usePageTitle';

// Lazy load the scroll-heavy section
const SystemArchitecture = lazy(() => import('../../components/SystemArchitecture').then(module => ({ default: module.SystemArchitecture })));

interface SystemPageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
}

const SystemPage: React.FC<SystemPageProps> = ({ onBack, onNavigate }) => {
  usePageTitle('The System');
  const systemFAQs = getSystemPageFAQs();

  // --- OPTIMIZED HERO SCROLL LOGIC ---
  // (This logic only affects the Hero now, which is correct)
  const { scrollY } = useScroll();
  const scrollLineY = useMotionValue(-100);
  const scrollLineSpeed = useMotionValue(0.067);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useAnimationFrame((time, delta) => {
    let newY = scrollLineY.get() + (scrollLineSpeed.get() * delta);
    if (newY >= 100) newY = -100;
    scrollLineY.set(newY);
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    if (timeDelta > 0) {
      const scrollDelta = Math.abs(latest - lastScrollYRef.current);
      if (scrollDelta > 0) {
        const velocity = scrollDelta / timeDelta;
        scrollVelocityRef.current = velocity;
        const newSpeed = Math.min(0.067 + (velocity * 0.0001), 0.5);
        scrollLineSpeed.set(newSpeed);
        if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current);
        decayTimeoutRef.current = setTimeout(() => {
          if (scrollLineSpeed.get() > 0.067) scrollLineSpeed.set(0.067);
        }, 100);
      }
    }
    lastScrollYRef.current = latest;
    lastTimeRef.current = now;
  });

  const heroContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
  const heroItem = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 40, damping: 20 } } };

  return (
    <div className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-0 pb-0 px-0 relative z-[150] flex flex-col font-sans">
      
      {/* 1. HERO SECTION (Static Props, Self-Contained Animation) */}
      <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <BackButton onClick={onBack} label="Return to Home" />
          </div>
          
          <m.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroContainer} 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center"
          >
            <div className="flex flex-col justify-center">
              <m.div variants={heroItem} className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">THE SYSTEM</span>
              </m.div>
              <m.h1 variants={heroItem} className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10 break-words">
                How I Fix Your <span className="italic font-serif text-[#8B6914] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Business.</span>
              </m.h1>
              <m.p variants={heroItem} className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
                Most consultants sell you one piece at a time. A website here, a CRM there. I build connected systems where everything talks to everything else. That's how you stop the leaks.
              </m.p>
            </div>
            <m.div variants={heroItem} className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end -mt-16 md:mt-0">
              <div className="w-full max-w-full flex items-center justify-center pb-0 md:pb-24 lg:pb-0">
                <HeroVisual_Suspension />
              </div>
            </m.div>
          </m.div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-[#1a1a1a]/10 overflow-hidden z-30" aria-hidden="true">
          <m.div style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }} className="absolute inset-0 bg-[#1a1a1a]/40 w-full h-full" />
        </div>
      </section>

      {/* 2. SCROLLYTELLING (Lazy Loaded) */}
      <Suspense fallback={<div className="h-[50vh] bg-[#FFF2EC]" />}>
        <section className="relative z-0 mb-32 border-t border-[#1a1a1a]/10">
           <SystemArchitecture />
        </section>
      </Suspense>

      {/* 3. GRID BLUEPRINT (Isolated State) */}
      <section className="w-full bg-[#FFF2EC] pb-32 relative z-10">
        <SystemGrid onNavigate={onNavigate} />
      </section>

      {/* 4. STATIC FOOTER CONTENT */}
      <FAQSection faqs={systemFAQs} accentColor="#8B6914" title="Questions?" subtitle="Common questions about how this works." onNavigate={onNavigate} />
      <GlobalFooter onNavigate={onNavigate} />
    </div>
  );
};

export default SystemPage;
