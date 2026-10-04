"use client";
import { motion } from "framer-motion";

export default function Logo({
  size = 1,
  light = false,
}: {
  size?: number;
  light?: boolean;
}) {
  const color = light ? "#f6ecd6" : "#1b5a3a";
  return (
    <motion.div
      className="logo"
      style={{ transform: `scale(${size})`, transformOrigin: "center", color }}
      whileHover="hover"
      initial="rest"
    >
      <div className="logo-top">
        <motion.svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          variants={{ hover: { rotate: [0, -8, 8, 0] }, rest: {} }}
        >
          <motion.path
            d="M12 8 V56 H30 C48 56 58 44 58 32 C58 20 48 8 30 8 Z"
            stroke={color}
            strokeWidth="9"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.path
            d="M46 4C30 6 22 16 22 30c0 3 .6 6 2 8 1-9 6-16 14-21-6 6-9 12-11 20 1 .5 3 .8 4 .8 14 0 19-14 15-34z"
            fill={light ? "#c9a96a" : "#3f8a5a"}
            initial={{ scale: 0, rotate: -40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 140 }}
            style={{ transformOrigin: "30px 30px" }}
          />
        </motion.svg>
        <motion.span
          className="logo-word"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          ór
        </motion.span>
      </div>
      <motion.div
        className="logo-ar"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        دوّر
      </motion.div>
    </motion.div>
  );
}
