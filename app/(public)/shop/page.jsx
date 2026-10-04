'use client'

import {
    Suspense,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'

import ShopHeader from '@/components/market/shop/ShopHeader'
import ShopFilters from '@/components/market/shop/ShopFilters'
import ShopProductGrid from '@/components/market/shop/ShopProductGrid'
import ShopPagination from '@/components/market/shop/ShopPagination'

const PRODUCTS_PER_PAGE = 12

function getProductPrice(product) {
    if (
        typeof product.discountPrice === 'number' &&
        product.discountPrice > 0
    ) {
        return product.discountPrice
    }

    if (typeof product.price === 'number') {
        return product.price
    }

    return 0
}

function getProductRating(product) {
    if (typeof product.rating === 'number') {
        return product.rating
    }

    if (typeof product.averageRating === 'number') {
        return product.averageRating
    }

    return 0
}

function getCategoryValues(product) {
    if (Array.isArray(product.category)) {
        return product.category
    }

    if (product.category) {
        return [product.category]
    }

    return []
}

function getDateValue(value) {
    if (!value) return 0

    const time = new Date(value).getTime()

    return Number.isNaN(time) ? 0 : time
}

function ShopContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const search =
        searchParams.get('search') || ''

    const brand =
        searchParams.get('brand') || ''

    const category =
        searchParams.get('category') || ''

    const minPrice =
        searchParams.get('minPrice') || ''

    const maxPrice =
        searchParams.get('maxPrice') || ''

    const sort =
        searchParams.get('sort') || 'featured'

    const products = useSelector(
        (state) => state.product.list
    )

    const [currentPage, setCurrentPage] =
        useState(1)

    /*
     * Reset pagination whenever
     * filters/search/sorting change.
     */
    const filterKey = [
        search,
        brand,
        category,
        minPrice,
        maxPrice,
        sort,
    ].join('|')

    useEffect(() => {
        setCurrentPage(1)
    }, [filterKey])

    /*
     * Filter + sort products.
     */
    const filteredProducts = useMemo(() => {
        let result = [...products]

        /*
         * Search
         */
        if (search) {
            const query =
                search.toLowerCase()

            result = result.filter((product) => {
                const name =
                    product.name?.toLowerCase() || ''

                const productBrand =
                    product.brand?.toLowerCase() || ''

                return (
                    name.includes(query) ||
                    productBrand.includes(query)
                )
            })
        }

        /*
         * Brand
         */
        if (brand) {
            result = result.filter(
                (product) =>
                    product.brand?.toLowerCase() ===
                    brand.toLowerCase()
            )
        }

        /*
         * Category
         */
        if (category) {
            result = result.filter((product) =>
                getCategoryValues(product).some(
                    (value) =>
                        value?.toLowerCase() ===
                        category.toLowerCase()
                )
            )
        }

        /*
         * Minimum price
         */
        if (minPrice) {
            const minimum =
                Number(minPrice)

            result = result.filter(
                (product) =>
                    getProductPrice(product) >=
                    minimum
            )
        }

        /*
         * Maximum price
         */
        if (maxPrice) {
            const maximum =
                Number(maxPrice)

            result = result.filter(
                (product) =>
                    getProductPrice(product) <=
                    maximum
            )
        }

        /*
         * Sorting
         */
        result.sort((a, b) => {
            switch (sort) {
                case 'price-asc':
                    return (
                        getProductPrice(a) -
                        getProductPrice(b)
                    )

                case 'price-desc':
                    return (
                        getProductPrice(b) -
                        getProductPrice(a)
                    )

                case 'rating':
                    return (
                        getProductRating(b) -
                        getProductRating(a)
                    )

                case 'newest':
                    return (
                        getDateValue(
                            b.createdAt
                        ) -
                        getDateValue(
                            a.createdAt
                        )
                    )

                case 'featured': {
                    const featuredA =
                        a.featured ? 1 : 0

                    const featuredB =
                        b.featured ? 1 : 0

                    if (
                        featuredA !==
                        featuredB
                    ) {
                        return (
                            featuredB -
                            featuredA
                        )
                    }

                    return (
                        getDateValue(
                            b.createdAt
                        ) -
                        getDateValue(
                            a.createdAt
                        )
                    )
                }

                default:
                    return 0
            }
        })

        return result
    }, [
        products,
        search,
        brand,
        category,
        minPrice,
        maxPrice,
        sort,
    ])

    const totalPages = Math.ceil(
        filteredProducts.length /
            PRODUCTS_PER_PAGE
    )

    const safePage = Math.min(
        currentPage,
        Math.max(totalPages, 1)
    )

    const startIndex =
        (safePage - 1) *
        PRODUCTS_PER_PAGE

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
        <main className="min-h-[70vh] px-4 sm:px-6">
            <div className="mx-auto max-w-7xl py-8 sm:py-12">
                <ShopHeader
                    search={search}
                    onBack={handleBack}
                />

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
                    {/* LEFT FILTER SIDEBAR */}
                    <div>
                        <ShopFilters
                            products={products}
                        />
                    </div>

                    {/* RIGHT PRODUCT AREA */}
                    <div className="min-w-0">
                        {/* Results header */}
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-500">
                                    Showing{' '}
                                    <span className="font-medium text-slate-700">
                                        {filteredProducts.length ===
                                        0
                                            ? 0
                                            : startIndex +
                                              1}
                                        –
                                        {Math.min(
                                            startIndex +
                                                paginatedProducts.length,
                                            filteredProducts.length
                                        )}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium text-slate-700">
                                        {
                                            filteredProducts.length
                                        }
                                    </span>{' '}
                                    products
                                </p>

                                {brand && (
                                    <p className="mt-1 text-xs text-slate-400">
                                        Brand:{' '}
                                        <span className="font-medium text-slate-600">
                                            {brand}
                                        </span>
                                    </p>
                                )}

                                {category && (
                                    <p className="mt-1 text-xs text-slate-400">
                                        Category:{' '}
                                        <span className="font-medium text-slate-600">
                                            {category}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div className="hidden text-xs text-slate-400 sm:block">
                                {totalPages > 0
                                    ? `Page ${safePage} of ${totalPages}`
                                    : 'No results'}
                            </div>
                        </div>

                        <ShopProductGrid
                            products={
                                paginatedProducts
                            }
                        />

                        <ShopPagination
                            currentPage={safePage}
                            totalPages={totalPages}
                            onPageChange={
                                handlePageChange
                            }
                        />
                    </div>
                </div>
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