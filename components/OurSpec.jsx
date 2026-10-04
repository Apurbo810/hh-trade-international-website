'use client'
import React, { useRef } from 'react'
import Title from './market/share/Title'
import { ourSpecsData } from '@/assets/assets'
import { hoverScale, revealCards, select, useGsap } from '@/lib/animations'

const OurSpecs = () => {

    const gridRef = useRef(null)

    useGsap((el) => {
        const cards = select(el, '[data-spec-card]')
        revealCards(cards, { trigger: el, y: 30, stagger: 0.1 })

        const stopHover = hoverScale(cards, { scale: 1.02, y: -4, duration: 0.35 })
        return () => stopHover && stopHover()
    }, { scope: gridRef })

    return (
        <div className='px-6 my-20 max-w-6xl mx-auto'>
            <Title visibleButton={false} title='Our Specifications' description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free." />

            <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-10 mt-26'>
                {
                    ourSpecsData.map((spec, index) => {
                        return (
                            <div data-spec-card className='relative h-44 px-8 flex flex-col items-center justify-center w-full text-center border rounded-lg group' style={{ backgroundColor: spec.accent + 10, borderColor: spec.accent + 30 }} key={index}>
                                <h3 className='text-slate-800 font-medium'>{spec.title}</h3>
                                <p className='text-sm text-slate-600 mt-3'>{spec.description}</p>
                                <div className='absolute -top-5 text-white size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition' style={{ backgroundColor: spec.accent }}>
                                    <spec.icon size={20} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default OurSpecs