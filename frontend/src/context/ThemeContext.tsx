import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
  } from "react";
  
  export type Theme = "light" | "dark";
  
  interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
  }
  
  const ThemeContext = createContext<ThemeContextType | null>(null);
  
  const STORAGE_KEY = "fabpay_theme";
  
  export const ThemeProvider = ({
    children,
  }: {
    children: ReactNode;
  }) => {
    const getInitialTheme = (): Theme => {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  
      if (saved === "light" || saved === "dark") {
        return saved;
      }
  
      return "light";
    };
  
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
  
    useEffect(() => {
      document.documentElement.classList.toggle(
        "dark",
        theme === "dark"
      );
  
      localStorage.setItem(STORAGE_KEY, theme);
  
      return () => {
        document.documentElement.classList.remove("dark");
      };
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
  
    const value = useMemo(
      () => ({
        theme,
        setTheme,
        toggleTheme,
      }),
      [theme]
    );
  
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  export const useTheme = () => {
    const context = useContext(ThemeContext);
  
    if (!context) {
      throw new Error(
        "useTheme must be used inside ThemeProvider."
      );
    }
  
    return context;
  };