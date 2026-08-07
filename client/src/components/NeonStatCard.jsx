function NeonStatCard({ icon, value, label, growth, color = "cyan" }) {
  const colors = {
    cyan: "border-cyan-400/40 shadow-cyan-500/20 text-cyan-300",
    purple: "border-purple-400/40 shadow-purple-500/20 text-purple-300",
    blue: "border-blue-400/40 shadow-blue-500/20 text-blue-300",
    pink: "border-pink-400/40 shadow-pink-500/20 text-pink-300",
  };

  return (
    <div
      className={`rounded-3xl border bg-white/[0.05] p-6 backdrop-blur-xl shadow-[0_0_35px] ${colors[color]}`}
    >
      <div className="flex items-center gap-5">
        <div className={`rounded-2xl bg-white/10 p-4 text-4xl ${colors[color]}`}>
          {icon}
        </div>

        <div>
          <h3 className="text-4xl font-black text-white">{value}</h3>
          <p className="text-slate-300">{label}</p>
          <p className="mt-3 text-sm text-emerald-400">↑ {growth}</p>
        </div>
      </div>
    </div>
  );
}

export default NeonStatCard;