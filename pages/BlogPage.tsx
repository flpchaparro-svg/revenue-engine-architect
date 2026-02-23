import React, { useEffect, useState, useMemo } from 'react';
import { m } from 'framer-motion';
import { client, urlFor } from '../src/sanityClient';
import { getAllPillars } from '../constants/systemPillars';
import HeroVisual from '../components/HomePage/HeroVisual';
import RobotPeek from '../components/RobotPeek'; 

const RED_PILLARS = ['Websites & E-commerce', 'CRM & Lead Tracking', 'Automation'];
const GOLD_PILLARS = ['AI Assistants', 'Content Systems', 'Team Training', 'Dashboards & Reporting'];

const FILTER_OPTIONS = ['ALL', ...getAllPillars().map((p) => p.subtitle)];

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
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    client
      .fetch(`*[_type == "post"] | order(publishedAt desc) { title, slug, mainImage, publishedAt, "authorName": author->name, servicePillar, isFeatured, seoDescription }`)
      .then((data) => setPosts(data || []))
      .catch(console.error);
  }, []);

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
    <section className="w-full bg-cream min-h-[80vh] flex flex-col font-sans text-black relative overflow-visible">
      
      {/* THE ROBOT */}
      <RobotPeek />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-48 pb-16 flex-1 w-full relative z-10 min-h-[calc(100vh-8rem)] flex flex-col overflow-visible">
        
        {/* HEADER - Sphere column has top padding so the sphere is never cut */}
        <header className="mb-20 flex flex-col md:flex-row md:items-center justify-between gap-12 border-b-4 border-black pb-16 relative flex-1 min-h-0 overflow-visible">
          <div className="max-w-3xl flex-1 relative z-20 pt-8 md:pt-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 uppercase flex items-baseline">
              Insights & Strategy<span className="animate-pulse text-red-500 ml-1">_</span>
            </h1>
            <p className="text-lg md:text-xl text-black/70 max-w-2xl leading-relaxed font-mono uppercase tracking-widest">
              Perspectives, case studies, and architectural blueprints for scaling your revenue engine.
            </p>
          </div>
          
          {/* Sphere: slightly smaller so full sphere + shadow fit in view */}
          <div className="hidden md:flex shrink-0 pointer-events-none z-10 overflow-visible w-80 lg:w-[420px] justify-end">
            <div className="w-80 h-80 lg:w-[420px] lg:h-[420px] relative opacity-90">
              <HeroVisual />
            </div>
          </div>
        </header>

        {/* CONTROLS: FILTER BAR + SEARCH */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setActiveFilter(option)}
                className={`font-mono text-sm uppercase border-2 border-black px-4 py-2 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                  activeFilter === option
                    ? 'bg-black text-white'
                    : 'bg-cream text-black'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specific insights..."
              className="w-full bg-transparent border-b-2 border-black/30 px-0 py-3 text-lg font-sans font-medium text-black focus:outline-none focus:border-black transition-colors placeholder:text-black/30"
            />
            <svg 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-black/30" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* RESULTS GRID */}
        {posts.length === 0 ? (
          <div className="font-mono text-sm uppercase tracking-widest text-black/60 border-2 border-black p-6 inline-block">
            Loading Insights...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="font-mono text-sm uppercase tracking-widest text-red-500 border-2 border-red-500 p-6 inline-block bg-red-500/10">
            No insights found for that search.
          </div>
        ) : (
          <>
            {/* FEATURED POSTS */}
            {featuredPosts.length > 0 && (
              <div className="mb-20">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post: any) => (
                  <BlogCard key={post.slug?.current ?? post.title} post={post} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* LEAD CAPTURE */}
      <div className="border-t-4 border-black bg-black text-cream relative overflow-hidden mt-20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ef4444] via-[#D4AF37] to-white opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Copy Side */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6">
                Join the Private List.
              </h2>
              <p className="font-mono text-sm md:text-base uppercase tracking-widest text-cream/70 border-l-2 border-[#D4AF37] pl-4">
                Get exclusive architectural blueprints and system strategy delivered directly to your inbox. No spam, just pure signal.
              </p>
            </div>
            
            {/* Form Side */}
            <div className="bg-black border-2 border-cream/20 p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
              {formStatus === 'success' ? (
                 <div className="font-mono text-[#D4AF37] text-lg uppercase tracking-widest border-2 border-[#D4AF37]/50 p-6 bg-[#D4AF37]/5 text-center">
                    Thank you. You are on the list.
                 </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-cream/50 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formStatus === 'loading'}
                      placeholder="Enter your email"
                      className="border-2 border-cream bg-black text-cream px-4 py-4 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder:text-cream/30 transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="font-mono text-sm font-bold uppercase border-2 border-cream bg-cream text-black px-6 py-4 hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[-4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 mt-2"
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