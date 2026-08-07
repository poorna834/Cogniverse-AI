import { motion } from "framer-motion";

function FeatureCard({ icon: Icon, title, text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.07]"
    >
      <Icon className="mb-5 text-cyan-300" size={34} />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{text}</p>
    </motion.div>
  );
}

export default FeatureCard;