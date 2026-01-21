import React, { useState } from 'react';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';

interface BookAuditButtonProps {
  onNavigate: (v: string) => void;
}

const BookAuditButton: React.FC<BookAuditButtonProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling 800px (approx height of hero)
    const shouldShow = latest > 800;
    if (visible !== shouldShow) setVisible(shouldShow);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50 hidden md:block"
        >
          <button
            onClick={() => onNavigate('contact')}
            className="group relative px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 border border-[#C5A059] bg-[#C5A059] text-[#1a1a1a] shadow-2xl flex items-center gap-3"
          >
            {/* LAYER 1: Initial Background (Slides UP and OUT) */}
            <div className="absolute inset-0 bg-[#C5A059] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
            
            {/* LAYER 2: Hover Background (Slides UP and IN) */}
            <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
            
            {/* CONTENT */}
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-[#1a1a1a]">
              [ BOOK AUDIT ]
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookAuditButton;
