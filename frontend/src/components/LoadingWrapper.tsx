import { Skeleton, SxProps } from "@mui/material";

interface Props {
    children: React.ReactNode;
    isLoading: boolean;
    sx: SxProps;
}

export default function LoadingWrapper({ children, isLoading, sx }: Props) {
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={sx}
        animation="wave"
      />
    );
  }
  return <>{children}</>;
}
