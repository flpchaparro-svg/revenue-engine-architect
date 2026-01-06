// =============================================================================
// FAQ SECTION COMPONENT
// =============================================================================
// Reusable FAQ accordion component with SEO schema markup.
// Import into any pillar page and pass the appropriate FAQ data.
// =============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ, generateFAQSchema } from '../constants/faqData';

interface FAQSectionProps {
  pillarFAQs: FAQ[];
  systemFAQs: FAQ[];
  universalFAQs: FAQ[];
  accentColor?: string; // e.g., '#C5A059', '#E21E3F'
  title?: string;
  subtitle?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  pillarFAQs,
  systemFAQs,
  universalFAQs,
  accentColor = '#C5A059',
  title = 'Questions?',
  subtitle = 'Everything you need to know before we start building.'
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  // Combine all FAQs in order: Pillar-specific first, then System, then Universal
  const allFAQs = [...pillarFAQs, ...systemFAQs, ...universalFAQs];

  // Inject FAQPage schema for SEO
  useEffect(() => {
    const existingSchema = document.querySelector('script[data-faq-schema]');
    if (existingSchema) {
      existingSchema.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq-schema', 'true');
    script.textContent = JSON.stringify(generateFAQSchema(allFAQs));
    document.head.appendChild(script);

    return () => {
      const schema = document.querySelector('script[data-faq-schema]');
      if (schema) schema.remove();
    };
  }, [allFAQs]);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-t border-black/5">
      <div className="max-w-[900px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5" style={{ color: accentColor }} />
            <span 
              className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
              style={{ color: accentColor }}
            >
              FAQ
            </span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            {title} <span className="italic" style={{ color: accentColor }}>Answered.</span>
          </h2>
          
          <p className="text-[#1a1a1a]/60 max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-3">
          {allFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              id={`faq-${faq.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-black/10 bg-white overflow-hidden"
            >
              {/* QUESTION BUTTON */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-[#FAFAFA] transition-colors group"
                aria-expanded={openId === faq.id}
                aria-controls={`answer-${faq.id}`}
              >
                <span className="font-sans text-base md:text-lg font-medium pr-4 group-hover:translate-x-1 transition-transform">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown 
                    className="w-5 h-5 text-[#1a1a1a]/40" 
                  />
                </motion.div>
              </button>

              {/* ANSWER */}
              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    id={`answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-6 border-t border-black/5">
                      <div 
                        className="pt-4 text-[#1a1a1a]/70 leading-relaxed whitespace-pre-line"
                        style={{ 
                          fontSize: '0.95rem',
                          lineHeight: '1.7'
                        }}
                      >
                        {faq.answer}
                      </div>
                      
                      {/* ACCENT BAR */}
                      <div 
                        className="w-12 h-1 mt-6 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-12 pt-8 border-t border-black/10 text-center">
          <p className="text-[#1a1a1a]/50 text-sm mb-4">
            Still have questions?
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-70 transition-opacity"
            style={{ color: accentColor }}
          >
            [ BOOK A 15-MIN CALL ]
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

