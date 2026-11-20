// Serverless function (Vercel / Netlify style). Keeps email credentials on the server.
// Required environment variables (set in your hosting dashboard, never in code):
//   RESEND_API_KEY   - API key from your email provider (e.g. Resend)
//   CONTACT_TO_EMAIL - the address that receives messages
//   CONTACT_FROM     - a verified sender, e.g. "Portfolio <onboarding@resend.dev>"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5; // 5 messages per minute per IP
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export default async function handler(req: Request): Promise<Response> {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return json({ error: "Too many messages. Please wait a minute and try again." }, 429);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  // Honeypot: bots fill hidden fields; real users never do.
  if (clean(body.website, 100)) return json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = clean(body.message, 2000);

  if (name.length < 2 || !EMAIL_RE.test(email) || subject.length < 3 || message.length < 10) {
    return json({ error: "Please check the form fields and try again." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !to || !from) {
    console.error("Contact form is missing environment configuration.");
    return json({ error: "The contact form is not configured yet. Please email me directly." }, 500);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
             <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
             <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Email provider error:", res.status);
    return json({ error: "Your message could not be sent right now. Please try again later." }, 502);
  }

  return json({ ok: true });
}
