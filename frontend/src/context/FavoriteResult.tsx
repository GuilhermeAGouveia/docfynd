import { Result } from "@/libs/interfaces";
import router from "next/router";
import {
  FormEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ResultContext = createContext(
  {} as {
    favoriteResults: Result[];
    addFavoriteResult: (result: Result) => void;
    removeFavoriteResult: (result: Result) => void;
    isResultFavorite: (result: Result) => boolean;
  }
);

export default ResultContext;

export function ResultProvider({ children }: any) {
  const [favoriteResults, setFavoriteResults] = useState<Result[]>([]);
  const addFavoriteResult = (result: Result) => {
    if (favoriteResults.some((item) => item?.url === result.url)) return;
    const newFavoriteResults = [...favoriteResults, result];
    localStorage.setItem(
      "favorite_results",
      JSON.stringify(newFavoriteResults)
    );
    setFavoriteResults(newFavoriteResults);
  };

  const removeFavoriteResult = (result: Result) => {
    const newFavoriteResults = favoriteResults.filter(
      (item) => item?.url !== result.url
    );
    localStorage.setItem(
      "favorite_results",
      JSON.stringify(newFavoriteResults)
    );
    setFavoriteResults(newFavoriteResults);
  };

  const isResultFavorite = (result: Result) => {
    return favoriteResults.some((item) => item?.url === result.url);
  };

  useEffect(() => {
    let history_save = localStorage.getItem("favorite_results");
    if (history_save) setFavoriteResults(JSON.parse(history_save));
  }, []);

  return (
    <ResultContext.Provider
      value={{
        favoriteResults,
        addFavoriteResult,
        removeFavoriteResult,
        isResultFavorite,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
}

export function useResult() {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
}
