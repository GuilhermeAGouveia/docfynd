import { Typography, TypographyProps } from "@mui/material";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function GeneralTitle(props: TypographyProps) {
  const router = useRouter();
  return (
    <Title
      onClick={() => router.push("/")}
      color={
        "-webkit-linear-gradient(261.97deg, #CF39E8 53.17%, #DA3D3D 72.83%)"
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
  cursor: pointer;
`;
