'use client'
import { useRef } from "react";
import { categories } from "@/assets/assets";
import { hoverScale, marquee, select, useGsap } from "@/lib/animations";

const CategoriesMarquee = () => {

    const rootRef = useRef(null)

    useGsap((el) => {
        const track = el.querySelector('[data-marquee-track]')
        const chips = select(el, '[data-marquee-item]')

        // GSAP-driven, perfectly seamless loop that eases to a stop on hover.
        const stopMarquee = marquee(track, { sets: 4, speed: 45 })
        const stopHover = hoverScale(chips, { scale: 1.06, y: -2, duration: 0.3 })

        return () => {
            stopMarquee && stopMarquee()
            stopHover && stopHover()
        }
    }, { scope: rootRef })

    return (
        <div ref={rootRef} className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group sm:my-20">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div data-marquee-track className="flex w-max">
                {[...categories, ...categories, ...categories, ...categories].map((company, index) => (
                    <button data-marquee-item key={index} className="mr-4 px-5 py-2 bg-slate-100 rounded-lg text-slate-500 text-xs sm:text-sm hover:bg-brand hover:text-white transition-colors duration-300">
                        {company}
                    </button>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;