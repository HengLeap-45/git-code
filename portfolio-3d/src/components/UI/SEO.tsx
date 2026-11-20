import { useEffect } from "react";
import { profile } from "../../data/profile";

/** Sets the page title and meta description. Keeps SEO per-route without extra dependencies. */
export function SEO({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | ${profile.name}`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
  return null;
}
