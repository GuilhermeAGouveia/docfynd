import { IconButton, Rating } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface ResultOptionsProps {
  show: boolean;
}

export default function ResultOptions({ show }: ResultOptionsProps) {
  const variantButton = {
    hidden: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.2,
        delay: 0.2,
      },
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        delay: 0.2 + i * 0.1,
      },
    }),
  };

  return (
    <AnimatePresence>
      {show && (
        <ResultOptionsRoot
          initial={{
            opacity: 0,
            x: 100,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 100,
          }}
          layout
        >
          <ResultOptionsButton
            variants={variantButton}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} style={{
                alignItems: "flex-start",
            }}/>
          </ResultOptionsButton>
          <ResultOptionsButton
            variants={variantButton}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <BookmarkBorderIcon />
          </ResultOptionsButton>
        </ResultOptionsRoot>
      )}
    </AnimatePresence>
  );
}

const ResultOptionsRoot = styled(motion.div)`
  position: relative;
  width: 50px;
  height: auto;
  background-color: transparent;
`;

const ResultOptionsButton = styled(motion(IconButton))`
  position: relative;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
`;
