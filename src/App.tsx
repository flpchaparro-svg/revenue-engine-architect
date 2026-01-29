import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// PERFORMANCE: LazyMotion strips ~100KB from initial load
import { AnimatePresence, useScroll, useMotionValueEvent, LazyMotion, domAnimation } from 'framer-motion';

// COMPONENTS
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import Modal from '../components/Modal';
import { ServiceDetail } from '../types';

// PAGES
const HomePage = lazy(() => import('../pages/HomePage'));
const ArchitectPage = lazy(() => import('../pages/ArchitectPage'));
const ProcessPage = lazy(() => import('../pages/ProcessPage'));
const ProofPage = lazy(() => import('../pages/ProofPage'));
const EvidenceVaultPage = lazy(() => import('../pages/EvidenceVaultPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// SYSTEM & PILLARS
const SystemPage = lazy(() => import('../pages/System/SystemPage'));
const Pillar1 = lazy(() => import('../pages/System/Pillar1'));
const Pillar2 = lazy(() => import('../pages/System/Pillar2'));
const Pillar3 = lazy(() => import('../pages/System/Pillar3'));
const Pillar4 = lazy(() => import('../pages/System/Pillar4'));
const Pillar5 = lazy(() => import('../pages/System/Pillar5'));
const Pillar6 = lazy(() => import('../pages/System/Pillar6'));
const Pillar7 = lazy(() => import('../pages/System/Pillar7'));

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

  // Reset scroll on route change
  useEffect(() => {
    requestAnimationFrame(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, [location.pathname]);

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
    
    if (path === 'homepage' && sectionId) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(route);
      window.scrollTo(0, 0);
    }
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
      handleGlobalNavigate(service.id); // Fixed: ensure id is passed if needed, or mapped string
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-[#FFF2EC] font-sans selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col relative">
        
        {location.pathname !== '/contact' && (
          <GlobalHeader currentView={getCurrentView()} onNavigate={handleGlobalNavigate} scrolled={scrolled} />
        )}

        <div className="relative min-h-screen w-full">
          <Suspense fallback={<div className="h-screen w-full bg-[#FFF2EC]" />}>
            <AnimatePresence mode="wait">
              {/* FIX: Moved key to a wrapper div to solve TypeScript error on <Routes> */}
              <div key={location.pathname} className="w-full">
                <Routes location={location}>
                  <Route path="/" element={<HomePage onNavigate={handleGlobalNavigate} onServiceClick={handleServiceClick} />} />
                  <Route path="/architect" element={<ArchitectPage onBack={() => handleGlobalNavigate('homepage')} onNavigate={handleGlobalNavigate} />} />
                  <Route path="/system" element={<SystemPage onNavigate={handleGlobalNavigate} />} />
                  <Route path="/process" element={<ProcessPage onNavigate={handleGlobalNavigate} />} />
                  <Route path="/proof" element={<ProofPage onNavigate={handleGlobalNavigate} />} />
                  <Route path="/evidence-vault" element={<EvidenceVaultPage onNavigate={handleGlobalNavigate} />} />
                  <Route path="/contact" element={<ContactPage onNavigate={handleGlobalNavigate} />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage onBack={() => handleGlobalNavigate('homepage')} />} />
                  
                  {/* Pillars */}
                  <Route path="/pillar1" element={<Pillar1 onNavigate={handleGlobalNavigate} />} />
                  <Route path="/pillar2" element={<Pillar2 onNavigate={handleGlobalNavigate} />} />
                  <Route path="/pillar3" element={<Pillar3 onNavigate={handleGlobalNavigate} />} />
                  <Route path="/pillar4" element={<Pillar4 onNavigate={handleGlobalNavigate} />} />
                  <Route path="/pillar5" element={<Pillar5 onNavigate={handleGlobalNavigate} />} />
                  <Route path="/pillar6" element={<Pillar6 onNavigate={handleGlobalNavigate} />} />
                  <Route path="/pillar7" element={<Pillar7 onNavigate={handleGlobalNavigate} />} />
                  
                  <Route path="*" element={<NotFoundPage onNavigate={handleGlobalNavigate} />} />
                </Routes>
              </div>
            </AnimatePresence>
          </Suspense>
        </div>

        {location.pathname !== '/system' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
        <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(id) => handleGlobalNavigate(id)} />
      </div>
    </LazyMotion>
  );
};

export default App;
