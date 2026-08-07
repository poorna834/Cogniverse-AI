import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Star,
  Heart,
  PlayCircle,
  Search,
  BookOpen,
  RefreshCw,
} from "lucide-react";

import { getCourses } from "../services/courseService";
import { addBookmark } from "../services/bookmarkService";
import DashboardLayout from "../layouts/DashboardLayout";

import toast from "react-hot-toast";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [savingCourseId, setSavingCourseId] = useState(null);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCourses(search.trim());
      setCourses(data?.courses || []);
    } catch (error) {
      console.error("Frontend error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load courses. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCourses();
    }, 350);

    return () => clearTimeout(delay);
  }, [search]);

  const categories = useMemo(() => {
    const categoryList = courses
      .map((course) => course?.category)
      .filter(Boolean);

    return ["All", ...new Set(categoryList)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "All") {
      return courses;
    }

    return courses.filter(
      (course) =>
        course?.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [courses, selectedCategory]);

  const handleBookmark = async (courseId) => {
    try {
      setSavingCourseId(courseId);

      await addBookmark(courseId);

      toast.success("Course saved successfully! +10 XP earned");
    } catch (error) {
      console.error("Bookmark error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to save course. Please try again."
      );
    } finally {
      setSavingCourseId(null);
    }
  };

  const handleRetry = () => {
    fetchCourses();
  };

  const getLevelClasses = (level) => {
    const normalizedLevel = level?.toLowerCase();

    if (normalizedLevel === "beginner") {
      return "border-emerald-400/20 bg-emerald-500/15 text-emerald-300";
    }

    if (normalizedLevel === "intermediate") {
      return "border-amber-400/20 bg-amber-500/15 text-amber-300";
    }

    if (normalizedLevel === "advanced") {
      return "border-rose-400/20 bg-rose-500/15 text-rose-300";
    }

    return "border-indigo-400/20 bg-indigo-500/15 text-indigo-300";
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-5 shadow-[0_0_35px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:p-8">
          <div className="pointer-events-none absolute -right-6 -top-6 text-8xl opacity-10 sm:right-5 sm:top-3 sm:text-9xl">
            📚
          </div>

          <div className="relative z-10">
            <p className="text-sm font-semibold text-cyan-300 sm:text-base">
              Curated Learning Library
            </p>

            <h1 className="mt-2 break-words text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Explore Courses
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Discover free learning resources across engineering, medical,
              science, commerce, artificial intelligence, and more.
            </p>

            {/* Search */}
            <div className="relative mt-6 w-full sm:mt-8 md:max-w-xl">
              <Search
                size={20}
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSelectedCategory("All");
                }}
                className="w-full rounded-full border border-cyan-400/30 bg-black/25 py-3.5 pl-13 pr-5 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/10 sm:py-4 sm:text-base"
              />
            </div>

            {/* Categories */}
            {!loading && categories.length > 1 && (
              <div className="mt-5 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
                {categories.map((category) => {
                  const active = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                        active
                          ? "border-cyan-300/50 bg-cyan-500/20 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.16)]"
                          : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Result Summary */}
        {!loading && !error && (
          <section className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Available Learning Paths
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {filteredCourses.length}{" "}
                {filteredCourses.length === 1 ? "course" : "courses"} found
              </p>
            </div>

            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="w-fit text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Clear category filter
              </button>
            )}
          </section>
        )}

        {/* Loading */}
        {loading && <CourseSkeletonGrid />}

        {/* Error */}
        {!loading && error && (
          <section className="rounded-2xl border border-red-400/20 bg-red-500/[0.06] p-6 text-center backdrop-blur-xl sm:rounded-3xl sm:p-10">
            <div className="text-5xl">⚠️</div>

            <h2 className="mt-4 text-2xl font-bold">
              Unable to Load Courses
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </section>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCourses.length === 0 && (
          <section className="rounded-2xl border border-dashed border-cyan-400/20 bg-white/[0.04] p-8 text-center backdrop-blur-xl sm:rounded-3xl sm:p-12">
            <div className="text-6xl">📚</div>

            <h2 className="mt-5 text-2xl font-bold">
              No Courses Found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
              Try another search keyword or choose a different category.
            </p>

            {(search || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Reset Filters
              </button>
            )}
          </section>
        )}

        {/* Courses Grid */}
        {!loading && !error && filteredCourses.length > 0 && (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
            {filteredCourses.map((course) => (
              <article
                key={course._id}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-purple-400/20 bg-white/[0.05] shadow-[0_0_30px_rgba(168,85,247,0.1)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)] sm:rounded-3xl"
              >
                {/* Course Banner */}
                <div className="relative h-36 shrink-0 overflow-hidden bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 sm:h-40 lg:h-44">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />

                  {course?.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title || "Course thumbnail"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-80">
                      📚
                    </div>
                  )}

                  <span className="absolute left-3 top-3 max-w-[75%] truncate rounded-full border border-cyan-400/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md sm:left-4 sm:top-4 sm:px-4 sm:py-2">
                    {course?.category || "General"}
                  </span>

                  {course?.featured && (
                    <span className="absolute right-3 top-3 rounded-full border border-amber-400/20 bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md sm:right-4 sm:top-4">
                      Featured
                    </span>
                  )}
                </div>

                {/* Course Body */}
                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <div className="flex-1">
                    <h2 className="line-clamp-2 break-words text-xl font-bold leading-snug transition group-hover:text-cyan-300 sm:text-2xl">
                      {course?.title || "Untitled Course"}
                    </h2>

                    <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-slate-400 sm:text-base">
                      {course?.description ||
                        "Explore this learning path and improve your skills."}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300 sm:gap-3 sm:text-sm">
                      <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                        <Clock size={15} />
                        {course?.duration || "Self-paced"}
                      </span>

                      <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                        <Star size={15} className="text-amber-300" />
                        {course?.rating || 5}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-2 font-medium ${getLevelClasses(
                          course?.level
                        )}`}
                      >
                        {course?.level || "All Levels"}
                      </span>
                    </div>

                    {course?.instructor && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                        <BookOpen size={16} className="shrink-0" />
                        <span className="truncate">
                          By {course.instructor}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to={`/courses/${course._id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:flex-1"
                    >
                      <PlayCircle size={18} />
                      Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleBookmark(course._id)}
                      disabled={savingCourseId === course._id}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold transition hover:border-pink-400/30 hover:bg-pink-500/10 hover:text-pink-300 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
                    >
                      {savingCourseId === course._id ? (
                        <>
                          <RefreshCw size={18} className="animate-spin" />
                          Saving
                        </>
                      ) : (
                        <>
                          <Heart size={18} />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}

function CourseSkeletonGrid() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl sm:rounded-3xl"
        >
          <div className="h-36 animate-pulse bg-white/[0.06] sm:h-40 lg:h-44" />

          <div className="space-y-4 p-5 sm:p-6">
            <div className="h-6 w-4/5 animate-pulse rounded-full bg-white/[0.08]" />
            <div className="h-4 w-full animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />

            <div className="flex gap-2">
              <div className="h-8 w-24 animate-pulse rounded-full bg-white/[0.06]" />
              <div className="h-8 w-20 animate-pulse rounded-full bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-11 animate-pulse rounded-full bg-white/[0.08]" />
              <div className="h-11 animate-pulse rounded-full bg-white/[0.08]" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Courses;