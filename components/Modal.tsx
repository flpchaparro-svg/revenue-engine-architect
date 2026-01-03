
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, ArrowRight, AlertTriangle } from 'lucide-react';
import { ServiceDetail } from '../types';
import { COLORS } from '../constants';
import ViewportViz from './ViewportViz';

interface ModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onViewPillar: (pillarId: string) => void;
}

const Modal: React.FC<ModalProps> = ({ service, isOpen, onClose, onViewPillar }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!service) return null;

  const handlePillarNavigation = () => {
    const mapping: Record<string, string> = {
      'pillar-1': 'pillar1',
      'pillar-2': 'pillar2',
      'pillar-3': 'pillar3',
      'pillar-4': 'pillar4',
      'pillar-5': 'pillar5',
      'pillar-6': 'pillar6',
      'pillar-7': 'pillar7'
    };

    const pillarId = mapping[service.id];
    if (pillarId) {
      onViewPillar(pillarId);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative w-full max-w-5xl bg-[#FFF2EC] text-[#1a1a1a] shadow-2xl rounded-sm overflow-hidden z-[101]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              {/* Header Visual */}
              <div className="h-48 bg-[#1a1a1a] relative border-b border-black/10 overflow-hidden">
                 <ViewportViz type={service.visualPrompt} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
                 <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white z-50"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 lg:p-16">
                
                {/* --- NEW DIAGNOSTIC CHECK --- */}
                {service.symptom && (
                  <div className="mb-12 p-6 border border-[#E21E3F]/20 bg-[#E21E3F]/5 flex flex-col md:flex-row items-start gap-6 rounded-sm">
                    <div className="mt-1 w-8 h-8 rounded-full border border-[#E21E3F] flex items-center justify-center shrink-0 bg-white">
                      <div className="w-3 h-3 bg-[#E21E3F] rounded-full animate-pulse" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-[0.2em] font-bold mb-2">
                        System_Diagnostic
                      </div>
                      <p className="font-serif text-xl md:text-2xl text-[#1a1a1a] italic leading-tight">
                        "{service.symptom}"
                      </p>
                    </div>
                    <div className="self-center md:self-start shrink-0">
                       <span className="px-3 py-1 bg-[#E21E3F] text-white text-[9px] font-mono uppercase tracking-widest font-bold rounded-full">
                         Problem Detected
                       </span>
                    </div>
                  </div>
                )}

                <div className="mb-12">
                  <span className="text-[#E21E3F] text-[10px] font-mono tracking-[0.4em] font-bold mb-4 block uppercase">
                    System_Blueprint_2025 // {service.systemGroup || 'CORE'}
                  </span>
                  <h2 className="text-5xl lg:text-7xl font-serif font-light leading-none mb-4">
                    {service.title}
                  </h2>
                  <p className="text-sm font-mono tracking-widest text-[#1a1a1a]/40 uppercase">{service.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-7">
                    <p className="text-xl lg:text-2xl text-[#1a1a1a] leading-relaxed mb-8 font-light italic">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono opacity-50">
                      <span className="px-2 py-1 border border-black/10">STABILITY: 99.9%</span>
                      <span className="px-2 py-1 border border-black/10">SCALABILITY: 100X</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 border-b border-black/10 pb-2">Technical Features</h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <ChevronRight className="w-4 h-4 text-[#E21E3F]" />
                          <span className="text-sm font-semibold tracking-widest uppercase">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-16 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-[10px] font-mono opacity-30 tracking-tighter">
                    UID: {service.id.toUpperCase()}_REV_ENG_v5.0.0
                  </div>
                  <button 
                    onClick={handlePillarNavigation}
                    className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
                  >
                    {/* Sliding Black Background (Slides UP on Hover) */}
                    <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                    
                    {/* Button Content (Changes Color on Hover) */}
                    <div className="relative z-10 flex items-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500">
                      <span>[ EXPLORE PILLAR PAGE ]</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
