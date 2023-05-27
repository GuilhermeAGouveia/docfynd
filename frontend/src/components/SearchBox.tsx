import { useTheme } from "@/context/Theme";
import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useSearch } from "@/context/Search";
import SearchBar from "./SearchBar";
import HistoryList from "./HistoryList";

export default function SearchBox() {
  const { theme } = useTheme();
  const [focus, setFocus] = useState(false);
  const [mic, setMic] = useState(false);

  const { history, addSearch } = useSearch();



  const [search, setSearch] = useState("");
  

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addSearch(search);
    console.log(search)
  };

  return (
    <SearchInputBox onSubmit={onSubmit}>
      <SearchBar searchState={[search, setSearch]}/>
      <HistoryList/>
    </SearchInputBox>
  );
}

const SearchInputBox = styled("form")`
  position: relative;
  width: auto;
`;

