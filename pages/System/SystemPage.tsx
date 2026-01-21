import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Minus, Globe, Database, Zap, Bot, Video, Users, BarChart3, Plus, Terminal } from 'lucide-react';
import GlobalFooter from '../../components/GlobalFooter';
import HeroVisual_Suspension from '../../components/HeroVisual_Suspension';
import FAQSection from '../../components/FAQSection';
import { getSystemPageFAQs } from '../../constants/faqData';
import { SystemArchitecture } from '../../components/SystemArchitecture';
import CTAButton from '../../components/CTAButton'; 
import BackButton from '../../components/BackButton'; 

// --- DATA (UNCHANGED) ---
const ALL_PILLARS = [
  {
    id: 'pillar1', number: '01', icon: Globe, title: 'THE FACE', 
    subtitle: 'Websites & E-commerce', subtitleMobile: 'Websites',
    categoryHex: '#E21E3F', categoryLabel: 'GET CLIENTS', technicalLabel: 'DIGITAL_STOREFRONT',
    body: 'Your online storefront that captures leads, sells products, and feeds data to every other pillar',
    bodyMobile: 'Online storefront that captures and converts',
    description: 'Your online storefront. Not a digital brochure, but a system designed to capture leads and process transactions with zero friction.',
    systemPurpose: 'Capture demand and structure data.',
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
    systemPurpose: 'Capture demand and structure data.',
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
    systemPurpose: 'Capture demand and structure data.',
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
    systemPurpose: 'Multiply output without multiplying hours.',
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
    systemPurpose: 'Multiply output without multiplying hours.',
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
    systemPurpose: 'Multiply output without multiplying hours.',
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
    systemPurpose: 'Navigate with clarity.',
    subServices: [
       { title: 'How it connects', description: 'The Eyes take data from every other pillar and show you where to steer next. It\'s the feedback loop.' },
       { title: 'How it helps the whole system', description: 'It tells you if Acquisition is profitable, if Velocity is efficient, and what needs fixing.' },
       { title: 'What you get', description: 'Certainty. You sleep better knowing exactly where your profit is coming from.' }
    ]
  }
];

// --- GRID ITEM COMPONENT (Updated for Color Grouping + Mobile) ---
const GridItem = ({ pillar, isSelected, onToggle, onNavigate }: any) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isPillar7 = pillar.id === 'pillar7';

  // --- GRID SPAN LOGIC ---
  let spanClasses = "";
  if (isSelected) {
      spanClasses = "col-span-1 md:col-span-2 lg:col-span-3"; 
  } else if (isPillar7) {
      spanClasses = "col-span-1 md:col-span-2 lg:col-span-3"; 
  } else {
      spanClasses = "col-span-1"; 
  }

  // --- SUBCONSCIOUS GROUPING LOGIC ---
  const accentColor = pillar.categoryHex;
  
  // FIX: Pillar 7 has black (#1a1a1a) as its accent. When expanded (dark bg), it becomes invisible.
  const displayAccent = (isSelected && isPillar7) ? '#FFFFFF' : accentColor;
  
  // Dynamic Styles
  const bgClass = isSelected ? "bg-[#1a1a1a]" : "bg-white hover:bg-[#FFF2EC]";
  
  const borderStyle = {
      borderColor: isSelected 
          ? accentColor 
          : 'rgba(26, 26, 26, 0.1)',
  };

  // Scroll to top of card when expanded (better UX on mobile)
  const handleToggle = () => {
    onToggle();
    // Small delay to let the layout change happen, then scroll
    if (!isSelected) {
      setTimeout(() => {
        if (itemRef.current) {
          itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <motion.div
      layout
      ref={itemRef}
      onClick={handleToggle}
      className={`relative ${spanClasses} ${bgClass} border transition-all duration-300 overflow-hidden group cursor-pointer`}
      style={{ 
          minHeight: isSelected ? 'auto' : (isPillar7 ? '200px' : '280px'),
          ...borderStyle
      }}
      onMouseEnter={(e) => {
          if(!isSelected) e.currentTarget.style.borderColor = accentColor;
      }}
      onMouseLeave={(e) => {
          if(!isSelected) e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.1)';
      }}
    >
      {/* Background Texture for Expanded State (Tinted with Category Color) */}
      {isSelected && (
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
              style={{ backgroundImage: `radial-gradient(circle, ${displayAccent} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
         />
      )}

      {/* --- CLOSED STATE (Technical Card - Mobile Optimized) --- */}
      {!isSelected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between">
           
           {/* Top: Tech Label & Number */}
           <div className="flex justify-between items-start">
              {/* The Label Border matches the group color */}
              <span 
                className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] py-1 px-2 border bg-white/50 font-bold backdrop-blur-sm"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                 {pillar.technicalLabel.replace(/_/g, ' ')}
              </span>
              <span className="font-serif text-3xl md:text-4xl text-[#1a1a1a]/10 font-bold absolute top-3 md:top-4 right-4 md:right-6 group-hover:text-[#1a1a1a]/20 transition-colors">
                 {pillar.number}
              </span>
           </div>

           {/* Middle: Content */}
           <div className="relative z-10 mt-3 md:mt-4">
              <pillar.icon 
                className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-6 opacity-100 group-hover:scale-110 transition-all duration-300" 
                style={{ color: accentColor }}
              />
              
              <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-1 md:mb-2 leading-none tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                 {pillar.title}
              </h3>
              <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-2 md:mb-4" style={{ color: `${accentColor}80` }}>
                 {/* Show shorter subtitle on mobile */}
                 <span className="md:hidden">{pillar.subtitleMobile || pillar.subtitle}</span>
                 <span className="hidden md:inline">{pillar.subtitle}</span>
              </p>
              
              {/* Show body text on mobile for all cards (shorter version) */}
              <p className="font-sans text-xs md:text-sm text-[#1a1a1a]/70 leading-relaxed line-clamp-2 md:line-clamp-none">
                 <span className="md:hidden">{pillar.bodyMobile || pillar.body}</span>
                 <span className="hidden md:inline">{isPillar7 ? pillar.body : ''}</span>
              </p>
           </div>

           {/* Bottom: Action */}
           <div className="flex justify-between items-center border-t border-[#1a1a1a]/10 pt-3 md:pt-4 mt-auto">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 transition-colors font-bold group-hover:text-black">
                 NODE {pillar.number}
              </span>
              <div 
                className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: `${accentColor}10` }}
              >
                 <Plus 
                    className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-90 transition-all duration-300" 
                    style={{ color: accentColor }}
                 />
              </div>
           </div>
        </motion.div>
      )}

      {/* --- EXPANDED STATE (Blueprint Mode - Dark + Mobile Optimized) --- */}
      <AnimatePresence>
        {isSelected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }} exit={{ opacity: 0 }} className="relative w-full p-5 md:p-10 lg:p-16 flex flex-col">
            
            {/* Close Button - Always visible at top */}
            <button 
               onClick={(e) => { e.stopPropagation(); handleToggle(); }}
               className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white transition-all z-20"
            >
               <Minus className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Header Area */}
            <div className="flex flex-col justify-between items-start border-b border-white/10 pb-6 md:pb-8 mb-6 md:mb-10 pr-12">
               <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                     <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: displayAccent }}>
                        {pillar.number} // {pillar.categoryLabel}
                     </span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight">
                     {pillar.title}
                  </h2>
                  <p className="font-sans text-base md:text-lg lg:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
                     {pillar.description}
                  </p>
               </div>
               
               {/* Icon Watermark - Hidden on mobile, visible on desktop */}
               <pillar.icon 
                  className="hidden lg:block w-20 h-20 lg:w-24 lg:h-24 absolute top-16 right-16 opacity-30" 
                  style={{ color: displayAccent }}
               />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-6 md:mb-12">
               {/* Col 1 & 2: Sub-services */}
               <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                  {pillar.subServices.map((sub: any, i: number) => (
                     <div key={i} className="space-y-2 md:space-y-3">
                        <h4 
                            className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border-l-2 pl-3"
                            style={{ color: displayAccent, borderColor: displayAccent }}
                        >
                           {sub.title}
                        </h4>
                        <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed pl-3.5">
                           {sub.description}
                        </p>
                     </div>
                  ))}
               </div>

               {/* Col 3: System Purpose & CTA */}
               <div className="bg-white/5 p-5 md:p-6 border border-white/10 flex flex-col justify-between rounded-sm">
                  <div>
                     <span className="font-mono text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] block mb-2">CORE FUNCTION</span>
                     <p className="font-serif text-lg md:text-xl italic text-white mb-6 md:mb-8">"{pillar.systemPurpose}"</p>
                  </div>
                  
                  <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
                     <button 
                        onClick={() => onNavigate(pillar.id)}
                        className="w-full py-3 md:py-4 bg-white text-[#1a1a1a] font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                     >
                        EXPLORE PILLAR <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                     </button>
                  </div>
               </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
const SystemPage: React.FC<any> = ({ onBack, onNavigate }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const systemFAQs = getSystemPageFAQs();

  // Scroll Logic
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
              <motion.h1 variants={heroItem} className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
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

      {/* SECTION 1: SCROLLYTELLING */}
      <section className="relative z-0 mb-32 border-t border-[#1a1a1a]/10">
         <SystemArchitecture />
      </section>

      {/* SECTION 2: THE BLUEPRINT GRID (Revised) */}
      <section className="w-full bg-[#FFF2EC] pb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="text-center max-w-2xl mx-auto mb-20 pt-10">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block flex items-center justify-center gap-2">
                 <Terminal className="w-4 h-4" /> / SYSTEM MANIFEST
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6">
                The Parts in <span className="italic font-serif text-[#C5A059]">Detail.</span>
              </h2>
              <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl mx-auto">
                Select a component to inspect its architecture.
              </p>
          </div>

          {/* THE GRID CONTAINER */}
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