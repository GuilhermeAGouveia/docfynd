import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";
import ResultOptions from "./ResultOptions";
import { useState } from "react";
import { Result } from "@/libs/interfaces";
import { useTheme } from "@/context/Theme";

interface ResultProps {
  result: Result;
}

export default function Result({ result }: ResultProps) {
  const { theme } = useTheme();
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <ResultRoot
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <ResultOptionsBox>
        <ResultOptions show={mouseOver}></ResultOptions>
      </ResultOptionsBox>
      <ResultBox>
        <Link href={result.url} target="_blank">
          <ResultTitle variant="h6" sx={{
            color: theme?.colors.primary,
            "&:hover": {
                color: theme?.colors.secondary
            }
          }}>
            {result.title}
          </ResultTitle>
        </Link>
        <ResultContent variant="body1" sx={{
            color: theme?.colors.text
        }}>{result.content}</ResultContent>
      </ResultBox>
    </ResultRoot>
  );
}

const ResultRoot = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 200px;
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

const ResultBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
