import React, { useRef } from 'react';
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
  isLast?: boolean;
}

// --- SUB-COMPONENT: VIDEO HOLDER ---
const VideoPlaceholder = ({ color }: { color: string }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-20%" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="relative w-full aspect-square md:w-[450px] md:h-[450px] bg-[#1a1a1a] group cursor-pointer overflow-hidden rounded-sm shadow-2xl border border-white/5 z-10"
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
        <Terminal className="w-3 h-3" /> SYS_VISUAL_01
    </div>
  </motion.div>
);

// --- SUB-COMPONENT: NARRATIVE SECTION ---
const NarrativeSection: React.FC<NarrativeSectionProps> = ({ phase, title, subtitle, body, color, align, isLast }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRight = align === 'right';
  
  // SCROLL MATH
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"] 
  });
  
  // Liquid Fill Physics
  const heightScale = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const dotActive = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // ANIMATION: "Behind the Line" Reveal
  // We use a masking div with overflow-hidden.
  // The content starts shifted 100% towards the center line, then slides out.
  const slideDistance = isRight ? "-100%" : "100%"; 

  return (
    <div ref={containerRef} className="relative w-full min-h-[100vh] flex items-center justify-center py-24 md:py-32">
      
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

        {/* Arrowhead (Only on Last Section) */}
        {isLast && (
          <motion.div 
            style={{ opacity: heightScale }} 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full flex flex-col items-center -mt-1"
          >
            <motion.div
               animate={{ y: [0, 5, 0], opacity: [0.8, 1, 0.8] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                 <path d="M6 9L12 15L18 9" />
               </svg>
            </motion.div>
            
            <motion.div 
              className="mt-4 text-center w-[300px]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                SCROLL TO EXPLORE THE PARTS
              </span>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* --- CONTENT GRID --- */}
      <div className={`w-full max-w-[1400px] px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center relative z-10 ${isRight ? 'md:grid-flow-dense' : ''}`}>
        
        {/* TEXT CONTENT (Z-20 ensures it's above video) */}
        <div className={`relative z-20 flex flex-col ${isRight ? 'md:col-start-2 items-start md:items-end md:text-right pl-12 md:pl-0' : 'items-start text-left pl-12 md:pl-0'}`}>
          
          {/* MASKED CONTAINER FOR "BEHIND THE LINE" EFFECT */}
          <div className="overflow-hidden py-2 -my-2 w-full flex flex-col" style={{ alignItems: isRight ? 'flex-end' : 'flex-start' }}>
            
            {/* Eyebrow */}
            <motion.div 
              initial={{ x: slideDistance, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className={`mb-6 flex items-center gap-4 ${isRight ? 'md:flex-row-reverse' : 'flex-row'}`}
            >
               <div className="w-8 h-[2px]" style={{ backgroundColor: color }} />
               <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: color }}>
                 {phase}
               </span>
            </motion.div>
            
            {/* Title */}
            <motion.h3 
              initial={{ x: slideDistance, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-[1.0] tracking-tighter mb-6"
            >
              {title} <br/>
              <span className="italic font-serif" style={{ color: color }}>{subtitle}</span>
            </motion.h3>
            
            {/* Body */}
            <motion.p 
              initial={{ x: slideDistance, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-sans text-lg md:text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-lg"
            >
              {body}
            </motion.p>
          </div>

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
    <div className="w-full bg-[#FFF2EC] relative pb-32">
      
      {/* 1. HERO HEADER */}
      <div ref={originRef} className="relative pt-32 pb-32 md:pt-40 md:pb-48 px-6 flex flex-col items-center text-center z-10">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-4xl mx-auto"
         >
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-6 block">
             / SYSTEM ARCHITECTURE
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
             How to Start <br className="hidden md:block" />
             <span className="italic font-serif text-[#C5A059]">The Right Way.</span>
           </h2>
           <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl mx-auto">
             Most founders guess. We engineer. This is the blueprint for a self-sustaining organism.
           </p>
         </motion.div>
      </div>

      {/* CONTINUOUS SPINE CONTAINER */}
      <div className="relative">
        
        {/* The Track (Grey Line) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10 -translate-x-1/2 z-0" />
        
        {/* The Starting Fill (Red) */}
        <div className="absolute left-6 md:left-1/2 top-0 h-48 w-[2px] -translate-x-1/2 overflow-hidden z-0">
            <motion.div 
              style={{ scaleY: originProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-[#E21E3F] absolute top-0 left-0"
            />
        </div>

        {/* 2. PHASE I: IGNITION (RED) */}
        <NarrativeSection 
          phase="PHASE 01 // TRACTION"
          title="Get"
          subtitle="Clients."
          body="A business is an organism that needs energy. We build the infrastructure to feed it: Lead Magnets to attract, a CRM to organize data, and Automation to streamline the chaos."
          color="#E21E3F"
          align="left"
        />

        {/* 3. PHASE II: MOMENTUM (GOLD) */}
        <NarrativeSection 
          phase="PHASE 02 // EXPANSION"
          title="Scale"
          subtitle="Faster."
          body="Why scaling is the only way to go. Once the manual work is gone, we pour fuel on the fire. Efficient systems allow you to handle 10x the volume without 10x the staff."
          color="#C5A059"
          align="right"
        />

        {/* 4. PHASE III: VISION (BLACK + ARROW) */}
        <NarrativeSection 
          phase="PHASE 03 // CLARITY"
          title="See"
          subtitle="Clearly."
          body="You cannot fix what you cannot measure. We install 'Control Towers' so you stop driving blind. See profit, loss, and bottlenecks instantly."
          color="#1a1a1a"
          align="left"
          isLast={true}
        />
        
      </div>
    </div>
  );
};