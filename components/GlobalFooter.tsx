import React from 'react';
import { Target, Zap, BarChart3, ArrowUpRight } from 'lucide-react';
import CTAButton from './CTAButton';

interface GlobalFooterProps {
  onNavigate: (view: string, sectionId?: string) => void;
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({ onNavigate }) => {
  
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'THE ARCHITECT',
      links: [
        { label: 'Philosophy', action: () => onNavigate('architect') },
        { label: 'The Process', action: () => onNavigate('process') },
        { label: 'Case Studies', action: () => onNavigate('proof') },
      ]
    },
    {
      title: 'GET CLIENTS',
      icon: Target,
      color: 'text-[#E21E3F]',
      links: [
        { label: 'Websites', action: () => onNavigate('pillar1') },
        { label: 'CRM Systems', action: () => onNavigate('pillar2') },
        { label: 'Automation', action: () => onNavigate('pillar3') },
      ]
    },
    {
      title: 'SCALE FASTER',
      icon: Zap,
      color: 'text-[#C5A059]',
      links: [
        { label: 'AI Agents', action: () => onNavigate('pillar4') },
        { label: 'Content Systems', action: () => onNavigate('pillar5') },
        { label: 'Team Training', action: () => onNavigate('pillar6') },
      ]
    },
    {
      title: 'SEE CLEARLY',
      icon: BarChart3,
      // FIX: Changed from text-[#1a1a1a] (Black) to text-white for visibility on dark footer
      color: 'text-white', 
      links: [
        { label: 'Dashboards', action: () => onNavigate('pillar7') },
      ]
    }
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP SECTION: CTA & BRAND */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">
           <div className="max-w-lg">
              <div className="flex items-center gap-3 mb-8">
                 <div className="font-mono text-[10px] font-bold border border-white/20 px-1.5 py-0.5 text-white/80">
                    [FC)
                 </div>
                 <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Felipe Consultancy
                 </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-8">
                Stop guessing. <br />
                Start <span className="italic text-[#C5A059]">building.</span>
              </h2>
              <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                [ BOOK A CALL ]
              </CTAButton>
           </div>

           {/* LINKS GRID */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
              {footerLinks.map((group) => (
                <div key={group.title}>
                   <div className={`flex items-center gap-2 mb-6 ${group.color}`}>
                      {group.icon && <group.icon className="w-4 h-4" />}
                      {/* FIX: Bumped to text-[10px] */}
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                        {group.title}
                      </span>
                   </div>
                   <ul className="space-y-4">
                     {group.links.map((link) => (
                       <li key={link.label}>
                         <button 
                           onClick={link.action}
                           className="font-sans text-sm text-white/60 hover:text-white transition-colors text-left"
                         >
                           {link.label}
                         </button>
                       </li>
                     ))}
                   </ul>
                </div>
              ))}
           </div>
        </div>

        {/* BOTTOM SECTION: LEGAL */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
             © {currentYear} Felipe Chaparro. Sydney, Australia.
           </p>
           
           <div className="flex items-center gap-8">
              <button 
                onClick={() => onNavigate('privacy')}
                className="font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors"
              >
                Privacy Policy
              </button>
              <a 
                href="https://www.linkedin.com/in/felipe-chaparro-97a390176/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Visit Felipe Chaparro's LinkedIn Profile"
                className="font-mono text-[10px] text-white/40 hover:text-[#C5A059] uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default GlobalFooter;
