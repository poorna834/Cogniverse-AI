function BadgeCollection({ badges = [] }) {
  return (
    <div className="rounded-3xl border border-purple-400/20 bg-white/[0.05] p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold">
        Achievements
      </h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {badges.length > 0 ? (
          badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-purple-500/10 px-4 py-2 text-purple-300"
            >
              {badge}
            </span>
          ))
        ) : (
          <p className="text-slate-400">
            No badges earned yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default BadgeCollection;