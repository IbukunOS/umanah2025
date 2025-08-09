import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import celeb from "../../assets/images/celeb.png";
import Button from "../Button";

gsap.registerPlugin(ScrollTrigger);

const bioSections = [
  {
    title: "Early Life",
    content: `Mrs. Umanah Linda Okheloaga (née Isewede), fondly known as Aunty Linda, was born on August 11, 1965, at the General Hospital, Zaria, in Kano State. She is the daughter of Chief Edmond Alfegha Isewede and Mrs. Magret Molamo Isewede.`,
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    accent: "border-amber-400"
  },
  {
    title: "Academic Pursuit", 
    content: `She began her education at Okugbe Primary School, Uromi, from 1973 to 1978. She later attended the Anglican Women Teachers' College, Benin City, in 1981, where she obtained her Grade Two Certificate in 1985.

She proceeded to the National Teachers' Institute, Kaduna, where she earned the Nigeria Certificate in Education (Primary) in English Language.

In 2005, she obtained a Bachelor of Education in Guidance and Counseling from Adekunle Ajasin University, Akungba-Akoko, Ondo State.`,
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    accent: "border-blue-400"
  },
  {
    title: "Professional Career",
    content: `Mrs. Umanah began her professional journey with the Lagos State Government on September 27, 1990, as a classroom teacher at Badia, then under the Mainland Local Government Area.

From 1990 to 1992, she served there before being transferred to Obele-Odan Primary School (1992–1994). She also taught at Adisa Bashua Primary School for one year.

She was later moved to the Somolu Local Government Education Authority as a Promotion Officer. During the harmonisation of teachers' salaries by the State Primary Education Board, Maryland, she was selected to serve by Mrs. B.O. Ajayi—an appointment based on her hard work, diligence, and commitment to duty.

She was appointed Head of Section (Human Resource Management) on August 15, 2017, and resumed duties at Lagos Mainland LGEA. On May 15, 2020, she was deployed to the Ajeromi-Ifelodun Local Government Education Authority.`,
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    accent: "border-green-400"
  },
  {
    title: "Awards & Recognition",
    content: `• Best Senior Staff (2017) – SAMAC

• Award of Excellence (2018) – Presented by Mrs. A.M. Okubanjoh

• Lagos Mainland Parents' Award of Excellence (2019)

• Appreciation Award (2016) – For support in record keeping

• Leadership Award – Surulere Local Government Education Authority, for outstanding achievement and contributions to education

• Award of Recognition (1994) – State Primary Education Board, Maryland, for participation in the Teachers' Salary Harmonisation

• Long Service Award (2024) – Lagos State Universal Basic Education Board`,
    bg: "bg-gradient-to-br from-purple-50 to-pink-50",
    accent: "border-purple-400"
  },
  {
    title: "Family & Personal Life",
    content: `She is happily married to Rev. Friday George Umanah, and their union is blessed with a son, Mr Eno-Abasi Emmanuel Umanah, an undergraduate of McPherson University.

Her hobbies include reading, working, cooking, supporting the needy, and regular visits to the Correctional Centre for Boys, Oregun, Ikeja, under the Four Square Gospel Church, Surulere District Headquarters.`,
    bg: "bg-gradient-to-br from-rose-50 to-pink-50",
    accent: "border-rose-400"
  },
];

function BioPage() {
  const containerRef = useRef(null);
  const refreshPage = () => {
        window.location.reload(true); // `false` reloads from cache, `true` forces a full server fetch
      };

  useEffect(() => {
    // Always scroll to top when this page loads
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Hero section animations (stronger, more visible)
    gsap.timeline()
      .fromTo(
        ".hero-img",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(
        ".hero-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".hero-quote",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

    // Parallax effect for hero image (gentler)
    gsap.to(".hero-img", {
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Section fade-in (no excessive y, always full opacity)
    gsap.utils.toArray(".bio-section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Section border accent
      const border = section.querySelector(".section-border");
      if (border) {
        gsap.fromTo(
          border,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Section title
      const title = section.querySelector(".section-title");
      if (title) {
        gsap.fromTo(
          title,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Section content
      const content = section.querySelector(".section-content");
      if (content) {
        gsap.fromTo(
          content,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Cleanup GSAP triggers on unmount to prevent animation conflicts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="hero-section flex flex-col items-center justify-center py-24 px-6 bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 relative overflow-hidden">
        {/* Back Button - top left */}
        <div className="absolute top-6 left-6 z-20">
          <div onClick={refreshPage} style={{ cursor: 'pointer' }}>
            <Button bgColor="bg-[#f5f19c]" text="BACK" />
          </div>
        </div>
        {/* Background decoration */}}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-300 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center">
          {/* Profile Image */}
          <div className="hero-img w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
            <div>
              <img src={celeb} alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          
          <h1 className="hero-title text-5xl sm:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Celebrant</span>
          </h1>
          
          <div className="hero-quote max-w-2xl mx-auto">
            <p className="text-xl text-gray-700 italic font-medium mb-2">
              "A lifetime of dedication, service, and excellence in education."
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Bio Sections */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {bioSections.map((section, index) => (
          <section
            key={index}
            className={`bio-section mb-16 last:mb-0 ${section.bg} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden`}
          >
            {/* Section border accent */}
            <div className={`section-border absolute top-0 left-0 w-full h-1 ${section.accent.replace('border-', 'bg-')} rounded-t-2xl`}></div>
            
            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/30 rounded-full blur-lg"></div>
            
            <div className="relative z-10">
              <h2 className="section-title text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <div className={`w-2 h-8 ${section.accent.replace('border-', 'bg-')} rounded-full mr-4`}></div>
                {section.title}
              </h2>
              
              <div className="section-content text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                {section.content}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer Quote */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-gray-100 text-center">
        <div className="max-w-2xl mx-auto">
          <blockquote className="text-2xl italic text-gray-700 mb-4">
            "Excellence in education is not a destination, but a continuous journey of dedication and service."
          </blockquote>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
        </div>
      </section>
    </div>
  );
}

export default BioPage;