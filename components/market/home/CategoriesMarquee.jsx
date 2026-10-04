'use client'

import { useRef } from 'react'
import {
    Sparkles,
    Baby,
    Droplets,
    Flower2,
    HeartPulse,
    Coffee,
    ShieldPlus,
    Grid2X2,
} from 'lucide-react'

import { categories } from '@/assets/assets'
import {
    gsap,
    hoverScale,
    select,
    useGsap,
} from '@/lib/animations'

const categoryIcons = {
    Skincare: Sparkles,
    'Baby Care': Baby,
    'Hair Care': Droplets,
    Fragrance: Flower2,
    'Face Care': HeartPulse,
    'Tea & Beverages': Coffee,
    Wellness: ShieldPlus,
    'All Products': Grid2X2,
}

const CategoriesMarquee = () => {
    const rootRef = useRef(null)

    useGsap(
        (el) => {
            const track = el.querySelector(
                '[data-marquee-track]'
            )

            const chips = select(
                el,
                '[data-marquee-item]'
            )

            if (!track) return

            // Make sure the track is wide enough
            const items = track.children

            if (!items.length) return

            // Calculate the width of one complete category set. Bail out if the
            // track has not been laid out yet (width 0 or NaN) so GSAP never
            // receives an invalid animation value.
            const setWidth = track.scrollWidth / 4

            if (!Number.isFinite(setWidth) || setWidth <= 0) return

            // Continuous left-to-right movement
            const tween = gsap.to(track, {
                x: -setWidth,
                duration: 25,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((value) => {
                        const x = parseFloat(value)

                        return x <= -setWidth
                            ? 0
                            : x
                    }),
                },
            })

            const stopHover = hoverScale(chips, {
                scale: 1.04,
                y: -2,
                duration: 0.3,
            })

            return () => {
                tween.kill()
                stopHover?.()
            }
        },
        {
            scope: rootRef,
        }
    )

    return (
        <section
            ref={rootRef}
            className="
                relative
                mx-auto
                my-12
                w-full
                max-w-7xl
                overflow-hidden
                select-none
                sm:my-16
            "
        >
            {/* Left fade */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    z-10
                    h-full
                    w-16
                    bg-gradient-to-r
                    from-white
                    to-transparent
                    sm:w-24
                "
            />

            {/* Moving track */}
            <div
                data-marquee-track
                className="flex w-max"
            >
                {[
                    ...categories,
                    ...categories,
                    ...categories,
                    ...categories,
                ].map((category, index) => {
                    const Icon =
                        categoryIcons[category] ||
                        Grid2X2

                    return (
                        <button
                            key={`${category}-${index}`}
                            data-marquee-item
                            type="button"
                            className="
                                mr-3
                                flex
                                shrink-0
                                items-center
                                gap-2
                                whitespace-nowrap
                                rounded-xl
                                border
                                border-slate-100
                                bg-slate-50
                                px-4
                                py-2.5
                                text-xs
                                text-slate-600
                                transition-colors
                                duration-300
                                hover:border-brand
                                hover:bg-brand
                                hover:text-white
                                sm:mr-4
                                sm:px-5
                                sm:py-3
                                sm:text-sm
                            "
                        >
                            <Icon
                                size={16}
                                strokeWidth={1.8}
                                className="shrink-0"
                            />

                            <span>
                                {category}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Right fade */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-0
                    top-0
                    z-10
                    h-full
                    w-16
                    bg-gradient-to-l
                    from-white
                    to-transparent
                    sm:w-24
                "
            />
        </section>
    )
}

export default CategoriesMarquee