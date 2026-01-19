import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ShieldCheck, Activity, Database, ArrowRight, ArrowLeft, Zap, 
  MapPin, Award, Terminal, CheckCircle2, Globe, Clock, FileText,
  TrendingUp, AlertTriangle, Target, BarChart3
} from 'lucide-react';
import EvidenceVisual_Compare from '../components/EvidenceVisual_Compare';

interface ProofPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- HELPER: ANIMATED COUNTER ---
const CountUp: React.FC<{ value: number, suffix?: string, prefix?: string }> = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const incrementTime = duration / value;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// --- TERMINAL LOG COMPONENT ---
const TerminalLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  const allLines = [
    "> Auditing old site... [4.2s load, 42/100 PSI]",
    "> Migrating domain: .com → .com.au... [DONE]",
    "> Rebuilding in React + Tailwind... [DONE]",
    "> Adding Sydney location schema... [47 SIGNALS]",
    "> Compressing images: 8.2MB → 0.9MB... [SAVED 89%]",
    "> Enabling CDN distribution... [DONE]",
    "> Running final PageSpeed audit... [94/100]",
    "> Load time: 4.2s → 0.4s... [10x FASTER]",
    "> Deploying to production... [LIVE]",
    "> Status: TRANSFORMATION_COMPLETE"
  ];

  useEffect(() => {
    let delay = 200;
    allLines.forEach((line) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      delay += 600;
    });
  }, []);

  return (
    <div className="w-full bg-[#1a1a1a] p-6 border-t border-black/10 font-mono text-xs overflow-hidden">
      <div className="flex items-center gap-2 text-white/20 mb-4 border-b border-white/10 pb-2">
        <Terminal className="w-3 h-3 text-[#C5A059]" />
        <span className="text-[#C5A059] uppercase tracking-widest">Build Log / What I Did</span>
      </div>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white/80"
          >
            <span className="text-[#C5A059] mr-2">➜</span>
            {line}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-[#C5A059] inline-block align-middle ml-2"
        />
      </div>
    </div>
  );
};

const ProofPage: React.FC<ProofPageProps> = ({ onBack, onNavigate }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-0 relative z-[150] overflow-x-hidden flex flex-col">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow pb-32">
        
        {/* SECTION 01: PAGE HEADER */}
        <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return to Home
          </button>
        </div>

        {/* HERO */}
        <div className="mb-32">
          <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
              THE PROOF
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10">
            Results You Can <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Verify.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-6 mb-8">
            I don't show testimonials. I show data. Here's what happened when I rebuilt a Sydney security company's entire digital presence.
          </p>
        </div>

        {/* SECTION 02: CASE STUDY INTRO */}
        <div className="mb-32 p-8 border border-black/10 bg-white rounded-sm">
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-black/10">
            <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest font-bold">[ CASE STUDY: GROUP 7 SECURITY ]</span>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest block mb-1">Industry</span>
                <span className="font-sans">Security Services</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest block mb-1">Project Type</span>
                <span className="font-sans">Website Rebuild + SEO Overhaul + CRM Foundation</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest block mb-1">Timeline</span>
                <span className="font-sans">4 Weeks</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-2xl mb-4">The Brief</h3>
            <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
              Group 7 Security is a commercial security company protecting some of Sydney's most valuable assets — including properties worth over $3.2 billion. They had a problem: their website made them look like a 1990s WordPress template, not a professional security operation. Google didn't know they were in Sydney. And their competitors were eating their lunch in local search.
            </p>
          </div>
        </div>

        {/* SECTION 03: THE BEFORE */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest font-bold">BEFORE</span>
            <h2 className="font-serif text-4xl md:text-5xl">The Old Site: group7security.com</h2>
            <span className="font-mono text-[10px] text-[#E21E3F] uppercase tracking-widest bg-[#E21E3F]/10 px-3 py-1">[ DECOMMISSIONED ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Problem 1 */}
            <div className="p-8 border border-black/10 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-[#E21E3F]" />
                <h3 className="font-serif text-xl">Speed Was Killing Conversions</h3>
              </div>
              <div className="mb-4">
                <div className="font-mono text-[10px] text-black/40 uppercase tracking-widest mb-1">Page Load Time</div>
                <div className="text-4xl font-serif text-[#E21E3F] mb-2">4.2 seconds</div>
                <p className="text-sm text-black/60 mb-4">Google says anything over 3 seconds loses 53% of mobile visitors. They were haemorrhaging leads before anyone saw the homepage.</p>
                <p className="text-sm font-semibold text-[#1a1a1a]">Business Impact: For a security company, every missed enquiry could be a $10k/month contract walking to a competitor.</p>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="p-8 border border-black/10 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-[#E21E3F]" />
                <h3 className="font-serif text-xl">Google Thought They Were International</h3>
              </div>
              <div className="mb-4">
                <div className="font-mono text-[10px] text-black/40 uppercase tracking-widest mb-1">Local SEO Visibility</div>
                <div className="text-4xl font-serif text-[#E21E3F] mb-2">Near Zero</div>
                <p className="text-sm text-black/60 mb-4">The .com domain with no location signals meant Google had no idea this was a Sydney business. They were competing with security companies in Texas, not Parramatta.</p>
                <p className="text-sm font-semibold text-[#1a1a1a]">Business Impact: When someone searched "security company near me" in Sydney, Group 7 didn't exist. Invisible to their own market.</p>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="p-8 border border-black/10 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-[#E21E3F]" />
                <h3 className="font-serif text-xl">The Site Screamed "Amateur"</h3>
              </div>
              <div className="mb-4">
                <div className="font-mono text-[10px] text-black/40 uppercase tracking-widest mb-1">Trust Perception</div>
                <div className="text-4xl font-serif text-[#E21E3F] mb-2">WordPress Template</div>
                <p className="text-sm text-black/60 mb-4">The old site used a generic WordPress theme. Sliders from 2016. Stock photos. A CEO bio that looked like a LinkedIn profile. For a company protecting $3.2 billion in assets, the website looked like a side hustle.</p>
                <p className="text-sm font-semibold text-[#1a1a1a]">Business Impact: Facility managers and strata committees do due diligence. One look at that site and they'd question whether this company could protect a shopping centre.</p>
              </div>
            </div>

            {/* Problem 4 */}
            <div className="p-8 border border-black/10 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-[#E21E3F]" />
                <h3 className="font-serif text-xl">No Lead Capture System</h3>
              </div>
              <div className="mb-4">
                <div className="font-mono text-[10px] text-black/40 uppercase tracking-widest mb-1">Lead Tracking</div>
                <div className="text-4xl font-serif text-[#E21E3F] mb-2">0%</div>
                <p className="text-sm text-black/60 mb-4">Enquiries went to a generic info@ inbox. No tracking. No follow-up automation. No visibility on which pages drove which leads.</p>
                <p className="text-sm font-semibold text-[#1a1a1a]">Business Impact: They had no idea if their website was generating business or just burning hosting costs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 04: THE AFTER */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-[#C5A059] uppercase tracking-widest font-bold">AFTER</span>
            <h2 className="font-serif text-4xl md:text-5xl">The New Site: group7security.com.au</h2>
            <span className="font-mono text-[10px] text-[#C5A059] uppercase tracking-widest bg-[#C5A059]/10 px-3 py-1">[ LIVE ]</span>
          </div>

          <div className="mb-12">
            <h3 className="font-serif text-3xl mb-8">What I Did</h3>
            
            <div className="space-y-8">
              {/* Change 1 */}
              <div className="p-8 border-l-4 border-[#C5A059] bg-white">
                <h4 className="font-serif text-xl mb-3">Domain Migration</h4>
                <div className="space-y-2 mb-4">
                  <p className="font-sans text-sm font-semibold text-black/60">What:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Moved from .com to .com.au with proper 301 redirects</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Why:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Google treats .com.au domains as locally relevant for Australian searches. Instant geographic signal.</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Impact:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Now when someone searches "security company Sydney", Google knows exactly where Group 7 operates.</p>
                </div>
              </div>

              {/* Change 2 */}
              <div className="p-8 border-l-4 border-[#C5A059] bg-white">
                <h4 className="font-serif text-xl mb-3">Complete Site Rebuild</h4>
                <div className="space-y-2 mb-4">
                  <p className="font-sans text-sm font-semibold text-black/60">What:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Custom-built in React with Tailwind CSS. No WordPress. No bloat. No plugins slowing things down.</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Why:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">WordPress themes carry baggage — 47 plugins, unused CSS, render-blocking JavaScript. I stripped it back to exactly what's needed.</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Impact:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Page weight dropped from 8.2MB to under 1MB. The site feels instant.</p>
                </div>
              </div>

              {/* Change 3 */}
              <div className="p-8 border-l-4 border-[#C5A059] bg-white">
                <h4 className="font-serif text-xl mb-3">Local SEO Architecture</h4>
                <div className="space-y-2 mb-4">
                  <p className="font-sans text-sm font-semibold text-black/60">What:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Added structured data (Schema.org), location-specific landing pages, Google Business Profile optimisation, and Sydney-focused meta descriptions.</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Why:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Google needs explicit signals to rank locally. I gave it 47 different signals that say "this is a Sydney security company."</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Impact:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Local search visibility is now measurable. They appear in map packs. Competitors are now visible in the rear-view mirror.</p>
                </div>
              </div>

              {/* Change 4 */}
              <div className="p-8 border-l-4 border-[#C5A059] bg-white">
                <h4 className="font-serif text-xl mb-3">Performance Obsession</h4>
                <div className="space-y-2 mb-4">
                  <p className="font-sans text-sm font-semibold text-black/60">What:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">WebP images, lazy loading, code splitting, CDN distribution, server-side rendering, minified assets.</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Why:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Every 0.1 second matters. Amazon found that 100ms of latency costs 1% of sales. I treated this site the same way.</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Impact:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Load time: 4.2s → 0.4s. That's a 10x improvement.</p>
                </div>
              </div>

              {/* Change 5 */}
              <div className="p-8 border-l-4 border-[#C5A059] bg-white">
                <h4 className="font-serif text-xl mb-3">Lead Capture Foundation</h4>
                <div className="space-y-2 mb-4">
                  <p className="font-sans text-sm font-semibold text-black/60">What:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">Smart forms that capture source, page, and intent. Ready to plug into any CRM when they scale.</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Why:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">You can't improve what you can't measure. Now every enquiry is traceable back to the page that generated it.</p>
                  <p className="font-sans text-sm font-semibold text-black/60 mt-4">Impact:</p>
                  <p className="font-sans text-base text-[#1a1a1a]/70">100% lead attribution. They know exactly where their business comes from.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 05: THE METRICS */}
        <div className="mb-32">
          <h2 className="font-serif text-4xl md:text-5xl mb-12">The Evidence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Metric 1 */}
            <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <Activity className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Google PageSpeed Score</div>
              <div className="flex items-baseline gap-4 mb-2">
                <div className="text-4xl font-serif text-[#E21E3F]">42</div>
                <ArrowRight className="w-6 h-6 text-black/20" />
                <div className="text-4xl font-serif text-[#C5A059] group-hover:text-[#C5A059] transition-colors">
                  <CountUp value={94} suffix="/100" />
                </div>
              </div>
              <p className="text-sm text-black/50 mb-2">+124% improvement</p>
              <p className="text-sm text-black/60">Green score. Google rewards fast sites with better rankings. Users stay longer. Bounce rate drops.</p>
            </div>

            {/* Metric 2 */}
            <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <Zap className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Page Load Time</div>
              <div className="flex items-baseline gap-4 mb-2">
                <div className="text-4xl font-serif text-[#E21E3F]">4.2s</div>
                <ArrowRight className="w-6 h-6 text-black/20" />
                <div className="text-4xl font-serif text-[#C5A059] group-hover:text-[#C5A059] transition-colors">
                  0.4s
                </div>
              </div>
              <p className="text-sm text-black/50 mb-2">10x faster</p>
              <p className="text-sm text-black/60">Every second over 3s loses 7% of conversions. They went from losing visitors to capturing them.</p>
            </div>

            {/* Metric 3 */}
            <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <Database className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Lead Source Attribution</div>
              <div className="flex items-baseline gap-4 mb-2">
                <div className="text-4xl font-serif text-[#E21E3F]">0%</div>
                <ArrowRight className="w-6 h-6 text-black/20" />
                <div className="text-4xl font-serif text-[#C5A059] group-hover:text-[#C5A059] transition-colors">
                  <CountUp value={100} suffix="%" />
                </div>
              </div>
              <p className="text-sm text-black/50 mb-2">Complete visibility</p>
              <p className="text-sm text-black/60">Every enquiry is now traceable. They know which pages work and which don't.</p>
            </div>

            {/* Metric 4 */}
            <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <MapPin className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Sydney Search Visibility</div>
              <div className="flex items-baseline gap-4 mb-2">
                <div className="text-2xl font-serif text-[#E21E3F]">Invisible</div>
                <ArrowRight className="w-6 h-6 text-black/20" />
                <div className="text-2xl font-serif text-[#C5A059]">Indexed & Ranking</div>
              </div>
              <p className="text-sm text-black/50 mb-2">From ghost to visible</p>
              <p className="text-sm text-black/60">When someone searches "commercial security Sydney", Group 7 now appears. That didn't happen before.</p>
            </div>

            {/* Metric 5 */}
            <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Core Web Vitals</div>
              <div className="flex items-baseline gap-4 mb-2">
                <div className="text-2xl font-serif text-[#E21E3F]">All Failed</div>
                <ArrowRight className="w-6 h-6 text-black/20" />
                <div className="text-2xl font-serif text-[#C5A059]">All Passed</div>
              </div>
              <p className="text-sm text-black/50 mb-2">Green across the board</p>
              <p className="text-sm text-black/60">Google's ranking factors are now satisfied. The technical foundation is solid.</p>
            </div>

            {/* Metric 6 */}
            <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <Award className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Professional Perception</div>
              <div className="flex items-baseline gap-4 mb-2">
                <div className="text-2xl font-serif text-[#E21E3F]">Generic WordPress</div>
                <ArrowRight className="w-6 h-6 text-black/20" />
                <div className="text-2xl font-serif text-[#C5A059]">Enterprise-Grade</div>
              </div>
              <p className="text-sm text-black/50 mb-2">Complete brand lift</p>
              <p className="text-sm text-black/60">The site now matches the calibre of clients they protect. Facility managers take them seriously.</p>
            </div>
          </div>
        </div>

        {/* SECTION 06: WHY THIS MATTERS */}
        <div className="mb-32 p-12 border border-black/10 bg-white">
          <h2 className="font-serif text-4xl md:text-5xl mb-12">Why This Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border-l-4 border-[#C5A059]">
              <h3 className="font-serif text-xl mb-3">If You're a Trades Business Owner</h3>
              <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed mb-4">
                Group 7 was invisible on Google. Sound familiar? If your website loads slowly or doesn't mention your service area, you're losing jobs to competitors who show up first. I fixed their local SEO — I can fix yours.
              </p>
              <button 
                onClick={() => onNavigate('system')}
                className="font-mono text-xs text-[#C5A059] uppercase tracking-widest hover:underline"
              >
                See Pillar 01: Websites & E-commerce →
              </button>
            </div>

            <div className="p-6 border-l-4 border-[#C5A059]">
              <h3 className="font-serif text-xl mb-3">If You're Running a Service Business</h3>
              <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed mb-4">
                Group 7 had no idea which pages were generating leads. They were flying blind. Now they have 100% attribution. If you're spending money on marketing but can't prove what's working, you have the same problem.
              </p>
              <button 
                onClick={() => onNavigate('system')}
                className="font-mono text-xs text-[#C5A059] uppercase tracking-widest hover:underline"
              >
                See Pillar 02: CRM & Lead Tracking →
              </button>
            </div>

            <div className="p-6 border-l-4 border-[#C5A059]">
              <h3 className="font-serif text-xl mb-3">If You're a Professional Services Firm</h3>
              <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed mb-4">
                Group 7 protects $3.2 billion in assets, but their old site looked like a side project. First impressions matter. If your website doesn't match your expertise, you're losing premium clients to competitors who look the part.
              </p>
              <button 
                onClick={() => onNavigate('system')}
                className="font-mono text-xs text-[#C5A059] uppercase tracking-widest hover:underline"
              >
                See Pillar 01: Websites & E-commerce →
              </button>
            </div>

            <div className="p-6 border-l-4 border-[#C5A059]">
              <h3 className="font-serif text-xl mb-3">If You're Scaling and Need Visibility</h3>
              <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed mb-4">
                Speed isn't vanity — it's money. Group 7's old site was bleeding visitors before they saw anything. A 10x speed improvement means more people see their message, more people enquire, more contracts signed.
              </p>
              <button 
                onClick={() => onNavigate('system')}
                className="font-mono text-xs text-[#C5A059] uppercase tracking-widest hover:underline"
              >
                See Pillar 07: Dashboards & Reporting →
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 07: THE BUILD LOG */}
        <div className="mb-32">
          <TerminalLog />
        </div>

        {/* SECTION 08: SEO WORK IN PROGRESS */}
        <div className="mb-32 p-8 border border-[#C5A059] bg-[#C5A059]/5">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-[#C5A059] uppercase tracking-widest font-bold bg-[#C5A059]/10 px-3 py-1">[ SEO CAMPAIGN: ACTIVE ]</span>
          </div>
          <h3 className="font-serif text-3xl mb-4">The Work Continues</h3>
          <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-8">
            The website rebuild was Phase 1. Now I'm running an ongoing SEO campaign to build Group 7's authority in Sydney's commercial security market. This includes:
          </p>
          <ul className="space-y-3 font-sans text-base text-[#1a1a1a]/70">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
              <span>Creating industry-specific landing pages (construction, strata, retail)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
              <span>Building local backlinks from Sydney business directories</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
              <span>Optimising Google Business Profile with regular updates</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
              <span>Publishing content targeting "security company + [suburb]" keywords</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
              <span>Monitoring Core Web Vitals and making performance tweaks</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059] mt-0.5 flex-shrink-0" />
              <span>Tracking keyword rankings and adjusting strategy monthly</span>
            </li>
          </ul>
          <p className="font-sans text-base text-[#1a1a1a]/70 mt-8 italic">
            This isn't a "set and forget" project. I'm actively working to push Group 7 higher in local search results. The foundation is built — now we climb.
          </p>
        </div>

        {/* SECTION 09: SIDE-BY-SIDE COMPARISON */}
        <div className="mb-32">
          <h2 className="font-serif text-4xl md:text-5xl mb-12">Before & After</h2>
          <EvidenceVisual_Compare 
            beforeLabel="BEFORE"
            afterLabel="AFTER"
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <div className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest mb-2">group7security.com</div>
              <p className="font-sans text-sm text-black/60">Generic WordPress template. 4.2s load. Invisible on local search.</p>
            </div>
            <div>
              <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2">group7security.com.au</div>
              <p className="font-sans text-sm text-black/60">Custom-built. 0.4s load. Sydney-optimised. Enterprise-grade.</p>
            </div>
          </div>
        </div>

        {/* SECTION 10: CTA BLOCK */}
        <div className="bg-[#1a1a1a] border border-black/10 text-[#FFF2EC] p-12 md:p-24 relative overflow-hidden mb-32 rounded-sm shadow-2xl">
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-4 block">Your Turn</span>
            <h2 className="font-serif text-5xl md:text-6xl mb-8">
              Want Results Like <span className="italic text-[#C5A059]">This?</span>
            </h2>
            <p className="font-sans text-xl text-[#FFF2EC]/80 mb-10 max-w-2xl leading-relaxed">
              Group 7 went from invisible to indexed, from slow to instant, from amateur to enterprise. If your website is holding you back, let's fix it.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#C5A059] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300 hover:border-[#C5A059]"
            >
              <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
              <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500 flex items-center gap-3">
                [ BOOK A CALL ] <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <p className="font-mono text-[10px] text-[#FFF2EC]/50 uppercase tracking-widest mt-6">
              No sales pitch. Just a conversation about what's possible.
            </p>
          </div>
        </div>

        {/* SECTION 11: QUICK STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
          <div className="text-center p-6 border border-black/10 bg-white">
            <div className="text-3xl font-serif text-[#C5A059] mb-2">10x</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-black/40">faster load time</div>
          </div>
          <div className="text-center p-6 border border-black/10 bg-white">
            <div className="text-3xl font-serif text-[#C5A059] mb-2">100%</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-black/40">lead attribution</div>
          </div>
          <div className="text-center p-6 border border-black/10 bg-white">
            <div className="text-3xl font-serif text-[#C5A059] mb-2">47</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-black/40">local SEO signals</div>
          </div>
          <div className="text-center p-6 border border-black/10 bg-white">
            <div className="text-3xl font-serif text-[#C5A059] mb-2">89%</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-black/40">page weight reduction</div>
          </div>
          <div className="text-center p-6 border border-black/10 bg-white">
            <div className="text-3xl font-serif text-[#C5A059] mb-2">All</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-black/40">Core Web Vitals: Green</div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProofPage;
