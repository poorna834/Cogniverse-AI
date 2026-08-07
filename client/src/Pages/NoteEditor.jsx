import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { createNote, getNoteById, updateNote } from "../services/noteService";

function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    tags: "",
    pinned: false,
  });

  const inputClass =
    "rounded-2xl border border-white/10 bg-black/25 px-4 py-3 outline-none focus:border-cyan-300";

  useEffect(() => {
    const loadNote = async () => {
      if (!isEdit) return;

      try {
        const data = await getNoteById(id);
        const note = data.note;

        setFormData({
          title: note.title || "",
          content: note.content || "",
          category: note.category || "General",
          tags: note.tags?.join(", ") || "",
          pinned: note.pinned || false,
        });
      } catch (error) {
        alert("Failed to load note");
      }
    };

    loadNote();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      if (isEdit) {
        await updateNote(id, payload);
        alert("Note updated");
      } else {
        await createNote(payload);
        alert("Note created");
      }

      navigate("/notes");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save note");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-10 backdrop-blur-xl">
          <p className="text-cyan-300">Notes Hub</p>
          <h1 className="mt-2 text-5xl font-black">
            {isEdit ? "Edit Note" : "Create Note"} 📝
          </h1>
          <p className="mt-3 text-slate-300">
            Write your thoughts, concepts, summaries, formulas, and revision notes.
          </p>
        </section>

        <form onSubmit={handleSave} className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Note title"
                className={inputClass}
                required
              />

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className={inputClass}
              />

              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags comma separated"
                className={`${inputClass} md:col-span-2`}
              />
            </div>

            <label className="mt-5 flex items-center gap-3">
              <input
                type="checkbox"
                name="pinned"
                checked={formData.pinned}
                onChange={handleChange}
              />
              Pin this note
            </label>
          </section>

          <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Content</h2>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Start writing your note..."
              className="mt-5 min-h-[420px] w-full rounded-3xl border border-white/10 bg-black/25 p-5 leading-8 outline-none focus:border-cyan-300"
            />
          </section>

          <section className="flex flex-wrap gap-4">
            <button className="rounded-full bg-cyan-500 px-8 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
              Save Note
            </button>

            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="rounded-full border border-white/10 px-8 py-3 hover:bg-white/10"
            >
              Cancel
            </button>
          </section>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default NoteEditor;