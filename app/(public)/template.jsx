'use client'

import { useRef } from 'react'
import { gsap, prefersReducedMotion, useGsap } from '@/lib/animations'

// Templates re-mount on every navigation within the (public) segment, which
// gives each page a very fast, subtle entrance — no custom router required.
export default function PublicTemplate({ children }) {
    const rootRef = useRef(null)

    useGsap((el) => {
        if (prefersReducedMotion()) return
        gsap.fromTo(
            el,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out', clearProps: 'transform' }
        )
    }, { scope: rootRef })

    return <div ref={rootRef}>{children}</div>
}
