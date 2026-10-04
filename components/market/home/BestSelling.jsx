'use client'

import { useRef } from 'react'
import Title from '../share/Title'
import ProductCard from '../share/ProductCard'
import { useSelector } from 'react-redux'
import {
    gsap,
    ScrollTrigger,
    buttonPress,
    select,
    useGsap,
} from '@/lib/animations'

const BestSelling = () => {
    const displayQuantity = 4

    const products = useSelector(state => state.product.list)

    const rootRef = useRef(null)

    const bestSellingProducts = products
        .slice()
        .sort(
            (a, b) =>
                b.rating.length - a.rating.length
        )
        .slice(0, displayQuantity)

    useGsap(
        (el) => {
            const cards = select(
                el,
                '[data-best-selling-card]'
            )

            const button = el.querySelector(
                '[data-best-selling-button]'
            )

            // Initial state
            gsap.set(cards, {
                opacity: 0,
                y: 35,
                scale: 0.96,
            })

            gsap.set(button, {
                opacity: 0,
                y: 20,
            })

            // Main stagger animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                },
            })

            tl.to(cards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
            })
                .to(
                    button,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power3.out',
                    },
                    '-=0.25'
                )

            // Button hover / press animation
            const cleanupButton = buttonPress(
                button,
                {
                    hoverScale: 1.04,
                    pressScale: 0.96,
                    duration: 0.2,
                }
            )

            ScrollTrigger.refresh()

            return () => {
                cleanupButton?.()
            }
        },
        { scope: rootRef }
    )

    return (
        <section
            ref={rootRef}
            className="px-6 my-30 max-w-6xl mx-auto"
        >
            {/* Header */}
            <Title
                title="Best Selling"
                description={`Showing ${bestSellingProducts.length} of ${products.length} products`}
                href="/shop"
            />

            {/* Products */}
            <div
                className="
                    mt-12
                    grid
                    grid-cols-2
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                    lg:gap-6
                "
            >
                {bestSellingProducts.map((product) => (
                    <div
                        key={product.id}
                        data-best-selling-card
                    >
                        <ProductCard
                            product={product}
                        />
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div
                className="
                    mt-12
                    flex
                    justify-center
                "
            >
                <a
                    href="/shop"
                    data-best-selling-button
                    className="
                        inline-flex
                        items-center
                        gap-2
                        px-6
                        py-3
                        rounded-full
                        bg-brand
                        text-white
                        text-sm
                        font-medium
                        shadow-sm
                        transition-colors
                        duration-300
                        hover:bg-orange-500
                    "
                >
                    View All Products

                    <span className="text-base">
                        →
                    </span>
                </a>
            </div>
        </section>
    )
}

export default BestSelling