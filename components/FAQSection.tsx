// =============================================================================
// FAQ SECTION COMPONENT — RESPONSIVE (Accordion Mobile / Split Desktop)
// =============================================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu, Plus, Minus } from 'lucide-react';
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
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  // Safety check
  if (!faqs || faqs.length === 0) return null;

  const handleToggle = (index: number) => {
    // On mobile, allow collapsing. On desktop, usually we want one active (but collapsing is fine too)
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 lg:px-20 bg-[#FFF2EC]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-black/10 pb-8 flex items-end justify-between">
          <div>
            <span className="font-mono text-xs tracking-widest mb-4 block uppercase font-bold" style={{ color: accentColor }}>
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

        {/* RESPONSIVE LAYOUT CONTAINER */}
        <div className="w-full bg-transparent border-t border-black/10 mb-16">
          <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[auto] lg:min-h-[600px]">
            
            {/* QUESTIONS LIST (Full Width on Mobile, Left Col on Desktop) */}
            <div className="lg:col-span-5 border-black/10 flex flex-col lg:border-r lg:border-b">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={faq.id} className="w-full border-b border-black/10 lg:border-black/5">
                    {/* BUTTON */}
                    <button
                      onClick={() => handleToggle(index)}
                      className="relative w-full px-4 py-6 md:px-8 text-left group overflow-hidden flex items-start md:items-center justify-between gap-4"
                    >
                      {/* Desktop Hover Effect (Gold Wipe) */}
                      <div 
                        className={`hidden lg:block absolute inset-0 transition-transform duration-1000 origin-left ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                        style={{ backgroundColor: accentColor }}
                      />

                      {/* Content */}
                      <div className="relative z-10 flex items-baseline gap-4 pr-4">
                        <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-700 shrink-0 ${isActive ? 'text-[#1a1a1a] font-bold' : 'text-[#1a1a1a]/40 lg:group-hover:text-[#1a1a1a]'}`}
                          style={!isActive && typeof window !== 'undefined' && window.innerWidth >= 1024 ? { color: accentColor } : {}}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-serif text-lg leading-tight transition-colors duration-700 ${isActive ? 'text-[#1a1a1a] font-medium' : 'text-[#1a1a1a]/80 lg:group-hover:text-[#1a1a1a]'}`}>
                          {faq.question}
                        </span>
                      </div>
                      
                      {/* Icons: Arrow for Desktop, Plus/Minus for Mobile */}
                      <div className="relative z-10 text-[#1a1a1a] shrink-0 pt-1 md:pt-0">
                         {/* Desktop Arrow */}
                         <ArrowRight className={`hidden lg:block w-4 h-4 transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                         
                         {/* Mobile/Tablet Plus/Minus */}
                         <div className="lg:hidden">
                            {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4 opacity-50" />}
                         </div>
                      </div>
                    </button>

                    {/* MOBILE ACCORDION ANSWER (Hidden on Desktop) */}
                    <div className="lg:hidden">
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden bg-[#1a1a1a]"
                          >
                             <div className="p-8 text-[#FFF2EC]">
                                <div className="flex items-center gap-3 mb-4 opacity-60">
                                  <Cpu className="w-3 h-3" style={{ color: accentColor }} />
                                  <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: accentColor }}>
                                    ANSWER // {faq.id.toUpperCase()}
                                  </span>
                                </div>
                                <p className="font-sans text-base leading-relaxed opacity-80 border-l-2 pl-4" style={{ borderColor: accentColor }}>
                                  {faq.answer}
                                </p>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP TERMINAL ANSWER (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:flex lg:col-span-7 bg-[#1a1a1a] text-[#FFF2EC] p-16 flex-col justify-center relative overflow-hidden border-b border-black/10">
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {activeIndex !== null && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                    >
                      <div className="flex items-center gap-3 mb-8 opacity-60">
                        <Cpu className="w-4 h-4" style={{ color: accentColor }} />
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: accentColor }}>
                          QUERY_RESOLVED // {faqs[activeIndex].id.toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#FFF2EC] mb-8">
                        {faqs[activeIndex].question}
                      </h3>
                      
                      <div className="w-16 h-1 mb-8" style={{ backgroundColor: accentColor }} />
                      
                      <p className="font-sans text-xl font-light text-[#FFF2EC]/70 leading-relaxed border-l pl-6 whitespace-pre-line" style={{ borderColor: accentColor }}>
                        {faqs[activeIndex].answer}
                      </p>
                    </motion.div>
                  )}
                  {activeIndex === null && (
                     <div className="flex items-center justify-center h-full opacity-30 font-mono text-xs uppercase tracking-widest">
                        [ SELECT A QUESTION ]
                     </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* CTA SECTION */}
        {showBookingCTA && (
          <div className="py-24 flex flex-col items-center text-center">
            <h2 className="font-serif text-4xl md:text-6xl mb-8 text-[#1a1a1a]">
              Still have <span className="italic" style={{ color: accentColor }}>questions?</span>
            </h2>
            <button
              onClick={() => onNavigate?.('contact')}
              className="group relative overflow-hidden bg-[#1a1a1a] text-[#FFF2EC] border border-[#1a1a1a] px-12 py-6 font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:shadow-xl"
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
