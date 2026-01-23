import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, PenTool, Hammer, Flag, 
  CheckCircle2
} from 'lucide-react';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

interface ProcessPageProps {
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

const ProcessPage: React.FC<ProcessPageProps> = ({ onBack, onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-0 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col selection:bg-[#C5A059]/30"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-10">
        
        {/* NAV BACK */}
        <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HERO SECTION */}
        <Section className="mb-24 lg:mb-32">
          <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">/</span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
              THE PROCESS
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-[#1a1a1a] mb-8 md:mb-12">
            How I <span className="italic font-serif text-[#C5A059]">Work.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-2xl border-l-2 border-[#C5A059] pl-8 py-2">
            Every project follows the same four phases. You know what's happening, when it's happening, and what you'll get at the end.
          </p>
        </Section>

        {/* PHILOSOPHY */}
        <Section className="mb-24 md:mb-40">
          <div className="mb-16 text-center lg:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block">
              / PHILOSOPHY
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6">
              Principles I <span className="italic font-serif text-[#C5A059]">Work By.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                number: '01',
                title: 'Diagnose Before You Prescribe',
                body: "I don't start building until I understand the problem. Most tech projects fail because someone jumped to solutions without understanding the real issue.",
                icon: Search
              },
              {
                number: '02',
                title: 'Small Bets, Fast Feedback',
                body: 'I work in short sprints. You see progress in days, not months. If something's wrong, we catch it early and fix it cheap.',
                icon: CheckCircle2
              },
              {
                number: '03',
                title: 'Handover Is Not Optional',
                body: "A system your team can't use is worthless. Every project includes training and documentation. I don't leave until it's working.",
                icon: Flag
              },
              {
                number: '04',
                title: 'Simple Beats Clever',
                body: 'I could build something impressive that only I understand. But I build something simple that your team can run without me.',
                icon: PenTool
              }
            ].map((principle, idx) => (
              <Section key={principle.number} delay={idx * 0.1} className="group bg-white p-8 md:p-12 border border-[#1a1a1a]/5 hover:border-[#1a1a1a]/20 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1a1a1a] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left will-change-transform" />
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] transition-colors">
                    {principle.number}
                  </span>
                  <principle.icon className="w-6 h-6 text-[#1a1a1a]/20 group-hover:text-[#C5A059] transition-colors" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-4 leading-tight tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                  {principle.title}
                </h3>
                <p className="font-sans text-lg font-light text-[#1a1a1a]/70 leading-relaxed">
                  {principle.body}
                </p>
              </Section>
            ))}
          </div>
        </Section>

        {/* THE 4 PHASES */}
        <Section className="mb-32">
          <div className="mb-20 text-center lg:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-6 block">
              / THE PHASES
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6">
              Four Steps. <span className="italic font-serif text-[#C5A059]">No Mystery.</span>
            </h2>
          </div>

          <div className="space-y-16">
            {[
              {
                number: '01',
                title: 'Diagnose',
                duration: '1 to 2 weeks',
                body: "Before I build anything, I need to understand how your business actually works. Not how you think it works. How it actually works.",
                whatHappens: [
                  'I interview you and your team',
                  'I map your current tools and processes',
                  'I identify where time and money are leaking',
                  'I find the friction that's burning out your people'
                ],
                whatYouGet: [
                  'A clear picture of the problem',
                  'Prioritised list of fixes',
                  'Honest assessment of what's worth doing'
                ],
                icon: Search,
                color: 'text-[#E21E3F]',
                borderColor: 'border-[#E21E3F]'
              },
              {
                number: '02',
                title: 'Design',
                duration: '1 to 2 weeks',
                body: "Now I design the solution. You'll see exactly what I'm going to build before I write a single line of code.",
                whatHappens: [
                  'I create wireframes and flowcharts',
                  'I spec out every integration',
                  'I define what success looks like',
                  'We agree on scope and timeline'
                ],
                whatYouGet: [
                  'Visual blueprint of the system',
                  'Clear scope document',
                  'Fixed price quote',
                  'No surprises later'
                ],
                icon: PenTool,
                color: 'text-[#C5A059]',
                borderColor: 'border-[#C5A059]'
              },
              {
                number: '03',
                title: 'Build',
                duration: '2 to 4 weeks',
                body: 'This is where the work happens. I build in sprints so you see progress weekly, not just at the end.',
                whatHappens: [
                  'I build the core system',
                  'I connect your tools',
                  'I test everything',
                  'You review and give feedback'
                ],
                whatYouGet: [
                  'Working system',
                  'Weekly progress updates',
                  'Ability to course-correct early',
                  'No big reveal disasters'
                ],
                icon: Hammer,
                color: 'text-[#C5A059]',
                borderColor: 'border-[#C5A059]'
              },
              {
                number: '04',
                title: 'Handover',
                duration: '1 to 2 weeks',
                body: "The system is only valuable if your team uses it. This phase makes sure they do.",
                whatHappens: [
                  'I train your team (live and recorded)',
                  'I write documentation',
                  'I fix any issues that surface',
                  'I confirm adoption before I leave'
                ],
                whatYouGet: [
                  'Training videos your team can rewatch',
                  'Written documentation',
                  'Full system access',
                  'Confidence it actually works'
                ],
                icon: Flag,
                color: 'text-[#C5A059]',
                borderColor: 'border-[#C5A059]'
              }
            ].map((phase, idx) => (
              <Section key={phase.number} delay={idx * 0.1} className="bg-white p-8 md:p-12 border-l-4 border-[#1a1a1a]/10 hover:border-[#C5A059] transition-all duration-300 rounded-sm shadow-sm">
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-16 h-16 rounded-full border-2 ${phase.borderColor} flex items-center justify-center flex-shrink-0`}>
                    <phase.icon className={`w-8 h-8 ${phase.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60">
                        PHASE {phase.number}
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                        {phase.duration}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-4 tracking-tighter">
                      {phase.title}
                    </h3>
                    <p className="font-sans text-lg font-light text-[#1a1a1a]/70 leading-relaxed mb-6">
                      {phase.body}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-[#1a1a1a]/10">
                  <div>
                    <h4 className="font-serif text-xl text-[#1a1a1a] mb-4 tracking-tighter">What happens:</h4>
                    <ul className="space-y-2">
                      {phase.whatHappens.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 flex-shrink-0" />
                          <span className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-[#1a1a1a] mb-4 tracking-tighter">What you get:</h4>
                    <ul className="space-y-2">
                      {phase.whatYouGet.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 flex-shrink-0" />
                          <span className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </Section>

        {/* TIMELINE SUMMARY */}
        <Section className="mb-24 md:mb-32">
          <div className="bg-white p-8 md:p-12 border border-[#1a1a1a]/5 rounded-sm">
            <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-8 tracking-tighter">
              Timeline Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#1a1a1a]/10">
                    <th className="text-left py-4 px-4 font-serif text-lg text-[#1a1a1a]">Phase</th>
                    <th className="text-left py-4 px-4 font-serif text-lg text-[#1a1a1a]">Duration</th>
                    <th className="text-left py-4 px-4 font-serif text-lg text-[#1a1a1a]">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { phase: 'Diagnose', duration: '1 to 2 weeks', output: 'Problem map, priority list' },
                    { phase: 'Design', duration: '1 to 2 weeks', output: 'Blueprint, fixed quote' },
                    { phase: 'Build', duration: '2 to 4 weeks', output: 'Working system' },
                    { phase: 'Handover', duration: '1 to 2 weeks', output: 'Training, docs, full access' }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[#1a1a1a]/5">
                      <td className="py-4 px-4 font-sans text-base text-[#1a1a1a]">{row.phase}</td>
                      <td className="py-4 px-4 font-sans text-base text-[#1a1a1a]/70">{row.duration}</td>
                      <td className="py-4 px-4 font-sans text-base text-[#1a1a1a]/70">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 font-sans text-base text-[#1a1a1a]/70">
              <strong>Total typical project:</strong> 5 to 10 weeks
            </p>
          </div>
        </Section>

        {/* FAQ */}
        <Section className="mb-24 md:mb-32">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E21E3F] mb-6 block">
              / FAQ
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-[#1a1a1a] mb-8">
              Common <span className="italic font-serif text-[#C5A059]">Questions.</span>
            </h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                q: 'How much does it cost?',
                a: "Every project is different. After the Diagnose phase, you get a fixed price for the rest. No hourly billing, no scope creep surprises."
              },
              {
                q: "What if I need changes mid-project?",
                a: "Small tweaks are included. Big changes get a separate quote. Either way, you know the cost before I do the work."
              },
              {
                q: 'Can I skip the Diagnose phase?',
                a: "Not recommended. Most failed projects skip this step. But if you have clear documentation and know exactly what you need, we can talk."
              },
              {
                q: "What if I'm not happy with the result?",
                a: "We catch problems early because you see progress weekly. If something's not right at handover, I fix it before I invoice the final payment."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-8 border border-[#1a1a1a]/5 rounded-sm">
                <h4 className="font-serif text-xl md:text-2xl text-[#1a1a1a] mb-4 tracking-tighter">
                  {faq.q}
                </h4>
                <p className="font-sans text-base md:text-lg font-light text-[#1a1a1a]/70 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* BOTTOM CTA */}
        <Section className="mb-24">
          <div className="bg-[#1a1a1a] text-white p-12 md:p-24 text-center relative overflow-hidden rounded-sm group cursor-default">
            <div className="relative z-10 flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-[0.2em] mb-6 block">
                / READY TO START
              </span>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter text-white mb-6">
                Ready to <span className="italic font-serif text-[#C5A059]">start?</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/60 mb-12 max-w-2xl leading-relaxed">
                Book a call and we'll figure out if your project is a good fit for this process.
              </p>
              
              <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                [ BOOK A CALL ]
              </CTAButton>
            </div>
          </div>
        </Section>
      </div>
    </motion.div>
  );
};

export default ProcessPage;
