import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { VizAcquisition, VizVelocity, VizIntelligence } from './ArchitecturePageVisuals';

// --- DATA: RINGS & FLOATING CARDS ---
const PILLAR_DATA = [
  // ACQUISITION (Left Side)
  { 
    id: 'pillar1', group: 'ACQUISITION', title: 'THE FACE', subtitle: 'Websites & E-commerce',
    color: '#E21E3F', x: '20%', y: '20%', 
    modalTitle: 'The Face',
    modalDesc: "It's not a brochure; it's a 'Digital Catcher.' We build websites engineered to capture leads and feed them into your system.",
    modalFeatures: ["High-Speed Landing Pages", "Retail E-commerce", "Brand Identity"]
  },
  { 
    id: 'pillar2', group: 'ACQUISITION', title: 'THE BRAIN', subtitle: 'CRM & Lead Tracking',
    color: '#E21E3F', x: '15%', y: '50%',
    modalTitle: 'The Brain',
    modalDesc: "The single source of truth. We track every call, email, and deal stage so you never lose revenue to human forgetfulness.",
    modalFeatures: ["Unified Inbox", "Deal Pipelines", "SMS Automation"]
  },
  { 
    id: 'pillar3', group: 'ACQUISITION', title: 'THE MUSCLE', subtitle: 'Automation',
    color: '#E21E3F', x: '20%', y: '80%',
    modalTitle: 'The Muscle',
    modalDesc: "Moving data without human effort. We replace 'Minor Labour' (data entry) with code so your team focuses on strategy.",
    modalFeatures: ["Auto-Invoicing", "Contract Generation", "Task Routing"]
  },
  // VELOCITY (Right Side)
  { 
    id: 'pillar4', group: 'VELOCITY', title: 'THE VOICE', subtitle: 'AI Assistants',
    color: '#C5A059', x: '80%', y: '20%',
    modalTitle: 'The Voice',
    modalDesc: "AI Agents that act like digital employees. They can reason, speak to customers, and qualify leads 24/7.",
    modalFeatures: ["Phone Agents", "Smart Chatbots", "Internal Analysts"]
  },
  { 
    id: 'pillar5', group: 'VELOCITY', title: 'THE PRESENCE', subtitle: 'Media Logistics',
    color: '#C5A059', x: '85%', y: '50%',
    modalTitle: 'The Presence',
    modalDesc: "Content as a supply chain. We turn one hour of raw expertise into a month of social media authority.",
    modalFeatures: ["Video Production", "Auto-Posting", "Content Repurposing"]
  },
  { 
    id: 'pillar6', group: 'VELOCITY', title: 'THE SOUL', subtitle: 'Team Training',
    color: '#C5A059', x: '80%', y: '80%',
    modalTitle: 'The Soul',
    modalDesc: "Technology fails if humans don't use it. We engineer the training and culture shift to ensure adoption.",
    modalFeatures: ["Internal Podcasts", "Micro-Learning", "Visual SOPs"]
  },
  // INTELLIGENCE (Center Bottom)
  { 
    id: 'pillar7', group: 'INTELLIGENCE', title: 'THE EYES', subtitle: 'Dashboards & Reporting',
    color: '#1a1a1a', x: '50%', y: '90%',
    modalTitle: 'The Eyes',
    modalDesc: "Moving from 'Gut Feeling' to evidence. We build dashboards that show you exactly where your profit is coming from.",
    modalFeatures: ["Executive Dashboards", "Profit Tracking", "Forecasting"]
  }
];

// --- VARIANTS ---
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, zIndex: 50, transition: { duration: 0.2 } }
};

const SystemModal = ({ data, onClose }: { data: typeof PILLAR_DATA[0], onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-auto">
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} className="absolute inset-0 bg-[#FFF2EC]/90 backdrop-blur-sm"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="relative w-full max-w-[500px] bg-white border border-[#1a1a1a]/10 shadow-2xl overflow-hidden rounded-sm"
    >
      <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-50 rounded-full transition-colors z-10">
          <X className="w-5 h-5 text-gray-400" />
      </button>
      <div className="h-1.5 w-full" style={{ backgroundColor: data.color }} />
      <div className="p-10 md:p-12">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold block mb-6" style={{ color: data.color }}>{data.group}</span>
          <h3 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-6 leading-[0.9]">{data.modalTitle}</h3>
          <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-10">{data.modalDesc}</p>
          <div className="space-y-4 pt-8 border-t border-gray-100">
              {data.modalFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                      <Check className="w-4 h-4" style={{ color: data.color }} />
                      <span className="font-mono text-xs text-[#1a1a1a]/80 uppercase tracking-widest">{feature}</span>
                  </div>
              ))}
          </div>
      </div>
    </motion.div>
  </div>
);

export const SystemArchitecture = () => {
  const [selectedPillar, setSelectedPillar] = useState<typeof PILLAR_DATA[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Animation Maps
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const acqY = useTransform(scrollYProgress, [0, 0.3], ["20vh", "42vh"]);
  const velY = useTransform(scrollYProgress, [0, 0.3], ["50vh", "42vh"]);
  const intY = useTransform(scrollYProgress, [0, 0.3], ["80vh", "42vh"]);
  const engineScale = useTransform(scrollYProgress, [0.3, 0.45], [1, 1.4]);
  const cardsOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const lineDraw = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#FFF2EC]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Connection Lines (Desktop Only) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block opacity-20">
          {PILLAR_DATA.map((card, i) => (
             <motion.line key={i} x1="50%" y1="50%" x2={card.x} y2={card.y} stroke={card.color} strokeWidth="1" strokeDasharray="4 4" style={{ pathLength: lineDraw }} />
          ))}
        </svg>

        {/* Central Engine Stack */}
        <div className="relative w-full max-w-7xl h-full mx-auto pointer-events-none flex flex-col items-center justify-center">
            
            {/* ACQUISITION (Red) */}
            <motion.div style={{ top: acqY, scale: engineScale, x: "-50%" }} className="absolute left-1/2 z-30">
               <div className="relative flex items-center justify-center md:justify-start">
                 <VizAcquisition color="#E21E3F" />
                 <motion.div style={{ opacity: textOpacity }} className="absolute w-80 text-center md:text-left left-1/2 -translate-x-1/2 md:left-full md:translate-x-4 md:top-1/2 md:-translate-y-1/2">
                    <span className="font-mono text-[9px] text-[#E21E3F] tracking-[0.2em] uppercase font-bold block mb-2">01 // The Foundation</span>
                    <h3 className="font-serif text-4xl text-[#1a1a1a]">ACQUISITION</h3>
                 </motion.div>
               </div>
            </motion.div>

            {/* VELOCITY (Gold) */}
            <motion.div style={{ top: velY, scale: engineScale, x: "-50%" }} className="absolute left-1/2 z-20">
               <div className="relative flex items-center justify-center md:justify-end">
                  <VizVelocity color="#C5A059" />
                  <motion.div style={{ opacity: textOpacity }} className="absolute w-80 text-center md:text-right right-1/2 translate-x-1/2 md:right-full md:-translate-x-4 md:top-1/2 md:-translate-y-1/2">
                    <span className="font-mono text-[9px] text-[#C5A059] tracking-[0.2em] uppercase font-bold block mb-2">02 // The Amplifier</span>
                    <h3 className="font-serif text-4xl text-[#1a1a1a]">VELOCITY</h3>
                 </motion.div>
               </div>
            </motion.div>

            {/* INTELLIGENCE (Black) */}
            <motion.div style={{ top: intY, scale: engineScale, x: "-50%" }} className="absolute left-1/2 z-10">
               <div className="relative flex items-center justify-center md:justify-start">
                  <VizIntelligence color="#1a1a1a" />
                  <motion.div style={{ opacity: textOpacity }} className="absolute w-80 text-center md:text-left left-1/2 -translate-x-1/2 md:left-full md:translate-x-4 md:top-1/2 md:-translate-y-1/2">
                    <span className="font-mono text-[9px] text-[#1a1a1a] tracking-[0.2em] uppercase font-bold block mb-2">03 // The Navigator</span>
                    <h3 className="font-serif text-4xl text-[#1a1a1a]">INTELLIGENCE</h3>
                 </motion.div>
               </div>
            </motion.div>
        </div>

        {/* Floating Cards (Visible on Desktop) */}
        <motion.div style={{ opacity: cardsOpacity }} className="absolute inset-0 pointer-events-none z-40 hidden md:block">
           {PILLAR_DATA.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ left: card.x, top: card.y, x: "-50%", y: "-50%" }}
                className="absolute cursor-pointer bg-white border border-[#1a1a1a]/10 rounded-sm p-6 w-60 flex flex-col items-center text-center shadow-xl pointer-events-auto group"
                onClick={() => setSelectedPillar(card)}
              >
                 <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: card.color }} />
                 <span className="text-[9px] font-mono uppercase tracking-[0.2em] font-bold mb-2 opacity-60" style={{ color: card.color }}>{card.group}</span>
                 <h4 className="font-serif text-xl text-[#1a1a1a] mb-1 leading-none">{card.title}</h4>
                 <span className="text-[10px] font-mono text-[#1a1a1a]/40 tracking-wider uppercase mt-1">{card.subtitle}</span>
                 
                 <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] font-bold text-[#1a1a1a] border-b border-[#1a1a1a]">Explore</span>
                 </div>
              </motion.div>
           ))}
        </motion.div>

        <AnimatePresence>
            {selectedPillar && <SystemModal data={selectedPillar} onClose={() => setSelectedPillar(null)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};
