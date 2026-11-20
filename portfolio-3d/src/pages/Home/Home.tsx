import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import SafeScene from "../../components/3D/SafeScene";
import { SocialLinks } from "../../components/Footer/Footer";
import { Reveal } from "../../components/UI/primitives";
import { SEO } from "../../components/UI/SEO";
import { profile } from "../../data/profile";

export default function Home() {
  return (
    <>
      <SEO title="Home" description={profile.intro} />

      <section className="relative isolate flex min-h-[calc(100vh-6rem)] items-center overflow-hidden px-4">
        <div className="absolute inset-0 -z-10">
          <SafeScene className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-sm text-fg-muted"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-2 text-5xl font-bold tracking-tight md:text-7xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-xl text-gradient md:text-2xl"
            >
              {profile.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 max-w-xl text-fg-muted md:text-lg"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/projects"
                className="focus-ring shadow-glow group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-medium text-white"
              >
                View My Work
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={profile.cvUrl}
                download
                className="focus-ring glass-button inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-fg"
              >
                <Download size={18} aria-hidden="true" />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10"
            >
              <SocialLinks />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xs md:max-w-md"
            style={{ maxWidth: "28rem" }}
            aria-hidden="true"
          >
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/25 blur-3xl" />
            <motion.img
              src="/person.svg"
              alt=""
              width={480}
              height={560}
              loading="eager"
              decoding="async"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 h-auto w-full drop-shadow-[0_25px_45px_rgba(34,211,238,0.12)]"
            />
            <div className="glass absolute bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium tracking-[0.18em] text-fg-muted">
              DESIGN <span className="text-cyan-400">•</span> CODE <span className="text-violet-400">•</span> CREATE
            </div>
          </motion.div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-6xl px-4 py-20">
        <p className="font-display text-2xl text-fg md:text-3xl">{profile.slogan}</p>
        <p className="mt-4 max-w-2xl text-fg-muted">{profile.about}</p>
        <Link to="/about" className="focus-ring mt-6 inline-flex items-center gap-2 rounded text-sm text-cyan-400 hover:underline">
          Read more about me <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </Reveal>
    </>
  );
}
