import GeneralTitle from "@/components/GeneralTitle";
import SearchBox from "@/components/SearchBox";
import ToogleTheme from "@/components/ToogleTheme";
import { useTheme } from "@/context/Theme";
import useDeviceDetect from "@/hook/useDetectDevice";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function ResutlsPage() {
  const router = useRouter();
  const { search } = router.query;
  const { theme } = useTheme();
  const { isMobileView } = useDeviceDetect();

  return (
    <ResultPageRoot
      style={{
        backgroundColor: theme?.colors.bg,
      }}
    >
      {!isMobileView ? (
        <TopBarResults>
          <GeneralTitle
            variant="h5"
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
    </ResultPageRoot>
  );
}

const ResultPageRoot = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const TopBarResults = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100px;
  align-items: flex-start;
  justify-content: space-around;
`;
