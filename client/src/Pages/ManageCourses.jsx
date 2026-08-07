import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Search, PlusCircle } from "lucide-react";
import { getCourses, deleteCourse } from "../services/courseService";
import DashboardLayout from "../layouts/DashboardLayout";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCourses = async () => {
    try {
      const data = await getCourses(search);
      setCourses(data.courses || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [search]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;

    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete course");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-10 backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-purple-300">Admin Library</p>
              <h1 className="mt-2 text-5xl font-black">Courses</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Add, edit, review, and remove published learning resources.
              </p>
            </div>

            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              <PlusCircle size={20} />
              Add Course
            </Link>
          </div>
        </section>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-full border border-cyan-400/30 bg-black/25 py-4 pl-12 pr-5 outline-none"
            />
          </div>

          <p className="text-sm text-slate-400">
            Total Courses:{" "}
            <span className="font-bold text-cyan-300">{courses.length}</span>
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
          {courses.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-6xl">📚</div>
              <h2 className="mt-4 text-2xl font-bold">No courses found</h2>
              <p className="mt-2 text-slate-400">
                Add your first course to grow the Cogniverse library.
              </p>

              <Link
                to="/admin"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
              >
                <PlusCircle size={20} />
                Add Course
              </Link>
            </div>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="grid gap-5 border-b border-white/10 p-5 md:grid-cols-[1.5fr_1fr_1fr_auto]"
              >
                <div>
                  <h2 className="font-bold">{course.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{course.slug}</p>
                </div>

                <p className="text-slate-300">{course.category || "General"}</p>
                <p className="text-slate-300">{course.level || "Beginner"}</p>

                <div className="flex gap-3">
                  <Link
                    to={`/admin/courses/edit/${course._id}`}
                    className="rounded-full bg-cyan-500 p-3 text-slate-950 hover:bg-cyan-300"
                  >
                    <Edit size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(course._id)}
                    className="rounded-full bg-red-500 p-3 hover:bg-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageCourses;