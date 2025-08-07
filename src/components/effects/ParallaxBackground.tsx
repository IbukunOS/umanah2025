
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 left-20 w-4 h-4 bg-accent rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-60 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }} />
      </motion.div>
      
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-32 right-1/4 w-6 h-6 border border-primary rounded-full" />
        <div className="absolute bottom-40 left-1/3 w-4 h-4 border border-accent rounded-full" />
        <div className="absolute top-2/3 left-20 w-8 h-8 border border-blue-400 rounded-full" />
      </motion.div>
      
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-60 left-1/2 w-32 h-32 border border-white/10 rounded-full" />
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white/5 rounded-full" />
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;
