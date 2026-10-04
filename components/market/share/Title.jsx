'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useRef } from 'react'
import { revealText, select, useGsap } from '@/lib/animations'

const Title = ({
    title,
    description,
    visibleButton = true,
    href = '',
}) => {
    const rootRef = useRef(null)

    useGsap(
        (el) => {
            const words = select(
                el,
                '[data-title-word]'
            )

            revealText(words, {
                trigger: el,
                y: 18,
                stagger: 0.06,
                duration: 0.6,
            })

            const sub = el.querySelector(
                '[data-title-sub]'
            )

            if (sub) {
                revealText(sub, {
                    trigger: el,
                    y: 12,
                    duration: 0.6,
                    delay: 0.08,
                })
            }
        },
        { scope: rootRef }
    )

    const words = String(title).split(' ')

    return (
        <div
            ref={rootRef}
            className="
                flex
                flex-col
                items-center
                text-center
            "
        >
            <h2
                className="
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-slate-800
                "
            >
                {words.map((word, index) => (
                    <React.Fragment key={index}>
                        <span
                            data-title-word
                            className="inline-block"
                        >
                            {word}
                        </span>

                        {index <
                            words.length - 1 &&
                            ' '}
                    </React.Fragment>
                ))}
            </h2>

            <div
                data-title-sub
                className="
                    mt-2
                    flex
                    items-center
                    gap-4
                    text-sm
                    text-slate-500
                "
            >
                <p className="max-w-lg">
                    {description}
                </p>

                {visibleButton && href && (
                    <Link
                        href={href}
                        className="
                            group
                            flex
                            shrink-0
                            items-center
                            gap-1
                            text-sm
                            font-medium
                            text-brand
                            transition-colors
                            hover:text-brand-dark
                        "
                    >
                        View more

                        <ArrowRight
                            size={14}
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Title