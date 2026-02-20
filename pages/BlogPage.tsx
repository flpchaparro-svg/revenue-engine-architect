import React, { useEffect, useState, useMemo } from 'react';
import { m } from 'framer-motion';
import { client, urlFor } from '../src/sanityClient';
import { getAllPillars } from '../constants/systemPillars';
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

function BlogCard({
  post,
  featured = false,
}: {
  post: any;
  featured?: boolean;
}) {
  const slug = post.slug?.current ?? '';
  const href = `/blog/${slug}`;
  const cardClass = featured
    ? 'group block w-full bg-cream border-2 border-black transition-all duration-150 hover:bg-zinc-200 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
    : 'group bg-cream border-b-2 border-r-0 md:border-r-2 md:[&:nth-child(2n)]:border-r-0 border-black flex flex-col transition-all duration-150 hover:bg-zinc-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';

  return (
    <a key={post.slug?.current ?? post.title} href={href} className={cardClass}>
      {post.mainImage && (
        <div
          className={
            featured
              ? 'aspect-[21/9] overflow-hidden border-b-2 border-black'
              : 'aspect-[16/10] overflow-hidden border-b-2 border-black'
          }
        >
          <img
            src={urlFor(post.mainImage).width(featured ? 1200 : 600).url()}
            alt={post.title ?? 'Post'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={featured ? 'p-8 md:p-12' : 'p-6'} style={{ borderTop: featured ? undefined : '0' }}>
        <span
          className={`inline-block px-2 py-1 border-2 text-[10px] font-mono uppercase tracking-wider mb-4 w-fit ${getPillarBadgeClass(post.servicePillar)}`}
        >
          {post.servicePillar || 'GENERAL LOG'}
        </span>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/60 mb-4">
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'DRAFT'}
          {' // '}
          {post.authorName || 'SYSTEM'}
        </p>
        <h2
          className={`font-mono font-bold uppercase tracking-tight text-black mb-4 group-hover:underline ${
            featured ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'
          }`}
        >
          {post.title}
        </h2>
        <div className="mt-auto font-mono text-xs uppercase tracking-widest text-black/70 group-hover:text-black">
          READ LOG →
        </div>
      </div>
    </a>
  );
}

interface BlogPageProps {
  onNavigate?: (view: string, sectionId?: string) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) { title, slug, mainImage, publishedAt, "authorName": author->name, servicePillar }`
      )
      .then((data) => setPosts(data || []))
      .catch(console.error);
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesFilter =
        activeFilter === 'ALL' || post.servicePillar === activeFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        (post.title ?? '')
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [posts, activeFilter, searchQuery]);

  const showFeatured =
    activeFilter === 'ALL' &&
    !searchQuery.trim() &&
    filteredPosts.length > 0;
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const gridPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  return (
    <section className="w-full bg-cream min-h-[80vh]">
      <RobotPeek />
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-0">
        {/* Header block — marching border as divider */}
        <header className="mb-12">
          <div className="animate-border-march bg-cream p-8 pb-10">
            <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black mb-6 inline-flex items-baseline flex-wrap">
              <m.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                SYSTEM LOGS
              </m.span>
              <span aria-hidden="true" className="animate-pulse ml-0.5">_</span>
            </h1>
            <p className="font-mono text-sm md:text-base uppercase tracking-widest text-black/70 max-w-2xl">
              INSIGHTS, UPDATES, AND ARCHITECTURAL BLUEPRINTS FOR SCALING YOUR REVENUE ENGINE.
            </p>
          </div>
        </header>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setActiveFilter(option)}
              className={`font-mono text-sm uppercase border-2 border-black px-4 py-2 transition-colors ${
                activeFilter === option
                  ? 'bg-black text-white'
                  : 'bg-cream text-black hover:bg-zinc-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Search / command line */}
        <div className="mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH BY TITLE..."
            className="w-full max-w-md border-2 border-black bg-cream px-4 py-2 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 placeholder:text-black/30"
            aria-label="Search posts by title"
          />
        </div>

        {posts.length === 0 ? (
          <div className="font-mono text-sm uppercase tracking-widest text-black/60 border-2 border-black p-6 inline-block">
            LOADING LOGS...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="font-mono text-sm uppercase tracking-widest text-black/60 border-2 border-black p-8">
            NO LOGS MATCH FILTER.
          </div>
        ) : (
          <>
            {/* Featured post (full width) */}
            {featuredPost && (
              <div className="mb-8">
                <BlogCard post={featuredPost} featured />
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black">
              {gridPosts.map((post: any) => (
                <BlogCard key={post.slug?.current ?? post.title} post={post} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lead capture block */}
      <div className="mt-24 border-t-4 border-black bg-zinc-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16">
          <h2 className="font-mono text-2xl md:text-3xl font-black uppercase tracking-tighter text-black mb-4">
            SYSTEM UPDATES
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest text-black/80 mb-8">
            ENTER EMAIL TO RECEIVE SYSTEM BLUEPRINTS.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-4 max-w-xl"
          >
            <input
              type="email"
              placeholder="EMAIL"
              className="flex-1 border-2 border-black bg-cream px-4 py-3 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 placeholder:text-black/30"
              aria-label="Email for system updates"
            />
            <button
              type="submit"
              className="font-mono text-sm uppercase border-2 border-black bg-black text-white px-6 py-3 hover:bg-zinc-800 transition-colors"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
