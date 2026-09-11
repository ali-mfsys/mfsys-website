# Database migrations

1. Configure a staging `DATABASE_URL` in the deployment environment.
2. Run `npx drizzle-kit generate` and review the generated SQL.
3. Apply migrations to staging with the project's approved migration command.
4. Run application tests and security checks.
5. Promote the reviewed migration to production.

Never commit real credentials or `.env` files.
