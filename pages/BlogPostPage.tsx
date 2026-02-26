import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { client, urlFor } from '../src/sanityClient';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, ArrowUpRight, Share2, MessageSquare, Eye } from 'lucide-react';

// Helper function to extract YouTube ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeToc, setActiveToc] = useState<string>('');
  
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    client
      .fetch(
        `{
          "post": *[_type == "post" && slug.current == $slug][0] {
            title,
            mainImage,
            publishedAt,
            body,
            servicePillar,
            seoDescription,
            "authorName": author->name
          },
          "allOtherPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc) {
            title,
            slug,
            mainImage,
            servicePillar,
            publishedAt
          }
        }`,
        { slug }
      )
      .then((data) => {
        setPost(data.post);
        
        let related = data.allOtherPosts.filter((p: any) => p.servicePillar === data.post?.servicePillar);
        if (related.length < 3) {
          const others = data.allOtherPosts.filter((p: any) => p.servicePillar !== data.post?.servicePillar);
          related = [...related, ...others].slice(0, 3);
        } else {
          related = related.slice(0, 3);
        }
        setRelatedPosts(related);
        
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  const toc = useMemo(() => {
    if (!post?.body) return [];
    return post.body
      .filter((block: any) => block.style === 'h2')
      .map((block: any) => {
        const text = block.children?.map((c: any) => c.text).join('') || '';
        return {
          text,
          id: text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        };
      });
  }, [post?.body]);

  useEffect(() => {
    const observers = toc.map((item: any) => {
      const element = document.getElementById(item.id);
      if (!element) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveToc(item.id);
          }
        },
        { rootMargin: '-100px 0px -80% 0px' }
      );
      observer.observe(element);
      return observer;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, [toc]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setEmail('');
    }, 1500);
  };

  if (loading) return <div className="min-h-screen bg-dark text-white pt-32 px-6 text-center type-eyebrow animate-pulse">DECRYPTING FILE...</div>;
  if (!post) return <div className="min-h-screen bg-dark text-red-solid pt-32 px-6 text-center type-eyebrow">DOSSIER NOT FOUND</div>;

  const systemTags = ["#HubSpot", "#Clay", "#Zapier", "#RevOps"];

  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <figure className="relative my-16 group cursor-pointer">
            <div className="absolute -inset-2 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity transform -skew-x-6"></div>
            <img 
              src={urlFor(value).width(1200).url()} 
              alt={value.alt || 'System Visual'} 
              className="w-full h-auto object-cover relative z-10 border border-white/10"
            />
            {value.caption && (
              <figcaption className="font-mono text-xs mt-3 text-right opacity-50 uppercase tracking-widest relative z-10">
                FIG. , {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      youtube: ({ value }: any) => {
        if (!value?.url) return null;
        const id = getYouTubeId(value.url);
        if (!id) return null;
        return (
          <div className="my-16 relative aspect-video w-full border border-white/20 bg-dark shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        );
      },
      code: ({ value }: any) => (
        <div className="my-12 border border-white/20 bg-[#0a0a0a] relative overflow-hidden group">
          <div className="flex border-b border-white/20 bg-white/5 px-4 py-3 items-center justify-between">
            <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">{value.language || 'TERMINAL'}</span>
            <div className="flex gap-1.5">
               <div className="w-2 h-2 rounded-full bg-red-solid/50"></div>
               <div className="w-2 h-2 rounded-full bg-white/20"></div>
               <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
          </div>
          <pre className="p-6 overflow-x-auto text-sm md:text-base font-mono leading-relaxed">
            <code className="text-white/80">{value.code}</code>
          </pre>
        </div>
      ),
      table: ({ value }: any) => (
        <div className="my-16 overflow-x-auto border border-white/20 relative">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <tbody>
              {value.rows?.map((row: any, rIndex: number) => (
                <tr key={row._key} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                  {row.cells?.map((cell: any, cIndex: number) => {
                    const isHeader = rIndex === 0;
                    const CellTag = isHeader ? 'th' : 'td';
                    return (
                      <CellTag key={cIndex} className={`p-5 ${isHeader ? 'font-mono text-xs uppercase tracking-widest text-red-solid bg-dark/50 border-r border-white/10 last:border-r-0' : 'font-sans text-white/80 border-r border-white/10 last:border-r-0'}`}>
                        {cell}
                      </CellTag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    block: {
      normal: ({ children }: any) => <p className="font-sans text-lg md:text-xl text-white/70 leading-relaxed mb-8 font-light">{children}</p>,
      
      h2: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join('') || '';
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        
        const index = toc.findIndex((t: any) => t.id === id) + 1;
        const displayNum = index > 0 ? index.toString().padStart(2, '0') : '//';

        return (
          <h2 id={id} className="font-sans font-bold text-2xl md:text-3xl uppercase mt-20 mb-10 flex items-center gap-4 scroll-mt-32">
             <span className="bg-red-solid text-dark px-3 py-1 leading-none font-black text-xl md:text-2xl">
               {displayNum}
             </span>
             <span className="flex-1">{children}</span>
          </h2>
        );
      },
      h3: ({ children }: any) => <h3 className="font-sans font-bold text-xl md:text-2xl text-white/90 mt-16 mb-6 uppercase tracking-tight flex items-center gap-3"><span className="w-2 h-2 bg-white/20 block"></span>{children}</h3>,
      h4: ({ children }: any) => <h4 className="font-sans font-bold text-lg md:text-xl text-white/80 mt-12 mb-4 uppercase tracking-widest">{children}</h4>,
      
      blockquote: ({ children }: any) => (
        <div className="my-16 border-l-4 border-red-solid pl-6 py-2 bg-gradient-to-r from-red-solid/5 to-transparent">
          <p className="font-serif italic text-2xl md:text-3xl text-white/90 leading-relaxed">
            {children}
          </p>
        </div>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="font-sans text-lg md:text-xl text-white/70 leading-relaxed list-none pl-0 mb-12 space-y-4 font-light">{children}</ul>,
      number: ({ children }: any) => <ol className="font-sans text-lg md:text-xl text-white/70 leading-relaxed list-none pl-0 mb-12 space-y-8 font-light counter-reset-list">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="relative pl-8">
          <span className="absolute left-2 top-2.5 w-1.5 h-1.5 bg-red-solid rounded-sm" />
          {children}
        </li>
      ),
      number: ({ children, index }: any) => (
        <li className="relative pl-12 md:pl-16">
          <span className="absolute left-0 top-0 font-sans text-3xl md:text-4xl font-black text-red-solid/20 border-b-2 border-red-solid leading-none pb-1">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <div className="pt-2">{children}</div>
        </li>
      )
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
      link: ({ children, value }: any) => (
        <a href={value.href} className="text-white underline decoration-white/30 hover:text-red-solid hover:decoration-red-solid underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };

  return (
    <main className="min-h-screen bg-dark text-white font-sans selection:bg-white selection:text-dark pb-24 border-t border-white/10 relative overflow-x-hidden">
      
      {/* pt-32 clears the fixed global header */}
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Navigation Return Button */}
        <nav className="mb-8 relative z-20">
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> THE VAULT
          </Link>
        </nav>

        {/* --- 1. HERO SECTION --- */}
        <div className="relative mb-12 md:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Title Area - Left Side */}
            <div className="lg:col-span-7 flex flex-col justify-center z-20">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-black text-[clamp(2rem,4vw,4.5rem)] leading-[1.1] text-balance uppercase tracking-tighter text-white mb-6 break-words"
              >
                {post.title}
              </motion.h1>

              {/* Tags Column */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3 font-mono text-[10px] md:text-xs uppercase tracking-widest"
              >
                <span className="border border-white/20 px-3 py-1.5 hover:bg-white hover:text-dark transition-colors cursor-pointer bg-white/5">
                  #{post.servicePillar?.replace(/\s+/g, '') || 'SYSTEM'}
                </span>
                {systemTags.map((tag, idx) => (
                  <span key={idx} className="border border-white/20 px-3 py-1.5 hover:bg-white hover:text-dark transition-colors cursor-pointer bg-white/5">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Image Area - Right Side */}
            <div className="lg:col-span-5 relative z-10 w-full max-w-[450px] mx-auto lg:mx-0 lg:ml-auto">
              {post.mainImage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="relative aspect-square w-full border border-white/10 overflow-hidden bg-dark"
                >
                  <img 
                    src={urlFor(post.mainImage).width(1000).height(1000).url()} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                </motion.div>
              )}
            </div>

          </div>
        </div>

        {/* --- 2. ARTICLE META GRID --- */}
        <div className="border-y border-white/20 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20 mb-16 md:mb-24 bg-white/5 relative z-20">
          <div className="p-4 md:p-6 type-eyebrow text-white">
            <span className="block opacity-40 mb-2">AUTHOR</span>
            {post.authorName || 'SYSBILT TEAM'}
          </div>
          <div className="p-4 md:p-6 type-eyebrow text-white">
            <span className="block opacity-40 mb-2">DATE</span>
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).toUpperCase() : 'DRAFT'}
          </div>
          <div className="p-4 md:p-6 type-eyebrow text-white">
            <span className="block opacity-40 mb-2">READ TIME</span>
            12 MIN
          </div>
          <div className="p-4 md:p-6 flex items-center justify-center gap-6 text-white/50">
            <Share2 className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <MessageSquare className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <Eye className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* --- 3. CONTENT BODY --- */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <aside className="lg:col-span-3 hidden lg:block relative">
            <div className="sticky top-32 h-fit">
              <div className="font-mono text-xs border-l border-white/20 pl-5 space-y-5">
                <p className="type-eyebrow opacity-40 mb-8">CONTENTS // INDEX</p>
                {toc.length > 0 ? (
                  toc.map((item: any, idx: number) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block hover:translate-x-2 transition-all duration-300 ${
                        activeToc === item.id 
                          ? 'text-red-solid font-bold opacity-100' 
                          : 'text-white opacity-50 hover:opacity-100'
                      }`}
                    >
                      0{idx + 1}. {item.text}
                    </a>
                  ))
                ) : (
                  <span className="opacity-30">NO INDEX DETECTED</span>
                )}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5 prose-sysbilt">
            {post.seoDescription && (
              <p className="font-sans font-light text-2xl md:text-3xl leading-tight mb-16 text-white border-l-2 border-white pl-6 py-1">
                {post.seoDescription}
              </p>
            )}
            <div className="relative z-10 w-full overflow-hidden">
              <PortableText value={post.body} components={components} />
            </div>

            {/* --- INLINE CALL TO ACTION --- */}
            <div className="mt-20 border border-white/20 bg-white/5 p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-solid scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />
              
              <h3 className="font-sans font-black text-3xl md:text-4xl text-white uppercase tracking-tight mb-4">
                Deploy The <span className="text-red-solid">System.</span>
              </h3>
              <p className="font-sans text-white/70 font-light mb-8 max-w-md">
                Get architectural blueprints and technical teardowns delivered directly to your inbox. No noise, just raw intelligence.
              </p>
              
              {formStatus === 'success' ? (
                <div className="font-mono text-white text-sm font-bold border border-white/20 p-4 bg-white/10 text-center uppercase tracking-widest">
                   Access Granted.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={formStatus === 'loading'}
                    placeholder="CORPORATE EMAIL..."
                    className="flex-1 bg-dark border border-white/20 text-white px-4 py-4 font-mono text-xs uppercase focus:outline-none focus:border-red-solid placeholder:text-white/30 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="font-mono text-xs font-bold uppercase border border-white bg-white text-dark px-8 py-4 hover:bg-red-solid hover:text-white hover:border-red-solid transition-all duration-200"
                  >
                    {formStatus === 'loading' ? 'PROCESSING...' : 'INITIALIZE'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </article>

        {/* --- 4. RECOMMENDED READING GRID --- */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 border-t border-white/20 pt-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h3 className="type-eyebrow text-white/50 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-solid animate-pulse" />
                RELATED BLUEPRINTS
              </h3>
              <Link to="/blog" className="type-eyebrow text-white hover:text-red-solid transition-colors">
                VIEW ALL →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug.current} 
                  to={`/blog/${relatedPost.slug.current}`} 
                  className="group flex flex-col h-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                >
                  {relatedPost.mainImage && (
                    <div className="aspect-[16/9] border-b border-white/10 overflow-hidden relative">
                      <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={urlFor(relatedPost.mainImage).width(600).url()} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="type-eyebrow text-red-solid mb-4">
                      // {relatedPost.servicePillar || 'STRATEGY'}
                    </span>
                    <h4 className="font-sans font-black text-xl text-white uppercase leading-tight mb-4 group-hover:text-red-solid transition-colors line-clamp-3">
                      {relatedPost.title}
                    </h4>
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between type-eyebrow text-white/50">
                      <span>{relatedPost.publishedAt ? new Date(relatedPost.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') : 'DRAFT'}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}