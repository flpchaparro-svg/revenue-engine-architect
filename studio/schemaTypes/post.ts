import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Insight (Blog Post)', // Renamed from System Log
  type: 'document',
  groups: [
    {name: 'core', title: 'Core Setup', default: true},
    {name: 'content', title: 'Article Content'},
    {name: 'seo', title: 'Targeting & Funnel'}, 
    {name: 'meta', title: 'Meta & Author'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'core',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'core',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    // --- THE NEW FEATURED TOGGLE ---
    defineField({
      name: 'isFeatured',
      title: '🌟 Featured Insight (High Converter)',
      type: 'boolean',
      group: 'core',
      description: 'Turn this on to pin this post to the top of the blog as a primary, high-converting case study or insight.',
      initialValue: false,
    }),
    defineField({
      name: 'servicePillar',
      title: 'Service Pillar',
      type: 'string',
      group: 'core',
      options: {
        list: [
          'Websites & E-commerce', 'CRM & Lead Tracking', 'Automation', 
          'AI Assistants', 'Content Systems', 'Team Training', 'Dashboards & Reporting'
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Visual (Optional)',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'marketingFunnelStage',
      title: 'Marketing Funnel Stage',
      type: 'string',
      group: 'seo',
      options: {
        list: ['Awareness', 'Consideration', 'Decision', 'Retention'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'businessPhase',
      title: 'Client Business Phase',
      type: 'string',
      group: 'seo',
      options: {
        list: ['Get Clients', 'Scale Faster', 'See Clearly'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'targetPersona',
      title: 'Target Persona',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          { title: '--- MACRO: BUSINESS STAGE PERSONAS ---', value: '' },
          { title: 'Stage 1: The Growth Seeker (Get Clients)', value: 'The Growth Seeker' },
          { title: 'Stage 2: The Scaling Bottleneck (Scale Faster)', value: 'The Scaling Bottleneck' },
          { title: 'Stage 3: The Blind Enterprise (See Clearly)', value: 'The Blind Enterprise' },
          { title: '--- PILLAR 1: THE FACE ---', value: '' },
          { title: 'P1: The Urgency Operator', value: 'The Urgency Operator' },
          { title: 'P1: The Inventory Chaos Founder', value: 'The Inventory Chaos Founder' },
          { title: 'P1: The Precision Builder', value: 'The Precision Builder' },
          { title: 'P1: The Aesthetic Absolutist', value: 'The Aesthetic Absolutist' },
          { title: '--- PILLAR 2: THE BRAIN ---', value: '' },
          { title: 'P2: The Overwhelmed Operator', value: 'The Overwhelmed Operator' },
          { title: 'P2: The Blind Scaler', value: 'The Blind Scaler' },
          { title: 'P2: The Hamster Wheel Merchant', value: 'The Hamster Wheel Merchant' },
          { title: 'P2: The Tangled Executive', value: 'The Tangled Executive' },
          { title: '--- PILLAR 3: THE MUSCLE ---', value: '' },
          { title: 'P3: The Paperwork Prisoner', value: 'The Paperwork Prisoner' },
          { title: 'P3: The Blind Signal Hunter', value: 'The Blind Signal Hunter' },
          { title: 'P3: The Time-Poor Thought Leader', value: 'The Time-Poor Thought Leader' },
          { title: 'P3: The Onboarding Bottleneck', value: 'The Onboarding Bottleneck' },
          { title: '--- PILLAR 4: THE VOICE ---', value: '' },
          { title: 'P4: The High-Ticket Architect', value: 'The High-Ticket Architect' },
          { title: 'P4: The Bottleneck Boss', value: 'The Bottleneck Boss' },
          { title: 'P4: The Compliance Stronghold', value: 'The Compliance Stronghold' },
          { title: 'P4: The Muddy Hands Operator', value: 'The Muddy Hands Operator' },
          { title: '--- PILLAR 5: THE PRESENCE ---', value: '' },
          { title: 'P5: The Technical Artisan', value: 'The Technical Artisan' },
          { title: 'P5: The Frustrated Authority', value: 'The Frustrated Authority' },
          { title: 'P5: The Sunday Grind Victim', value: 'The Sunday Grind Victim' },
          { title: 'P5: The Campaign Velocity Lead', value: 'The Campaign Velocity Lead' },
          { title: '--- PILLAR 6: THE SOUL ---', value: '' },
          { title: 'P6: The Deskless Fleet Manager', value: 'The Deskless Fleet Manager' },
          { title: 'P6: The High-Churn Operator', value: 'The High-Churn Operator' },
          { title: 'P6: The Operational Clarity Seeker', value: 'The Operational Clarity Seeker' },
          { title: 'P6: The Burned-Out Ops Manager', value: 'The Burned-Out Ops Manager' },
          { title: '--- PILLAR 7: THE EYES ---', value: '' },
          { title: 'P7: The Blinded Executive', value: 'The Blinded Executive' },
          { title: 'P7: The Traffic-Rich, Profit-Poor Owner', value: 'The Traffic-Rich, Profit-Poor Owner' },
          { title: 'P7: The Anxious CFO', value: 'The Anxious CFO' },
          { title: 'P7: The Siloed Organization Lead', value: 'The Siloed Organization Lead' }
        ],
      },
    }),
    defineField({
      name: 'internalLinkDestination',
      title: 'Internal Link Routing',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          {title: 'Pillar 1: Websites', value: '/system/pillar1'},
          {title: 'Pillar 2: CRM', value: '/system/pillar2'},
          {title: 'Pillar 3: Automation', value: '/system/pillar3'},
          {title: 'Pillar 4: AI Assistants', value: '/system/pillar4'},
          {title: 'Pillar 5: Content Systems', value: '/system/pillar5'},
          {title: 'Pillar 6: Team Training', value: '/system/pillar6'},
          {title: 'Pillar 7: Dashboards', value: '/system/pillar7'},
        ],
      },
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      group: 'seo',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      to: {type: 'author'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      group: 'meta',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', pillar: 'servicePillar' },
    prepare(selection) {
      const {pillar} = selection
      return {...selection, subtitle: `${pillar || 'UNASSIGNED'}`}
    },
  },
})