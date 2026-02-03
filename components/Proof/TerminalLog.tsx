import React, { useState, useEffect, useRef } from 'react';
import { m, useInView } from 'framer-motion';
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
    <div ref={ref} className="w-full rounded-sm overflow-hidden shadow-2xl border border-white/10 relative group" style={{ backgroundColor: 'var(--terminal-bg)' }}>
      <div className="bg-dark px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-gold-on-dark" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold-on-dark">BUILD LOG / WHAT I DID</span>
        </div>
      </div>
      
      <div className="p-6 font-mono text-xs md:text-sm h-[320px] overflow-y-auto custom-scrollbar" style={{ backgroundColor: 'var(--terminal-inner)' }}>
        <div className="space-y-3">
          {lines.map((line, i) => (
            <m.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white/80 border-l-2 border-transparent pl-2 hover:border-gold transition-colors"
            >
              <span className="text-gold-on-dark mr-3">$</span>
              {line}
            </m.div>
          ))}
          <m.div 
            animate={{ opacity: [0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-gold inline-block align-middle ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalLog;
