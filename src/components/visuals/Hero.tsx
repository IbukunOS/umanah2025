import heroImage from "@/assets/hero-birthday.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <header
      className="relative min-h-[90vh] w-full overflow-hidden"
      data-scroll-section
      aria-label="Birthday Hero Section"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxurious birthday celebration with balloons, confetti, and glowing gradients"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-[90vh] max-w-5xl flex-col items-start justify-center gap-6 px-6">
        <span
          className="inline-flex items-center rounded-full bg-secondary/80 px-4 py-1 text-xs font-semibold text-secondary-foreground backdrop-blur-sm animate-fade-in"
          data-scroll
          data-scroll-speed="1.2"
        >
          Visuals-heavy Birthday Experience
        </span>
        <h1
          className="font-display text-5xl leading-[1.1] tracking-tight sm:text-6xl md:text-7xl animate-enter"
          data-scroll
          data-scroll-speed="1.1"
        >
          Let's Celebrate In Color
        </h1>
        <p
          className="max-w-2xl text-lg text-muted-foreground animate-fade-in"
          data-scroll
          data-scroll-speed="1.05"
        >
          Smooth scrolling, shimmering gradients, live messages, and a stunning gallery. Drop your photos and videos, leave a wish, and enjoy the vibes.
        </p>
        <div className="mt-4 flex gap-4" data-scroll data-scroll-speed="1.0">
          <Button variant="hero" size="lg" className="px-8 py-6">
            Join the Celebration
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6">
            View Gallery
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
