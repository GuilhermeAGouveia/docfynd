import {
  Avatar,
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";
import { useResult } from "@/context/FavoriteResult";
import styled from "styled-components";
import { useState } from "react";
import { useTheme } from "@/context/Theme";
import Link from "next/link";

export default function FavoriteResult() {
  const { favoriteResults, removeFavoriteResult } = useResult();
  const { theme } = useTheme();
  const [hover, setHover] = useState(false);

  return (
    <FavoriteResultRoot
      style={{
        width: "100%",
      }}
      onMouseLeave={() => setHover(false)}
    >
      <IconButton onMouseEnter={() => setHover(true)}>
        <Badge badgeContent={favoriteResults.length} color="primary">
          <BookmarksIcon color="action" />
        </Badge>
      </IconButton>
      <FavoriteResultList>
        {hover && (
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: theme?.colors.bg_secondary,
              borderRadius: "5px",
            }}
          >
            {favoriteResults.length === 0 && <p>No favorite results</p>}
            {favoriteResults.map((result) => (
              <ListItem
                key={result?.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFavoriteResult(result)}
                  >
                    <DeleteIcon
                      sx={{
                        color: theme?.colors.text,
                      }}
                    />
                  </IconButton>
                }
              >
                <ListItemText
                  secondary={result?.abs.substring(0, 80) + " ..."}
                  sx={{
                    color: theme?.colors.text,
                  }}
                >
                  <Link href={result?.url || ""}>{result?.title}</Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </FavoriteResultList>
    </FavoriteResultRoot>
  );
}

const FavoriteResultRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FavoriteResultList = styled.div`
  position: absolute;
  min-width: 300px;
  height: 100%;
  right: 0;
  z-index: 100;
  top: 40px;
`;
