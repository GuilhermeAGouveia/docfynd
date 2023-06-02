import router from "next/router";
import { FormEvent, createContext, useContext, useEffect, useState } from "react";

interface Search {
  query: string;
  searched_at: Date;
}

const SearchContext = createContext(
  {} as {
    onSearch: (searchWord?: string) => void;
    history: Search[];
    searchState: [string, (search: string) => void];
  }
);

export default SearchContext;

export function SearchProvider({ children }: any) {
  const [history, setHistory] = useState<Search[]>([]);
  const [search, setSearch] = useState("");
  const addSearch = (search: string) => {
    if (history.some((item) => item.query === search)) return;
    const newHistory = [
      ...history,
      {
        query: search,
        searched_at: new Date(),
      },
    ];
    localStorage.setItem("history_search", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const onSearch = (searchWord?: string) => {
    if (!searchWord) searchWord = search;
    addSearch(searchWord);
    console.log(searchWord);
    router.push({
      pathname: "/results",
      query: { search: searchWord },
    })
  };


  useEffect(() => {
    let history_save = localStorage.getItem("history_search");
    if (history_save) setHistory(JSON.parse(history_save));
  }, []);

  return (
    <SearchContext.Provider
      value={{
        history,
        onSearch,
        searchState: [search, setSearch],
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
}
