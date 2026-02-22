import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../src/sanityClient';
import { PortableText } from '@portabletext/react';
import PillarRobot from '../components/PillarRobot';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0] {
          title,
          mainImage,
          publishedAt,
          body,
          servicePillar,
          "authorName": author->name
        }`,
        { slug }
      )
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-black text-white pt-32 px-6 text-center font-mono text-zinc-500">LOADING LOG...</div>;
  if (!post) return <div className="min-h-screen bg-black text-white pt-32 px-6 text-center font-mono text-red-500">LOG NOT FOUND</div>;

  // --- THEME ENGINE ---
  const getPostTheme = (pillar: string) => {
    const isRed = ['Websites & E-commerce', 'CRM & Lead Tracking', 'Automation'].includes(pillar);
    const isGold = ['AI Assistants', 'Content Systems', 'Team Training'].includes(pillar);
    const isHighlight = pillar === 'Dashboards & Reporting';

    if (isRed) {
      return {
        accentClass: 'text-red-text',
        tagClass: 'border-red-solid/20 bg-red-solid/5 text-red-text',
        borderClass: 'border-red-text',
        hexColor: '#ef4444'
      };
    }
    if (isGold) {
      return {
        accentClass: 'text-gold-on-cream',
        tagClass: 'border-gold/20 bg-gold/5 text-gold-on-cream',
        borderClass: 'border-gold-on-cream',
        hexColor: '#D4AF37'
      };
    }
    if (isHighlight) {
      return {
        accentClass: 'bg-white text-black px-2',
        tagClass: 'bg-white text-black border-white',
        borderClass: 'border-white',
        hexColor: '#ffffff'
      };
    }
    return {
      accentClass: 'text-white/50',
      tagClass: 'border-white/20 bg-white/5 text-white/50',
      borderClass: 'border-white/20',
      hexColor: '#E4E4E7'
    };
  };

  const theme = getPostTheme(post.servicePillar);

  // --- CUSTOM RENDERER FOR AMANDA'S TEXT & GRAPHS ---
  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <figure className="my-12 relative z-10">
            <img 
              src={urlFor(value).width(900).url()} 
              alt={value.alt || 'System Log Visual'} 
              className="w-full rounded-lg border border-white/10 shadow-2xl"
            />
            {value.caption && (
              <figcaption className="mt-4 text-center font-mono text-xs text-zinc-500 uppercase tracking-widest">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      }
    },
    block: {
      normal: ({ children }: any) => <p className="text-zinc-400 leading-relaxed mb-6 text-lg">{children}</p>,
      h1: ({ children }: any) => <h1 className="text-4xl font-bold text-white mt-12 mb-6 tracking-tight">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-3xl font-bold text-white mt-10 mb-5 tracking-tight">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h3>,
      blockquote: ({ children }: any) => <blockquote className={`border-l-2 pl-6 italic text-zinc-300 my-8 py-2 ${theme.borderClass}`}>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-2 marker:text-zinc-600">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 text-zinc-400 mb-6 space-y-2 marker:text-zinc-600">{children}</ol>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="text-white font-medium">{children}</strong>,
      link: ({ children, value }: any) => (
        <a href={value.href} className={`${theme.accentClass} underline decoration-white/30 hover:opacity-80 transition-colors`} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-zinc-500 hover:text-white font-mono text-sm mb-12 inline-flex items-center transition-colors relative z-20">
          <span className="mr-2">←</span> BACK TO SYSTEM LOGS
        </Link>
        
        <article>
          {/* --- HEADER BLOCK --- */}
          <div className={`mb-12 border-b-2 pb-12 ${theme.borderClass}`}>
            
            {/* The Badge */}
            <div className={`inline-block px-3 py-1 border rounded-full text-xs font-mono uppercase tracking-wider mb-6 ${theme.tagClass}`}>
              {post.servicePillar || 'GENERAL LOG'}
            </div>
            
            {/* The Flex Container: Keeps Title and Robot aligned beautifully */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter flex-1">
                {post.title}
              </h1>
              
              {/* The Robot properly sized and passed the correct Hex Color */}
              <PillarRobot 
                pillar={post.servicePillar} 
                themeColor={theme.hexColor} 
              />
            </div>

            {/* Meta Data */}
            <div className="flex items-center text-sm font-mono text-zinc-500">
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'DRAFT'}</span>
              <span className="mx-2">//</span>
              <span>{post.authorName || 'SYSTEM'}</span>
            </div>
          </div>

          {/* MAIN HERO IMAGE */}
          {post.mainImage && (
            <div className="mb-12 rounded-xl overflow-hidden border border-white/10 relative z-10">
              <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} className="w-full h-auto" />
            </div>
          )}

          {/* ARTICLE BODY */}
          <div className="max-w-none relative z-10">
            <PortableText value={post.body} components={components} />
          </div>
        </article>
      </div>
    </main>
  );
}