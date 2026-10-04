'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let pluginsRegistered = false

// Register plugins exactly once, and only in the browser so this module stays
// safe to evaluate during SSR.
if (typeof window !== 'undefined' && !pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger)

    // Mobile browsers fire a `resize` event every time the address bar shows or
    // hides while scrolling. Without this, ScrollTrigger recalculates every
    // trigger on each of those events, which fights Lenis and produces heavy
    // jank / repeated refreshes on phones.
    ScrollTrigger.config({ ignoreMobileResize: true })

    pluginsRegistered = true
}

// Recalculate all trigger positions once fonts/images have finished loading so
// reveals land exactly where they should. Deferred to the next tick so we never
// refresh synchronously while React is still mounting the tree.
if (typeof window !== 'undefined') {
    const refresh = () => {
        if (ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
            ScrollTrigger.refresh()
        }
    }

    if (document.readyState === 'complete') {
        window.setTimeout(refresh, 0)
    } else {
        window.addEventListener('load', () => window.setTimeout(refresh, 0), {
            once: true,
        })
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
