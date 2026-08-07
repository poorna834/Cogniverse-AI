import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getRoadmaps } from "../services/roadmapService";

function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoadmaps = async () => {
      try {
        const data = await getRoadmaps();
        setRoadmaps(data.roadmaps || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadRoadmaps();
  }, []);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.16)]">
          <div className="absolute right-10 top-8 text-8xl opacity-20">🗺️</div>

          <p className="text-cyan-300">Cogniverse Career Paths</p>

          <h1 className="mt-2 text-5xl font-black">
            Choose Your Learning Journey 🚀
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Follow real career roadmaps connected with your completed courses,
            milestones, progress, and learning goals.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="rounded-full bg-cyan-500 px-7 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Browse Courses
            </Link>

            <Link
              to="/ai-mentor"
              className="rounded-full border border-white/10 px-7 py-3 hover:bg-white/10"
            >
              Ask Pixi for Guidance
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">🤖 Pixi Recommendation</h2>
          <p className="mt-3 text-slate-300">
            Start with one roadmap. Complete every milestone step by step and
            build projects before moving to advanced topics.
          </p>
        </section>

        {loading ? (
          <p className="text-slate-400">Loading roadmaps...</p>
        ) : roadmaps.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center">
            <div className="text-6xl">🗺️</div>
            <h2 className="mt-4 text-2xl font-bold">No roadmaps added yet</h2>
            <p className="mt-2 text-slate-400">
              Admin can create roadmaps from the backend/admin module.
            </p>
          </div>
        ) : (
          <section className="grid gap-7 lg:grid-cols-2">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap._id}
                className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(34,211,238,0.12)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="flex gap-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/10 text-5xl">
                      {roadmap.icon || "🗺️"}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-cyan-300">
                        {roadmap.level || "Beginner"}
                      </p>

                      <h2 className="mt-1 text-3xl font-black">
                        {roadmap.title}
                      </h2>

                      <p className="mt-2 max-w-md text-slate-400">
                        {roadmap.subtitle || "A structured learning journey."}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                    ⏱ {roadmap.duration || "Flexible"}
                  </div>
                </div>

                <div className="mt-7">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-slate-400">Journey Progress</p>
                    <p className="text-cyan-300">{roadmap.progress || 0}%</p>
                  </div>

                  <div className="mt-3 h-3 rounded-full bg-white/10">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      style={{ width: `${roadmap.progress || 0}%` }}
                    />
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {roadmap.completedCourses || 0} / {roadmap.totalCourses || 0} linked courses completed
                  </p>
                </div>

                <div className="mt-7">
                  <p className="font-bold">Career Roles</p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    {(roadmap.roles || []).length === 0 ? (
                      <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                        Learner
                      </span>
                    ) : (
                      roadmap.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                        >
                          {role}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="font-bold">Milestone Journey</p>

                  <div className="mt-5 space-y-4">
                    {(roadmap.milestones || []).map((milestone, index) => (
                      <div key={milestone._id || milestone.title} className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                            milestone.completed
                              ? "border-cyan-400/30 bg-cyan-500/10 text-cyan-300"
                              : "border-white/10 bg-black/20 text-slate-500"
                          }`}
                        >
                          {milestone.completed ? "✓" : index + 1}
                        </div>

                        <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-4">
                          <p className={milestone.completed ? "font-semibold text-white" : "text-slate-300"}>
                            {milestone.title}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {milestone.completedCourses || 0} / {milestone.totalCourses || 0} courses completed
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="{`/roadmaps/${roadmap._id}`}"
                    className="rounded-full bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-300 hover:bg-white/10"
                  >
                    Start Journey
                  </Link>

                  <Link
                    to="/ai-mentor"
                    className="rounded-full border border-white/10 px-6 py-3 hover:bg-white/10"
                  >
                    Ask Pixi
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}

        <section className="rounded-3xl border border-yellow-400/20 bg-gradient-to-r from-yellow-500/10 to-cyan-500/10 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">🏆 Roadmap Completion Reward</h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            Completing an entire roadmap will unlock a special Cogniverse
            Learning Achievement with certificate verification and skill
            portfolio support.
          </p>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Roadmaps;