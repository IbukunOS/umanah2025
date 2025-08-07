
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Send, Heart, MessageCircle } from "lucide-react";

type LiveMessage = {
  id: string;
  name: string;
  text: string;
  createdAt: number;
};

const Messages = () => {
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [name, setName] = useState<string>(
    () => localStorage.getItem("bday_name") || "Guest"
  );
  const [text, setText] = useState<string>("");
  const listRef = useRef<HTMLDivElement>(null);
  const bc = useMemo(() => new BroadcastChannel("birthday-room"), []);

  useEffect(() => {
    const onMsg = (event: MessageEvent) => {
      const msg = event.data as LiveMessage;
      if (!msg || !msg.id) return;
      setMessages((prev) => [msg, ...prev].slice(0, 200));
    };
    bc.addEventListener("message", onMsg);
    return () => {
      bc.removeEventListener("message", onMsg);
      bc.close();
    };
  }, [bc]);

  const send = () => {
    if (!text.trim()) {
      toast("Please write a message first.");
      return;
    }
    const msg: LiveMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim() || "Guest",
      text: text.trim(),
      createdAt: Date.now(),
    };

    bc.postMessage(msg);
    localStorage.setItem("bday_name", msg.name);
    setText("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as const
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section
      id="messages"
      className="relative mx-auto max-w-6xl px-6 py-24"
      data-scroll-section
      aria-label="Live messages section"
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
              className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.42, 0, 0.58, 1] as const,
                delay: 1
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
              <MessageCircle className="text-accent" size={32} />
              <CardTitle className="font-display text-4xl gradient-text">
                Live Wishes
              </CardTitle>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: [0, 0, 1, 1] as const }}
              >
                ✨
              </motion.div>
            </motion.div>
          </CardHeader>

          <CardContent className="relative z-10">
            <motion.div 
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className="glass-subtle border-white/20 text-white placeholder:text-white/60 focus:border-accent transition-all duration-300"
                />
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write a birthday wish…"
                  aria-label="Write a birthday wish"
                  className="glass-subtle border-white/20 text-white placeholder:text-white/60 focus:border-accent transition-all duration-300 min-h-[100px]"
                />
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={send} 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold py-3 px-6 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <Send size={18} />
                    Send Wish
                    <Heart size={18} />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              ref={listRef} 
              className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {messages.length === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: [0.42, 0, 0.58, 1] as const
                      }}
                      className="text-6xl mb-4"
                    >
                      ✨
                    </motion.div>
                    <p className="text-muted-foreground text-lg">
                      Be the first to send a live wish!
                    </p>
                  </motion.div>
                )}
                
                {messages.map((m, index) => (
                  <motion.article
                    key={m.id}
                    layout
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="glass-subtle rounded-lg p-6 border border-white/10 relative overflow-hidden group hover:border-accent/50 transition-all duration-300"
                    aria-label={`Message from ${m.name}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    {/* Message glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    
                    <div className="relative z-10">
                      <div className="mb-3 flex items-center justify-between">
                        <motion.span 
                          className="font-semibold text-accent flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          {m.name}
                        </motion.span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(m.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <motion.p 
                        className="text-white leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {m.text}
                      </motion.p>
                    </div>

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 -top-px overflow-hidden rounded-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] as const }}
                      />
                    </motion.div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Messages;
