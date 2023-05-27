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

  const {theme} = useTheme();

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <List sx={{ position: "relative" ,width: "100", bgcolor: theme.colors.bg, color: theme.colors.text, margin: 0 }}>
      {history.map((history_item) => (
        <ListItem key={history_item.query + history_item.searched_at.toDateString()}>
          <ListItemAvatar>
            <Avatar>
              <HistoryIcon />
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
