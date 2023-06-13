import {
  Avatar,
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";
import { useResult } from "@/context/FavoriteResult";
import styled from "styled-components";
import { useState } from "react";
import { useTheme } from "@/context/Theme";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

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
        <Badge
          badgeContent={
            favoriteResults.length > 99 ? "99+" : favoriteResults.length
          }
          color="primary"
        >
          <BookmarksIcon color="action" />
        </Badge>
      </IconButton>
      <AnimatePresence>
        {hover && (
          <FavoriteResultList
            bgColor={theme?.colors.bg_secondary}
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: theme?.colors.bg_secondary,
                borderRadius: "5px",
                position: "relative",
              }}
            >
              {favoriteResults.length === 0 && (
                <Typography
                  sx={{
                    color: theme?.colors.text,
                    textAlign: "center",
                    padding: "20px",
                  }}
                  variant="body2"
                >
                  No favorite results
                </Typography>
              )}
              {favoriteResults.map((result) => (
                <ListItem
                  key={result?.url}
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
                    secondaryTypographyProps={{
                      color: theme?.colors.text_secondary,
                    }}
                    sx={{
                      color: theme?.colors.text,
                    }}
                  >
                    <Link
                      href={result?.url || ""}
                      style={{
                        color: theme?.colors.primary,
                      }}
                    >
                      {result?.title}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </FavoriteResultList>
        )}
      </AnimatePresence>
    </FavoriteResultRoot>
  );
}

const FavoriteResultRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const FavoriteResultList = styled(motion.div)<{
  bgColor?: string;
}>`
  position: absolute;
  min-width: 300px;
  right: 0;
  z-index: 100;
  top: 40px;
  max-height: 500px;
  overflow-y: auto;

  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: ${({ bgColor }) => bgColor || "red"};
    top: -5px;
    right: 16px;
    transform: rotate(45deg);
  }
`;
