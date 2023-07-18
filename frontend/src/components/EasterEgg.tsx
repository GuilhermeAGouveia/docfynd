import {
  AnimationControls,
  TargetAndTransition,
  VariantLabels,
  motion,
} from "framer-motion";
import styled from "styled-components";
import DigitalSnow from "./DigitalSnow";
import stemmer from "@stdlib/nlp-porter-stemmer";
export default function EasterEgg({
  children,
  search,
}: {
  children: React.ReactNode;
  search: string;
}) {
  class Effects {
    effects: {
      [key: string]: {
        type: "styles" | "component";
        value:
          | boolean
          | AnimationControls
          | TargetAndTransition
          | VariantLabels
          | React.ReactNode
          | undefined;
      };
    };
    constructor() {
      this.effects = {};
    }
    setEffect(
      key: string,
      type: "styles" | "component",
      value:
        | boolean
        | AnimationControls
        | TargetAndTransition
        | VariantLabels
        | React.ReactNode
        | undefined
    ) {
      this.effects[stemmer(key)] = {
        type,
        value,
      };
    }

    getEffect(key: string = "") {
      let words = key.split(" ");
      let easterEgg = words.find((word) => this.effects[stemmer(word)]);
      return this.effects[stemmer(easterEgg || "")];
    }
  }

  const effects = new Effects();

  effects.setEffect("skew", "styles", {
    rotate: 5,
    marginTop: 80,
    transition: {
      delay: 2,
    },
  });

  effects.setEffect("rotate", "styles", {
    rotate: 360,
    transition: {
      duration: 5,
      delay: 2,
    },
  });

  effects.setEffect("tremelique", "styles", {
    x: [0, 50, -50, 50, -50, 0],
    transition: {
      duration: 1,
      delay: 2,
      stiffness: 100,
      damping: 10,
      repeat: 3,
    },
  });

  effects.setEffect("snow", "component", <DigitalSnow />);

  const effectValue = effects.getEffect(search as string);

  switch (effectValue?.type) {
    case "styles":
      return (
        <EasterEggBox animate={effectValue.value as any}>
          {children}
        </EasterEggBox>
      );
    case "component":
      return (
        <EasterEggBox>
          {effectValue.value as React.ReactNode}
          {children}
        </EasterEggBox>
      );
    default:
      return <EasterEggBox>{children}</EasterEggBox>;
  }
}

const EasterEggBox = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: flex-start;
`;
