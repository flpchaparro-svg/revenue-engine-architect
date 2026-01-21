import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Database, Zap, Activity, CheckCircle2, X, Terminal } from 'lucide-react';
import EvidenceVisual_Compare from '../components/EvidenceVisual_Compare';
import CTAButton from '../components/CTAButton'; // STANDARDIZED
import BackButton from '../components/BackButton'; // STANDARDIZED

interface EvidenceVaultPageProps {
  onBack: () => void;
}

// --- TERMINAL LOG COMPONENT ---
const TerminalLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  const allLines = [
    "> Added Sydney location tags for Google... [DONE]",
    "> Removed slow code... [SAVED 2.1MB]",
    "> Load time: 4.2s → 0.4s [10x FASTER]"
  ];

  useEffect(() => {
    let delay = 200;
    allLines.forEach((line) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      delay += 800; 
    });
  }, []);

  return (
    <div className="w-full bg-[#1a1a1a] p-8 border-t border-black/10 font-mono text-sm overflow-hidden">
      <div className="flex items-center gap-2 text-white/20 mb-4 border-b border-white/10 pb-2">
        <Terminal className="w-4 h-4 text-[#C5A059]" />
        <span className="text-[#C5A059] uppercase tracking-[0.2em] font-bold">Build Log // What I Did</span>
      </div>
      <div className="space-y-3">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/80"
          >
            <span className="text-[#0F766E] mr-3">➜</span>
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
  );
};

const EvidenceVaultPage: React.FC<EvidenceVaultPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const caseAudits = [
    {
      id: 'AUDIT_01',
      title: 'Local Velocity Deployment',
      client: 'Multi-State Trade Enterprise',
      impact: '100% Lead Capture',
      desc: 'A high-volume trades business was missing 40% of inbound demand due to human bandwidth caps. We deployed the "Capture Core" protocol with SMS automation, achieving total demand retention in 7 days.',
      icon: Zap,
      metrics: ['Decay Rate: 0%', 'Response Time: <30s', 'Growth: +22% MoM']
    },
    {
      id: 'AUDIT_02',
      title: 'Cognitive Layer Implementation',
      client: 'National Law Firm',
      impact: '-15 hrs/wk Admin',
      desc: 'Replacing manual data triage with a secure AI-Agentic bridge. The system reads, classifies, and routes legal inquiries into the CRM with 99.4% accuracy, freeing the executive team for high-value litigation.',
      icon: Database,
      metrics: ['Accuracy: 99.4%', 'Logic Gates: 42', 'ROI: 14x']
    },
    {
      id: 'AUDIT_03',
      title: 'Control Tower Switch-On',
      client: 'SaaS Series B',
      impact: 'Real-Time ROI Visibility',
      desc: 'Moving an executive team from gut-feeling spreadsheets to a unified Intelligence Dashboard. We aggregated 5 marketing channels and the finance stack into a single source of truth for forecasting.',
      icon: Activity,
      metrics: ['Silos Merged: 5', 'Forecast Bias: <2%', 'Latency: Real-time']
    }
  ];

  const partners = ['OpenAI', 'Make', 'HubSpot', 'Stripe', 'AWS', 'Next.js'];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] overflow-x-hidden content-layer"
    >
      {/* FORENSIC ARCHIVE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden h-full">
        <div className="absolute inset-0 opacity-[0.03] grayscale bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000')] bg-cover mix-blend-multiply" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(26,26,26,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[15%] right-[5%] font-mono text-[9px] text-black/10 uppercase tracking-[0.5em] rotate-90 origin-right fixed">
          [ EVIDENCE VAULT / VERIFIED LOGS V.1 ]
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-0 pb-32">
        
        {/* NAVIGATION - STANDARDIZED */}
        <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
          <BackButton onClick={onBack} label="Return to Overview" />
          
          <div className="hidden md:flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">LOG FILE STATUS: READ ONLY</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Verification_Repository</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              The Forensic <br />
              <span className="italic text-[#C5A059]">Archive</span> <br />
              of Results.
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8">
              We don’t sell promises. We sell verified architectural outcomes. This is the evidence of systems that scale without headcount.
            </p>
          </motion.div>
        </section>

        {/* PHILOSOPHY BLOCK */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-y border-black/5 py-24">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 italic">Truth is found in the logs.</h2>
            <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed max-w-2xl">
              <p>Testimonials are subjective. Clients are nice. But architecture is objective. It either performs or it fails. We don't rely on "reviews"—we present Case Audits where the code and the data prove the ROI.</p>
              <p className="font-serif text-2xl text-[#1a1a1a] italic border-b border-[#C5A059]/30 pb-4 inline-block">
                "Subjectivity is for artists. Precision is for architects."
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
             <div className="w-full aspect-square max-w-[400px] border border-black/5 bg-white p-12 flex flex-col justify-center items-center relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>
                <ShieldCheck className="w-24 h-24 text-[#C5A059] mb-8 stroke-[0.5]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-center text-black/40">RESULT AUTHENTICATED / SYSTEM ID 0X44</span>
             </div>
          </div>
        </section>

        {/* RESULTS MATRIX */}
        <section className="mb-40">
          <div className="flex justify-between items-end mb-16 border-b border-black/10 pb-8">
            <h2 className="font-serif text-5xl italic">Case Audits.</h2>
            <span className="font-mono text-[10px] text-black/30 tracking-[0.2em] uppercase mb-2">DEPLOYMENT LOG ARCHIVE</span>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-black/5 border border-black/5"
          >
            {caseAudits.map((audit) => (
              <motion.div 
                key={audit.id}
                variants={itemVariants as any}
                onClick={() => setIsModalOpen(true)}
                className="bg-[#FFF2EC] p-12 flex flex-col justify-between hover:bg-[#1a1a1a] hover:text-[#FFF2EC] transition-colors duration-500 group min-h-[550px] cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <span className="font-mono text-[9px] text-black/30 tracking-widest uppercase">{audit.id}</span>
                    <audit.icon className="w-6 h-6 text-[#C5A059] opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-serif text-3xl mb-4 leading-none">{audit.title}</h3>
                  <p className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest mb-6">{audit.client}</p>
                  <div className="text-4xl font-sans font-light text-[#C5A059] mb-8">{audit.impact}</div>
                  <p className="font-sans text-sm text-black/50 leading-relaxed mb-10 group-hover:text-white/60 transition-colors">{audit.desc}</p>
                </div>
                
                <div className="pt-8 border-t border-black/5 group-hover:border-white/10 transition-colors">
                   <h4 className="font-mono text-[9px] uppercase tracking-widest text-black/30 group-hover:text-white/30 mb-4">Verified Metrics:</h4>
                   <ul className="space-y-2">
                     {audit.metrics.map((m, i) => (
                       <li key={i} className="flex items-center gap-3">
                         <div className="w-1 h-1 bg-[#C5A059] rounded-full" />
                         <span className="font-sans text-[11px] font-bold uppercase tracking-tight">{m}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* VERIFIED PARTNERS */}
        <section className="mb-32">
          <span className="font-mono text-[10px] text-black/30 tracking-[0.5em] uppercase mb-12 block text-center">Engineered With The Best</span>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 grayscale opacity-30 py-12 border-y border-black/5">
            {partners.map(p => (
              <span key={p} className="font-mono text-xs font-bold tracking-[0.4em] uppercase">{p}</span>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION - STANDARDIZED */}
        <section className="py-32 flex flex-col items-center text-center mb-24">
          <h2 className="font-serif text-5xl md:text-7xl mb-12 italic max-w-4xl leading-tight">Your company is the next <span className="text-[#C5A059]">evidence log.</span></h2>
          
          <CTAButton theme="light" onClick={() => window.open("https://meetings-ap1.hubspot.com/felipe", "_blank")}>
             [ AUDIT MY SYSTEM ]
          </CTAButton>
        </section>

        {/* BOTTOM FOOTER SEPARATOR */}
        <div className="py-12 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 mt-20 opacity-60">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">EVIDENCE VERIFIED / LOGS NOMINAL</span>
          </div>
        </div>
      </div>

      {/* --- THE EVIDENCE MODAL (Restored) --- */}
      {isModalOpen && createPortal(
        <AnimatePresence mode="wait">
          <div key="modal" className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-8">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#FFF2EC] overflow-hidden shadow-2xl rounded-sm max-h-[90vh] flex flex-col z-10"
            >
               
               {/* MODAL HEADER */}
               <div className="flex justify-between items-center p-6 border-b border-black/10 bg-white shrink-0">
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] leading-tight tracking-tight">
                       Case Study: Group 7 Security
                    </h3>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50 mt-1">
                       [ WEBSITE + SEO OVERHAUL ]
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-[#1a1a1a]" />
                  </button>
               </div>

               <div className="flex-grow overflow-y-auto p-0">
                  <EvidenceVisual_Compare 
                    beforeLabel="BEFORE: Old .com Site"
                    afterLabel="AFTER: New .com.au Site"
                  />
                  
                  <TerminalLog />

                  {/* MODAL GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 bg-white border-t border-black/10">
                      <div>
                        <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-3">
                           The Problem
                        </h4>
                        <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed">
                          They had a slow <strong>.com</strong> website with no local SEO. Google thought they were a global tech company, not a Sydney security firm. Local customers couldn't find them.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-3">
                           What I Did
                        </h4>
                        <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed">
                          I migrated them to <strong>.com.au</strong> and rebuilt the site from scratch — fast, mobile-first, with proper Sydney location tags so Google knows exactly where they operate.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-mono text-xs font-bold text-[#C5A059] mb-3 uppercase tracking-[0.2em]">
                           The Result
                        </h4>
                        <p className="font-sans text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed">
                          Page load dropped from <strong>4.2s to 0.4s</strong>. Local search rankings improved. The site now converts visitors instead of losing them.
                        </p>
                      </div>
                  </div>
               </div>

            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}

    </motion.div>
  );
};

export default EvidenceVaultPage;