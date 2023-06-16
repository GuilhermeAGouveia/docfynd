import styled from "styled-components";
import PageButtonList from "./PaginationList";
import Result from "./Result";
import TransitionSectionComponent from "./TransitionSectionComponent";

interface SectionControllerProps {
  section: number;
  search: string;
}

export default function SectionController({ section, search }: SectionControllerProps) {
  return (
    <SectionControllerRoot>
        <TransitionSectionComponent listener={section}/>
      <PageButtonList
        search={search}
        isLoadingInitialData={false}
        cardComponent={Result}
      />
    </SectionControllerRoot>
  );
}

const SectionControllerRoot = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
`;
