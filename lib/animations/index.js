'use client'

// Central entry point for the site's motion system.
// Components import from here instead of talking to GSAP directly.

export { gsap, ScrollTrigger, EASE, DUR, prefersReducedMotion, select } from './gsap'
export { useGsap } from './useGsap'
export {
    revealOnScroll,
    staggerReveal,
    revealCards,
    revealText,
    revealImage,
    revealScale,
} from './reveal'
export { productCardHover, hoverScale, buttonPress } from './hover'
export { marquee } from './loop'
