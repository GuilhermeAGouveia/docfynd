import {
  AnimationControls,
  CustomValueType,
  MotionStyle,
  TargetAndTransition,
  VariantLabels,
  motion,
} from "framer-motion";
import styled from "styled-components";
import DigitalSnow from "./DigitalSnow";

export default function EasterEgg({
  children,
  search,
}: {
  children: React.ReactNode;
  search: string;
}) {
  const effects: {
    [key: string]:
      | boolean
      | AnimationControls
      | TargetAndTransition
      | VariantLabels
      | undefined;
  } = {
    skew: {
      rotate: 5,
      marginTop: 80,
      transition: {
        delay: 2,
      },
    },
    rotate: {
      rotate: 360,
      transition: {
        duration: 5,
        delay: 2,
      },
    },
    tremelique: {
      x: [0, 50, -50, 50, -50, 0],
      transition: {
        duration: 1,
        delay: 2,
        stiffness: 100,
        damping: 10,
        repeat: 3,
      },
    },
  };

  const ComponentEffects = {
    snow: <DigitalSnow />,
  };
  return (
    <EasterEggBox animate={effects[search]}>
      {children} {ComponentEffects[search as keyof typeof ComponentEffects]}
    </EasterEggBox>
  );
}

const EasterEggBox = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: flex-start;
`;
