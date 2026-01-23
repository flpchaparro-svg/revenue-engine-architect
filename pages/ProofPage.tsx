import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldCheck, Activity, Database, ArrowRight, Zap, 
  MapPin, Terminal, Globe, AlertTriangle, 
  LayoutTemplate, Clock, Target 
} from 'lucide-react';
import EvidenceVisual_Compare from '../components/EvidenceVisual_Compare';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

interface ProofPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- HELPER: ANIMATED COUNTER ---
const CountUp: React.FC<{ value: number, suffix?: string, prefix?: string }> = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const incrementTime = duration / (value || 1); 
    
    const timer = setInterval(() => {
      start += 1;
      if (start > value) start = value;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// --- COMPONENT: TERMINAL LOG ---
const TerminalLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const allLines = [
    "> Auditing old site... [4.2s load, 42/100 PSI]",
    "> Migrating domain: .com → .com.au... [DONE]",
    "> Rebuilding in React + Tailwind... [DONE]",
    "> Adding Sydney location schema... [47 SIGNALS]",
    "> Compressing images: 8.2MB → 0.9MB... [SAVED 89%]",
    "> Enabling CDN distribution... [DONE]",
    "> Running final PageSpeed audit... [94/100]",
    "> Load time: 4.2s → 0.4s... [10x FASTER]",
    "> Deploying to production... [LIVE]",
    "> Status: TRANSFORMATION_COMPLETE"
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let delay = 200;
    allLines.forEach((line) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      delay += 600;
    });
  }, [isInView]);

  return (
    <div ref={ref} className="w-full bg-[#111] rounded-sm overflow-hidden shadow-2xl border border-white/10 relative group">
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-[#C5A059]" />
          {/* STANDARD LABEL */}
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C5A059]">SYSTEM LOG // EXECUTION</span>
        </div>
      </div>
      
      <div className="p-6 font-mono text-xs md:text-sm h-[320px] overflow-y-auto custom-scrollbar bg-[#0d0d0d]">
        <div className="space-y-3">
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white/80 border-l-2 border-transparent pl-2 hover:border-[#C5A059] transition-colors"
            >
              <span className="text-[#C5A059] mr-3">$</span>
              {line}
            </motion.div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-[#C5A059] inline-block align-middle ml-2"
          />
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: SECTION WRAPPER ---
const Section: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
const ProofPage: React.FC<ProofPageProps> = ({ onBack, onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-0 relative z-[150] overflow-x-hidden flex flex-col selection:bg-[#C5A059]/30"
    >
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow pb-32 relative z-10">
        
        {/* NAVIGATION */}
        <div className="flex justify-between items-center mb-12 md:mb-20 pt-24 relative z-20">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HERO SECTION */}
        <Section className="mb-20 md:mb-32 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
              THE PROOF
            </span>
          </div>
          
          {/* STANDARD H1: 5xl -> 6xl -> 7xl -> 8xl */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-8 md:mb-12 max-w-5xl">
            Real Results.<br />
            <span className="italic font-serif text-[#C5A059]">Real Businesses.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-8 py-2">
            I could tell you I'm good at this. Or I could show you what happened when I did it for someone else.
          </p>
        </Section>

        {/* THE BRIEF */}
        <Section className="mb-20 md:mb-32">
          <div className="bg-white border border-[#1a1a1a]/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-0 overflow-hidden">
            <div className="bg-[#1a1a1a] text-white px-8 py-4 flex flex-wrap justify-between items-center gap-4">
              {/* STANDARD LABEL: text-xs */}
              <span className="font-mono text-xs text-[#C5A059] uppercase tracking-[0.2em] font-bold">
                CLIENT: GROUP 7 SECURITY
              </span>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#E21E3F]" title="High Friction (Before)" />
                 <ArrowRight className="w-3 h-3 text-white/30" />
                 <div className="w-2 h-2 rounded-full bg-[#C5A059]" title="High Performance (After)" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#1a1a1a]/5">
              <div className="lg:col-span-4 bg-[#f9f9f9] p-8 border-b lg:border-b-0 lg:border-r border-[#1a1a1a]/5 space-y-8">
                <div>
                  {/* STANDARD LABEL */}
                  <span className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] block mb-2">INDUSTRY</span>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-sans font-medium">Security Services</span>
                  </div>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] block mb-2">SCOPE</span>
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-sans font-medium">Full Rebuild + Local SEO</span>
                  </div>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] block mb-2">TIMELINE</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-sans font-medium">4 Weeks</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 p-8 md:p-12">
                <h3 className="font-serif text-3xl mb-6">The Problem</h3>
                <p className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl">
                  Group 7 had a slow website on a .com domain. Google thought they were a global tech company, not a Sydney security firm. Local customers searching for security services couldn't find them.
                  <br/><br/>
                  Their old site took 4.2 seconds to load. On mobile, it was worse. Visitors bounced before seeing the services page.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* THE PROBLEM (RED) */}
        <Section className="mb-20 md:mb-32">
          <div className="mb-20">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block">
              / THE PROBLEM
            </span>
            {/* STANDARD H2 */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              What I <span className="italic font-serif text-[#E21E3F]">Did.</span>
            </h2>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E21E3F]/5 border border-[#E21E3F]/20 rounded-sm">
               <span className="font-sans text-sm md:text-base font-medium text-[#1a1a1a]/80">group7security.com</span>
               <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-[0.2em] font-bold">DECOMMISSIONED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                icon: Activity, 
                title: "Speed Was Killing Conversions", 
                metric: "4.2 seconds", 
                label: "Load Time", 
                desc: "Google says anything over 3 seconds loses 53% of mobile visitors. They were haemorrhaging leads.",
                impact: "Lost contracts."
              },
              { 
                icon: Globe, 
                title: "No Local Visibility", 
                metric: "Near Zero", 
                label: "Sydney Ranking", 
                desc: "The .com domain had no location signals. Google thought they were in Texas, not Parramatta.",
                impact: "Invisible market."
              },
              { 
                icon: AlertTriangle, 
                title: "Amateur Perception", 
                metric: "Template", 
                label: "Trust Score", 
                desc: "For a company protecting $3.2B in assets, the site looked like a side hustle. Trust destroyed instantly.",
                impact: "Failed due diligence."
              },
              { 
                icon: Database, 
                title: "No Lead Capture", 
                metric: "0%", 
                label: "Attribution", 
                desc: "Enquiries went to a generic inbox. No tracking. No automation. No data on what worked.",
                impact: "Marketing blindness."
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 bg-white border border-[#E21E3F]/10 hover:border-[#E21E3F] hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E21E3F] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#E21E3F]/5 rounded-sm">
                    <item.icon className="w-6 h-6 text-[#E21E3F]" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#E21E3F]/60 uppercase tracking-[0.2em] border border-[#E21E3F]/20 px-2 py-1 rounded-sm">
                    CRITICAL ERROR
                  </span>
                </div>
                <div className="mb-6">
                  <div className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] mb-1">{item.label}</div>
                  <div className="text-4xl font-serif text-[#E21E3F] mb-4">{item.metric}</div>
                  <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#E21E3F]/10 flex items-center gap-2">
                  <span className="text-[#E21E3F] text-xs font-bold uppercase tracking-wide">Impact:</span>
                  <span className="text-sm font-medium text-[#1a1a1a]">{item.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* THE SOLUTION (GOLD) */}
        <Section className="mb-20 md:mb-32">
          <div className="mb-20">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
              / THE SOLUTION
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              The <span className="italic font-serif text-[#C5A059]">Results.</span>
            </h2>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-sm">
               <span className="font-sans text-sm md:text-base font-medium text-[#1a1a1a]/80">group7security.com.au</span>
               <span className="font-mono text-xs text-[#C5A059] uppercase tracking-[0.2em] font-bold">LIVE SYSTEM</span>
            </div>
          </div>

          <div className="relative border-l border-[#C5A059]/20 ml-4 md:ml-8 space-y-12 pb-12">
            {[
              {
                title: "Domain Migration",
                what: "Moved to .com.au with 301 redirects.",
                why: "Instant geographic signal for Google. Essential for local ranking.",
                icon: MapPin
              },
              {
                title: "Performance Architecture",
                what: "React + Tailwind. No WordPress bloat.",
                why: "Page weight dropped 89%. Load time hit 0.4s. Instant interactions.",
                icon: Zap
              },
              {
                title: "Local SEO Schema",
                what: "47 specific location signals injected.",
                why: "Google now explicitly knows this is a 'Sydney' security company.",
                icon: Globe
              },
              {
                title: "Lead Intelligence",
                what: "Smart forms with source tracking.",
                why: "100% attribution. We know exactly which page generates the money.",
                icon: Target
              }
            ].map((item, i) => (
              <div key={i} className="relative pl-8 md:pl-16 group">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#C5A059] z-10 group-hover:scale-125 transition-transform duration-300" />
                <div className="bg-white p-8 border border-black/5 hover:border-[#C5A059]/50 shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
                    <div className="w-12 h-12 bg-[#C5A059]/10 flex items-center justify-center rounded-sm">
                      <item.icon className="w-6 h-6 text-[#C5A059]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl text-[#1a1a1a]">{item.title}</h4>
                      <p className="font-sans text-base text-[#1a1a1a]/60 mt-1">{item.what}</p>
                    </div>
                  </div>
                  <div className="bg-[#f9f9f9] p-5 border-l-2 border-[#C5A059]">
                    <span className="font-mono text-xs text-[#C5A059] uppercase tracking-[0.2em] font-bold block mb-2">THE LOGIC</span>
                    <p className="font-sans text-base md:text-lg text-[#1a1a1a]/80 leading-relaxed">
                      {item.why}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* THE EVIDENCE */}
        <Section className="mb-20 md:mb-32">
          <div className="mb-20">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
              / THE RESULTS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              The <span className="italic font-serif text-[#C5A059]">Evidence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "PageSpeed Score", val: 94, suffix: "/100", icon: Activity, note: "Top Tier Performance", color: "text-green-600" },
              { label: "Load Time", val: 0.4, suffix: "s", prefix: "", icon: Zap, note: "10x Faster", color: "text-[#C5A059]" },
              { label: "Lead Attribution", val: 100, suffix: "%", icon: Database, note: "Total Visibility", color: "text-[#C5A059]" },
              { label: "Sydney Visibility", val: 1, suffix: "st", prefix: "Pg ", icon: MapPin, note: "Indexed & Ranking", color: "text-[#C5A059]" },
              { label: "Core Web Vitals", val: 100, suffix: "%", icon: ShieldCheck, note: "All Passed (Green)", color: "text-green-600" },
              { label: "Page Weight", val: 89, suffix: "%", prefix: "↓ ", icon: ArrowRight, note: "Reduction in Size", color: "text-[#C5A059]" },
            ].map((m, i) => (
              <div key={i} className="bg-white p-8 border border-[#1a1a1a]/5 hover:border-[#C5A059] transition-all duration-300 group shadow-sm flex flex-col justify-between min-h-[280px] h-auto">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-zinc-50 rounded-full group-hover:bg-[#C5A059]/10 transition-colors">
                    <m.icon className="w-5 h-5 text-[#1a1a1a] group-hover:text-[#C5A059] transition-colors" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#1a1a1a]/20 group-hover:-rotate-45 transition-transform duration-300" />
                </div>
                <div className="mt-auto">
                  <div className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] mb-3">{m.label}</div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl md:text-6xl font-serif text-[#1a1a1a] tracking-tighter">
                      <CountUp value={m.val} prefix={m.prefix || ""} />
                    </span>
                    <span className={`text-xl font-serif ${m.color === 'text-green-600' ? 'text-green-600' : 'text-[#C5A059]'}`}>{m.suffix}</span>
                  </div>
                  <div className="flex items-center gap-2 border-t border-[#1a1a1a]/5 pt-4 mt-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${m.color === 'text-green-600' ? 'bg-green-500' : 'bg-[#C5A059]'}`} />
                    <span className="font-sans text-sm text-[#1a1a1a]/60">{m.note}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-white p-8 border-l-4 border-[#C5A059] rounded-sm">
            <p className="font-serif text-xl md:text-2xl text-[#1a1a1a] mb-4 italic">
              "The old site was embarrassing. Now when someone Googles security in Sydney, we show up. And when they click, the site actually loads."
            </p>
            <CTAButton theme="light" onClick={() => window.open('https://group7security.com.au', '_blank')}>
              [ VIEW LIVE SITE ]
            </CTAButton>
          </div>
        </Section>

        {/* CASE STUDY 02: TRADE BUSINESS CRM */}
        <Section className="mb-20 md:mb-32">
          <div className="bg-white border border-[#1a1a1a]/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-0 overflow-hidden rounded-sm">
            <div className="bg-[#1a1a1a] text-white px-8 py-4">
              <span className="font-mono text-xs text-[#C5A059] uppercase tracking-[0.2em] font-bold">
                CASE STUDY 02: SYDNEY ELECTRICAL CONTRACTOR
              </span>
            </div>
            
            <div className="p-8 md:p-12 space-y-8">
              <div>
                <span className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] block mb-2">INDUSTRY</span>
                <p className="font-sans font-medium">Trades</p>
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] block mb-2">PROJECT TYPE</span>
                <p className="font-sans font-medium">CRM + Automation</p>
              </div>
              
              <div>
                <h3 className="font-serif text-3xl mb-6">The Problem</h3>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                  Leads came in by phone, email, and website form. The owner wrote them on paper, sometimes entered them in a spreadsheet, sometimes forgot. Jobs were quoted but never followed up. Money walked out the door every week.
                  <br/><br/>
                  The team had tried HubSpot before but gave up after a month. Too complicated, nobody used it.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-3xl mb-6">What I Did</h3>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-4">
                  I set up a simple CRM with three stages: New Lead, Quoted, Won/Lost. Every lead source feeds into the same pipeline. Website forms, missed calls, even texts.
                </p>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-4">
                  I built automation that sends the quote and follows up at day 2, day 5, and day 10 if no response. The owner stopped chasing manually.
                </p>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                  Then I trained the team with 5-minute videos. No day-long workshops. Just "here's how you log a lead" and "here's how you update a quote."
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-3xl mb-6">The Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#f9f9f9] p-6 rounded-sm">
                    <div className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] mb-2">Before</div>
                    <div className="font-serif text-3xl text-[#1a1a1a] mb-2">Maybe 40%</div>
                    <div className="font-sans text-sm text-[#1a1a1a]/70">Leads Tracked</div>
                  </div>
                  <div className="bg-[#f9f9f9] p-6 rounded-sm">
                    <div className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] mb-2">After</div>
                    <div className="font-serif text-3xl text-[#C5A059] mb-2">100%</div>
                    <div className="font-sans text-sm text-[#1a1a1a]/70">Leads Tracked</div>
                  </div>
                  <div className="bg-[#f9f9f9] p-6 rounded-sm">
                    <div className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] mb-2">Close Rate</div>
                    <div className="font-serif text-3xl text-[#C5A059] mb-2">34%</div>
                    <div className="font-sans text-sm text-[#1a1a1a]/70">Now measurable</div>
                  </div>
                </div>
                <div className="mt-8 bg-white p-6 border-l-4 border-[#C5A059] rounded-sm">
                  <p className="font-serif text-xl text-[#1a1a1a] italic">
                    "I used to lose sleep wondering how many leads we forgot about. Now I know exactly where every job is. And the follow-up emails go out whether I remember or not."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* CASE STUDY 03: CONSULTANT CONTENT SYSTEM */}
        <Section className="mb-20 md:mb-32">
          <div className="bg-white border border-[#1a1a1a]/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-0 overflow-hidden rounded-sm">
            <div className="bg-[#1a1a1a] text-white px-8 py-4">
              <span className="font-mono text-xs text-[#C5A059] uppercase tracking-[0.2em] font-bold">
                CASE STUDY 03: BUSINESS COACH
              </span>
            </div>
            
            <div className="p-8 md:p-12 space-y-8">
              <div>
                <span className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] block mb-2">INDUSTRY</span>
                <p className="font-sans font-medium">Professional Services</p>
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] block mb-2">PROJECT TYPE</span>
                <p className="font-sans font-medium">Content System</p>
              </div>
              
              <div>
                <h3 className="font-serif text-3xl mb-6">The Problem</h3>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                  She knew she should be posting on LinkedIn. Every marketing person told her so. But between client calls, course creation, and actually running the business, content fell off the list every single week.
                  <br/><br/>
                  She'd post three times in a burst of motivation, then nothing for two months. No consistency meant no growth.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-3xl mb-6">What I Did</h3>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-4">
                  I set up a monthly recording session. One hour, she talks about what she knows. I ask questions, she answers. No scripts.
                </p>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-4">
                  From that one hour, I produce:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-sans text-lg text-[#1a1a1a]/70">
                  <li>4 blog posts</li>
                  <li>12 LinkedIn posts</li>
                  <li>4 newsletter editions</li>
                  <li>Short video clips for Instagram</li>
                </ul>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mt-4">
                  Everything scheduled, everything posted automatically. She reviews once, approves, and forgets about it.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-3xl mb-6">The Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#f9f9f9] p-6 rounded-sm">
                    <div className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] mb-2">Before</div>
                    <div className="font-serif text-3xl text-[#1a1a1a] mb-2">2-3</div>
                    <div className="font-sans text-sm text-[#1a1a1a]/70">Posts per month (inconsistent)</div>
                  </div>
                  <div className="bg-[#f9f9f9] p-6 rounded-sm">
                    <div className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] mb-2">After</div>
                    <div className="font-serif text-3xl text-[#C5A059] mb-2">16</div>
                    <div className="font-sans text-sm text-[#1a1a1a]/70">Posts per month (scheduled)</div>
                  </div>
                  <div className="bg-[#f9f9f9] p-6 rounded-sm">
                    <div className="font-mono text-xs font-bold text-[#1a1a1a]/60 uppercase tracking-[0.2em] mb-2">LinkedIn</div>
                    <div className="font-serif text-3xl text-[#C5A059] mb-2">3,200</div>
                    <div className="font-sans text-sm text-[#1a1a1a]/70">Followers (in 8 months)</div>
                  </div>
                </div>
                <div className="mt-8 bg-white p-6 border-l-4 border-[#C5A059] rounded-sm">
                  <p className="font-serif text-xl text-[#1a1a1a] italic">
                    "I actually enjoy the recording sessions now. It's like having a conversation about what I love. And then content just appears everywhere without me doing anything else."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* MORE RESULTS */}
        <Section className="mb-20 md:mb-32">
          <div className="mb-20">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
              / MORE RESULTS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              Summary <span className="italic font-serif text-[#C5A059]">Cards.</span>
            </h2>
          </div>
          
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-6 tracking-tighter">Website Speed Improvements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: 'Retail E-commerce', before: '6.1s load', after: '0.8s load' },
                  { type: 'Professional Services', before: '3.8s load', after: '0.5s load' },
                  { type: 'Trades Business', before: '5.2s load', after: '0.6s load' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 border border-[#1a1a1a]/5 rounded-sm">
                    <div className="font-sans font-medium text-[#1a1a1a] mb-4">{item.type}</div>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-mono text-xs text-[#E21E3F] mb-1">Before</div>
                        <div className="font-serif text-2xl text-[#1a1a1a]">{item.before}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#1a1a1a]/30" />
                      <div>
                        <div className="font-mono text-xs text-[#C5A059] mb-1">After</div>
                        <div className="font-serif text-2xl text-[#C5A059]">{item.after}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-6 tracking-tighter">Automation Hours Saved</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: 'Wholesale Distributor', task: 'Order processing', hours: '12 hours' },
                  { type: 'Recruitment Agency', task: 'Candidate follow-up', hours: '8 hours' },
                  { type: 'Property Manager', task: 'Tenant communications', hours: '6 hours' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 border border-[#1a1a1a]/5 rounded-sm">
                    <div className="font-sans font-medium text-[#1a1a1a] mb-2">{item.type}</div>
                    <div className="font-sans text-sm text-[#1a1a1a]/60 mb-3">{item.task}</div>
                    <div className="font-serif text-3xl text-[#C5A059]">{item.hours}</div>
                    <div className="font-mono text-xs text-[#1a1a1a]/60 mt-1">Saved Weekly</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-6 tracking-tighter">CRM Adoption</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: 'Sales Team (5 people)', before: '20% usage', after: '95% usage' },
                  { type: 'Service Business', before: 'Spreadsheets', after: 'Full pipeline visibility' },
                  { type: 'Franchise (8 locations)', before: '8 different systems', after: '1 unified CRM' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 border border-[#1a1a1a]/5 rounded-sm">
                    <div className="font-sans font-medium text-[#1a1a1a] mb-4">{item.type}</div>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-mono text-xs text-[#E21E3F] mb-1">Before</div>
                        <div className="font-serif text-lg text-[#1a1a1a]">{item.before}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#1a1a1a]/30" />
                      <div>
                        <div className="font-mono text-xs text-[#C5A059] mb-1">After 90 Days</div>
                        <div className="font-serif text-lg text-[#C5A059]">{item.after}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* BUILD LOG */}
        <Section className="mb-20 md:mb-32">
          <TerminalLog />
        </Section>

        {/* COMPARISON */}
        <Section className="mb-20 md:mb-32">
           <div className="mb-20">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
              / VISUAL EVIDENCE
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              Before & <span className="italic font-serif text-[#C5A059]">After.</span>
            </h2>
          </div>
          
          <div className="bg-white p-4 border border-[#1a1a1a]/10 shadow-2xl rounded-sm">
             <EvidenceVisual_Compare 
               beforeLabel="LEGACY SITE" 
               afterLabel="NEW STANDARD"
               beforeImage="/images/group7-before.webp" 
               afterImage="/images/group7-after.webp"
             />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 text-center">
            <div className="border-t border-red-500/20 pt-4">
              <span className="font-mono text-xs font-bold text-[#E21E3F] uppercase tracking-[0.2em] block mb-2">LEGACY</span>
              <p className="font-sans text-sm text-[#1a1a1a]/50">Slow. Generic. Invisible.</p>
            </div>
            <div className="border-t border-[#C5A059]/20 pt-4">
               <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] block mb-2">NEW SYSTEM</span>
               <p className="font-sans text-sm text-[#1a1a1a]/50">Instant. Custom. Dominant.</p>
            </div>
          </div>
        </Section>

        {/* BOTTOM CTA */}
        <Section className="mb-16">
          <div className="bg-[#1a1a1a] text-white p-12 md:p-24 text-center relative overflow-hidden rounded-sm group cursor-default">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] mb-6 block">
                / TRANSFORMATION COMPLETE
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-8 text-white">
                Want Results Like <span className="italic font-serif text-[#C5A059]">This?</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                Every business is different, but the process is the same. Let's talk about what's possible for yours.
              </p>
              
              <CTAButton 
                theme="dark" 
                onClick={() => onNavigate('contact')}
              >
                [ BOOK A CALL ]
              </CTAButton>
            </div>
          </div>
        </Section>

      </div>
    </motion.div>
  );
};

export default ProofPage;