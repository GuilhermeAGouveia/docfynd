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

export default function HistoryList() {
  const { history } = useSearch();

  const { theme } = useTheme();

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <List
      sx={{
        position: "relative",
        width: "100",
        bgcolor: theme.colors.bg,
        color: theme.colors.text,
        margin: 0,
        maxHeight: "200px",
        overflow: "hidden",
        border: "solid 1px rgba(0, 0, 0, 0.2)",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)"
      }}
    >
      {history.reverse().map((history_item) => (
        <ListItem
          key={history_item.query + history_item.searched_at}
        >
          <ListItemAvatar>
            <Avatar sx={{background: "transparent"}}>
              <HistoryIcon sx={{
                color: "#CF39E8"
              }}/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={history_item.query}
            secondary={formatter.format(new Date(history_item.searched_at))}
          />
        </ListItem>
      ))}
    </List>
  );
}
