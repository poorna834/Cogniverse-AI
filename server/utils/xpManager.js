const { calculateLevel } = require("./gamification");
const unlockAchievements = require("./achievementEngine");

const rewards = {
  LOGIN: 5,
  BOOKMARK: 10,
  COMPLETE_COURSE: 100,
  COMPLETE_ROADMAP: 200,
  QUIZ: 50,
  PROFILE_UPDATE: 15,
};

const addXP = async (user, action) => {
  const xp = rewards[action] || 0;

  user.xp += xp;

  const oldLevel = user.level;

  user.level = calculateLevel(user.xp);
  user.achievements = unlockAchievements(user);

  if (user.level > oldLevel) {
    switch (user.level) {
      case 2:
        user.badges.push("🚀 Fast Learner");
        break;

      case 3:
        user.badges.push("🧠 AI Explorer");
        break;

      case 4:
        user.badges.push("🏆 Knowledge Master");
        break;

      case 5:
        user.badges.push("👑 Cogniverse Legend");
        break;
    }
  }

  await user.save();

  return user;
};

module.exports = {
  rewards,
  addXP,
};