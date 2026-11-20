import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SEO } from "../../components/UI/SEO";
import { PageHero, Reveal } from "../../components/UI/primitives";
import { skills, type SkillCategory } from "../../data/skills";

const categories: ("All" | SkillCategory)[] = ["All", "Frontend", "Backend", "Database", "Tools"];

export default function Skills() {
  const [active, setActive] = useState<"All" | SkillCategory>("All");

  const visible = useMemo(
    () => (active === "All" ? skills : skills.filter((s) => s.category === active)),
    [active]
  );

  return (
    <>
      <SEO title="Skills" description="Technical skills across frontend, backend, databases, and tools." />
      <PageHero
        title="Skills"
        subtitle="The languages, frameworks, and tools I use to build software. Proficiency levels are editable in src/data/skills.ts."
      />

      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div role="tablist" aria-label="Skill categories" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`focus-ring rounded-full px-4 py-2 text-sm transition-colors ${
                active === c ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white" : "glass text-fg-muted hover:text-fg"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((skill) => (
            <motion.li
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="glass rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">{skill.name}</h2>
                <span className="text-xs uppercase tracking-wide text-fg-muted">{skill.category}</span>
              </div>
              <p className="mt-2 text-sm text-fg-muted">{skill.description}</p>

              <div
                className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label={`${skill.name} proficiency`}
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
                />
              </div>
              <p className="mt-2 text-right text-xs text-fg-muted">{skill.level}%</p>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className="mt-16 text-sm text-fg-muted">
          <p>Want to see these in action? Browse my <a className="focus-ring rounded text-cyan-400 underline-offset-4 hover:underline" href="/projects">projects</a>.</p>
        </Reveal>
      </div>
    </>
  );
}
