import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  createStudyTask,
  deleteStudyTask,
  getStudyTasks,
  toggleStudyTask,
} from "../services/studyPlanService";

function StudyPlanner() {
  const today = new Date().toISOString().split("T")[0];

  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: today,
    startTime: "",
    endTime: "",
    priority: "Medium",
  });

  const inputClass =
    "rounded-2xl border border-white/10 bg-black/25 px-4 py-3 outline-none focus:border-cyan-300";

  const loadTasks = async () => {
    try {
      const data = await getStudyTasks(selectedDate);
      setTasks(data.tasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [selectedDate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await createStudyTask(formData);
      alert("Study task added");

      setFormData({
        title: "",
        description: "",
        date: selectedDate,
        startTime: "",
        endTime: "",
        priority: "Medium",
      });

      loadTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add task");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleStudyTask(id);
      loadTasks();
    } catch (error) {
      alert("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;

    try {
      await deleteStudyTask(id);
      loadTasks();
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 backdrop-blur-xl">
          <p className="text-cyan-300">Cogniverse Productivity</p>

          <h1 className="mt-2 text-5xl font-black">
            Study Planner 📅
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Plan your daily learning tasks, track completion, and stay consistent with Pixi.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          <StatCard icon="📋" label="Tasks" value={tasks.length} />
          <StatCard icon="✅" label="Completed" value={completedCount} />
          <StatCard icon="⏳" label="Pending" value={tasks.length - completedCount} />
          <StatCard icon="📈" label="Progress" value={`${progress}%`} />
        </section>

        <section className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Today's Progress</h2>
              <p className="mt-2 text-slate-400">
                {completedCount} of {tasks.length} tasks completed
              </p>
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setFormData({ ...formData, date: e.target.value });
              }}
              className={inputClass}
            />
          </div>

          <div className="mt-6 h-4 rounded-full bg-white/10">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.2fr]">
          <form
            onSubmit={handleCreateTask}
            className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold">+ Add Study Task</h2>

            <div className="mt-6 grid gap-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                className={inputClass}
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className={`${inputClass} h-24`}
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
                required
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={inputClass}
                />

                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <button className="mt-6 rounded-full bg-cyan-500 px-7 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
              Add Task
            </button>
          </form>

          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold">Tasks for {selectedDate}</h2>

            {tasks.length === 0 ? (
              <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-8 text-center">
                <div className="text-6xl">📅</div>
                <h3 className="mt-4 text-2xl font-bold">No tasks planned</h3>
                <p className="mt-2 text-slate-400">
                  Add your first task and start your learning day.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className={`rounded-3xl border p-5 ${
                      task.completed
                        ? "border-cyan-400/30 bg-cyan-500/10"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3
                          className={`text-xl font-bold ${
                            task.completed ? "line-through text-slate-400" : ""
                          }`}
                        >
                          {task.title}
                        </h3>

                        <p className="mt-2 text-slate-400">
                          {task.description || "No description"}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-3 text-sm">
                          <span className="rounded-full bg-purple-500/10 px-3 py-1 text-purple-300">
                            {task.startTime || "--:--"} - {task.endTime || "--:--"}
                          </span>

                          <span className="rounded-full bg-pink-500/10 px-3 py-1 text-pink-300">
                            {task.priority}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleToggle(task._id)}
                          className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
                        >
                          {task.completed ? "Undo" : "Done"}
                        </button>

                        <button
                          onClick={() => handleDelete(task._id)}
                          className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>

        <section className="rounded-3xl border border-pink-400/20 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">💙 Pixi Wellness Reminder</h2>
          <p className="mt-3 text-slate-300">
            Study with focus, but don't forget your health. Drink water, blink your eyes, stretch your body, and take short breaks.
          </p>
        </section>
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

export default StudyPlanner;