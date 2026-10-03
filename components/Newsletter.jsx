'use client'
import React, { useRef } from 'react'
import Title from './Title'
import { buttonPress, revealScale, useGsap } from '@/lib/animations'

const Newsletter = () => {

    const rootRef = useRef(null)

    useGsap((el) => {
        const form = el.querySelector('[data-newsletter-form]')
        const button = el.querySelector('[data-newsletter-btn]')

        revealScale(form, { trigger: el, y: 20, scale: 0.97, duration: 0.7 })

        const stopButton = buttonPress(button)
        return () => stopButton && stopButton()
    }, { scope: rootRef })

    return (
        <div ref={rootRef} className='flex flex-col items-center mx-4 my-36'>
            <Title title="Join Newsletter" description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week." visibleButton={false} />
            <div data-newsletter-form className='flex bg-slate-100 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white ring ring-slate-200'>
                <input className='flex-1 pl-5 outline-none' type="text" placeholder='Enter your email address' />
                <button data-newsletter-btn className='font-medium bg-brand text-white px-7 py-3 rounded-full hover:bg-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2'>Get Updates</button>
            </div>
        </div>
    )
}

export default Newsletter