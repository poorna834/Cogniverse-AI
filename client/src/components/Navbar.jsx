import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-bold">
          <Sparkles className="text-cyan-300" size={22} />
          <span>Pixi AI</span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#">Courses</a>
          <a href="#">Roadmaps</a>
          <a href="#">Projects</a>
          <a href="#">Interview Prep</a>
        </div>

        <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;