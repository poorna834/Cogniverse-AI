import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function PixiLand() {
  const zones = [
    ["🔤", "Alphabet Castle", "Learn A to Z with cute examples"],
    ["🔢", "Number Mountain", "Count numbers with fun activities"],
    ["🍎", "Fruit Forest", "Learn fruits with colorful cards"],
    ["🥕", "Veggie Garden", "Meet healthy vegetables"],
    ["🐶", "Animal Zoo", "Learn animals and sounds"],
    ["🎨", "Color World", "Explore colors and shapes"],
    ["🎵", "Rhymes Valley", "Cute rhymes and songs"],
    ["📚", "Tiny Books", "Short cute books under 10 pages"],
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-pink-300/30 bg-gradient-to-br from-pink-400/20 via-yellow-300/10 to-cyan-300/20 p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(244,114,182,0.25)]">
          <div className="absolute right-10 top-8 text-8xl opacity-30">🌈</div>
          <div className="absolute bottom-8 right-44 text-6xl opacity-30">🦋</div>

          <p className="text-pink-300">Welcome to</p>

          <h1 className="mt-2 text-6xl font-black">
            PixiLand 🌈
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            A dreamy learning world for kids with alphabets, numbers, fruits,
            vegetables, animals, colors, rhymes, tiny books, and healthy breaks.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <h2 className="text-2xl font-bold">💙 Pixi Health Reminder</h2>
            <p className="mt-2 text-slate-300">
              “Great job little learner! After learning for some time, take a
              tiny break, drink water, blink your eyes, and smile.” 🌸
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          {zones.map(([icon, title, desc]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-xl transition hover:-translate-y-1 hover:border-pink-300/50 hover:shadow-[0_0_35px_rgba(244,114,182,0.18)]"
            >
              <div className="text-6xl">{icon}</div>

              <h2 className="mt-5 text-xl font-black">{title}</h2>

              <p className="mt-3 text-sm text-slate-400">{desc}</p>

              <button className="mt-5 rounded-full bg-pink-400 px-5 py-2 font-semibold text-slate-950 hover:bg-pink-300">
                Explore
              </button>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-yellow-300/20 bg-white/[0.05] p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">Tiny Book Collection 📚</h2>

          <p className="mt-2 text-slate-400">
            Cute mini books with less text, more pictures, and joyful learning.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {["Love Bugs", "Pixie Pages", "Dreamy Charms", "CutiePies"].map(
              (book) => (
                <div
                  key={book}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center"
                >
                  <div className="text-4xl">📖</div>
                  <h3 className="mt-3 font-bold text-pink-300">{book}</h3>
                  <p className="mt-2 text-xs text-slate-400">
                    Coming soon
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">Parent Care Note ❤️</h2>

          <p className="mt-3 text-slate-300">
            PixiLand will include screen-time reminders, eye-care breaks, water
            reminders, and bedtime learning limits to protect children’s health.
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-block rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950"
          >
            Back to Dashboard
          </Link>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default PixiLand;