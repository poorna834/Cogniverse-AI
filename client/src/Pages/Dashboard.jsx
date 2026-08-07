import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import NeonStatCard from "../components/NeonStatCard";

import { getCourses } from "../services/courseService";
import { getBookmarks } from "../services/bookmarkService";
import { getMyCertificates } from "../services/certificateService";

function Dashboard() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Invalid user data:", error);
  }

  const isAdmin = user?.role === "admin";

  const [courseCount, setCourseCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [certificateCount, setCertificateCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);

      const [courseData, bookmarkData, certificateData] = await Promise.all([
        getCourses(""),
        getBookmarks(),
        getMyCertificates(),
      ]);

      setCourseCount(courseData?.courses?.length || 0);
      setSavedCount(bookmarkData?.bookmarks?.length || 0);
      setCertificateCount(certificateData?.certificates?.length || 0);
    } catch (error) {
      console.error("Dashboard stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const learningMissions = [
    {
      number: "01",
      title: "Complete one lesson",
      description: "Build consistency",
    },
    {
      number: "02",
      title: "Save one useful course",
      description: "Build your learning vault",
    },
    {
      number: "03",
      title: "Ask Pixi one doubt",
      description: "Learn with AI support",
    },
  ];

  const learningZones = [
    {
      icon: "💻",
      title: "Coding",
      description: "Build real-world applications",
      path: "/courses",
    },
    {
      icon: "🧬",
      title: "Biology",
      description: "Explore science and life",
      path: "/knowledge",
    },
    {
      icon: "🤖",
      title: "Artificial Intelligence",
      description: "Learn modern AI concepts",
      path: "/courses",
    },
    {
      icon: "📊",
      title: "Data",
      description: "Understand data and analytics",
      path: "/courses",
    },
    {
      icon: "💼",
      title: "Business",
      description: "Develop career-ready skills",
      path: "/courses",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-5 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:rounded-[2rem] lg:p-10">
          <div className="pointer-events-none absolute -right-5 -top-4 text-7xl opacity-10 sm:right-6 sm:top-4 sm:text-8xl lg:right-10 lg:top-8 lg:text-9xl">
            🚀
          </div>

          <div className="relative z-10 max-w-4xl">
            <p className="text-sm font-semibold text-cyan-300 sm:text-base">
              {isAdmin ? "Admin Mission Control" : "Student Mission Control"}
            </p>

            <h1 className="mt-3 break-words text-3xl font-black leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Good to see you,{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                {user?.name || "Student"}
              </span>{" "}
              👋
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
              Today is a great day to learn something powerful. Pixi has
              prepared your personalized learning journey.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                to="/courses"
                className="flex w-full items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto sm:px-7 sm:text-base"
              >
                Start Learning
              </Link>

              <Link
                to="/bookmarks"
                className="flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold transition hover:bg-white/10 sm:w-auto sm:px-7 sm:text-base"
              >
                Continue Saved Courses
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <NeonStatCard
            icon="🔥"
            value={loading ? "..." : user?.streak || 0}
            label="Day Streak"
            growth="Keep going"
            color="pink"
          />

          <NeonStatCard
            icon="📚"
            value={loading ? "..." : courseCount}
            label="Learning Paths"
            growth="Available"
            color="purple"
          />

          <NeonStatCard
            icon="❤️"
            value={loading ? "..." : savedCount}
            label="Saved Courses"
            growth="Bookmarked"
            color="cyan"
          />

          <NeonStatCard
            icon="🏆"
            value={loading ? "..." : certificateCount}
            label="Certificates"
            growth="Earned"
            color="blue"
          />
        </section>

        {/* Mission and Pixi */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_0.8fr] lg:gap-6">
          <div className="min-w-0 rounded-2xl border border-cyan-400/20 bg-white/[0.05] p-5 shadow-[0_0_35px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-300">
                  Daily Progress
                </p>

                <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                  Today&apos;s Learning Mission
                </h2>
              </div>

              <div className="w-fit rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                3 Tasks
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Complete one course module, save one useful resource, and keep
              your learning streak alive.
            </p>

            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              {learningMissions.map((mission) => (
                <div
                  key={mission.number}
                  className="flex min-w-0 items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-cyan-400/30 hover:bg-cyan-500/[0.04] sm:gap-5 sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-300 sm:h-12 sm:w-12">
                    {mission.number}
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words font-bold">
                      {mission.title}
                    </h3>

                    <p className="mt-1 break-words text-sm text-slate-400 sm:text-base">
                      {mission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-purple-400/20 bg-white/[0.05] p-5 shadow-[0_0_35px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/20 text-2xl">
                🤖
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-purple-300">
                  AI Learning Assistant
                </p>

                <h2 className="break-words text-2xl font-bold sm:text-3xl">
                  Pixi AI Companion
                </h2>
              </div>
            </div>

            <p className="mt-5 break-words text-sm leading-7 text-slate-300 sm:text-base">
              “Hi {user?.name || "Student"}! Want me to help you choose your
              next learning path?”
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 sm:mt-8 sm:p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 sm:text-sm">
                Suggested focus
              </p>

              <h3 className="mt-2 break-words text-xl font-bold text-cyan-300 sm:text-2xl">
                Full Stack Development
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Strengthen your frontend, backend, database, and deployment
                skills.
              </p>
            </div>

            <Link
              to="/ai-mentor"
              className="mt-5 flex w-full items-center justify-center rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold transition hover:bg-purple-400 sm:mt-6 sm:w-fit sm:text-base"
            >
              Ask Pixi
            </Link>
          </div>
        </section>

        {/* Learning Zones */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                Discover More
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                Explore Learning Zones
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                Quick access to popular learning categories.
              </p>
            </div>

            <Link
              to="/courses"
              className="mt-2 w-fit text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 sm:mt-0"
            >
              View all courses →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {learningZones.map((zone) => (
              <Link
                key={zone.title}
                to={zone.path}
                className="group min-w-0 rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-500/[0.05]"
              >
                <div className="text-3xl">{zone.icon}</div>

                <h3 className="mt-4 break-words font-bold transition group-hover:text-cyan-300">
                  {zone.title}
                </h3>

                <p className="mt-2 break-words text-sm leading-6 text-slate-400">
                  {zone.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;