import { useRef, useState } from 'react';
import { gsap } from "gsap";
import { Power2 } from 'gsap/gsap-core';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { supabase } from '../../supabaseClient';

gsap.registerPlugin(ScrollTrigger);

function Wishes() {

    const container = useRef(null);
    const [name, setName] = useState('');
    const [wish, setWish] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('messages')
            .insert([{ name, message: wish }])

        if (error) {
            console.error('Error inserting wish: ', error)
        } else {
            console.log('Wish inserted: ', data)
            setName('');
            setWish('');
        }
    }

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".wishes",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });
        tl.to(".slide", {
            xPercent: -100,
            ease: Power2
        })
    }, container);


    return (
        <div
            data-color="salmon"
            ref={container}
            className="wishes section sm:w-full px-8 sm:px-8 mt-32"
        >
            <div
                className="cont h-[200vh] relative"
            >
                <div
                    className="slides w-full h-[130vh] overflow-hidden
             sticky top-0 left-0 flex"
                >
                    {/* 1st slide */}
                    <div
                        className="slide w-full flex sm:flex items-center 
                justify-center h-screen flex-shrink-0 "
                    >

                        <div
                            className="text1 font-[SansitaReg] text-[7vh] leading-[8vh]
                    sm:text-[15vh] sm:leading-[18vh]"
                        >
                            <h1 className="">
                                Birthday Wishes
                            </h1>
                        </div>
                    </div>
                    {/* 2nd slide */}
                    <div
                        className="slide w-full flex sm:flex items-center 
                justify-center h-screen flex-shrink-0 "
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 rounded-md" />
                            <textarea placeholder="Your Wish" value={wish} onChange={(e) => setWish(e.target.value)} className="p-2 rounded-md"></textarea>
                            <button type="submit" className="btn px-4 py-2 rounded-md hover-scale">Send Wish</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wishes;
