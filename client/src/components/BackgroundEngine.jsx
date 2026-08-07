import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const iconClass = "h-full w-full drop-shadow-[0_0_18px_currentColor]";


function BookIcon() {
  return (
    <svg viewBox="0 0 80 80" className={iconClass}>
      <path d="M12 18h28c8 0 12 4 12 12v36H24c-7 0-12-4-12-10V18Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M52 30c0-8 4-12 12-12h4v48h-4c-8 0-12-4-12-12" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M22 32h18M22 44h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DNAIcon() {
  return (
    <svg viewBox="0 0 80 80" className={iconClass}>
      <path d="M28 8c30 18 30 46 0 64M52 8C22 26 22 54 52 72" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M30 22h20M24 40h32M30 58h20" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function AtomIcon() {
  return (
    <svg viewBox="0 0 80 80" className={iconClass}>
      <circle cx="40" cy="40" r="5" fill="currentColor" />
      <ellipse cx="40" cy="40" rx="30" ry="11" fill="none" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="40" cy="40" rx="30" ry="11" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(60 40 40)" />
      <ellipse cx="40" cy="40" rx="30" ry="11" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(120 40 40)" />
    </svg>
  );
}

function MicroscopeIcon() {
  return (
    <svg viewBox="0 0 80 80" className={iconClass}>
      <path d="M42 12l20 12-8 14-20-12 8-14Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M45 36c-6 12-2 25 14 30M18 68h46M30 68c0-14 10-24 25-26" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 80 80" className={iconClass}>
      <rect x="18" y="16" width="44" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M10 60h60l-8 8H18l-8-8Z" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 80 80" className={iconClass}>
      <path d="M66 12C34 14 14 34 18 66c32 4 52-16 48-54Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M20 64c16-20 28-32 44-48" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function BackgroundEngine() {
  const { currentTheme } = useTheme();

  const objects = [
    { Icon: BookIcon, color: "text-cyan-300/60", size: "h-32 w-32", left: "10%", top: "8%", duration: 18 },
    { Icon: DNAIcon, color: "text-purple-300/60", size: "h-36 w-36", left: "46%", top: "5%", duration: 22 },
    { Icon: AtomIcon, color: "text-blue-300/60", size: "h-36 w-36", left: "66%", top: "18%", duration: 20 },
    { Icon: MicroscopeIcon, color: "text-pink-300/55", size: "h-34 w-34", left: "78%", top: "32%", duration: 24 },
    { Icon: LaptopIcon, color: "text-indigo-300/55", size: "h-36 w-36", left: "82%", top: "10%", duration: 26 },
    { Icon: LeafIcon, color: "text-emerald-300/55", size: "h-28 w-28", left: "88%", top: "48%", duration: 19 },
  ];

  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${currentTheme.bg}`}>
      <div
  className="absolute inset-0"
  style={{
    background: `radial-gradient(circle at top left, ${currentTheme.glow1}, transparent 35%)`,
  }}
/>

<div
  className="absolute inset-0"
  style={{
    background: `radial-gradient(circle at bottom right, ${currentTheme.glow2}, transparent 38%)`,
  }}
/>

      <motion.div
        className="absolute left-1/4 top-10 h-72 w-[900px] rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ x: [0, 250, 0], y: [0, 80, 0], opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-10 h-72 w-[800px] rounded-full bg-purple-500/20 blur-3xl"
        animate={{ x: [0, -250, 0], y: [0, -80, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {objects.map(({ Icon, color, size, left, top, duration }, index) => (
        <motion.div
          key={index}
          className={`absolute ${size} ${color}`}
          style={{ left, top }}
          animate={{
            y: [0, -30, 20, 0],
            x: [0, 25, -25, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon />
        </motion.div>
      ))}

      {[...Array(55)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white shadow-[0_0_12px_white]"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            left: `${(i * 17) % 100}%`,
            top: `${(i * 31) % 100}%`,
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 2 + (i % 5),
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-slate-950/45" />
    </div>
  );
}

export default BackgroundEngine;