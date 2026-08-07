import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { createKnowledge } from "../services/knowledgeService";

function AddKnowledge() {
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

  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

  const [mcqs, setMcqs] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);

  const inputClass =
    "rounded-2xl border border-white/10 bg-black/25 px-4 py-3 outline-none focus:border-cyan-300";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleMcqChange = (index, field, value) => {
    const updated = [...mcqs];
    updated[index][field] = value;
    setMcqs(updated);
  };

  const handleOptionChange = (mcqIndex, optionIndex, value) => {
    const updated = [...mcqs];
    updated[mcqIndex].options[optionIndex] = value;
    setMcqs(updated);
  };

  const addMcq = () => {
    setMcqs([
      ...mcqs,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
  };

  const removeMcq = (index) => {
    setMcqs(mcqs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      importantQuestions: questions.filter((item) => item.question.trim()),

      mcqs: mcqs.filter((item) => item.question.trim()),
    };

    try {
      await createKnowledge(payload);
      alert("Knowledge note created successfully");

      setFormData({
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

      setQuestions([{ question: "", answer: "" }]);
      setMcqs([{ question: "", options: ["", "", "", ""], answer: "" }]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create knowledge note");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-10 backdrop-blur-xl">
          <p className="text-cyan-300">Admin Knowledge Hub</p>
          <h1 className="mt-2 text-5xl font-black">Add Knowledge 📘</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Create official Cogniverse notes, PDFs, MCQs, and learning resources.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Section title="Basic Information">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
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
              placeholder="Category e.g. Programming"
              className={inputClass}
              required
            />

            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject e.g. Java"
              className={inputClass}
            />

            <input
              name="chapter"
              value={formData.chapter}
              onChange={handleChange}
              placeholder="Chapter e.g. Collections"
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
              placeholder="Cover Image URL"
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
              placeholder="GitHub / Resource Link"
              className={`${inputClass} md:col-span-2`}
            />
          </Section>

          <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Knowledge Content</h2>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write full notes content here..."
              className="mt-5 min-h-[420px] w-full rounded-3xl border border-white/10 bg-black/25 p-5 leading-8 outline-none focus:border-cyan-300"
              required
            />

            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags comma separated e.g. Java, OOP, Interview"
              className={`${inputClass} mt-5 w-full`}
            />
          </section>

          <section className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Important Questions</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="rounded-full bg-cyan-500 px-5 py-2 font-semibold text-slate-950"
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
                  <div className="mb-4 flex justify-between">
                    <p className="font-bold text-cyan-300">
                      Question {index + 1}
                    </p>

                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="rounded-full bg-red-500 px-4 py-2 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    value={item.question}
                    onChange={(e) =>
                      handleQuestionChange(index, "question", e.target.value)
                    }
                    placeholder="Question"
                    className={`${inputClass} w-full`}
                  />

                  <textarea
                    value={item.answer}
                    onChange={(e) =>
                      handleQuestionChange(index, "answer", e.target.value)
                    }
                    placeholder="Answer"
                    className={`${inputClass} mt-4 h-24 w-full`}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-pink-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">MCQs</h2>
              <button
                type="button"
                onClick={addMcq}
                className="rounded-full bg-pink-500 px-5 py-2 font-semibold text-white"
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
                  <div className="mb-4 flex justify-between">
                    <p className="font-bold text-pink-300">MCQ {index + 1}</p>

                    {mcqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMcq(index)}
                        className="rounded-full bg-red-500 px-4 py-2 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    value={mcq.question}
                    onChange={(e) =>
                      handleMcqChange(index, "question", e.target.value)
                    }
                    placeholder="MCQ Question"
                    className={`${inputClass} w-full`}
                  />

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {mcq.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(
                            index,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        className={inputClass}
                      />
                    ))}
                  </div>

                  <input
                    value={mcq.answer}
                    onChange={(e) =>
                      handleMcqChange(index, "answer", e.target.value)
                    }
                    placeholder="Correct Answer"
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

            <button className="mt-6 rounded-full bg-cyan-500 px-8 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
              Publish Knowledge
            </button>
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

export default AddKnowledge;