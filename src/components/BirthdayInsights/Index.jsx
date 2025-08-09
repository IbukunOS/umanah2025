import img1 from '../../assets/images/Ejiro.png';
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BirthdayInsights() {
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
    <div data-color="white" className="para section w-full flex items-center justify-center px-8  ">
        <div className="text sm:w-[80%] flex flex-col items-center sm:items-start justify-between ">
            <div className='hidden w-[50%] sm:flex items-center justify-center mb-12'>
                <hr className='bg-zinc-400 w-[20%] h-[.3vh]' />
            </div>    
            <h3 className='textpara sm:w-[50%] text-blue-600 font-[Sansita] tracking-wide text-[2.4vh] sm:text-[3.5vh] font-medium text-center leading-[5vh] mb-10'>To the woman who stepped up when no one else did, thank you for being both our mum and dad.  
They say a mother's love is powerful, but a mother who fathers is unstoppable. You carried the weight of two roles, yet never let us feel the lack of one.

Well, it's your birthday, Mum...  
And also, your official retirement. I know you always tell us how proud you are, but I am the proud one here.  
Thank you for being the best. I literally don't even have a best friend because my mum is always there for me.  
Words are not enough to express how grateful I am.  
Thank you, Mumsy.</h3>
            <div className="pers w-[50%] flex flex-col items-center justify-center gap-2 ">
                <div className="image w-24 h-24 overflow-hidden rounded-full ">
                    <img src={img1} />
                </div>
                <h1 className=' text-[2.8vh] sm:text-[3.8vh] font-medium'>Onakorame E. Esther</h1>
                <h3 className='text-zinc-500 text-[2.4vh] whitespace-nowrap'>Celebrant Pikin</h3>
            </div>
        </div>  
    </div>
  )
}

export default BirthdayInsights
