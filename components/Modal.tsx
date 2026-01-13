import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, AlertCircle } from 'lucide-react';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface ModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  // Theme colors passed from parent
  theme?: {
    bg: string;
    text: string;
    accent: string;
    dark: boolean;
  };
}

const Modal: React.FC<ModalProps> = ({ service, isOpen, onClose, theme }) => {
  if (!service) return null;

  // Default theme fallback
  const currentTheme = theme || { 
    bg: 'bg-[#FFF2EC]', 
    text: 'text-[#1a1a1a]', 
    accent: 'text-[#E21E3F]', 
    dark: false 
  };

  const accentHex = currentTheme.dark ? '#C5A059' : '#E21E3F';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* FIX: z-[9999] to sit on top of everything. cursor-pointer to indicate click-to-exit. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 pointer-events-none"
          >
            <div 
              className={`pointer-events-auto w-full max-w-5xl max-h-[90vh] rounded-sm overflow-hidden flex flex-col shadow-2xl ${currentTheme.bg}`}
            >
              
              {/* 1. TOP VISUALIZATION (Always Dark for contrast, as per screenshot) */}
              <div className="h-48 md:h-64 relative bg-[#1a1a1a] border-b border-black/10 shrink-0">
                 <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
                 
                 {/* Thick Lines (Scale 3) */}
                 <ViewportViz 
                    type={service.visualPrompt} 
                    color={accentHex} 
                    lineWidthScale={3} 
                 />
              </div>

              {/* 2. CONTENT BODY (Scrollable) */}
              <div className={`flex-1 overflow-y-auto p-8 md:p-12 ${currentTheme.text}`}>
                
                {/* "THE QUESTION" BOX */}
                <div className={`mb-10 p-6 border rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4
                    ${currentTheme.dark ? 'bg-white/5 border-white/10' : 'bg-[#E21E3F]/5 border-[#E21E3F]/10'}`}
                >
                   <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 block mb-2 text-[#E21E3F]">THE QUESTION</span>
                      <h3 className="font-serif text-xl md:text-2xl italic">
                        "{service.question || "Are you losing leads in spreadsheets?"}"
                      </h3>
                   </div>
                   <div className="px-3 py-1 bg-[#E21E3F] text-white text-[9px] font-bold tracking-widest uppercase rounded-full shrink-0">
                      PROBLEM DETECTED
                   </div>
                </div>

                {/* HEADER INFO */}
                <div className="mb-2">
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold ${currentTheme.accent}`}>
                       SERVICE OVERVIEW // {service.subtitle || 'SYSTEM MODULE'}
                    </span>
                </div>

                {/* BIG TITLE */}
                <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-4 uppercase">
                  {service.title}
                </h2>
                <span className="font-mono text-xs uppercase tracking-widest opacity-40 block mb-12">THE FACE</span>

                {/* 2-COLUMN GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                   
                   {/* LEFT: DESCRIPTION & STATS */}
                   <div className="md:col-span-7 space-y-8">
                      <p className="font-sans text-xl md:text-2xl font-light leading-relaxed opacity-90">
                        {service.description}
                      </p>
                      
                      {/* TECHNICAL STATS */}
                      <div className="flex gap-4 pt-4">
                         <div className="px-3 py-2 bg-black/5 border border-black/5 text-[10px] font-mono opacity-60 uppercase">
                            STABILITY: 99.9%
                         </div>
                         <div className="px-3 py-2 bg-black/5 border border-black/5 text-[10px] font-mono opacity-60 uppercase">
                            SCALABILITY: 100X
                         </div>
                      </div>

                      <div className="md:hidden mt-8 pt-6 border-t border-black/10">
                         <span className="font-mono text-[9px] opacity-40">UID: PILLAR1_REV_ENG_v5.0.0</span>
                      </div>
                   </div>

                   {/* RIGHT: FEATURES LIST */}
                   <div className="md:col-span-5 pt-2 md:pt-0">
                      <h4 className="font-serif text-sm font-bold tracking-widest uppercase mb-6 opacity-60">WHAT YOU GET</h4>
                      <ul className="space-y-4">
                        {(service.features || ['Smart Lead Forms', 'Inventory Connected to Sales', 'Fast, Mobile-First Design']).map((feature, i) => (
                           <li key={i} className="flex items-start gap-3 group">
                              <ArrowRight className={`w-4 h-4 mt-0.5 transition-transform group-hover:translate-x-1 ${currentTheme.accent}`} />
                              <span className="font-mono text-sm font-bold uppercase tracking-wide">{feature}</span>
                           </li>
                        ))}
                      </ul>
                   </div>

                </div>

                {/* FOOTER */}
                <div className="mt-16 pt-8 border-t border-current/10 flex flex-col md:flex-row justify-between items-center gap-6">
                   <span className="font-mono text-[10px] opacity-30 uppercase hidden md:block">
                      UID: PILLAR_SYS_{service.id.toUpperCase().slice(0,8)}
                   </span>
                   
                   <button 
                     onClick={() => window.location.href='/system'}
                     // FIX: Reverted to the "Old" Outlined/Ghost style
                     className={`w-full md:w-auto px-8 py-4 flex items-center justify-center gap-4 border transition-all duration-300 group
                        ${currentTheme.dark 
                           ? 'border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-[#1a1a1a] text-[#C5A059]' 
                           : 'border-black/10 hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a]'}
                     `}
                   >
                     <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                       [ SEE FULL DETAILS ]
                     </span>
                     <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                   </button>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
