import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, ArrowRight, Clock, LayoutTemplate 
} from 'lucide-react';

// COMPONENTS
import EvidenceVisual_Compare from '../components/EvidenceVisual_Compare';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 
import TerminalLog from '../components/Proof/TerminalLog';
import CountUp from '../components/CountUp';

// HOOKS & DATA
import { usePageTitle } from '../hooks/usePageTitle';
import { PROBLEM_ITEMS, SOLUTION_ITEMS, EVIDENCE_METRICS } from '../constants/proofData'; 

interface ProofPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// Reusable Animation Wrapper
const Section: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => (
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

const ProofPage: React.FC<ProofPageProps> = ({ onBack, onNavigate }) => {
  usePageTitle('Results You Can Verify');
  
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
              CASE STUDY
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-8 md:mb-12 max-w-5xl">
            Results You Can <br/>
            <span className="italic font-serif text-[#C5A059]">Verify.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-8 py-2">
            I don't show testimonials. I show data. Here's what happened when I rebuilt a Sydney security company's website.
          </p>
        </Section>

        {/* THE BRIEF */}
        <Section className="mb-20 md:mb-32">
          <div className="bg-white border border-[#1a1a1a]/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-0 overflow-hidden">
            <div className="bg-[#1a1a1a] text-white px-8 py-4 flex flex-wrap justify-between items-center gap-4">
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
                    <span className="font-sans font-medium">Website Rebuild + Local SEO</span>
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
                <h3 className="font-serif text-3xl mb-6">The Brief</h3>
                <p className="font-sans text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed max-w-3xl">
                  Group 7 Security protects some of Sydney's most valuable assets, including properties worth over $3.2 billion. But their website made them look like a 1990s template, not a professional security operation. Google didn't know they were in Sydney, and their competitors were taking all the local search traffic.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* THE PROBLEM */}
        <Section className="mb-20 md:mb-32">
          <div className="mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block">
              / THE PROBLEM
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              The Old <span className="italic font-serif text-[#E21E3F]">Site.</span>
            </h2>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#E21E3F]/5 border border-[#E21E3F]/20 rounded-sm">
               <span className="font-sans text-sm md:text-base font-medium text-[#1a1a1a]/80">group7security.com</span>
               <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-[0.2em] font-bold">DECOMMISSIONED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROBLEM_ITEMS.map((item, i) => (
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

        {/* THE SOLUTION */}
        <Section className="mb-20 md:mb-32">
          <div className="mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#A07E3C] mb-6 block">
              / THE SOLUTION
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              The New <span className="italic font-serif text-[#C5A059]">Standard.</span>
            </h2>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-sm">
               <span className="font-sans text-sm md:text-base font-medium text-[#1a1a1a]/80">group7security.com.au</span>
               <span className="font-mono text-xs text-[#A07E3C] uppercase tracking-[0.2em] font-bold">LIVE SYSTEM</span>
            </div>
          </div>

          <div className="relative border-l border-[#C5A059]/20 ml-4 md:ml-8 space-y-12 pb-12">
            {SOLUTION_ITEMS.map((item, i) => (
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
                    <span className="font-mono text-xs text-[#A07E3C] uppercase tracking-[0.2em] font-bold block mb-2">THE LOGIC</span>
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
          <div className="mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#A07E3C] mb-6 block">
              / THE RESULTS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              The <span className="italic font-serif text-[#C5A059]">Evidence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EVIDENCE_METRICS.map((m, i) => (
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
        </Section>

        {/* BUILD LOG */}
        <Section className="mb-20 md:mb-32">
          <TerminalLog />
        </Section>

        {/* COMPARISON */}
        <Section className="mb-20 md:mb-32">
           <div className="mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#A07E3C] mb-6 block">
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
               <span className="font-mono text-xs font-bold text-[#A07E3C] uppercase tracking-[0.2em] block mb-2">NEW SYSTEM</span>
               <p className="font-sans text-sm text-[#1a1a1a]/50">Fast. Professional. Findable.</p>
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
                / YOUR TURN
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-8 text-white">
                Want Results Like <span className="italic font-serif text-[#C5A059]">This?</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                Group 7 went from invisible to indexed, from slow to instant. 
                <br/>If your website is holding you back, let's fix it.
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