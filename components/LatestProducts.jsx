'use client'

import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { buttonPress, revealCards, select, useGsap } from '@/lib/animations'

const LatestProducts = () => {

    const displayQuantity = 8

    const products = useSelector(state => state.product.list)

    const sliderRef = useRef(null)
    const rootRef = useRef(null)

    useGsap((el) => {
        // Staggered card reveal as the carousel scrolls into view.
        const cards = select(el, '[data-reveal="card"]')
        revealCards(cards, { trigger: el, start: 'top 85%', y: 30, stagger: 0.07, duration: 0.6 })

        // Polished micro-interactions on the native-scroll navigation.
        const buttons = select(el, '[data-carousel-btn]')
        const stopButtons = buttonPress(buttons)
        return () => stopButtons && stopButtons()
    }, { scope: rootRef })

    const latestProducts = products
        .slice()
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, displayQuantity)

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            })
        }
    }

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div ref={rootRef} className="px-6 my-30 max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex items-end justify-between">

                <Title
                    title="Latest Products"
                    description={`Showing ${
                        latestProducts.length
                    } of ${products.length} products`}
                    href="/shop"
                />

                {/* Navigation */}
                <div className="hidden sm:flex items-center gap-2">

                    <button
                        type="button"
                        data-carousel-btn
                        onClick={scrollLeft}
                        className="size-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        aria-label="Previous products"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        type="button"
                        data-carousel-btn
                        onClick={scrollRight}
                        className="size-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        aria-label="Next products"
                    >
                        <ChevronRight size={20} />
                    </button>

                </div>

            </div>


            {/* Product Carousel */}
            <div
                ref={sliderRef}
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
                        data-reveal="card"
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

        </div>
    )
}

export default LatestProducts