# MFSYS Website — AI-Powered Financial Technology

MFSYS Technologies' enterprise digital experience platform.

## Vision
**AI-Powered Financial Technology**  
**Shaping the Future with AI and Beyond.**

## Architecture
Next.js + React + TypeScript → Design System → Content Platform/CMS → Secure API → PostgreSQL → CDN/WAF/Object Storage → Analytics/Search.

## Product domains
Digital Banking, Loan Origination, Islamic Finance, Agri Finance, AI Credit Intelligence, Mobile Lending, Payments, Climate & Carbon, Logistics, Agentic AI and Digital Transformation.

## Engineering principles
- Security and privacy by design
- Server-side authorization
- SEO-first content architecture
- Performance and Core Web Vitals
- Responsive/PWA experience
- Accessible WCAG 2.2 AA target
- Automated testing and CI/CD
- No secrets committed to source control

## Development
Copy `.env.example` to `.env.local`, install dependencies, then run `npm run dev`.

Production integrations for database, identity, media/CDN and monitoring must be configured through environment variables and deployment infrastructure.

## Deployment
The production website is deployed through **Cloudflare Workers** from the `main` branch.
