# Contact delivery and Google booking notifications

## Website message delivery

The Contact form POSTs to `/api/contact`. It validates fields server-side and uses the Resend email API to deliver **one email to both** `mfsys.software@gmail.com` and `info@mfsys.ca`. The visitor's address is set as the Reply-To, not the sender.

**Required Cloudflare Worker runtime secrets:**
- `RESEND_API_KEY`: API key from Resend (secret, never add to GitHub).
- `CONTACT_FROM_EMAIL`: verified sender on a domain authenticated with Resend, e.g. `MFSYS Website <website@mfsys.ca>`. Verify domain SPF/DKIM using the DNS records provided by Resend, ensuring HostGator MX records remain unchanged.

Until both secrets are set and the sender domain verified, the API returns HTTP 503 with a clear error. Do not claim website email delivery is live before testing. Use a test enquiry and confirm receipt in both inboxes. Do not use a Gmail address as the Resend sender without domain verification.

For production, add Cloudflare Turnstile and rate limiting / WAF protections before promoting the form broadly.

## Google Calendar appointment notifications

Both Book Meeting and Book Demo open `https://calendar.app.google/c3VpA4wDEA2NJpJb6`.

To deliver **copies of booking notification emails** to `info@mfsys.ca`:
1. Sign into Gmail as `mfsys.software@gmail.com`.
2. Gmail Settings → See all settings → Forwarding and POP/IMAP → Add a forwarding address: `info@mfsys.ca`.
3. Open the verification email in the HostGator mailbox and confirm the forwarding address.
4. In Gmail Settings → Filters and Blocked Addresses → Create a new filter matching a **real Google Calendar appointment booking notification** (inspect actual sender and subject from a test booking). Choose **Forward it to info@mfsys.ca**. Keep the original in Gmail.
5. Make a test booking and verify a copy of the booking notification arrives in the HostGator mailbox. Check for changes to Google notification formats.

Do **not** enable global forwarding of all Gmail messages: that would forward unrelated and potentially sensitive mail. Filter by actual notification sender/subject, not a guessed address. Note that Google Calendar invitation emails and Gmail notification emails are different; forwarding only works for messages received by Gmail. If no notification is received, use a Calendar automation or event-based integration instead.

## Current limitations
- Chat is a guided FAQ, not a connected live agent.
- Calendar booking link is live only if the Google appointment schedule is active.
- Gmail/Calendar connectors within ChatGPT do not configure the public website's runtime or mailbox filters.
