import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

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

  useEffect(() => {
    if (listRef.current) {
      // placeholder for scroll-based UI reactions
    }
  }, [messages.length]);

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

  return (
    <section
      id="messages"
      className="relative mx-auto max-w-5xl px-6 py-16"
      data-scroll-section
      aria-label="Live messages section"
    >
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-display text-3xl">Live Wishes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-3 sm:grid-cols-[1fr]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                className="sm:max-w-[220px]"
              />
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a birthday wish…"
                aria-label="Write a birthday wish"
              />
            </div>
            <div>
              <Button variant="hero" onClick={send} className="px-6">
                Send Wish
              </Button>
            </div>
          </div>

          <div ref={listRef} className="grid gap-3">
            {messages.length === 0 && (
              <p className="text-muted-foreground">Be the first to send a live wish! ✨</p>
            )}
            {messages.map((m) => (
              <article
                key={m.id}
                className="rounded-md border bg-card/80 p-4 transition-colors"
                aria-label={`Message from ${m.name}`}
              >
                <div className="mb-1 text-sm text-muted-foreground">
                  {m.name} • {new Date(m.createdAt).toLocaleTimeString()}
                </div>
                <p className="text-base leading-relaxed">{m.text}</p>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Messages;
