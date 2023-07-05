import { motion } from "framer-motion";
import { min } from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import flock from "../../assets/svg/flock.svg";
import Image from "next/image";

interface DigitalSnowProps {
  snowflakes?: number;
  flakes?: number;
}

export default function DigitalSnow({
  snowflakes = 50,
  flakes = 20,
}: DigitalSnowProps) {
  const [clientScreen, setClientScreen] = useState({
    width: 0,
    height: 0,
  });

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setClientScreen({ width: innerWidth, height: innerHeight });
  }, []);

  return (
    <DigitalSnowRoot>
      {new Array(snowflakes).fill(0).map((e, index) => {
        let width = randomInt(4, 7) + "px";
        return (
          <Snowflake
            key={"snow" + index}
            style={{
              top: "-20px",
              left: randomInt(0, clientScreen.width) + "px",
              background: `rgba(255,255,255,${randomInt(5, 10) / 10})`,
              width: width,
              height: width,
            }}
            animate={{
              y: ["-20px", clientScreen.height + 70 + "px"],
              transition: {
                duration: randomInt(5, 10),
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: randomInt(0, 10),
              },
            }}
          />
        );
      })}
      {new Array(flakes).fill(0).map((e, index) => (
        <Floke
          src={flock}
          alt="flock"
          key={"flock" + index}
          style={{
            top: "-20px",
            left: randomInt(0, clientScreen.width) + "px",
          }}
          animate={{
            y: ["-20px", clientScreen.height + 70 + "px"],
            rotate: [0, 360],
            transition: {
              duration: randomInt(5, 10),
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: randomInt(0, 10),
            },
          }}
        />
      ))}
    </DigitalSnowRoot>
  );
}

const DigitalSnowRoot = styled.div`
  position: fixed;
  width: 100%;
  top: -20px;
`;

const Snowflake = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
`;

const Floke = styled(motion(Image))`
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;
