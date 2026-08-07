import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Clock,
  Star,
  ExternalLink,
  GitBranch,
  BookOpen,
  CheckCircle,
  Trophy,
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { completeCourse, getMyProgress } from "../services/progressService";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchCourse();
    fetchProgress();
  }, [id]);

  const fetchCourse = async () => {
    const response = await API.get(`/courses/${id}`);
    setCourse(response.data.course);
  };

  const fetchProgress = async () => {
    try {
      const data = await getMyProgress();

      const found = data.progress.find(
        (item) => item.course?._id === id && item.completed
      );

      setCompleted(Boolean(found));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteCourse = async () => {
    try {
      const data = await completeCourse(id);

      const oldUser = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...oldUser,
          xp: data.user.xp,
          level: data.user.level,
          badges: data.user.badges,
        })
      );

      setCompleted(true);
      toast.success(`🎉 Course completed! +${data.xpEarned} XP`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to complete course");
    }
  };

  if (!course) {
    return (
      <DashboardLayout>
        <p className="text-slate-400">Loading course...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_45px_rgba(34,211,238,0.15)]">
          <div className="relative h-72 bg-gradient-to-br from-cyan-500/25 via-purple-500/25 to-pink-500/20">
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              📚
            </div>

            <span className="absolute left-8 top-8 rounded-full bg-black/40 px-5 py-2 text-cyan-300 backdrop-blur">
              {course.category}
            </span>

            {completed && (
              <span className="absolute right-8 top-8 rounded-full bg-emerald-500 px-5 py-2 font-semibold text-white">
                Completed ✅
              </span>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-5xl font-black">{course.title}</h1>

            <p className="mt-5 max-w-3xl text-lg text-slate-300">
              {course.description}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {[
                ["Level", course.level],
                ["Duration", course.duration],
                ["Platform", course.platform],
                ["Rating", `${course.rating || 5} ⭐`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <p className="text-slate-400">{label}</p>
                  <h3 className="mt-2 font-bold text-white">{value}</h3>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <h2 className="flex items-center gap-2 text-2xl font-bold">
                    <Trophy className="text-yellow-300" />
                    Completion Reward
                  </h2>
                  <p className="mt-2 text-slate-300">
                    Complete this course to earn +100 XP and unlock certificate eligibility.
                  </p>
                </div>

                <button
                  onClick={handleCompleteCourse}
                  disabled={completed}
                  className={`rounded-full px-7 py-3 font-semibold ${
                    completed
                      ? "bg-emerald-500 text-white"
                      : "bg-cyan-500 text-slate-950 hover:bg-cyan-300"
                  }`}
                >
                  {completed ? "Completed" : "Mark as Completed"}
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={course.courseLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
              >
                <ExternalLink size={18} /> Start Learning
              </a>

              <a
                href={course.documentation}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold hover:bg-white/10"
              >
                <BookOpen size={18} /> Documentation
              </a>

              <a
                href={course.githubRepo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold hover:bg-white/10"
              >
                <GitBranch size={18} /> GitHub Repo
              </a>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-purple-400/20 bg-white/[0.04] p-6">
                <Clock className="text-cyan-300" />
                <h3 className="mt-4 text-xl font-bold">Learning Time</h3>
                <p className="mt-2 text-slate-400">{course.duration}</p>
              </div>

              <div className="rounded-3xl border border-purple-400/20 bg-white/[0.04] p-6">
                <Star className="text-purple-300" />
                <h3 className="mt-4 text-xl font-bold">Skills Covered</h3>
                <p className="mt-2 text-slate-400">
                  {course.skills?.join(", ")}
                </p>
              </div>

              <div className="rounded-3xl border border-purple-400/20 bg-white/[0.04] p-6">
                <CheckCircle className="text-emerald-300" />
                <h3 className="mt-4 text-xl font-bold">Certificate Status</h3>
                <p className="mt-2 text-slate-400">
                  {completed ? "Eligible for certificate" : "Complete course to unlock"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CourseDetails;