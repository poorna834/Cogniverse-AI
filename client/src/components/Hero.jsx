import { motion } from "framer-motion";
import { ArrowRight, Brain, Code2, GraduationCap, Rocket } from "lucide-react";
import FeatureCard from "./FeatureCard";

function Hero() {
  const features = [
    { icon: GraduationCap, title: "Free Courses", text: "Curated quality resources" },
    { icon: Code2, title: "Projects", text: "Build portfolio-ready apps" },
    { icon: Brain, title: "AI Mentor", text: "Personal guidance soon" },
    { icon: Rocket, title: "Career Ready", text: "Interview and resume prep" },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur"
        >
          <Rocket size={16} />
          Free career-focused learning platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl"
        >
          Learn Skills. Build Projects. Get Hired.
        </motion.h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          SkillForge AI helps students master job-ready skills through free
          curated resources, career roadmaps, projects, interview prep, and
          progress tracking.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group flex items-center gap-2 rounded-full bg-indigo-500 px-8 py-4 font-semibold shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400">
            Start Learning Free
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-slate-200 backdrop-blur transition hover:bg-white/10">
            Explore Roadmaps
          </button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {features.map((item, index) => (
            <FeatureCard
              key={item.title}
              {...item}
              delay={0.2 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;