import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import Modal from './components/Modal';
import PageTransition from './components/PageTransition';
import { ServiceDetail } from './types';
import { useScroll, useMotionValueEvent } from 'framer-motion';

// 1. LAZY LOAD HEAVY PAGES
const HomePage = lazy(() => import('./pages/HomePage'));
const ArchitectPage = lazy(() => import('./components/ArchitectPage'));
const SystemPage = lazy(() => import('./components/SystemPage'));
const ProcessPage = lazy(() => import('./components/ProcessPage'));
const ProofPage = lazy(() => import('./components/ProofPage'));
const EvidenceVaultPage = lazy(() => import('./components/EvidenceVaultPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const Pillar1 = lazy(() => import('./components/Pillar1'));
const Pillar2 = lazy(() => import('./components/Pillar2'));
const Pillar3 = lazy(() => import('./components/Pillar3'));
const Pillar4 = lazy(() => import('./components/Pillar4'));
const Pillar5 = lazy(() => import('./components/Pillar5'));
const Pillar6 = lazy(() => import('./components/Pillar6'));
const Pillar7 = lazy(() => import('./components/Pillar7'));

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Helper to keep your existing navigation logic compatible
  const handleGlobalNavigate = (path: string, sectionId?: string) => {
    const routeMap: Record<string, string> = {
      'homepage': '/',
      'architect': '/architect',
      'system': '/system',
      'process': '/process',
      'proof': '/proof',
      'evidence-vault': '/evidence-vault',
      'contact': '/contact',
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
    window.scrollTo(0, 0);
  };

  // Convert pathname to currentView for GlobalHeader compatibility
  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/') return 'homepage';
    return path.slice(1) as any;
  };

  const handleServiceClick = (service: ServiceDetail) => {
    // Desktop: Open Modal, Mobile/Tablet: Navigate directly
    if (window.innerWidth >= 1024) {
      setSelectedService(service);
      setIsModalOpen(true);
    } else {
      handleGlobalNavigate(service.id);
    }
  };

  return (
    <div className="bg-[#FFF2EC] selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col">
      {/* Hide header on specific routes if needed */}
      {location.pathname !== '/contact' && (
        <GlobalHeader currentView={getCurrentView()} onNavigate={handleGlobalNavigate} scrolled={scrolled} />
      )}

      <PageTransition currentView={getCurrentView()}>
        {/* 2. USE SUSPENSE FOR LOADING STATES */}
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-[#FFF2EC]">
            <div className="font-mono text-xs text-[#1a1a1a]/40">Loading...</div>
          </div>
        }>
          {/* 3. ANIMATE PRESENCE FOR PAGE TRANSITIONS */}
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HomePage onNavigate={handleGlobalNavigate} onServiceClick={handleServiceClick} />
                </motion.div>
              } />
              <Route path="/architect" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ArchitectPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/system" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SystemPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/process" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProcessPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/proof" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProofPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/evidence-vault" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EvidenceVaultPage onBack={() => handleGlobalNavigate('proof')} />
                </motion.div>
              } />
              <Route path="/contact" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ContactPage onBack={() => handleGlobalNavigate('homepage')} />
                </motion.div>
              } />
              {/* PILLARS */}
              <Route path="/pillar1" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Pillar1 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/pillar2" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Pillar2 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/pillar3" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Pillar3 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/pillar4" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Pillar4 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/pillar5" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Pillar5 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/pillar6" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Pillar6 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
              <Route path="/pillar7" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Pillar7 onBack={() => handleGlobalNavigate('system')} onNavigate={handleGlobalNavigate} />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </PageTransition>

      {/* FOOTER & MODAL */}
      {location.pathname !== '/system' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
      <Modal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onViewPillar={(id) => handleGlobalNavigate(id)} 
      />
    </div>
  );
};

export default App;
