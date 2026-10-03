'use client'

import { gsap, EASE, prefersReducedMotion } from './gsap'

const asArray = (value) =>
    Array.isArray(value) ? value : value ? [value] : []

/**
 * Product card hover micro-interactions:
 *   • image scales up slightly and lifts
 *   • title colour shifts to the brand colour
 *   • variant thumbnails gently (re)appear with a stagger
 *   • a subtle elevation is added to `shadowTarget`
 * Returns a cleanup function to call on unmount.
 */
export function productCardHover(card, {
    image,
    title,
    thumbnails = [],
    shadowTarget,
    brandColor = '#F7941D',
} = {}) {
    if (!card || prefersReducedMotion()) return

    const thumbs = asArray(thumbnails)
    const originalColor = title ? getComputedStyle(title).color : null

    let imageScaleTo
    let imageYTo
    if (image) {
        imageScaleTo = gsap.quickTo(image, 'scale', { duration: 0.4, ease: EASE.out })
        imageYTo = gsap.quickTo(image, 'y', { duration: 0.4, ease: EASE.out })
    }

    const onEnter = () => {
        if (image) {
            imageScaleTo(1.05)
            imageYTo(-6)
        }
        if (title) {
            gsap.to(title, { color: brandColor, duration: 0.3, ease: EASE.soft })
        }
        if (shadowTarget) {
            gsap.to(shadowTarget, {
                boxShadow: '0 16px 34px -18px rgba(15, 23, 42, 0.35)',
                duration: 0.4,
                ease: EASE.out,
            })
        }
        if (thumbs.length) {
            gsap.fromTo(
                thumbs,
                { y: 4, opacity: 0.45 },
                { y: 0, opacity: 1, duration: 0.35, stagger: 0.045, ease: EASE.out, overwrite: true }
            )
        }
    }

    const onLeave = () => {
        if (image) {
            imageScaleTo(1)
            imageYTo(0)
        }
        if (title && originalColor) {
            gsap.to(title, { color: originalColor, duration: 0.3, ease: EASE.soft })
        }
        if (shadowTarget) {
            gsap.to(shadowTarget, {
                boxShadow: '0 0 0 rgba(15, 23, 42, 0)',
                duration: 0.4,
                ease: EASE.out,
            })
        }
        if (thumbs.length) {
            gsap.to(thumbs, { y: 0, opacity: 1, duration: 0.3, ease: EASE.soft })
        }
    }

    card.addEventListener('pointerenter', onEnter)
    card.addEventListener('pointerleave', onLeave)

    return () => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
        gsap.killTweensOf([image, title, shadowTarget, ...thumbs].filter(Boolean))
    }
}

/** Generic "lift / grow" hover for cards, tiles and image wrappers. */
export function hoverScale(targets, {
    scale = 1.04,
    y = 0,
    x = 0,
    duration = 0.4,
    ease = EASE.out,
} = {}) {
    const els = asArray(targets)
    if (!els.length || prefersReducedMotion()) return

    const cleanups = els.map((el) => {
        const toScale = gsap.quickTo(el, 'scale', { duration, ease })
        const toY = gsap.quickTo(el, 'y', { duration, ease })
        const toX = gsap.quickTo(el, 'x', { duration, ease })

        const enter = () => {
            toScale(scale)
            if (y) toY(y)
            if (x) toX(x)
        }
        const leave = () => {
            toScale(1)
            if (y) toY(0)
            if (x) toX(0)
        }

        el.addEventListener('pointerenter', enter)
        el.addEventListener('pointerleave', leave)

        return () => {
            el.removeEventListener('pointerenter', enter)
            el.removeEventListener('pointerleave', leave)
            gsap.killTweensOf(el)
        }
    })

    return () => cleanups.forEach((fn) => fn())
}

/**
 * Polished button micro-interactions:
 * hover → scale up a touch, press → scale down, release → smooth return.
 */
export function buttonPress(targets, {
    hoverScale: hover = 1.03,
    pressScale: press = 0.96,
    duration = 0.25,
} = {}) {
    const els = asArray(targets)
    if (!els.length || prefersReducedMotion()) return

    const cleanups = els.map((el) => {
        const to = gsap.quickTo(el, 'scale', { duration, ease: EASE.soft })
        const enter = () => to(hover)
        const leave = () => to(1)
        const down = () => to(press)
        const up = () => to(hover)

        el.addEventListener('pointerenter', enter)
        el.addEventListener('pointerleave', leave)
        el.addEventListener('pointerdown', down)
        el.addEventListener('pointerup', up)

        return () => {
            el.removeEventListener('pointerenter', enter)
            el.removeEventListener('pointerleave', leave)
            el.removeEventListener('pointerdown', down)
            el.removeEventListener('pointerup', up)
            gsap.killTweensOf(el)
        }
    })

    return () => cleanups.forEach((fn) => fn())
}
