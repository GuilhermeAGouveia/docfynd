import { useSearch } from "@/context/Search";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styled from "styled-components";
import { Search } from "@mui/icons-material";
import { useTheme } from "@/context/Theme";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { on } from "events";
import { isNullOrUndefined } from "util";

interface HistoryProps {
  show: boolean;
  filter: string;
}

export default function HistoryList({ show, filter }: HistoryProps) {
  const { history, onSearch } = useSearch();
  let historyNotRerender = history;
  const [mouseOverItem, setMouseOverItem] = useState<number | null>(null); // [1
  const { theme } = useTheme();

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <AnimatePresence>
      {(show || mouseOverItem) && (
        <HistoryListBox
          initial={{
            height: "0px",
          }}
          animate={{
            height: "auto",
          }}
          exit={{
            height: "0px",
          }}
        >
          <List
            sx={{
              position: "relative",
              width: "100%",
              bgcolor: theme.colors.bg,
              color: theme.colors.text,
              overflow: "hidden",
            }}
          >
            {historyNotRerender
              .filter((history_item) =>
                history_item.query.toLowerCase().includes(filter.toLowerCase())
              )
              .slice(-5)
              .reverse()
              .map((history_item, index) => (
                <ListItem

                  secondaryAction={
                    (index + 1) === mouseOverItem && (
                      <OpenInNewIcon
                        sx={{
                          color: "#CF39E8",
                          width: 20,
                        }}
                      />
                    )
                  }
                  onClick={() => onSearch(history_item.query)}
                  key={history_item.query + history_item.searched_at}
                  onMouseOver={() => setMouseOverItem(index + 1)} // [1
                  onMouseLeave={() => setMouseOverItem(null)} // [1
                  sx={{
                    height: "45px",
                    width: "100%",
                    borderRadius: "3px",
                    cursor: "pointer",

                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      marginLeft: "-16px",
                    }}
                  >
                    <Avatar sx={{ background: "transparent" }}>
                      <HistoryIcon
                        sx={{
                          color: "#CF39E8",
                          width: 20,
                        }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={history_item.query} />
                </ListItem>
              ))}
          </List>
        </HistoryListBox>
      )}
    </AnimatePresence>
  );
}

const HistoryListBox = styled(motion.div)`
  position: relative;
  overflow: hidden;
`;
