'use client'

import { gsap, EASE, DUR, prefersReducedMotion } from './gsap'

const toElements = (targets) => {
    if (!targets) return []
    if (typeof Element !== 'undefined' && targets instanceof Element) return [targets]
    return gsap.utils.toArray(targets)
}

const buildTrigger = (trigger, start, once) =>
    trigger ? { trigger, start, once } : undefined

/**
 * Core fade + slide reveal, optionally driven by a ScrollTrigger.
 * Returns the created tween (or undefined when motion is reduced / no targets).
 */
export function revealOnScroll(targets, options = {}) {
    const els = toElements(targets)
    if (!els.length || prefersReducedMotion()) return

    const {
        y = 30,
        x = 0,
        opacity = 0,
        scale = 1,
        duration = DUR.base,
        delay = 0,
        stagger = 0,
        ease = EASE.out,
        trigger,
        start = 'top 85%',
        once = true,
    } = options

    return gsap.from(els, {
        y,
        x,
        opacity,
        scale,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: buildTrigger(trigger, start, once),
    })
}

/** Staggered reveal for a group of elements (cards, list items, …). */
export function staggerReveal(targets, options = {}) {
    const { stagger = 0.08, ...rest } = options
    return revealOnScroll(targets, { stagger, ...rest })
}

/** Preset: product cards entering a section. */
export function revealCards(targets, options = {}) {
    const { y = 40, stagger = 0.08, duration = DUR.base, ...rest } = options
    return staggerReveal(targets, { y, stagger, duration, ...rest })
}

/** Preset: headings / text blocks (smaller travel, slightly snappier). */
export function revealText(targets, options = {}) {
    const { y = 24, stagger = 0.07, duration = 0.7, ...rest } = options
    return staggerReveal(targets, { y, stagger, duration, ...rest })
}

/** Preset: images (fade + subtle scale-in). */
export function revealImage(targets, options = {}) {
    const { y = 24, scale = 0.96, opacity = 0, duration = 0.8, ...rest } = options
    return revealOnScroll(targets, { y, scale, opacity, duration, ...rest })
}

/** Preset: generic scale-in block. */
export function revealScale(targets, options = {}) {
    const { y = 0, scale = 0.94, opacity = 0, duration = 0.7, ...rest } = options
    return revealOnScroll(targets, { y, scale, opacity, duration, ...rest })
}
