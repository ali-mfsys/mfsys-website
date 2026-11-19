# MFSYS Insights — Canonical Publishing Architecture

Status: Implemented in the Git content publishing integration. Production enablement requires server-side credentials and successful deployment/CI.

## Source of truth

All public Insights content comes from one versioned source: content/insights/entries.json.

lib/insight-content.ts exports the published entries by importing that JSON, and preserves category metadata, types and filters. The existing 23 entries were migrated with the same IDs and URLs.

The following now read the same published entries:
- Insights landing and category pages (/insights, /insights/news, /insights/articles, /insights/research, /insights/reports, /insights/case-studies).
- Article detail routes (/insights/{section}/{id}).
- XML sitemap generation (/sitemap.xml).
- Authenticated editor's Published Insights list (/api/admin/insights).

The previous /api/admin/insights PostgreSQL write path was replaced. A newly created database record can no longer be mistaken for a published website article.

**Important:** The wider CMS database schema and admin Pages/Products routes still exist and remain separate works in progress. This change consolidates Insights only. Do not assume all admin CMS functionality is production-ready.

## Publishing lifecycle

1. An authorised MFSYS admin/editor signs in at /admin/login.
2. Create a draft at /admin/insights/new; select News, Research, Reports, Article/Blog, or Case Study.
3. Provide title, category, excerpt, takeaway, full text and relevant source attribution.
4. Save draft for review submits the content through the authenticated backend.
5. Backend checks content, URL uniqueness, HTTPS source requirement for News/Reports/Research and origin; it reads the current canonical JSON from GitHub main.
6. Backend opens a new insights/draft-* branch, commits the proposed JSON update, and opens a draft pull request. Main is unchanged.
7. A human checks claims, source provenance, product scope, spelling, confidential data, copyright and SEO; GitHub CI runs TypeScript, tests and build.
8. The authorised reviewer approves and merges the PR into protected main. Cloudflare deploys via the existing process.
9. The new article becomes available at /insights/{section}/{id} and appears in the sitemap. Publication should be verified on production.

Article/blog content type ARTICLE publishes in existing /insights/articles. There is no need to duplicate the section under /blog.

## Required production secrets

The live Cloudflare Worker name is mfsys-website. At audit time, only RESEND_API_KEY was found as a Worker secret, so admin sign-in and GitHub draft submission are not yet ready.

**Recommended secure setup:** On your own computer, clone the repository, run `npm install`, and log into Cloudflare with `npx wrangler login`. Then run:

```bash
node scripts/setup-editor.mjs
```

The interactive utility asks for the authorised admin email, a strong passphrase, and a fine-grained GitHub token, then displays a TOTP authenticator key **only in your local terminal**. Enter the six-digit code in the terminal to verify MFA. It installs the five Worker secrets directly using Wrangler; values are not written to files or GitHub. It requires Cloudflare account permissions. Never paste a password, token, TOTP key or recovery code into ChatGPT.

**GitHub token creation:** go to https://github.com/settings/personal-access-tokens/new and create a fine-grained personal access token for **only** `ali-mfsys/mfsys-website`. Grant **Contents: Read and write** and **Pull requests: Read and write** (Metadata read is automatic). Set a limited expiration and plan rotation. No Actions, Administration or Secrets permission is required by the editor workflow.

**Important:** The script installs secrets on the production Worker. It will not be effective until the current secure login implementation is deployed; do not run the script against an older build. Workers' `keep_vars: true` setting preserves separately configured Worker variables during subsequent deployments. Cloudflare's encrypted secrets remain protected.

Alternatively, individual values can be installed through Cloudflare's secure dashboard. Do not send them through a chat, email or a repository file.

- AUTH_SECRET: random high-entropy string used to sign admin cookies.
- ADMIN_EMAIL: permitted administrator's email address.
- ADMIN_PASSWORD_HASH: format salt$iterations$derived_key, where the key is PBKDF2-SHA256 32-byte output encoded as base64url. The setup utility uses 310,000 iterations and a random salt. Verification uses asynchronous WebCrypto; never store the plain password.
- ADMIN_TOTP_SECRET: unique 160-bit TOTP secret, base32-encoded, entered into an authenticator and verified during local setup. Required for production login.
- GITHUB_CONTENT_TOKEN: narrowly scoped repository credential that can read/write Contents and create Pull Requests only for ali-mfsys/mfsys-website. Prefer a dedicated GitHub App installation token or fine-grained PAT with an expiration and rotation plan.

Note: ADMIN_EMAIL may be configured as a secret or an environment variable; credential-associated configuration should remain controlled. The worker authentication and administration model is a minimal current implementation, not a fully verified MFA setup.

**GitHub security:** This repository is public. Draft pull requests and the text in them are public before merge. Do not submit sensitive customer files, unpublished confidential contracts or internal operational details through this workflow. If confidential editorial drafts are needed, move draft storage and review to a private system instead.

Set branch protection/rulesets for main requiring passing CI, appropriate reviewers, and disallowing direct edits. A draft PR should never be auto-merged by the agent.

## Draft interface behavior

- Save draft for review calls POST /api/admin/insights; it does not deploy to Cloudflare.
- Check SEO basics runs the existing heuristic on-page analyzer; it is not yet an OpenAI-powered editor or real search ranking score.
- Missing GITHUB_CONTENT_TOKEN: API responds with a clear HTTP 503 configuration error.
- Invalid or unsourced News/Research/Report: API returns HTTP 400.
- Duplicate slug: API returns HTTP 409.
- Unauthorised requests: HTTP 401/403. Login is only permitted using an authorised email, strong password and six-digit authenticator code. Without the required secrets, login returns 503 and no session is issued.
- API errors do not echo the GitHub credential or article content.

## Future agent integration

Agent drafts should use the same validated content format and propose changes through a PR or controlled CMS review. They must not write new articles into a separate database or call the production deploy endpoint directly.

Next steps:
1. Configure admin and GitHub credentials securely.
2. Test login and one draft PR with nonconfidential example text.
3. Verify PR approval, CI, merge, Cloudflare deploy, article listing, article detail and sitemap.
4. Implement scheduled agents and notification channels only after this end-to-end test succeeds.

## Verification

Run: npm run typecheck, npm test, npm run build. The publishing unit tests verify the 23 legacy IDs, no duplicate URLs, and required HTTPS source attribution.
