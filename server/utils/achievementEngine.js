const unlockAchievements = (user) => {
  const achievements = [...(user.achievements || [])];

  const hasAchievement = (title) =>
    achievements.some((achievement) => achievement.title === title);

  if (user.xp >= 100 && !hasAchievement("First Step")) {
    achievements.push({
      title: "First Step",
      description: "Earned your first 100 XP.",
      icon: "🌱",
    });
  }

  if (user.xp >= 500 && !hasAchievement("Rising Star")) {
    achievements.push({
      title: "Rising Star",
      description: "Reached 500 XP.",
      icon: "⭐",
    });
  }

  if (user.xp >= 1000 && !hasAchievement("XP Hero")) {
    achievements.push({
      title: "XP Hero",
      description: "Reached 1000 XP.",
      icon: "🏆",
    });
  }

  if (user.level >= 5 && !hasAchievement("Level Climber")) {
    achievements.push({
      title: "Level Climber",
      description: "Reached Level 5.",
      icon: "🚀",
    });
  }

  return achievements;
};

module.exports = unlockAchievements;