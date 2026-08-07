import { Link } from "react-router-dom";
import {
  Brain,
  BookOpen,
  Rocket,
  Trophy,
  HeartPulse,
  Sparkles,
  GraduationCap,
  Baby,
  Map,
  ShieldCheck,
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: <BookOpen />,
      title: "Free Learning Paths",
      text: "Access curated courses, notes, roadmaps, and practice resources.",
    },
    {
      icon: <Brain />,
      title: "Pixi AI Companion",
      text: "Ask doubts, get explanations, summaries, quizzes, and study help.",
    },
    {
      icon: <Baby />,
      title: "PixiLand for Kids",
      text: "A dreamy kids world with alphabets, numbers, fruits, animals, and tiny books.",
    },
    {
      icon: <HeartPulse />,
      title: "Wellness Reminders",
      text: "Healthy learning with water breaks, eye-care, posture, and rest reminders.",
    },
  ];

  const paths = [
    ["💻", "Coding", "MERN, Java, Python, DSA"],
    ["📘", "School", "Class 1–10 learning support"],
    ["🎓", "PUC & Degree", "Academic learning paths"],
    ["🌈", "Kids", "Fun learning for little learners"],
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
              <Sparkles />
            </div>
            <div>
              <h1 className="text-2xl font-black">
                Cogniverse <span className="text-cyan-300">AI</span>
              </h1>
              <p className="text-xs text-slate-400">Learn • Grow • Inspire</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features">Features</a>
            <a href="#pixi">Pixi</a>
            <a href="#pixiland">PixiLand</a>
            <a href="#paths">Learning Paths</a>
          </div>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="rounded-full border border-white/10 px-5 py-2 hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-cyan-400 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-5 py-2 text-cyan-300">
            <Rocket size={18} />
            Free AI-powered learning ecosystem
          </div>

          <h1 className="mx-auto mt-8 max-w-5xl text-6xl font-black leading-tight md:text-7xl">
            Learn Smarter. Grow Healthier. Dream Bigger.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Cogniverse helps students learn through free courses, smart notes,
            AI guidance, progress tracking, certificates, and a joyful kids
            learning world called PixiLand.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="rounded-full bg-cyan-400 px-8 py-4 font-bold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.35)] hover:bg-cyan-300"
            >
              Start Learning Free
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-white/10 px-8 py-4 font-bold hover:bg-white/10"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-cyan-300">Why Cogniverse?</p>
          <h2 className="mt-2 text-5xl font-black">
            Built for real learning, not endless watching
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl hover:border-cyan-300/40"
            >
              <div className="text-cyan-300">{item.icon}</div>
              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pixi" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-10">
            <p className="text-purple-300">Meet your AI companion</p>
            <h2 className="mt-2 text-5xl font-black">Pixi 🤖</h2>
            <p className="mt-5 text-lg text-slate-300">
              Pixi helps students understand concepts, generate quizzes, revise
              faster, translate explanations, and stay motivated.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                "Explain concepts simply",
                "Generate MCQs and practice tests",
                "Create revision plans",
                "Give healthy study reminders",
              ].map((text) => (
                <div
                  key={text}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  ✅ {text}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.05] p-10 text-center">
            <div className="text-8xl">🤖</div>
            <h3 className="mt-6 text-3xl font-black text-cyan-300">
              “Hi learner! Ready for today’s mission?”
            </h3>
            <p className="mt-4 text-slate-400">
              Pixi adapts to school students, college learners, and kids.
            </p>
          </div>
        </div>
      </section>

      <section id="pixiland" className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-pink-300/20 bg-gradient-to-br from-pink-400/10 via-yellow-300/10 to-cyan-300/10 p-10">
          <p className="text-pink-300">For little learners</p>
          <h2 className="mt-2 text-5xl font-black">PixiLand 🌈</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            A magical kids section with alphabets, numbers, fruits, vegetables,
            animals, sounds, rhymes, tiny books, and cute health reminders.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {["🔤 Alphabets", "🔢 Numbers", "🍎 Fruits", "🐶 Animals"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center text-lg font-bold"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="paths" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-cyan-300">Explore</p>
          <h2 className="mt-2 text-5xl font-black">Learning Worlds</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {paths.map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 text-center backdrop-blur-xl"
            >
              <div className="text-6xl">{icon}</div>
              <h3 className="mt-5 text-2xl font-black">{title}</h3>
              <p className="mt-3 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-yellow-300/20 bg-white/[0.05] p-10 text-center">
          <ShieldCheck className="mx-auto text-yellow-300" size={46} />
          <h2 className="mt-5 text-4xl font-black">
            Free learning. Honest certificates. Student-first mission.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-300">
            Cogniverse certificates represent completion inside the Cogniverse
            platform. Students learn freely, grow confidently, and build a
            lifelong learning portfolio.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-slate-400">
        <p className="font-bold text-white">Cogniverse AI</p>
        <p className="mt-2">
          Learn • Grow • Inspire | Built with care for students
        </p>
      </footer>
    </div>
  );
}

export default Home;