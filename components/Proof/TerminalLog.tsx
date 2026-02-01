import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { TERMINAL_LINES } from '../../constants/proofData';

const TerminalLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let delay = 200;
    TERMINAL_LINES.forEach((line) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      delay += 600;
    });
  }, [isInView]);

  return (
    <div ref={ref} className="w-full bg-[#111] rounded-sm overflow-hidden shadow-2xl border border-white/10 relative group">
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-[#8B6914]" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#8B6914]">BUILD LOG / WHAT I DID</span>
        </div>
      </div>
      
      <div className="p-6 font-mono text-xs md:text-sm h-[320px] overflow-y-auto custom-scrollbar bg-[#0d0d0d]">
        <div className="space-y-3">
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white/80 border-l-2 border-transparent pl-2 hover:border-[#C5A059] transition-colors"
            >
              <span className="text-[#8B6914] mr-3">$</span>
              {line}
            </motion.div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-[#C5A059] inline-block align-middle ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalLog;
