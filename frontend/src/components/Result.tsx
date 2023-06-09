import { Rating, Typography } from "@mui/material";
import { color, motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import ResultOptions from "./ResultOptions";
import { useState } from "react";
import { Result } from "@/libs/interfaces";
import { useTheme } from "@/context/Theme";
import useDeviceDetect from "@/hook/useDetectDevice";

interface ResultProps {
  result: Result;
}

export default function Result({ result }: ResultProps) {
  const { theme } = useTheme();
  const [mouseOver, setMouseOver] = useState(false);
  const { isMobileView } = useDeviceDetect();
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
            ? "1px solid rgba(0, 0, 0, 0.5)"
            : "1px solid rgba(0, 0, 0, 0)",
          outlineOffset: mouseOver ? "5px" : "0px",
          transition: {
            outlineOffset: {
              duration: 0.2,
            },
          },
        }}
      >
        <KeyWordsBox>
          {result?.keywords.map((keyword, index) => (
            <Link
              href={keyword.dbpedia_resource}
              target="_blank"
              style={{
                textDecoration: "none",
              }}
              key={keyword.dbpedia_resource}
            >
              <KeyWord
                hoverbg={theme?.colors.primary}
                hovercolor={theme?.colors.bg_secondary}
                animate={{
                  backgroundColor: mouseOver
                    ? theme?.colors.bg
                    : theme?.colors.bg_secondary,
                  color: theme?.colors.primary,
                }}
                variant="caption"
                fontWeight={500}
              >
                {keyword.text}
              </KeyWord>
            </Link>
          ))}
        </KeyWordsBox>
        <Link href={result.url} target="_blank">
          <ResultTitle
            variant="h6"
            sx={{
              color: theme?.colors.text,
              "&:hover": {
                color: theme?.colors.secondary,
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
        >
          {result.abs}
        </ResultContent>
      </ResultBox>
      {!isMobileView && (
        <ResultOptionsBox>
          <ResultOptions show={mouseOver}></ResultOptions>
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

const ResultContent = styled(Typography)``;

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

  cursor: pointer;
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
