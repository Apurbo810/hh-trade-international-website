'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import {
    Heart,
    ShoppingBag,
    Star,
    ArrowUpRight,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart } from '@/lib/features/cart/cartSlice'
import {
    gsap,
    productCardHover,
    select,
    useGsap,
} from '@/lib/animations'

const ProductCard = ({ product }) => {
    const currency =
        process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const dispatch = useDispatch()

    const cart = useSelector(
        (state) => state.cart.cartItems
    )

    const colors = Array.isArray(product.colors)
        ? product.colors
        : []

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [liked, setLiked] = useState(false)

    const rootRef = useRef(null)

    const selectedColor =
        colors[selectedIndex] ?? colors[0]

    const mainImage =
        selectedColor?.image ||
        product.images?.[selectedIndex] ||
        product.images?.[0]

    const reviews = Array.isArray(product.rating)
        ? product.rating
        : []

    const averageRating =
        reviews.length > 0
            ? reviews.reduce(
                  (total, item) =>
                      total + Number(item.rating || 0),
                  0
              ) / reviews.length
            : 0

    const discount =
        product.mrp > product.price
            ? Math.round(
                  ((product.mrp - product.price) /
                      product.mrp) *
                      100
              )
            : 0

    useGsap(
        (el) => {
            const image = el.querySelector(
                '[data-card-image]'
            )

            const imageWrap = el.querySelector(
                '[data-card-imagewrap]'
            )

            const title = el.querySelector(
                '[data-card-title]'
            )

            const thumbs = select(
                el,
                '[data-card-thumb]'
            )

            const quickButton = el.querySelector(
                '[data-card-quick]'
            )

            const stopHover = productCardHover(el, {
                image,
                title,
                thumbnails: thumbs,
                shadowTarget: imageWrap,
            })

            if (quickButton) {
                const enter = () => {
                    gsap.to(quickButton, {
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power3.out',
                    })
                }

                const leave = () => {
                    gsap.to(quickButton, {
                        y: 10,
                        opacity: 0,
                        duration: 0.25,
                        ease: 'power2.out',
                    })
                }

                el.addEventListener(
                    'pointerenter',
                    enter
                )

                el.addEventListener(
                    'pointerleave',
                    leave
                )

                return () => {
                    stopHover?.()

                    el.removeEventListener(
                        'pointerenter',
                        enter
                    )

                    el.removeEventListener(
                        'pointerleave',
                        leave
                    )
                }
            }

            return () => {
                stopHover?.()
            }
        },
        { scope: rootRef }
    )

    const handleAddToCart = (event) => {
        event.preventDefault()
        event.stopPropagation()

        dispatch(
            addToCart({
                productId: product.id,
            })
        )
    }

    const handleWishlist = (event) => {
        event.preventDefault()
        event.stopPropagation()

        setLiked((previous) => !previous)
    }

    return (
        <Link
            ref={rootRef}
            href={`/product/${product.id}`}
            data-reveal="card"
            className="
                group
                relative
                block
                w-full
                cursor-pointer
                select-none
            "
        >
            {/* =================================================
                IMAGE
            ================================================= */}

            <div
                data-card-imagewrap
                className="
                    relative
                    aspect-[4/5]
                    w-full
                    overflow-hidden
                    rounded-2xl
                    bg-[#f7f7f7]
                    transition-shadow
                    duration-300
                    group-hover:shadow-xl
                    group-hover:shadow-slate-200/50
                "
            >
                {/* Discount */}
                {discount > 0 && (
                    <div
                        className="
                            absolute
                            left-3
                            top-3
                            z-20
                            rounded-full
                            bg-brand
                            px-2.5
                            py-1
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-white
                        "
                    >
                        -{discount}%
                    </div>
                )}

                {/* Wishlist */}
                <button
                    type="button"
                    onClick={handleWishlist}
                    aria-label={
                        liked
                            ? 'Remove from wishlist'
                            : 'Add to wishlist'
                    }
                    className="
                        absolute
                        right-3
                        top-3
                        z-20
                        flex
                        size-9
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        text-slate-600
                        shadow-sm
                        backdrop-blur
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-white
                        hover:text-brand
                        active:scale-95
                    "
                >
                    <Heart
                        size={16}
                        fill={
                            liked
                                ? 'currentColor'
                                : 'none'
                        }
                    />
                </button>

                {/* Product image */}

                {mainImage && (
                    <Image
                        data-card-image
                        src={mainImage}
                        alt={product.name}
                        fill
                        sizes="
                            (max-width: 640px) 50vw,
                            (max-width: 1024px) 33vw,
                            240px
                        "
                        className="
                            object-contain
                            p-5
                            sm:p-6
                            transition-transform
                            duration-500
                            will-change-transform
                        "
                    />
                )}

                {/* Quick Add */}

                <button
                    type="button"
                    data-card-quick
                    onClick={handleAddToCart}
                    className="
                        absolute
                        bottom-3
                        left-3
                        right-3
                        z-20
                        flex
                        translate-y-2
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-slate-900
                        px-4
                        py-2.5
                        text-xs
                        font-medium
                        text-white
                        opacity-0
                        shadow-lg
                        transition-colors
                        duration-300
                        hover:bg-brand
                    "
                >
                    <ShoppingBag size={14} />

                    {cart?.[product.id]
                        ? 'In Cart'
                        : 'Add to Cart'}
                </button>
            </div>

            {/* =================================================
                PRODUCT INFO
            ================================================= */}

            <div className="pt-4">

                {/* Brand / Category */}

                {product.category && (
                    <p
                        className="
                            mb-1.5
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.14em]
                            text-slate-400
                        "
                    >
                        {product.category}
                    </p>
                )}

                {/* Product title */}

                <div className="flex items-start justify-between gap-2">
                    <h3
                        data-card-title
                        className="
                            line-clamp-2
                            min-h-[40px]
                            flex-1
                            text-sm
                            font-medium
                            leading-5
                            text-slate-800
                            transition-colors
                            duration-300
                            group-hover:text-brand
                        "
                    >
                        {product.name}
                    </h3>

                    <ArrowUpRight
                        size={16}
                        className="
                            mt-0.5
                            shrink-0
                            text-slate-300
                            opacity-0
                            -translate-x-1
                            translate-y-1
                            transition-all
                            duration-300
                            group-hover:translate-x-0
                            group-hover:translate-y-0
                            group-hover:text-brand
                            group-hover:opacity-100
                        "
                    />
                </div>

                {/* Rating */}

                <div className="mt-2 flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                        <Star
                            size={13}
                            fill={
                                averageRating > 0
                                    ? '#F7941D'
                                    : '#CBD5E1'
                            }
                            className="text-transparent"
                        />

                        <span className="text-xs font-medium text-slate-600">
                            {averageRating > 0
                                ? averageRating.toFixed(1)
                                : 'New'}
                        </span>
                    </div>

                    {reviews.length > 0 && (
                        <span className="text-[11px] text-slate-400">
                            ({reviews.length})
                        </span>
                    )}
                </div>

                {/* Variants */}

                {colors.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5">
                        {colors
                            .slice(0, 5)
                            .map((color, index) => {
                                const variantImage =
                                    color.image ||
                                    product.images?.[
                                        index
                                    ] ||
                                    product.images?.[0]

                                if (!variantImage)
                                    return null

                                const isSelected =
                                    index ===
                                    selectedIndex

                                return (
                                    <button
                                        key={
                                            color.id ||
                                            color.name ||
                                            index
                                        }
                                        type="button"
                                        data-card-thumb
                                        title={
                                            color.name ||
                                            'Variant'
                                        }
                                        aria-label={
                                            color.name ||
                                            'Variant'
                                        }
                                        aria-pressed={
                                            isSelected
                                        }
                                        onClick={(
                                            event
                                        ) => {
                                            event.preventDefault()
                                            event.stopPropagation()

                                            setSelectedIndex(
                                                index
                                            )
                                        }}
                                        className={`
                                            size-7
                                            shrink-0
                                            overflow-hidden
                                            rounded-full
                                            border
                                            bg-white
                                            p-0.5
                                            transition-all
                                            duration-200
                                            ${
                                                isSelected
                                                    ? 'border-brand ring-1 ring-brand/30'
                                                    : 'border-slate-200 hover:border-slate-400'
                                            }
                                        `}
                                    >
                                        <Image
                                            src={
                                                variantImage
                                            }
                                            alt={
                                                color.name ||
                                                product.name
                                            }
                                            width={40}
                                            height={40}
                                            className="
                                                h-full
                                                w-full
                                                rounded-full
                                                object-cover
                                            "
                                        />
                                    </button>
                                )
                            })}

                        {colors.length > 5 && (
                            <span className="ml-1 text-[10px] text-slate-400">
                                +{colors.length - 5}
                            </span>
                        )}
                    </div>
                )}

                {/* Price */}

                <div className="mt-3 flex items-end gap-2">
                    <span
                        className="
                            text-base
                            font-semibold
                            tracking-tight
                            text-slate-900
                        "
                    >
                        {currency}
                        {product.price}
                    </span>

                    {product.mrp >
                        product.price && (
                        <span
                            className="
                                text-xs
                                text-slate-400
                                line-through
                            "
                        >
                            {currency}
                            {product.mrp}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard