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
    id: 'pillar1', number: '01', icon: Globe, title: 'THE FACE', 
    subtitle: 'Websites & E-commerce', subtitleMobile: 'Websites',
    categoryHex: '#E21E3F', categoryLabel: 'GET CLIENTS', technicalLabel: 'DIGITAL_STOREFRONT',
    body: 'Your online storefront that captures leads, sells products, and feeds data to every other pillar',
    bodyMobile: 'Online storefront that captures and converts',
    description: 'Your online storefront. Not a digital brochure, but a system designed to capture leads and process transactions with zero friction.',
    subServices: [
       { title: 'How it connects', description: 'The Face feeds the Brain. Every visitor who fills out a form or makes a purchase gets logged in your CRM automatically.' },
       { title: 'How it helps the whole system', description: 'Without the Face capturing data properly, you can\'t track where your leads come from. Pillar 7 (Dashboards) needs this data to show you what\'s working.' },
       { title: 'What you get', description: 'You stop losing customers to slower competitors. Leads get captured while you sleep.' }
    ]
  },
  {
    id: 'pillar2', number: '02', icon: Database, title: 'THE BRAIN', 
    subtitle: 'CRM & Lead Tracking', subtitleMobile: 'CRM',
    categoryHex: '#E21E3F', categoryLabel: 'GET CLIENTS', technicalLabel: 'LEAD_DATABASE',
    body: 'The single source of truth that tracks every call, email, and deal stage',
    bodyMobile: 'Tracks every lead, call, and deal',
    description: 'Your single source of truth. Every call, email, and deal stage tracked in one place. If it\'s not in the CRM, it didn\'t happen.',
    subServices: [
       { title: 'How it connects', description: 'The Brain stores what the Face captures and tells the Muscle what to do next. When a deal is won, automation kicks in.' },
       { title: 'How it helps the whole system', description: 'The AI assistants (Pillar 4) need CRM data to speak intelligently to customers. Without it, they\'re guessing.' },
       { title: 'What you get', description: 'Pipeline visibility. You stop managing by memory and start managing by data.' }
    ]
  },
  {
    id: 'pillar3', number: '03', icon: Zap, title: 'THE MUSCLE', 
    subtitle: 'Automation', subtitleMobile: 'Automation',
    categoryHex: '#E21E3F', categoryLabel: 'GET CLIENTS', technicalLabel: 'WORKFLOW_ENGINE',
    body: 'Replaces data entry, invoicing, and follow-ups with instant code execution',
    bodyMobile: 'Admin tasks run themselves',
    description: 'Code doing the boring work. Data entry, invoicing, follow-ups. The stuff that eats your week now runs itself.',
    subServices: [
       { title: 'How it connects', description: 'When the Brain signals a won deal, the Muscle sends the invoice and contract instantly. No human delay.' },
       { title: 'How it helps the whole system', description: 'Data moves between Marketing, Sales, and Ops in real time. No more copy-paste between three apps.' },
       { title: 'What you get', description: 'Time back. Your team focuses on high-value work, not low-value admin.' }
    ]
  },
  {
    id: 'pillar4', number: '04', icon: Bot, title: 'THE VOICE', 
    subtitle: 'AI Assistants', subtitleMobile: 'AI Bots',
    categoryHex: '#C5A059', categoryLabel: 'SCALE FASTER', technicalLabel: 'SYNTHETIC_WORKFORCE',
    body: 'Digital employees that listen, reason, and speak to customers 24/7 via phone or chat',
    bodyMobile: 'Bots that answer 24/7',
    description: 'Digital employees that listen, think, and speak. AI that answers your phone, qualifies leads, and books appointments around the clock.',
    subServices: [
       { title: 'How it connects', description: 'The Voice handles 100 calls at once. When you run a marketing campaign and leads spike, it doesn\'t buckle.' },
       { title: 'How it helps the whole system', description: 'It reads CRM data to know the customer\'s history. After the call, it updates the record automatically.' },
       { title: 'What you get', description: 'Scalability. Double your lead volume without doubling your staff.' }
    ]
  },
  {
    id: 'pillar5', number: '05', icon: Video, title: 'THE PRESENCE', 
    subtitle: 'Content Systems', subtitleMobile: 'Content',
    categoryHex: '#C5A059', categoryLabel: 'SCALE FASTER', technicalLabel: 'MEDIA_DISTRIBUTION',
    body: 'Turns one hour of raw expertise into a month of content across every platform',
    bodyMobile: 'One input, endless content',
    description: 'A content supply chain. One hour of your expertise becomes a month of posts, blogs, and videos across every platform.',
    subServices: [
       { title: 'How it connects', description: 'Content drives traffic to your website (Pillar 1), which captures leads, which feeds the CRM, which triggers automation.' },
       { title: 'How it helps the whole system', description: 'High-quality content keeps the top of the funnel full. The AI and automation have leads to process.' },
       { title: 'What you get', description: 'Authority. You become the go-to expert without spending your life on social media.' }
    ]
  },
  {
    id: 'pillar6', number: '06', icon: Users, title: 'THE SOUL', 
    subtitle: 'Team Training', subtitleMobile: 'Training',
    categoryHex: '#C5A059', categoryLabel: 'SCALE FASTER', technicalLabel: 'KNOWLEDGE_BASE',
    body: 'Systems designed to ensure your team actually uses the tools you paid for',
    bodyMobile: 'Makes your team use the tools',
    description: 'The human element. Training systems that make sure your team actually uses the tools you paid for.',
    subServices: [
       { title: 'How it connects', description: 'The fastest car is useless if the driver doesn\'t know how to shift gears. The Soul protects your investment in the other 6 pillars.' },
       { title: 'How it helps the whole system', description: 'When the team adopts the tools properly, data is clean and the system works as designed.' },
       { title: 'What you get', description: 'ROI assurance. No more expensive shelfware that nobody uses.' }
    ]
  },
  {
    id: 'pillar7', number: '07', icon: BarChart3, title: 'THE EYES', 
    subtitle: 'Dashboards & Reporting', subtitleMobile: 'Dashboards',
    categoryHex: '#1a1a1a', categoryLabel: 'SEE CLEARLY', technicalLabel: 'BI_VISUALIZATION',
    body: 'Visualises real-time profit, churn, and speed so you move from gut feeling to evidence',
    bodyMobile: 'Your numbers on one screen',
    description: 'The control tower. Revenue, margins, and pipeline on one screen, updated live. No more midnight spreadsheets.',
    subServices: [
       { title: 'How it connects', description: 'The Eyes take data from every other pillar and show you where to steer next. It\'s the feedback loop.' },
       { title: 'How it helps the whole system', description: 'It tells you if Acquisition is profitable, if Velocity is efficient, and what needs fixing.' },
       { title: 'What you get', description: 'Certainty. You sleep better knowing exactly where your profit is coming from.' }
    ]
  }
];

// --- GRID ITEM COMPONENT ---
const GridItem = ({ pillar, isSelected, onToggle, onNavigate }: any) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isLastItem = pillar.id === 'pillar7';

  // FIX: Dynamic classes to handle layout symmetry
  const gridClasses = isSelected 
    ? 'col-span-1 md:col-span-2 lg:col-span-3 min-h-[600px] h-auto z-10'
    : isLastItem 
      ? 'col-span-1 md:col-span-2 lg:col-span-1 lg:col-start-2 min-h-[300px] z-0'
      : 'col-span-1 min-h-[300px] z-0';

  return (
    <motion.div
      layout
      ref={itemRef}
      onLayoutAnimationComplete={() => {
        if (isSelected && itemRef.current) {
           requestAnimationFrame(() => {
             itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
           });
        }
      }}
      onClick={onToggle}
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${gridClasses}`}
      style={{
        backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
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
            {/* Standard: text-xs font-bold tracking-[0.2em] */}
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-40">{pillar.number}</span>
            <pillar.icon className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: pillar.categoryHex }} />
          </div>
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: pillar.categoryHex }}>
              <span className="hidden lg:inline">{pillar.categoryLabel}</span>
              <span className="lg:hidden">{pillar.categoryLabel}</span>
            </span>
            {/* HIERARCHY FIX: Reduced from 3xl to 2xl/3xl to sit below Page Titles */}
            <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] leading-[1.1] tracking-tight mb-2">{pillar.title}</h3>
            <p className="font-sans text-base leading-relaxed text-[#1a1a1a]/70 mb-2">
              <span className="hidden lg:inline">{pillar.body}</span>
              <span className="lg:hidden">{pillar.bodyMobile}</span>
            </p>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/40 mt-4">
              <span className="hidden lg:inline">{pillar.subtitle}</span>
              <span className="lg:hidden">{pillar.subtitleMobile}</span>
            </p>
          </div>
          <div className="mt-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60">
              <span className="hidden lg:inline">[ SEE PILLAR ]</span>
              <span className="lg:hidden">[ VIEW ]</span>
            </span>
          </div>
        </motion.div>
      )}

      {/* --- EXPANDED STATE --- */}
      <AnimatePresence>
        {isSelected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} exit={{ opacity: 0 }} className="relative w-full min-h-full p-8 md:p-12 flex flex-col text-[#1a1a1a]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#1a1a1a]/10 pb-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: pillar.categoryHex }}>{pillar.number} / {pillar.categoryLabel}</span>
                  <div className="w-12 h-px" style={{ backgroundColor: pillar.categoryHex }} />
                </div>
                {/* HIERARCHY FIX: Reduced from 6xl to 4xl/5xl to remain subservient to H1 */}
                <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-2">{pillar.title}</h2>
                {/* Standard: text-lg md:text-xl */}
                <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-3xl">{pillar.description}</p>
              </div>
              <div className="mt-6 md:mt-0 p-6 border rounded-sm bg-white shadow-sm" style={{ borderColor: `${pillar.categoryHex}20` }}>
                  <pillar.icon className="w-8 h-8 md:w-12 md:h-12" style={{ color: pillar.categoryHex }} />
              </div>
            </div>

            {/* Sub-Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 flex-grow">
                {pillar.subServices?.map((sub: any, idx: number) => (
                  <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + (idx * 0.1) }} className="border-l pl-6 flex flex-col justify-start" style={{ borderColor: `${pillar.categoryHex}30` }}>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: pillar.categoryHex }}>0{idx + 1}</span>
                    </div>
                    <h4 className="font-serif text-xl md:text-2xl leading-tight tracking-tight mb-4">{sub.title}</h4>
                    {/* WRAPPED CONTENT FIX: Upgraded to text-base for readability */}
                    <p className="font-sans text-base leading-relaxed text-[#1a1a1a]/70">{sub.description}</p>
                  </motion.div>
                ))}
            </div>

            {/* Actions */}
            <div className="mt-12 w-full flex justify-end">
              <button onClick={(e) => { e.stopPropagation(); onNavigate(pillar.id); }} className="group flex items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: pillar.categoryHex }}>[ SEE PILLAR ]</span>
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
      
      {/* HERO SECTION - 100vh on mobile/tablet */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full mb-20 lg:mb-20 h-[calc(100vh-8rem)] md:h-[calc(100vh-8rem)] lg:h-auto flex flex-col justify-center">
         <div className="flex justify-between items-center mb-4 md:mb-6 lg:mb-12">
            <button onClick={onBack} className="group flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:text-[#C5A059] transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden lg:inline">/ Return to Home</span>
              <span className="lg:hidden">/ Back</span>
            </button>
         </div>
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-12 items-center flex-1">
            <div className="flex flex-col justify-center">
              {/* HIERARCHY FIX: Matched Home Page spacing exactly (mb-10) */}
              <motion.span variants={heroItem} className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-2 md:mb-4 lg:mb-10 block">/ THE SYSTEM</motion.span>
              
              {/* HIERARCHY FIX: Using exact Home Page classes to fix "Frankenstein" sizes */}
              <motion.h1 variants={heroItem} className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-3 md:mb-4 lg:mb-10">7 Ways I Fix <br /><span className="italic text-black/20">Your Business.</span></motion.h1>
              
              {/* HIERARCHY FIX: Matches Home Page Body */}
              <motion.p variants={heroItem} className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-3 md:pl-4 lg:pl-6">
                <span className="hidden lg:inline">I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.</span>
                <span className="lg:hidden">I treat your business as one connected system, eliminating friction that burns out your people.</span>
              </motion.p>
            </div>
            <motion.div variants={heroItem} className="h-full flex items-center justify-center lg:justify-end min-h-[180px] md:min-h-[220px] lg:min-h-[500px] relative mt-2 md:mt-4 lg:mt-0">
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
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block">System Breakdown</span>
              {/* HIERARCHY FIX: Section Header is smaller than Hero (4xl/5xl/6xl) */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6">
                <span className="hidden lg:inline">The Parts in Detail</span>
                <span className="lg:hidden">The 7 Pillars</span>
              </h2>
              <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70">
                <span className="hidden lg:inline">Each component is designed to work alone, but engineered to work together.</span>
                <span className="lg:hidden">Work alone or together.</span>
              </p>
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
      
      {/* CTA BLOCK */}
      <section className="w-full bg-[#1a1a1a] text-white py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-8">
            Ready to stop guessing?
          </h2>
          <button onClick={() => onNavigate('contact')} className="bg-[#C5A059] text-[#1a1a1a] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
            [ BOOK A CALL ]
          </button>
        </div>
      </section>

      <FAQSection faqs={systemFAQs} accentColor="#C5A059" title="Questions?" subtitle="Everything you need to know before choosing a service." onNavigate={onNavigate} />
      <GlobalFooter onNavigate={onNavigate} />
    </div>
  );
};

export default SystemPage;