'use client'

import { ReactLenis } from 'lenis/react'

// Site-wide smooth scrolling powered by Lenis.
// `root` attaches the instance to the window/document so no extra wrapper is rendered.
const SmoothScroll = ({ children }) => {
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
