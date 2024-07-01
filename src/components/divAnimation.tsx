import { motion } from "framer-motion";

const easeInOutTransition = {
  duration: 0.3,
  ease: "easeInOut",
};

type PageTransitionWrapperProps = {
  children: React.ReactNode;
  className: string;
};

const DivAnimation = ({ children, className }: PageTransitionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={easeInOutTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default DivAnimation;
