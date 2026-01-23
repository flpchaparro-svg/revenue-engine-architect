import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

// COMPONENTS
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

// HOOKS & DATA
import { usePageTitle } from '../hooks/usePageTitle';
import { useContactForm } from '../hooks/useContactForm';
import { DIAGNOSIS_OPTIONS } from '../constants/contactData';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  usePageTitle('Contact');
  const { formState, updateField, status, handleSubmit } = useContactForm();
  
  const inputBaseStyle = "w-full bg-white/5 border border-white/10 px-4 py-4 font-sans text-xl text-white focus:outline-none focus:border-[#C5A059] focus:bg-white/10 transition-all placeholder:text-white/50 rounded-sm mt-2";

  return (
    // FIX: Main background changed to #1a1a1a so overscrolling on mobile doesn't show cream under the black form
    <div className="min-h-screen w-full flex flex-col lg:flex-row relative z-[9999] bg-[#1a1a1a]">
      
      {/* LEFT COLUMN: THE HUMAN ANCHOR */}
      <div className="w-full lg:w-5/12 h-auto lg:h-screen lg:sticky lg:top-0 bg-[#FFF2EC] text-[#1a1a1a] flex flex-col p-8 md:p-12 lg:px-20 lg:pb-20 lg:pt-24 border-r border-[#1a1a1a]/10 justify-between order-first relative z-10">
        <div className="flex-none mb-12 lg:mb-0 pt-2 lg:pt-0">
          <BackButton onClick={onBack} label="Abort Diagnosis" />
        </div>

        <div className="flex-1 flex flex-col justify-center py-8 lg:py-0">
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a] mb-6 md:mb-8 block">
            / THE PROMISE
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.0] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-8 md:mb-10">
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

        <div className="hidden lg:block flex-none opacity-40">
           <div className="w-12 h-[1px] bg-[#C5A059] mb-4" />
           <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
             // DIRECT LINE OPEN
           </p>
        </div>
      </div>

      {/* RIGHT COLUMN: THE SYSTEM FORM */}
      <div className="w-full lg:w-7/12 min-h-screen bg-[#1a1a1a] text-[#FFF2EC] p-6 md:p-12 lg:p-24 flex flex-col justify-center relative">
        
        {status !== 'success' ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-xl w-full mx-auto lg:mx-0">
            
            <div className="mb-12 border-b border-white/10 pb-8 mt-8 lg:mt-0">
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
                / DIAGNOSIS
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-6">
                The <span className="italic font-serif text-[#C5A059]">Situation.</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed max-w-xl">
                Complete the parameters below to initiate the diagnosis.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">01 // IDENTIFICATION</label>
                  <input type="text" required className={inputBaseStyle} placeholder="Full Name" value={formState.name} onChange={e => updateField('name', e.target.value)} />
                </div>
                <div className="group relative">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">02 // COORDINATES</label>
                  <input type="email" required className={inputBaseStyle} placeholder="Email Address" value={formState.email} onChange={e => updateField('email', e.target.value)} />
                </div>
              </div>

              {/* Row 2: Entity */}
              <div className="group relative">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">03 // ENTITY</label>
                <input type="text" className={inputBaseStyle} placeholder="Company / Website" value={formState.company} onChange={e => updateField('company', e.target.value)} />
              </div>

              {/* Row 3: Dropdown */}
              <div className="group relative">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">04 // THE HANDBRAKE</label>
                <div className="relative">
                  <select className={`${inputBaseStyle} appearance-none cursor-pointer pr-10`} value={formState.frictionPoint} onChange={e => updateField('frictionPoint', e.target.value)}>
                    {DIAGNOSIS_OPTIONS.map(s => <option key={s} value={s} className="bg-[#1a1a1a] text-white">{s}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none mt-1">
                     <ChevronDown className="w-5 h-5 text-[#C5A059]" />
                  </div>
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="group relative">
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">05 // CONTEXT</label>
                <textarea rows={4} className={`${inputBaseStyle} resize-none`} placeholder="Give me the details. I analyse the system, not the symptoms." value={formState.message} onChange={e => updateField('message', e.target.value)} />
              </div>

              <div className="pt-8 pb-12">
                <CTAButton theme="dark" type="submit" className={`w-full ${status === 'submitting' ? 'opacity-50 cursor-wait' : ''}`}>
                  {status === 'submitting' ? 'UPLOADING...' : '[ INITIATE DIAGNOSIS ]'}
                </CTAButton>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mt-10 md:mt-20">
             <div className="w-24 h-24 bg-[#C5A059] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#C5A059]/30">
               <Check className="w-12 h-12 text-[#1a1a1a]" />
             </div>
             <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-6">
               Brief <span className="italic font-serif text-[#C5A059]">Received.</span>
             </h2>
             <p className="font-sans text-lg md:text-xl font-light text-white/60 mb-12 leading-relaxed">
               I have received your parameters. I will analyse your architecture and respond personally within 24 hours.
             </p>
             
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
