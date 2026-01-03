import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingDown, CheckCircle2, AlertTriangle, ChevronRight, Activity } from 'lucide-react';

const RevenueAudit: React.FC = () => {
  const [step, setStep] = useState(1);
  const [revenue, setRevenue] = useState(50000);
  const [hours, setHours] = useState(10); 
  const [bloat, setBloat] = useState(5); 
  const [painPoint, setPainPoint] = useState('');
  
  const [leakage, setLeakage] = useState(0);
  const [severity, setSeverity] = useState<'OPTIMIZED' | 'LEAKING' | 'CRITICAL'>('LEAKING');

  useEffect(() => {
    // CALCULATION LOGIC:
    const laborCost = hours * 200 * 52; // Assumed $200/hr exec value
    const techCost = bloat * 80 * 12;   // Assumed $80/mo per seat/tool
    const total = laborCost + techCost;
    
    setLeakage(total);

    if (total < 15000) setSeverity('OPTIMIZED');
    else if (total < 70000) setSeverity('LEAKING');
    else setSeverity('CRITICAL');
  }, [hours, bloat]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // STEP CONTENT RENDERER
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
             <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest">Question 01 / 04</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">Where do you feel the most friction?</h3>
             </div>
             <div className="grid gap-4">
                {[
                  { id: 'admin', label: 'Admin Overload', sub: 'Too much manual data entry.' },
                  { id: 'blind', label: 'Flying Blind', sub: 'I don\'t know my true profit.' },
                  { id: 'chaos', label: 'Tech Chaos', sub: 'My tools don\'t talk to each other.' }
                ].map((option) => (
                  <button 
                    key={option.id}
                    onClick={() => { setPainPoint(option.id); nextStep(); }}
                    className="group text-left p-6 border border-[#1a1a1a]/10 hover:border-[#C5A059] hover:bg-[#1a1a1a] transition-all duration-300"
                  >
                     <div className="flex justify-between items-center">
                        <div>
                           <div className="font-serif text-xl text-[#1a1a1a] group-hover:text-white mb-1">{option.label}</div>
                           <div className="font-sans text-sm text-[#1a1a1a]/50 group-hover:text-white/60">{option.sub}</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#1a1a1a]/20 group-hover:text-[#C5A059] transition-colors" />
                     </div>
                  </button>
                ))}
             </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-12">
             <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest">Question 02 / 04</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">What is your monthly revenue target?</h3>
             </div>
             <div>
                <div className="flex justify-between items-end mb-6">
                   <span className="font-serif text-4xl text-[#1a1a1a]">{formatCurrency(revenue)}</span>
                </div>
                <input 
                  type="range" min="10000" max="500000" step="5000" 
                  value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-1 bg-[#1a1a1a]/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1a1a] hover:[&::-webkit-slider-thumb]:bg-[#C5A059] transition-all"
                />
                <p className="mt-6 font-sans text-sm text-[#1a1a1a]/60">
                   We need this to calculate the "Opportunity Cost" of your time.
                </p>
             </div>
             <button onClick={nextStep} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest font-bold text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">
                Next Step <ChevronRight className="w-3 h-3" />
             </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-12">
             <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest">Question 03 / 04</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">How many hours do you waste on manual admin weekly?</h3>
             </div>
             <div>
                <div className="flex justify-between items-end mb-6">
                   <span className="font-serif text-4xl text-[#1a1a1a]">{hours} Hours</span>
                   <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest">
                      {hours > 15 ? "CRITICAL LOAD" : hours > 5 ? "DISTRACTED" : "EFFICIENT"}
                   </span>
                </div>
                <input 
                  type="range" min="0" max="40" step="1" 
                  value={hours} onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-1 bg-[#1a1a1a]/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1a1a] hover:[&::-webkit-slider-thumb]:bg-[#C5A059] transition-all"
                />
             </div>
             <button onClick={nextStep} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest font-bold text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">
                Next Step <ChevronRight className="w-3 h-3" />
             </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-12">
             <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest">Question 04 / 04</span>
                <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">How many software subscriptions do you pay for?</h3>
             </div>
             <div>
                <div className="flex justify-between items-end mb-6">
                   <span className="font-serif text-4xl text-[#1a1a1a]">{bloat} Apps</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="1" 
                  value={bloat} onChange={(e) => setBloat(Number(e.target.value))}
                  className="w-full h-1 bg-[#1a1a1a]/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1a1a] hover:[&::-webkit-slider-thumb]:bg-[#C5A059] transition-all"
                />
             </div>
             <button 
               onClick={nextStep} 
               className="group w-full py-5 bg-[#1a1a1a] text-[#FFF2EC] relative overflow-hidden flex items-center justify-center gap-3"
             >
                <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold relative z-10 group-hover:text-[#C5A059] transition-colors">
                   Calculate Leakage
                </span>
                <Activity className="w-4 h-4 relative z-10 group-hover:text-[#C5A059] transition-colors" />
             </button>
          </div>
        );

      case 5: // RESULT CARD
        return (
          <div className="bg-[#1a1a1a] text-[#C5A059] p-10 md:p-14 relative overflow-hidden h-full flex flex-col justify-center shadow-2xl">
              {/* Abstract BG */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C5A059] opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8 opacity-60">
                     <TrendingDown className="w-4 h-4" />
                     <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Annual Waste Detected</span>
                 </div>
                 
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tighter"
                 >
                    {formatCurrency(leakage)}
                 </motion.div>
                 
                 <div className="w-16 h-1 bg-[#C5A059] mb-8" />
                 
                 <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-8">
                    <span className="font-sans text-sm text-white/60">Efficiency Rating</span>
                    <span className={`font-mono text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${
                       severity === 'CRITICAL' ? 'bg-[#E21E3F]/20 text-[#E21E3F]' : 'bg-[#C5A059]/20 text-[#C5A059]'
                    }`}>
                       [{severity}]
                    </span>
                 </div>
                 
                 <a 
                   href="https://meetings-ap1.hubspot.com/felipe"
                   target="_blank"
                   className="group relative flex items-center justify-center gap-4 px-8 py-4 bg-[#C5A059] text-[#1a1a1a] font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors duration-300"
                 >
                    <span>[ FIX THE SYSTEM ]</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </a>
                 
                 <button 
                   onClick={() => setStep(1)}
                   className="mt-6 text-center w-full font-mono text-[9px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                 >
                    Start Over
                 </button>
              </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="audit" className="w-full bg-white py-32 px-6 md:px-12 lg:px-20 relative z-30 border-t border-[#1a1a1a]/10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           
           {/* LEFT: STATIC HEADER */}
           <div className="flex flex-col justify-center">
              <span className="font-mono text-xs text-[#1a1a1a] tracking-[0.4em] mb-6 block uppercase font-bold">
                 <span className="text-[#E21E3F]">/</span> DIAGNOSTIC_TOOL_V1
              </span>
              <h2 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-8">
                 Operational <br />
                 <span className="italic text-[#E21E3F]">Efficiency Audit.</span>
              </h2>
              <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed border-l border-[#E21E3F]/30 pl-6 max-w-lg">
                 Friction isn't just annoying; it's expensive. <br/>
                 Take this 30-second assessment to quantify exactly how much capital you are burning on manual tasks.
              </p>
           </div>

           {/* RIGHT: DYNAMIC WIZARD */}
           <div className="relative min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={step}
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -50 }}
                   transition={{ duration: 0.4, ease: "circOut" }}
                   className="w-full"
                 >
                    {renderStep()}
                 </motion.div>
              </AnimatePresence>
              
              {/* Back Button (Only for steps 2-4) */}
              {step > 1 && step < 5 && (
                 <button 
                   onClick={prevStep}
                   className="absolute top-0 right-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/30 hover:text-[#1a1a1a] transition-colors"
                 >
                    <ArrowLeft className="w-3 h-3" /> Back
                 </button>
              )}
           </div>

        </div>

      </div>
    </section>
  );
};

export default RevenueAudit;