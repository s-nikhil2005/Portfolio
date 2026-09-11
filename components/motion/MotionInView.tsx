"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { entranceVariants, reducedMotionEntranceVariants } from "@/lib/motion";

interface MotionInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MotionInView: React.FC<MotionInViewProps> = ({
  children,
  className,
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionEntranceVariants : entranceVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
