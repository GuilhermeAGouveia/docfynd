import { useTheme } from "@/context/Theme";
import zIndex from "@mui/material/styles/zIndex";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface TransitionSectionComponentProps {
  listener: number;
}

export default function TransitionSectionComponent({
  listener,
}: TransitionSectionComponentProps) {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    let timeOut = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timeOut);
  }, [listener]);

  const sectionTranslate = ["docfynd", "searchonmath", "chatgpt"];

  return (
    <AnimatePresence>
      {show && (
        <TransitionCircle
          initial={{
            height: 0,
            top: "-20px",
          }}
          animate={{
            height: [0, 100, window.innerHeight],
            top: "-20px",
          }}
          exit={{
            top: window.innerHeight,
            height: 0,
          }}
          transition={{
            height: {
              times: [0, 0.5, 1],
              stiffness: 700,
              damping: 30,
            },
          }}
          style={{
            background:
              theme?.colors.sections[
                sectionTranslate[listener] as
                  | "docfynd"
                  | "searchonmath"
                  | "chatgpt"
              ].primary,
            zIndex: 1000,
            width: "100%",
          }}
        ></TransitionCircle>
      )}
    </AnimatePresence>
  );
}

const TransitionCircle = styled(motion.div)`
  position: absolute;
`;
