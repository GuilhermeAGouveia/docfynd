import { IconButton, Rating } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from '@mui/icons-material/Share';
import { useTheme } from "@/context/Theme";

interface ResultOptionsProps {
  show: boolean;
}

export default function ResultOptions({ show }: ResultOptionsProps) {

  const { theme } = useTheme()
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

  return (
    <AnimatePresence>
      {show && (
        <ResultOptionsRoot
    
          layout
        >
          <ResultOptionsButton
            variants={variantButton}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={1}
          >
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} style={{
              alignItems: "flex-start",
            }} />
          </ResultOptionsButton>
          <ResultOptionsButton
            variants={variantButton}
            initial="hidden"
            animate="visible"
            exit="hidden"
            bgColor={theme?.colors.bg_secondary}
            custom={2}
          >
            <BookmarkBorderIcon sx={{
              color: theme?.colors.text,
              width: "15px"
            }}/>
          </ResultOptionsButton>
          <ResultOptionsButton
          bgColor={theme?.colors.bg_secondary}
            variants={variantButton}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={2}
          >
            <ShareIcon sx={{
              color: theme?.colors.text,
              width: "15px"
            }}/>
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
  background: ${({bgColor}) => bgColor};

`;
