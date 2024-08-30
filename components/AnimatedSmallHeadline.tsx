import { motion } from 'framer-motion';

const headlineAnimation = {
  initial: { opacity: 0, y: -50 },
  whileInView: { opacity: 1, y: 0, transition: { type: "spring", duration: 1.25, delay: 0.5 } },
};

const AnimatedSmallHeadline = ({ title }: { title: string }) => {
  return (
    <motion.div
      variants={headlineAnimation}
      initial="initial"
      whileInView="whileInView"
    >
      <div className="flex w-full h-20 md:h-[120px] md:justify-center mt-24">
        <h1 className="text-3xl md:text-5xl font-bold  text-white">{title}</h1>
      </div>
      <div className="flex md:justify-center w-full mt">
      </div>
    </motion.div>
  );
};

export default AnimatedSmallHeadline;