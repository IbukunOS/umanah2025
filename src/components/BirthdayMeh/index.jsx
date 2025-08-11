import img1 from '../../assets/images/nonso.png';
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BirthdayMeh() {
    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".textpara")
        const characters = para.textContent.split("")
        characters.forEach(function(e) {
            
            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;   
        gsap.set(".textpara span", {opacity: .1})
        gsap.to(".textpara span", {
            scrollTrigger: {
                trigger: ".para",
                start: "top 70%",
                end: "bottom 90%",
                scrub: 1,
            },
            opacity: 1, 
            stagger: .03,
            
        })
    },[]);

    

  return (
    <div data-color="white" className="para section w-full flex items-center justify-center px-8 py-40 ">
        <div className="text sm:w-[80%] flex flex-col items-center sm:items-start justify-between ">
            <div className='hidden w-[50%] sm:flex items-center justify-center mb-12'>
                <hr className='bg-zinc-400 w-[40%] h-[.3vh]' />
            </div>    
            <h3 className='textpara sm:w-[70%] text-blue-600 font-[Sansita] tracking-wide text-[2.4vh] sm:text-[3.5vh] font-medium text-center leading-[5vh] mb-10'>
                I want to sincerely express how deeply grateful I am for everything Aunty Linda has done for me. When I was abroad, I went through a difficult time and couldn’t get into school, but she stepped in, found a way, and made it possible for me to continue my education in Nigeria.
                She didn’t just help me with school — she generously welcomed me into her home and provided for all my needs, giving me a safe place to stay and food to eat. She treated me like her own.
                I know I wasn’t always easy to live with, and I caused some trouble along the way. But even then, she remained patient, kind, and continued to show me love and care.
                Thank you so much, Mum. I truly appreciate you from the bottom of my heart.
            </h3>
            <div className="pers w-[50%] flex flex-col items-center justify-center gap-2 ">
                <div className="image w-24 h-24 overflow-hidden rounded-full ">
                    <img src={img1} />
                </div>
                <h1 className=' text-[2.8vh] sm:text-[3.8vh] font-medium'>Nonso</h1>
                <h3 className='text-zinc-500 text-[2.4vh] whitespace-nowrap'>Celebrant Pikin again</h3>
            </div>
        </div>  
    </div>
    
  )
}

export default BirthdayMeh
