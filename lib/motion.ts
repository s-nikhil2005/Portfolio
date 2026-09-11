import { type Variants } from "framer-motion";

export const EASING = {
  primary: [0.2, 0.9, 0.3, 1] as const,
  easeOut: "easeOut" as const,
  linear: "linear" as const,
};

export const DURATION = {
  hover: 0.15,
  panelUpdate: 0.2,
  pageTransition: 0.25,
  scrollEntrance: 0.4,
  caseStudyTransition: 0.4,
  copyHoldMs: 1500,
};

export const STAGGER = {
  itemOffset: 0.04, // 40ms
};

export const entranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.scrollEntrance,
      ease: EASING.primary,
    },
  },
};

export const panelCrossfadeVariants: Variants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.panelUpdate,
      ease: EASING.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.15,
      ease: EASING.easeOut,
    },
  },
};

// Reduced motion fallbacks
export const reducedMotionEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};

export const reducedMotionPanelVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};
