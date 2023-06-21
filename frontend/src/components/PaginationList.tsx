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

export default function PageButtonList({
  search,
  cardComponent: CardComponent,
  filterValues,
  orderByOptions,
  isLoadingInitialData,
  getMorePages,
  style,
  id,
}: ListComponent) {
  const { theme } = useTheme();
  const [isLoadingItems, setIsLoadingItems] = useState(isLoadingInitialData);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<Page<Result>>({
    data: [],
    total: 0,
    hasNext: false,
    took: 0,
  });

  const { isMobileView } = useDeviceDetect();
  const onChangePage = useCallback(
    async function (page: number) {
      setPageNumber(page);
      setPage({
        data: [],
        total: 0,
        hasNext: false,
        took: 0,
      });
      document.getElementById("listRoot")?.scrollTo(0, 0);
      setIsLoadingItems(true);
      const res = await getMorePages(search, page, filterValues);
      setPage(res);
      setIsLoadingItems(false);
    },
    [search, filterValues]
  );

  useEffect(() => {
    if (search) onChangePage(1);
  }, [search, filterValues]);

  return (
    <ListContainer isMobile={isMobileView} style={style} id={id}>
      {!isLoadingItems && page.data.length > 0 && (
        <MetadataSearchContainer
          variant="caption"
          color={theme?.colors.text_secondary}
          style={{
            padding: isMobileView ? "0 10px" : "0",
          }}
        >
          {page.total} resultados em aproximadamente {page.took} segundos
        </MetadataSearchContainer>
      )}
      {isLoadingItems ? (
        // <LoadingCentralContainer>
        //   <CircularProgress
        //     sx={{
        //       color: theme?.colors.primary,
        //     }}
        //   />
        // </LoadingCentralContainer>
        <ResultListSkeleton />
      ) : (
        <List
          style={{
            padding: "10px 0",
          }}
        >
          {page.data.map((imovel) => (
            <CardComponent key={imovel.url} result={imovel} />
          ))}
          {page.data.length === 0 && (
            <NoResultContainer variant="body1" color={theme?.colors.text}>
              Nenhum resultado encontrado {":("}
            </NoResultContainer>
          )}
        </List>
      )}
      {!!page.data.length && (
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
            count={Math.ceil(page.total / 10)}
            onChange={(e, page) => onChangePage(page)}
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
