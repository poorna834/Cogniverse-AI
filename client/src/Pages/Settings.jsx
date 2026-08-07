import { Shield, Bell, Palette, Target, Brain, Download, Trash2 } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, changeTheme, themes } = useTheme();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-10 backdrop-blur-xl">
          <p className="text-purple-300">Control Center</p>
          <h1 className="mt-2 text-6xl font-black">Settings</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Fine-tune your learning environment, security, notifications, and AI experience.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Palette className="text-cyan-300" /> Appearance
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {Object.entries(themes).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => changeTheme(key)}
                  className={`rounded-2xl border p-5 text-left ${
                    theme === key
                      ? "border-cyan-300 bg-cyan-500/20"
                      : "border-white/10 bg-black/20 hover:bg-white/10"
                  }`}
                >
                  <div className="text-2xl">{item.name}</div>
                  <p className="mt-2 text-sm text-slate-400">
                    {theme === key ? "Currently active" : "Apply theme"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Brain className="text-purple-300" /> AI Experience
            </h2>

            <div className="mt-6 space-y-4">
              {["Friendly Mentor", "Strict Coach", "Motivational Guide"].map((mode) => (
                <button
                  key={mode}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:border-purple-300/50"
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-pink-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Bell className="text-pink-300" /> Notifications
            </h2>

            <div className="mt-6 space-y-4">
              {["Daily reminders", "New resources", "Achievement alerts"].map((item) => (
                <label key={item} className="flex justify-between rounded-2xl bg-black/20 p-4">
                  {item}
                  <input type="checkbox" defaultChecked />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Target className="text-cyan-300" /> Learning
            </h2>

            <select className="mt-6 w-full rounded-2xl border border-white/10 bg-black/30 p-4 outline-none">
              <option>Full Stack Developer</option>
              <option>AI Engineer</option>
              <option>Medical / Biology</option>
              <option>Data Analyst</option>
              <option>Commerce / Finance</option>
            </select>

            <input
              type="number"
              placeholder="Daily study minutes"
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 p-4 outline-none"
            />
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Shield className="text-emerald-300" /> Privacy
            </h2>

            <div className="mt-6 space-y-4">
              <button className="flex w-full items-center gap-3 rounded-2xl bg-black/20 p-4 hover:bg-white/10">
                <Download size={18} /> Export My Data
              </button>

              <button className="flex w-full items-center gap-3 rounded-2xl bg-red-500/20 p-4 text-red-300 hover:bg-red-500/30">
                <Trash2 size={18} /> Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Settings;