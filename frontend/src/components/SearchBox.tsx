import { useTheme } from "@/context/Theme";
import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useSearch } from "@/context/Search";
import SearchBar from "./SearchBar";
import HistoryList from "./HistoryList";
import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";

export default function SearchBox() {
  const [focus, setFocus] = useState(false);

  const {
    history,
    onSearch,
    searchState: [search, setSearch],
  } = useSearch();

  return (
    <SearchInputBox
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSearch();
      }}
      animate={{
        border:
          focus && history.length
            ? "1px solid rgba(0, 0, 0, 0.5)"
            : "1px solid rgba(0, 0, 0, 0)",
        boxShadow:
          focus && history.length
            ? "0px 0px 10px 0px rgba(0, 0, 0, 0.2)"
            : "0px 0px 10px 0px rgba(0, 0, 0, 0)",
        marginBottom: focus && history.length ? "0px" : "-30px",
      }}
    >
      <SearchBar
        onFocusInputText={() => setFocus(true)}
        onBlurInputText={() => setFocus(false)}
      />
      <HistoryList show={focus} filter={search} />
    </SearchInputBox>
  );
}

const SearchInputBox = styled(motion.form)`
  position: relative;
  width: auto;
  height: auto;
  padding: 30px;
  border-radius: 5px;
`;
