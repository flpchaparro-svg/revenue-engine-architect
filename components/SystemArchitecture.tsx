import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, Terminal } from 'lucide-react';

// --- TYPES ---
interface NarrativeSectionProps {
  phase: string;
  title: string;
  subtitle: string;
  body: string;
  color: string;
  align: 'left' | 'right';
}

// --- HOOK: DETECT MOBILE ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// --- SUB-COMPONENT: VIDEO HOLDER ---
const VideoPlaceholder = ({ color }: { color: string }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="relative w-full aspect-square md:w-[400px] md:h-[400px] bg-[#1a1a1a] group cursor-pointer overflow-hidden rounded-sm shadow-2xl border border-white/5 z-10"
    style={{ borderColor: `${color}20` }}
  >
    {/* Ambient Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
         style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }} />

    {/* Center Play Button */}
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div 
        className="w-20 h-20 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110"
        style={{ borderColor: `${color}60`, backgroundColor: `${color}10` }}
      >
        <Play className="w-8 h-8 ml-1 text-white fill-white opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
    
    <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/40 tracking-widest uppercase flex items-center gap-2">
        <Terminal className="w-3 h-3" />
    </div>
  </motion.div>
);

// --- SUB-COMPONENT: NARRATIVE SECTION ---
const NarrativeSection: React.FC<NarrativeSectionProps> = ({ phase, title, subtitle, body, color, align }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRight = align === 'right';
  const isMobile = useIsMobile();
  
  // SCROLL MATH
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] 
  });
  
  // Liquid Fill Physics
  const heightScale = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const dotActive = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // ANIMATION LOGIC:
  const xOffsetStart = isMobile ? -50 : (isRight ? -50 : 50);

  const textVariants = {
    hidden: { opacity: 0, x: xOffsetStart },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    // ADJUSTED HEIGHT: Changed from min-h-[90vh] to min-h-[60vh] to bring sections closer
    <div ref={containerRef} className="relative w-full min-h-[60vh] flex items-center justify-center py-16 md:py-24">
      
      {/* --- THE SPINE COLUMN --- */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#1a1a1a]/10" />

        <motion.div 
          style={{ 
            height: '100%', 
            scaleY: heightScale, 
            transformOrigin: 'top',
            backgroundColor: color
          }} 
          className="w-full absolute top-0 left-0"
        />

        {/* Central Connector Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div 
             style={{ opacity: dotActive, backgroundColor: `${color}30` }}
             className="absolute inset-0 -m-6 rounded-full w-16 h-16 blur-xl"
          />
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-40%" }}
            className="w-4 h-4 rounded-full border-[3px] border-[#FFF2EC] relative z-20 shadow-sm"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className={`w-full max-w-[1400px] px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10 ${isRight ? 'md:grid-flow-dense' : ''}`}>
        
        {/* TEXT CONTENT */}
        <div className={`relative z-20 flex flex-col ${isRight ? 'md:col-start-2 items-start md:items-end md:text-right pl-12 md:pl-0' : 'items-start text-left pl-12 md:pl-0'}`}>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            transition={{ staggerChildren: 0.1 }}
            className="w-full flex flex-col"
            style={{ alignItems: isMobile ? 'flex-start' : (isRight ? 'flex-end' : 'flex-start') }}
          >
            {/* Eyebrow */}
            <motion.div 
              variants={textVariants}
              className={`mb-4 flex items-center gap-4 ${isRight && !isMobile ? 'flex-row-reverse' : 'flex-row'}`}
            >
               <div className="w-8 h-[2px]" style={{ backgroundColor: color }} />
               <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: color }}>
                 {phase}
               </span>
            </motion.div>
            
            {/* Title */}
            <motion.h3 
              variants={textVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-[1.0] tracking-tighter mb-4"
            >
              {title} <br/>
              <span className="italic font-serif" style={{ color: color }}>{subtitle}</span>
            </motion.h3>
            
            {/* Body */}
            <motion.p 
              variants={textVariants}
              className="font-sans text-lg md:text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-lg"
            >
              {body}
            </motion.p>
          </motion.div>

        </div>

        {/* VIDEO CONTENT */}
        <div className={`pl-12 md:pl-0 ${isRight ? 'md:col-start-1 flex justify-center md:justify-start' : 'flex justify-center md:justify-end'}`}>
          <VideoPlaceholder color={color} />
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export const SystemArchitecture: React.FC = () => {
  const originRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: originProgress } = useScroll({
    target: originRef,
    offset: ["end center", "end start"]
  });

  return (
    <div className="w-full bg-[#FFF2EC] relative pb-24">
      
      {/* 1. HERO HEADER - Reduced Height */}
      <div ref={originRef} className="relative pt-32 pb-24 md:pt-32 md:pb-32 px-6 flex flex-col items-center text-center z-10 min-h-[50vh]">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-4xl mx-auto"
         >
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-6 block">
             / THE 3 SYSTEMS
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
             Three Systems. <br className="hidden md:block" />
             <span className="italic font-serif text-[#C5A059]">One Goal.</span>
           </h2>
           <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl mx-auto">
             Every pillar belongs to one of three systems. Each system solves a different problem. Here's how they work.
           </p>
         </motion.div>
      </div>

      {/* CONTINUOUS SPINE CONTAINER */}
      <div className="relative">
        
        {/* The Track (Grey Line) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10 -translate-x-1/2 z-0" />
        
        {/* The Starting Fill (Red) */}
        <div className="absolute left-6 md:left-1/2 top-0 h-32 w-[2px] -translate-x-1/2 overflow-hidden z-0">
            <motion.div 
              style={{ scaleY: originProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-[#E21E3F] absolute top-0 left-0"
            />
        </div>

        {/* 2. PHASE I: IGNITION (RED) */}
        <NarrativeSection 
          phase="PHASE 01 / GET CLIENTS"
          title="Get"
          subtitle="Clients."
          body="Every business needs a steady flow of customers. I build the system that makes it happen: a website that captures leads, a CRM that organises them, and automation that follows up before they go cold. Nothing slips through."
          color="#E21E3F"
          align="left"
        />

        {/* 3. PHASE II: MOMENTUM (GOLD) */}
        <NarrativeSection 
          phase="PHASE 02 / SCALE FASTER"
          title="Scale"
          subtitle="Faster."
          body="Once leads are flowing, you need to handle more without hiring more. I build AI that answers your phone 24/7, content systems that post while you sleep, and training that makes your team actually use the tools. You multiply output without multiplying headcount."
          color="#C5A059"
          align="right"
        />

        {/* 4. PHASE III: VISION (BLACK) */}
        <NarrativeSection 
          phase="PHASE 03 / SEE CLEARLY"
          title="See"
          subtitle="Clearly."
          body="You can't fix what you can't measure. I build dashboards that show where you've been, where you are now, and where you're heading. Track each pillar separately or see the whole system at once. No more guessing. No more midnight spreadsheets."
          color="#1a1a1a"
          align="left"
        />
        
      </div>
    </div>
  );
};