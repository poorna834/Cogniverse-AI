const Quest = require("../models/Quest");
const User = require("../models/User");
const { addXP } = require("../utils/xpManager");

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getTodayQuests = async (req, res) => {
  try {
    const today = getTodayDate();

    let questDoc = await Quest.findOne({
      user: req.user._id,
      date: today,
    });

    if (!questDoc) {
      questDoc = await Quest.create({
        user: req.user._id,
        date: today,
        quests: [
          { title: "Save one useful course", xp: 10 },
          { title: "Explore one roadmap", xp: 20 },
          { title: "Update your learning profile", xp: 15 },
        ],
      });
    }

    res.status(200).json({
      success: true,
      questDoc,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeQuest = async (req, res) => {
  try {
    const { questId } = req.params;

    const questDoc = await Quest.findOne({
      user: req.user._id,
      "quests._id": questId,
    });

    if (!questDoc) {
      return res.status(404).json({ message: "Quest not found" });
    }

    const quest = questDoc.quests.id(questId);

    if (quest.completed) {
      return res.status(400).json({ message: "Quest already completed" });
    }

    quest.completed = true;
    await questDoc.save();

    const user = await User.findById(req.user._id);
    await addXP(user, "QUIZ");

    res.status(200).json({
      success: true,
      message: "Quest completed",
      questDoc,
      xpEarned: quest.xp,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodayQuests,
  completeQuest,
};