"use client";
import { useContext, useState } from "react";
import styled, { ThemeContext, css } from "styled-components";
import Theme, { useTheme } from "@/context/Theme";
import { AnimatePresence, motion } from "framer-motion";
import cloud1SVG from "../assets/svg/cloud1.svg";
import cloud2SVG from "../assets/svg/cloud2.svg"; //src/assets/svg/cloud2.svg
import starSVG from "../assets/svg/star.svg";
import Image from "next/image";


export default function ToogleTheme() {
  const { theme, toogleTheme } = useTheme();
  const [active, setActive] = useState<boolean>(theme.theme_name === "light");

  const getRandomStars = (
    numberStars: number,
    xLimit: number,
    yLimit: number
  ) => {
    const stars = [];
    for (let i = 0; i < numberStars; i++) {
      stars.push({
        x: Math.random() * (xLimit - 20) + 3,
        y: Math.random() * (yLimit - 10) + 3,
        size: Math.random() * 5,
      });
    }
    return stars;
  };

  return (
    <ThemeContainer
      onClick={() => {
        toogleTheme();
        setActive((old) => !old);
      }}
      islight={active}
    >
      <ThemeCircle
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
        animate={{
          backgroundColor: active ? "#ffc187" : "#DEE5F3",
          boxShadow: active
            ? "0 0 10px 0 rgba(0, 0, 0, 0.2) inset, 0 0 10px 0 #ffc187"
            : "0 0 10px 0 rgba(0, 0, 0, 0) inset, 0 0 20px 0 rgba(222, 229, 243, 0.5)",
        }}
      >
        <ThemeCircle
          style={{ position: "absolute", width: "20px", height: "20px" }}
          animate={{
            backgroundColor: active ? "transparent" : "#292929",
            left: active ? "-40px" : "0%",
            top: active ? "-40px" : "0%",
          }}
        />
      </ThemeCircle>

      <AnimatePresence>
        {active ? (
          <CloudBackground
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={cloud2SVG} alt="cloud" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image src={cloud1SVG} alt="cloud" />
            </motion.div>
          </CloudBackground>
        ) : (
          <SkyBackground>
            {getRandomStars(25 , 60, 40).map((star, index) => (
              <StarImage
                
                src={starSVG}
                alt="star"
                key={index}
                initial={{
                  left: `${Math.random() * 100}px`,
                  top: `${Math.random() < 0.5 ? 0 : 100}px`,
                  width: `${star.size}px`,
                }}
                  
                animate={{
                  left: `${star.x}px`,
                  top: `${star.y}px`,
                  width: `${star.size}px`,
                }}

                exit={{
                  left: `${star.x}px`,
                  top: `${Math.random() < 0.5 ? 0 : 100}px`,
                  width: `${star.size}px`,
                }}

              />
            ))}
          </SkyBackground>
        )}
      </AnimatePresence>
    </ThemeContainer>
  );
}

const styles = {
  lightCss: css`
    justify-content: flex-start;
  `,
  darkCss: css`
    justify-content: flex-end;
  `,
};

const ThemeContainer = styled.div<{ islight: boolean }>`
  position: relative;
  display: flex;

  align-items: center;
  width: 90px;
  height: 40px;
  border-radius: 25px;
  background-color: transparent;
  overflow: hidden;
  cursor: pointer;
  padding: 0 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5) inset;
  ${({ islight }) => styles[islight ? "lightCss" : "darkCss"]};
`;

const ThemeCircle = styled(motion.div)`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  z-index: 1;
  overflow: hidden;
`;

const CloudBackground = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-left: -5px;
  border-radius: 25px;
  background-color: #a0fdff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5) inset;
  z-index: 0;

  * {
    position: absolute;
    right: -10px;
    bottom: 0px;
  }
`;

const SkyBackground = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;

const StarImage = styled(motion(Image))`
  position: absolute;
`;