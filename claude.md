# Project Context

## Site: chaitanya.dev (or whatever domain)
- Next.js on Vercel
- Dark mode default, Apple-like minimal aesthetic
- Typography-first: Inter/Satoshi, one accent color, generous whitespace

## Architecture
- Home: Hero + 3-card preview (project, article, AI chat CTA)
- Projects: Card grid → case study pages (Problem → Approach → Outcome → Tech)
- Writing: Blog with tags (PM, AI, Vibe Producting)
- About/Resume: Designed narrative resume, not PDF
- AI Chat: v2 feature, persistent widget, RAG over resume + content

## Design Principles
- No chatbot as homepage — hero section leads the narrative
- Micro-interactions, smooth scroll, fade-in on scroll
- Glass-morphism on chat widget
- Dark premium aesthetic, light mode toggle
- One accent color against neutrals

## Build Priority
1. Home + About/Resume
2. Projects (2-3 case studies)
3. Writing structure
4. AI Chat widget (v2)