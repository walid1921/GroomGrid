import { motion } from "framer-motion";

const easeInOutTransition = {
  duration: 0.3,
  ease: "easeInOut",
};

type PageTransitionWrapperProps = {
  children: React.ReactNode;
};

const TitleAnimation = ({ children }: PageTransitionWrapperProps) => {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={easeInOutTransition}
      className="text-2xl sm:text-4xl font-semibold "
    >
      {children}
    </motion.h1>
  );
};

export default TitleAnimation;
