import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const accentThemes = {
  galaxy: {
    name: "🌌 Galaxy",
    bg: "bg-[#030712]",
    glow1: "rgba(56,189,248,0.22)",
    glow2: "rgba(168,85,247,0.22)",
    accent: "cyan",
  },
  nature: {
    name: "🌿 Nature",
    bg: "bg-[#03120b]",
    glow1: "rgba(34,197,94,0.22)",
    glow2: "rgba(16,185,129,0.18)",
    accent: "emerald",
  },
  neon: {
    name: "💜 Neon",
    bg: "bg-[#090014]",
    glow1: "rgba(236,72,153,0.25)",
    glow2: "rgba(168,85,247,0.25)",
    accent: "purple",
  },
  ocean: {
    name: "🌊 Ocean",
    bg: "bg-[#02111f]",
    glow1: "rgba(14,165,233,0.25)",
    glow2: "rgba(6,182,212,0.2)",
    accent: "sky",
  },
  cyberpunk: {
    name: "⚡ Cyberpunk",
    bg: "bg-[#0f0715]",
    glow1: "rgba(250,204,21,0.22)",
    glow2: "rgba(236,72,153,0.25)",
    accent: "yellow",
  },
};

export function ThemeProvider({ children }) {
  const [appearance, setAppearance] = useState(
    localStorage.getItem("cogniverseAppearance") || "dark"
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("cogniverseTheme") || "galaxy"
  );

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(appearance);
    localStorage.setItem("cogniverseAppearance", appearance);
  }, [appearance]);

  const changeAppearance = (mode) => {
    setAppearance(mode);
  };

  const changeTheme = (themeName) => {
    setTheme(themeName);
    localStorage.setItem("cogniverseTheme", themeName);
  };

  return (
    <ThemeContext.Provider
      value={{
        appearance,
        changeAppearance,
        theme,
        changeTheme,
        currentTheme: accentThemes[theme],
        themes: accentThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);