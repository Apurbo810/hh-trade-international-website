'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from './gsap'

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Runs GSAP code inside a scoped `gsap.context()` and reverts it on unmount.
 * This keeps things clean under React Strict Mode and on route changes, and
 * means every tween created in the callback is automatically destroyed.
 *
 * @param {(scope: HTMLElement) => (void | (() => void))} callback
 *        Receives the scope element. May return a cleanup function
 *        (for example to detach the event listeners created by hover helpers).
 * @param {{ scope?: { current: HTMLElement | null }, dependencies?: any[] }} options
 * @returns the ref that must be attached to the component's root element.
 */
export function useGsap(callback, { scope, dependencies = [] } = {}) {
    const fallbackRef = useRef(null)
    const ref = scope || fallbackRef

    useIsomorphicLayoutEffect(() => {
        const element = ref.current
        if (!element) return

        let cleanup
        const ctx = gsap.context(() => {
            cleanup = callback(element)
        }, element)

        return () => {
            if (typeof cleanup === 'function') cleanup()
            ctx.revert()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)

    return ref
}
