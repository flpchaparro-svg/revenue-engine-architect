import React, { useState, useRef } from 'react';
import { 
  motion, 
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
import { SystemArchitecture } from '../../components/SystemArchitecture';
import BackButton from '../../components/BackButton';
import GridItem from '../../components/SystemGridItem';
import { getAllPillars } from '../../constants/systemPillars';
import { usePageTitle } from '../../hooks/usePageTitle';

// Get merged pillar data (SERVICES + SystemPage view data)
const ALL_PILLARS = getAllPillars();

// --- MAIN PAGE ---
interface SystemPageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
}

const SystemPage: React.FC<SystemPageProps> = ({ onBack, onNavigate }) => {
  usePageTitle('The System');
  
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const systemFAQs = getSystemPageFAQs();

  // Scroll Animation Logic
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
      
      {/* HERO SECTION */}
      <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <BackButton onClick={onBack} label="Return to Home" />
          </div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroContainer} 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center"
          >
            <div className="flex flex-col justify-center">
              <motion.div variants={heroItem} className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">ARCHITECTURE / HOLISTIC</span>
              </motion.div>
              <motion.h1 variants={heroItem} className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10 break-words">
                Business as an <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Organism.</span>
              </motion.h1>
              <motion.p variants={heroItem} className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
                Your business is not a machine; it is a living system. We verify the connections between your revenue, your tech, and your team.
              </motion.p>
            </div>
            <motion.div variants={heroItem} className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-full flex items-center justify-center pb-16 md:pb-24 lg:pb-0">
                <HeroVisual_Suspension />
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-[#1a1a1a]/10 overflow-hidden z-0">
          <motion.div style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }} className="absolute inset-0 bg-[#1a1a1a]/40 w-full h-full" />
        </div>
      </section>

      {/* SCROLLYTELLING */}
      <section className="relative z-0 mb-32 border-t border-[#1a1a1a]/10">
         <SystemArchitecture />
      </section>

      {/* GRID BLUEPRINT */}
      <section className="w-full bg-[#FFF2EC] pb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="text-center max-w-2xl mx-auto mb-20 pt-10">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 flex items-center justify-center gap-2">
                 <div className="w-2 h-2 rounded-sm bg-[#C5A059]" />
                 / SYSTEM MANIFEST
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6">
                The Parts in <span className="italic font-serif text-[#C5A059]">Detail.</span>
              </h2>
              <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl mx-auto">
                Select a component to see how it works.
              </p>
          </div>

          <motion.div 
            ref={gridSectionRef}
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#1a1a1a]/20 bg-[#1a1a1a]/10"
          >
            {ALL_PILLARS.map((pillar) => (
              <GridItem 
                key={pillar.id}
                pillar={pillar}
                isSelected={selectedPillarId === pillar.id}
                selectedId={selectedPillarId}
                onToggle={() => {
                  const newId = selectedPillarId === pillar.id ? null : pillar.id;
                  setSelectedPillarId(newId);
                }}
                onNavigate={onNavigate}
              />
            ))}
          </motion.div>

        </div>
      </section>

      <FAQSection faqs={systemFAQs} accentColor="#C5A059" title="Questions?" subtitle="Everything you need to know before choosing a service." onNavigate={onNavigate} />
      <GlobalFooter onNavigate={onNavigate} />
    </div>
  );
};

export default SystemPage;
