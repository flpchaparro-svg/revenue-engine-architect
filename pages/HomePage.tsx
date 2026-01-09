import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { XCircle } from 'lucide-react';
import HeroVisual from '../components/HeroVisual';
import BentoGrid from '../components/BentoGrid';
import TheArchitect from '../components/TheArchitect';
import Feature_Group7 from '../components/Feature_Group7';
import BookingCTA from '../components/BookingCTA';
import BookAuditButton from '../components/BookAuditButton';
import FrictionAuditSection from '../components/FrictionAuditSection';
import GrowthGraph from '../components/GrowthGraph';
import { ServiceDetail } from '../types';

const TECH_STACK = [
  'WEBSITES', 'CRM', 'MARKETING AUTOMATION', 'AI ASSISTANTS', 'CONTENT MARKETING', 'DASHBOARDS'
];

interface HomePageProps {
  onNavigate: (view: string, sectionId?: string) => void;
  onServiceClick?: (service: ServiceDetail) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onServiceClick }) => {
  const [scrambleText, setScrambleText] = useState("ARCHITECT");
  const [isTickerHovered, setIsTickerHovered] = useState(false);

  const { scrollY } = useScroll();
  const carouselX = useMotionValue(0);
  const xPercent = useTransform(carouselX, (value) => `${value}%`);

  useAnimationFrame((t, delta) => {
    const speed = isTickerHovered ? 0 : 0.0006;
    let moveBy = speed * delta;
    const currentX = carouselX.get();
    let nextX = currentX - moveBy;
    if (nextX <= -50) nextX = 0;
    carouselX.set(nextX);
  });

  useEffect(() => {
    const roles = ["ARCHITECT", "NAVIGATOR", "ENGINEER"];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roleIndex = 0;
    const scrambleInterval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      const target = roles[roleIndex];
      let iterations = 0;
      const interval = setInterval(() => {
        setScrambleText(prev => target.split("").map((_, i) => i < iterations ? target[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
        if (iterations >= target.length) clearInterval(interval);
        iterations += 1;
      }, 60);
    }, 7000);
    return () => clearInterval(scrambleInterval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen w-full flex items-center pt-16 md:pt-20 overflow-hidden relative z-20 content-layer">
        <HeroVisual />
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-20">
          <div className="lg:col-span-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-center lg:justify-start">
              <span className="text-xs font-bold tracking-widest uppercase text-[#1a1a1a]">/</span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#1a1a1a] mt-[1px]">
                SYDNEY BUSINESS AUTOMATION 
                <span className="font-mono font-bold ml-2 text-[#C5A059]">
                  [ {scrambleText} ]
                </span>
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
              <div className="overflow-hidden"><span className="block reveal-text">Stop Doing</span></div>
              <div className="overflow-hidden"><span className="block reveal-text" style={{ animationDelay: '0.2s' }}><span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Everyone's Job.</span></span></div>
            </h1>
            <p className="font-sans text-base md:text-lg font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-[#1a1a1a]/20 pl-4 md:pl-6 animate-fade-in text-left mx-auto lg:mx-0" style={{ animationDelay: '0.6s' }}>You didn't start a business to chase invoices, re-type data, and answer the same questions all day. I build the systems that do it for you — websites, CRMs, automations, and AI — so you can get back to the work that actually grows revenue.</p>
            <div className="mt-8 md:mt-16 flex flex-col sm:flex-row items-center gap-6 md:gap-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <button onClick={() => onNavigate('contact')} className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-widest font-bold overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ LET'S TALK ]</span>
              </button>
              <a href="#architecture" onClick={(e) => { e.preventDefault(); document.getElementById('architecture')?.scrollIntoView({behavior: 'smooth'}); }} className="relative group flex items-center gap-3 cursor-pointer">
                <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 group-hover:border-b-2 group-hover:pb-1 transition-all duration-300 font-bold">SEE HOW IT WORKS</span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[1px] bg-[#1a1a1a]/10 overflow-hidden">
          <motion.div initial={{ y: '-100%' }} animate={{ y: '100%' }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-[#1a1a1a]/40" />
        </div>
      </section>

      {/* CAROUSEL */}
      <div className="w-full bg-[#1a1a1a]/5 py-10 border-y border-black/5 overflow-hidden relative z-30" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }} onMouseEnter={() => setIsTickerHovered(true)} onMouseLeave={() => setIsTickerHovered(false)}>
        <div className="flex whitespace-nowrap">
          <motion.div className="flex items-center pr-0" style={{ x: xPercent }}>
            {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <div key={i} className="flex items-center group cursor-default">
                <span className="font-mono text-sm font-bold tracking-[0.2em] text-[#1a1a1a]/40 group-hover:text-[#C5A059] transition-colors duration-300 px-12">{tech}</span>
                <span className="text-[#C5A059] text-[10px] opacity-50">//</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* DIAGNOSIS SECTION (Global #01) */}
      <motion.section id="diagnosis" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="w-full bg-[#FFF2EC] py-16 md:py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 md:h-32 w-[1px] bg-[#1a1a1a]/10" />
        <div className="max-w-[1600px] mx-auto border-t border-l border-[#1a1a1a]/10">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2 p-6 md:p-12 lg:p-16 border-r border-b border-[#1a1a1a]/10 flex flex-col justify-center min-h-[250px] md:min-h-[350px]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-6 md:mb-10 block">01 / THE PROBLEM</span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-[0.9] text-[#1a1a1a] tracking-tighter">You didn't start your business to become an <br className="hidden md:block" /><span className="italic text-[#1a1a1a]/60">administrative hostage.</span></h2>
            </div>
            <div className="col-span-1 border-r border-b border-[#1a1a1a]/10 bg-transparent">
              <GrowthGraph />
            </div>
            <div className="col-span-1 p-6 md:p-12 border-r border-b border-[#1a1a1a]/10 min-h-[200px] md:min-h-[300px]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-6 md:mb-8 block">02 / SYMPTOMS</span>
              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-start gap-3 md:gap-4"><XCircle className="w-4 h-4 md:w-5 md:h-5 text-[#E21E3F] shrink-0 mt-0.5" /><div className="font-sans text-base md:text-lg text-[#1a1a1a]/70"><strong className="text-[#1a1a1a]">The Bottleneck Boss:</strong> You are answering questions instead of doing deep work.</div></li>
                <li className="flex items-start gap-3 md:gap-4"><XCircle className="w-4 h-4 md:w-5 md:h-5 text-[#E21E3F] shrink-0 mt-0.5" /><div className="font-sans text-base md:text-lg text-[#1a1a1a]/70"><strong className="text-[#1a1a1a]">The Double-Entry Tax:</strong> Typing the same data into two different apps.</div></li>
                <li className="flex items-start gap-3 md:gap-4"><XCircle className="w-4 h-4 md:w-5 md:h-5 text-[#E21E3F] shrink-0 mt-0.5" /><div className="font-sans text-base md:text-lg text-[#1a1a1a]/70"><strong className="text-[#1a1a1a]">The Sunday Grind:</strong> Invoicing and admin eating your weekends.</div></li>
              </ul>
            </div>
            <div className="col-span-1 p-6 md:p-12 border-r border-b border-[#1a1a1a]/10 bg-[#E21E3F]/5 min-h-[200px] md:min-h-[300px]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-6 md:mb-8 block">03 / THE COST</span>
              <div className="space-y-3 md:space-y-4">
                <div className="font-sans text-2xl md:text-3xl font-bold text-[#E21E3F] uppercase tracking-tighter">BURNING TALENT</div>
                <p className="font-sans text-xs md:text-sm text-[#E21E3F]/70 leading-relaxed uppercase tracking-widest">Paying high-value staff to do low-value data entry.</p>
              </div>
            </div>
            <div className="col-span-1 p-6 md:p-12 border-r border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-white min-h-[200px] md:min-h-[300px] flex flex-col justify-between border-l-2 border-l-[#C5A059]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] block mb-4 md:mb-0">04 / THE FIX</span>
              <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-tight mb-6 md:mb-8">I build the systems that do the boring work for you. Your team gets their time back. You get your business back.</p>
              <button onClick={() => document.getElementById('architecture')?.scrollIntoView({behavior: 'smooth'})} className="flex items-center gap-3 font-mono text-[10px] text-[#C5A059] uppercase tracking-[0.3em] hover:text-white transition-colors cursor-pointer group">[ SEE HOW IT WORKS ]</button>
            </div>
          </div>
        </div>
      </motion.section>

      <FrictionAuditSection onNavigate={onNavigate} />
      <div id="bento">
        <BentoGrid onServiceClick={onServiceClick || ((s) => onNavigate(s.id))} />
      </div>
      <TheArchitect />
      <Feature_Group7 />
      <BookingCTA />
      <BookAuditButton onNavigate={onNavigate} />
    </>
  );
};

export default HomePage;
