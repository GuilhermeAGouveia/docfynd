import { useTheme } from "@/context/Theme";
import {
  Icon,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

export interface Message {
  ptBr: string;
  enUs: string;
}

interface BannerProps {
  message: Message;
}

export default function Banner({ message }: BannerProps) {
  const [language, setLanguage] = useState<keyof Message>("enUs");

  const handleChangeLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: keyof Message
  ) => {
    if (newLanguage === null) {
      setLanguage(language);
      return;
    }
    setLanguage(newLanguage);
  };
  const { theme } = useTheme();
  return (
    <BannerBox
      style={{
        backgroundColor: theme?.colors.bg_secondary,
      }}
    >
      <Icon>
        <InfoIcon />
      </Icon>
      <Typography
        sx={{
            position: "relative",
          color: theme?.colors.text_secondary,
          margin: "auto 0",
          display: "flex",
          alignItems: "center",
          
        }}
      >
        {message[language]}
      </Typography>
      <ToggleButtonGroup
        orientation="vertical"
        value={language}
        exclusive
        onChange={handleChangeLanguage}
      >
        <ToggleButton
          value="enUs"
          aria-label="module"
          sx={{
            "&.Mui-selected": {
              backgroundColor: theme.colors.section.primary,
              color: theme.colors.text,
            },
            color: theme.colors.text_secondary,
          }}
        >
          EN
        </ToggleButton>
        <ToggleButton
          value="ptBr"
          aria-label="list"
          sx={{
            "&.Mui-selected": {
              backgroundColor: theme.colors.section.primary,
              color: theme.colors.text,
            },

            color: theme.colors.text_secondary,
          }}
        >
          BR
        </ToggleButton>
      </ToggleButtonGroup>
    </BannerBox>
  );
}

const BannerBox = styled.div`
  position: relative;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin: 10px 0;
`;
