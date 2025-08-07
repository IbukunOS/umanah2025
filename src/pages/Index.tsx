
import { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/visuals/Hero";
import Gallery from "@/components/visuals/Gallery";
import Messages from "@/components/realtime/Messages";
import FloatingElements from "@/components/effects/FloatingElements";
import ParallaxBackground from "@/components/effects/ParallaxBackground";
import { useLocomotiveScroll } from "@/hooks/use-locomotive-scroll";

const Index = () => {
  const { containerRef, scroll } = useLocomotiveScroll();

  useEffect(() => {
    const onLoad = () => scroll?.update?.();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [scroll]);

  return (
    <>
      <FloatingElements />
      <ParallaxBackground />
      
      <div ref={containerRef} data-scroll-container className="relative z-10">
        <Hero />
        
        <main className="relative">
          {/* Section divider with animated line */}
          <motion.div 
            className="relative py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-3/4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <div className="relative flex justify-center">
              <motion.div 
                className="bg-background px-8 py-2 rounded-full border border-accent/30 glass-subtle"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <span className="text-accent font-semibold">✨ Interactive Experience ✨</span>
              </motion.div>
            </div>
          </motion.div>

          <Messages />
          
          {/* Another section divider */}
          <motion.div 
            className="relative py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-3/4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <div className="relative flex justify-center">
              <motion.div 
                className="bg-background px-8 py-2 rounded-full border border-primary/30 glass-subtle"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <span className="text-primary font-semibold">📸 Memory Gallery 📸</span>
              </motion.div>
            </div>
          </motion.div>

          <Gallery />
        </main>
        
        <motion.footer 
          className="px-6 py-16 text-center relative"
          data-scroll-section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Footer background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Crafted with shimmering gradients, smooth scrolling, and endless celebration vibes
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              <span>for an unforgettable Birthday Experience</span>
            </motion.div>
            
            <motion.div
              className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default Index;
