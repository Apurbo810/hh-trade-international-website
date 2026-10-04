'use client'

import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'

import Title from '../share/Title'
import ProductCard from '../share/ProductCard'

import {
    gsap,
    useGsap,
    buttonPress,
} from '@/lib/animations'

const LatestProducts = () => {
    const displayQuantity = 8

    const products = useSelector((state) => state.product.list)

    const sliderRef = useRef(null)
    const rootRef = useRef(null)

    const productList = Array.isArray(products)
        ? products
        : []

    const toTime = (value) => {
        const time = new Date(value).getTime()
        return Number.isFinite(time) ? time : 0
    }

    const latestProducts = productList
        .slice()
        .sort(
            (a, b) =>
                toTime(b?.createdAt) -
                toTime(a?.createdAt)
        )
        .slice(0, displayQuantity)

    useGsap(
        (el) => {
            if (!el) return

            const header = el.querySelector(
                '[data-gsap-header]'
            )

            const navigation = el.querySelector(
                '[data-gsap-navigation]'
            )

            const carousel = el.querySelector(
                '[data-gsap-carousel]'
            )

            const cards = el.querySelectorAll(
                '[data-gsap-card]'
            )

            const buttons = el.querySelectorAll(
                '[data-carousel-btn]'
            )

            /*
             * Make sure the required elements exist
             * before GSAP tries to animate them.
             */
            if (!header || !carousel) return

            // Initial states
            gsap.set(header, {
                opacity: 0,
                y: 30,
            })

            gsap.set(carousel, {
                opacity: 0,
                y: 30,
            })

            if (cards.length) {
                gsap.set(cards, {
                    opacity: 0,
                    y: 40,
                    scale: 0.95,
                })
            }

            /*
             * Navigation only exists visually on
             * tablet/desktop, so don't animate it
             * unless it actually exists.
             */
            if (navigation) {
                gsap.set(navigation, {
                    opacity: 0,
                    scale: 0.9,
                })
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    once: true,
                },
            })

            tl.to(header, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
            })

            if (navigation) {
                tl.to(
                    navigation,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'back.out(1.7)',
                    },
                    '-=0.4'
                )
            }

            tl.to(
                carousel,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                },
                '-=0.25'
            )

            if (cards.length) {
                tl.to(
                    cards,
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.3'
                )
            }

            /*
             * Only attach button interactions when
             * buttons actually exist.
             */
            const cleanupButtons =
                buttons.length
                    ? buttonPress(buttons, {
                          hoverScale: 1.08,
                          pressScale: 0.92,
                          duration: 0.2,
                      })
                    : null

            return () => {
                cleanupButtons?.()
                tl.kill()
            }
        },
        {
            scope: rootRef,
        }
    )

    const animateCarousel = (direction) => {
        const slider = sliderRef.current

        if (!slider) return

        const cards = slider.querySelectorAll(
            '[data-gsap-card]'
        )

        if (!cards.length) return

        gsap.fromTo(
            cards,
            {
                x: direction === 'left' ? 35 : -35,
                opacity: 0.7,
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.025,
                ease: 'power3.out',
                overwrite: true,
            }
        )
    }

    const scrollLeft = () => {
        const slider = sliderRef.current

        if (!slider) return

        animateCarousel('left')

        slider.scrollBy({
            left: -300,
            behavior: 'smooth',
        })
    }

    const scrollRight = () => {
        const slider = sliderRef.current

        if (!slider) return

        animateCarousel('right')

        slider.scrollBy({
            left: 300,
            behavior: 'smooth',
        })
    }

    return (
        <section
            ref={rootRef}
            className="mx-auto my-30 max-w-6xl px-6"
        >
            <div
                data-gsap-header
                className="flex items-end justify-between"
            >
                <Title
                    title="Latest Products"
                    description={`Showing ${latestProducts.length} of ${productList.length} products`}
                    href="/shop"
                />

                <div
                    data-gsap-navigation
                    className="hidden items-center gap-2 sm:flex"
                >
                    <button
                        type="button"
                        data-carousel-btn
                        onClick={scrollLeft}
                        className="
                            flex
                            size-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            text-slate-600
                            transition-colors
                            hover:bg-slate-100
                            hover:text-slate-900
                        "
                        aria-label="Previous products"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        type="button"
                        data-carousel-btn
                        onClick={scrollRight}
                        className="
                            flex
                            size-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            text-slate-600
                            transition-colors
                            hover:bg-slate-100
                            hover:text-slate-900
                        "
                        aria-label="Next products"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={sliderRef}
                data-gsap-carousel
                className="
                    mt-12
                    flex
                    gap-5
                    overflow-x-auto
                    scroll-smooth
                    snap-x
                    snap-mandatory
                    pb-2
                    scrollbar-hide
                "
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {latestProducts.map((product) => (
                    <div
                        key={product.id}
                        data-gsap-card
                        className="
                            w-[calc(50%_-_10px)]
                            shrink-0
                            snap-start
                            sm:w-[calc(33.333%_-_14px)]
                            lg:w-[calc(25%_-_15px)]
                        "
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default LatestProducts