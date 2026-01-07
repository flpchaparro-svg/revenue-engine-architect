// =============================================================================
// FAQ SECTION COMPONENT — GITHUB DESIGN
// =============================================================================
// Based on IntelligenceQA design from Pillar7 on GitHub
// Preserves existing copy and title/subtitle design
// =============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu } from 'lucide-react';
import { FAQ } from '../constants/faqData';

interface FAQSectionProps {
  faqs: FAQ[];
  accentColor?: string;
  title?: string;
  subtitle?: string;
  showBookingCTA?: boolean;
  onNavigate?: (view: string, sectionId?: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  accentColor = '#C5A059',
  title = 'Questions?',
  subtitle = 'Everything you need to know before we start.',
  showBookingCTA = true,
  onNavigate
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Safety check: ensure activeIndex is valid
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Ensure activeIndex is within bounds
  const safeActiveIndex = Math.min(activeIndex, faqs.length - 1);

  return (
    <section id="faq" className="py-24 px-6 md:px-12 lg:px-20 bg-[#FFF2EC]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* HEADER - Keep existing title/subtitle design */}
        <div className="mb-16 border-b border-black/10 pb-8 flex items-end justify-between">
          <div>
            <span 
              className="font-mono text-xs tracking-widest mb-4 block uppercase font-bold"
              style={{ color: accentColor }}
            >
              // FAQ
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a]">
              {title} <span className="italic" style={{ color: accentColor }}>Answered.</span>
            </h2>
            {subtitle && (
              <p className="text-[#1a1a1a]/60 max-w-xl mt-4">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Q&A SPLIT LAYOUT - GitHub Design */}
        <div className="w-full bg-transparent border-y border-black/10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            
            {/* LEFT: QUESTIONS LIST */}
            <div className="lg:col-span-5 border-r border-black/10 flex flex-col">
              {faqs.map((faq, index) => {
                const isActive = safeActiveIndex === index;
                return (
                  <button
                    key={faq.id}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="relative w-full px-8 py-6 text-left group overflow-hidden border-b border-black/5 last:border-b-0 flex items-center justify-between gap-4"
                  >
                    {/* GOLD WIPE BACKGROUND - Smoother Transition (1s) */}
                    <div 
                      className={`absolute inset-0 transition-transform duration-1000 origin-left ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                      style={{ backgroundColor: accentColor }}
                    />

                    {/* CONTENT */}
                    <div className="relative z-10 flex items-baseline gap-4 pr-4">
                      <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-700 ${isActive ? 'text-[#1a1a1a] font-bold' : 'group-hover:text-[#1a1a1a] group-hover:font-bold'}`}
                        style={!isActive ? { color: accentColor } : {}}
                      >
                        Q. {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-serif text-lg leading-tight transition-colors duration-700 ${isActive ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/60 group-hover:text-[#1a1a1a]'}`}>
                        {faq.question}
                      </span>
                    </div>
                    
                    {/* ACTIVE INDICATOR */}
                    <div className={`relative z-10 transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0 text-[#1a1a1a]' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#1a1a1a]'}`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* RIGHT: ANSWER TERMINAL - BLACK BG */}
            <div className="lg:col-span-7 bg-[#1a1a1a] text-[#FFF2EC] p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={safeActiveIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                  >
                    <div className="flex items-center gap-3 mb-8 opacity-60">
                      <Cpu className="w-4 h-4" style={{ color: accentColor }} />
                      <span 
                        className="font-mono text-[9px] uppercase tracking-[0.3em]"
                        style={{ color: accentColor }}
                      >
                        QUERY_RESOLVED // {faqs[safeActiveIndex].id.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#FFF2EC] mb-8">
                      {faqs[safeActiveIndex].question}
                    </h3>
                    
                    <div 
                      className="w-16 h-1 mb-8"
                      style={{ backgroundColor: accentColor }}
                    />
                    
                    <p className="font-sans text-xl font-light text-[#FFF2EC]/70 leading-relaxed border-l pl-6 whitespace-pre-line"
                      style={{ borderColor: accentColor }}
                    >
                      {faqs[safeActiveIndex].answer}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* CTA SECTION - GitHub Design */}
        {showBookingCTA && (
          <div className="border-t border-black/10 py-32 flex flex-col items-center text-center">
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-[#1a1a1a]">
              Still have <span className="italic" style={{ color: accentColor }}>questions?</span>
            </h2>
            <button
              onClick={() => onNavigate?.('contact')}
              className="group relative overflow-hidden bg-[#1a1a1a] text-[#FFF2EC] border border-[#1a1a1a] px-12 py-6 font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
            >
              <div 
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ backgroundColor: accentColor }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3">
                [ BOOK A 15-MIN CALL ]
                <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
