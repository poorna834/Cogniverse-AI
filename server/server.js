const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES IMPORTS
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const courseProgressRoutes = require("./routes/courseProgressRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminAnalyticsRoutes = require("./routes/adminAnalyticsRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const roadmapProgressRoutes = require("./routes/roadmapProgressRoutes");
const studyPlanRoutes = require("./routes/studyPlanRoutes");
const noteRoutes = require("./routes/noteRoutes");
const knowledgeNoteRoutes = require("./routes/knowledgeNoteRoutes");
const learningAnalyticsRoutes = require("./routes/learningAnalyticsRoutes");
const aiRoutes = require("./routes/aiRoutes");
const careerroadmapRoutes = require("./routes/careerRoadmapRoutes");

// console.log("userRoutes", typeof userRoutes);
// console.log("courseRoutes", typeof courseRoutes);
// console.log("bookmarkRoutes", typeof bookmarkRoutes);
// console.log("courseProgressRoutes", typeof courseProgressRoutes);
// console.log("certificateRoutes", typeof certificateRoutes);
// console.log("leaderboardRoutes", typeof leaderboardRoutes);
// console.log("achievementRoutes", typeof achievementRoutes);
// console.log("notificationRoutes", typeof notificationRoutes);

// ROUTES USE
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/progress", courseProgressRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin/analytics", adminAnalyticsRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/roadmap-progress", roadmapProgressRoutes);
app.use("/api/study-planner", studyPlanRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/knowledge-notes", knowledgeNoteRoutes);
app.use("/api/learning-analytics",learningAnalyticsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/career-roadmap", careerroadmapRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});