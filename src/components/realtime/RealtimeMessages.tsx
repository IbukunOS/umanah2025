import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Send, Heart, MessageCircle } from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const RealtimeMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState<string>(
    () => localStorage.getItem("bday_name") || ""
  );
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data || []);
    };

    loadMessages();
  }, []);

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [newMessage, ...prev.slice(0, 49)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!text.trim() || !name.trim()) {
      toast.error("Please fill in both name and message");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          name: name.trim(),
          message: text.trim()
        });

      if (error) throw error;

      localStorage.setItem("bday_name", name.trim());
      setText("");
      toast.success("Message sent!");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <section
      id="messages"
      className="relative mx-auto max-w-6xl px-6 py-24"
      data-scroll-section
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="glass relative overflow-hidden">
          <CardHeader className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <MessageCircle className="text-accent" size={32} />
              <CardTitle className="font-display text-4xl gradient-text">
                Live Wishes
              </CardTitle>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
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
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="glass-subtle border-white/20 text-white placeholder:text-white/60 focus:border-accent"
                />
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write a birthday wish…"
                  className="glass-subtle border-white/20 text-white placeholder:text-white/60 focus:border-accent min-h-[100px]"
                />
              </div>
              
              <Button 
                onClick={sendMessage}
                disabled={isLoading}
                variant="hero" 
                size="lg"
                className="w-full"
              >
                <Send size={18} />
                {isLoading ? "Sending..." : "Send Wish"}
                <Heart size={18} />
              </Button>
            </motion.div>

            <motion.div 
              ref={messagesRef}
              className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent"
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
                        y: [0, -8, 0],
                        rotate: [0, 3, -3, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
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
                
                {messages.map((msg) => (
                  <motion.article
                    key={msg.id}
                    layout
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="glass-subtle rounded-lg p-6 border border-white/10 relative overflow-hidden group hover:border-accent/30 transition-all duration-300"
                    whileHover={{ scale: 1.01, y: -2 }}
                  >
                    <div className="relative z-10">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-semibold text-accent flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          {msg.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-white leading-relaxed">
                        {msg.message}
                      </p>
                    </div>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
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

export default RealtimeMessages;