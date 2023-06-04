import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeMain {
  colors: {
    bg: string;
    text: string;
    primary: string;
    secondary: string;
  };
  theme_name: string;
}

const themes = {
  light: {
    colors: {
      bg: "#fff",
      text: "#000",
      primary: "#CF39E8",
      secondary: "#DA3D3D",

    },
    theme_name: "light",
  },
  dark: {
    colors: {
      bg: "#292929",
      text: "#fff",
      primary: "#CF39E8",
      secondary: "#DA3D3D",
    },
    theme_name: "dark",
  },
};

interface ThemeValue {
  theme: ThemeMain;
  toogleTheme: () => void;
}

const Theme = createContext({} as ThemeValue);

export default Theme;

export function ThemeProvider({ children }: any) {
  const [mainTheme, setMainTheme] = useState<keyof typeof themes>("dark");
  const toogleTheme = () => {
    setMainTheme((old) => (old === "light" ? "dark" : "light"));
  };

  return (
    <Theme.Provider
      value={{
        theme: themes[mainTheme],
        toogleTheme,
      }}
    >
      {children}
    </Theme.Provider>
  );
}

export function useTheme() {
  const context = useContext(Theme);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
}
