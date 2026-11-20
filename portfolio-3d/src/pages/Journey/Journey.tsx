import { Download, GraduationCap, Briefcase, BookOpen, Award, Trophy, Flag } from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "../../components/UI/SEO";
import { PageHero, Reveal, SectionHeading, Counter } from "../../components/UI/primitives";
import { timeline, certifications, achievements, futureGoals } from "../../data/experience";
import { profile } from "../../data/profile";

const icons = { education: GraduationCap, work: Briefcase, learning: BookOpen } as const;

export default function Journey() {
  return (
    <>
      <SEO title="Journey" description="My education, experience, certifications, and goals." />
      <PageHero title="Experience & journey" subtitle="The path so far, and where I'm headed next.">
        <a
          href={profile.cvUrl}
          download
          className="focus-ring glass-button mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-fg"
        >
          <Download size={16} aria-hidden="true" /> Download CV
        </a>
      </PageHero>

      <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24">
        <section aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="sr-only">Professional timeline</h2>
          <ol className="relative mx-auto max-w-3xl">
            <motion.span
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-400 md:left-1/2"
            />
            {timeline.map((item, i) => {
              const Icon = icons[item.type];
              const left = i % 2 === 0;
              return (
                <li key={item.title} className="relative mb-10 pl-12 md:pl-0">
                  <span className="absolute left-4 top-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--bg)] ring-1 ring-white/15 md:left-1/2" aria-hidden="true">
                    <Icon size={16} className="text-cyan-400" />
                  </span>
                  <Reveal className={`glass rounded-2xl p-6 md:w-[calc(50%-2.5rem)] ${left ? "md:mr-auto" : "md:ml-auto"}`}>
                    <p className="text-xs uppercase tracking-wide text-cyan-400">{item.period}</p>
                    <h3 className="font-display mt-1 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-fg-muted">{item.organization}</p>
                    <p className="mt-2 text-sm text-fg-muted">{item.description}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="grid gap-10 md:grid-cols-2">
          <section aria-labelledby="cert-heading">
            <SectionHeading title="Certifications" />
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="glass flex items-start gap-3 rounded-xl p-4">
                  <Award size={18} className="mt-0.5 shrink-0 text-violet-400" aria-hidden="true" />
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-fg-muted">{c.issuer} · {c.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="ach-heading">
            <SectionHeading title="Achievements" />
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a.title} className="glass flex items-start gap-3 rounded-xl p-4">
                  <Trophy size={18} className="mt-0.5 shrink-0 text-cyan-400" aria-hidden="true" />
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-fg-muted">{a.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="milestones-heading">
          <SectionHeading title="Milestones" />
          <dl className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Reveal>
              <div className="glass rounded-2xl p-6">
                <dd className="font-display text-4xl font-bold"><Counter value={timeline.length} /></dd>
                <dt className="mt-1 text-sm text-fg-muted">Milestones logged</dt>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <dd className="font-display text-4xl font-bold"><Counter value={certifications.length} /></dd>
                <dt className="mt-1 text-sm text-fg-muted">Certifications</dt>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass rounded-2xl p-6">
                <dd className="font-display text-4xl font-bold"><Counter value={achievements.length} /></dd>
                <dt className="mt-1 text-sm text-fg-muted">Achievements</dt>
              </div>
            </Reveal>
          </dl>
        </section>

        <section aria-labelledby="future-heading">
          <SectionHeading title="Future goals" />
          <ul className="grid gap-4 md:grid-cols-2">
            {futureGoals.map((g) => (
              <li key={g} className="glass flex items-start gap-3 rounded-xl p-5">
                <Flag size={18} className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true" />
                <span className="text-fg-muted">{g}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
