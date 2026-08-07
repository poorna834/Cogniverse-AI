import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Shield,
  Cloud,
  Palette,
  BarChart3,
} from "lucide-react";

function CareerPaths() {
  const careers = [
    {
      icon: Code2,
      title: "Full Stack Developer",
      description: "React, Node.js, Express, MongoDB, Deployment",
    },
    {
      icon: Brain,
      title: "AI Engineer",
      description: "Python, Machine Learning, Deep Learning, LLMs",
    },
    {
      icon: BarChart3,
      title: "Data Analyst",
      description: "Excel, SQL, Python, Power BI",
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Networking, Linux, Ethical Hacking",
    },
    {
      icon: Cloud,
      title: "Cloud Engineer",
      description: "AWS, Azure, Docker, Kubernetes",
    },
    {
      icon: Palette,
      title: "UI/UX Designer",
      description: "Figma, Wireframes, Prototypes",
    },
  ];

  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-4 text-center text-5xl font-black"
        >
          Choose Your Career Path
        </motion.h2>

        <p className="mb-14 text-center text-slate-400">
          Learn the right skills with structured roadmaps.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {careers.map((career, index) => (
            <motion.div
              key={career.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl hover:border-cyan-400 hover:bg-white/10"
            >
              <career.icon
                size={45}
                className="mb-5 text-cyan-300"
              />

              <h3 className="text-2xl font-bold">
                {career.title}
              </h3>

              <p className="mt-4 text-slate-400">
                {career.description}
              </p>

              <button className="mt-6 rounded-full bg-cyan-500 px-5 py-2 font-semibold">
                Explore
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CareerPaths;