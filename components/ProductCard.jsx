'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { gsap, productCardHover, select, useGsap } from '@/lib/animations'

const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // Variant (colour) data is optional. Expected shape:
    //   colors: [{ name: "Black", image: "/watch-black.jpg" }]
    // An optional `id` is also supported for keys. Products without `colors`
    // simply fall back to the first product image and render no swatches.
    const colors = Array.isArray(product.colors) ? product.colors : []

    const [selectedIndex, setSelectedIndex] = useState(0)

    // Clamp in case the colors array is shorter than the stored index.
    const selectedColor = colors[selectedIndex] ?? colors[0]

    // Main image = selected variant image, otherwise the first product image.
    const mainImage = selectedColor?.image || product.images?.[0]

    const rootRef = useRef(null)
    const prevIndex = useRef(selectedIndex)

    // Hover micro-interactions: image lift/zoom, title colour shift,
    // variant-thumbnail stagger reveal and a subtle elevation.
    useGsap((el) => {
        const image = el.querySelector('[data-card-image]')
        const title = el.querySelector('[data-card-title]')
        const thumbs = select(el, '[data-card-thumb]')
        const shadow = el.querySelector('[data-card-imagewrap]')

        const stopHover = productCardHover(el, {
            image,
            title,
            thumbnails: thumbs,
            shadowTarget: shadow,
        })

        return () => stopHover && stopHover()
    }, { scope: rootRef })

    // Smoothly cross-fade the main image when a different variant is selected
    // (skipped on first render / Strict Mode remount).
    useGsap((el) => {
        if (prevIndex.current === selectedIndex) return
        prevIndex.current = selectedIndex

        const image = el.querySelector('[data-card-image]')
        if (image) {
            gsap.fromTo(image, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        }
    }, { scope: rootRef, dependencies: [selectedIndex] })

    return (
        <Link
            ref={rootRef}
            href={`/product/${product.id}`}
            data-reveal="card"
            className="group block max-xl:mx-auto w-full sm:w-60"
        >
            {/* Product image — single, consistent square area for every product */}
            <div data-card-imagewrap className="relative w-full aspect-square bg-[#f7f7f7] rounded-lg overflow-hidden">
                {mainImage && (
                    <Image
                        data-card-image
                        src={mainImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 240px"
                        className="object-contain"
                    />
                )}
            </div>

            {/* Product information */}
            <div className="pt-2.5">
                {/* Title — fixed 2-line height keeps every card aligned */}
                <p data-card-title className="text-[13px] sm:text-sm leading-5 font-medium text-slate-800 line-clamp-2 min-h-10">
                    {product.name}
                </p>

                {/* Variant thumbnails — only rendered when colours exist */}
                {colors.length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 overflow-hidden">
                        {colors.map((color, index) => {
                            const variantImage =
                                color.image ||
                                product.images?.[index] ||
                                product.images?.[0]

                            if (!variantImage) return null

                            const isSelected = index === selectedIndex

                            return (
                                <button
                                    data-card-thumb
                                    key={color.id || color.name || index}
                                    type="button"
                                    title={color.name}
                                    aria-label={color.name}
                                    aria-pressed={isSelected}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setSelectedIndex(index)
                                    }}
                                    className={`relative h-7 w-7 sm:h-8 sm:w-8 shrink-0 overflow-hidden rounded-md border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${
                                        isSelected
                                            ? 'border-brand ring-1 ring-brand'
                                            : 'border-slate-200 hover:border-slate-400'
                                    }`}
                                >
                                    <Image
                                        src={variantImage}
                                        alt={color.name || product.name}
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            )
                        })}
                    </div>
                )}

                {/* Price — its own row, prominent */}
                <p className="mt-1.5 text-[15px] sm:text-base font-semibold text-brand">
                    {currency}
                    {product.price}
                </p>
            </div>
        </Link>
    )
}

export default ProductCard