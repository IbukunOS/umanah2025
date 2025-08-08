
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-birthday.jpg";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, Zap, Camera, MessageSquare } from "lucide-react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as const
      }
    }
  };

  return (
    <header
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      data-scroll-section
      aria-label="Birthday Hero Section"
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={heroImage}
          alt="Luxurious birthday celebration with balloons, confetti, and glowing gradients"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
      </motion.div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-20 text-accent"
        variants={floatingIconVariants}
        animate="animate"
      >
        <Sparkles size={24} className="glow-effect" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-32 text-primary"
        variants={floatingIconVariants}
        animate="animate"
        transition={{ delay: 1 }}
      >
        <Star size={20} className="glow-effect" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-32 text-blue-400"
        variants={floatingIconVariants}
        animate="animate"
        transition={{ delay: 2 }}
      >
        <Zap size={28} className="glow-effect" />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 mx-auto flex h-screen max-w-6xl flex-col items-center justify-center gap-8 px-6 text-center"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-6 py-2 text-sm font-semibold text-white border border-white/20 glass-subtle"
          variants={itemVariants}
          data-scroll
          data-scroll-speed="1.4"
        >
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          Visuals-heavy Birthday Experience
          <motion.div
            className="ml-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: [0, 0, 1, 1] as const }}
          >
            ✨
          </motion.div>
        </motion.span>

        <motion.h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight gradient-text font-bold"
          variants={itemVariants}
          data-scroll
          data-scroll-speed="1.3"
        >
          Let's Celebrate
          <br />
          <motion.span
            className="block"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.42, 0, 0.58, 1] as const
            }}
            style={{
              background: "linear-gradient(45deg, #a855f7, #3b82f6, #06b6d4, #a855f7)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            In Color
          </motion.span>
        </motion.h1>

        <motion.p
          className="max-w-3xl text-xl text-muted-foreground leading-relaxed"
          variants={itemVariants}
          data-scroll
          data-scroll-speed="1.2"
        >
          Experience smooth scrolling, shimmering gradients, live messages, and a stunning gallery. 
          Drop your photos and videos, leave a wish, and immerse yourself in the celebration vibes.
        </motion.p>

        <motion.div 
          className="mt-8 flex flex-col sm:flex-row gap-4" 
          variants={itemVariants}
          data-scroll 
          data-scroll-speed="1.1"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => document.getElementById('messages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageSquare size={20} />
              Leave a Wish
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="glass" 
              size="lg" 
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Camera size={20} />
              View Gallery
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Hero;
