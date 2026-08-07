import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAchievements } from "../services/achievementService";

function Achievements() {
  const [achievements, setAchievements] = useState([]);

  const lockedAchievements = [
    {
      title: "Quiz Master",
      description: "Score high in quizzes.",
      icon: "🧠",
    },
    {
      title: "Learning Streak",
      description: "Learn continuously for 7 days.",
      icon: "🔥",
    },
    {
      title: "Cogniverse Legend",
      description: "Reach the highest learning milestone.",
      icon: "👑",
    },
  ];

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievements();
        setAchievements(data.achievements || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-yellow-400/20 bg-gradient-to-br from-yellow-500/10 via-purple-500/10 to-cyan-500/10 p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(250,204,21,0.15)]">
          <p className="text-yellow-300">Cogniverse Rewards</p>

          <h1 className="mt-2 text-5xl font-black">
            Achievements 🏆
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Unlock achievements as you learn, complete courses, earn XP, and grow with Pixi.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold">Unlocked Achievements</h2>

          {achievements.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center">
              <div className="text-6xl">🔒</div>
              <h3 className="mt-4 text-2xl font-bold">
                No achievements unlocked yet
              </h3>
              <p className="mt-2 text-slate-400">
                Complete a course or earn XP to unlock your first achievement.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-yellow-400/30 bg-white/[0.06] p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(250,204,21,0.12)]"
                >
                  <div className="text-6xl">{achievement.icon}</div>

                  <h3 className="mt-5 text-2xl font-black">
                    {achievement.title}
                  </h3>

                  <p className="mt-3 text-slate-400">
                    {achievement.description}
                  </p>

                  <p className="mt-5 text-sm text-yellow-300">
                    Unlocked on{" "}
                    {achievement.earnedAt
                      ? new Date(achievement.earnedAt).toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-3xl font-bold">Locked Achievements</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {lockedAchievements.map((achievement, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 opacity-60 backdrop-blur-xl"
              >
                <div className="text-6xl grayscale">{achievement.icon}</div>

                <h3 className="mt-5 text-2xl font-black">
                  {achievement.title}
                </h3>

                <p className="mt-3 text-slate-400">
                  {achievement.description}
                </p>

                <p className="mt-5 text-sm text-slate-500">
                  🔒 Locked
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Achievements;