import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  Eye,
  Download,
  Star,
  FileText,
  RefreshCw,
  X,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getKnowledge } from "../services/knowledgeService";

function KnowledgeHub() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadKnowledge = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getKnowledge();
      setNotes(data?.notes || []);
    } catch (error) {
      console.error("Knowledge Hub error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to load knowledge resources. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, []);

  const categories = useMemo(() => {
    const categoryList = notes
      .map((item) => item?.category)
      .filter(Boolean);

    return ["All", ...new Set(categoryList)];
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return notes.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item?.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !keyword ||
        item?.title?.toLowerCase().includes(keyword) ||
        item?.subject?.toLowerCase().includes(keyword) ||
        item?.chapter?.toLowerCase().includes(keyword) ||
        item?.description?.toLowerCase().includes(keyword) ||
        item?.content?.toLowerCase().includes(keyword) ||
        item?.tags?.some((tag) =>
          String(tag).toLowerCase().includes(keyword)
        );

      return matchesCategory && matchesSearch;
    });
  }, [notes, search, selectedCategory]);

  const featuredNotes = useMemo(
    () => filteredNotes.filter((item) => item?.featured),
    [filteredNotes]
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:rounded-3xl sm:p-7 lg:rounded-[2rem] lg:p-10">
          <div className="pointer-events-none absolute -right-5 -top-5 text-8xl opacity-10 sm:right-6 sm:top-4 sm:text-9xl">
            📘
          </div>

          <div className="relative z-10 max-w-4xl">
            <p className="text-sm font-semibold text-cyan-300 sm:text-base">
              Cogniverse Knowledge Hub
            </p>

            <h1 className="mt-3 break-words text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Learn Beyond Courses
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base lg:text-lg">
              Explore articles, notes, interview questions, MCQs, PDFs and
              carefully curated learning resources.
            </p>

            {/* Search */}
            <div className="relative mt-6 w-full sm:mt-8 md:max-w-2xl">
              <Search
                size={19}
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-cyan-300"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title, subject, chapter or keyword..."
                className="w-full rounded-full border border-cyan-400/20 bg-black/20 py-3.5 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/10 sm:py-4 sm:text-base"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Category Filters */}
        {!loading && !error && categories.length > 1 && (
          <section>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold sm:text-xl">
                Browse Categories
              </h2>

              {(search || selectedCategory !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
              {categories.map((category) => {
                const active = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-cyan-300/50 bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                        : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Loading */}
        {loading && <KnowledgeSkeletonGrid />}

        {/* Error */}
        {!loading && error && (
          <section className="rounded-2xl border border-red-400/20 bg-red-500/[0.06] p-7 text-center backdrop-blur-xl sm:rounded-3xl sm:p-10">
            <div className="text-5xl">⚠️</div>

            <h2 className="mt-4 text-2xl font-black">
              Unable to Load Knowledge
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              {error}
            </p>

            <button
              type="button"
              onClick={loadKnowledge}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </section>
        )}

        {!loading && !error && (
          <>
            {/* Featured */}
            {featuredNotes.length > 0 && (
              <section>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-yellow-500/15 p-3">
                      <Star
                        size={22}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-yellow-300">
                        Recommended
                      </p>

                      <h2 className="text-2xl font-black sm:text-3xl">
                        Featured Resources
                      </h2>
                    </div>
                  </div>

                  <span className="text-sm text-slate-400">
                    {featuredNotes.length} featured
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                  {featuredNotes.map((item) => (
                    <KnowledgeCard
                      key={item._id}
                      item={item}
                      featured
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Resources Header */}
            <section className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-300">
                  Resource Library
                </p>

                <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                  All Resources
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Browse official learning materials prepared for Cogniverse
                  students.
                </p>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                {filteredNotes.length}{" "}
                {filteredNotes.length === 1 ? "Resource" : "Resources"}
              </span>
            </section>

            {/* Empty State */}
            {filteredNotes.length === 0 ? (
              <section className="rounded-2xl border border-dashed border-cyan-400/20 bg-white/[0.04] p-8 text-center backdrop-blur-xl sm:rounded-3xl sm:p-12">
                <div className="text-6xl">🔎</div>

                <h2 className="mt-5 text-2xl font-black">
                  No Resources Found
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                  Try another keyword or select a different category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                >
                  Reset Filters
                </button>
              </section>
            ) : (
              <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {filteredNotes.map((item) => (
                  <KnowledgeCard key={item._id} item={item} />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function KnowledgeCard({ item, featured = false }) {
  const resourceType =
    item?.pdf
      ? "PDF"
      : item?.video
      ? "Video"
      : item?.github
      ? "Resource"
      : "Article";

  return (
    <Link
      to={`/knowledge/${item._id}`}
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-white/[0.05] shadow-[0_0_30px_rgba(34,211,238,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.16)] sm:rounded-3xl ${
        featured
          ? "border-yellow-400/20"
          : "border-white/10"
      }`}
    >
      {/* Image */}
      <div
        className={`relative shrink-0 overflow-hidden bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 ${
          featured
            ? "h-44 sm:h-52"
            : "h-40 sm:h-44 lg:h-48"
        }`}
      >
        {item?.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title || "Knowledge resource"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen
              size={featured ? 76 : 64}
              className="text-cyan-300/70 transition duration-300 group-hover:scale-110"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex max-w-[75%] flex-wrap gap-2 sm:left-4 sm:top-4">
          <span className="max-w-full truncate rounded-full border border-cyan-400/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md">
            {item?.category || "General"}
          </span>

          {item?.featured && (
            <span className="rounded-full border border-yellow-400/20 bg-yellow-400 px-3 py-1.5 text-xs font-bold text-slate-950">
              Featured
            </span>
          )}
        </div>

        <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md sm:bottom-4 sm:right-4">
          {resourceType}
        </span>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          {(item?.subject || item?.chapter) && (
            <p className="mb-2 truncate text-xs font-semibold uppercase tracking-[0.16em] text-purple-300">
              {[item.subject, item.chapter].filter(Boolean).join(" · ")}
            </p>
          )}

          <h3
            className={`line-clamp-2 break-words font-bold leading-snug transition group-hover:text-cyan-300 ${
              featured
                ? "text-2xl sm:text-3xl"
                : "text-xl sm:text-2xl"
            }`}
          >
            {item?.title || "Untitled Resource"}
          </h3>

          <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-slate-400 sm:text-base">
            {item?.description ||
              "Explore this Cogniverse knowledge resource."}
          </p>

          {item?.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="max-w-full truncate rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs text-slate-400 sm:text-sm">
          <Metric
            icon={<Eye size={15} />}
            value={item?.views || 0}
            label="Views"
          />

          <Metric
            icon={<Download size={15} />}
            value={item?.downloads || 0}
            label="Downloads"
          />

          <Metric
            icon={<FileText size={15} />}
            value={item?.mcqs?.length || 0}
            label="MCQs"
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-cyan-300">
            Open resource
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 transition group-hover:bg-cyan-500 group-hover:text-slate-950">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function Metric({ icon, value, label }) {
  return (
    <div className="min-w-0 text-center">
      <div className="flex items-center justify-center gap-1.5 text-slate-300">
        {icon}
        <span className="truncate font-semibold">{value}</span>
      </div>

      <p className="mt-1 truncate text-[10px] text-slate-500 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function KnowledgeSkeletonGrid() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl sm:rounded-3xl"
        >
          <div className="h-40 animate-pulse bg-white/[0.06] sm:h-44 lg:h-48" />

          <div className="space-y-4 p-5 sm:p-6">
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-7 w-4/5 animate-pulse rounded-full bg-white/[0.08]" />
            <div className="h-4 w-full animate-pulse rounded-full bg-white/[0.06]" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />

            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              <div className="h-9 animate-pulse rounded-xl bg-white/[0.05]" />
              <div className="h-9 animate-pulse rounded-xl bg-white/[0.05]" />
              <div className="h-9 animate-pulse rounded-xl bg-white/[0.05]" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default KnowledgeHub;