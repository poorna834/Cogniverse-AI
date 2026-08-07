import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  User,
  Settings,
  LogOut,
  Sparkles,
  ListChecks,
  Brain,
  Map,
  Trophy,
  CalendarDays,
  BarChart3,
  Medal,
  Bell,
  ShieldCheck,
  Rainbow,
  LibraryBig,
  Menu,
  X,
} from "lucide-react";

import TopNavbar from "../components/TopNavbar";
import BackgroundEngine from "../components/BackgroundEngine";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Invalid user data:", error);
  }

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navClass = (path) => {
    const isActive =
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`);

    return `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${isActive
        ? "border border-cyan-400/50 bg-cyan-500/15 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`;
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.45)]">
            <Sparkles size={23} />
          </div>

          <div>
            <h1 className="text-xl font-black sm:text-2xl">
              Cogniverse <span className="text-cyan-300">AI</span>
            </h1>

            <p className="text-xs text-slate-400 sm:text-sm">
              Learn · Grow · Achieve
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 md:hidden"
          aria-label="Close navigation"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="mt-8 space-y-2 pb-8">
        <SidebarLink
          to="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          className={navClass("/dashboard")}
        />

        <SidebarLink
          to="/analytics"
          icon={<BarChart3 size={20} />}
          label="Learning Analytics"
          className={navClass("/analytics")}
        />

        <SidebarLink
          to="/learning-center"
          icon={<BookOpen size={20} />}
          label="Learning Center"
          className={navClass("/learning-center")}
        />

        <SidebarLink
          to="/courses"
          icon={<BookOpen size={20} />}
          label="Courses"
          className={navClass("/courses")}
        />

        <SidebarLink
          to="/knowledge"
          icon={<LibraryBig size={20} />}
          label="Knowledge Hub"
          className={navClass("/knowledge")}
        />

        <SidebarLink
          to="/roadmaps"
          icon={<Map size={20} />}
          label="Roadmaps"
          className={navClass("/roadmaps")}
        />

        <SidebarLink
          to="/career-roadmap"
          icon={<Sparkles size={20} />}
          label="AI Career Roadmap"
          className={navClass("/career-roadmap")}
        />

        <SidebarLink
          to="/study-planner"
          icon={<CalendarDays size={20} />}
          label="Study Planner"
          className={navClass("/study-planner")}
        />

        <SidebarLink
          to="/bookmarks"
          icon={<Heart size={20} />}
          label="Bookmarks"
          className={navClass("/bookmarks")}
        />

        <SidebarLink
          to="/certificates"
          icon={<Trophy size={20} />}
          label="Certificates"
          className={navClass("/certificates")}
        />

        <SidebarLink
          to="/achievements"
          icon={<Medal size={20} />}
          label="Achievements"
          className={navClass("/achievements")}
        />

        <SidebarLink
          to="/leaderboard"
          icon={<BarChart3 size={20} />}
          label="Leaderboard"
          className={navClass("/leaderboard")}
        />

        <SidebarLink
          to="/notifications"
          icon={<Bell size={20} />}
          label="Notifications"
          className={navClass("/notifications")}
        />

        <SidebarLink
          to="/ai-mentor"
          icon={<Brain size={20} />}
          label="Pixi AI"
          className={navClass("/ai-mentor")}
        />

        <SidebarLink
          to="/pixiland"
          icon={<Rainbow size={20} />}
          label="PixiLand"
          className={navClass("/pixiland")}
        />

        <SidebarLink
          to="/profile"
          icon={<User size={20} />}
          label="Profile"
          className={navClass("/profile")}
        />

        {isAdmin && (
          <>
            <div className="pt-6 text-xs font-bold uppercase tracking-[0.28em] text-purple-300">
              Admin Panel
            </div>

            <SidebarLink
              to="/admin/dashboard"
              icon={<ShieldCheck size={20} />}
              label="Admin Dashboard"
              className={navClass("/admin/dashboard")}
            />

            <SidebarLink
              to="/admin/courses"
              icon={<ListChecks size={20} />}
              label="Manage Courses"
              className={navClass("/admin/courses")}
            />

            <SidebarLink
              to="/admin/roadmaps"
              icon={<Map size={20} />}
              label="Manage Roadmaps"
              className={navClass("/admin/roadmaps")}
            />


            <SidebarLink
              to="/admin/knowledge"
              icon={<LibraryBig size={20} />}
              label="Manage Knowledge"
              className={navClass("/admin/knowledge")}
            />
          </>
        )}

        <div className="pt-5" />

        <SidebarLink
          to="/settings"
          icon={<Settings size={20} />}
          label="Settings"
          className={navClass("/settings")}
        />

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-red-300 transition hover:bg-red-500/20"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <BackgroundEngine />

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden h-screen w-72 overflow-y-auto border-r border-cyan-400/20 bg-black/30 p-6 shadow-[0_0_45px_rgba(34,211,238,0.12)] backdrop-blur-2xl md:block">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 h-screen w-[86%] max-w-80 overflow-y-auto border-r border-cyan-400/20 bg-slate-950/95 p-5 shadow-[0_0_55px_rgba(34,211,238,0.22)] backdrop-blur-2xl transition-transform duration-300 md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <div className="min-h-screen md:pl-72">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-2.5 text-cyan-300 transition hover:bg-cyan-500/20"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="text-center">
            <p className="font-black">
              Cogniverse <span className="text-cyan-300">AI</span>
            </p>

            <p className="text-[10px] text-slate-400">
              {user?.name || "Student"}
            </p>
          </div>

          <Link
            to="/notifications"
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300"
            aria-label="Notifications"
          >
            <Bell size={21} />
          </Link>
        </div>

        <main className="relative z-10 min-w-0 overflow-x-hidden px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10">
          <div className="hidden md:block">
            <TopNavbar />
          </div>

          <div className="min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label, className }) {
  return (
    <Link to={to} className={className}>
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default DashboardLayout;