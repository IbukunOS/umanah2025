import './App.css'
import Capsule from './components/Capsule/Index'

import { useEffect, useRef, useState } from 'react';
import Home from './components/Home/Index'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BirthdayInsights from './components/BirthdayInsights/Index'
import BirthdayTestimonies from './components/BirthdayTestimonies/Index'
import Wishes from './components/Wishes/Index'
import LocomotiveScroll from 'locomotive-scroll';
import ScrollToTop from './components/ScrollToTop/Index';
import Gallery from './components/Gallery/Index';

function App() {
  const scrollRef = useRef(null);
  const [page, setPage] = useState('home');

  useEffect(() => {
    if (scrollRef.current) {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true, 
      });

      return () => {
        scroll.destroy();
      };
    }
  }, [page]);

  useEffect(() => {
    const list = document.querySelectorAll('.section')
    list.forEach(function(e) {
      ScrollTrigger.create({
        trigger: e,
        start: "top 90%",
        end: "bottom 90%",
        onEnter: function(){
          document.body.setAttribute("theme", e.dataset.color);
        },
        onEnterBack: function() {
          document.body.setAttribute("theme", e.dataset.color);
        }
      })
    })
  })
      
  const handleGalleryClick = () => setPage('gallery');
  const handleBackClick = () => setPage('home');

  if (page === 'gallery') {
    return <Gallery onBack={handleBackClick} />
  }

  return (
    
    <div className='section main w-full '>
      <Home onGalleryClick={handleGalleryClick} />
      <Wishes />
      <BirthdayInsights  />
      <BirthdayTestimonies />
      <Capsule />
      <ScrollToTop />
    </div>    
  )
}

export default App
