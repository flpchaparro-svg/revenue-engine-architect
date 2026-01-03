
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronDown } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    frictionPoint: 'Digital Revenue // I need more leads & sales',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  const systems = [
    'Digital Revenue // I need more leads & sales',
    'Capture Core // My leads aren\'t converting',
    'Auto-Fulfillment // Delivery is too manual',
    'AI Agents // I want to automate admin work',
    'Media Logistics // Content production is too slow',
    'Internal Adoption // My team won\'t use the tools',
    'Control Tower // I don\'t trust my data',
    'Unsure // I need a full system audit'
  ];

  // UX FIX: Common Input Styles for better visibility
  const inputBaseStyle = "w-full bg-white/5 border border-white/10 px-4 py-4 font-serif text-xl text-white focus:outline-none focus:border-[#C5A059] focus:bg-white/10 transition-all placeholder:text-white/30 rounded-sm mt-2";

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row relative z-[9999] bg-[#FFF2EC]">
      
      {/* LEFT COLUMN: THE HUMAN ANCHOR (CREAM) */}
      <div className="lg:w-5/12 h-auto lg:h-screen sticky top-0 bg-[#FFF2EC] text-[#1a1a1a] flex flex-col p-8 md:p-12 lg:p-20 border-r border-[#1a1a1a]/10 justify-between order-first">
        
        {/* Nav - Keep this, it replaces the Global Header */}
        <div className="flex-none mb-12 lg:mb-0 pt-8 lg:pt-0">
          <button 
            onClick={onBack} 
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 hover:text-[#E21E3F] transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
            [ ABORT_DIAGNOSIS ]
          </button>
        </div>

        {/* The Promise */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.0] mb-8">
            This is not a <br />
            <span className="italic text-[#C5A059]">Sales Call.</span>
          </h1>
          
          <div className="space-y-6 max-w-md">
            <p className="font-sans text-lg font-light leading-relaxed">
              I don't employ salespeople. When you submit this brief, you are starting a conversation directly with me.
            </p>
            <p className="font-sans text-base font-light opacity-60 leading-relaxed">
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-xl">
            
            <div className="mb-12 border-b border-white/10 pb-8">
               <h2 className="font-serif text-3xl text-white mb-3">The Situation.</h2>
               <p className="font-sans text-white/60">Complete the parameters below to initiate the diagnosis.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
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

              {/* Gold Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group w-full relative h-20 bg-[#C5A059] text-[#1a1a1a] overflow-hidden flex items-center justify-center mt-8 disabled:opacity-50 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transition-shadow duration-500"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                <span className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-4 transition-colors">
                  {isSubmitting ? 'UPLOADING...' : '[ INITIATE DIAGNOSIS ]'}
                </span>
              </button>
              
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mt-20">
             <div className="w-24 h-24 bg-[#C5A059] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#C5A059]/30">
               <Check className="w-12 h-12 text-[#1a1a1a]" />
             </div>
             <h2 className="font-serif text-5xl text-white mb-6">Brief Received.</h2>
             <p className="font-sans text-xl font-light text-white/60 mb-12 leading-relaxed">
               I have received your parameters. I will analyse your architecture and respond personally within 24 hours.
             </p>
             <button onClick={onBack} className="font-mono text-xs uppercase tracking-[0.2em] border-b border-white/30 pb-1 text-white hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">
               Return to Homepage
             </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
