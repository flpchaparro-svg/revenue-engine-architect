import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { VizAcquisition, VizVelocity, VizIntelligence } from './ArchitecturePageVisuals';

// --- DATA: RINGS & FLOATING CARDS ---
const PILLAR_DATA = [
  // GET CLIENTS (Left Side)
  { 
    id: 'pillar1', group: 'GET CLIENTS', title: 'THE FACE', subtitle: 'Websites & E-commerce',
    color: '#E21E3F', x: '15%', y: '22%', 
    modalTitle: 'The Face',
    modalDesc: "Your website isn't a brochure. It's a lead-catching machine. I build sites that capture enquiries, sell products, and feed everything straight into your CRM so nothing gets lost.",
    modalFeatures: ["High-Speed Landing Pages", "E-commerce Integration", "Brand-First Design"]
  },
  { 
    id: 'pillar2', group: 'GET CLIENTS', title: 'THE BRAIN', subtitle: 'CRM & Lead Tracking',
    color: '#E21E3F', x: '15%', y: '42%',
    modalTitle: 'The Brain',
    modalDesc: "If it's not in the CRM, it didn't happen. I set up systems that track every call, email, and deal stage automatically. No more lost leads or forgotten follow-ups.",
    modalFeatures: ["Unified Inbox", "Visual Deal Pipeline", "Automated Follow-Ups"]
  },
  { 
    id: 'pillar3', group: 'GET CLIENTS', title: 'THE MUSCLE', subtitle: 'Automation',
    color: '#E21E3F', x: '15%', y: '62%',
    modalTitle: 'The Muscle',
    modalDesc: "Data entry, invoicing, scheduling. The boring stuff that eats your week. I connect your systems so it runs itself and your team can focus on actual work.",
    modalFeatures: ["Auto-Invoicing", "Contract Generation", "Task Routing"]
  },
  // SCALE FASTER (Right Side)
  { 
    id: 'pillar4', group: 'SCALE FASTER', title: 'THE VOICE', subtitle: 'AI Assistants',
    color: '#C5A059', x: '85%', y: '22%',
    modalTitle: 'The Voice',
    modalDesc: "AI that sounds human, reasons like a human, and qualifies leads while you sleep. I build bots that answer your phone, reply to enquiries, and book appointments 24/7.",
    modalFeatures: ["AI Phone Answering", "Website Chatbots", "Internal Knowledge Bots"]
  },
  { 
    id: 'pillar5', group: 'SCALE FASTER', title: 'THE PRESENCE', subtitle: 'Content Systems',
    color: '#C5A059', x: '85%', y: '42%',
    modalTitle: 'The Presence',
    modalDesc: "You know you should be posting, but who has the time? I turn one voice note into a blog, social posts, and a newsletter. You talk, the machine handles the rest.",
    modalFeatures: ["Video Production", "Auto-Posting", "Content Repurposing"]
  },
  { 
    id: 'pillar6', group: 'SCALE FASTER', title: 'THE SOUL', subtitle: 'Team Training',
    color: '#C5A059', x: '85%', y: '62%',
    modalTitle: 'The Soul',
    modalDesc: "New tech fails when people don't use it. I create short training videos and guides that make adoption easy. Your team actually uses the tools you paid for.",
    modalFeatures: ["Micro-Learning Videos", "Visual SOPs", "Q&A Libraries"]
  },
  // SEE CLEARLY (Right Side)
  { 
    id: 'pillar7', group: 'SEE CLEARLY', title: 'THE EYES', subtitle: 'Dashboards & Reporting',
    color: '#1a1a1a', x: '50%', y: '75%',
    modalTitle: 'The Eyes',
    modalDesc: "Stop flying blind. I build dashboards that show revenue, margins, and pipeline on one screen, updated live. You make decisions based on data, not gut feeling.",
    modalFeatures: ["Executive Dashboards", "Profit Tracking", "Forecasting"]
  }
];

// --- VARIANTS ---
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, zIndex: 50, transition: { duration: 0.2, ease: "easeOut" } }
};

const SystemModal = ({ data, onClose }: { data: typeof PILLAR_DATA[0], onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 pointer-events-auto">
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} className="absolute inset-0 bg-white/80 backdrop-blur-sm"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="relative w-full max-w-[450px] bg-white border shadow-2xl overflow-hidden rounded-sm"
      style={{ borderColor: `${data.color}33` }}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-50 rounded-full transition-colors z-10">
          <X className="w-4 h-4 text-gray-400" />
      </button>
      <div className="h-1.5 w-full" style={{ backgroundColor: data.color }} />
      <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
             <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: data.color }}>{data.group}</span>
             <div className="h-px flex-grow bg-gray-100" />
          </div>
          <h3 className="font-serif text-4xl text-[#1a1a1a] mb-2 leading-none">{data.modalTitle}</h3>
          <p className="font-sans text-base text-gray-600 leading-relaxed mb-8 mt-4">{data.modalDesc}</p>
          <div className="space-y-4 pt-6 border-t border-gray-100">
              {data.modalFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                          <Check className="w-3 h-3" style={{ color: data.color }} />
                      </div>
                      <span className="font-mono text-[11px] text-gray-600 uppercase tracking-wider">{feature}</span>
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
  const acqY = useTransform(scrollYProgress, [0, 0.3], ["20vh", "50%"]);
  const velY = useTransform(scrollYProgress, [0, 0.3], ["50vh", "50%"]);
  const intY = useTransform(scrollYProgress, [0, 0.3], ["80vh", "50%"]);
  const engineScale = useTransform(scrollYProgress, [0.3, 0.4], [1, 1.4]);
  
  const cardsOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]); 
  const lineDraw = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]); 

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#FFF2EC]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {PILLAR_DATA.map((card, i) => (
             <motion.line key={i} x1="50%" y1="50%" x2={card.x} y2={card.y} stroke={card.color} strokeWidth="1" strokeDasharray="4 4" style={{ pathLength: lineDraw, opacity: 0.3 }} />
          ))}
        </svg>

        {/* Central Engine */}
        <div className="relative w-full max-w-7xl h-full mx-auto pointer-events-none">
            
            {/* Acquisition - TEXT ON RIGHT (System 01) */}
            <motion.div style={{ top: acqY, scale: engineScale, x: "-50%", y: "-50%" }} className="absolute left-1/2 z-30">
               <div className="relative flex items-center justify-center">
                 <VizAcquisition color="#E21E3F" />
                 <motion.div style={{ opacity: textOpacity }} className="absolute w-64 text-center left-1/2 -translate-x-1/2 bottom-24 md:left-full md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:text-left md:ml-8 md:w-80">
                    <span className="font-mono text-[9px] text-[#E21E3F] tracking-widest uppercase block mb-2 md:mb-1">SYSTEM 01 / GET CLIENTS</span>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-2">Acquisition</h3>
                    <p className="font-sans text-xs md:text-sm text-[#1a1a1a]/60 leading-relaxed">
                      <span className="hidden md:inline">Capture demand, store data, and process revenue without chaos.</span>
                      <span className="md:hidden">Capture leads automatically</span>
                    </p>
                 </motion.div>
               </div>
            </motion.div>

            {/* Velocity - TEXT ON LEFT (System 02) */}
            <motion.div style={{ top: velY, scale: engineScale, x: "-50%", y: "-50%" }} className="absolute left-1/2 z-20">
               <div className="relative flex items-center justify-center">
                  <VizVelocity color="#C5A059" />
                  {/* FIX: added 'md:left-auto' to release the mobile centering so 'right-full' works */}
                  <motion.div style={{ opacity: textOpacity }} className="absolute w-64 text-center left-1/2 -translate-x-1/2 bottom-24 md:left-auto md:right-full md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:text-right md:mr-8 md:w-80">
                    <span className="font-mono text-[9px] text-[#C5A059] tracking-widest uppercase block mb-2 md:mb-1">SYSTEM 02 / SCALE FASTER</span>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-2">Velocity</h3>
                    <p className="font-sans text-xs md:text-sm text-[#1a1a1a]/60 leading-relaxed">
                      <span className="hidden md:inline">Do more with less. AI and content that multiply your output.</span>
                      <span className="md:hidden">Multiply output without hiring</span>
                    </p>
                 </motion.div>
               </div>
            </motion.div>

            {/* Intelligence - TEXT ON RIGHT (System 03) */}
            <motion.div style={{ top: intY, scale: engineScale, x: "-50%", y: "-50%" }} className="absolute left-1/2 z-10">
               <div className="relative flex items-center justify-center">
                  <VizIntelligence color="#1a1a1a" />
                  <motion.div style={{ opacity: textOpacity }} className="absolute w-64 text-center left-1/2 -translate-x-1/2 bottom-24 md:left-full md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:text-left md:ml-8 md:w-80">
                    <span className="font-mono text-[9px] text-[#1a1a1a] tracking-widest uppercase block mb-2 md:mb-1">SYSTEM 03 / SEE CLEARLY</span>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-2">Intelligence</h3>
                    <p className="font-sans text-xs md:text-sm text-[#1a1a1a]/60 leading-relaxed">
                      <span className="hidden md:inline">Stop guessing. See your numbers and steer with confidence.</span>
                      <span className="md:hidden">Real-time business visibility</span>
                    </p>
                 </motion.div>
               </div>
            </motion.div>
        </div>

        {/* Floating Cards */}
        <motion.div style={{ opacity: cardsOpacity }} className="absolute inset-0 pointer-events-none z-40">
           {PILLAR_DATA.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                style={{ 
                   left: card.x, 
                   top: card.y, 
                   x: "-50%",
                   y: "-50%",
                   borderColor: `${card.color}40`
                }}
                className="absolute cursor-pointer bg-[#FFF2EC] border rounded-sm p-5 w-48 md:w-60 flex flex-col items-center text-center shadow-lg pointer-events-auto transition-colors duration-300 hover:bg-white group"
                onClick={() => setSelectedPillar(card)}
              >
                 <span className="text-[9px] font-mono uppercase tracking-widest mb-1.5 opacity-80" style={{ color: card.color }}>{card.group}</span>
                 <h4 className="font-serif text-lg md:text-xl text-[#1a1a1a] mb-1 leading-none">{card.title}</h4>
                 <p className="text-[9px] font-mono text-[#1a1a1a]/60 tracking-wider mb-2 block uppercase">{card.subtitle}</p>
                 
                 <div className="mt-auto flex items-center justify-center">
                    <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] transition-colors">[ Click here ]</span>
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