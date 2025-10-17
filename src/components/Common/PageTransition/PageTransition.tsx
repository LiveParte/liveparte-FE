import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useTransition } from "@/Context/TransitionContext";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
};

// Fade + Scale transition variants
const fadeScaleVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 30,
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    scale: 1.05,
    y: -30,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

const fadeScaleTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.6,
};

// Slide transition variants
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

// Cover transition variants
const coverVariants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  in: {
    scaleX: 1,
    originX: 0,
  },
  out: {
    scaleX: 0,
    originX: 1,
  },
};

// Blur transition variants
const blurVariants = {
  initial: {
    filter: "blur(10px)",
    opacity: 0,
  },
  in: {
    filter: "blur(0px)",
    opacity: 1,
  },
  out: {
    filter: "blur(10px)",
    opacity: 0,
  },
};

export default function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  const router = useRouter();

  // Determine transition direction based on route
  const getTransitionDirection = () => {
    const routes = ["/", "/livetv", "/liveshows", "/mylist"];
    const currentIndex = routes.indexOf(router.pathname);
    const previousIndex = routes.indexOf(router.asPath);
    return currentIndex > previousIndex ? 1 : -1;
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.pathname}
        className={className}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Slide transition component
export function SlidePageTransition({
  children,
  className = "",
}: PageTransitionProps) {
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
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Cover transition component
export function CoverPageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          className={className}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Cover overlay */}
      <AnimatePresence>
        <motion.div
          key={`cover-${router.pathname}`}
          className="absolute inset-0 bg-black-background z-50"
          initial="initial"
          animate="in"
          exit="out"
          variants={coverVariants}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.6,
          }}
        />
      </AnimatePresence>
    </div>
  );
}

// Fade + Scale transition component
export function FadeScalePageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.pathname}
        className={className}
        initial="initial"
        animate="in"
        exit="out"
        variants={fadeScaleVariants}
        transition={fadeScaleTransition}
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Blur transition component
export function BlurPageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.pathname}
        className={className}
        initial="initial"
        animate="in"
        exit="out"
        variants={blurVariants}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Staggered content animation
export function StaggeredContent({
  children,
  className = "",
}: PageTransitionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className={className}
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
  );
}
