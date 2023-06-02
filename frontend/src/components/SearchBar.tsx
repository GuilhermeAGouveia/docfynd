import { useTheme } from "@/context/Theme";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Dictaphone from "./Mic";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "@/context/Search";

interface SearchBarProps {
  onFocusInputText: () => void;
  onBlurInputText: () => void;
  isResultPage: boolean;
}

export default function SearchBar({
  onFocusInputText,
  onBlurInputText,
  isResultPage,
}: SearchBarProps) {
  const { theme } = useTheme();
  const [focus, setFocus] = useState(false);
  const [mic, setMic] = useState(false);

  const {
    searchState: [search, setSearch],
    onSearch,
  } = useSearch();

  useEffect(() => {
    mic ? setSearch({query: "Ouvindo..."}) : ("Ouvindo..." === search.query) && setSearch({query:""});
    if (!mic && search?.source === "mic") {
      onSearch();
    }

    
  }, [mic]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <SearchInputBar
      animate={
        mic
          ? {
              boxShadow: ["0 0 60px 0 #DA3D3D", "0 0 70px 0px #CF39E8"],
              transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }
          : {
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            }
      }
      isresultpage={isResultPage}
    >
      <motion.svg
        style={{ position: "absolute", width: "100%", height: "100%" }}
        initial="hidden"
        animate="visible"
      >
        <motion.rect
          style={{ width: "100%", height: "100%" }}
          x="0"
          y="0"
          rx="20"
          stroke="#CF39E8"
          fill="transparent"
          strokeWidth={2}
          variants={draw}
          animate={focus ? "visible" : "hidden"}
          initial="hidden"
          custom={0}
        />
      </motion.svg>
      <SearchIcon
        style={{ position: "relative", left: "10px", color: "#CF39E8" }}
      />
      <SearchInput
        value={search.query}
        onChange={(e) => setSearch({query: e.target.value})}
        placeholder="Search"
        style={{
          color: theme?.colors.text,
        }}
        onFocus={() => {
          setFocus(true);
          onFocusInputText();
        }}
        onBlur={() => {
          setFocus(false);
          onBlurInputText();
        }}
      />
      <Dictaphone
        setTranscript={(transcript: string) => setSearch({query: transcript, source: "mic"})}
        setListening={(listening: boolean) => {
          setMic(listening);
        }}
      />
    </SearchInputBar>
  );
}

const SearchInputBar = styled(motion.div)<{
  isresultpage?: boolean;
}>`
  position: relative;
  width: ${(props) => (props.isresultpage ? "600px" : "500px")}};
  height: 40px;
  border-radius: 25px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const SearchInput = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  border: none;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  outline: none;
  background-color: transparent;
`;
