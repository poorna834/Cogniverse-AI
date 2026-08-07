const subjects = [
  ["⚙️", "Engineering"],
  ["💻", "Computer Science"],
  ["📊", "Data Science"],
  ["🧠", "AI & ML"],
  ["🌿", "Biology"],
  ["🫀", "Medicine"],
  ["🧪", "Chemistry"],
  ["⚛️", "Physics"],
  ["💰", "Commerce"],
  ["💼", "Management"],
  ["⚖️", "Law"],
  ["🎨", "Arts"],
];

function SubjectGrid() {
  return (
    <div className="rounded-3xl border border-purple-400/30 bg-white/[0.05] p-7 backdrop-blur-xl shadow-[0_0_35px_rgba(168,85,247,0.18)]">
      <h2 className="text-2xl font-bold">Explore By Subject</h2>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {subjects.map(([icon, title]) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center transition hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
          >
            <div className="text-3xl">{icon}</div>
            <p className="mt-3 text-sm text-slate-200">{title}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 text-cyan-300">View all subjects →</button>
    </div>
  );
}

export default SubjectGrid;