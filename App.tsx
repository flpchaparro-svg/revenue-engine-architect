import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';

// COMPONENTS
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import Modal from './components/Modal';
import { ServiceDetail } from './types';

// PAGES
const HomePage = lazy(() => import('./pages/HomePage'));
const ArchitectPage = lazy(() => import('./pages/ArchitectPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const ProofPage = lazy(() => import('./pages/ProofPage'));
const EvidenceVaultPage = lazy(() => import('./pages/EvidenceVaultPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));

// SYSTEM & PILLARS
const SystemPage = lazy(() => import('./pages/System/SystemPage'));
const Pillar1 = lazy(() => import('./pages/System/Pillar1'));
const Pillar2 = lazy(() => import('./pages/System/Pillar2'));
const Pillar3 = lazy(() => import('./pages/System/Pillar3'));
const Pillar4 = lazy(() => import('./pages/System/Pillar4'));
const Pillar5 = lazy(() => import('./pages/System/Pillar5'));
const Pillar6 = lazy(() => import('./pages/System/Pillar6'));
const Pillar7 = lazy(() => import('./pages/System/Pillar7'));

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // PRELOADER STATE
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Handle Initial Load Delay
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => setInitialLoadComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Unlock scroll when preloader completes
  useEffect(() => {
    if (initialLoadComplete) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [initialLoadComplete]);

  // Reset scroll on route change
  useEffect(() => {
    requestAnimationFrame(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, [location.pathname]);

  const handleGlobalNavigate = (path: string) => {
    const routeMap: Record<string, string> = {
      'homepage': '/',
      'architect': '/architect',
      'system': '/system',
      'process': '/process',
      'proof': '/proof',
      'evidence-vault': '/evidence-vault',
      'contact': '/contact',
      'privacy': '/privacy',
      'pillar1': '/pillar1',
      'pillar2': '/pillar2',
      'pillar3': '/pillar3',
      'pillar4': '/pillar4',
      'pillar5': '/pillar5',
      'pillar6': '/pillar6',
      'pillar7': '/pillar7',
    };
    const route = routeMap[path] || '/';
    navigate(route);
  };


  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/') return 'homepage';
    return path.slice(1) as any;
  };

  const handleServiceClick = (service: ServiceDetail) => {
    if (window.innerWidth >= 1024) {
      setSelectedService(service);
      setIsModalOpen(true);
    } else {
      handleGlobalNavigate(service.id);
    }
  };

  return (
    <div className="bg-[#FFF2EC] font-sans antialiased selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col relative">
      
      {/* --- THE DARK ROOM PRELOADER --- */}
      <AnimatePresence mode="wait">
        {!initialLoadComplete && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }} // Leaves to TOP
            transition={{ 
              duration: 1.0, 
              ease: [0.76, 0, 0.24, 1] // Custom Bezier for smooth "Curtain Lift"
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1a1a] gap-8"
          >
            {/* CENTER ANIMATION */}
            <div className="flex items-center gap-4">
              <motion.span 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-4xl md:text-5xl font-light text-[#FFF2EC]"
              >
                [
              </motion.span>

              {/* The Gold Pulse */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 md:w-4 md:h-4 bg-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.6)] rounded-sm"
              />

              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-4xl md:text-5xl font-light text-[#FFF2EC]"
              >
                ]
              </motion.span>
            </div>

            {/* REPLACED LOGO WITH CAPTION */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-mono text-[10px] md:text-xs font-bold text-[#C5A059] uppercase tracking-[0.3em] text-center"
            >
              SYSTEMS & GROWTH
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN APP --- */}
      {location.pathname !== '/contact' && (
        <GlobalHeader currentView={getCurrentView()} onNavigate={handleGlobalNavigate} scrolled={scrolled} />
      )}

      <div className="relative min-h-screen w-full">
        <Suspense fallback={<div className="h-screen w-full bg-[#FFF2EC]" />}>
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<HomePage onNavigate={handleGlobalNavigate} onServiceClick={handleServiceClick} />} />
              <Route path="/architect" element={<ArchitectPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/system" element={<SystemPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/process" element={<ProcessPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/proof" element={<ProofPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/evidence-vault" element={<EvidenceVaultPage onBack={() => handleGlobalNavigate('proof')} />} />
              <Route path="/contact" element={<ContactPage onBack={() => handleGlobalNavigate('homepage')} />} />
              <Route path="/privacy" element={<PrivacyPolicyPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
              
              {/* Pillars */}
              <Route path="/pillar1" element={<Pillar1 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/pillar2" element={<Pillar2 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/pillar3" element={<Pillar3 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/pillar4" element={<Pillar4 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/pillar5" element={<Pillar5 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/pillar6" element={<Pillar6 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />} />
              <Route path="/pillar7" element={<Pillar7 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>

      {location.pathname !== '/system' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(id) => handleGlobalNavigate(id)} />
    </div>
  );
};

export default App;

