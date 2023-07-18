import { useCallback, useEffect, useMemo, useState } from "react";
import { Result, Page } from "../libs/interfaces";
import { Pagination, CircularProgress, List, Typography } from "@mui/material";
// import { getImoveisByFilterWithPage } from "../../../lib/imovel";
import { ListComponent } from "../libs/interfaces";
import useDeviceDetect from "@/hook/useDetectDevice";
import styled from "styled-components";
import { searchWithPage } from "@/libs/result";
import { useTheme } from "@/context/Theme";
import ResultListSkeleton from "./ResultListSkeleton";
import Banner from "./Banner";
import { useQuery } from "@tanstack/react-query";

export default function PageButtonList({
  search,
  cardComponent: CardComponent,
  filterValues,
  getMorePages,
  style,
  info,
  id,
}: ListComponent) {
  const { theme } = useTheme();
  const [pageNumber, setPageNumber] = useState(1);

  const { data: page, isLoading } = useQuery(
    ["search", search, pageNumber, filterValues],
    () => getMorePages(search, pageNumber, filterValues)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const { isMobileView } = useDeviceDetect();

  return (
    <ListContainer isMobile={isMobileView} style={style} id={id}>
      {info && <Banner message={info} />}
      {!isLoading && (page?.data.length || 0) > 0 && (
        <MetadataSearchContainer
          variant="caption"
          color={theme?.colors.text_secondary}
          style={{
            padding: isMobileView ? "0 10px" : "0",
          }}
        >
          {page?.total} resultados em aproximadamente {page?.took} segundos
        </MetadataSearchContainer>
      )}

      {isLoading ? (
        <ResultListSkeleton />
      ) : (
        <List
          style={{
            padding: "10px 0",
          }}
        >
          {page?.data.map((imovel) => (
            <CardComponent key={imovel.url} result={imovel} />
          ))}
          {page?.data.length === 0 && !isLoading && (
            <NoResultContainer variant="body1" color={theme?.colors.text}>
              Nenhum resultado encontrado {":("}
            </NoResultContainer>
          )}
        </List>
      )}
      {!!page?.data.length && (
        <PageCentralContainer>
          <Pagination
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme?.colors.text,
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: theme?.colors.section.primary,
                color: theme?.colors.text,
              },
              "& .MuiPaginationItem-root.Mui-selected:hover": {
                backgroundColor: theme?.colors.section.primary,
                color: theme?.colors.text,
              },
            }}
            count={Math.ceil(page?.total / 10)}
            onChange={(e, page) => setPageNumber(page)}
            style={{
              margin: "20px 0",
            }}
            page={pageNumber}
          />
        </PageCentralContainer>
      )}
    </ListContainer>
  );
}

export const ListContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0 auto;

  ${(props) =>
    props.isMobile &&
    `
    padding-bottom: 55px;
  `}
`;

export const LoadingCentralContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageCentralContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MetadataSearchContainer = styled(Typography)`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NoResultContainer = styled(Typography)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
