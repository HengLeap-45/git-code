import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ExternalLink, Github } from "lucide-react";
import { SEO } from "../../components/UI/SEO";
import { projects, projectCategories, type Project } from "../../data/projects";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <>
      <SEO title="Projects" description="A selection of projects I've designed and built." />
      <section className="relative isolate overflow-hidden px-4 pb-14 pt-16 md:pb-16 md:pt-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative z-10">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">My work</h1>
            <p className="mt-5 max-w-2xl text-lg text-fg-muted">
              Selected projects with the challenges I solved along the way.
            </p>
          </div>
          <img
            src="/projects/programming.svg"
            alt="Illustration of a developer working with code on a computer"
            width={640}
            height={420}
            loading="eager"
            decoding="async"
            className="mx-auto h-auto w-full max-w-sm drop-shadow-[0_24px_40px_rgba(34,211,238,0.12)]"
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Project categories" className="flex flex-wrap gap-2">
            {projectCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`focus-ring rounded-full px-4 py-2 text-sm transition-colors ${
                  category === c ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white" : "glass text-fg-muted hover:text-fg"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="glass flex items-center gap-2 rounded-xl px-4 py-2.5 md:w-72">
            <Search size={16} className="text-fg-muted" aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech…"
              className="w-full bg-transparent text-sm text-fg placeholder:text-fg-muted/70 focus:outline-none"
            />
          </label>
        </div>

        {results.length === 0 ? (
          <p className="glass rounded-2xl p-8 text-center text-fg-muted">
            No projects match that search. Try a different keyword or category.
          </p>
        ) : (
          <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
            ))}
          </motion.ul>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: MouseEvent<HTMLLIElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  };

  return (
    <motion.li layout ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ perspective: 900 }}>
      <motion.button
        type="button"
        onClick={onOpen}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="focus-ring glass group block w-full overflow-hidden rounded-2xl text-left"
        aria-label={`View details for ${project.title}`}
      >
        <div className="aspect-video w-full overflow-hidden bg-white/5">
          <img
            src={project.image}
            alt={`Preview of ${project.title}`}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <p className="text-xs text-cyan-400">{project.category}</p>
          <h2 className="font-display mt-1 text-xl font-semibold">{project.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm text-fg-muted">{project.description}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <li key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-fg-muted">{t}</li>
            ))}
          </ul>
        </div>
      </motion.button>
    </motion.li>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-cyan-400">{project.category}</p>
            <h2 id="project-title" className="font-display mt-1 text-2xl font-bold">{project.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close project details" className="focus-ring glass-button rounded-lg p-2">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-fg-muted">{project.description}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="glass rounded-2xl p-4">
            <h3 className="font-display text-sm font-semibold">Challenge</h3>
            <p className="mt-2 text-sm text-fg-muted">{project.challenge}</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <h3 className="font-display text-sm font-semibold">Solution</h3>
            <p className="mt-2 text-sm text-fg-muted">{project.solution}</p>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-fg-muted">{t}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white">
              <ExternalLink size={16} aria-hidden="true" /> Live demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="focus-ring glass-button inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-fg">
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
