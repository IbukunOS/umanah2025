
import { motion } from "framer-motion";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)",
        }}
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ x: "20vw", y: "10vh" }}
      />
      
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
        }}
        animate={{
          x: [50, -50, 50],
          y: [25, -25, 25],
          scale: [1.2, 0.8, 1.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -5,
        }}
        initial={{ x: "70vw", y: "60vh" }}
      />
      
      <motion.div
        className="absolute w-48 h-48 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          x: [-30, 80, -30],
          y: [40, -40, 40],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -10,
        }}
        initial={{ x: "10vw", y: "70vh" }}
      />

      {/* Smaller floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white opacity-20"
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${80 + Math.random() * 20}%`,
          }}
        />
      ))}
      
      {/* Geometric shapes */}
      <motion.div
        className="absolute w-24 h-24 opacity-10"
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          background: "linear-gradient(45deg, #a855f7, #3b82f6)",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        initial={{ x: "80vw", y: "20vh" }}
      />
      
      <motion.div
        className="absolute w-16 h-16 opacity-15 border-2 border-accent rounded-lg"
        animate={{
          rotate: -360,
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        initial={{ x: "15vw", y: "40vh" }}
      />
    </div>
  );
};

export default FloatingElements;
