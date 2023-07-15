import DocCount from "@/components/DocCount";
import LuckyBox from "@/components/ImLucky";
import SearchBox from "@/components/SearchBox";
import TopBar from "@/components/TopBar";
import Weather from "@/components/Weather/Weather";
import { useSearch } from "@/context/Search";
import { useTheme } from "@/context/Theme";
import useDeviceDetect from "@/hook/useDetectDevice";
import { countAllDocs } from "@/libs/result";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import router from "next/router";
import { FormEvent, useMemo, useState } from "react";
import styled from "styled-components";

interface SearchPageProps {
  countDocs: number;
}

export default function SearchPage({ countDocs }: SearchPageProps) {
  const { theme } = useTheme();
  const {isMobileView} = useDeviceDetect();
  const [showLucky, setShowLucky] = useState(0);
  const {
    history,
    onSearch,
    searchState: [search, setSearch],
  } = useSearch();

  return (
    <SearchPageRoot
      animate={{
        backgroundColor: theme?.colors.bg,
      }}
    >
      <TopBar />
      <SearchBody>
        <LuckyBox show={showLucky} desactive={() => setShowLucky(0)} />
        <SearchBox />
        <ButtonBox>
          <Button
            variant="outlined"
            color={"secondary"}
            onClick={() => setShowLucky(Math.round(Math.random() * 100))}
          >
            Estou com sorte
          </Button>
          <Button
            variant="contained"
            sx={{ background: "#CF39E8", "&:hover": { background: "#DA3D3D" } }}
            onClick={() => onSearch()}
          >
            Search
          </Button>
        </ButtonBox>
      </SearchBody>
      <Footer style={{
        padding: isMobileView ? "0 20px" : "20px 50px",
      }}>
        <Weather />
        <DocCount countDocs={countDocs} />
      </Footer>
    </SearchPageRoot>
  );
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const countDocs = await countAllDocs();
  return {
    props: {
      countDocs,
    },
    revalidate: 3600, // 1 hour
  };
};

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
  z-index: 1;
`;

const Footer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
