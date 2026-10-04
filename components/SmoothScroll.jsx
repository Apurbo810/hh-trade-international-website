'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/animations'

// Site-wide smooth scrolling powered by Lenis.
// `root` attaches the instance to the window/document so no extra wrapper is rendered.
const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null)

    useEffect(() => {
        // Drive Lenis from the GSAP ticker instead of its own rAF loop so both
        // libraries share a single frame and never fight each other. This is the
        // pattern the Lenis docs recommend for GSAP projects.
        const update = (time) => {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        const lenis = lenisRef.current?.lenis

        // Keep ScrollTrigger in sync with Lenis so scroll reveals stay accurate.
        lenis?.on('scroll', ScrollTrigger.update)

        // Recalculate trigger positions once Lenis has taken over scrolling.
        const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)

        return () => {
            gsap.ticker.remove(update)
            gsap.ticker.lagSmoothing(500, 33)
            lenis?.off('scroll', ScrollTrigger.update)
            window.clearTimeout(id)
        }
    }, [])

    return (
        <ReactLenis
            root
            ref={lenisRef}
            autoRaf={false}
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                // Phones keep native momentum scrolling (best for touch) while
                // wheel/trackpad devices still get the smooth Lenis feel.
                smoothTouch: false,
                syncTouch: false,
                autoResize: true,
            }}
        >
            {children}
        </ReactLenis>
    )
}

export default SmoothScroll
