import { useTheme } from "@/context/Theme";
import ToogleTheme from "./ToogleTheme";
import { Typography } from "@mui/material";
import styled from "styled-components";

export default function TopBar() {
  const { theme } = useTheme();

  return (
    <TopBarRoot bg={theme?.colors.bg}>
      <Title
        variant="h4"
        color={
          "-webkit-linear-gradient(261.97deg, #DA3D3D 53.17%, #CF39E8 72.83%)"
        }
      >
        Docfynd
      </Title>
      <ToogleTheme />
    </TopBarRoot>
  );
}

const TopBarRoot = styled.div<{
  bg: string;
}>`
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 50px;
  background-color: ${({ bg }) => bg};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`;

const Title = styled(Typography)`
  background: -webkit-linear-gradient(260deg ,#DA3D3D 53.17%, #CF39E8 72.83%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
