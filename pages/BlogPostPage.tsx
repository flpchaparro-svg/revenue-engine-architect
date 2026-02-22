import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../src/sanityClient';
import { PortableText } from '@portabletext/react';
import PillarRobot from '../components/PillarRobot';

const RED_GROUP = ['Websites & E-commerce', 'CRM & Lead Tracking', 'Automation'];
const GOLD_GROUP = ['AI Assistants', 'Content Systems', 'Team Training'];
const HIGHLIGHT_GROUP = ['Dashboards & Reporting'];

function getPostTheme(servicePillar: string | null | undefined) {
  if (!servicePillar) {
    return {
      accentClass: 'text-white/70',
      tagClass: 'border-white/20 bg-white/5 text-white/50',
      borderClass: 'border-white/30',
    };
  }
  if (RED_GROUP.includes(servicePillar)) {
    return {
      accentClass: 'text-red-text',
      tagClass: 'border-red-solid/20 bg-red-solid/5 text-red-text',
      borderClass: 'border-red-text',
    };
  }
  if (GOLD_GROUP.includes(servicePillar)) {
    return {
      accentClass: 'text-gold-on-cream',
      tagClass: 'border-gold/20 bg-gold/5 text-gold-on-cream',
      borderClass: 'border-gold-on-cream',
    };
  }
  if (HIGHLIGHT_GROUP.includes(servicePillar)) {
    return {
      accentClass: 'bg-white text-black px-2',
      tagClass: 'bg-white text-black border-white',
      borderClass: 'border-white',
    };
  }
  return {
    accentClass: 'text-white/70',
    tagClass: 'border-white/20 bg-white/5 text-white/50',
    borderClass: 'border-white/30',
  };
}

interface BlogPostPageProps {
  onNavigate?: (view: string, sectionId?: string) => void;
}

export default function BlogPostPage({ onNavigate }: BlogPostPageProps) {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0] { title, mainImage, publishedAt, body, servicePillar, "authorName": author->name }`,
        { slug }
      )
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-dark text-white pt-32 pb-20 px-6 flex items-center justify-center">
        <p className="font-mono text-sm text-zinc-500">LOADING LOG...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-dark text-white pt-32 pb-20 px-6 flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-sm text-zinc-500">LOG NOT FOUND</p>
        <Link to="/blog" className="font-mono text-xs text-gold-on-dark hover:opacity-80">
          ← BACK TO LOGS
        </Link>
      </main>
    );
  }

  const theme = getPostTheme(post.servicePillar);

  const components = {
    block: {
      normal: ({ children }: any) => <p className="mb-6 text-white/80 leading-relaxed">{children}</p>,
      h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-10 mb-4 text-white">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-3 text-white">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-2 text-white">{children}</h3>,
      blockquote: ({ children }: any) => (
        <blockquote className={`border-l-2 pl-6 italic text-white/70 my-6 ${theme.borderClass}`}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6">{children}</ol>,
    },
    marks: {
      strong: ({ children }: any) => <strong>{children}</strong>,
      link: ({ children, value }: any) => (
        <a
          href={value?.href}
          className={`${theme.accentClass} underline hover:opacity-80`}
          target={value?.blank ? '_blank' : undefined}
          rel={value?.blank ? 'noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <main className="min-h-screen bg-dark text-white pt-32 pb-20 px-6 md:px-12">
      <article className="max-w-3xl mx-auto">
        <div className={`relative mb-12 border-b border-white/10 border-t-2 pb-12 ${theme.borderClass}`}>
          <PillarRobot
            pillar={post.servicePillar ?? ''}
            themeColor={
              theme.accentClass.includes('red')
                ? '#ef4444'
                : theme.accentClass.includes('gold')
                  ? '#D4AF37'
                  : '#ffffff'
            }
          />
          <div className={`inline-block px-3 py-1 border rounded-full text-xs font-mono uppercase tracking-wider mb-6 ${theme.tagClass}`}>
            {post.servicePillar || 'GENERAL LOG'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{post.title}</h1>
          <div className="flex items-center text-sm font-mono text-zinc-500">
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'DRAFT'}</span>
            <span className="mx-2">//</span>
            <span>{post.authorName || 'SYSTEM'}</span>
          </div>
        </div>
        {post.mainImage && (
          <div className="mb-12 rounded-xl overflow-hidden border border-white/10">
            <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} className="w-full h-auto" />
          </div>
        )}
        <div className="max-w-none">
          <PortableText value={post.body} components={components} />
        </div>
      </article>
    </main>
  );
}
