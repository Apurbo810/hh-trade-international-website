'use client'

import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Title from '../share/Title'
import ProductCard from '../share/ProductCard'
import { useSelector } from 'react-redux'
import {
    gsap,
    useGsap,
    buttonPress,
} from '@/lib/animations'

const LatestProducts = () => {
    const displayQuantity = 8

    const products = useSelector(state => state.product.list)

    const sliderRef = useRef(null)
    const rootRef = useRef(null)

    const productList = Array.isArray(products) ? products : []

    // Invalid / missing dates produce NaN, which makes the comparison
    // unpredictable. Fall back to 0 so the sort is always well defined.
    const toTime = (value) => {
        const time = new Date(value).getTime()

        return Number.isFinite(time) ? time : 0
    }

    const latestProducts = productList
        .slice()
        .sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt))
        .slice(0, displayQuantity)

    useGsap((el) => {
        const cards = el.querySelectorAll('[data-gsap-card]')
        const header = el.querySelector('[data-gsap-header]')
        const navigation = el.querySelector('[data-gsap-navigation]')
        const carousel = el.querySelector('[data-gsap-carousel]')
        const buttons = el.querySelectorAll('[data-carousel-btn]')

        // Initial states
        gsap.set(header, {
            opacity: 0,
            y: 30,
        })

        gsap.set(navigation, {
            opacity: 0,
            scale: 0.9,
        })

        gsap.set(carousel, {
            opacity: 0,
            y: 30,
        })

        gsap.set(cards, {
            opacity: 0,
            y: 40,
            scale: 0.95,
        })

        // Initial section animation
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
            .to(
                navigation,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                },
                '-=0.4'
            )
            .to(
                carousel,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                },
                '-=0.25'
            )
            .to(
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

        // Button hover / press animation
        const cleanupButtons = buttonPress(buttons, {
            hoverScale: 1.08,
            pressScale: 0.92,
            duration: 0.2,
        })

        return () => {
            cleanupButtons?.()
        }
    }, { scope: rootRef })

    /*
     * ----------------------------------------
     * CAROUSEL MOVEMENT ANIMATION
     * ----------------------------------------
     */

    const animateCarousel = (direction) => {
        if (!sliderRef.current) return

        const cards =
            sliderRef.current.querySelectorAll(
                '[data-gsap-card]'
            )

        /*
         * Move cards slightly in the same
         * direction as the carousel.
         */
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
        if (!sliderRef.current) return

        animateCarousel('left')

        sliderRef.current.scrollBy({
            left: -300,
            behavior: 'smooth',
        })
    }

    const scrollRight = () => {
        if (!sliderRef.current) return

        animateCarousel('right')

        sliderRef.current.scrollBy({
            left: 300,
            behavior: 'smooth',
        })
    }

    return (
        <section
            ref={rootRef}
            className="px-6 my-30 max-w-6xl mx-auto"
        >
            {/* Header */}
            <div
                data-gsap-header
                className="flex items-end justify-between"
            >
                <Title
                    title="Latest Products"
                    description={`Showing ${latestProducts.length} of ${productList.length} products`}
                    href="/shop"
                />

                {/* Navigation */}
                <div
                    data-gsap-navigation
                    className="hidden sm:flex items-center gap-2"
                >
                    <button
                        type="button"
                        data-carousel-btn
                        onClick={scrollLeft}
                        className="
                            size-10
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            flex
                            items-center
                            justify-center
                            text-slate-600
                            hover:bg-slate-100
                            hover:text-slate-900
                            transition-colors
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
                            size-10
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            flex
                            items-center
                            justify-center
                            text-slate-600
                            hover:bg-slate-100
                            hover:text-slate-900
                            transition-colors
                        "
                        aria-label="Next products"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Product Carousel */}
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
                    scrollbar-hide
                    pb-2
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
                            shrink-0
                            snap-start
                            w-[calc(50%-10px)]
                            sm:w-[calc(33.333%-14px)]
                            lg:w-[calc(25%-15px)]
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