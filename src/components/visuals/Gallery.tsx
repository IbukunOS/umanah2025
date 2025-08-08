
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
              <span className="text-2xl">📸</span>
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
                  variant="hero"
                  size="lg"
                >
                  <span>
                    <Upload size={18} />
                    Upload Images/Videos
                  </span>
                </Button>
              </motion.label>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="glass" 
                  onClick={() => setItems([])}
                >
                  <Trash2 size={16} />
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
                    <div className="text-8xl mb-6">🎉</div>
                    <p className="text-muted-foreground text-xl">
                      Drop your first memory!
                    </p>
                    <p className="text-sm text-muted-foreground/60 mt-2">
                      Click "Upload Images/Videos" to get started
                    </p>
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
