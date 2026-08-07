import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Edit,
  Trash2,
  PlusCircle,
  Eye,
  Download,
  Star,
  BookOpen,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getKnowledge,
  deleteKnowledge,
} from "../services/knowledgeService";

function ManageKnowledge() {
  const [knowledgeItems, setKnowledgeItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadKnowledge = async () => {
    try {
      setLoading(true);

      const data = await getKnowledge(search);

      setKnowledgeItems(data.notes || []);
    } catch (error) {
      console.error("Knowledge loading error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load Knowledge Hub resources"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadKnowledge();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this knowledge resource?"
    );

    if (!shouldDelete) return;

    try {
      await deleteKnowledge(id);

      alert("Knowledge resource deleted successfully");

      loadKnowledge();
    } catch (error) {
      console.error("Knowledge delete error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete knowledge resource"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.12)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-cyan-300">Admin Knowledge Hub</p>

              <h1 className="mt-2 text-5xl font-black">
                Manage Knowledge 📘
              </h1>

              <p className="mt-3 max-w-2xl text-slate-300">
                Review, edit, publish, and remove official Cogniverse learning
                resources.
              </p>
            </div>

            <Link
              to="/admin/knowledge/add"
              className="flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <PlusCircle size={20} />
              Add Knowledge
            </Link>
          </div>
        </section>

        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-xl">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, category, subject, chapter, or tag..."
              className="w-full rounded-full border border-cyan-400/30 bg-black/25 py-4 pl-12 pr-5 text-white outline-none transition focus:border-cyan-300"
            />
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-slate-300">
            Total Resources:{" "}
            <span className="font-bold text-cyan-300">
              {knowledgeItems.length}
            </span>
          </div>
        </section>

        {loading && (
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center backdrop-blur-xl">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />

            <p className="mt-4 text-slate-400">
              Loading Knowledge Hub resources...
            </p>
          </section>
        )}

        {!loading && knowledgeItems.length === 0 && (
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-12 text-center backdrop-blur-xl">
            <div className="text-7xl">📚</div>

            <h2 className="mt-5 text-3xl font-black">
              No knowledge resources found
            </h2>

            <p className="mt-3 text-slate-400">
              Create your first official Cogniverse note, PDF, MCQ set, or
              learning resource.
            </p>

            <Link
              to="/admin/knowledge/add"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              <PlusCircle size={20} />
              Add First Resource
            </Link>
          </section>
        )}

        {!loading && knowledgeItems.length > 0 && (
          <section className="grid gap-6 lg:grid-cols-2">
            {knowledgeItems.map((item) => (
              <article
                key={item._id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
              >
                <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20">
                  {item.coverImage || item.thumbnail ? (
                    <img
                      src={item.coverImage || item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-7xl">
                      📘
                    </div>
                  )}

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {item.featured && (
                      <span className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-slate-950">
                        <Star size={13} fill="currentColor" />
                        Featured
                      </span>
                    )}

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.published
                          ? "bg-emerald-400 text-slate-950"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-300">
                      {item.category || "General"}
                    </span>

                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-purple-300">
                      {item.level || "General"}
                    </span>

                    {item.subject && (
                      <span className="rounded-full bg-pink-500/10 px-3 py-1 text-pink-300">
                        {item.subject}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-5 text-3xl font-black">
                    {item.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-slate-400">
                    {item.description || "No description added."}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <Metric
                      icon={<Eye size={18} />}
                      label="Views"
                      value={item.views || 0}
                    />

                    <Metric
                      icon={<Download size={18} />}
                      label="Downloads"
                      value={item.downloads || 0}
                    />

                    <Metric
                      icon={<BookOpen size={18} />}
                      label="MCQs"
                      value={item.mcqs?.length || 0}
                    />
                  </div>

                  {item.tags?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {item.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to={`/knowledge/${item._id}`}
                      className="rounded-full border border-cyan-400/30 px-5 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
                    >
                      View
                    </Link>

                    <Link
                      to={`/admin/knowledge/edit/${item._id}`}
                      className="flex items-center gap-2 rounded-full bg-purple-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-400"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>

                  <p className="mt-5 text-xs text-slate-500">
                    Updated:{" "}
                    {item.updatedAt
                      ? new Date(item.updatedAt).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
      <div className="flex justify-center text-cyan-300">
        {icon}
      </div>

      <p className="mt-2 text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-white">
        {value}
      </p>
    </div>
  );
}

export default ManageKnowledge;