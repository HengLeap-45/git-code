import type { ContactValues } from "./validation";

/**
 * Sends the contact form to a server endpoint. The endpoint (see /api/contact.ts)
 * holds the email provider credentials, so no secrets reach the browser.
 */
export async function sendContact(values: ContactValues & { website?: string }): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      signal: controller.signal,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Your message could not be sent. Please try again.");
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("The request timed out. Check your connection and try again.");
    }
    throw err instanceof Error ? err : new Error("Something went wrong. Please try again.");
  } finally {
    clearTimeout(timeout);
  }
}
