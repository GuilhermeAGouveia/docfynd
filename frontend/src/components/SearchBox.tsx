import { useTheme } from "@/context/Theme";
import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useSearch } from "@/context/Search";
import SearchBar from "./SearchBar";
import HistoryList from "./HistoryList";
import { motion } from "framer-motion";

export default function SearchBox() {
  const [focus, setFocus] = useState(false);

  const { history, addSearch } = useSearch();



  const [search, setSearch] = useState("");
  

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addSearch(search);
    console.log(search)
  };

  return (
    <SearchInputBox onSubmit={onSubmit} animate={{
      border: focus ? "1px solid rgba(0, 0, 0, 0.5)" : "1px solid rgba(0, 0, 0, 0)",
      boxShadow: focus ? "0px 0px 10px 0px rgba(0, 0, 0, 0.2)" : "0px 0px 10px 0px rgba(0, 0, 0, 0)",
    }}>
      <SearchBar searchState={[search, setSearch]} onFocusInputText={() => setFocus(true)} onBlurInputText={() => setFocus(false)}/>
      <HistoryList show={focus}/>
    </SearchInputBox>
  );
}

const SearchInputBox = styled(motion.form)`
  position: relative;
  width: auto;
  padding: 30px;
  border-radius: 5px;
`;

