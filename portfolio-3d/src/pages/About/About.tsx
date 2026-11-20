import { SEO } from "../../components/UI/SEO";
import { PageHero, Reveal, Counter, SectionHeading } from "../../components/UI/primitives";
import { profile, stats, careerGoals, interests } from "../../data/profile";
import { timeline } from "../../data/experience";

export default function About() {
  const education = timeline.filter((t) => t.type === "education");

  return (
    <>
      <SEO title="About" description="My story, education, goals, and journey as a developer." />
      <PageHero title="About me" subtitle={profile.about} />

      <div className="mx-auto max-w-6xl space-y-24 px-4 pb-10">
        <Reveal className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
          <div className="glass relative aspect-square w-full max-w-[280px] overflow-hidden rounded-3xl">
            <img
              src={profile.profileImage}
              alt={`Portrait of ${profile.name}`}
              width={280}
              height={280}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-br from-blue-600/30 to-violet-600/30 font-display text-6xl font-bold text-fg/70">
              {profile.firstName[0]}
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">My story</h2>
            <p className="mt-4 max-w-2xl text-fg-muted">
              I'm currently focused on building skills across the full stack, from polished interfaces to reliable APIs and
              databases. Replace this paragraph in <code>src/data/profile.ts</code> with your own story.
            </p>
          </div>
        </Reveal>

        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Statistics</h2>
          <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div className="glass rounded-2xl p-6">
                  <dd className="font-display text-4xl font-bold">
                    <Counter value={s.value} />
                  </dd>
                  <dt className="mt-1 text-sm text-fg-muted">{s.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        <section aria-labelledby="edu-heading">
          <SectionHeading title="Education" subtitle="Where my foundation was built." />
          <ol className="relative ml-3 space-y-8 border-l border-white/10 pl-8">
            {education.map((item) => (
              <li key={item.title} className="relative">
                <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 ring-4 ring-[var(--bg)]" aria-hidden="true" />
                <Reveal>
                  <p className="text-sm text-cyan-400">{item.period}</p>
                  <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                  <p className="text-fg-muted">{item.organization}</p>
                  <p className="mt-2 max-w-2xl text-fg-muted">{item.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid gap-10 md:grid-cols-2">
          <section aria-labelledby="goals-heading">
            <SectionHeading title="Career goals" />
            <ul className="space-y-3">
              {careerGoals.map((g) => (
                <li key={g} className="glass rounded-xl p-4 text-fg-muted">{g}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="interests-heading">
            <SectionHeading title="Interests" />
            <ul className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <li key={i} className="glass rounded-full px-4 py-2 text-sm text-fg">{i}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
