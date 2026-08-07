import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getRoadmapProgress } from "../services/roadmapService";

function RoadmapDetails() {
  const { id } = useParams();
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        const data = await getRoadmapProgress(id);
        setRoadmapData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadRoadmap();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-slate-400">Loading roadmap...</p>
      </DashboardLayout>
    );
  }

  if (!roadmapData || !roadmapData.roadmap) {
    return (
      <DashboardLayout>
        <p className="text-red-300">Roadmap not found.</p>
      </DashboardLayout>
    );
  }

  const roadmap = roadmapData.roadmap;
  const milestones = roadmapData.milestones || [];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl">
          <div className="absolute right-10 top-8 text-8xl opacity-20">
            {roadmap.icon || "🗺️"}
          </div>

          <p className="text-cyan-300">{roadmap.category || "Career Roadmap"}</p>

          <h1 className="mt-2 text-5xl font-black">{roadmap.title}</h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            {roadmap.subtitle || "A structured learning journey."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">
              {roadmap.level || "Beginner"}
            </span>

            <span className="rounded-full bg-purple-500/10 px-4 py-2 text-purple-300">
              ⏱ {roadmap.duration || "Flexible"}
            </span>

            <span className="rounded-full bg-pink-500/10 px-4 py-2 text-pink-300">
              {milestones.length} Milestones
            </span>
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-8 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">Journey Progress</h2>

            <h2 className="text-4xl font-black text-cyan-300">
              {roadmapData.roadmapProgress || 0}%
            </h2>
          </div>

          <div className="mt-6 h-4 rounded-full bg-white/10">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
              style={{ width: `${roadmapData.roadmapProgress || 0}%` }}
            />
          </div>

          <p className="mt-4 text-slate-400">
            {roadmapData.completedCourses || 0} / {roadmapData.totalCourses || 0}{" "}
            Courses Completed
          </p>
        </section>

        <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">🤖 Pixi Guidance</h2>
          <p className="mt-3 text-slate-300">
            Follow this roadmap step by step. Complete the unlocked milestone
            courses before moving to the next stage.
          </p>
        </section>

        <section className="space-y-6">
          {milestones.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center">
              <div className="text-6xl">📍</div>
              <h2 className="mt-4 text-2xl font-bold">No milestones added</h2>
            </div>
          ) : (
            milestones.map((milestone, index) => {
              const isLocked = milestone.status === "locked";
              const isCompleted = milestone.status === "completed";
              const isUnlocked = milestone.status === "unlocked";

              return (
                <div
                  key={milestone._id || milestone.title}
                  className={`rounded-3xl border p-7 backdrop-blur-xl ${
                    isCompleted
                      ? "border-cyan-400/30 bg-cyan-500/10"
                      : isUnlocked
                      ? "border-purple-400/30 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.03] opacity-60"
                  }`}
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-xl font-black text-cyan-300">
                      {isCompleted ? "✅" : isUnlocked ? "🚀" : "🔒"}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-3xl font-black">
                          {index + 1}. {milestone.title}
                        </h2>

                        <span
                          className={`rounded-full px-4 py-2 text-sm font-bold ${
                            isCompleted
                              ? "bg-cyan-500/10 text-cyan-300"
                              : isUnlocked
                              ? "bg-purple-500/10 text-purple-300"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          {isCompleted
                            ? "Completed"
                            : isUnlocked
                            ? "Unlocked"
                            : "Locked"}
                        </span>
                      </div>

                      <p className="mt-3 text-slate-400">
                        {milestone.description || "No description added."}
                      </p>

                      <p className="mt-3 text-sm text-slate-500">
                        {milestone.completedCourses || 0} /{" "}
                        {milestone.totalCourses || 0} courses completed
                      </p>

                      {milestone.skills?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-3">
                          {milestone.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="text-xl font-bold">Linked Courses</h3>

                        {milestone.courses?.length === 0 ? (
                          <p className="mt-3 text-slate-500">
                            No courses linked yet.
                          </p>
                        ) : (
                          <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {milestone.courses.map((course) => (
                              <div
                                key={course._id}
                                className="rounded-2xl border border-white/10 bg-black/20 p-5"
                              >
                                <h4 className="font-bold">{course.title}</h4>

                                <p className="mt-2 text-sm text-slate-400">
                                  {course.category || "General"} •{" "}
                                  {course.level || "Beginner"}
                                </p>

                                {isLocked ? (
                                  <button
                                    disabled
                                    className="mt-4 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-slate-500"
                                  >
                                    Locked
                                  </button>
                                ) : (
                                  <Link
                                    to={`/courses/${course._id}`}
                                    className="mt-4 inline-block rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950"
                                  >
                                    {isCompleted ? "Review Course" : "Start Course"}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>

        <section className="rounded-3xl border border-yellow-400/20 bg-gradient-to-r from-yellow-500/10 to-cyan-500/10 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">🏆 Completion Reward</h2>
          <p className="mt-3 text-slate-300">
            Complete all linked courses in this roadmap to unlock a future
            Cogniverse Roadmap Achievement.
          </p>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default RoadmapDetails;