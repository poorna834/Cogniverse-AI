import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Pin, Trash2, PlusCircle } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { deleteNote, getNotes, togglePinNote } from "../services/noteService";

function NotesHub() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadNotes = async () => {
    try {
      const data = await getNotes(search, category);
      setNotes(data.notes || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [search, category]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;

    try {
      await deleteNote(id);
      loadNotes();
    } catch (error) {
      alert("Failed to delete note");
    }
  };

  const handlePin = async (id) => {
    try {
      await togglePinNote(id);
      loadNotes();
    } catch (error) {
      alert("Failed to update note");
    }
  };

  const categories = ["", "General", "Java", "React", "AI", "Python", "School"];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl">
          <p className="text-cyan-300">Cogniverse Knowledge Vault</p>

          <div className="mt-2 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-5xl font-black">Notes Hub 📝</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Create, organize, pin, search, and revise your learning notes.
              </p>
            </div>

            <Link
              to="/notes/new"
              className="flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              <PlusCircle size={20} />
              New Note
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[1fr_260px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="w-full rounded-full border border-cyan-400/30 bg-black/25 py-4 pl-12 pr-5 outline-none"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-purple-400/30 bg-black/25 px-5 py-4 outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item || "All Categories"}
              </option>
            ))}
          </select>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <StatCard icon="📝" label="Total Notes" value={notes.length} />
          <StatCard
            icon="📌"
            label="Pinned"
            value={notes.filter((note) => note.pinned).length}
          />
          <StatCard
            icon="🗂️"
            label="Categories"
            value={new Set(notes.map((note) => note.category)).size}
          />
        </section>

        {notes.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center">
            <div className="text-6xl">📘</div>
            <h2 className="mt-4 text-2xl font-bold">No notes yet</h2>
            <p className="mt-2 text-slate-400">
              Create your first note and start building your knowledge vault.
            </p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className={`rounded-3xl border p-6 backdrop-blur-xl ${
                  note.pinned
                    ? "border-yellow-400/30 bg-yellow-500/10"
                    : "border-white/10 bg-white/[0.05]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-cyan-300">{note.category}</p>
                    <h2 className="mt-2 text-2xl font-black">{note.title}</h2>
                  </div>

                  {note.pinned && <span className="text-2xl">📌</span>}
                </div>

                <p className="mt-4 line-clamp-4 text-slate-400">
                  {note.content || "No content added."}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {note.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-xs text-slate-500">
                  Updated: {new Date(note.updatedAt).toLocaleDateString()}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/notes/${note._id}`}
                    className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950"
                  >
                    Open
                  </Link>

                  <button
                    onClick={() => handlePin(note._id)}
                    className="rounded-full border border-yellow-400/30 px-4 py-2 text-yellow-300"
                  >
                    <Pin size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="rounded-full bg-red-500 px-4 py-2 text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
      <div className="text-4xl">{icon}</div>
      <p className="mt-4 text-slate-400">{label}</p>
      <h3 className="mt-2 text-4xl font-black text-cyan-300">{value}</h3>
    </div>
  );
}

export default NotesHub;