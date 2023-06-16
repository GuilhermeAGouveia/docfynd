import styled from "styled-components";
import PageButtonList from "./PaginationList";
import Result from "./Result";
import TransitionSectionComponent from "./TransitionSectionComponent";
import { searchOnSearchOnMath, searchWithPage } from "@/libs/result";

interface SectionControllerProps {
  section: number;
  search: string;
}

export default function SectionController({
  section,
  search,
}: SectionControllerProps) {
  return (
    <SectionControllerRoot>
      <TransitionSectionComponent listener={section} />
      <PageButtonList
        getMorePages={searchWithPage}
        search={search}
        isLoadingInitialData={false}
        cardComponent={Result}
        style={{
          position: section === 0 ? "relative" : "absolute",
          zIndex: section === 0 ? 0 : -100,
          opacity: section === 0 ? 1 : 0,
          transitionDelay: "opacity 1s",
          top: 0,
          left: 0,
        }}
      />

      <PageButtonList
        getMorePages={searchOnSearchOnMath}
        search={search}
        isLoadingInitialData={false}
        cardComponent={Result}
        style={{
          position: section === 1 ? "relative" : "absolute",
          top: 0,
          left: 0,
          zIndex: section === 1 ? 0 : -100,
          opacity: section === 1 ? 1 : 0,
          transitionDelay: "opacity 1s",
        }}
      />
    </SectionControllerRoot>
  );
}

const SectionControllerRoot = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
`;
