import { useTheme } from "@/context/Theme";
import { Keyword } from "@/libs/interfaces";
import { Badge, Chip } from "@mui/material";
import Link from "next/link";

interface KeyboardProps {
  keyword: Keyword;
  index: number;
}

export default function Keyword({ index, keyword, }: KeyboardProps) {
  const { theme } = useTheme();
  return (
    <Link
      href={keyword?.dbpedia_resource || "#"}
      target="_blank"
      style={{
        textDecoration: "none",
      }}
      key={keyword.dbpedia_resource}
    >
      <Badge
        badgeContent={index + 1}
        sx={{
          color: theme?.colors.section.secondary,
        }}
      >
        <Chip
          size="small"
          label={keyword.text}
          sx={{
            color: theme?.colors.section.primary,
            backgroundColor: theme?.colors.bg_secondary,
            padding: "4px",
            height: 28,
            cursor: "pointer",
          }}
        />
      </Badge>
    </Link>
  );
}
