import DocCount from "@/components/DocCount";
import LuckyBox from "@/components/ImLucky";
import SearchBox from "@/components/SearchBox";
import ToogleTheme from "@/components/ToogleTheme";
import TopBar from "@/components/TopBar";
import { useTheme } from "@/context/Theme";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

export default function SearchPage() {
  const { theme } = useTheme();
  const [showLucky, setShowLucky] = useState(0);

  return (
    <SearchPageRoot
      animate={{
        backgroundColor: theme?.colors.bg,
      }}
    >
      <TopBar />
      
      <SearchBody>
        <LuckyBox show={showLucky} desactive={() => setShowLucky(0)}/>
        <SearchBox />
        <ButtonBox>
          <Button variant="outlined" color={"secondary"} onClick={() => setShowLucky(Math.round(Math.random() * 100))}>Estou com sorte</Button>
          <Button variant="contained" sx={{ background: "#CF39E8", "&:hover": {background: "#DA3D3D"} }}>
            Search
          </Button>
        </ButtonBox>
      </SearchBody>
      <DocCount />
    </SearchPageRoot>
  );
}

const SearchPageRoot = styled(motion.div)<{ bg?: string }>`
  position: relative;
  display: block;

  min-height: 100vh;
`;

const SearchBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
  width: 100%;
  gap: 20px;
  height: calc(100vh - 100px);
`;

const ButtonBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  width: 100%;
`;
