import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 50,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px",
    amount: 0.1,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
        return { y: 0, opacity: 1 };
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
        return { x: 0, opacity: 1 };
      case "right":
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? staggerDelay : 0,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: getInitialPosition(),
    visible: {
      ...getAnimatePosition(),
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Pre-configured animation variants for common use cases
export const ScrollAnimations = {
  fadeUp: {
    direction: "up" as const,
    distance: 50,
    duration: 0.6,
  },
  fadeDown: {
    direction: "down" as const,
    distance: 50,
    duration: 0.6,
  },
  fadeLeft: {
    direction: "left" as const,
    distance: 50,
    duration: 0.6,
  },
  fadeRight: {
    direction: "right" as const,
    distance: 50,
    duration: 0.6,
  },
  slideUp: {
    direction: "up" as const,
    distance: 100,
    duration: 0.8,
  },
  slideDown: {
    direction: "down" as const,
    distance: 100,
    duration: 0.8,
  },
  staggerUp: {
    direction: "up" as const,
    distance: 30,
    duration: 0.5,
    stagger: true,
    staggerDelay: 0.1,
  },
  staggerLeft: {
    direction: "left" as const,
    distance: 30,
    duration: 0.5,
    stagger: true,
    staggerDelay: 0.1,
  },
};
