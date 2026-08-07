import { Link } from "react-router-dom";
import {
  BookOpen,
  Library,
  Map,
  ArrowRight,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

function LearningCenter() {
  const sections = [
    {
      title: "Courses",
      description:
        "Structured video and learning resources.",
      icon: <BookOpen size={40} />,
      color: "from-cyan-500/20 to-blue-500/20",
      link: "/courses",
    },
    {
      title: "Knowledge Hub",
      description:
        "Articles, PDFs, interview questions and MCQs.",
      icon: <Library size={40} />,
      color: "from-purple-500/20 to-pink-500/20",
      link: "/knowledge",
    },
    {
      title: "Career Roadmaps",
      description:
        "Follow structured learning paths.",
      icon: <Map size={40} />,
      color: "from-green-500/20 to-cyan-500/20",
      link: "/roadmaps",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-10">

        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl">

          <p className="text-cyan-300">
            Cogniverse Learning Center
          </p>

          <h1 className="mt-3 text-5xl font-black">
            Learn Beyond Limits 📚
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Courses, articles, roadmaps, and AI-powered
            learning—all in one place.
          </p>

        </section>

        <section className="grid gap-8 md:grid-cols-3">

          {sections.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className={`rounded-[2rem] border border-white/10 bg-gradient-to-br ${item.color} p-8 backdrop-blur-xl transition hover:-translate-y-2`}
            >
              <div className="text-cyan-300">
                {item.icon}
              </div>

              <h2 className="mt-6 text-3xl font-black">
                {item.title}
              </h2>

              <p className="mt-4 text-slate-300">
                {item.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-cyan-300">
                Explore
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}

        </section>

      </div>
    </DashboardLayout>
  );
}

export default LearningCenter;