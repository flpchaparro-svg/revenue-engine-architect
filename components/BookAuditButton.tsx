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
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => onNavigate('contact')}
          className="fixed bottom-8 right-8 z-50 bg-[#1a1a1a] text-[#FFF2EC] px-6 py-3 rounded-full shadow-2xl font-mono text-[10px] uppercase tracking-widest font-bold border border-[#C5A059]/50 hover:bg-[#C5A059] hover:text-[#1a1a1a] transition-colors duration-300 hidden md:flex items-center gap-2"
        >
          <span>[ BOOK AUDIT ]</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BookAuditButton;
