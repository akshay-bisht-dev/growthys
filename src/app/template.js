"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

// The first render (SSR + hydration) is never animated, so content is
// visible without JavaScript. Later client-side navigations fade in.
let hasNavigated = false;

export default function Template({ children }) {
  const reduce = useReducedMotion();
  const animate = hasNavigated && !reduce;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
