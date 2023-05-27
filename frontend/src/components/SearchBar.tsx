import { useTheme } from "@/context/Theme";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import Dictaphone from "./Mic";

export default function SearchBar() {
  const { theme } = useTheme();
  const [focus, setFocus] = useState(false);
  const [mic, setMic] = useState(false);

  useEffect(() => { mic ? setSearch("Ouvindo...") : setSearch("")}, [mic]);
  const [search, setSearch] = useState("");
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
    <SearchInputBox
      initial={{
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      }}
      animate={
        mic
          ? {
              boxShadow: ["0 0 60px 0 #DA3D3D", "0 0 70px 0px #CF39E8"],
              transition: {
                duration: .5,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }
          : {
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            }
      }
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        style={{
          color: theme?.colors.text,
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <Dictaphone
        setTranscript={(transcript: string) => setSearch(transcript)}
        setListening={(listening: boolean) => setMic(listening)}
      />
    </SearchInputBox>
  );
}

const SearchInputBox = styled(motion.div)`
  position: relative;
  max-width: 400px;
  min-width: 320px;
  width: 100%;
  height: 40px;
  border-radius: 25px;
  border: none;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SearchInput = styled.input`
  position: relative;
  width: 100%;
  height: 100%;

  padding: 0px 20px;
  border: none;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  outline: none;
  background-color: transparent;
`;
