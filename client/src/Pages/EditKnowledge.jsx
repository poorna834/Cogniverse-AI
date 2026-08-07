import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import {
  getKnowledgeById,
  updateKnowledge,
} from "../services/knowledgeService";

function EditKnowledge() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    subject: "",
    chapter: "",
    level: "Engineering",
    thumbnail: "",
    coverImage: "",
    content: "",
    pdf: "",
    video: "",
    github: "",
    tags: "",
    featured: false,
    published: true,
  });

  const [questions, setQuestions] = useState([
    {
      question: "",
      answer: "",
    },
  ]);

  const [mcqs, setMcqs] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);

  const inputClass =
    "rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition focus:border-cyan-300";

  useEffect(() => {
    const loadKnowledge = async () => {
      try {
        const data = await getKnowledgeById(id);
        const note = data.note;

        setFormData({
          title: note.title || "",
          slug: note.slug || "",
          description: note.description || "",
          category: note.category || "",
          subject: note.subject || "",
          chapter: note.chapter || "",
          level: note.level || "Engineering",
          thumbnail: note.thumbnail || "",
          coverImage: note.coverImage || "",
          content: note.content || "",
          pdf: note.pdf || "",
          video: note.video || "",
          github: note.github || "",
          tags: note.tags?.join(", ") || "",
          featured: Boolean(note.featured),
          published: note.published !== false,
        });

        setQuestions(
          note.importantQuestions?.length > 0
            ? note.importantQuestions.map((item) => ({
                question: item.question || "",
                answer: item.answer || "",
              }))
            : [{ question: "", answer: "" }]
        );

        setMcqs(
          note.mcqs?.length > 0
            ? note.mcqs.map((item) => ({
                question: item.question || "",
                options: [
                  item.options?.[0] || "",
                  item.options?.[1] || "",
                  item.options?.[2] || "",
                  item.options?.[3] || "",
                ],
                answer: item.answer || "",
              }))
            : [
                {
                  question: "",
                  options: ["", "", "", ""],
                  answer: "",
                },
              ]
        );
      } catch (error) {
        console.error("Knowledge loading error:", error);

        alert(
          error.response?.data?.message ||
            "Failed to load the knowledge resource"
        );

        navigate("/admin/knowledge");
      } finally {
        setLoading(false);
      }
    };

    loadKnowledge();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const addQuestion = () => {
    setQuestions((previous) => [
      ...previous,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleMcqChange = (index, field, value) => {
    setMcqs((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleOptionChange = (mcqIndex, optionIndex, value) => {
    setMcqs((previous) =>
      previous.map((item, itemIndex) => {
        if (itemIndex !== mcqIndex) {
          return item;
        }

        const updatedOptions = [...item.options];
        updatedOptions[optionIndex] = value;

        return {
          ...item,
          options: updatedOptions,
        };
      })
    );
  };

  const addMcq = () => {
    setMcqs((previous) => [
      ...previous,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const removeMcq = (index) => {
    setMcqs((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validQuestions = questions
      .filter((item) => item.question.trim())
      .map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      }));

    const validMcqs = mcqs
      .filter((item) => item.question.trim())
      .map((item) => ({
        question: item.question.trim(),
        options: item.options
          .map((option) => option.trim())
          .filter(Boolean),
        answer: item.answer.trim(),
      }));

    const payload = {
      ...formData,
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      subject: formData.subject.trim(),
      chapter: formData.chapter.trim(),
      content: formData.content.trim(),
      thumbnail: formData.thumbnail.trim(),
      coverImage: formData.coverImage.trim(),
      pdf: formData.pdf.trim(),
      video: formData.video.trim(),
      github: formData.github.trim(),

      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      importantQuestions: validQuestions,
      mcqs: validMcqs,
    };

    try {
      setSaving(true);

      await updateKnowledge(id, payload);

      alert("Knowledge resource updated successfully");

      navigate("/admin/knowledge");
    } catch (error) {
      console.error("Knowledge update error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update the knowledge resource"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />
            <p className="mt-5 text-slate-400">
              Loading knowledge resource...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-pink-500/10 p-10 backdrop-blur-xl">
          <p className="text-purple-300">Admin Knowledge Hub</p>

          <h1 className="mt-2 text-5xl font-black">
            Edit Knowledge 📘
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Update official Cogniverse notes, learning resources, important
            questions, MCQs, PDFs, and publishing settings.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Section title="Basic Information">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Knowledge title"
              className={inputClass}
              required
            />

            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Unique slug"
              className={inputClass}
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description"
              className={`${inputClass} h-28 md:col-span-2`}
            />
          </Section>

          <Section title="Classification">
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className={inputClass}
              required
            />

            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={inputClass}
            />

            <input
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
              placeholder="Chapter"
              className={inputClass}
            />

            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className={inputClass}
            >
              <option>School</option>
              <option>PUC</option>
              <option>Diploma</option>
              <option>Engineering</option>
              <option>Professional</option>
              <option>General</option>
            </select>
          </Section>

          <Section title="Media & Resources">
            <input
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className={inputClass}
            />

            <input
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="Cover image URL"
              className={inputClass}
            />

            <input
              name="pdf"
              value={formData.pdf}
              onChange={handleChange}
              placeholder="PDF URL"
              className={inputClass}
            />

            <input
              name="video"
              value={formData.video}
              onChange={handleChange}
              placeholder="Video URL"
              className={inputClass}
            />

            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="GitHub or supporting resource URL"
              className={`${inputClass} md:col-span-2`}
            />
          </Section>

          <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Knowledge Content</h2>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write full knowledge content here..."
              className="mt-5 min-h-[420px] w-full rounded-3xl border border-white/10 bg-black/25 p-5 leading-8 text-white outline-none transition focus:border-cyan-300"
              required
            />

            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags separated by commas"
              className={`${inputClass} mt-5 w-full`}
            />
          </section>

          <section className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Important Questions</h2>

              <button
                type="button"
                onClick={addQuestion}
                className="rounded-full bg-cyan-500 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-300"
              >
                + Add Question
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {questions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="font-bold text-cyan-300">
                      Question {index + 1}
                    </p>

                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    value={item.question}
                    onChange={(event) =>
                      handleQuestionChange(
                        index,
                        "question",
                        event.target.value
                      )
                    }
                    placeholder="Question"
                    className={`${inputClass} w-full`}
                  />

                  <textarea
                    value={item.answer}
                    onChange={(event) =>
                      handleQuestionChange(
                        index,
                        "answer",
                        event.target.value
                      )
                    }
                    placeholder="Answer"
                    className={`${inputClass} mt-4 h-28 w-full`}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-pink-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">MCQs</h2>

              <button
                type="button"
                onClick={addMcq}
                className="rounded-full bg-pink-500 px-5 py-2 font-semibold text-white hover:bg-pink-400"
              >
                + Add MCQ
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {mcqs.map((mcq, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="font-bold text-pink-300">
                      MCQ {index + 1}
                    </p>

                    {mcqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMcq(index)}
                        className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    value={mcq.question}
                    onChange={(event) =>
                      handleMcqChange(index, "question", event.target.value)
                    }
                    placeholder="MCQ question"
                    className={`${inputClass} w-full`}
                  />

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {mcq.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        value={option}
                        onChange={(event) =>
                          handleOptionChange(
                            index,
                            optionIndex,
                            event.target.value
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        className={inputClass}
                      />
                    ))}
                  </div>

                  <input
                    value={mcq.answer}
                    onChange={(event) =>
                      handleMcqChange(index, "answer", event.target.value)
                    }
                    placeholder="Correct answer"
                    className={`${inputClass} mt-4 w-full`}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Featured
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                />
                Published
              </label>
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update Knowledge"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/knowledge")}
                className="rounded-full border border-white/10 px-8 py-3 transition hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </section>
        </form>
      </div>
    </DashboardLayout>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>

      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

export default EditKnowledge;