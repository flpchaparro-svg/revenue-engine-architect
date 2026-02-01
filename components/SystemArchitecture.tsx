import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VisualGetClientsEngine from './Visual_GetClients_Engine';
import VisualScaleFasterEngine from './Visual_ScaleFaster_Engine';
import VisualSeeClearlyEngine from './Visual_SeeClearly_Engine'; // <--- IMPORT

// --- Internal Fallback Component ---
const PlaceholderVisual: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="w-full h-full bg-[#FFF2EC] border border-[#1a1a1a]/10 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundColor: color }}></div>
    <div className="text-center p-6">
      <div className="text-4xl mb-2 opacity-20">construction</div>
      <div className="font-mono text-sm uppercase tracking-widest text-[#1a1a1a]/80">
        {label}
      </div>
    </div>
  </div>
);

// --- Narrative Section Component ---
interface NarrativeSectionProps {
  phase: string;
  title: string;
  subtitle: string;
  body: string;
  color: string;
  align: 'left' | 'right';
  visual?: React.ReactNode; 
}

const NarrativeSection: React.FC<NarrativeSectionProps> = ({ 
  phase, title, subtitle, body, color, align, visual 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isRight = align === 'right';

  return (
    <div ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center py-24 border-b border-[#1a1a1a]/10 last:border-0">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        
        {/* Text Column */}
        <div className={`flex flex-col ${isRight ? 'md:col-start-2 md:order-2' : 'md:col-start-1 md:order-1'}`}>
          <div className="flex items-center gap-4 mb-6">
             <div className="h-[1px] w-12 bg-[#1a1a1a]"></div>
             <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#1a1a1a]">{phase}</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] mb-8 leading-[1.1]">
            {title} <span className="italic font-serif" style={{ color: color }}>{subtitle}</span>
          </h2>
          <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed max-w-md">
            {body}
          </p>
        </div>

        {/* Visual Column */}
        <div className={`${isRight ? 'md:col-start-1 md:order-1 justify-end' : 'md:col-start-2 md:order-2 justify-start'} flex`}>
          <motion.div 
            style={{ y }}
            className="w-full aspect-video max-w-[600px] shadow-2xl relative z-10 bg-[#FFF2EC]"
          >
             {visual ? (
                <div className="w-full h-full">
                  {visual}
                </div>
             ) : (
                <PlaceholderVisual color={color} label={`Visual for ${title}`} />
             )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

// --- Main Export ---
export const SystemArchitecture: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FFF2EC] z-10">
      
      {/* PHASE 1: IGNITION */}
      <NarrativeSection 
        phase="PHASE 01 / GET CLIENTS"
        title="Get"
        subtitle="Clients."
        body="We build the entire capture mechanism. High-performance websites that build trust, coupled with a CRM that ensures no lead is ever left behind."
        color="#E21E3F"
        align="left"
        visual={<VisualGetClientsEngine />} 
      />

      {/* PHASE 2: MOMENTUM */}
      <NarrativeSection 
        phase="PHASE 02 / SCALE FASTER"
        title="Scale"
        subtitle="Faster."
        body="Once the foundation is set, we turn up the volume. Automated workflows and data-driven campaigns to multiply your output without multiplying your effort."
        color="#C5A059"
        align="right"
        visual={<VisualScaleFasterEngine />} 
      />

      {/* PHASE 3: VISION */}
      <NarrativeSection 
        phase="PHASE 03 / SEE CLEARLY"
        title="See"
        subtitle="Clearly."
        body="The final piece is intelligence. Unified dashboards that give you a God's-eye view of your entire revenue operation in real-time."
        color="#1a1a1a"
        align="left"
        visual={<VisualSeeClearlyEngine />} 
      />

    </div>
  );
};

export default SystemArchitecture;