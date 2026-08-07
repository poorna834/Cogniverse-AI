import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { createRoadmap } from "../services/roadmapService";
import { getCourses } from "../services/courseService";

function AddRoadmap() {
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    icon: "🗺️",
    category: "Career",
    level: "Beginner",
    duration: "",
    roles: "",
    featured: false,
  });

  const [milestones, setMilestones] = useState([
    { title: "", description: "", skills: "", courses: [] },
  ]);

  const inputClass =
    "rounded-2xl border border-white/10 bg-black/25 px-4 py-3 outline-none focus:border-cyan-300";

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses("");
        setCourses(data.courses || []);
      } catch (error) {
        console.log(error);
      }
    };

    loadCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleCourseSelect = (milestoneIndex, courseId) => {
    const updated = [...milestones];
    const selectedCourses = updated[milestoneIndex].courses || [];

    if (selectedCourses.includes(courseId)) {
      updated[milestoneIndex].courses = selectedCourses.filter(
        (id) => id !== courseId
      );
    } else {
      updated[milestoneIndex].courses = [...selectedCourses, courseId];
    }

    setMilestones(updated);
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { title: "", description: "", skills: "", courses: [] },
    ]);
  };

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      roles: formData.roles
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      milestones: milestones
        .filter((item) => item.title.trim())
        .map((item) => ({
          title: item.title,
          description: item.description,
          skills: item.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          courses: item.courses || [],
        })),
    };

    try {
      await createRoadmap(payload);
      alert("Roadmap created successfully");

      setFormData({
        title: "",
        subtitle: "",
        icon: "🗺️",
        category: "Career",
        level: "Beginner",
        duration: "",
        roles: "",
        featured: false,
      });

      setMilestones([{ title: "", description: "", skills: "", courses: [] }]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create roadmap");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-10 backdrop-blur-xl">
          <p className="text-cyan-300">Admin Roadmap Builder</p>
          <h1 className="mt-2 text-5xl font-black">Add New Roadmap 🗺️</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Create structured career journeys and link real courses to each milestone.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="mb-6 text-2xl font-bold">Basic Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Roadmap Title"
                className={inputClass}
                required
              />

              <input
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="Icon e.g. 💻"
                className={inputClass}
              />

              <input
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Subtitle"
                className={`${inputClass} md:col-span-2`}
              />

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
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
                <option>Beginner to Job Ready</option>
              </select>

              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration e.g. 6 Months"
                className={inputClass}
              />

              <input
                name="roles"
                value={formData.roles}
                onChange={handleChange}
                placeholder="Roles comma separated"
                className={inputClass}
              />
            </div>
          </section>

          <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Milestones</h2>

              <button
                type="button"
                onClick={addMilestone}
                className="rounded-full bg-cyan-500 px-5 py-2 font-semibold text-slate-950"
              >
                + Add Milestone
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-bold text-cyan-300">
                      Milestone {index + 1}
                    </p>

                    {milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={milestone.title}
                      onChange={(e) =>
                        handleMilestoneChange(index, "title", e.target.value)
                      }
                      placeholder="Milestone title"
                      className={inputClass}
                    />

                    <input
                      value={milestone.skills}
                      onChange={(e) =>
                        handleMilestoneChange(index, "skills", e.target.value)
                      }
                      placeholder="Skills comma separated"
                      className={inputClass}
                    />

                    <textarea
                      value={milestone.description}
                      onChange={(e) =>
                        handleMilestoneChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Description"
                      className={`${inputClass} h-24 md:col-span-2`}
                    />
                  </div>

                  <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-white/[0.04] p-5">
                    <h3 className="text-xl font-bold">📚 Link Courses</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Select courses that belong to this milestone.
                    </p>

                    {courses.length === 0 ? (
                      <p className="mt-4 text-slate-500">
                        No courses available. Add courses first.
                      </p>
                    ) : (
                      <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {courses.map((course) => (
                          <label
                            key={course._id}
                            className={`cursor-pointer rounded-2xl border p-4 transition ${
                              milestone.courses?.includes(course._id)
                                ? "border-cyan-400/50 bg-cyan-500/10"
                                : "border-white/10 bg-black/20 hover:border-cyan-300/40"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={milestone.courses?.includes(course._id)}
                                onChange={() =>
                                  handleCourseSelect(index, course._id)
                                }
                                className="mt-1"
                              />

                              <div>
                                <p className="font-bold">{course.title}</p>
                                <p className="mt-1 text-sm text-slate-400">
                                  {course.category || "General"} •{" "}
                                  {course.level || "Beginner"}
                                </p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Roadmap
            </label>

            <button className="mt-6 rounded-full bg-cyan-500 px-8 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
              Publish Roadmap
            </button>
          </section>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default AddRoadmap;