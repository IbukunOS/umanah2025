import img1 from '../../assets/images/eno.png'
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



function BirthdayTestimonies() {
    useEffect(() => {
        var clutter = "";
        const para = document.querySelector(".textpara2")
        const characters = para.textContent.split("")
        characters.forEach(function(e) {
           
            clutter += `<span>${e}</span>`
        })
        para.innerHTML = clutter;   
        gsap.set(".textpara2 span", {opacity: .1})
        gsap.to(".textpara2 span", {
            scrollTrigger: {
                trigger: ".para2",
                start: "top 60%",
                end: "bottom 90%",
                scrub: 1,
            },
            opacity: 1, 
            stagger: .03,   
        })
    },[]);
  return (
    <div data-color="white" className="para2 section w-full flex items-center mt-32 px-8
    justify-center -translate-y-1/5 ">
        <div className="text sm:w-[80%] flex flex-col items-center sm:items-end justify-center ">
            <div className='hidden w-[40%] sm:flex items-center justify-center mb-12'>
                <hr className='bg-zinc-400 w-[20%] h-[.3vh]' />
            </div>    
            <h3 className='textpara2 sm:w-[70%] text-purple-600 font-[Sansita] text-[2.4vh] sm:text-[3.5vh] font-medium text-center tracking-wide leading-[5vh] mb-10'>Today we celebrate an extraordinary milestone for an extraordinary woman — my mom. Not only is she turning 60 today, but she’s also stepping into a well-earned retirement after a lifetime of impact, service, and love.

She has always been more than just a mother to me and to many others. She is a woman of God, a leader, a guardian, a mentor, and a true friend. When she sees a problem, she never looks away. She does her best to solve it, and even if she can’t fix it all, she makes sure you never face it alone.

After my dad passed away, she carried the roles of both mother and father without complaint, showing strength and grace beyond measure. Even though I’m an only child, I never felt alone — a true testament to her love and the home she created.

Her kindness is magnetic, her intentions pure, and people are naturally drawn to her because they know she is genuine.

Happy 60th birthday and congratulations on your retirement, Mom. You’ve lived this chapter with courage and compassion, and I can’t wait to see what this next one holds for you.</h3>
            <div className="pers w-[40%] flex flex-col items-center justify-center gap-2">
                <div className="image w-24 h-24 overflow-hidden rounded-full ">
                    <img src={img1} />
                </div>
                <h1 className='text-[2.8vh] sm:text-[3.8vh] font-medium'>Umanah Eno Abasi</h1>
                <h3 className='text-zinc-500 text-[2.4vh] whitespace-nowrap'>Another Celebrant Pikin</h3>
            </div>
        </div>  
    </div>
  )
}

export default BirthdayTestimonies
