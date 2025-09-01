import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import {
  DarkTheme,
  getThemePreference,
  getLastManualTheme,
  LightTheme,
  saveThemePreference,
  saveLastManualTheme,
} from "@/constants/utils";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: any;
  themeMode: Theme;
  lastManualTheme: "light" | "dark";
  toggleTheme: (mode: Theme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<Theme>("system");
  const [lastManualTheme, setLastManualTheme] = useState<"light" | "dark">(
    "dark"
  );
  const [theme, setTheme] = useState(MD3LightTheme);

  // Get current theme from storage on mount
  useEffect(() => {
    (async () => {
      const stored = await getThemePreference();
      const lastManual = await getLastManualTheme();
      setThemeMode(stored);
      setLastManualTheme(lastManual);
    })();
  }, []);

  // Update theme when themeMode or systemScheme changes
  useEffect(() => {
    if (themeMode === "system") {
      setTheme(systemScheme === "dark" ? DarkTheme : LightTheme);
    } else {
      setTheme(themeMode === "dark" ? DarkTheme : LightTheme);
    }
  }, [themeMode, systemScheme]);

  // Save preference & toggle theme
  const toggleTheme = async (mode: Theme) => {
    setThemeMode(mode);
    // Track the last manually selected theme
    if (mode === "light" || mode === "dark") {
      setLastManualTheme(mode);
      await saveLastManualTheme(mode);
    }
    await saveThemePreference(mode);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, lastManualTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
