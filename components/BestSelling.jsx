'use client'
import { useRef } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { revealCards, select, useGsap } from '@/lib/animations'

const BestSelling = () => {

    const displayQuantity = 8
    const products = useSelector(state => state.product.list)

    const gridRef = useRef(null)

    useGsap((el) => {
        // Staggered card reveal as the grid scrolls into view.
        const cards = select(el, '[data-reveal="card"]')
        revealCards(cards, { trigger: el, start: 'top 88%', y: 44, scale: 0.97, stagger: 0.09, duration: 0.6 })
    }, { scope: gridRef })

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Title title='Best Selling' description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`} href='/shop' />
            <div ref={gridRef} className='mt-12  grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12'>
                {products.slice().sort((a, b) => b.rating.length - a.rating.length).slice(0, displayQuantity).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default BestSelling