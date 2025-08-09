import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Wishes() {
  useEffect(() => {
    // Simple fade-in on scroll to keep animations consistent
    gsap.fromTo(
      '.wishes-section .wish-card',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.wishes-section',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section data-color="white" className="wishes-section section w-full px-8 py-16">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="font-[SansitaReg] text-[5vh] leading-tight">Birthday Wishes</h2>
          <p className="font-[Sansita] text-zinc-600">Messages from friends and family</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Wishing you all the happiness on your special day! 🎉',
            'May your year be filled with joy and surprises! 🎂',
            'Another trip around the sun—shine bright! ✨',
          ].map((msg, i) => (
            <article key={i} className="wish-card rounded-xl border border-zinc-200 bg-white/70 backdrop-blur p-5 shadow-sm">
              <p className="font-[Sansita] text-[2.2vh] leading-relaxed text-zinc-800">{msg}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Wishes;
