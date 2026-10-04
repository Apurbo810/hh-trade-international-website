'use client'

import { useRef } from 'react'
import ProductCard from '@/components/market/share/ProductCard'
import { revealCards, select, useGsap } from '@/lib/animations'

const ShopProductGrid = ({ products }) => {
    const rootRef = useRef(null)

    useGsap(
        (el) => {
            const cards = select(
                el,
                '[data-shop-card]'
            )

            if (!cards.length) return

            revealCards(cards, {
                trigger: el,
                start: 'top 88%',
            })
        },
        {
            scope: rootRef,
            dependencies: [products],
        }
    )

    if (!products.length) {
        return (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-200">
                <div className="text-center">
                    <p className="text-lg font-medium text-slate-700">
                        No products found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Try searching for something else.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div
            ref={rootRef}
            className="
                grid
                grid-cols-2
                gap-x-4
                gap-y-10
                sm:grid-cols-3
                sm:gap-x-5
                lg:grid-cols-4
                lg:gap-x-6
                lg:gap-y-12
            "
        >
            {products.map((product) => (
                <div
                    key={product.id}
                    data-shop-card
                    className="min-w-0"
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    )
}

export default ShopProductGrid