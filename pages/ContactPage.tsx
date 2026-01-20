import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import CTAButton from '../components/CTAButton'; // STANDARDIZED BUTTON
import BackButton from '../components/BackButton'; // STANDARDIZED NAV

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    frictionPoint: 'Digital Revenue / I need more leads & sales',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  // Helper to trigger form submit from CTAButton
  const handleBtnClick = () => {
    if (formRef.current) {
        // Create a synthetic event or just call submit handler
        handleSubmit(); 
    }
  };

  const systems = [
    'Digital Revenue / I need more leads & sales',
    'Capture Core / My leads aren\'t converting',
    'Auto-Fulfillment / Delivery is too manual',
    'AI Agents / I want to automate admin work',
    'Media Logistics / Content production is too slow',
    'Internal Adoption / My team won\'t use the tools',
    'Control Tower / I don\'t trust my data',
    'Unsure / I need a full system audit'
  ];

  // Common Input Styles
  const inputBaseStyle = "w-full bg-white/5 border border-white/10 px-4 py-4 font-sans text-xl text-white focus:outline-none focus:border-[#C5A059] focus:bg-white/10 transition-all placeholder:text-white/30 rounded-sm mt-2";

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row relative z-[9999] bg-[#FFF2EC]">
      
      {/* LEFT COLUMN: THE HUMAN ANCHOR (CREAM) */}
      <div className="lg:w-5/12 h-auto lg:h-screen sticky top-0 bg-[#FFF2EC] text-[#1a1a1a] flex flex-col p-8 md:p-12 lg:px-20 lg:pb-20 lg:pt-24 border-r border-[#1a1a1a]/10 justify-between order-first">
        
        {/* STANDARDIZED NAV */}
        <div className="flex-none mb-12 lg:mb-0 pt-8 lg:pt-0">
          <BackButton onClick={onBack} label="Abort Diagnosis" />
        </div>

        {/* The Promise */}
        <div className="flex-1 flex flex-col justify-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a] mb-8 block">
            / THE PROMISE
          </span>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.0] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-10">
            This is not a <br />
            <span className="italic font-serif text-[#C5A059]">Sales Call.</span>
          </h1>
          
          <div className="space-y-6 max-w-lg">
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]">
              I don't employ salespeople. When you submit this brief, you are starting a conversation directly with me.
            </p>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/60">
              I will personally review your setup, identify the leakage, and determine if my systems can close the gap.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="hidden lg:block flex-none opacity-40">
           <div className="w-12 h-[1px] bg-[#C5A059] mb-4" />
           <p className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]">
             // DIRECT_LINE [ OPEN ]
           </p>
        </div>
      </div>

      {/* RIGHT COLUMN: THE SYSTEM FORM (BLACK) */}
      <div className="lg:w-7/12 min-h-screen bg-[#1a1a1a] text-[#FFF2EC] p-8 md:p-12 lg:p-24 flex flex-col justify-center relative">
        
        {!isSent ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-xl w-full">
            
            <div className="mb-12 border-b border-white/10 pb-8">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
                / DIAGNOSIS
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-6">
                The <span className="italic font-serif text-[#C5A059]">Situation.</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed max-w-xl">
                Complete the parameters below to initiate the diagnosis.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                    01 // Identification
                  </label>
                  <input 
                    type="text" 
                    required
                    className={inputBaseStyle}
                    placeholder="Full Name"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="group relative">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                    02 // Coordinates
                  </label>
                  <input 
                    type="email" 
                    required
                    className={inputBaseStyle}
                    placeholder="Email Address"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Row 2: Entity */}
              <div className="group relative">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  03 // Entity
                </label>
                <input 
                  type="text" 
                  className={inputBaseStyle}
                  placeholder="Company / Website"
                  value={formState.company}
                  onChange={e => setFormState({...formState, company: e.target.value})}
                />
              </div>

              {/* Row 3: Dropdown */}
              <div className="group relative">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  04 // The Handbrake
                </label>
                <div className="relative">
                  <select 
                    className={`${inputBaseStyle} appearance-none cursor-pointer pr-10`}
                    value={formState.frictionPoint}
                    onChange={e => setFormState({...formState, frictionPoint: e.target.value})}
                  >
                    {systems.map(s => <option key={s} value={s} className="bg-[#1a1a1a] text-white">{s}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none mt-1">
                     <ChevronDown className="w-5 h-5 text-[#C5A059]" />
                  </div>
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="group relative">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                   05 // Context
                </label>
                <textarea 
                  rows={4}
                  className={`${inputBaseStyle} resize-none`}
                  placeholder="Give me the details. I analyse the system, not the symptoms."
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                />
              </div>

              {/* STANDARDIZED BUTTON (Dark Theme) */}
              <div className="pt-8">
                <CTAButton 
                  theme="dark"
                  onClick={handleBtnClick}
                  className={`w-full ${isSubmitting ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {isSubmitting ? 'UPLOADING...' : '[ INITIATE DIAGNOSIS ]'}
                </CTAButton>
              </div>
              
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mt-20">
             <div className="w-24 h-24 bg-[#C5A059] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#C5A059]/30">
               <Check className="w-12 h-12 text-[#1a1a1a]" />
             </div>
             <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-6">
               Brief <span className="italic font-serif text-[#C5A059]">Received.</span>
             </h2>
             <p className="font-sans text-xl font-light text-white/60 mb-12 leading-relaxed">
               I have received your parameters. I will analyse your architecture and respond personally within 24 hours.
             </p>
             
             {/* STANDARDIZED RETURN BUTTON */}
             <div className="w-fit">
                <CTAButton theme="dark" onClick={onBack}>
                   RETURN TO HQ
                </CTAButton>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
