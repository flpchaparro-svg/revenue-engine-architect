
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Database, Zap, Activity, ArrowRight, CheckCircle2, X } from 'lucide-react';
import EvidenceVisual_Compare from './EvidenceVisual_Compare';

interface EvidenceVaultPageProps {
  onBack: () => void;
}

// --- STANDARDIZED SHAKE BUTTON ---
const ShakeButton: React.FC<{ onClick?: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = "" }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: [0, -2, 2, -2, 0], transition: { duration: 0.3 } }}
    className={`px-8 py-4 border border-[#1a1a1a] bg-transparent text-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#1a1a1a] hover:text-[#FFF2EC] transition-colors flex items-center gap-3 justify-center ${className}`}
  >
    {children}
  </motion.button>
);

const EvidenceVaultPage: React.FC<EvidenceVaultPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        {/* Macro Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] grayscale bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000')] bg-cover mix-blend-multiply" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(26,26,26,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Floating Technical Label */}
        <div className="absolute top-[15%] right-[5%] font-mono text-[9px] text-black/10 uppercase tracking-[0.5em] rotate-90 origin-right fixed">
          [ EVIDENCE_VAULT // VERIFIED_LOGS_V.1 ]
        </div>
      </div>

      {/* Main Content Wrapper - Added pb-32 to prevent Footer Collision */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32 pb-32">
        
        {/* BREADCRUMB NAV */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <ShakeButton onClick={onBack} className="!px-4 !py-2 border-black/20 hover:border-black">
               <ArrowLeft className="w-4 h-4" /> 
               [ ENGINE OVERVIEW ]
            </ShakeButton>
            <span className="hidden md:inline font-mono text-[10px] text-black/20 uppercase tracking-[0.3em]">/ THE_EVIDENCE</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">LOG_FILE_STATUS: READ_ONLY</span>
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
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-center text-black/40">RESULT_AUTHENTICATED // SYSTEM_ID_0X44</span>
             </div>
          </div>
        </section>

        {/* RESULTS MATRIX */}
        <section className="mb-40">
          <div className="flex justify-between items-end mb-16 border-b border-black/10 pb-8">
            <h2 className="font-serif text-5xl italic">Case Audits.</h2>
            <span className="font-mono text-[10px] text-black/30 tracking-[0.2em] uppercase mb-2">DEPLOYMENT_LOG_ARCHIVE</span>
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
                className="bg-[#FFF2EC] p-12 flex flex-col justify-between hover:bg-white transition-colors duration-500 group min-h-[550px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <span className="font-mono text-[9px] text-black/30 tracking-widest uppercase">{audit.id}</span>
                    <audit.icon className="w-6 h-6 text-[#C5A059] opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-serif text-3xl mb-4 leading-none">{audit.title}</h3>
                  <p className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest mb-6">{audit.client}</p>
                  <div className="text-4xl font-sans font-light text-[#C5A059] mb-8">{audit.impact}</div>
                  <p className="font-sans text-sm text-black/50 leading-relaxed mb-10">{audit.desc}</p>
                </div>
                
                <div className="pt-8 border-t border-black/5">
                   <h4 className="font-mono text-[9px] uppercase tracking-widest text-black/30 mb-4">Verified_Metrics:</h4>
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
          <span className="font-mono text-[10px] text-black/30 tracking-[0.5em] uppercase mb-12 block text-center">Engineered_With_The_Best</span>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 grayscale opacity-30 py-12 border-y border-black/5">
            {partners.map(p => (
              <span key={p} className="font-mono text-xs font-bold tracking-[0.4em] uppercase">{p}</span>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION - WITH SPACING FIX */}
        <section className="py-32 flex flex-col items-center text-center mb-24">
          <h2 className="font-serif text-5xl md:text-7xl mb-12 italic max-w-4xl leading-tight">Your company is the next <span className="text-[#C5A059]">evidence log.</span></h2>
          
          <ShakeButton onClick={() => window.open("https://meetings-ap1.hubspot.com/felipe", "_blank")}>
             [ AUDIT MY SYSTEM ] <ArrowRight className="w-4 h-4" />
          </ShakeButton>
        </section>

        {/* BOTTOM NAV / FOOTER SEPARATOR */}
        <div className="py-12 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 mt-20 opacity-60">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">EVIDENCE_VERIFIED // LOGS_NOMINAL</span>
          </div>
          <motion.button 
            onClick={onBack} 
            whileHover={{ x: [0, -2, 2, -2, 0], transition: { duration: 0.3 } }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4"
          >
            Return to HQ
          </motion.button>
        </div>
      </div>

      {/* MODAL (Kept as is but logic streamlined) */}
      <div className="relative z-50">
        {/* Logic for EvidenceVisual_Compare modal would go here if needed, removed for brevity as it was inside Feature_Group7 previously */}
      </div>

    </motion.div>
  );
};

export default EvidenceVaultPage;
