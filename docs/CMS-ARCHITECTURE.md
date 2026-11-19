# MFSYS CMS & Publishing Architecture

## Deployed content model by area

MFSYS's public Next.js website uses versioned Git source and deploys through GitHub and Cloudflare.

**Insights — Git is the canonical content store.**

- The complete published Insights library lives in content/insights/entries.json.
- lib/insight-content.ts loads that JSON and supplies pages, categories, filters and the sitemap.
- Admin Insights GET reads the same compiled public content; admin POST creates a GitHub draft pull request instead of inserting a separate PostgreSQL record.
- News, Research, Reports, Articles (the existing blog area), and Case Studies all use the same pipeline.
- New long-form entries support optional body text alongside the legacy structured summary/points format.
- The 23 original articles and their public slugs were preserved.

**Other CMS areas — staged/unverified.**

Pages, Products, media, navigation and broader admin APIs have existing PostgreSQL/Drizzle scaffolding. Those are separate systems and are **not** automatically public/content-authoritative until a verified integration exists. Do not treat existing database rows as if public Next.js pages consume them.

## Current editorial workflow

Draft submission → authenticated GitHub branch → draft pull request → editorial and CI review → merge to main → Cloudflare deploy → public URL and sitemap verification.

Publication is determined by a successful, approved merge, not by writing a database field. The source repository is public, so draft pull requests are not confidential.

See docs/INSIGHTS_PUBLISHING.md for exact authorization, setup and production precautions.

## Security requirements

- Privileged API routes require valid signed admin cookies and server-side authorization.
- The GitHub token is injected as GITHUB_CONTENT_TOKEN in the Worker environment, never sent to the browser.
- Limit repository token permissions to Contents and Pull Requests, and protect the main branch with review rules and CI checks.
- Require MFA/SSO strengthening before operating a multi-user production content team.
- Preserve source attribution, confidentiality, audit trails and editorial accountability.
- Do not automatically grant an AI agent merge privileges.

## Future full CMS direction

If the organization chooses an independent database-backed CMS later, it must be migrated as an explicit, atomic replacement for the current Git-based Insights source:

1. Implement approved drafts, permissions and versioning in PostgreSQL.
2. Have public pages and the sitemap read that same canonical store.
3. Migrate all legacy article IDs and links; validate a sample and detect duplicates.
4. Remove old Git content writes only after the new read/write/publishing path is proven.
5. Account for Cloudflare cache, deployment behavior, data availability and rollbacks.

**Never run separate unconnected authoritative public and admin content stores.**

## SEO and deployment

Each approved Insights item receives its canonical route, title/description, semantic headings, attributed sources and appropriate Article schema. The build-time sitemap includes only published Git entries. Use the GitHub CI pipeline for typechecking, tests and a Next.js production build before promotion to Cloudflare.
