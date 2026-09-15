# Contact email configuration

Both the homepage and Contact enquiry forms submit to `POST /api/contact`. The server uses native fetch with the [Resend Send Email REST API](https://resend.com/docs/api-reference/emails/send-email). No email-provider dependency is required.

Set these variables privately in the intended Vercel environment:

- `RESEND_API_KEY`: a Resend API key authorized to send email for the verified domain.
- `CONTACT_TO_EMAIL`: the client's private receiving mailbox. Never place this address in public company data or client code.
- `CONTACT_FROM_EMAIL`: the sender on the verified domain, using `DANCATSHER Website <website@dancatsher.com>` (including angle brackets).

Do not prefix these variables with `NEXT_PUBLIC_`. `.env.example` contains empty placeholders only. For local testing, use an ignored `.env.local`; never commit credentials or the private recipient. Vercel environment changes take effect in a subsequent deployment, performed separately by the owner.

The visitor's email becomes `reply_to`. Plain-text messages include the existing submitted fields, locale and source path. The route checks payload size, types, field limits, required fields, email/phone formats, allowed divisions/categories and source, and silently discards a filled honeypot. Responses never include provider errors or configuration. Missing configuration returns a friendly failure without sending. The honeypot is basic spam protection, not a distributed rate limiter.

Success means Resend accepted the message, not confirmation of inbox delivery. Inputs reset after success while original service preselection is retained; failures preserve entered data. The browser prevents concurrent submissions. After production configuration, perform one authorized end-to-end delivery and reply-to check. No real email is required for local mocked verification. AEserver forwarding is independent and unchanged.
