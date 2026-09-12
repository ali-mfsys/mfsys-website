# MFSYS Vercel deployment

Environment variable names are case-sensitive.

Current application requirements:
- DATABASE_URL
- AUTH_SECRET
- ADMIN_PASSWORD_HASH

Planned/configured integrations:
- AUTH_ISSUER
- AUTH_CLIENT_ID
- AUTH_CLIENT_SECRET
- MEDIA_BUCKET
- MEDIA_PUBLIC_BASE_URL
- ANALYTICS_ID

Vercel should use separate values for Development, Preview and Production. Never commit real credentials or .env files. Generate a strong random AUTH_SECRET. ADMIN_PASSWORD_HASH must be a password-derived hash, never plaintext.

The repository's current authentication implementation uses AUTH_SECRET and ADMIN_PASSWORD_HASH directly. The external identity-provider variables are reserved for the planned provider integration.
