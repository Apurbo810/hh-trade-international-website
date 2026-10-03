'use client'

import { gsap, prefersReducedMotion } from './gsap'

/**
 * Seamless, continuous marquee.
 *
 * `track` must contain its items repeated an even number of times (`sets`) and
 * each item must carry its own right margin (instead of a container `gap`) so
 * every set is exactly the same width. The loop then moves exactly one set per
 * pass via a relative `xPercent`, so it never snaps or jumps.
 */
export function marquee(track, {
    sets = 4,
    speed = 45, // pixels per second
    pauseOnHover = true,
} = {}) {
    if (!track || prefersReducedMotion()) return

    const setWidth = track.scrollWidth / sets
    if (!setWidth) return

    const duration = setWidth / speed

    const tween = gsap.to(track, {
        xPercent: -100 / sets,
        duration,
        ease: 'none',
        repeat: -1,
        // Recompute each loop so a late font/width load can't create a seam.
        repeatRefresh: true,
    })

    const container = track.parentElement
    let onEnter
    let onLeave
    if (pauseOnHover && container) {
        onEnter = () => gsap.to(tween, { timeScale: 0, duration: 0.4, ease: 'power2.out' })
        onLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.4, ease: 'power2.out' })
        container.addEventListener('pointerenter', onEnter)
        container.addEventListener('pointerleave', onLeave)
    }

    return () => {
        tween.kill()
        if (container && onEnter) {
            container.removeEventListener('pointerenter', onEnter)
            container.removeEventListener('pointerleave', onLeave)
        }
    }
}
