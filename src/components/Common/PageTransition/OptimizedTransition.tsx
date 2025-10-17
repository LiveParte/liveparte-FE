import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useTransition } from "@/Context/TransitionContext";

interface OptimizedTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Optimized slide transition variants
const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  in: {
    x: 0,
    opacity: 1,
  },
  out: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const slideTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

// Staggered content animation for smooth content reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

export default function OptimizedTransition({
  children,
  className = "",
}: OptimizedTransitionProps) {
  const router = useRouter();
  const { transitionDirection } = useTransition();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.pathname}
        className={className}
        custom={transitionDirection}
        initial="initial"
        animate="in"
        exit="out"
        variants={slideVariants}
        transition={slideTransition}
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {React.Children.map(children, (child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
