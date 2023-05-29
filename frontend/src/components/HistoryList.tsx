import { useSearch } from "@/context/Search";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import styled from "styled-components";
import { Search } from "@mui/icons-material";
import { useTheme } from "@/context/Theme";
import { AnimatePresence, motion } from "framer-motion";

interface HistoryProps {
  show: boolean;
}

export default function HistoryList({ show }: HistoryProps) {
  const { history } = useSearch();

  const { theme } = useTheme();

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });


  return (
    <AnimatePresence>
      {show && <HistoryListBox initial={{
        height: "0px",
      }}

        animate={{
          height: "auto"
        }}

        exit={{
          height: "0px"
        }}
      >
        <List
          sx={{
            position: "relative",
            width: "100",
            bgcolor: theme.colors.bg,
            color: theme.colors.text,
            marginTop: "-20px",
            overflow: "hidden",
          }}
        >
          {history.reverse().slice(0, 5).map((history_item) => (
            <ListItem
              onClick={() => {}}
              key={history_item.query + history_item.searched_at}
            >
              <ListItemAvatar>
                <Avatar sx={{ background: "transparent" }}>
                  <HistoryIcon sx={{
                    color: "#CF39E8",
                    width: 20
                  }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={history_item.query}
                
              />
            </ListItem>
          ))}
        </List>
      </HistoryListBox>}
    </AnimatePresence>
  );
}


const HistoryListBox = styled(motion.div)`
  position: relative;
  overflow: hidden;
`