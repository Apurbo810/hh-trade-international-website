'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let pluginsRegistered = false

// Register plugins exactly once, and only in the browser so this module stays
// safe to evaluate during SSR.
if (typeof window !== 'undefined' && !pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger)
    pluginsRegistered = true
}

// Recalculate all trigger positions once fonts/images have finished loading so
// reveals land exactly where they should.
if (typeof window !== 'undefined') {
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') {
        refresh()
    } else {
        window.addEventListener('load', refresh, { once: true })
    }
}

/** Shared easing tokens so every component speaks the same motion language. */
export const EASE = {
    out: 'power3.out',
    soft: 'power2.out',
    inOut: 'power2.inOut',
    expo: 'expo.out',
}

/** Shared duration tokens (seconds). */
export const DUR = {
    fast: 0.35,
    base: 0.6,
    slow: 0.9,
}

/**
 * True when the visitor has asked the OS to reduce motion. Every animation
 * helper checks this and becomes a no-op so content simply appears in place.
 */
export const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scoped element query — keeps a component's selectors inside its own DOM. */
export const select = (scope, selector) =>
    scope ? Array.from(scope.querySelectorAll(selector)) : []

export { gsap, ScrollTrigger }
