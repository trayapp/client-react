import React from "react";
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0.7, x: window.innerWidth },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0.7, x: window.innerWidth },
};
const AnimatePage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
