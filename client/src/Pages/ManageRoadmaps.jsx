import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { deleteRoadmap, getRoadmaps } from "../services/roadmapService";

function ManageRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);

  const loadRoadmaps = async () => {
    try {
      const data = await getRoadmaps();
      setRoadmaps(data.roadmaps || []);
    } catch (error) {
      console.log(error);
      alert("Failed to load roadmaps");
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this roadmap?");
    if (!confirmDelete) return;

    try {
      await deleteRoadmap(id);
      alert("Roadmap deleted");
      loadRoadmaps();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete roadmap");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-10 backdrop-blur-xl">
          <p className="text-cyan-300">Admin Roadmaps</p>
          <h1 className="mt-2 text-5xl font-black">Manage Roadmaps 🗺️</h1>
          <p className="mt-3 text-slate-300">
            View, manage and delete learning journeys.
          </p>

          <Link
            to="/admin/roadmaps/add"
            className="mt-6 inline-block rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
          >
            + Add Roadmap
          </Link>
        </section>

        {roadmaps.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-10 text-center">
            <div className="text-6xl">🗺️</div>
            <h2 className="mt-4 text-2xl font-bold">No roadmaps yet</h2>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap._id}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl"
              >
                <div className="flex items-start gap-5">
                  <div className="text-5xl">{roadmap.icon || "🗺️"}</div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-black">{roadmap.title}</h2>
                    <p className="mt-2 text-slate-400">
                      {roadmap.subtitle || "No subtitle"}
                    </p>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl bg-black/20 p-4 text-center">
                        <p className="text-sm text-slate-400">Milestones</p>
                        <h3 className="text-2xl font-bold text-cyan-300">
                          {roadmap.milestones?.length || 0}
                        </h3>
                      </div>

                      <div className="rounded-2xl bg-black/20 p-4 text-center">
                        <p className="text-sm text-slate-400">Roles</p>
                        <h3 className="text-2xl font-bold text-purple-300">
                          {roadmap.roles?.length || 0}
                        </h3>
                      </div>

                      <div className="rounded-2xl bg-black/20 p-4 text-center">
                        <p className="text-sm text-slate-400">Progress</p>
                        <h3 className="text-2xl font-bold text-pink-300">
                          {roadmap.progress || 0}%
                        </h3>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to={`/roadmaps/${roadmap._id}`}
                        className="rounded-full border border-cyan-400/30 px-5 py-2 text-cyan-300"
                      >
                        View
                      </Link>

                      <Link
                        to={`/admin/roadmaps/edit/${roadmap._id}`}
                        className="rounded-full border border-purple-400/30 px-5 py-2 text-purple-300"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(roadmap._id)}
                        className="rounded-full bg-red-500 px-5 py-2 font-semibold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ManageRoadmaps;