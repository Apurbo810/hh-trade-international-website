'use client'

import { Suspense, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'

import ShopHeader from '@/components/market/shop/ShopHeader'
import ShopProductGrid from '@/components/market/shop/ShopProductGrid'
import ShopPagination from '@/components/market/shop/ShopPagination'

const PRODUCTS_PER_PAGE = 12

function ShopContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const search = searchParams.get('search') || ''

    const products = useSelector(
        (state) => state.product.list
    )

    const [currentPage, setCurrentPage] = useState(1)

    const filteredProducts = useMemo(() => {
        if (!search) return products

        return products.filter((product) =>
            product.name
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [products, search])

    const totalPages = Math.ceil(
        filteredProducts.length / PRODUCTS_PER_PAGE
    )

    const safePage = Math.min(
        currentPage,
        Math.max(totalPages, 1)
    )

    const startIndex =
        (safePage - 1) * PRODUCTS_PER_PAGE

    const paginatedProducts =
        filteredProducts.slice(
            startIndex,
            startIndex + PRODUCTS_PER_PAGE
        )

    const handlePageChange = (page) => {
        setCurrentPage(page)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const handleBack = () => {
        setCurrentPage(1)
        router.push('/shop')
    }

    return (
        <main className="min-h-[70vh] px-6">
            <div className="mx-auto max-w-7xl py-8 sm:py-12">
                <ShopHeader
                    search={search}
                    onBack={handleBack}
                />

                {/* Product count */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        Showing{' '}
                        <span className="font-medium text-slate-700">
                            {filteredProducts.length === 0
                                ? 0
                                : startIndex + 1}
                            –
                            {Math.min(
                                startIndex +
                                    paginatedProducts.length,
                                filteredProducts.length
                            )}
                        </span>{' '}
                        of{' '}
                        <span className="font-medium text-slate-700">
                            {filteredProducts.length}
                        </span>{' '}
                        products
                    </p>
                </div>

                <ShopProductGrid
                    products={paginatedProducts}
                />

                <ShopPagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </main>
    )
}

export default function Shop() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[60vh] items-center justify-center text-sm text-slate-500">
                    Loading shop...
                </div>
            }
        >
            <ShopContent />
        </Suspense>
    )
}