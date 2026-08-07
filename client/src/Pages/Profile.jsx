import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Camera,
  Heart,
  BookOpen,
  Trophy,
  Flame,
  Star,
  Sparkles,
  LogOut,
  Brain,
  Palette,
  Quote,
  Activity,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { getBookmarks } from "../services/bookmarkService";
import { updateProfile } from "../services/userService";
import { getMyCertificates } from "../services/certificateService";
import API from "../services/api";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [savedCount, setSavedCount] = useState(0);
  const [certificateCount, setCertificateCount] = useState(0);
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [uploading, setUploading] = useState(false);
  const [mood, setMood] = useState("😊 Curious");

  const [quote, setQuote] = useState(
    localStorage.getItem("studentQuote") ||
      "I'll become the best version of myself."
  );

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    goal: user?.goal || "",
    favoriteSubject: user?.favoriteSubject || "",
    interests: user?.interests?.join(", ") || "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookmarkData = await getBookmarks();
        setSavedCount(bookmarkData.bookmarks?.length || 0);

        const certData = await getMyCertificates();
        setCertificateCount(certData.certificates?.length || 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const xp = user?.xp || 0;
  const level = user?.level || 1;
  const streak = user?.streak || 0;
  const nextLevelXP = level * 500;
  const progressPercent = Math.min((xp / nextLevelXP) * 100, 100);

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profileImage", file);

      setUploading(true);

      const response = await API.put("/users/profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setProfileImage(response.data.profileImage);
    } catch (error) {
      alert(error.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      const confirmDelete = window.confirm("Delete your profile photo?");
      if (!confirmDelete) return;

      const response = await API.delete("/users/profile-image");

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setProfileImage("");

      alert("Profile photo deleted");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete photo");
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async () => {
    try {
      const payload = {
        ...profileData,
        interests: profileData.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await updateProfile(payload);

      localStorage.setItem("user", JSON.stringify(response.user));

      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  const saveQuote = () => {
    localStorage.setItem("studentQuote", quote);
    alert("Quote saved ✨");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const interests = profileData.interests
    ? profileData.interests
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : ["AI", "Web Development", "Biology", "Medicine", "Robotics"];

  const badges =
    user?.badges?.length > 0
      ? user.badges
      : ["⭐ First Login", "📚 First Course", "🔥 7 Day Streak", "🤖 AI Explorer"];

  const themes = ["🌌 Galaxy", "🌿 Nature", "💜 Neon", "🌊 Ocean", "⚡ Cyberpunk"];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10 shadow-[0_0_60px_rgba(34,211,238,0.18)] backdrop-blur-xl">
          <div className="absolute right-10 top-10 text-7xl opacity-20">🌌</div>
          <div className="absolute bottom-8 right-40 text-6xl opacity-20">✨</div>

          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="relative group">
              <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-4 border-cyan-300/50 bg-cyan-500/10 shadow-[0_0_60px_rgba(34,211,238,0.55)]">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-7xl font-black text-cyan-300">
                    {user?.name?.charAt(0) || "S"}
                  </span>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-full bg-black/50 opacity-0 transition group-hover:opacity-100">
                <label className="cursor-pointer rounded-full bg-cyan-400 p-4 text-slate-950 hover:bg-cyan-300">
                  <Camera size={22} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {profileImage && (
                  <button
                    onClick={handleDeleteImage}
                    className="rounded-full bg-red-500 p-4 text-white hover:bg-red-400"
                  >
                    ✕
                  </button>
                )}
              </div>

              {uploading && (
                <p className="mt-3 text-center text-cyan-300">Uploading...</p>
              )}
            </div>

            <div className="text-center md:text-left">
              <p className="text-cyan-300">Welcome Back,</p>

              <h1 className="mt-2 text-6xl font-black">
                {user?.name || "Student"} 👋
              </h1>

              <p className="mt-4 text-xl text-slate-300">
                “Every expert was once a beginner.”
              </p>

              <p className="mt-4 max-w-xl text-slate-400">
                {user?.bio ||
                  "Add your bio below and tell the world what you're learning."}
              </p>

              <div className="mt-6 max-w-md">
                <p className="text-purple-300">
                  🌱 Level {level} Cogniverse Explorer
                </p>

                <div className="mt-3 h-3 rounded-full bg-white/10">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  XP {xp} / {nextLevelXP}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          {[
            [Heart, "Saved Courses", savedCount, "text-pink-300"],
            [BookOpen, "Hours Studied", 68, "text-cyan-300"],
            [Trophy, "Certificates", certificateCount, "text-purple-300"],
            [Flame, "Learning Streak", `${streak} Days`, "text-orange-300"],
          ].map(([Icon, label, value, color]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(255,255,255,0.08)]"
            >
              <Icon className={color} />
              <p className="mt-4 text-slate-400">{label}</p>
              <h3 className="mt-2 text-4xl font-black">{value}</h3>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
          <h2 className="text-2xl font-bold">Edit Learning Identity</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              placeholder="Your name"
              className="rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
            />

            <input
              name="goal"
              value={profileData.goal}
              onChange={handleProfileChange}
              placeholder="Your career goal"
              className="rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
            />

            <input
              name="favoriteSubject"
              value={profileData.favoriteSubject}
              onChange={handleProfileChange}
              placeholder="Favorite subject"
              className="rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
            />

            <input
              name="interests"
              value={profileData.interests}
              onChange={handleProfileChange}
              placeholder="Interests comma separated"
              className="rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
            />
          </div>

          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleProfileChange}
            placeholder="Write a short bio..."
            className="mt-4 h-28 w-full rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
          />

          <button
            onClick={handleProfileUpdate}
            className="mt-5 rounded-full bg-purple-500 px-6 py-3 font-semibold hover:bg-purple-400"
          >
            Save Profile
          </button>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Brain className="text-purple-300" /> Interests
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {interests.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-pink-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Sparkles className="text-pink-300" /> Mood
            </h2>

            <p className="mt-4 text-3xl">{mood}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "😊 Curious",
                "😍 Excited",
                "😴 Tired",
                "🤯 Focused",
                "🚀 Ready",
              ].map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className="rounded-full bg-white/5 px-3 py-2 hover:bg-white/10"
                >
                  {m.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Palette className="text-cyan-300" /> Themes
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {themes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full border border-white/10 px-4 py-2"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Quote className="text-cyan-300" /> Personal Quote
            </h2>

            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="mt-5 h-28 w-full rounded-2xl border border-white/10 bg-black/20 p-4 outline-none"
            />

            <button
              onClick={saveQuote}
              className="mt-4 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
            >
              Save Quote
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Star className="text-purple-300" /> Badges
            </h2>

            <div className="mt-5 grid gap-3">
              {badges.map((badge) => (
                <div key={badge} className="rounded-2xl bg-white/5 px-4 py-3">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Activity className="text-cyan-300" /> Activity Timeline
          </h2>

          <div className="mt-6 space-y-4">
            {[
              "Saved AI Course",
              "Completed Biology Basics",
              "Earned First Login Badge",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="text-cyan-300">
                  {index === 0 ? "Today" : `${index + 1} days ago`}
                </p>

                <p className="mt-1 text-slate-300">✔ {item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-purple-400/20 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-7 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">Meet Pixi 🤖</h2>

          <p className="mt-3 text-slate-300">
            Hi {user?.name || "Student"}! 🌟 Ready for today's learning
            adventure?
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/courses"
              className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
            >
              Start Learning
            </Link>

            <Link
              to="/bookmarks"
              className="rounded-full border border-white/10 px-6 py-3"
            >
              Saved Courses
            </Link>

            <Link
              to="/achievements"
              className="rounded-full border border-purple-400/30 px-6 py-3 text-purple-300"
            >
              View Achievements
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-semibold"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Profile;