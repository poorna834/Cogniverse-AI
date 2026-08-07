const updateLoginStreak = (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!user.lastLoginDate) {
    user.streak = 1;
    user.lastLoginDate = today;
    return user;
  }

  const lastLogin = new Date(user.lastLoginDate);
  lastLogin.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return user;
  }

  if (diffDays === 1) {
    user.streak += 1;
  } else {
    user.streak = 1;
  }

  user.lastLoginDate = today;

  return user;
};

module.exports = updateLoginStreak;