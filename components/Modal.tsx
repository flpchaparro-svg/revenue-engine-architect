import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface ModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  theme?: {
    bg: string;
    text: string;
    accent: string;
    dark: boolean;
  };
}

const Modal: React.FC<ModalProps> = ({ service, isOpen, onClose, theme }) => {
  // State to ensure we only render portal on the client side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      setMounted(false);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!service || !mounted) return null;

  const currentTheme = theme || { 
    bg: 'bg-[#FFF2EC]', 
    text: 'text-[#1a1a1a]', 
    accent: 'text-[#E21E3F]', 
    dark: false 
  };

  const accentHex = currentTheme.dark ? '#C5A059' : '#E21E3F';
  
  // Define content separately to wrap in Portal
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY: Fixed to viewport, z-index 9999 to beat parallax */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] cursor-pointer"
          />
          
          {/* MODAL CONTAINER: z-index 10000 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 pointer-events-none"
          >
            <div 
              className={`pointer-events-auto w-full max-w-5xl max-h-[90vh] rounded-sm overflow-hidden flex flex-col shadow-2xl ${currentTheme.bg}`}
            >
              
              {/* 1. TOP VISUALIZATION */}
              <div className="h-48 md:h-64 relative bg-[#1a1a1a] border-b border-black/10 shrink-0">
                 <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
                 <ViewportViz 
                    type={service.visualPrompt} 
                    color={accentHex} 
                    lineWidthScale={3} 
                 />
              </div>

              {/* 2. CONTENT BODY */}
              <div className={`flex-1 overflow-y-auto p-8 md:p-12 ${currentTheme.text}`}>
                
                {/* QUESTION BOX */}
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

                <div className="mb-2">
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold ${currentTheme.accent}`}>
                       SERVICE OVERVIEW // {service.subtitle || 'SYSTEM MODULE'}
                    </span>
                </div>

                <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-4 uppercase">
                  {service.title}
                </h2>
                <span className="font-mono text-xs uppercase tracking-widest opacity-40 block mb-12">THE FACE</span>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                   <div className="md:col-span-7 space-y-8">
                      <p className="font-sans text-xl md:text-2xl font-light leading-relaxed opacity-90">
                        {service.description}
                      </p>
                      <div className="flex gap-4 pt-4">
                         <div className="px-3 py-2 bg-black/5 border border-black/5 text-[10px] font-mono opacity-60 uppercase">
                            STABILITY: 99.9%
                         </div>
                         <div className="px-3 py-2 bg-black/5 border border-black/5 text-[10px] font-mono opacity-60 uppercase">
                            SCALABILITY: 100X
                         </div>
                      </div>
                   </div>

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
                   
                   {/* BUTTON: Outlined with TOP-TO-BOTTOM Fill Animation */}
                   <button 
                     onClick={() => window.location.href='/system'}
                     className={`relative w-full md:w-auto px-8 py-4 flex items-center justify-center gap-4 border overflow-hidden transition-colors duration-300 group
                        ${currentTheme.dark 
                           ? 'border-[#C5A059]' 
                           : 'border-black/10'}
                     `}
                   >
                     {/* ANIMATED FILL: Starts at -100% (Top), Moves to 0 (Fill) */}
                     <div className={`absolute inset-0 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 ease-out
                        ${currentTheme.dark ? 'bg-[#C5A059]' : 'bg-[#1a1a1a]'}
                     `} />

                     {/* TEXT & ICON: Relative z-index to stay on top of fill */}
                     <span className={`relative z-10 font-mono text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300
                       ${currentTheme.dark 
                         ? 'text-[#C5A059] group-hover:text-black' 
                         : 'text-[#1a1a1a] group-hover:text-white'}
                     `}>
                       [ SEE FULL DETAILS ]
                     </span>
                     <ArrowRight className={`relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1
                        ${currentTheme.dark 
                          ? 'text-[#C5A059] group-hover:text-black' 
                          : 'text-[#1a1a1a] group-hover:text-white'}
                     `} />
                   </button>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // USE PORTAL to render at the end of body, bypassing all parallax z-indexes
  return createPortal(modalContent, document.body);
};

export default Modal;
