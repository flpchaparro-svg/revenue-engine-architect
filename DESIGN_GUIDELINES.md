# Design Guidelines — SYSBILT

**Version:** 2.0 (Accessibility Compliant)  
**Last Updated:** February 4, 2026  
**Status:** Production Ready

Single source of truth for design tokens, typography, layout, and components. Use this when adding new sections or redesigning existing ones.

---

## Table of Contents

1. [Brand Colours](#1-brand-colours)
2. [Typography](#2-typography)
3. [Spacing & Layout](#3-spacing--layout)
4. [Icons](#4-icons)
5. [Buttons](#5-buttons)
6. [Borders & Radius](#6-borders--radius)
7. [Z-Index](#7-z-index)
8. [Breakpoints](#8-breakpoints)
9. [Motion & Transitions](#9-motion--transitions)
10. [Reusable Patterns](#10-reusable-patterns-for-new-sections)
11. [Files to Touch](#11-files-to-touch-when-changing-design)
12. [Quick Reference Cheat Sheet](#12-quick-reference-cheat-sheet)

---

## 1. Brand Colours

### Primary Palette (Backgrounds)

| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| **Cream** (page bg) | `#FFF2EC` | `bg-cream`, `text-cream` | Default page background |
| **Cream light** | `#FFF8F5` | `cream-light` | Subtle variation |
| **Cream warm** | `#FFF9F0` | `cream-warm` | Cards, warm highlights |
| **Off-white** | `#FAFAFA` | `off-white` | Card backgrounds, nav |
| **White** | `#FFFFFF` | `white` | Cards, modals |
| **Dark** (ink) | `#1a1a1a` | `dark`, `text-dark` | Primary text, headings, buttons |

---

### Red Scale (GET CLIENTS / Phase 01)

| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| **Red text** | `#9A1730` | `text-red-text` | ✅ Readable red text on cream |
| **Red solid** | `#E21E3F` | `text-red-solid` | ⚠️ Decorative only: icons, borders, large display |
| **Red on dark** | `#FF6B6B` | `text-red-on-dark` | ✅ Readable red on dark backgrounds |

**Contrast Ratios on Cream (#FFF2EC):**

| Class | Ratio | Status |
|-------|-------|--------|
| `text-red-text` (#9A1730) | 7.2:1 | ✅ Passes WCAG AA & AAA |
| `text-red-solid` (#E21E3F) | ~2.8:1 | ❌ Fails for readable text |

**Rule:** If users *read* it → `text-red-text`. If decorative (icons, borders, backgrounds) → `text-red-solid`.

---

### Gold Scale (SCALE FASTER / Phase 02, Highlights)

| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| **Gold** | `#C5A059` | `text-gold`, `bg-gold` | ⚠️ Decorative only: icons, borders, backgrounds, display 72px+ |
| **Gold on cream** | `#8B6914` | `text-gold-on-cream` | ✅ Readable text: headlines, titles, labels, nav on cream |
| **Gold on dark** | `#D4A84B` | `text-gold-on-dark` | ✅ Readable gold on dark backgrounds |
| **Gold muted** | `#7A5D12` | `text-gold-muted` | Secondary labels (darker variant) |

**Contrast Ratios on Cream (#FFF2EC):**

| Class | Ratio | Status |
|-------|-------|--------|
| `text-gold` (#C5A059) | ~3.2:1 | ❌ Fails for readable text |
| `text-gold-on-cream` (#8B6914) | 4.8:1 | ✅ Passes WCAG AA |
| `text-gold-muted` (#7A5D12) | 5.5:1 | ✅ Passes WCAG AA |

**Contrast Ratios on Dark (#1a1a1a):**

| Class | Ratio | Status |
|-------|-------|--------|
| `text-gold-on-dark` (#D4A84B) | 8.1:1 | ✅ Passes WCAG AA & AAA |

**Rule:** If users *read* it → `text-gold-on-cream`. If decorative (large display 72px+, icons, borders) → `text-gold`.

---

### Other Colours

| Token | Hex | Tailwind | Use |
|-------|-----|----------|-----|
| **Teal** | `#0F766E` | `teal`, `text-teal` | Evidence vault, "AFTER" badge |

---

### CSS Variables (in `src/index.css`)

Same values exposed as `:root` variables:

```css
:root {
  --bg: #FFF2EC;
  --ink: #1a1a1a;
  --cream: #FFF2EC;
  --dark: #1a1a1a;
  --off-white: #FAFAFA;
  --white: #FFFFFF;
  
  /* Red Scale */
  --red: #9A1730;
  --red-solid: #E21E3F;
  --red-text: #9A1730;
  --red-on-dark: #FF6B6B;
  
  /* Gold Scale */
  --gold: #C5A059;
  --gold-on-cream: #8B6914;
  --gold-on-dark: #D4A84B;
  --gold-muted: #7A5D12;
}
```

---

### Accessibility — Text on Cream (#FFF2EC)

| Purpose | Class | Contrast | Status |
|---------|-------|----------|--------|
| Primary text | `text-dark` | 15.2:1 | ✅ Safe |
| Secondary text | `text-dark/70` | ~7.5:1 | ✅ Safe |
| Muted text | `text-dark/60` | ~5.5:1 | ✅ Minimum safe |
| Red labels | `text-red-text` | 7.2:1 | ✅ Safe |
| Gold labels | `text-gold-on-cream` | 4.8:1 | ✅ Safe |

---

### Accessibility — Text on Dark (#1a1a1a)

| Purpose | Class | Contrast | Status |
|---------|-------|----------|--------|
| Primary text | `text-white` | 15.2:1 | ✅ Safe |
| Secondary text | `text-white/80` | ~9.5:1 | ✅ Safe |
| Muted text | `text-white/70` | ~7.5:1 | ✅ Minimum safe |
| Red labels | `text-red-on-dark` | 6.2:1 | ✅ Safe |
| Gold labels | `text-gold-on-dark` | 8.1:1 | ✅ Safe |

---

### ⚠️ Common Mistakes — DO NOT USE

**On cream backgrounds:**
- ❌ `text-dark/50` or lower (3.8:1 — fails WCAG)
- ❌ `text-dark/40` (3.0:1 — fails WCAG)
- ❌ `text-gold` for readable text (use `text-gold-on-cream`)
- ❌ `text-red-solid` for readable text (use `text-red-text`)

**On dark backgrounds:**
- ❌ `text-white/60` or lower for body text (fails WCAG for small text)
- ❌ `text-white/50` (4.8:1 — fails for body text)

**The Rule:**
> If humans need to READ it → minimum `/60` on cream, `/70` on dark.  
> If decorative (icons, borders, ghost numbers) → any opacity is fine.

---

## 2. Typography

### Font Stacks

| Type | Font | Tailwind | Use |
|------|------|----------|-----|
| **Sans** | Inter → system UI | `font-sans` | Body text, UI elements |
| **Serif** | Lora → Georgia → Times | `font-serif` | Headings, display text |
| **Mono** | System monospace | `font-mono` | Eyebrows, labels, buttons, code |

Loaded in `index.html` from Google Fonts: **Inter**, **Lora**.

---

### Type Scale (Utility Classes)

| Class | Use | Size (Responsive) |
|-------|-----|-------------------|
| `.type-eyebrow` | Section labels, nav hints, form labels | 10px, mono, bold, uppercase, tracking 0.2em |
| `.type-h1` | Hero only | 5xl → 8xl, serif, tight |
| `.type-h2` | Section headers | 4xl → 7xl, serif |
| `.type-h3` | Large cards | 3xl → 4xl, serif |
| `.type-h4` | Grid cards | xl → 2xl, serif |
| `.type-body-lg` | Lead paragraphs | lg → xl, light, relaxed |
| `.type-body` | Body copy | base → lg, relaxed |

---

### Eyebrow Pattern

**Preferred — Use the utility class:**
```jsx
<span className="type-eyebrow text-gold-on-cream">/ SECTION LABEL</span>
<span className="type-eyebrow text-red-text">/ GET CLIENTS</span>
<span className="type-eyebrow text-dark/70">PHASE 01</span>
```

**Manual (if utility not available):**
```css
font-mono text-[10px] font-bold uppercase tracking-[0.2em]
```

**CSS Definition (in `src/index.css`):**
```css
.type-eyebrow {
  @apply font-mono text-[10px] font-bold uppercase tracking-[0.2em];
}
```

---

### Quote / Lead Pattern

```jsx
<p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl border-l-2 border-gold pl-6">
  Your lead paragraph text here.
</p>
```

---

## 3. Spacing & Layout

### Section Container (Main Content)

| Property | Value | Tailwind |
|----------|-------|----------|
| Max width | 1400px | `max-w-[1400px] mx-auto` |
| Horizontal padding | Responsive | `px-6 md:px-12 lg:px-20` |
| Section padding | Top/Bottom | `pt-24 pb-32` or `py-24 md:py-32` |

---

### Hero / Full-Height Section

```jsx
// Outer wrapper
<section className="relative h-[100dvh] w-full flex flex-col overflow-hidden">
  
  // Inner content container
  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
    
    // Nav/Return row
    <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
      <BackButton />
    </div>
    
    // Two-column grid
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
      // Left: Text content
      // Right: Visual
    </div>
    
  </div>
</section>
```

---

### Grid (Hero Two-Column)

| Element | Classes |
|---------|---------|
| Grid container | `grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center` |
| Left (text) | `flex flex-col justify-center` + `max-w-3xl` for copy |
| Right (visual) | `w-full h-auto lg:h-full flex items-center justify-center lg:justify-end` |
| Visual wrapper | `relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90` |

---

### Gap Scale

| Use | Class |
|-----|-------|
| Between small elements | `gap-2`, `gap-3`, `gap-4` |
| Between components | `gap-6`, `gap-8` |
| Section-level | `gap-8 md:gap-12 lg:gap-20` |
| Inline (icon + text) | `gap-2` or `gap-3` |

---

### Content Widths

| Use | Class |
|-----|-------|
| Long-form text | `max-w-2xl` or `max-w-3xl` |
| Hero copy block | `max-w-3xl` |
| Card content | `max-w-lg` |

---

## 4. Icons

### Library

**[lucide-react](https://lucide.dev/)** — Single icon set for the whole site.

### Import Pattern

```jsx
import { ArrowRight, Target, TrendingUp } from 'lucide-react';
```

Always use **named imports** for tree-shaking.

### Sizes

| Context | Size | Classes |
|---------|------|---------|
| Inline with text/buttons | 16px | `w-4 h-4 shrink-0` |
| Feature icons | 24px | `w-6 h-6` |
| Large feature icons | 32px | `w-8 h-8` |

### Styling

Use Tailwind classes for color so icons follow theme:

```jsx
// ✅ Correct
<Target className="w-4 h-4 text-red-solid" />
<TrendingUp className="w-4 h-4 text-gold-on-cream" />

// ❌ Avoid inline styles
<Target style={{ color: '#E21E3F' }} />
```

### Common Icons Used

`ArrowRight`, `ArrowLeft`, `Menu`, `X`, `ChevronDown`, `ChevronRight`, `Target`, `TrendingUp`, `BarChart3`, `Globe`, `Database`, `Zap`, `Bot`, `Video`, `Users`, `Terminal`, `Check`, `CheckCircle`, `ShieldCheck`, `HelpCircle`, `AlertTriangle`

---

## 5. Buttons

### CTAButton (`components/CTAButton.tsx`)

**Rule — Primary and colored buttons:** Primary and colored buttons (like Gold, solid dark) MUST NOT use brackets. They should feature clean text followed by the arrow → (e.g. `Book a Call →`). Reserve brackets for transparent/ghost buttons only.

| Prop | Options | Default |
|------|---------|---------|
| `variant` | `solid`, `bracket` | `solid` |
| `theme` | `light`, `dark` | `light` |
| `size` | `default`, `sm` | `default` |

**Solid Button Styles (primary/colored — no brackets):**

| Theme | Background | Text | Hover |
|-------|------------|------|-------|
| Light (on cream) | `bg-dark` | `text-cream` | Slide animation |
| Dark (on dark bg) | `bg-gold-on-dark` | `text-dark` | Slide animation |

Use clean label + arrow → for solid/primary CTAs. Example: `Book a Call →`.

**Bracket Button (transparent/ghost only):** Use `variant="bracket"` for secondary, ghost-style buttons only. Renders as `[ LABEL ]` with hover color change to gold. Do not use brackets on primary or colored (e.g. Gold) buttons.

**Typography:** `font-mono font-bold uppercase tracking-[0.2em]`

**Sizes:**
- Default: `px-8 py-4 text-xs`
- Small: `px-6 py-3 text-[10px]`

**Usage:**
```jsx
<CTAButton theme="light" onClick={handleClick}>
  Book a Call →
</CTAButton>

<CTAButton theme="dark">Book a Call →</CTAButton>

<CTAButton variant="bracket" size="sm">
  View Details
</CTAButton>
```

---

### BackButton (`components/BackButton.tsx`)

| Prop | Default |
|------|---------|
| `label` | "Return Home" |
| `onClick` | Required |

**Style:** `font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/80 hover:text-gold-on-cream`

**Icon:** `ArrowLeft` moves left on hover.

**Placement:** Top of page with `pt-24 mb-4 relative z-20`.

---

## 6. Borders & Radius

### Border Patterns

| Use | Classes |
|-----|---------|
| Standard border | `border` or `border-2` |
| Light divider | `border-dark/10` or `border-black/10` |
| Accent border | `border-gold`, `border-red-solid` |
| Subtle accent | `border-gold/20`, `border-red-solid/20` |
| Quote bar | `border-l-2 border-gold pl-4` or `pl-6` |
| Section divider | `border-t border-dark/10` |

### Radius

| Use | Class |
|-----|-------|
| Default (subtle) | `rounded-sm` |
| Pills/avatars | `rounded-full` |
| Cards | `rounded-sm` |

---

## 7. Z-Index

| Element | Z-Index | Notes |
|---------|---------|-------|
| Fixed background (geometric) | `z-0` | Behind everything |
| Page base | `z-[150]` | Main layout wrapper |
| Content wrapper | `z-10` | Above visuals |
| Nav/Return buttons | `z-20` | Above content |
| Modals/overlays | `z-50` to `z-100` | As needed |

---

## 8. Breakpoints

Tailwind defaults:

| Name | Width | Common Use |
|------|-------|------------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

**Most used:** `md:` and `lg:` for layout shifts, padding, font sizes.

---

## 9. Motion & Transitions

### Duration Tokens (Tailwind)

| Token | Duration | Use |
|-------|----------|-----|
| `duration-snap` | 200ms | Hover states, micro-interactions |
| `duration-flow` | 600ms | Layout shifts, accordions |
| `duration-reveal` | 1000ms | Hero entrances, page transitions |

### Easing

**Luxury curve:** `cubic-bezier(0.16, 1, 0.3, 1)`

Tailwind: `ease-luxury` (custom) or inline.

### Framer Motion

Used for scroll-linked animations, hero reveals, page transitions.

```jsx
import { m, useScroll, useTransform } from 'framer-motion';
```

### CSS Animations (in `src/index.css`)

| Class | Effect |
|-------|--------|
| `.reveal-text` | Slide-up + skew entrance |
| `.animate-fade-in` | Fade + translateY |
| `.animate-extend-line` | Line width 0 → 4rem |
| `.soft-steel-shine` | Gold text shine sweep |
| `.animate-flicker` | Opacity flicker (terminal) |

---

## 10. Reusable Patterns for New Sections

### 1. Full-Width Section (Cream)

```jsx
<section className="w-full bg-cream border-t border-dark/10">
  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-32">
    {/* Content */}
  </div>
</section>
```

### 2. Hero Block (Two-Column)

```jsx
<section className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-cream">
  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
    
    {/* Back button row */}
    <div className="pt-24 mb-4 relative z-20">
      <BackButton onClick={onBack} />
    </div>
    
    {/* Two-column grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
      
      {/* Left: Text */}
      <div className="flex flex-col justify-center">
        <span className="type-eyebrow text-gold-on-cream mb-6">/ SECTION</span>
        <h1 className="type-h1 text-dark mb-10">
          Headline <span className="italic text-gold-on-cream">Highlight.</span>
        </h1>
        <p className="type-body-lg text-dark/70 border-l-2 border-gold pl-6 mb-8">
          Lead paragraph text.
        </p>
        <CTAButton>Call to Action →</CTAButton>
      </div>
      
      {/* Right: Visual */}
      <div className="w-full h-auto lg:h-full flex items-center justify-center">
        <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px]">
          {/* Visual component */}
        </div>
      </div>
      
    </div>
  </div>
</section>
```

### 3. Card on Cream

```jsx
<div className="bg-white border border-black/10 rounded-sm p-6">
  {/* Card content */}
</div>
```

### 4. Dark Block (CTA Section)

```jsx
<section className="bg-dark py-24">
  <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center">
    <h2 className="type-h2 text-white mb-6">
      Headline <span className="text-gold-on-dark">Highlight.</span>
    </h2>
    <p className="type-body-lg text-white/80 mb-10">
      Supporting text.
    </p>
    <CTAButton theme="dark">Call to Action →</CTAButton>
  </div>
</section>
```

### 5. Eyebrow + Title + Lead

```jsx
<div className="mb-16">
  <span className="type-eyebrow text-red-text mb-6 block">/ SECTION LABEL</span>
  <h2 className="type-h2 text-dark mb-10">
    Section <span className="italic text-gold-on-cream">Title.</span>
  </h2>
  <p className="type-body-lg text-dark/70 border-l-2 border-gold pl-6 max-w-2xl">
    Lead paragraph with key message.
  </p>
</div>
```

### 6. Feature List

```jsx
<ul className="space-y-4">
  <li className="flex items-center gap-3">
    <CheckCircle className="w-5 h-5 text-gold-on-cream shrink-0" />
    <span className="type-body text-dark/70">Feature description</span>
  </li>
  {/* More items */}
</ul>
```

---

## 11. Files to Touch When Changing Design

| What to Change | Files |
|----------------|-------|
| Colours / theme | `constants/theme.ts`, `tailwind.config.js`, `src/index.css` |
| Typography | `src/index.css` (`.type-*`), `index.html` (font preload) |
| Layout constants | This doc, optionally `constants/layout.ts` |
| Buttons | `components/CTAButton.tsx`, `components/BackButton.tsx` |
| Icons | Import from `lucide-react` |

---

## 12. Quick Reference Cheat Sheet

```
╔═══════════════════════════════════════════════════════════════╗
║                SYSBILT — DESIGN CHEAT SHEET                   ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  TEXT ON CREAM (#FFF2EC):                                    ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ ✅ text-dark           Primary headings                 │ ║
║  │ ✅ text-dark/70        Body text                        │ ║
║  │ ✅ text-dark/60        Muted (MINIMUM)                  │ ║
║  │ ✅ text-red-text       Red labels (#9A1730)             │ ║
║  │ ✅ text-gold-on-cream  Gold labels (#8B6914)            │ ║
║  │                                                         │ ║
║  │ ❌ text-dark/50        FAILS (3.8:1)                    │ ║
║  │ ❌ text-gold           FAILS for text (decorative only) │ ║
║  │ ❌ text-red-solid      FAILS for text (decorative only) │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  TEXT ON DARK (#1a1a1a):                                     ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ ✅ text-white          Primary headings                 │ ║
║  │ ✅ text-white/80       Body text                        │ ║
║  │ ✅ text-white/70       Muted (MINIMUM)                  │ ║
║  │ ✅ text-red-on-dark    Red labels (#FF6B6B)             │ ║
║  │ ✅ text-gold-on-dark   Gold labels (#D4A84B)             │ ║
║  │                                                         │ ║
║  │ ❌ text-white/50       FAILS for body text              │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  DECORATIVE (any opacity OK):                                ║
║  • Icons:      text-red-solid, text-gold                    ║
║  • Borders:    border-red-solid/20, border-gold/20          ║
║  • Tints:      bg-red-solid/10, bg-gold/10                  ║
║  • Ghost text: text-dark/10 (background numbers)            ║
║                                                               ║
║  TYPOGRAPHY:                                                 ║
║  • Eyebrow:    type-eyebrow text-[color]                    ║
║  • Hero:       type-h1                                      ║
║  • Section:    type-h2                                      ║
║  • Card:       type-h3 or type-h4                           ║
║  • Body:       type-body or type-body-lg                    ║
║                                                               ║
║  LAYOUT:                                                     ║
║  • Container:  max-w-[1400px] mx-auto                       ║
║  • Padding:    px-6 md:px-12 lg:px-20                       ║
║  • Section:    pt-24 pb-32                                  ║
║                                                               ║
║  MOTION:                                                     ║
║  • Hover:      duration-snap (200ms)                        ║
║  • Layout:     duration-flow (600ms)                        ║
║  • Reveal:     duration-reveal (1000ms)                     ║
║  • Easing:     ease-luxury                                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*This specification supersedes all previous design documents. When adding new tokens or changing standards, update this file and the relevant source (theme, Tailwind, or CSS) together.*
