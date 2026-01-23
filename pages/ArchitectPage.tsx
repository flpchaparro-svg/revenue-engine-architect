import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Globe, Zap, Clock,
  User, DollarSign, Key, Users
} from 'lucide-react';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

interface ArchitectPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const Section: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ArchitectPage: React.FC<ArchitectPageProps> = ({ onBack, onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] relative z-[150] flex flex-col selection:bg-[#C5A059]/30"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-10">
        
        <div className="flex justify-between items-center mb-12 md:mb-20 pt-24 relative z-[200]">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HERO SECTION */}
        <Section className="mb-24 md:mb-32">
          <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">/</span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">THE ARCHITECT</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-6 md:mb-10 max-w-5xl">
            One Person.<br />
            <span className="italic font-serif text-[#C5A059]">Ten Person Output.</span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-8 py-2">
            No account managers. No junior handoffs. No endless meetings. You talk directly to the person building your system.
          </p>
        </Section>

        {/* ORIGIN STORY */}
        <Section className="mb-24 md:mb-32">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block">
              / ORIGIN
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              I've Run Businesses. <span className="italic font-serif text-[#C5A059]">Not Just Consulted Them.</span>
            </h2>
          </div>
          
          <div className="space-y-6 font-sans text-base md:text-lg font-light text-[#1a1a1a]/70 leading-relaxed max-w-3xl">
            <p>
              Before I built systems for others, I ran my own.
            </p>
            <p>
              I managed a café where I learned that good coffee means nothing if your processes are broken. I watched talented baristas burn out because nobody automated the ordering, the rostering, or the stock counts. I was the one doing invoices at midnight.
            </p>
            <p>
              I worked in an international franchise where I saw how the right systems let one person manage what usually takes five. And I worked factory floors where I learned that the fanciest software is useless if the people using it weren't trained properly.
            </p>
            <p>
              I moved to Australia from Chile, which means I learned to build things with less. No big budgets, no safety nets. Just figure it out and make it work.
            </p>
            <p>
              Now I take everything I learned the hard way and apply it to your business. I don't give you theory from a textbook. I give you what actually works when you're the one answering the phone, chasing the invoice, and fixing the problem at 9pm on a Sunday.
            </p>
          </div>
        </Section>

        {/* CREDENTIALS */}
        <Section className="mb-24 md:mb-32">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
              / CREDENTIALS
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              The Boring Stuff That Proves <span className="italic font-serif text-[#C5A059]">I Know What I'm Doing.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Certifications', value: '24+', subtitle: 'HubSpot, Google, Meta, and more', icon: Award },
              { label: 'Experience', value: '10+ Years', subtitle: 'Building systems that work', icon: Clock },
              { label: 'Location', value: 'Sydney, Australia', subtitle: 'Working with AU and NZ businesses', icon: Globe },
              { label: 'Response Time', value: 'Same Day', subtitle: 'No waiting for account managers', icon: Zap }
            ].map((cred, i) => (
              <div key={i} className="bg-white p-6 border border-[#1a1a1a]/5 rounded-sm hover:border-[#C5A059] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <cred.icon className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60">
                    {cred.label}
                  </span>
                </div>
                <div className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-2 tracking-tighter">
                  {cred.value}
                </div>
                <p className="font-sans text-sm text-[#1a1a1a]/60">
                  {cred.subtitle}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* HOW I WORK */}
        <Section className="mb-24 md:mb-32">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block">
              / HOW I WORK
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              What Makes <span className="italic font-serif text-[#C5A059]">This Different.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: 'Direct Access', 
                body: 'You talk to me. Not a salesperson, not a project manager, not an offshore team. The person you call is the person who builds.',
                icon: User
              },
              { 
                title: 'Fixed Price Sprints', 
                body: 'No hourly billing that punishes you for asking questions. You know the cost before we start, and it doesn't change.',
                icon: DollarSign
              },
              { 
                title: 'You Own Everything', 
                body: 'No lock-in contracts. No proprietary systems you can't leave. I hand over full access, training, and documentation.',
                icon: Key
              },
              { 
                title: 'Adoption Built In', 
                body: "I don't disappear after the build. I stay until your team actually uses the system. Otherwise, what's the point?",
                icon: Users
              }
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 border border-[#1a1a1a]/5 rounded-sm hover:border-[#C5A059] hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#C5A059]/10 flex items-center justify-center rounded-sm">
                    <card.icon className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] tracking-tighter">
                    {card.title}
                  </h3>
                </div>
                <p className="font-sans text-base md:text-lg font-light text-[#1a1a1a]/70 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* TOOLS I USE */}
        <Section className="mb-24 md:mb-32">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
              / TOOLKIT
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-4">
              The <span className="italic font-serif text-[#C5A059]">Stack.</span>
            </h2>
            <p className="font-sans text-lg md:text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-2xl mb-8">
              I'm not married to any one tool. I pick what works for your business and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: 'Websites', tools: 'Webflow, Framer, WordPress, Shopify, Next.js' },
              { category: 'CRM', tools: 'HubSpot, Pipedrive, Zoho, Monday' },
              { category: 'Automation', tools: 'Make, Zapier, n8n, custom code' },
              { category: 'AI', tools: 'OpenAI, Claude, Vapi, custom agents' },
              { category: 'Analytics', tools: 'Google Analytics, Looker Studio, Metabase' },
              { category: 'Mail', tools: 'Mailchimp, Klaviyo, ConvertKit' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 border border-[#1a1a1a]/5 rounded-sm">
                <h4 className="font-serif text-xl text-[#1a1a1a] mb-3 tracking-tighter">
                  {item.category}
                </h4>
                <p className="font-sans text-sm text-[#1a1a1a]/70 leading-relaxed">
                  {item.tools}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA SECTION */}
        <Section className="border-t border-black/10 py-32 flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl tracking-tighter mb-6">
            Want to see if we're a <span className="italic font-serif text-[#C5A059]">good fit?</span>
          </h2>
          <p className="font-sans text-lg md:text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-2xl mb-12">
            Book a 15-minute call. No pitch, no pressure. Just a conversation about what you need and whether I can help.
          </p>
          <CTAButton theme="light" onClick={() => onNavigate('contact')}>
            [ BOOK A CALL ]
          </CTAButton>
        </Section>
      </div>
    </motion.div>
  );
};

export default ArchitectPage;
