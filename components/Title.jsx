'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useRef } from 'react'
import { revealText, select, useGsap } from '@/lib/animations'

const Title = ({ title, description, visibleButton = true, href = '' }) => {

    const rootRef = useRef(null)

    useGsap((el) => {
        // Reveal the heading word-by-word for a natural, staggered entrance.
        const words = select(el, '[data-title-word]')
        revealText(words, { trigger: el, y: 18, stagger: 0.06, duration: 0.6 })

        const sub = el.querySelector('[data-title-sub]')
        if (sub) revealText(sub, { trigger: el, y: 12, duration: 0.6, delay: 0.08 })
    }, { scope: rootRef })

    const words = String(title).split(' ')

    return (
        <div ref={rootRef} className='flex flex-col items-center'>
            <h2 className='text-2xl font-semibold text-slate-800'>
                {words.map((word, index) => (
                    <React.Fragment key={index}>
                        <span data-title-word className='inline-block'>{word}</span>
                        {index < words.length - 1 ? ' ' : ''}
                    </React.Fragment>
                ))}
            </h2>
            <Link href={href} data-title-sub className='flex items-center gap-5 text-sm text-slate-600 mt-2'>
                <p className='max-w-lg text-center'>{description}</p>
                {visibleButton && <button className='text-brand flex items-center gap-1 hover:text-brand-dark transition-colors'>View more <ArrowRight size={14} /></button>}
            </Link>
        </div>
    )
}

export default Title