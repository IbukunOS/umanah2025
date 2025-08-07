
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Images, Trash2 } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
}

const Gallery = () => {
  const [items, setItems] = useState<MediaItem[]>([]);

  const onUpload = (files: FileList | null) => {
    if (!files) return;
    const next: MediaItem[] = [];
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith("video") ? "video" : "image";
      next.push({ id: `${Date.now()}-${file.name}`, url, type });
    });
    setItems((prev) => [...next, ...prev]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const gridCols = useMemo(() => {
    const count = items.length;
    if (count <= 2) return "grid-cols-1 sm:grid-cols-2";
    if (count <= 4) return "grid-cols-2 sm:grid-cols-3";
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
  }, [items.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section
      id="gallery"
      className="relative mx-auto max-w-7xl px-6 py-24"
      data-scroll-section
      aria-label="Gallery section"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="glass relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const,
                delay: 2
              }}
            />
          </div>

          <CardHeader className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <Images className="text-primary" size={32} />
              <CardTitle className="font-display text-4xl gradient-text">
                Party Gallery
              </CardTitle>
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: [0.42, 0, 0.58, 1] as const
                }}
              >
                📸
              </motion.div>
            </motion.div>
          </CardHeader>

          <CardContent className="relative z-10">
            <motion.div 
              className="mb-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
                id="media"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={(e) => onUpload(e.target.files)}
                className="hidden"
              />
              
              <motion.label 
                htmlFor="media"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold relative overflow-hidden group"
                >
                  <span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative flex items-center gap-2">
                      <Upload size={18} />
                      Upload Images/Videos
                    </span>
                  </span>
                </Button>
              </motion.label>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="secondary" 
                  onClick={() => setItems([])}
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <Trash2 size={16} className="mr-2" />
                  Clear All
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className={`grid gap-6 ${gridCols}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {items.length === 0 && (
                  <motion.div
                    key="empty"
                    className="col-span-full text-center py-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: [0.42, 0, 0.58, 1] as const
                      }}
                      className="text-8xl mb-6"
                    >
                      🎉
                    </motion.div>
                    <p className="text-muted-foreground text-xl">
                      Drop your first memory!
                    </p>
                    <motion.p 
                      className="text-sm text-muted-foreground/60 mt-2"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click "Upload Images/Videos" to get started
                    </motion.p>
                  </motion.div>
                )}
                
                {items.map((m) => (
                  <motion.figure
                    key={m.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="group relative overflow-hidden rounded-xl glass-subtle border border-white/10 hover:border-accent/50 transition-all duration-300"
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    {/* Remove button */}
                    <motion.button
                      className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={() => removeItem(m.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={14} className="text-white" />
                    </motion.button>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" />

                    {m.type === "image" ? (
                      <motion.img
                        src={m.url}
                        alt="Uploaded party memory"
                        loading="lazy"
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        layoutId={m.id}
                      />
                    ) : (
                      <motion.video
                        src={m.url}
                        className="h-64 w-full object-cover"
                        controls
                        preload="metadata"
                        layoutId={m.id}
                      />
                    )}

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] as const }}
                    />
                  </motion.figure>
                ))}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Gallery;
