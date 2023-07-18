import SelectOption from "@/components/FloatSelect";
import GeneralTitle from "@/components/GeneralTitle";
import SearchBox from "@/components/SearchBox";
import ToogleTheme from "@/components/ToogleTheme";
import { useTheme } from "@/context/Theme";
import useDeviceDetect from "@/hook/useDetectDevice";
import { ToggleButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import FilterListIcon from "@mui/icons-material/FilterList";
import styled from "styled-components";
import { useState } from "react";
import FilterBox from "@/components/FilterBox";
import Result from "@/components/Result";
import PageButtonList from "@/components/PaginationList";
import { generateRandomPage } from "@/libs/result";
import { motion } from "framer-motion";
import FavoriteResult from "@/components/FavoriteList";
import SectionController from "@/components/SectionController";
import { FilterFields } from "@/libs/interfaces";
import EasterEgg from "@/components/EasterEgg";
import EasterEggsBanner from "@/components/EasterEggsBanner";

export default function ResutlsPage() {
  const router = useRouter();
  const { search } = router.query;
  const { theme, toogleSectionTheme } = useTheme();
  const { isMobileView } = useDeviceDetect();

  const [activeFilter, setActiveFilter] = useState(true);
  const [searchSection, setSearchSection] = useState(0);
  const [filter, setFilter] = useState<FilterFields>({
    sortBy: "relevance",
    orderBy: "desc",
    sinceYear: 1902,
  });

  // const initialPage = generateRandomPage(10);

  const onFilter = (data: any) => {
    setFilter(data);
  };

  return (
    <ResultPageRoot
      style={{
        backgroundColor: theme?.colors.bg,
      }}
      layout
    >
      {!isMobileView ? (
        <TopBarResults>
          <GeneralTitle
            variant="h4"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          />

          <SearchBox searched={search as string} isResultPage />
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <FavoriteResult />
            <ToogleTheme />
          </div>
        </TopBarResults>
      ) : (
        <TopBarResults>
          <SearchBox searched={search as string} isResultPage />
        </TopBarResults>
      )}
      <SelectAndFilterBox>
        <SelectOption
          buttons={[
            {
              content: {
                label: "Todos",
              },
              onClick: (num) => {
                setSearchSection(num);
                toogleSectionTheme("docfynd");
              },
            },
            {
              content: {
                label: "SearchOnMath",
              },
              onClick: (num) => {
                setSearchSection(num);
                toogleSectionTheme("searchonmath");
              },
            },
            {
              content: {
                label: "ChatGPT",
              },
              onClick: (num) => {
                setSearchSection(num);
                toogleSectionTheme("chatgpt");
              },
            },
          ]}
          sx={{
            fgColor: theme?.colors.section.primary,
            bgColor: "transparent",
            lineColor: theme?.colors.section.primary,
          }}
        ></SelectOption>
        {!isMobileView && (
          <ToggleButton
            sx={{
              height: "40px",
            }}
            value={activeFilter}
            selected={activeFilter}
            onChange={() => {
              setActiveFilter(!activeFilter);
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: !activeFilter
                  ? theme?.colors.primary
                  : theme?.colors.text_secondary,
              }}
            >
              Filtros
            </Typography>
            <FilterListIcon
              sx={{
                color: !activeFilter
                  ? theme?.colors.primary
                  : theme?.colors.text_secondary,
              }}
            />
          </ToggleButton>
        )}
      </SelectAndFilterBox>
      <FilterBox
        show={!activeFilter}
        onFilter={onFilter}
        filterFields={filter}
      />
      <EasterEgg search={search as string}>
        <ResultsBox
          style={{
            padding: isMobileView ? "0 5px" : "0 10rem",
            width: isMobileView ? "100%" : "70%",
          }}
        >
          <SectionController
            section={searchSection}
            search={search as string}
            filterFields={filter}
          />
        </ResultsBox>
        {!isMobileView && <EasterEggsBanner search={search as string} />}
      </EasterEgg>
    </ResultPageRoot>
  );
}

const ResultPageRoot = styled(motion.div)`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const TopBarResults = styled.header`
  position: relative;
  display: flex;
  width: 100%;
  height: 100px;
  align-items: flex-start;
  justify-content: space-around;
`;

const SelectAndFilterBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0 10rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ResultsBox = styled(motion.div)<{
  isMobileView?: boolean;
}>`
  position: relative;
  display: flex;
  min-width: 70%;
  height: auto;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;
