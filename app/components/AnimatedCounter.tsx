"use client";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  value: number;
}

export const AnimatedCounter = ({ value }: Props) => {
  const digits = String(value).split("");

  return (
    <AnimatePresence mode="popLayout">
      {digits.map((digit, index) => (
        <motion.span
          key={index + digit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative inline-block text-center"
        >
          {digit}
        </motion.span>
      ))}
    </AnimatePresence>
  );
};
