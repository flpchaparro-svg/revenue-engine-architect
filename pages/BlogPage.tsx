import React, { useEffect, useState, useMemo } from 'react';
import { m } from 'framer-motion';
import { client, urlFor } from '../src/sanityClient';
import { getAllPillars } from '../constants/systemPillars';
import HeroVisualBrutalist from '../components/Blog/HeroVisualBrutalist';
import RobotPeek from '../components/RobotPeek'; 

const RED_PILLARS = ['Websites & E-commerce', 'CRM & Lead Tracking', 'Automation'];
const GOLD_PILLARS = ['AI Assistants', 'Content Systems', 'Team Training', 'Dashboards & Reporting'];

const FILTER_OPTIONS = ['ALL', ...getAllPillars().map((p) => p.subtitle)];

// Tightened phrases so they fit better on mobile screens
const SEARCH_PHRASES = [
  "AUTOMATE ONBOARDING...",
  "INTEGRATE HUBSPOT...",
  "AI SALES AGENTS...",
  "FRICTIONLESS FUNNELS...",
  "SCALE B2B REVENUE...",
];

function getPillarBadgeClass(servicePillar: string | null | undefined): string {
  if (!servicePillar) return 'border-black/40 bg-zinc-300 text-black/70';
  if (RED_PILLARS.includes(servicePillar)) return 'border-red-solid/20 bg-red-solid/5 text-red-text';
  if (GOLD_PILLARS.includes(servicePillar)) return 'border-gold/20 bg-gold/5 text-gold-on-cream';
  return 'border-black/40 bg-zinc-300 text-black/70';
}

const BlogCard: React.FC<{ post: any; featured?: boolean }> = ({ post, featured = false }) => {
  const slug = post.slug?.current ?? '';
  const href = `/blog/${slug}`;
  
  const cardClass = 'group flex flex-col h-full bg-cream border-2 border-black transition-all duration-150 hover:bg-zinc-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';

  return (
    <a href={href} className={cardClass}>
      {post.mainImage && (
        <div className="relative overflow-hidden border-b-2 border-black aspect-[16/10] w-full shrink-0">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 z-10" />
          <img
            src={urlFor(post.mainImage).width(800).url()}
            alt={post.title ?? 'Post'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <span className={`inline-block px-2 py-1 border-2 text-[10px] font-mono uppercase tracking-wider mb-4 w-fit relative z-20 ${getPillarBadgeClass(post.servicePillar)}`}>
          {post.servicePillar || 'GENERAL INSIGHT'}
        </span>
        
        <h2 className={`font-sans font-bold tracking-tight text-black mb-3 group-hover:underline ${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
          {post.title}
        </h2>
        
        <p className="font-sans text-sm text-black/70 mb-6 line-clamp-3 leading-relaxed">
          {post.seoDescription || "Explore this architectural blueprint and case study to understand the systemic implementation and strategic value for your revenue engine."}
        </p>

        <div className="mt-auto pt-4 border-t-2 border-black/10 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'DRAFT'}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-black/80 group-hover:text-black transition-colors flex items-center font-bold">
              READ <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </span>
        </div>
      </div>
    </a>
  );
};

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // FIX: Added a true loading state
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Typewriter Effect State
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Start loading
    client
      .fetch(`*[_type == "post"] | order(publishedAt desc) { title, slug, mainImage, publishedAt, "authorName": author->name, servicePillar, isFeatured, seoDescription }`)
      .then((data) => {
        setPosts(data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading no matter what
      });
  }, []);

  // Typewriter Animation Logic
  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 60;
    const currentPhrase = SEARCH_PHRASES[currentPhraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentPhrase) {
        // Pause at the end of typing before deleting
        setTimeout(() => setIsDeleting(true), 2500); 
      } else if (isDeleting && currentText === '') {
        // Move to the next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % SEARCH_PHRASES.length);
      } else {
        // Type or delete a character
        const nextText = isDeleting
          ? currentPhrase.substring(0, currentText.length - 1)
          : currentPhrase.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesFilter = activeFilter === 'ALL' || post.servicePillar === activeFilter;
      const matchesSearch = !searchQuery.trim() || (post.title ?? '').toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [posts, activeFilter, searchQuery]);

  const featuredPosts = filteredPosts.filter(p => p.isFeatured);
  const regularPosts = filteredPosts.filter(p => !p.isFeatured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="w-full bg-cream relative z-10 flex flex-col font-sans text-black">
      
      {/* THE ROBOT */}
      <RobotPeek />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-48 pb-16 flex-1 w-full relative z-20 flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-start justify-between gap-12 border-b-4 border-black pb-12 md:pb-16 relative w-full">
          <div className="max-w-3xl flex-1 relative z-30 pt-8 md:pt-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 uppercase flex items-baseline">
              Insights & Strategy<span className="animate-pulse text-red-500 ml-1">_</span>
            </h1>
            <p className="text-base md:text-xl text-black/70 max-w-2xl leading-relaxed font-mono uppercase tracking-widest mb-8 md:mb-12">
              Perspectives, case studies, and architectural blueprints for scaling your revenue engine.
            </p>

            {/* --- THE TYPEWRITER SEARCH BLOCK --- */}
            <div className="w-full max-w-2xl">
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ef4444] animate-pulse"></span>
                Find your article
              </h3>
              
              <div className="flex items-stretch shadow-[8px_8px_0px_0px_#09090b] transition-shadow hover:shadow-[12px_12px_0px_0px_#09090b]">
                
                <div className="relative flex-1 flex min-w-0 bg-white border-2 border-r-0 border-black overflow-hidden">
                  
                  {/* Search Input */}
                  <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full px-4 py-4 md:px-6 md:py-6 text-base md:text-xl font-mono uppercase tracking-widest text-black focus:outline-none focus:bg-cream transition-colors relative z-10 bg-transparent" 
                  />

                  {/* Simulated Placeholder (Typewriter Effect) */}
                  {!searchQuery && !isFocused && (
                    <div className="absolute inset-0 flex items-center pl-4 md:pl-6 pr-4 pointer-events-none z-20 overflow-hidden whitespace-nowrap">
                      <span className="text-base md:text-xl font-mono uppercase tracking-widest text-black/40 truncate">
                        {currentText}
                        <span className="text-[#ef4444] animate-pulse ml-0.5 inline-block translate-y-[-2px]">█</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <button className="bg-black text-cream border-2 border-black px-6 md:px-12 hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21L16.65 16.65" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
          
          {/* THE SPHERE */}
          <div className="hidden md:flex shrink-0 pointer-events-none z-10 w-80 lg:w-[420px] justify-end">
            <div className="w-80 h-80 lg:w-[420px] lg:h-[420px] relative opacity-90 mt-8 md:mt-0">
              <HeroVisualBrutalist />
            </div>
          </div>
        </header>

        {/* CONTROLS: FILTER BAR */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setActiveFilter(option)}
                className={`font-mono text-xs md:text-sm uppercase border-2 border-black px-3 py-2 md:px-4 md:py-2 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                  activeFilter === option
                    ? 'bg-black text-white'
                    : 'bg-cream text-black'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS GRID (FIXED LOADING LOGIC) */}
        {isLoading ? (
          <div className="font-mono text-sm uppercase tracking-widest text-black/60 border-2 border-black p-6 inline-block">
            Loading Insights...
          </div>
        ) : posts.length === 0 ? (
          <div className="font-mono text-sm uppercase tracking-widest text-black/60 border-2 border-black p-6 inline-block">
            No insights published yet.
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="font-mono text-sm uppercase tracking-widest text-red-500 border-2 border-red-500 p-6 inline-block bg-red-500/10">
            No insights found for that search.
          </div>
        ) : (
          <div className="w-full relative z-30 pb-20"> 
            {/* FEATURED POSTS */}
            {featuredPosts.length > 0 && (
              <div className="mb-12 md:mb-20">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#D4AF37] mb-8 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] mr-3 animate-pulse"></span>
                  Featured Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map(post => (
                    <BlogCard key={post.slug?.current ?? post.title} post={post} featured />
                  ))}
                </div>
              </div>
            )}

            {/* STANDARD GRID */}
            <div>
               <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-black/50 mb-8 border-b-2 border-black/20 pb-4">
                  Latest Articles
                </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {regularPosts.map((post: any) => (
                  <BlogCard key={post.slug?.current ?? post.title} post={post} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LEAD CAPTURE */}
      <div className="border-t-4 border-black bg-black text-cream relative overflow-hidden mt-auto w-full z-40">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ef4444] via-[#D4AF37] to-white opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Copy Side */}
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 md:mb-6">
                Join the Private List.
              </h2>
              <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-cream/70 border-l-2 border-[#D4AF37] pl-4">
                Get exclusive architectural blueprints and system strategy delivered directly to your inbox. No spam, just pure signal.
              </p>
            </div>
            
            {/* Form Side */}
            <div className="bg-black border-2 border-cream/20 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
              {formStatus === 'success' ? (
                 <div className="font-mono text-[#D4AF37] text-base md:text-lg uppercase tracking-widest border-2 border-[#D4AF37]/50 p-6 bg-[#D4AF37]/5 text-center">
                    Thank you. You are on the list.
                 </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-cream/50 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formStatus === 'loading'}
                      placeholder="Enter your email"
                      className="border-2 border-cream bg-black text-cream px-4 py-3 md:py-4 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder:text-cream/30 transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="font-mono text-xs md:text-sm font-bold uppercase border-2 border-cream bg-cream text-black px-6 py-3 md:py-4 hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[-4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 mt-2"
                  >
                    {formStatus === 'loading' ? 'Processing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}