function XPProgress({ xp, level }) {
  const levels = {
    1: 100,
    2: 500,
    3: 1000,
    4: 2000,
    5: 5000,
  };

  const titles = {
    1: "🌱 Beginner Explorer",
    2: "🚀 Fast Learner",
    3: "🧠 AI Explorer",
    4: "🏆 Knowledge Master",
    5: "👑 SkillForge Legend",
  };

  const maxXP = levels[level] || 5000;
  const percentage = Math.min((xp / maxXP) * 100, 100);

  return (
    <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold">{titles[level]}</h2>

      <p className="mt-2 text-slate-400">
        Level {level}
      </p>

      <div className="mt-5 h-4 rounded-full bg-white/10">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-3 text-cyan-300 font-semibold">
        {xp} XP
      </p>
    </div>
  );
}

export default XPProgress;