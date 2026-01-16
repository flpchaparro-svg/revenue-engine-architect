import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Minus, Globe, Database, Zap, Bot, Video, Users, BarChart3 } from 'lucide-react';
import GlobalFooter from '../../components/GlobalFooter';
import HeroVisual_Suspension from '../../components/HeroVisual_Suspension';
import FAQSection from '../../components/FAQSection';
import { getSystemPageFAQs } from '../../constants/faqData';
import { SystemArchitecture } from '../../components/SystemArchitecture';

// --- DATA ---
const ALL_PILLARS = [
  {
    id: 'pillar1', number: '01', icon: Globe, title: 'THE FACE', subtitle: 'Digital Revenue Architecture',
    categoryHex: '#E21E3F', categoryLabel: 'ACQUISITION', technicalLabel: 'DIGITAL_STOREFRONT',
    description: 'Not a brochure, but a "Digital Catcher." A high-performance structure designed to capture leads and process transactions with zero friction.',
    subServices: [
       { title: 'The Bond', description: 'It acts as the "Mouth" of the Acquisition system. Without it, the CRM (The Brain) has nothing to process.' },
       { title: 'The Whole', description: 'It establishes the first data point. If the Face fails to capture the source, the Intelligence (Pillar 7) cannot measure ROI later.' },
       { title: 'Client Benefit', description: 'Stops "Lead Leakage." You stop losing customers to slower competitors.' },
       { title: 'Group Purpose', description: 'To capture demand and structure data.' }
    ]
  },
  {
    id: 'pillar2', number: '02', icon: Database, title: 'THE BRAIN', subtitle: 'CRM Revenue Intelligence',
    categoryHex: '#E21E3F', categoryLabel: 'ACQUISITION', technicalLabel: 'LEAD_DATABASE',
    description: 'The Single Source of Truth. A unified database that tracks every call, email, and deal stage. If it\'s not here, it didn\'t happen.',
    subServices: [
       { title: 'The Bond', description: 'It acts as the "Memory." It stores what The Face captures and triggers The Muscle to act.' },
       { title: 'The Whole', description: 'It is the central nervous system. It holds the data that the AI Agents (Pillar 4) need to read in order to speak intelligently to customers.' },
       { title: 'Client Benefit', description: 'Pipeline Visibility. You stop managing by memory and start managing by data.' },
       { title: 'Group Purpose', description: 'To capture demand and structure data.' }
    ]
  },
  {
    id: 'pillar3', number: '03', icon: Zap, title: 'THE MUSCLE', subtitle: 'Automation Architecture',
    categoryHex: '#E21E3F', categoryLabel: 'ACQUISITION', technicalLabel: 'WORKFLOW_ENGINE',
    description: 'Code Leverage. Replacing "Minor Labour" (data entry, invoicing, scheduling) with silent, instant code execution.',
    subServices: [
       { title: 'The Bond', description: 'It acts as the "Hands." When The Brain signals a "Won Deal," The Muscle instantly sends the invoice and contract.' },
       { title: 'The Whole', description: 'It creates velocity. It ensures that data moves between Marketing, Sales, and Ops instantly, removing the human bottleneck.' },
       { title: 'Client Benefit', description: 'Time Arbitrage. Your team focuses on high-value strategy, not low-value admin.' },
       { title: 'Group Purpose', description: 'To capture demand and structure data.' }
    ]
  },
  {
    id: 'pillar4', number: '04', icon: Bot, title: 'THE VOICE', subtitle: 'Cognitive Infrastructure',
    categoryHex: '#C5A059', categoryLabel: 'VELOCITY', technicalLabel: 'SYNTHETIC_WORKFORCE',
    description: 'Cognitive Infrastructure. Digital employees that can listen, reason, and speak to customers 24/7 via phone or chat.',
    subServices: [
       { title: 'The Bond', description: 'It creates "Infinite Concurrency." Unlike human staff, The Voice can handle 100 simultaneous calls during a marketing spike.' },
       { title: 'The Whole', description: 'It is the interface. It reads the CRM data (Pillar 2) to know the customer\'s history and updates it instantly after the call.' },
       { title: 'Client Benefit', description: 'Scalability. You can double your lead volume without hiring more support staff.' },
       { title: 'Group Purpose', description: 'To multiply output and decouple time from revenue.' }
    ]
  },
  {
    id: 'pillar5', number: '05', icon: Video, title: 'THE PRESENCE', subtitle: 'Media Logistics',
    categoryHex: '#C5A059', categoryLabel: 'VELOCITY', technicalLabel: 'MEDIA_DISTRIBUTION',
    description: 'A Content Supply Chain. Turning one hour of raw expertise into a month of omni-channel authority assets (Video, Text, Audio).',
    subServices: [
       { title: 'The Bond', description: 'It creates "Ubiquity." It ensures your brand is seen everywhere, fueling the top of the funnel for The Face (Pillar 1).' },
       { title: 'The Whole', description: 'It feeds the machine. High-quality content drives traffic to the system, ensuring the Automation and AI agents have leads to process.' },
       { title: 'Client Benefit', description: 'Authority. You become the "Category King" without spending your life on social media.' },
       { title: 'Group Purpose', description: 'To multiply output and decouple time from revenue.' }
    ]
  },
  {
    id: 'pillar6', number: '06', icon: Users, title: 'THE SOUL', subtitle: 'Adoption Architecture',
    categoryHex: '#C5A059', categoryLabel: 'VELOCITY', technicalLabel: 'KNOWLEDGE_BASE',
    description: 'Behavior Engineering. Systems designed to ensure human staff actually use the tools (Internal Podcasts, Micro-Learning).',
    subServices: [
       { title: 'The Bond', description: 'It protects the investment. The fastest car (Velocity) is useless if the driver (Staff) doesn\'t know how to shift gears.' },
       { title: 'The Whole', description: 'It creates alignment. It ensures the human culture matches the digital speed, preventing "System Rejection."' },
       { title: 'Client Benefit', description: 'ROI Assurance. You stop buying software that becomes "Shelfware."' },
       { title: 'Group Purpose', description: 'To multiply output and decouple time from revenue.' }
    ]
  },
  {
    id: 'pillar7', number: '07', icon: BarChart3, title: 'THE EYES', subtitle: 'Intelligence Architecture',
    categoryHex: '#1a1a1a', categoryLabel: 'INTELLIGENCE', technicalLabel: 'BI_VISUALIZATION',
    description: 'The Control Tower. Visualizing real-time profit, churn, and speed. Moving from "Gut Feeling" to Evidence.',
    subServices: [
       { title: 'The Bond', description: 'It is the "Feedback Loop." It tells you if the Acquisition system is profitable and if the Velocity system is efficient.' },
       { title: 'The Whole', description: 'It allows for Navigation. It takes data from every other pillar to show you exactly where to steer the business next.' },
       { title: 'Client Benefit', description: 'Certainty. You sleep better knowing exactly where your profit is coming from.' },
       { title: 'Group Purpose', description: 'To navigate with certainty.' }
    ]
  }
];

// --- GRID ITEM COMPONENT ---
const GridItem = ({ pillar, isSelected, onToggle, onNavigate }: any) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      layout
      ref={itemRef}
      onLayoutAnimationComplete={() => {
        if (isSelected && itemRef.current) {
           // FIX: Scroll to the beginning of the popup text (header section) for better UX
           requestAnimationFrame(() => {
             itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
           });
        }
      }}
      onClick={onToggle}
      // FIX: Added 'h-auto' to prevent content cut-off
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${isSelected ? 'col-span-1 md:col-span-2 lg:col-span-3 min-h-[600px] h-auto z-10' : 'col-span-1 min-h-[300px] z-0'}`}
      style={{
        backgroundColor: isSelected ? '#FFFFFF' : 'transparent', // FIX: White when open, Transparent when closed
        borderColor: isSelected ? pillar.categoryHex : 'rgba(26, 26, 26, 0.15)',
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Border Container */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-500 border border-solid" style={{ borderColor: isSelected ? pillar.categoryHex : 'rgba(26, 26, 26, 0.15)' }} />

      {/* --- CLOSED STATE --- */}
      {!isSelected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-8 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">{pillar.number}</span>
            <pillar.icon className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: pillar.categoryHex }} />
          </div>
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3 block font-bold" style={{ color: pillar.categoryHex }}>{pillar.subtitle}</span>
            <h3 className="font-serif text-3xl text-[#1a1a1a] mb-2">{pillar.title}</h3>
            <p className="font-mono text-[9px] text-[#1a1a1a]/40 uppercase tracking-[0.2em]">[{pillar.technicalLabel}]</p>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-4 h-px bg-current" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">Expand</span>
          </div>
        </motion.div>
      )}

      {/* --- EXPANDED STATE --- */}
      <AnimatePresence>
        {isSelected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} exit={{ opacity: 0 }} className="relative w-full min-h-full p-8 md:p-12 flex flex-col text-[#1a1a1a]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#1a1a1a]/10 pb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: pillar.categoryHex }}>{pillar.number} / {pillar.categoryLabel}</span>
                  <div className="w-12 h-px" style={{ backgroundColor: pillar.categoryHex }} />
                </div>
                <h2 className="font-serif text-5xl md:text-6xl mb-2">{pillar.title}</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3 block">The Unit</span>
                <p className="font-sans text-xl text-[#1a1a1a]/80 max-w-3xl leading-relaxed">{pillar.description}</p>
              </div>
              <div className="mt-6 md:mt-0 p-6 border rounded-sm bg-white shadow-sm" style={{ borderColor: `${pillar.categoryHex}20` }}>
                  <pillar.icon className="w-8 h-8 md:w-12 md:h-12" style={{ color: pillar.categoryHex }} />
              </div>
            </div>

            {/* Sub-Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 flex-grow">
                {pillar.subServices?.map((sub: any, idx: number) => (
                  <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + (idx * 0.1) }} className="border-l pl-6 flex flex-col justify-start" style={{ borderColor: `${pillar.categoryHex}30` }}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: pillar.categoryHex }}>0{idx + 1}</span>
                    </div>
                    <h4 className="font-serif text-lg mb-3">{sub.title}</h4>
                    <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed">{sub.description}</p>
                  </motion.div>
                ))}
            </div>

            {/* Actions */}
            <div className="mt-12 w-full flex justify-end">
              <button onClick={(e) => { e.stopPropagation(); onNavigate(pillar.id); }} className="group flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: pillar.categoryHex }}>[ See Pillar ]</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" style={{ color: pillar.categoryHex }} />
              </button>
            </div>

            {/* Close Button */}
            <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Minus className="w-6 h-6 text-[#1a1a1a]/40" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- MAIN PAGE ---
const SystemPage: React.FC<any> = ({ onBack, onNavigate }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const systemFAQs = getSystemPageFAQs();

  const heroContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
  const heroItem = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 40, damping: 20 } } };

  return (
    <div className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] flex flex-col font-sans">
      
      {/* HERO SECTION */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full mb-20">
         <div className="flex justify-between items-center mb-12">
            <button onClick={onBack} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:text-[#C5A059] transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              / Return to Home
            </button>
         </div>
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span variants={heroItem} className="font-mono text-xs text-[#E21E3F] tracking-[0.2em] mb-6 block uppercase font-bold">/ THE SYSTEM</motion.span>
              <motion.h1 variants={heroItem} className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8">7 Ways I Fix <br /><span className="italic text-black/20">Your Business.</span></motion.h1>
              <motion.p variants={heroItem} className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-xl border-l-2 border-[#C5A059] pl-6">I don't just build websites. I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.</motion.p>
            </div>
            <motion.div variants={heroItem} className="h-full flex items-center justify-center lg:justify-end min-h-[300px] lg:min-h-[500px] relative">
               <HeroVisual_Suspension />
            </motion.div>
         </motion.div>
      </div>

      {/* SECTION 1: SCROLLYTELLING */}
      <section className="relative z-0 mb-32 border-t border-[#1a1a1a]/10">
         <SystemArchitecture />
      </section>

      {/* SECTION 2: BLUEPRINT GRID */}
      <section className="w-full bg-[#FFF2EC] pb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-24 pt-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E21E3F] mb-4 block font-bold">System Breakdown</span>
              <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] mb-6">The Parts in Detail</h2>
              <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">Each component is designed to work alone, but engineered to work together.</p>
          </div>

          <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-black/10 flex-grow" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40">System Grid V1.0</span>
              <div className="h-px bg-black/10 flex-grow" />
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {ALL_PILLARS.map((pillar) => (
              <GridItem 
                key={pillar.id}
                pillar={pillar}
                isSelected={selectedPillarId === pillar.id}
                onToggle={() => setSelectedPillarId(selectedPillarId === pillar.id ? null : pillar.id)}
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