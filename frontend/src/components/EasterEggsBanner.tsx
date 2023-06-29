import { Search, useSearch } from "@/context/Search";
import { useTheme } from "@/context/Theme";
import { Chip, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import AdjustIcon from "@mui/icons-material/Adjust";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export type EasterEggsI = "skew" | "rotate" | "tremelique";



export default function EasterEggsBanner({search}: {search: string}) {

  const { onSearch } = useSearch();
  const { theme } = useTheme();

  const handleEasterEgg = (easterEgg: EasterEggsI) => {
    onSearch({ query: easterEgg });
  };

  const renderEasterEggButton = (easterEggI: EasterEggsI) => (
    <Chip
      label={easterEggI}
      onClick={() => handleEasterEgg(easterEggI)}
      icon={easterEggI === search ? <CheckCircleIcon sx={{color: "#CF39E8"}}/> : <AdjustIcon />}
      variant={easterEggI === search ? "outlined" : "filled"}
      sx={{
        color: theme?.colors.text_secondary,
        backgroundColor: theme?.colors.bg_secondary,
        
      }}
    />
  );

  return (
    <EasterEggsBannerBox>
      <Typography
        variant="h6"
        sx={{
          color: theme?.colors.text,
        }}
      >
        Confira alguns easter eggs
      </Typography>
      {renderEasterEggButton("skew")}
      {renderEasterEggButton("rotate")}
      {renderEasterEggButton("tremelique")}
    </EasterEggsBannerBox>
  );
}

const EasterEggsBannerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  margin: 10px;
  gap: 10px;
  width: 100%;
`;
