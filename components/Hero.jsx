'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import { buttonPress, EASE, gsap, select, useGsap } from '@/lib/animations'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const rootRef = useGsap((el) => {
        const badge = select(el, '[data-hero="badge"]')
        const heading = select(el, '[data-hero="heading"]')
        const price = select(el, '[data-hero="price"]')
        const cta = select(el, '[data-hero="cta"]')
        const image = select(el, '[data-hero="image"]')
        const promos = select(el, '[data-hero="promo"]')

        // Staggered entrance: heading → price → CTA → image → promo cards.
        const tl = gsap.timeline({ defaults: { ease: EASE.out, duration: 0.7 } })
        tl.from(badge, { y: 14, opacity: 0, duration: 0.5 })
            .from(heading, { y: 26, opacity: 0 }, '-=0.32')
            .from(price, { y: 18, opacity: 0 }, '-=0.42')
            .from(cta, { y: 14, opacity: 0 }, '-=0.45')
            .from(image, { y: 28, opacity: 0, scale: 0.97, duration: 0.9 }, '-=0.7')
            .from(promos, { y: 26, opacity: 0, stagger: 0.12 }, '-=0.62')

        // Very subtle perpetual float once the model image has settled in.
        gsap.to(image, {
            y: -10,
            duration: 2.6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.7,
        })

        const stopButton = buttonPress(cta)
        return () => stopButton && stopButton()
    })

    return (
        <div ref={rootRef} className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                <div className='relative flex-1 flex flex-col bg-brand-light rounded-3xl xl:min-h-100 group'>
                    <div className='p-5 sm:p-16'>
                        <div data-hero="badge" className='inline-flex items-center gap-3 bg-white text-brand-dark pr-4 p-1 rounded-full text-xs sm:text-sm'>
                            <span className='bg-brand px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs'>NEWS</span> Free Shipping on Orders Above $50! <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 data-hero="heading" className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-700 to-brand bg-clip-text text-transparent max-w-xs  sm:max-w-md'>
                            Gadgets you'll love. Prices you'll trust.
                        </h2>
                        <div data-hero="price" className='text-slate-800 text-sm font-medium mt-4 sm:mt-8'>
                            <p>Starts from</p>
                            <p className='text-3xl'>{currency}4.90</p>
                        </div>
                        <button data-hero="cta" className='bg-brand text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2'>LEARN MORE</button>
                    </div>
                    <Image data-hero="image" className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm' src={assets.hero_model_img} alt="" preload />
                </div>
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    <div data-hero="promo" className='flex-1 flex items-center justify-between w-full bg-brand-soft rounded-3xl p-6 px-8 group'>
                        <div>
                            <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-brand bg-clip-text text-transparent max-w-40'>Best products</p>
                            <p className='flex items-center gap-1 mt-4'>View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-35' src={assets.hero_product_img1} alt="" />
                    </div>
                    <div data-hero="promo" className='flex-1 flex items-center justify-between w-full bg-brand-light rounded-3xl p-6 px-8 group'>
                        <div>
                            <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-brand bg-clip-text text-transparent max-w-40'>20% discounts</p>
                            <p className='flex items-center gap-1 mt-4'>View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-35' src={assets.hero_product_img2} alt="" />
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>

    )
}

export default Hero