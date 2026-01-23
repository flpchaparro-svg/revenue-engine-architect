import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';

// COMPONENTS (Keep these in src/components)
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import Modal from './components/Modal';
import PageTransition from './components/PageTransition';
import { ServiceDetail } from './types';

// PAGES (Everything else moves to src/pages)
// 1. Main Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ArchitectPage = lazy(() => import('./pages/ArchitectPage')); // Moved
const ProcessPage = lazy(() => import('./pages/ProcessPage'));     // Moved
const ProofPage = lazy(() => import('./pages/ProofPage'));         // Moved
const EvidenceVaultPage = lazy(() => import('./pages/EvidenceVaultPage')); // Moved
const ContactPage = lazy(() => import('./pages/ContactPage'));     // Moved
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage')); // Moved

// 2. System & Pillars (Grouped in src/pages/System)
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

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const handleGlobalNavigate = (path: string, sectionId?: string) => {
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

  // FIX: Scroll to top on route change (handles refresh, direct navigation, and pillar clicks)
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, [location.pathname]);

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
    // BEST PRACTICE FIX: Added 'font-sans antialiased' here to kill ghost fonts globally
    <div className="bg-[#FFF2EC] font-sans antialiased selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col">
      {location.pathname !== '/contact' && (
        <GlobalHeader currentView={getCurrentView()} onNavigate={handleGlobalNavigate} scrolled={scrolled} />
      )}

      <PageTransition currentView={getCurrentView()}>
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-[#FFF2EC]">
            <div className="font-mono text-xs text-[#1a1a1a]/40">Loading...</div>
          </div>
        }>
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
      </PageTransition>

      {location.pathname !== '/system' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(id) => handleGlobalNavigate(id)} />
    </div>
  );
};

export default App;
