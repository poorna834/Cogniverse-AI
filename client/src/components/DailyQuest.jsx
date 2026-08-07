import { useState } from "react";
import toast from "react-hot-toast";
import { completeQuest } from "../services/questService";

function DailyQuest({ quest, refresh }) {
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (quest.completed) return;

    try {
      setLoading(true);

      const data = await completeQuest(quest._id);

      toast.success(`🎉 +${data.xpEarned} XP Earned!`);

      refresh();

    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to complete quest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        quest.completed
          ? "border-emerald-400/30 bg-emerald-500/10"
          : "border-white/10 bg-black/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">{quest.title}</h3>

          <p className="mt-2 text-sm text-cyan-300">
            Reward: +{quest.xp} XP
          </p>
        </div>

        <button
          disabled={loading || quest.completed}
          onClick={handleComplete}
          className={`rounded-full px-5 py-2 font-semibold ${
            quest.completed
              ? "bg-emerald-500"
              : "bg-cyan-500 hover:bg-cyan-300 text-slate-950"
          }`}
        >
          {quest.completed ? "Completed" : "Complete"}
        </button>
      </div>
    </div>
  );
}

export default DailyQuest;