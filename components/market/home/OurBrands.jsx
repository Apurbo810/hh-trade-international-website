'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

import medicube from '@/assets/brands/medicube.png'
import anua from '@/assets/brands/anua.png'
import biodance from '@/assets/brands/biodance.png'
import creationLamis from '@/assets/brands/creation-lamis.png'
import winstown from '@/assets/brands/winstown.png'
import madagascarCentella from '@/assets/brands/madagascar_centella.png'
import streax from '@/assets/brands/streax.jpg'
import vaseline from '@/assets/brands/Vaseline.png'

import { gsap, select, useGsap } from '@/lib/animations'

const brands = [
    {
        name: 'Medicube',
        image: medicube,
    },
    {
        name: 'ANUA',
        image: anua,
    },
    {
        name: 'BIODANCE',
        image: biodance,
    },
    {
        name: 'Creation Lamis',
        image: creationLamis,
    },
    {
        name: 'WinsTown',
        image: winstown,
    },
    {
        name: 'Madagascar Centella',
        image: madagascarCentella,
    },
    {
        name: 'Streax',
        image: streax,
    },
    {
        name: 'Vaseline',
        image: vaseline,
    },
]

const OurBrands = () => {
    const rootRef = useRef(null)
    const router = useRouter()

    useGsap(
        (el) => {
            const heading = select(el, '[data-brand-heading]')
            const cards = select(el, '[data-brand-card]')
            const images = select(el, '[data-brand-image]')

            if (!heading || !cards.length) return

            // -----------------------------
            // Heading reveal
            // -----------------------------
            gsap.fromTo(
                heading,
                {
                    opacity: 0,
                    y: 30,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                    },
                }
            )

            // -----------------------------
            // Cards reveal
            // -----------------------------
            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 45,
                    scale: 0.94,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 78%',
                        once: true,
                    },
                }
            )

            // -----------------------------
            // Image entrance
            // -----------------------------
            gsap.fromTo(
                images,
                {
                    scale: 1.08,
                },
                {
                    scale: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 78%',
                        once: true,
                    },
                }
            )

            // -----------------------------
            // Hover animations
            // -----------------------------
            cards.forEach((card) => {
                const image = select(card, '[data-brand-image]')
                const overlay = select(card, '[data-brand-overlay]')

                const onEnter = () => {
                    gsap.to(card, {
                        y: -6,
                        duration: 0.35,
                        ease: 'power2.out',
                    })

                    gsap.to(image, {
                        scale: 1.06,
                        duration: 0.5,
                        ease: 'power2.out',
                    })

                    gsap.to(overlay, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    })
                }

                const onLeave = () => {
                    gsap.to(card, {
                        y: 0,
                        duration: 0.35,
                        ease: 'power2.out',
                    })

                    gsap.to(image, {
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                    })

                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                    })
                }

                card.addEventListener('mouseenter', onEnter)
                card.addEventListener('mouseleave', onLeave)

                card._brandCleanup = () => {
                    card.removeEventListener('mouseenter', onEnter)
                    card.removeEventListener('mouseleave', onLeave)
                }
            })

            return () => {
                cards.forEach((card) => {
                    card._brandCleanup?.()
                })
            }
        },
        {
            scope: rootRef,
        }
    )

    // -----------------------------
    // Brand filter
    // -----------------------------
    const handleBrandClick = (brand) => {
        router.push(`/shop?brand=${encodeURIComponent(brand)}`)
    }

    return (
        <section
            ref={rootRef}
            className="mx-6 my-24"
        >
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div
                    data-brand-heading
                    className="
                        mb-10
                        flex
                        items-end
                        justify-between
                        gap-4
                    "
                >
                    <div>
                        <p
                            className="
                                mb-2
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-brand
                            "
                        >
                            Trusted names
                        </p>

                        <h2
                            className="
                                text-3xl
                                font-semibold
                                tracking-tight
                                text-slate-800
                                sm:text-4xl
                            "
                        >
                            Our Brands
                        </h2>

                        <p
                            className="
                                mt-2
                                max-w-lg
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            Discover products from brands
                            you know, love, and trust.
                        </p>
                    </div>

                    {/* Desktop View All */}
                    <button
                        type="button"
                        onClick={() => router.push('/shop')}
                        className="
                            hidden
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-slate-600
                            transition-colors
                            hover:text-brand
                            sm:flex
                        "
                    >
                        View all
                        <ArrowRight size={17} />
                    </button>
                </div>

                {/* Brand Grid */}
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-4
                        sm:grid-cols-4
                        lg:gap-6
                    "
                >
                    {brands.map((brand) => (
                        <button
                            key={brand.name}
                            type="button"
                            data-brand-card
                            onClick={() => handleBrandClick(brand.name)}
                            className="
                                group
                                relative
                                aspect-square
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-100
                                bg-white
                                shadow-sm
                                cursor-pointer
                                focus:outline-none
                                focus:ring-2
                                focus:ring-brand/30
                            "
                        >
                            {/* Brand Image */}
                            <Image
                                src={brand.image}
                                alt={`${brand.name} brand`}
                                fill
                                sizes="
                                    (max-width: 640px) 50vw,
                                    (max-width: 1024px) 25vw,
                                    280px
                                "
                                data-brand-image
                                className="
                                    object-cover
                                    will-change-transform
                                "
                            />

                            {/* Hover Overlay */}
                            <div
                                data-brand-overlay
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    flex
                                    items-end
                                    bg-gradient-to-t
                                    from-black/60
                                    via-black/10
                                    to-transparent
                                    opacity-0
                                "
                            >
                                <div
                                    className="
                                        w-full
                                        p-4
                                        text-left
                                    "
                                >
                                    <span
                                        className="
                                            text-sm
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        Shop {brand.name}
                                    </span>

                                    <span
                                        className="
                                            mt-1
                                            block
                                            text-xs
                                            text-white/80
                                        "
                                    >
                                        View products →
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Mobile View All */}
                <button
                    type="button"
                    onClick={() => router.push('/shop')}
                    className="
                        mt-6
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        py-3
                        text-sm
                        font-medium
                        text-slate-600
                        transition-colors
                        hover:border-brand/30
                        hover:text-brand
                        sm:hidden
                    "
                >
                    View all products
                    <ArrowRight size={16} />
                </button>
            </div>
        </section>
    )
}

export default OurBrands