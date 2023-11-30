import { motion } from "framer-motion";

export function MoveToRight({ children }) {
  return (
    <motion.div
      initial={{ x: "10px", opacity: 0 }}
      animate={{ x: "0", opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
export function MoveToTop({ children }) {
  return (
    <motion.div
      initial={{ y: "5px", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.2, delay: "0", ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
export function CardLaunch({ children }) {
  return (
    <motion.div
      className="box"
      key="content"
      initial={{ opacity: 0, y: "-10px" }}
      animate={{ opacity: 1, y: "0px" }}
      transition={{ duration: 0.2, delay: "0.2", ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
export function HeightLaunch({ children }) {
  return (
    <motion.div
      className="box"
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: "0.1", ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
export function HeightLaunchDelayed({ children }) {
  return (
    <motion.div
      className="box"
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export function MoveToTopDelayed({ children }) {
  return (
    <motion.div
      initial={{ y: "5px", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: "0.2",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
export function Opacity({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
export function SkeltonDelayed({ children }) {
  return (
    <motion.div
      className="box"
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, delay: "0.5", ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
export function MoveToRightSlow({ children }) {
  return (
    <motion.div
      initial={{ x: "10px", opacity: 0 }}
      animate={{ x: "0", opacity: 1 }}
      transition={{ duration: 0.2, delay: "0.4", ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
