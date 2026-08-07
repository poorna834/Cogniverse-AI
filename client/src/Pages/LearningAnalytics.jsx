import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Flame,
  Heart,
  LibraryBig,
  Map,
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getLearningAnalytics } from "../services/learningAnalyticsService";

function LearningAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadAnalytics = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await getLearningAnalytics();
      setAnalytics(data?.analytics || null);
    } catch (err) {
      console.error("Learning analytics error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load your learning analytics."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const totalLearningActions = useMemo(() => {
    if (!analytics) return 0;

    return (
      Number(analytics.courses?.completed || 0) +
      Number(analytics.bookmarks?.total || 0) +
      Number(analytics.certificates?.total || 0) +
      Number(analytics.studyPlanner?.completedTasks || 0)
    );
  }, [analytics]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-7xl">
          <AnalyticsSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !analytics) {
    return (
      <DashboardLayout>
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-red-400/20 bg-red-500/10 p-6 text-center sm:rounded-3xl sm:p-10">
          <div className="text-5xl sm:text-6xl">📊</div>

          <h1 className="mt-5 text-2xl font-black sm:text-3xl">
            Analytics could not be loaded
          </h1>

          <p className="mt-3 break-words text-sm leading-6 text-red-200 sm:text-base">
            {error || "No analytics data is available."}
          </p>

          <button
            type="button"
            onClick={() => loadAnalytics()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const user = analytics.user || {};
  const courses = analytics.courses || {};
  const bookmarks = analytics.bookmarks || {};
  const certificates = analytics.certificates || {};
  const roadmaps = analytics.roadmaps || {};
  const knowledge = analytics.knowledge || {};
  const studyPlanner = analytics.studyPlanner || {};
  const recentActivity = Array.isArray(analytics.recentActivity)
    ? analytics.recentActivity
    : [];

  const courseCompletionRate = clampPercentage(courses.completionRate);
  const taskCompletionRate = clampPercentage(
    studyPlanner.completionRate
  );

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-5 shadow-[0_0_55px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:rounded-3xl sm:p-8 lg:rounded-[2rem] lg:p-10">
          <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl sm:h-64 sm:w-64" />

          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="pointer-events-none absolute right-6 top-6 hidden text-7xl opacity-10 sm:block lg:right-10 lg:top-8 lg:text-8xl">
            📊
          </div>

          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 sm:px-4 sm:py-2 sm:text-sm">
                <Sparkles size={16} />
                Cogniverse Learning Intelligence
              </div>

              <h1 className="mt-4 break-words text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Learning Analytics
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
                Track your completed courses, study consistency,
                certificates, XP, learning actions and overall progress.
              </p>
            </div>

            <button
              type="button"
              onClick={() => loadAnalytics(true)}
              disabled={refreshing}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-6"
            >
              <RefreshCw
                size={18}
                className={refreshing ? "animate-spin" : ""}
              />

              {refreshing ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          <AnalyticsCard
            icon={<BookOpen size={25} />}
            label="Courses Completed"
            value={courses.completed || 0}
            subtext={`${courses.inProgress || 0} currently in progress`}
            color="cyan"
          />

          <AnalyticsCard
            icon={<Heart size={25} />}
            label="Saved Courses"
            value={bookmarks.total || 0}
            subtext="Resources saved in your learning vault"
            color="pink"
          />

          <AnalyticsCard
            icon={<Trophy size={25} />}
            label="Certificates"
            value={certificates.total || 0}
            subtext="Learning achievements earned"
            color="purple"
          />

          <AnalyticsCard
            icon={<CalendarCheck size={25} />}
            label="Completed Tasks"
            value={studyPlanner.completedTasks || 0}
            subtext={`${studyPlanner.pendingTasks || 0} study tasks pending`}
            color="blue"
          />
        </section>

        {/* Course and Growth */}
        <section className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8">
          <ProgressPanel
            eyebrow="Course Performance"
            title="Course Completion"
            percentage={courseCompletionRate}
            gradient="from-cyan-400 via-blue-500 to-purple-500"
            accent="text-cyan-300"
          >
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              <SmallMetric
                label="Available"
                value={courses.total || 0}
              />

              <SmallMetric
                label="Completed"
                value={courses.completed || 0}
              />

              <SmallMetric
                label="In Progress"
                value={courses.inProgress || 0}
              />
            </div>

            <Link
              to="/courses"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
            >
              Explore Courses
              <ChevronRight size={17} />
            </Link>
          </ProgressPanel>

          <section className="rounded-2xl border border-purple-400/20 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8">
            <p className="text-sm font-semibold text-purple-300">
              Student Growth
            </p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              XP and Consistency
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <GrowthMetric
                icon={<Sparkles size={22} />}
                label="Total XP"
                value={user.xp || 0}
              />

              <GrowthMetric
                icon={<Award size={22} />}
                label="Current Level"
                value={user.level || 1}
              />

              <GrowthMetric
                icon={<Flame size={22} />}
                label="Day Streak"
                value={user.streak || 0}
              />

              <GrowthMetric
                icon={<BarChart3 size={22} />}
                label="Actions"
                value={totalLearningActions}
              />
            </div>
          </section>
        </section>

        {/* Study Planner and Resources */}
        <section className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-8">
          <ProgressPanel
            eyebrow="Study Planner"
            title="Task Completion"
            percentage={taskCompletionRate}
            gradient="from-pink-400 to-purple-500"
            accent="text-pink-300"
            border="border-pink-400/20"
          >
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              <SmallMetric
                label="Total Tasks"
                value={studyPlanner.totalTasks || 0}
              />

              <SmallMetric
                label="Completed"
                value={studyPlanner.completedTasks || 0}
              />

              <SmallMetric
                label="Pending"
                value={studyPlanner.pendingTasks || 0}
              />
            </div>

            <Link
              to="/study-planner"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 px-5 py-3 font-semibold text-white transition hover:bg-pink-400 sm:w-auto"
            >
              Open Study Planner
              <ChevronRight size={17} />
            </Link>
          </ProgressPanel>

          <section className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8">
            <p className="text-sm font-semibold text-cyan-300">
              Learning Library
            </p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Available Resources
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResourceMetric
                icon={<Map size={23} />}
                label="Roadmaps"
                value={roadmaps.totalAvailable || 0}
                link="/roadmaps"
              />

              <ResourceMetric
                icon={<LibraryBig size={23} />}
                label="Knowledge Resources"
                value={knowledge.totalAvailable || 0}
                link="/knowledge"
              />
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-300">
                  <Target size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-slate-400">
                    Your learning suggestion
                  </p>

                  <h3 className="mt-2 break-words text-base font-bold leading-6 text-cyan-300 sm:text-lg">
                    {courses.inProgress > 0
                      ? "Continue one in-progress course and complete the next module."
                      : "Explore a course or knowledge resource and begin learning today."}
                  </h3>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Recent Activity and Pixi */}
        <section className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8">
          <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-cyan-300">
                  Latest Progress
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Recent Activity
                </h2>
              </div>

              <div className="shrink-0 rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                <BarChart3 size={27} />
              </div>
            </div>

            {recentActivity.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6 text-center sm:rounded-3xl sm:p-8">
                <div className="text-5xl">🌱</div>

                <h3 className="mt-4 text-xl font-bold">
                  No recent activity yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                  Start a course or complete a study task to generate
                  learning analytics.
                </p>

                <Link
                  to="/courses"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/30 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/10 sm:w-auto"
                >
                  Start Learning
                  <ChevronRight size={17} />
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-3 sm:space-y-4">
                {recentActivity.slice(0, 8).map((activity, index) => (
                  <ActivityItem
                    key={`${activity.type || "activity"}-${
                      activity.date || index
                    }-${index}`}
                    activity={activity}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-purple-500/15 p-3 text-purple-300">
                <Sparkles size={25} />
              </div>

              <h2 className="text-2xl font-black sm:text-3xl">
                Pixi Insight
              </h2>
            </div>

            <p className="mt-5 break-words text-sm leading-7 text-slate-300 sm:text-base">
              Hi{" "}
              <span className="font-semibold text-white">
                {user.name || "Student"}
              </span>
              ! You have completed{" "}
              <span className="font-bold text-cyan-300">
                {courses.completed || 0}
              </span>{" "}
              courses and earned{" "}
              <span className="font-bold text-purple-300">
                {certificates.total || 0}
              </span>{" "}
              certificates.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
              <p className="text-sm text-slate-400">
                Recommended next action
              </p>

              <h3 className="mt-2 break-words text-lg font-bold leading-7 text-cyan-300">
                {courses.inProgress > 0
                  ? "Continue your current course and complete one module."
                  : "Choose a new course from the Learning Center."}
              </h3>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Link
                to="/ai-mentor"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-500 px-5 py-3 font-semibold text-white transition hover:bg-purple-400"
              >
                Ask Pixi
                <Sparkles size={17} />
              </Link>

              <Link
                to="/roadmaps"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 font-semibold text-slate-300 transition hover:bg-white/10"
              >
                View Roadmaps
                <ChevronRight size={17} />
              </Link>
            </div>
          </section>
        </section>
      </div>
    </DashboardLayout>
  );
}

function AnalyticsCard({
  icon,
  label,
  value,
  subtext,
  color = "cyan",
}) {
  const styles = {
    cyan: {
      border: "border-cyan-400/20",
      icon: "bg-cyan-500/10 text-cyan-300",
      glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]",
    },
    pink: {
      border: "border-pink-400/20",
      icon: "bg-pink-500/10 text-pink-300",
      glow: "hover:shadow-[0_0_30px_rgba(244,114,182,0.1)]",
    },
    purple: {
      border: "border-purple-400/20",
      icon: "bg-purple-500/10 text-purple-300",
      glow: "hover:shadow-[0_0_30px_rgba(192,132,252,0.1)]",
    },
    blue: {
      border: "border-blue-400/20",
      icon: "bg-blue-500/10 text-blue-300",
      glow: "hover:shadow-[0_0_30px_rgba(96,165,250,0.1)]",
    },
  };

  const selectedStyle = styles[color] || styles.cyan;

  return (
    <article
      className={`min-w-0 rounded-2xl border bg-white/[0.05] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-6 ${selectedStyle.border} ${selectedStyle.glow}`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${selectedStyle.icon}`}
      >
        {icon}
      </div>

      <p className="mt-5 break-words text-sm text-slate-400">
        {label}
      </p>

      <h3 className="mt-2 break-words text-3xl font-black text-white sm:text-4xl">
        {value}
      </h3>

      <p className="mt-2 break-words text-xs leading-5 text-slate-500 sm:text-sm">
        {subtext}
      </p>
    </article>
  );
}

function ProgressPanel({
  eyebrow,
  title,
  percentage,
  gradient,
  accent,
  border = "border-cyan-400/20",
  children,
}) {
  return (
    <section
      className={`min-w-0 rounded-2xl border bg-white/[0.05] p-5 backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8 ${border}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className={`text-sm font-semibold ${accent}`}>
            {eyebrow}
          </p>

          <h2 className="mt-2 break-words text-2xl font-black sm:text-3xl">
            {title}
          </h2>
        </div>

        <div
          className={`shrink-0 text-3xl font-black sm:text-4xl ${accent}`}
        >
          {percentage}%
        </div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10 sm:h-4">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

function SmallMetric({ label, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 text-center sm:p-5">
      <p className="break-words text-xs text-slate-400 sm:text-sm">
        {label}
      </p>

      <p className="mt-2 break-words text-2xl font-black text-white sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

function GrowthMetric({ icon, label, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
      <div className="text-purple-300">{icon}</div>

      <p className="mt-4 break-words text-xs text-slate-400 sm:text-sm">
        {label}
      </p>

      <p className="mt-2 break-words text-2xl font-black text-white sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

function ResourceMetric({ icon, label, value, link }) {
  return (
    <Link
      to={link}
      className="group min-w-0 rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-cyan-300/40 hover:bg-cyan-500/[0.04]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-300">
          {icon}
        </div>

        <ChevronRight
          size={18}
          className="mt-1 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-300"
        />
      </div>

      <p className="mt-4 break-words text-sm text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-3xl font-black text-white">
        {value}
      </p>
    </Link>
  );
}

function ActivityItem({ activity }) {
  const activityConfig = {
    certificate_earned: {
      icon: "🏆",
      background: "bg-yellow-500/10",
    },
    course_completed: {
      icon: "✅",
      background: "bg-emerald-500/10",
    },
    task_completed: {
      icon: "📅",
      background: "bg-pink-500/10",
    },
    bookmark_added: {
      icon: "❤️",
      background: "bg-red-500/10",
    },
    knowledge_viewed: {
      icon: "📘",
      background: "bg-cyan-500/10",
    },
  };

  const config =
    activityConfig[activity.type] || activityConfig.knowledge_viewed;

  return (
    <article className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/20 sm:gap-4 sm:p-5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg sm:h-11 sm:w-11 sm:text-xl ${config.background}`}
      >
        {config.icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="break-words font-bold text-white">
          {activity.title || "Learning activity"}
        </h3>

        {activity.description && (
          <p className="mt-1 break-words text-sm leading-6 text-slate-400">
            {activity.description}
          </p>
        )}

        <p className="mt-2 text-xs text-slate-500">
          {formatActivityDate(activity.date)}
        </p>
      </div>

      <CheckCircle2
        size={17}
        className="mt-1 shrink-0 text-emerald-300/70"
      />
    </article>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:rounded-3xl sm:p-8 lg:p-10">
        <div className="h-8 w-52 animate-pulse rounded-full bg-white/[0.07]" />
        <div className="mt-5 h-12 w-4/5 animate-pulse rounded-xl bg-white/[0.08] sm:w-1/2" />
        <div className="mt-5 h-5 w-full animate-pulse rounded-full bg-white/[0.06]" />
        <div className="mt-3 h-5 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:rounded-3xl"
          >
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-white/[0.08]" />
            <div className="mt-5 h-4 w-32 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="mt-4 h-10 w-20 animate-pulse rounded-lg bg-white/[0.08]" />
            <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-white/[0.05]" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:rounded-3xl sm:p-8"
          >
            <div className="h-5 w-36 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="mt-4 h-8 w-52 animate-pulse rounded-lg bg-white/[0.08]" />
            <div className="mt-7 h-4 w-full animate-pulse rounded-full bg-white/[0.07]" />

            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="h-24 animate-pulse rounded-2xl bg-white/[0.05]" />
              <div className="h-24 animate-pulse rounded-2xl bg-white/[0.05]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function clampPercentage(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(number)));
}

function formatActivityDate(date) {
  if (!date) {
    return "Recently";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently";
  }

  return parsedDate.toLocaleString();
}

export default LearningAnalytics;