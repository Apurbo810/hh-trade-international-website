'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { ScrollTrigger } from '@/lib/animations'

// Site-wide smooth scrolling powered by Lenis.
// `root` attaches the instance to the window/document so no extra wrapper is rendered.
const SmoothScroll = ({ children }) => {

    // Keep ScrollTrigger in sync with Lenis so scroll reveals stay accurate.
    useLenis(() => {
        ScrollTrigger.update()
    })

    useEffect(() => {
        // Recalculate trigger positions once Lenis has taken over scrolling.
        const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
        return () => window.clearTimeout(id)
    }, [])

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            }}
        >
            {children}
        </ReactLenis>
    )
}

export default SmoothScroll
