const calculateLevel = (xp) => {
  if (xp >= 2000) return 5;
  if (xp >= 1000) return 4;
  if (xp >= 500) return 3;
  if (xp >= 100) return 2;
  return 1;
};

const getLevelTitle = (level) => {
  const titles = {
    1: "🌱 Beginner Explorer",
    2: "🚀 Fast Learner",
    3: "🧠 AI Explorer",
    4: "🏆 Knowledge Master",
    5: "👑 SkillForge Legend",
  };

  return titles[level] || "🌱 Beginner Explorer";
};

module.exports = {
  calculateLevel,
  getLevelTitle,
};