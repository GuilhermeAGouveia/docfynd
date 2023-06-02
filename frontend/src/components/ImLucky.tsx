import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import randomWords from "random-words";
import styled from "styled-components";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@/context/Theme";
import { useSearch } from "@/context/Search";

interface LuckyProps {
  show: number;
  desactive?: () => void;
}

export default function LuckyBox({ show, desactive }: LuckyProps) {
  const { theme } = useTheme();
  const { onSearch } = useSearch();
  const draw = {
    hidden: (i: number) => ({ x: i % 2 == 0 ? -200 : 200, opacity: 0 }),
    visible: (i: number) => {
      const delay = i;
      return {
        x: 0,
        opacity: 1,
        transition: {
          x: {
            delay: 1 + i * 0.2,
            type: "spring",
            duration: 0.3,
            bounce: 0.5,
            stiffness: 100,
          },
          opacity: { delay: 1 + i * 0.2, duration: 0.01 },
          
        },
      };
    },
  };
  return (
    <AnimatePresence>
      {show && (
        <LuckyBoxRoot>
          {!!desactive && (
            <IconButton onClick={desactive}>
              <CloseIcon sx={{
                color: theme.colors.text,
              }}/>
            </IconButton>
          )}
          <ListAnimated
            sx={{
              padding: "10px",
            }}
          >
            {randomWords({ wordsPerString: 2, min: 2, max: 4 })
              .concat(randomWords({ min: 5, max: 7 }))
              .sort(() => Math.random() - 0.5)
              .map((word, index) => (
                <ListItemAnimated
                  key={word + index}
                  sx={{
                    backgroundColor: "#CF39E8",
                    color: "#fff",
                    borderRadius: "3px",
                    marginBottom: "5px",
                    width: "fit-content",
                  }}
                  custom={index}
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  exit={"hidden"}
                  secondaryAction={
                    <IconButton onClick={() => onSearch(word)}>
                      <OpenInNewIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={word} sx={{ marginRight: "10px" }} />
                </ListItemAnimated>
              ))}
          </ListAnimated>
        </LuckyBoxRoot>
      )}
    </AnimatePresence>
  );
}

const ListItemAnimated = styled(motion(ListItem))``;
const ListAnimated = styled(motion(List))``;
const LuckyBoxRoot = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
`;
