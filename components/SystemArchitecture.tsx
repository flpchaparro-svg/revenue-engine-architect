import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, ArrowDown } from 'lucide-react';

// --- TYPES ---
interface NarrativeSectionProps {
  phase: string;
  title: string;
  body: string;
  color: string;
  align: 'left' | 'right';
  isLast?: boolean;
}

// --- SUB-COMPONENT: VIDEO HOLDER ---
const VideoPlaceholder = ({ color, delay }: { color: string; delay: number }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
    whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative w-full aspect-square md:w-[400px] md:h-[400px] bg-[#1a1a1a] border border-[#1a1a1a]/10 group cursor-pointer overflow-hidden"
  >
    {/* Ambient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-50" />
    
    {/* Corner Accents */}
    <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/40" />
    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/40" />
    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/40" />
    <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/40" />

    {/* Center Play Button */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div 
        className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-white/60"
        style={{ backgroundColor: `${color}20` }}
      >
        <Play className="w-6 h-6 text-white fill-white ml-1" />
      </div>
    </div>
    
    {/* Scanline Effect */}
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
  </motion.div>
);

// --- SUB-COMPONENT: NARRATIVE SECTION ---
const NarrativeSection: React.FC<NarrativeSectionProps> = ({ phase, title, body, color, align, isLast }) => {
  const containerRef = useRef(null);
  
  // Local scroll progress for the line growth within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const heightScale = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div ref={containerRef} className="relative w-full min-h-[80vh] flex items-center justify-center py-20 lg:py-0">
      
      {/* CENTRAL SPINE (THE LIVING LINE) */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10 -translate-x-1/2">
        {/* The Colored Fill */}
        <motion.div 
          style={{ 
            height: '100%', 
            scaleY: isLast ? 0 : heightScale, 
            transformOrigin: 'top',
            backgroundColor: color
          }} 
          className="w-full absolute top-0 left-0"
        />
        
        {/* The Connector Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40%" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#FFF2EC] z-10 shadow-sm"
          style={{ backgroundColor: color }}
        />
      </div>

      <div className={`w-full max-w-[1400px] px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10 ${align === 'right' ? 'md:grid-flow-dense' : ''}`}>
        
        {/* TEXT CONTENT */}
        <motion.div 
          initial={{ x: align === 'left' ? -50 : 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex flex-col pl-12 md:pl-0 ${align === 'right' ? 'md:order-2 md:pl-12 text-left' : 'md:text-right md:pr-12'}`}
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 md:justify-end" style={{ color: color, flexDirection: align === 'right' ? 'row' : 'row-reverse' }}>
            {phase}
            <div className="w-8 h-[1px]" style={{ backgroundColor: color }} />
          </span>
          
          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6 leading-none tracking-tighter">
            {title}
          </h3>
          
          <p className="font-sans text-lg md:text-xl font-light text-[#1a1a1a]/70 leading-relaxed">
            {body}
          </p>
        </motion.div>

        {/* VIDEO CONTENT */}
        <div className={`pl-12 md:pl-0 ${align === 'right' ? 'md:order-1' : ''} flex justify-center ${align === 'right' ? 'md:justify-end' : 'md:justify-start'}`}>
          <VideoPlaceholder color={color} delay={0.2} />
        </div>

      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export const SystemArchitecture: React.FC = () => {
  const originRef = useRef(null);
  
  // Initial line growth from origin
  const { scrollYProgress: originProgress } = useScroll({
    target: originRef,
    offset: ["center center", "end start"]
  });

  return (
    <div className="w-full bg-[#FFF2EC] relative overflow-hidden">
      
      {/* 1. HERO / ORIGIN */}
      <div ref={originRef} className="relative min-h-[50vh] flex flex-col items-center justify-center text-center pt-32 pb-20">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-6 block">/ THE ORIGIN</span>
           <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#1a1a1a] tracking-tighter mb-4">
             How to start your <br />
             <span className="italic font-serif text-[#C5A059]">Business the Right Way.</span>
           </h2>
           <p className="font-sans text-lg text-[#1a1a1a]/60 max-w-lg mx-auto">
             Most founders guess. We engineer. <br className="hidden md:block"/> This is the blueprint for a self-sustaining organism.
           </p>
         </motion.div>

         {/* STARTING LINE */}
         <div className="absolute left-6 md:left-1/2 bottom-0 w-[1px] h-32 bg-[#1a1a1a]/10 -translate-x-1/2">
            <motion.div 
              style={{ scaleY: originProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-[#E21E3F] absolute top-0 left-0"
            />
         </div>
      </div>

      {/* 2. PHASE I: IGNITION (RED) */}
      <NarrativeSection 
        phase="PHASE 01 // TRACTION"
        title="Get Clients."
        body="A business is an organism that needs energy. We build the infrastructure to feed it: Lead Magnets to attract, a CRM to organize data, and Automation to streamline the chaos."
        color="#E21E3F"
        align="left"
      />

      {/* 3. PHASE II: MOMENTUM (GOLD) */}
      <NarrativeSection 
        phase="PHASE 02 // EXPANSION"
        title="Scale Faster."
        body="Why scaling is the only way to go. Once the manual work is gone, we pour fuel on the fire. Efficient systems allow you to handle 10x the volume without 10x the staff."
        color="#C5A059"
        align="right"
      />

      {/* 4. PHASE III: VISION (BLACK) */}
      <NarrativeSection 
        phase="PHASE 03 // CLARITY"
        title="See Clearly."
        body="You cannot fix what you cannot measure. We install 'Control Towers' so you stop driving blind. See profit, loss, and bottlenecks instantly."
        color="#1a1a1a"
        align="left"
        isLast={true}
      />

      {/* 5. FOOTER CONNECTOR */}
      <div className="relative py-24 flex justify-center">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="flex flex-col items-center gap-4"
         >
           <div className="w-[1px] h-24 bg-gradient-to-b from-[#1a1a1a] to-transparent opacity-20" />
           <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40 animate-pulse">
             SCROLL TO EXPLORE THE PARTS
           </span>
           <ArrowDown className="w-4 h-4 text-[#1a1a1a]/40 animate-bounce" />
         </motion.div>
      </div>

    </div>
  );
};