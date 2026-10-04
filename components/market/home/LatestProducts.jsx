'use client'

import React, { useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'

import Title from '../share/Title'
import ProductCard from '../share/ProductCard'

const LatestProducts = () => {
    const displayQuantity = 8

    const products = useSelector(
        (state) => state?.product?.list
    )

    const sliderRef = useRef(null)

    /*
     * Always work with a valid array.
     */
    const productList = Array.isArray(products)
        ? products
        : []

    /*
     * Sort a copy so Redux state is never mutated.
     */
    const latestProducts = useMemo(() => {
        return productList
            .slice()
            .sort((a, b) => {
                const dateA = new Date(
                    a?.createdAt || 0
                ).getTime()

                const dateB = new Date(
                    b?.createdAt || 0
                ).getTime()

                const safeA = Number.isFinite(dateA)
                    ? dateA
                    : 0

                const safeB = Number.isFinite(dateB)
                    ? dateB
                    : 0

                return safeB - safeA
            })
            .slice(0, displayQuantity)
    }, [productList])

    /*
     * Native horizontal scrolling.
     *
     * No GSAP / ScrollTrigger here.
     * This is intentional because this section was
     * identified as the mobile crash trigger.
     */
    const scrollLeft = () => {
        const slider = sliderRef.current

        if (!slider) return

        slider.scrollBy({
            left: -320,
            behavior: 'smooth',
        })
    }

    const scrollRight = () => {
        const slider = sliderRef.current

        if (!slider) return

        slider.scrollBy({
            left: 320,
            behavior: 'smooth',
        })
    }

    return (
        <section
            className="
                mx-auto
                my-20
                w-full
                max-w-6xl
                px-4
                sm:my-24
                sm:px-6
                lg:my-30
            "
        >
            {/* Header */}
            <div className="flex items-end justify-between gap-4">
                <Title
                    title="Latest Products"
                    description={`Showing ${latestProducts.length} of ${productList.length} products`}
                    href="/shop"
                />

                {/* Desktop / tablet navigation */}
                <div className="hidden items-center gap-2 sm:flex">
                    <button
                        type="button"
                        onClick={scrollLeft}
                        className="
                            flex
                            size-10
                            shrink-0
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
                        onClick={scrollRight}
                        className="
                            flex
                            size-10
                            shrink-0
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

            {/* Products */}
            <div
                ref={sliderRef}
                className="
                    mt-8
                    flex
                    gap-4
                    overflow-x-auto
                    overscroll-x-contain
                    pb-4
                    sm:mt-10
                    sm:gap-5
                    snap-x
                    snap-mandatory
                    scrollbar-hide
                "
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {latestProducts.map((product, index) => {
                    if (!product) return null

                    return (
                        <div
                            key={
                                product?.id ??
                                product?._id ??
                                `latest-product-${index}`
                            }
                            className="
                                w-[calc(50%_-_8px)]
                                min-w-[calc(50%_-_8px)]
                                shrink-0
                                snap-start

                                sm:w-[calc(33.333%_-_14px)]
                                sm:min-w-[calc(33.333%_-_14px)]

                                lg:w-[calc(25%_-_15px)]
                                lg:min-w-[calc(25%_-_15px)]
                            "
                        >
                            <ProductCard product={product} />
                        </div>
                    )
                })}
            </div>

            {/* Mobile scroll hint */}
            {latestProducts.length > 2 && (
                <div className="mt-3 text-center text-xs text-slate-400 sm:hidden">
                    Swipe to see more products
                </div>
            )}
        </section>
    )
}

export default LatestProducts