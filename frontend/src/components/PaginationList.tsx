import { useEffect, useMemo, useState } from "react";
import { Result, Page } from "../libs/interfaces";
import { Pagination, CircularProgress, List } from "@mui/material";
// import { getImoveisByFilterWithPage } from "../../../lib/imovel";
import { ListComponent } from "../libs/interfaces";
import useDeviceDetect from "@/hook/useDetectDevice";
import styled from "styled-components";
import { search } from "@/libs/result";
import { useTheme } from "@/context/Theme";

export default function PageButtonList({
  initialPage,
  cardComponent: CardComponent,
  filterValues,
  orderByOptions,
  isLoadingInitialData,
}: ListComponent) {
  const { theme } = useTheme();
  const [isLoadingItems, setIsLoadingItems] = useState(isLoadingInitialData);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState<Page<Result>>(initialPage);
  const { isMobileView } = useDeviceDetect();
  async function onChangePage(page: number) {
    setPageNumber(page);
    document.getElementById("listRoot")?.scrollTo(0, 0);
    setIsLoadingItems(true);
    setPage((old) => ({ ...old, data: [] }));
    const res = await search(
      { ...filterValues, ...orderByOptions },
      page
    );
    setPage(res);
    setIsLoadingItems(false);
  }

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  return (
    <ListContainer isMobile={isMobileView}>
      {/* <ListCards imoveis={page.data} cardComponent={CardComponent} isLoading={isLoadingItems} /> */}
      {useMemo(
        () => (
          <List
            style={{
              padding: "10px 0",
            }}
          >
            {page.data.map((imovel) => (
              <CardComponent key={imovel.url} result={imovel} />
            ))}
          </List>
        ),
        [pageNumber, isLoadingItems]
      )}
      {isLoadingItems && (
        <LoadingCentralContainer>
          <CircularProgress
            sx={{
              color: theme?.colors.primary,
            }}
          />
        </LoadingCentralContainer>
      )}
      {page.data.length && (
        <PageCentralContainer>
          <Pagination
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme?.colors.text,
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: theme?.colors.primary,
                color: theme?.colors.text,
              },
              "& .MuiPaginationItem-root.Mui-selected:hover": {
                backgroundColor: theme?.colors.primary,
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
