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

export default function ResutlsPage() {
  const router = useRouter();
  const { search } = router.query;
  const { theme } = useTheme();
  const { isMobileView } = useDeviceDetect();

  const [activeFilter, setActiveFilter] = useState(true);

  const initialPage = generateRandomPage(10);

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
            }}
          >
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
              onClick: (num) => console.log(num),
            },
            {
              content: {
                label: "Formulas",
              },
              onClick: (num) => console.log(num),
            },
            {
              content: {
                label: "Imagens",
              },
              onClick: (num) => console.log(num),
            },
          ]}
          sx={{
            fgColor: theme?.colors.primary,
            bgColor: "transparent",
            lineColor: theme?.colors.primary,
          }}
        ></SelectOption>
        {!isMobileView && (
          <ToggleButton
            sx={{
              color: theme?.colors.primary,
              height: "40px",
            }}
            value="check"
            selected={activeFilter}
            onChange={() => {
              setActiveFilter(!activeFilter);
            }}
          >
            <Typography variant="body2">Filtros</Typography>
            <FilterListIcon />
          </ToggleButton>
        )}
      </SelectAndFilterBox>
      <FilterBox show={!activeFilter}/>
      <ResultsBox style={{
        padding: isMobileView ? "0 1rem" : "0 10rem"
      }}>
        <PageButtonList initialPage={initialPage} isLoadingInitialData={false} cardComponent={Result}/>
      </ResultsBox>
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
  padding: 0 30
  align-items: flex-start;
  justify-content: space-around;
  padding: 0 10rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);  
`;

const ResultsBox = styled(motion.div)`
  position: relative;
  display: flex;
  width: 70%;

  height: auto;
  left: -50px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 10rem;
`;