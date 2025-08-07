import { useEffect } from "react";
import Hero from "@/components/visuals/Hero";
import Gallery from "@/components/visuals/Gallery";
import Messages from "@/components/realtime/Messages";
import { useLocomotiveScroll } from "@/hooks/use-locomotive-scroll";

const Index = () => {
  const { containerRef, scroll } = useLocomotiveScroll();

  useEffect(() => {
    // refresh after images load to ensure proper positions
    const onLoad = () => scroll?.update?.();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [scroll]);

  return (
    <div ref={containerRef} data-scroll-container>
      <Hero />
      <main>
        <Messages />
        <Gallery />
      </main>
      <footer className="px-6 py-12 text-center text-sm text-muted-foreground" data-scroll-section>
        Crafted with shimmering gradients and smooth scrolling • © Birthday Experience
      </footer>
    </div>
  );
};

export default Index;
