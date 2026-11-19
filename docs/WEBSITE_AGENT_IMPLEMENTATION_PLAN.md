# MFSYS Website Intelligence Agent — Implementation Blueprint

Date: 19 November 2026
Target website: https://mfsys.net
GitHub: ali-mfsys/mfsys-website
Recommended publishing policy: AI-assisted research and optimization with human-approved release.

## 1. Goal

Build an autonomous editorial assistant that monitors credible industry news and research, drafts articles, curates reports, identifies SEO opportunities and prepares website changes for publication. It must preserve verified MFSYS product facts, document source provenance and use controlled approvals rather than unsupervised production publishing.

## 2. Existing MFSYS foundation (source review)

- Public frontend is Next.js with GitHub/Cloudflare deployment, sitemap and structured data.
- Insights includes News, Reports, Research, Articles and Case Studies.
- Public article data is currently compiled from lib/insight-content.ts and rendered by app/insights/[slug]/[id]/page.tsx.
- A separate admin CMS scaffold exists, with app/admin/insights and app/admin/insights/new.
- Admin API routes include /api/admin/insights, /api/admin/ai/seo, /api/admin/ai/copilot and /api/admin/publish.
- Database layer requires DATABASE_URL. Production database setup has not been verified.
- The admin "Save draft" button is not wired to an action; AI Copilot produces template-based responses, not real model-generated research.
- /api/admin/publish is for CMS page records; the public Insights pages do not currently consume CMS insight records.
- Existing CI runs TypeScript, tests and Next.js production build. Cloudflare deployment follows code changes to main.
- Editorial policy in docs/AI-CONTENT-STRATEGY.md requires human review.

**Key prerequisite:** connect the authoring interface and public Insights rendering to one canonical content source. Do not treat the current CMS scaffold as a functioning end-to-end publisher.

## 3. Lean MVP architecture

Start with GitHub Actions as scheduler and runner, initially only manual workflow_dispatch triggers. Use a single OpenAI Agents SDK coordinator with narrow tasks, structured outputs and only verified tools.

Flow:
Manual request / schedule
→ Read approved sources (RSS, trusted websites, permitted APIs)
→ Check publication/event dates, duplication, sourcing and topical relevance
→ Draft original summary or report with MFSYS-specific analysis
→ Validate originality, factual claims, internal links, schema and SEO
→ Create one draft GitHub pull request with evidence
→ Editor approval + GitHub CI
→ Merge to main / existing Cloudflare deployment
→ Verify new public URL, sitemap, canonical, response and monitoring
→ Record what happened.

Use per-article versioned Markdown/MDX or JSON records for the fastest MVP. Update both public lists/detail pages and sitemap to read those records. Alternatively finish and secure the database CMS first, if the company prefers a dashboard-only publication workflow; avoid two independent sources of truth.

## 4. Core jobs

| Task | Initial schedule | Output | Publication |
|---|---|---|---|
| News watch | Weekdays | Source-linked, original news brief candidates | Approval required |
| Reports monitor | Weekly | Research publication summaries and MFSYS implications | Approval required |
| Research synthesis | Monthly/on demand | Cited and verified original analysis with limitations | SME + editor review |
| Blog/article author | On request | Human-sounding topical article and SEO metadata | Approval required |
| SEO analyst | Weekly | Suggested title, link, heading, structured data or content fixes | Pull request, CI and approval |
| Site QA | Daily | Broken links, HTTP failures, indexing/canonical changes and logs | Alerts, no direct editing |

Note: /insights/articles can serve as the blog. A separate /blog is not required.

## 5. Safe content and SEO policy

- Restrict sources to an allowlist of trusted original publishers such as CGAP, World Bank, BIS, IMF, WOCCU, IFSB and relevant regulators.
- Preserve exact original-source URL, publisher name, observed date and the date of the reported event.
- News: do not copy entire articles or licensed PDFs; write attributed original summaries and link to the publisher.
- Company claims: no invented partnerships, project results, awards, regulatory approvals, customer quotes or product release status.
- Research: show evidence, sample/limitations, independent sources, and suitable review by qualified people.
- Banking, financial, Shariah, legal and regulatory interpretations require specialist approval.
- SEO: avoid keyword stuffing or generating many near-duplicate pages; implement one clear reader/search intent for each URL.
- Produce useful metadata, correct canonical URL, valid internal links, accessibility, optional appropriate Article schema and sitemap entries.
- Treat external HTML, feeds and uploaded text as untrusted; prevent prompt injection and exfiltration.
- Never grant content-drafting jobs unrestricted write privileges to the main branch or production credentials.

## 6. Implementation milestones

Milestone A — Make publishing work:
- Create a validated article schema, content loader and draft/approved states.
- Integrate the existing admin UI or file-based PR review with the canonical public content.
- Preserve all current Insight IDs/URLs and sitemap records.
- Add server-side permission checks and version history.

Milestone B — Launch manually triggered pilot:
- One allowlisted source feed, fresh-event checking and deduplication.
- Real OpenAI API integration with structured draft output.
- Source, confidence and factual checks.
- Draft GitHub PR created automatically; a human merges only after CI and review.
- Public route and search metadata verified after deployment.

Milestone C — Schedule and observe:
- Daily industry news watch; weekly SEO suggestions; optional monthly research briefing.
- Add run history, notification channel, credit budget and failure alerts.
- Integrate actual Google Search Console queries and qualified lead events after property verification.

Milestone D — Mature publishing:
- Complete production database-backed CMS if preferred, including MFA, RBAC, logs, backups and rollbacks.
- Add topic approvals, editorial calendar, multi-stage validation and agency-level monitoring.
- Add analytics feedback, source quality scoring and safe selective automation after a successful supervised trial.

## 7. Accounts, keys and safety

- Store OPENAI_API_KEY as a GitHub Actions or Cloudflare secret, never in chat or the repository.
- ChatGPT Plus/Pro and OpenAI API billing are separate; API access and model choice need separate configuration.
- Give GitHub's agent workflow only read + pull-request permissions, protect main and require checks/review.
- Confirm source list and product terminology with an MFSYS editor.
- Verify Google Search Console properties for mfsys.net, and independently assess mfsys.ca before any domain redirects.
- If the database CMS is chosen, inspect and configure DATABASE_URL securely; require authentication and authorisation to be tested before any data access.

## 8. Practical implementation estimates

- Demo prototype: about 1–3 developer days.
- Working editorial MVP including actual publish flow and approvals: about 5–10 developer days.
- Full production editorial agent with mature CMS, monitoring and analytics: approximately 3–5 weeks.

These are planning ranges, not commitments. The main uncertainty is whether the existing CMS database and security layer are usable as-is and how much content workflow and analytics integration is required.

## 9. Definition of done for first pilot

1. Operator triggers a draft-news job.
2. Agent reads the approved source, rejects stale or duplicate content and captures source metadata.
3. Agent writes an original MFSYS draft with no unsupported claims.
4. GitHub shows a reviewable draft PR; main is unchanged.
5. Editor approves the PR and GitHub CI passes.
6. Article appears on the public /insights/news/<slug> route; sitemap, metadata and canonical are correct.
7. Agent confirms the deployed URL returns HTTP 200 and records the outcome.

Recommendation: implement Milestones A+B first. Do not activate schedules or auto-merge until the pilot succeeds.

References:
- OpenAI Agents SDK: https://developers.openai.com/api/docs/guides/agents/quickstart
- GitHub Actions schedules: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax
- Cloudflare Cron Triggers: https://developers.cloudflare.com/workers/configuration/cron-triggers/
- Google helpful content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
