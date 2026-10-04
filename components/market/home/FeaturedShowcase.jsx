'use client'

import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import {
    buttonPress,
    EASE,
    gsap,
    select,
    useGsap,
} from '@/lib/animations'

const FeaturedShowcase = () => {
    const currency =
        process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const rootRef = useGsap((el) => {
        const badge = select(el, '[data-showcase="badge"]')
        const heading = select(el, '[data-showcase="heading"]')
        const price = select(el, '[data-showcase="price"]')
        const cta = select(el, '[data-showcase="cta"]')
        const image = select(el, '[data-showcase="image"]')
        const promos = select(el, '[data-showcase="promo"]')

        const tl = gsap.timeline({
            defaults: {
                ease: EASE.out,
                duration: 0.7,
            },
        })

        tl.from(badge, {
            y: 14,
            opacity: 0,
            duration: 0.5,
        })
            .from(
                heading,
                {
                    y: 26,
                    opacity: 0,
                },
                '-=0.32'
            )
            .from(
                price,
                {
                    y: 18,
                    opacity: 0,
                },
                '-=0.42'
            )
            .from(
                cta,
                {
                    y: 14,
                    opacity: 0,
                },
                '-=0.45'
            )
            .from(
                image,
                {
                    y: 28,
                    opacity: 0,
                    scale: 0.97,
                    duration: 0.9,
                },
                '-=0.7'
            )
            .from(
                promos,
                {
                    y: 26,
                    opacity: 0,
                    stagger: 0.12,
                },
                '-=0.62'
            )

        // Subtle floating effect for the main product image
        gsap.to(image, {
            y: -10,
            duration: 2.6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.7,
        })

        const stopButton = buttonPress(cta, {
            hoverScale: 1.03,
            pressScale: 0.96,
        })

        return () => {
            stopButton?.()
        }
    })

    return (
        <section
            ref={rootRef}
            className="mx-6"
        >
            <div className="mx-auto my-10 flex max-w-7xl flex-col gap-8 xl:flex-row">

                {/* Main Showcase */}
                <div
                    className="
                        group
                        relative
                        flex
                        min-h-[420px]
                        flex-1
                        flex-col
                        overflow-hidden
                        rounded-3xl
                        bg-brand-light
                    "
                >
                    <div className="relative z-10 p-5 sm:p-16">

                        {/* Announcement */}
                        <div
                            data-showcase="badge"
                            className="
                                inline-flex
                                items-center
                                gap-3
                                rounded-full
                                bg-white
                                p-1
                                pr-4
                                text-xs
                                text-brand-dark
                                sm:text-sm
                            "
                        >
                            <span className="rounded-full bg-brand px-3 py-1 text-xs text-white max-sm:ml-1">
                                NEWS
                            </span>

                            Free Shipping on Orders Above $50!

                            <ChevronRightIcon
                                className="transition-all group-hover:ml-2"
                                size={16}
                            />
                        </div>

                        {/* Heading */}
                        <h1
                            data-showcase="heading"
                            className="
                                my-3
                                max-w-md
                                bg-gradient-to-r
                                from-slate-700
                                to-brand
                                bg-clip-text
                                text-3xl
                                font-medium
                                leading-[1.2]
                                text-transparent
                                sm:text-5xl
                            "
                        >
                            Everything you need.
                            <br />
                            Prices you'll love.
                        </h1>

                        {/* Price */}
                        <div
                            data-showcase="price"
                            className="mt-4 text-sm font-medium text-slate-800 sm:mt-8"
                        >
                            <p>Starts from</p>

                            <p className="text-3xl">
                                {currency}4.90
                            </p>
                        </div>

                        {/* CTA */}
                        <button
                            data-showcase="cta"
                            type="button"
                            className="
                                mt-4
                                rounded-md
                                bg-brand
                                px-7
                                py-2.5
                                text-sm
                                text-white
                                transition-colors
                                hover:bg-brand-dark
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-brand/50
                                focus-visible:ring-offset-2
                                sm:mt-10
                                sm:px-12
                                sm:py-5
                            "
                        >
                            EXPLORE PRODUCTS
                        </button>
                    </div>

                    {/* Main Product Image */}
                    <Image
                        data-showcase="image"
                        className="
                            relative
                            z-0
                            mt-auto
                            w-full
                            object-contain
                            sm:absolute
                            sm:bottom-0
                            sm:right-0
                            sm:max-w-sm
                            md:right-10
                        "
                        src={assets.hero_model_img}
                        alt=""
                        priority
                    />
                </div>

                {/* Promotional Cards */}
                <div
                    className="
                        flex
                        w-full
                        flex-col
                        gap-5
                        text-sm
                        text-slate-600
                        md:flex-row
                        xl:max-w-sm
                        xl:flex-col
                    "
                >
                    {/* Best Products */}
                    <div
                        data-showcase="promo"
                        className="
                            group
                            flex
                            flex-1
                            w-full
                            items-center
                            justify-between
                            rounded-3xl
                            bg-brand-soft
                            p-6
                            px-8
                        "
                    >
                        <div>
                            <p
                                className="
                                    max-w-40
                                    bg-gradient-to-r
                                    from-slate-800
                                    to-brand
                                    bg-clip-text
                                    text-3xl
                                    font-medium
                                    text-transparent
                                "
                            >
                                Best products
                            </p>

                            <p className="mt-4 flex items-center gap-1">
                                View more

                                <ArrowRightIcon
                                    className="transition-all group-hover:ml-2"
                                    size={18}
                                />
                            </p>
                        </div>

                        <Image
                            className="w-35 object-contain transition-transform duration-500 group-hover:scale-105"
                            src={assets.hero_product_img1}
                            alt=""
                        />
                    </div>

                    {/* Discount */}
                    <div
                        data-showcase="promo"
                        className="
                            group
                            flex
                            flex-1
                            w-full
                            items-center
                            justify-between
                            rounded-3xl
                            bg-brand-light
                            p-6
                            px-8
                        "
                    >
                        <div>
                            <p
                                className="
                                    max-w-40
                                    bg-gradient-to-r
                                    from-slate-800
                                    to-brand
                                    bg-clip-text
                                    text-3xl
                                    font-medium
                                    text-transparent
                                "
                            >
                                20% discounts
                            </p>

                            <p className="mt-4 flex items-center gap-1">
                                View more

                                <ArrowRightIcon
                                    className="transition-all group-hover:ml-2"
                                    size={18}
                                />
                            </p>
                        </div>

                        <Image
                            className="w-35 object-contain transition-transform duration-500 group-hover:scale-105"
                            src={assets.hero_product_img2}
                            alt=""
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default FeaturedShowcase