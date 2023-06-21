import styled from "styled-components";
import PageButtonList from "./PaginationList";
import Result from "./Result";
import TransitionSectionComponent from "./TransitionSectionComponent";
import { searchOnSearchOnMath, searchWithPage } from "@/libs/result";
import { RefObject, createRef, useEffect, useRef, useState } from "react";
import ChatGPT from "./ChatGPT";
import { FilterFields } from "@/libs/interfaces";

interface SectionControllerProps {
  section: number;
  search: string;
  filterFields: FilterFields;
}

export default function SectionController({
  section,
  search,
  filterFields,
}: SectionControllerProps) {
  const sectionsTranslate = ["docfynd", "searchonmath", "chatgpt"];

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(
      document?.getElementById(sectionsTranslate[section])?.offsetHeight || 100
    );
  }, [section]);



  return (
    <SectionControllerRoot
      style={{
        left: -section * 100 + "%",
        transitionDelay: ".4s",
      }}
    >
      <TransitionSectionComponent listener={section} />
      <PageButtonList
        id="docfynd"
        getMorePages={searchWithPage}
        search={search}
        isLoadingInitialData={false}
        cardComponent={Result}
        filterValues={filterFields}
        style={{
          position: "relative",
          zIndex: section === 0 ? 0 : -100,
          opacity: section === 0 ? 1 : 0,
          transitionDelay: ".4s",

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
          transitionDelay: ".4s",
        }}
      />

      <ChatGPT
        search={search}
        style={{
          position: "relative",
          left: 0,
          zIndex: section === 2 ? 0 : -100,
          opacity: section === 2 ? 1 : 0,
          transitionDelay: ".4s",
        }}
      />
    </SectionControllerRoot>
  );
}

const SectionControllerRoot = styled("div")`
  position: relative;
  width: 300%;
  display: flex;
`;
