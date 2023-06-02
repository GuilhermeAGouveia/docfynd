import { Typography, TypographyProps } from "@mui/material";
import styled from "styled-components";

export default function GeneralTitle(props: TypographyProps) {
  return (
    <Title
      color={
        "-webkit-linear-gradient(261.97deg, #DA3D3D 53.17%, #CF39E8 72.83%)"
      }
      {...props}
    >
      Docfynd
    </Title>
  );
}

const Title = styled(Typography)`
  background: -webkit-linear-gradient(260deg, #da3d3d 53.17%, #cf39e8 72.83%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
