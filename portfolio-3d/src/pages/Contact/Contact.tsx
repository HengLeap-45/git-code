import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SafeScene from "../../components/3D/SafeScene";
import { SocialLinks } from "../../components/Footer/Footer";
import { profile } from "../../data/profile";
import { validateContact, type ContactValues, type ContactErrors } from "../../lib/validation";
import { sendContact } from "../../lib/sendContact";
import { SEO } from "../../components/UI/SEO";

const empty: ContactValues = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [values, setValues] = useState<ContactValues>(empty);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const update = (field: keyof ContactValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      await sendContact({ ...values, website: honeypot } as ContactValues & { website: string });
      setStatus("success");
      setValues(empty);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-fg placeholder:text-fg-muted/60 focus-ring transition-colors focus:border-cyan-400/60 aria-[invalid=true]:border-red-400/70";

  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-16">
      <SEO title="Contact" description="Get in touch to discuss a project or opportunity." />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <SafeScene className="h-full w-full" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Have a project in mind?{" "}
            <span className="text-gradient">Let's build something amazing together.</span>
          </h1>
          <p className="mt-5 max-w-md text-fg-muted">
            Tell me about your idea, timeline, or the role you're hiring for. I read every message and reply within a few days.
          </p>

          <ul className="mt-10 space-y-4 text-fg-muted">
            <li className="flex items-center gap-3"><Mail size={18} aria-hidden="true" /><a className="focus-ring rounded hover:text-fg" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li className="flex items-center gap-3"><Phone size={18} aria-hidden="true" /><a className="focus-ring rounded hover:text-fg" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
            <li className="flex items-center gap-3"><MapPin size={18} aria-hidden="true" />{profile.location}</li>
          </ul>

          <div className="mt-10"><SocialLinks /></div>
        </div>

        <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-6 md:p-8" aria-describedby="form-status">
          <div className="grid gap-5 md:grid-cols-2">
            <Field id="name" label="Full name" error={errors.name}>
              <input id="name" className={field} value={values.name} onChange={update("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Jane Doe" />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input id="email" type="email" className={field} value={values.email} onChange={update("email")} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} placeholder="jane@example.com" />
            </Field>
          </div>

          <div className="mt-5">
            <Field id="subject" label="Subject" error={errors.subject}>
              <input id="subject" className={field} value={values.subject} onChange={update("subject")} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} placeholder="Project inquiry" />
            </Field>
          </div>

          <div className="mt-5">
            <Field id="message" label="Message" error={errors.message}>
              <textarea id="message" rows={6} className={`${field} resize-y`} value={values.message} onChange={update("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} placeholder="Tell me about your project..." />
            </Field>
          </div>

          {/* Honeypot: hidden from people and screen readers, filled only by bots */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>Website<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 font-medium text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "sending" ? (<><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending message…</>) : "Send message"}
          </button>

          <div id="form-status" role="status" aria-live="polite" className="mt-4 min-h-[1.5rem]">
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 size={18} aria-hidden="true" /> Message sent. Thanks for reaching out, I'll reply soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle size={18} aria-hidden="true" /> {serverError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
