import { IconButton, Rating } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ShareIcon from "@mui/icons-material/Share";
import { useTheme } from "@/context/Theme";

interface ResultOptionsProps {
  show: boolean;
}

export default function ResultOptions({ show }: ResultOptionsProps) {
  const { theme } = useTheme();
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
        duration: 0.1,
        delay: 0.2 + i * 0.05,
      },
    }),
  };

  const resultOptionsButtonProps = {
    variants: variantButton,
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
  };

  return (
    <AnimatePresence>
      {show && (
        <ResultOptionsRoot layout>
          <ResultOptionsButton {...resultOptionsButtonProps} custom={1}>
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              style={{
                alignItems: "flex-start",
              }}
            />
          </ResultOptionsButton>
          <ResultOptionsButton
            {...resultOptionsButtonProps}
            bgColor={theme?.colors.bg_secondary}
            custom={2}
          >
            <BookmarkBorderIcon
              sx={{
                color: theme?.colors.text,
                width: "15px",
              }}
            />
          </ResultOptionsButton>
          <ResultOptionsButton
            {...resultOptionsButtonProps}
            bgColor={theme?.colors.bg_secondary}
            custom={3}
          >
            <ShareIcon
              sx={{
                color: theme?.colors.text,
                width: "15px",
              }}
            />
          </ResultOptionsButton>
          <ResultOptionsButton
            {...resultOptionsButtonProps}
            bgColor={theme?.colors.bg_secondary}
            custom={4}
          >
            <OpenInNewIcon
              sx={{
                color: theme?.colors.text,
                width: "15px",
              }}
            />
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
  gap: 5px;
  display: flex;
  justify-content: flex-stat;
  align-items: flex-start;
  flex-direction: column;
`;

const ResultOptionsButton = styled(motion(IconButton))<{
  bgColor?: string;
}>`
  position: relative;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ bgColor }) => bgColor};
`;

// variants={variantButton}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             bgColor={theme?.colors.bg_secondary}

ResultOptionsButton.defaultProps = {
  bgColor: "transparent",
};
