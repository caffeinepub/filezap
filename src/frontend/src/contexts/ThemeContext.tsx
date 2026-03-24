import { createContext, useContext, useEffect, useState } from "react";

export type ColorTheme =
  | "electric-blue"
  | "cyber-purple"
  | "emerald-green"
  | "sunset-orange";

const STORAGE_KEY = "bolttools_color_theme";

interface ThemeColorContextValue {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeColorContext = createContext<ThemeColorContextValue>({
  colorTheme: "electric-blue",
  setColorTheme: () => {},
});

export function ThemeColorProvider({
  children,
}: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    return (localStorage.getItem(STORAGE_KEY) as ColorTheme) || "electric-blue";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-color-theme", colorTheme);
    localStorage.setItem(STORAGE_KEY, colorTheme);
  }, [colorTheme]);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
  };

  return (
    <ThemeColorContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  return useContext(ThemeColorContext);
}

export const colorThemeOptions: {
  id: ColorTheme;
  label: string;
  color: string;
}[] = [
  {
    id: "electric-blue",
    label: "Electric Blue",
    color: "oklch(0.82 0.12 200)",
  },
  { id: "cyber-purple", label: "Cyber Purple", color: "oklch(0.72 0.28 305)" },
  {
    id: "emerald-green",
    label: "Emerald Green",
    color: "oklch(0.78 0.18 155)",
  },
  { id: "sunset-orange", label: "Sunset Orange", color: "oklch(0.75 0.22 45)" },
];
