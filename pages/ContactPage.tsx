import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Clock, Mail, MapPin } from 'lucide-react';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
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

  const handleBtnClick = () => {
    if (formRef.current) {
        handleSubmit(); 
    }
  };

  const inputBaseStyle = "w-full bg-white/5 border border-white/10 px-4 py-4 font-sans text-xl text-white focus:outline-none focus:border-[#C5A059] focus:bg-white/10 transition-all placeholder:text-white/50 rounded-sm mt-2";

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row relative z-[9999] bg-[#1a1a1a]">
      
      {/* LEFT COLUMN: THE HUMAN ANCHOR (CREAM) */}
      <div className="w-full lg:w-5/12 h-auto lg:h-screen lg:sticky lg:top-0 bg-[#FFF2EC] text-[#1a1a1a] flex flex-col p-8 md:p-12 lg:px-20 lg:pb-20 lg:pt-24 border-r border-[#1a1a1a]/10 justify-between order-first relative z-10">
        
        {/* NAV */}
        <div className="flex-none mb-12 lg:mb-0 pt-2 lg:pt-0">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* The Promise */}
        <div className="flex-1 flex flex-col justify-center py-8 lg:py-0">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a] mb-6 md:mb-8 block">
            / LET'S TALK
          </span>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.0] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-8 md:mb-10">
            Start Here.<br />
            <span className="italic font-serif text-[#C5A059]">No Pitch. Just Answers.</span>
          </h1>
          
          <div className="space-y-6 max-w-lg">
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]">
              Book a 15-minute call. I'll ask about your business, you'll ask about how I work, and we'll figure out if there's a fit.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="hidden lg:block flex-none opacity-40">
           <div className="w-12 h-[1px] bg-[#C5A059] mb-4" />
           <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
             // DIRECT LINE OPEN
           </p>
        </div>
      </div>

      {/* RIGHT COLUMN: THE SYSTEM FORM (BLACK) */}
      <div className="w-full lg:w-7/12 min-h-screen bg-[#1a1a1a] text-[#FFF2EC] p-6 md:p-12 lg:p-24 flex flex-col justify-center relative">
        
        {!isSent ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-xl w-full mx-auto lg:mx-0">
            
            <div className="mb-12 border-b border-white/10 pb-8 mt-8 lg:mt-0">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
                / BOOKING
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-4">
                Pick a <span className="italic font-serif text-[#C5A059]">Time.</span>
              </h2>
              <p className="font-sans text-base text-white/60 leading-relaxed mb-2">
                All times shown in your local timezone
              </p>
              <p className="font-sans text-base text-white/60 leading-relaxed">
                Duration: 15 minutes
              </p>
            </div>

            {/* WHAT TO EXPECT */}
            <div className="mb-12 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] block">
                / WHAT HAPPENS NEXT
              </span>
              {[
                { number: '01', title: 'You Book', body: "Pick a time that works. You'll get a calendar invite with a video link." },
                { number: '02', title: 'We Talk', body: "15 minutes. I'll ask what's broken, you'll ask how I can help. No slides, no sales script." },
                { number: '03', title: 'You Decide', body: "If there's a fit, I'll send a proposal. If not, no hard feelings. Either way, you'll leave with clarity." }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-[#C5A059] flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-[#C5A059]">{step.number}</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-white mb-2 tracking-tighter">{step.title}</h4>
                    <p className="font-sans text-base text-white/60 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ALTERNATIVE CONTACT */}
            <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-sm">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] block mb-4">
                / PREFER EMAIL?
              </span>
              <p className="font-sans text-base text-white/60 leading-relaxed mb-4">
                If calls aren't your thing, send me an email. I respond within 24 hours.
              </p>
              <a href="mailto:felipe@revenuearchitect.com" className="font-sans text-lg text-[#C5A059] hover:underline flex items-center gap-2">
                <Mail className="w-5 h-5" />
                felipe@revenuearchitect.com
              </a>
            </div>

            {/* FAQ */}
            <div className="mb-12 space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] block">
                / FAQ
              </span>
              {[
                {
                  q: "What should I prepare for the call?",
                  a: "Nothing fancy. Just be ready to explain what's frustrating you right now. What's eating your time? What's costing you money? What have you tried that didn't work?"
                },
                {
                  q: "Is this a sales call?",
                  a: "No. I don't have a script or a pitch deck. I genuinely want to understand your situation. If I can help, I'll say so. If I can't, I'll tell you that too."
                },
                {
                  q: "What if I'm not ready to start a project?",
                  a: "That's fine. We can talk about what you're dealing with, and I'll tell you honestly whether it's worth fixing now or later."
                },
                {
                  q: "Do you work with businesses outside Australia?",
                  a: "Yes. Most of my work is remote anyway. If we're in similar time zones, it works fine."
                },
                {
                  q: "How soon can you start?",
                  a: "Depends on my current workload. I'll tell you on the call. Usually I can start a Diagnose phase within 1 to 2 weeks."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-4">
                  <h4 className="font-serif text-lg text-white mb-2 tracking-tighter">{faq.q}</h4>
                  <p className="font-sans text-sm text-white/60 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* FOOTER DETAILS */}
            <div className="flex flex-wrap gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response Time: &lt; 24 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Sydney, Australia</span>
              </div>
              <div>
                <span>Timezone: AEST / AEDT</span>
              </div>
            </div>
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
