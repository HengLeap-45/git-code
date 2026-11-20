import { Link } from "react-router-dom";
import { SEO } from "../../components/UI/SEO";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <SEO title="Page not found" description="The page you're looking for doesn't exist." />
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <h1 className="font-display mt-4 text-2xl font-semibold">This page doesn't exist</h1>
      <p className="mt-2 max-w-md text-fg-muted">
        The link may be broken or the page may have moved. Head back to the home page to keep exploring.
      </p>
      <Link to="/" className="focus-ring shadow-glow mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-medium text-white">
        Back to home
      </Link>
    </section>
  );
}
