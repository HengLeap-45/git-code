export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) errors.name = "Enter your full name (at least 2 characters).";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address, like name@example.com.";
  if (subject.length < 3) errors.subject = "Add a subject (at least 3 characters).";
  if (message.length < 10) errors.message = "Write a message of at least 10 characters.";
  if (message.length > 2000) errors.message = "Keep your message under 2,000 characters.";

  return errors;
}
