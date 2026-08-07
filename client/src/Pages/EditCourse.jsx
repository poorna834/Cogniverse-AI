import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { updateCourse } from "../services/courseService";
import DashboardLayout from "../layouts/DashboardLayout";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    subCategory: "",
    level: "Beginner",
    duration: "",
    instructor: "",
    platform: "",
    language: "English",
    thumbnail: "",
    courseLink: "",
    documentation: "",
    githubRepo: "",
    tags: "",
    skills: "",
    prerequisites: "",
    featured: false,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await API.get(`/courses/${id}`);
      const course = response.data.course;

      setFormData({
        title: course.title || "",
        slug: course.slug || "",
        description: course.description || "",
        category: course.category || "",
        subCategory: course.subCategory || "",
        level: course.level || "Beginner",
        duration: course.duration || "",
        instructor: course.instructor || "",
        platform: course.platform || "",
        language: course.language || "English",
        thumbnail: course.thumbnail || "",
        courseLink: course.courseLink || "",
        documentation: course.documentation || "",
        githubRepo: course.githubRepo || "",
        tags: course.tags?.join(", ") || "",
        skills: course.skills?.join(", ") || "",
        prerequisites: course.prerequisites?.join(", ") || "",
        featured: course.featured || false,
      });
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((i) => i.trim()).filter(Boolean),
      skills: formData.skills.split(",").map((i) => i.trim()).filter(Boolean),
      prerequisites: formData.prerequisites
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    try {
      await updateCourse(id, payload);
      alert("Course updated successfully");
      navigate("/admin/courses");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update course");
    }
  };

  const inputClass =
    "rounded-2xl border border-white/10 bg-black/25 px-4 py-3 outline-none focus:border-cyan-300";

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-10 backdrop-blur-xl">
          <p className="text-purple-300">Admin Editor</p>
          <h1 className="mt-2 text-5xl font-black">Edit Course</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Update course details, resources, skills, and publishing settings.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Section title="Basic Information">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Course Title"
              className={inputClass}
            />

            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Unique Slug"
              className={inputClass}
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Course Description"
              className={`${inputClass} h-32 md:col-span-2`}
            />
          </Section>

          <Section title="Course Metadata">
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className={inputClass}
            />

            <input
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Sub Category"
              className={inputClass}
            />

            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={inputClass}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Kannada</option>
            </select>

            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              className={inputClass}
            />

            <input
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="Platform"
              className={inputClass}
            />

            <input
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="Instructor"
              className={inputClass}
            />

            <input
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className={inputClass}
            />
          </Section>

          <Section title="Resource Links">
            <input
              name="courseLink"
              value={formData.courseLink}
              onChange={handleChange}
              placeholder="Course Link"
              className={inputClass}
            />

            <input
              name="documentation"
              value={formData.documentation}
              onChange={handleChange}
              placeholder="Documentation Link"
              className={inputClass}
            />

            <input
              name="githubRepo"
              value={formData.githubRepo}
              onChange={handleChange}
              placeholder="GitHub Repo"
              className={inputClass}
            />
          </Section>

          <Section title="Skills & Tags">
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags comma separated"
              className={inputClass}
            />

            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Skills comma separated"
              className={inputClass}
            />

            <input
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
              placeholder="Prerequisites comma separated"
              className={inputClass}
            />
          </Section>

          <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Course
            </label>

            <button className="mt-6 rounded-full bg-cyan-500 px-8 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
              Update Course
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

export default EditCourse;