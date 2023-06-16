import styled from "styled-components";
import PageButtonList from "./PaginationList";
import Result from "./Result";
import TransitionSectionComponent from "./TransitionSectionComponent";
import { searchOnSearchOnMath, searchWithPage } from "@/libs/result";
import { RefObject, createRef, useEffect, useRef, useState } from "react";

interface SectionControllerProps {
  section: number;
  search: string;
}

export default function SectionController({
  section,
  search,
}: SectionControllerProps) {
  const sectionsTranslate = ["docfynd", "searchonmath", "chatgpt"];

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(
      document?.getElementById(sectionsTranslate[section])?.offsetHeight || 100
    );
  }, [section]);

  return (
    <SectionControllerRoot style={{
      left: -section * 100 + "%",
      transitionDelay: "1s",
      
    }}>
      <TransitionSectionComponent listener={section} />
      <PageButtonList
        id="docfynd"
        getMorePages={searchWithPage}
        search={search}
        isLoadingInitialData={false}
        cardComponent={Result}
        style={{
          position: "relative",
          zIndex: section === 0 ? 0 : -100,
          opacity: section === 0 ? 1 : 0,
          transitionDelay: "1s",

          top: 0,
          left: 0,
        }}
      />

      <PageButtonList
        id="searchonmath"
        getMorePages={searchOnSearchOnMath}
        search={search}
        isLoadingInitialData={false}
        cardComponent={Result}
        style={{
          position: "relative",
          left: 0,
          zIndex: section === 1 ? 0 : -100,
          opacity: section === 1 ? 1 : 0,
          transitionDelay: "1s",
          
        }}
      />
    </SectionControllerRoot>
  );
}

const SectionControllerRoot = styled("div")`
  position: relative;
  width: 200%;
  display: flex;
`;
