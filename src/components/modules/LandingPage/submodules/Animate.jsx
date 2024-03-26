import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Animate({
    textChange
}) {
  return (
    <AnimatePresence>
      <motion.div
        key={textChange}
        className="text-[#FFC41B]"
        initial={{ opacity: 0, y: 50 }} // Initial position and opacity
        animate={{ opacity: 1, y: 0 }} // Animation to fade in and move up
        exit={{ opacity: 0, y: -100 }} // Animation to fade out
        transition={{ duration: 0.5 }} // Duration of the animation
        onPause={true}
      >
        {textChange}
      </motion.div>
    </AnimatePresence>
  );
}
