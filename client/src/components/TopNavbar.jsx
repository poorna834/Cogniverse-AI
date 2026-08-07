import { Search, Bell, Flame } from "lucide-react";
import { Link } from "react-router-dom";

function TopNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const levelTitles = {
    1: "🌱 Beginner Explorer",
    2: "🚀 Fast Learner",
    3: "🧠 AI Explorer",
    4: "🏆 Knowledge Master",
    5: "👑 SkillForge Legend",
  };

  const levelXP = {
    1: 100,
    2: 500,
    3: 1000,
    4: 2000,
    5: 5000,
  };

  const xp = user?.xp || 0;
  const level = user?.level || 1;

  const progress = Math.min((xp / levelXP[level]) * 100, 100);

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-6 rounded-[2rem] border border-cyan-400/20 bg-white/[0.05] p-6 backdrop-blur-2xl">

      {/* Search */}

      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
        />

        <input
          placeholder="Search anything..."
          className="w-full rounded-full border border-white/10 bg-black/20 py-3 pl-12 pr-5 outline-none focus:border-cyan-300"
        />
      </div>

      {/* XP */}

      <div className="flex items-center gap-8">

        <div className="w-72">

          <p className="font-bold text-cyan-300">
            {levelTitles[level]}
          </p>

          <div className="mt-2 h-3 rounded-full bg-white/10">

            <div
              className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="mt-2 text-sm text-slate-400">
            {xp} XP
          </p>

        </div>

        {/* Streak */}

        <div className="flex items-center gap-2 rounded-full bg-orange-500/10 px-5 py-3">

          <Flame className="text-orange-400" />

          <div>

            <p className="text-xs text-slate-400">
              Streak
            </p>

            <p className="font-bold">
              {user?.streak || 0} Days
            </p>

          </div>

        </div>

        {/* Notifications */}

        <button className="relative rounded-full bg-white/10 p-3 hover:bg-white/20">

          <Bell />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Avatar */}

        <Link to="/profile">

          <img
            src={
              user?.profileImage ||
              "https://ui-avatars.com/api/?background=06b6d4&color=fff&name=" +
                encodeURIComponent(user?.name || "Student")
            }
            alt="profile"
            className="h-14 w-14 rounded-full border-2 border-cyan-400 object-cover"
          />

        </Link>

      </div>

    </header>
  );
}

export default TopNavbar;