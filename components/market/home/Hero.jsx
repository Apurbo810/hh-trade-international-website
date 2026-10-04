'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { gsap, EASE, useGsap } from '@/lib/animations'

import babyCare from '@/assets/hero_image/baby-care.jpg'
import skincare from '@/assets/hero_image/skincare.jpg'
import fragranceTea from '@/assets/hero_image/fragrance-tea.jpg'
const slides = [
    {
        id: 1,
        image: babyCare,
        category: 'BABY CARE',
        title: 'Gentle Care',
        highlight: 'for Little Ones',
        description:
            'Soft, safe and comfortable care for your little ones.',
        accent: '#d77d5c',
    },
    {
        id: 2,
        image: skincare,
        category: 'SKINCARE',
        title: 'Glow Naturally',
        highlight: 'Every Day',
        description:
            'Hydrating skincare for healthier, brighter and radiant skin.',
        accent: '#c96f6f',
    },
    {
        id: 3,
        image: fragranceTea,
        category: 'FRAGRANCE & TEA',
        title: 'A More Beautiful',
        highlight: 'Everyday You',
        description:
            'Refreshing fragrances and soothing teas for your everyday moments.',
        accent: '#5c765d',
    },
]

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const rootRef = useRef(null)
    const imageRef = useRef(null)
    const contentRef = useRef(null)
    const floatingRef = useRef(null)

    const activeSlide = slides[activeIndex]

    useGsap(
        (el) => {
            const image = imageRef.current
            const content = contentRef.current
            const floating = floatingRef.current

            if (!image || !content) return

            // Initial animation
            gsap.fromTo(
                image,
                {
                    opacity: 0,
                    scale: 1.06,
                    x: 30,
                },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 0.8,
                    ease: EASE.out,
                }
            )

            gsap.fromTo(
                content,
                {
                    opacity: 0,
                    x: -30,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    delay: 0.1,
                    ease: EASE.out,
                }
            )

            if (floating) {
                gsap.fromTo(
                    floating,
                    {
                        opacity: 0,
                        scale: 0.85,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.7,
                        delay: 0.2,
                        ease: 'back.out(1.5)',
                    }
                )
            }

            // Very subtle floating animation
            const floatTween = gsap.to(image, {
                y: -8,
                duration: 2.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 1,
            })

            // Automatically change slide after 3 seconds
            const timer = setTimeout(() => {
                const nextIndex =
                    (activeIndex + 1) % slides.length

                const transition = gsap.timeline({
                    onComplete: () => {
                        setActiveIndex(nextIndex)
                    },
                })

                transition
                    .to(
                        [content, image],
                        {
                            opacity: 0,
                            x: -25,
                            duration: 0.35,
                            ease: EASE.inOut,
                        }
                    )
            }, 3000)

            return () => {
                clearTimeout(timer)
                floatTween.kill()
            }
        },
        {
            scope: rootRef,
            dependencies: [activeIndex],
        }
    )

    const goToSlide = (index) => {
        if (index === activeIndex) return

        const image = imageRef.current
        const content = contentRef.current

        if (!image || !content) {
            setActiveIndex(index)
            return
        }

        gsap.killTweensOf([image, content])

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveIndex(index)
            },
        })

        tl.to(
            [content, image],
            {
                opacity: 0,
                x: -20,
                duration: 0.3,
                ease: EASE.inOut,
            }
        )
    }

    return (
        <section
            ref={rootRef}
            className="mx-auto w-full max-w-7xl px-4 sm:px-6"
        >
            <div
                className="
                    relative
                    min-h-[360px]
                    overflow-hidden
                    rounded-2xl
                    sm:min-h-[400px]
                    lg:min-h-[440px]
                "
                style={{
                    background:
                        'linear-gradient(120deg, #fff8f3 0%, #fceee6 45%, #f7e3dc 100%)',
                }}
            >
                {/* Decorative background */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-20
                        -top-20
                        h-56
                        w-56
                        rounded-full
                        bg-white/50
                        blur-3xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-[-100px]
                        left-[35%]
                        h-60
                        w-60
                        rounded-full
                        bg-[#e8b8a5]/20
                        blur-3xl
                    "
                />

                {/* Decorative line */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-8
                        left-0
                        h-32
                        w-72
                        opacity-30
                    "
                >
                    <svg
                        viewBox="0 0 300 100"
                        fill="none"
                        className="h-full w-full"
                    >
                        <path
                            d="M0 60 C60 20, 90 100, 150 55 C200 20, 235 75, 300 30"
                            stroke={activeSlide.accent}
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* Main layout */}
                <div
                    className="
                        relative
                        z-10
                        grid
                        min-h-[360px]
                        grid-cols-1
                        lg:min-h-[440px]
                        lg:grid-cols-[42%_58%]
                    "
                >
                    {/* LEFT CONTENT */}
                    <div
                        ref={contentRef}
                        className="
                            flex
                            flex-col
                            justify-center
                            px-7
                            py-10
                            sm:px-10
                            lg:px-14
                            lg:py-12
                        "
                    >
                        {/* Category */}
                        <div className="mb-4 flex items-center gap-3">
                            <span
                                className="h-px w-8"
                                style={{
                                    backgroundColor:
                                        activeSlide.accent,
                                }}
                            />

                            <span
                                className="
                                    text-[11px]
                                    font-semibold
                                    tracking-[0.25em]
                                "
                                style={{
                                    color: activeSlide.accent,
                                }}
                            >
                                {activeSlide.category}
                            </span>
                        </div>

                        {/* Heading */}
                        <h1
                            className="
                                max-w-xl
                                text-4xl
                                font-extrabold
                                leading-[0.95]
                                tracking-tight
                                text-[#3f251c]
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            {activeSlide.title}

                            <br />

                            <span
                                style={{
                                    color: activeSlide.accent,
                                }}
                            >
                                {activeSlide.highlight}
                            </span>
                        </h1>

                        {/* Description */}
                        <p
                            className="
                                mt-5
                                max-w-md
                                text-sm
                                leading-6
                                text-[#614c43]
                                sm:text-base
                            "
                        >
                            {activeSlide.description}
                        </p>

                        {/* Promo labels */}
                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <div
                                className="
                                    rounded-md
                                    bg-[#438775]
                                    px-5
                                    py-2
                                    text-xs
                                    font-bold
                                    text-white
                                    shadow-sm
                                "
                            >
                                FREE DELIVERY
                            </div>

                            <div
                                className="
                                    rounded-md
                                    bg-[#f51d67]
                                    px-5
                                    py-2
                                    text-xs
                                    font-bold
                                    text-white
                                    shadow-sm
                                "
                            >
                                VOUCHER MAX
                            </div>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div
                        ref={imageRef}
                        className="
                            relative
                            hidden
                            min-h-[360px]
                            lg:block
                            lg:min-h-[440px]
                        "
                    >
                        {/* Main image */}
                        <div className="absolute inset-0">
                            <Image
                                src={activeSlide.image}
                                alt={activeSlide.title}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 58vw"
                                className="
                                    object-cover
                                    object-center
                                "
                            />
                        </div>

                        {/* Image overlay */}
                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-r
                                from-[#fceee6]
                                via-transparent
                                to-transparent
                            "
                        />

                        {/* Floating offer */}
                        <div
                            ref={floatingRef}
                            className="
                                absolute
                                right-8
                                top-8
                                flex
                                size-28
                                rotate-[-8deg]
                                flex-col
                                items-center
                                justify-center
                                rounded-full
                                bg-[#f45b16]
                                text-center
                                text-white
                                shadow-xl
                                sm:size-32
                            "
                        >
                            <span className="text-[11px] font-semibold">
                                UP TO
                            </span>

                            <span className="text-3xl font-black leading-none">
                                70%
                            </span>

                            <span className="text-[10px] font-bold tracking-wider">
                                OFF
                            </span>
                        </div>

                        {/* Decorative product cards */}
                        <div
                            className="
                                absolute
                                bottom-7
                                right-8
                                hidden
                                items-end
                                gap-4
                                xl:flex
                            "
                        >
                            <div
                                className="
                                    rotate-[-4deg]
                                    overflow-hidden
                                    rounded-lg
                                    border-4
                                    border-white
                                    bg-white
                                    shadow-xl
                                "
                            >
                                <Image
                                    src={activeSlide.image}
                                    alt=""
                                    width={110}
                                    height={80}
                                    className="h-20 w-28 object-cover"
                                />
                            </div>

                            <div
                                className="
                                    rotate-[5deg]
                                    overflow-hidden
                                    rounded-lg
                                    border-4
                                    border-white
                                    bg-white
                                    shadow-xl
                                "
                            >
                                <Image
                                    src={activeSlide.image}
                                    alt=""
                                    width={130}
                                    height={95}
                                    className="h-24 w-32 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE IMAGE */}
                <div
                    className="
                        relative
                        h-[230px]
                        overflow-hidden
                        lg:hidden
                    "
                >
                    <Image
                        src={activeSlide.image}
                        alt={activeSlide.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/10
                            to-transparent
                        "
                    />
                </div>

                {/* SLIDE INDICATORS */}
                <div
                    className="
                        absolute
                        bottom-4
                        left-1/2
                        z-30
                        flex
                        -translate-x-1/2
                        items-center
                        gap-2
                    "
                >
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            type="button"
                            aria-label={`Go to slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                            className={`
                                h-1.5
                                rounded-full
                                transition-all
                                duration-300
                                ${
                                    index === activeIndex
                                        ? 'w-9 bg-brand'
                                        : 'w-5 bg-white/70'
                                }
                            `}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero