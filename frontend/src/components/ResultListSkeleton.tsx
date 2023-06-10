import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function ResultListSkeleton() {
  return (
    <SkeletonRoot>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton
        variant="text"
        sx={{ fontSize: "1.5rem", marginBottom: "10px" }}
        width={"60%"}
      />

      {/* For other variants, adjust the size with `width` and `height` */}
      {new Array(10).fill(0).map((_, i) => (
        <Skeleton
          key={"ResultListSkeleton" + i}
          variant="rounded"
          width={"100%"}
          height={220}
          sx={{
            margin: "10px 0",
          }}
        />
      ))}
    </SkeletonRoot>
  );
}

const SkeletonRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
