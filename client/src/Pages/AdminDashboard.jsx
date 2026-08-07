import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAdminAnalytics } from "../services/adminAnalyticsService";

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await getAdminAnalytics();
        setAnalytics(data.analytics);
      } catch (error) {
        console.log(error);
      }
    };

    loadAnalytics();
  }, []);

  if (!analytics) {
    return (
      <DashboardLayout>
        <p className="text-slate-400">Loading admin analytics...</p>
      </DashboardLayout>
    );
  }

  const statCards = [
    ["👨‍🎓", "Students", analytics.totalStudents, "Active learners"],
    ["📚", "Courses", analytics.totalCourses, "Learning paths"],
    ["📜", "Certificates", analytics.totalCertificates, "Issued certificates"],
    ["❤️", "Bookmarks", analytics.totalBookmarks, "Saved resources"],
    ["⭐", "Featured", analytics.featuredCourses, "Featured courses"],
    ["⚡", "Total XP", analytics.totalXP, "Platform XP"],
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-pink-500/10 p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.18)]">
          <p className="text-purple-300">Cogniverse Admin</p>
          <h1 className="mt-2 text-5xl font-black">Admin Dashboard 📊</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Monitor students, courses, certificates, XP growth and platform activity.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/admin"
              className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Add Course
            </Link>

            <Link
              to="/admin/courses"
              className="rounded-full border border-white/10 px-6 py-3 hover:bg-white/10"
            >
              Manage Courses
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {statCards.map(([icon, label, value, text]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl shadow-[0_0_35px_rgba(255,255,255,0.08)]"
            >
              <div className="text-4xl">{icon}</div>
              <p className="mt-4 text-slate-400">{label}</p>
              <h2 className="mt-2 text-4xl font-black text-cyan-300">
                {value}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{text}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">🏆 Top Learners</h2>

            <div className="mt-6 space-y-4">
              {analytics.topLearners.length === 0 ? (
                <p className="text-slate-400">No learners yet.</p>
              ) : (
                analytics.topLearners.map((student, index) => (
                  <div
                    key={student._id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div>
                      <p className="font-bold">
                        {index + 1}. {student.name}
                      </p>
                      <p className="text-sm text-slate-400">{student.email}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-cyan-300">{student.xp} XP</p>
                      <p className="text-sm text-slate-400">
                        Level {student.level}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">👨‍🎓 Recent Students</h2>

            <div className="mt-6 space-y-4">
              {analytics.recentStudents.length === 0 ? (
                <p className="text-slate-400">No recent students.</p>
              ) : (
                analytics.recentStudents.map((student) => (
                  <div
                    key={student._id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <p className="font-bold">{student.name}</p>
                    <p className="text-sm text-slate-400">{student.email}</p>
                    <p className="mt-2 text-xs text-purple-300">
                      Joined: {new Date(student.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
          <h2 className="text-2xl font-bold">⚡ Quick Admin Actions</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Link
              to="/admin"
              className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5 text-center hover:border-cyan-300"
            >
              ➕ Add Course
            </Link>

            <Link
              to="/admin/courses"
              className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-5 text-center hover:border-purple-300"
            >
              📚 Manage Courses
            </Link>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center opacity-60">
              👥 Students Soon
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center opacity-60">
              📘 Notes Soon
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;