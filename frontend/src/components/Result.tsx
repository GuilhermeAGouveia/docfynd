import {
  Avatar,
  Badge,
  Chip,
  Rating,
  Typography,
  keyframes,
} from "@mui/material";
import { color, motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import ResultOptions from "./ResultOptions";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { useMemo, useState } from "react";
import { Result } from "@/libs/interfaces";
import { useTheme } from "@/context/Theme";
import useDeviceDetect from "@/hook/useDetectDevice";
import { random } from "lodash";
import Keyword from "./Keyword";

interface ResultProps {
  result: Result;
}

export default function Result({ result }: ResultProps) {
  const { theme } = useTheme();
  const [mouseOver, setMouseOver] = useState(false);
  const { isMobileView } = useDeviceDetect();

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <ResultRoot
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <ResultBox
        bgSecondary={theme?.colors.bg_secondary}
        style={{
          left: isMobileView ? "0px" : "-20px",
        }}
        animate={{
          backgroundColor: mouseOver
            ? theme?.colors.bg_secondary
            : theme?.colors.bg,
          outline: mouseOver
            ? "1px solid " + theme?.colors.section.primary
            : "1px solid rgba(0, 0, 0, 0)",
          outlineOffset: mouseOver ? "5px" : "0px",
          transition: {
            outlineOffset: {
              duration: 0.2,
              delay: 0.2,
            },
          },
        }}
      >
        <KeyWordsBox>
          {result?.keywords.map((keyword, index) => (
            <Keyword key={index} index={index} keyword={keyword} />
          ))}
        </KeyWordsBox>
        <Link href={result.url} target="_blank">
          <ResultTitle
            variant="h6"
            sx={{
              color: theme?.colors.text,
              "&:hover": {
                color: theme?.colors.section.secondary,
              },
            }}
          >
            {result.title}
          </ResultTitle>
        </Link>

        <ResultContent
          variant="body2"
          sx={{
            color: theme?.colors.text_secondary,
          }}
          dangerouslySetInnerHTML={{
            __html: result.highlight_abs,
          }}
          themeContext={theme}
        ></ResultContent>
        {useMemo(
          () =>
            !isMobileView ? (
              <Metadata>
                <Chip
                  size="small"
                  variant="outlined"
                  icon={<PublishedWithChangesIcon />}
                  label={`Published in ${formatter.format(
                    new Date(result.createdAt)
                  )}`}
                  sx={{
                    color: theme?.colors.text,
                    borderColor: theme?.colors.section.primary,
                    padding: "4px",
                    height: 28,
                  }}
                />
                <Chip
                  size="small"
                  icon={<AdsClickIcon />}
                  label={`More than ${random(100, 1000)} clicks`}
                  variant="outlined"
                  sx={{
                    color: theme?.colors.text,
                    borderColor: theme?.colors.section.primary,
                    padding: "4px",
                    height: 28,
                  }}
                />
                {result.reading_time && (
                  <Chip
                    size="small"
                    icon={<LocalLibraryIcon />}
                    label={`Reading time of ${result.reading_time} min`}
                    variant="outlined"
                    sx={{
                      color: theme?.colors.text,
                      borderColor: theme?.colors.section.primary,
                      padding: "4px",
                      height: 28,
                    }}
                  />
                )}
              </Metadata>
            ) : (
              <Typography
                variant="caption"
                sx={{
                  color: theme?.colors.text,
                }}
              >
                Published in {formatter.format(new Date(result.createdAt))}
              </Typography>
            ),
          [theme, isMobileView]
        )}
      </ResultBox>
      {!isMobileView && (
        <ResultOptionsBox>
          <ResultOptions show={mouseOver} result={result}></ResultOptions>
        </ResultOptionsBox>
      )}
    </ResultRoot>
  );
}

const ResultRoot = styled(motion.div)`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ResultTitle = styled(Typography)``;

const ResultContent = styled(Typography)<{
  themeContext?: any;
}>`
  & > strong {
    text-decoration: underline dotted;
    color: ${(props) => props.themeContext?.colors.secondary};
  }
`;

const ResultOptionsBox = styled(motion.div)`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: transparent;
`;

const ResultBox = styled(motion.div)<{
  bgSecondary?: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  border: 1px solid rgba(0, 0, 0, 0);
`;

const KeyWordsBox = styled(motion.div)`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const KeyWord = styled(motion(Typography))<{
  hoverbg?: string;
  hovercolor?: string;
}>`
  position: relative;
  width: auto;
  height: 24px;
  padding: 5px 10px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: zoom-in;
  &:hover {
    background-color: ${(props) => props.hoverbg};
    color: ${(props) => props.hovercolor};
  }
`;

const Metadata = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 20px;
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
