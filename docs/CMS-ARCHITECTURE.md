# MFSYS CMS & Platform Architecture

## Principle
The public website is presentation; content is managed independently through a secure administration layer.

## Stack
- Next.js App Router + TypeScript
- PostgreSQL as the primary relational database
- Prisma ORM
- Object storage + CDN for media
- Server-side authentication with MFA
- RBAC for content and platform administration
- Audit logging
- Search/indexing for Insights
- Structured metadata and dynamic sitemap

## Core entities
Pages, sections, products, insights, media, navigation, users and audit logs.

## Publishing model
Draft -> Review -> Approved -> Published -> Archived.

## Security baseline
No secrets in Git. Validate all server inputs. Enforce authorization server-side. Rate-limit authentication and public forms. Use secure cookies, CSRF protection where applicable, CSP, security headers, audit logs and dependency scanning.

## Performance
Server-render content where possible, optimize images, lazy-load noncritical media, preload only critical assets, cache public content and use a CDN.

## SEO
Every indexable page should support canonical URL, title, description, Open Graph, robots directives, structured data where applicable and inclusion in the XML sitemap.

## PWA
Manifest and service worker support should enhance the experience without making critical content dependent on offline caching.
