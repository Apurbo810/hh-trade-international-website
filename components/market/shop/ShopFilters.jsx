'use client'

import { useEffect, useMemo, useState } from 'react'
import {
    ChevronDown,
    ChevronUp,
    RotateCcw,
} from 'lucide-react'
import {
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation'

const SORT_OPTIONS = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
]

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

function getCategoryValues(product) {
    if (Array.isArray(product.category)) {
        return product.category.filter(Boolean)
    }

    if (product.category) {
        return [product.category]
    }

    return []
}

export default function ShopFilters({ products = [] }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedBrand = searchParams.get('brand') || ''
    const selectedCategory = searchParams.get('category') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    const selectedSort =
        searchParams.get('sort') || 'featured'

    const [openSections, setOpenSections] = useState({
        brand: false,
        category: false,
        price: false,
    })

    const [minValue, setMinValue] = useState(minPrice)
    const [maxValue, setMaxValue] = useState(maxPrice)

    /*
     * Keep local price inputs synced with URL.
     */
    useEffect(() => {
        setMinValue(minPrice)
        setMaxValue(maxPrice)
    }, [minPrice, maxPrice])

    /*
     * Get every unique brand from products.
     */
    const brands = useMemo(() => {
        return [
            ...new Set(
                products
                    .map((product) => product.brand)
                    .filter(Boolean)
            ),
        ].sort((a, b) =>
            a.localeCompare(b)
        )
    }, [products])

    /*
     * Get every unique category from products.
     */
    const categories = useMemo(() => {
        return [
            ...new Set(
                products.flatMap(getCategoryValues)
            ),
        ].sort((a, b) =>
            a.localeCompare(b)
        )
    }, [products])

    /*
     * Find maximum product price.
     */
    const maxProductPrice = useMemo(() => {
        if (!products.length) return 0

        return Math.max(
            ...products.map(getProductPrice)
        )
    }, [products])

    const priceRanges = [
        {
            label: 'Under ৳1,000',
            min: '',
            max: '1000',
        },
        {
            label: '৳1,000 – ৳2,500',
            min: '1000',
            max: '2500',
        },
        {
            label: '৳2,500 – ৳5,000',
            min: '2500',
            max: '5000',
        },
        {
            label: '৳5,000+',
            min: '5000',
            max: '',
        },
    ]

    const toggleSection = (section) => {
        setOpenSections((previous) => ({
            ...previous,
            [section]: !previous[section],
        }))
    }

    const updateParams = (updates) => {
        const params = new URLSearchParams(searchParams)

        Object.entries(updates).forEach(
            ([key, value]) => {
                if (
                    value === null ||
                    value === undefined ||
                    value === ''
                ) {
                    params.delete(key)
                } else {
                    params.set(key, value)
                }
            }
        )

        /*
         * Any filter change starts pagination from page 1.
         */
        params.delete('page')

        router.push(
            `${pathname}?${params.toString()}`
        )
    }

    const handleBrandChange = (brand) => {
        updateParams({
            brand:
                selectedBrand === brand
                    ? ''
                    : brand,
        })
    }

    const handleCategoryChange = (category) => {
        updateParams({
            category:
                selectedCategory === category
                    ? ''
                    : category,
        })
    }

    const handlePriceRange = (range) => {
        setMinValue(range.min)
        setMaxValue(range.max)

        updateParams({
            minPrice: range.min,
            maxPrice: range.max,
        })
    }

    const handleMinPrice = (value) => {
        setMinValue(value)
    }

    const handleMaxPrice = (value) => {
        setMaxValue(value)
    }

    const applyCustomPrice = () => {
        updateParams({
            minPrice: minValue,
            maxPrice: maxValue,
        })
    }

    const clearAll = () => {
        const params = new URLSearchParams()

        const search = searchParams.get('search')

        if (search) {
            params.set('search', search)
        }

        setMinValue('')
        setMaxValue('')

        router.push(
            `${pathname}?${params.toString()}`
        )
    }

    const hasFilters =
        selectedBrand ||
        selectedCategory ||
        minPrice ||
        maxPrice

    return (
        <aside className="sticky top-24 h-fit w-full">
            <div className="rounded-2xl border border-slate-200 bg-white">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                            Filters
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500">
                            Refine your products
                        </p>
                    </div>

                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clearAll}
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            <RotateCcw size={13} />
                            Clear
                        </button>
                    )}
                </div>

                {/* Brand */}
                <div className="border-b border-slate-200">
                    <button
                        type="button"
                        onClick={() =>
                            toggleSection('brand')
                        }
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                        <span className="text-sm font-semibold text-slate-800">
                            {openSections.brand
                                ? '− Brand'
                                : '+ Brand'}
                        </span>

                        {openSections.brand ? (
                            <ChevronUp
                                size={16}
                                className="text-slate-400"
                            />
                        ) : (
                            <ChevronDown
                                size={16}
                                className="text-slate-400"
                            />
                        )}
                    </button>

                    {openSections.brand && (
                        <div className="max-h-72 overflow-y-auto px-5 pb-5">
                            <div className="space-y-1">
                                {brands.map((brand) => {
                                    const active =
                                        selectedBrand === brand

                                    return (
                                        <button
                                            key={brand}
                                            type="button"
                                            onClick={() =>
                                                handleBrandChange(
                                                    brand
                                                )
                                            }
                                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                                active
                                                    ? 'bg-slate-900 font-medium text-white'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                        >
                                            <span>
                                                {brand}
                                            </span>

                                            {active && (
                                                <span className="text-xs">
                                                    ✓
                                                </span>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>

                            {brands.length === 0 && (
                                <p className="text-sm text-slate-400">
                                    No brands available
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Category */}
                <div className="border-b border-slate-200">
                    <button
                        type="button"
                        onClick={() =>
                            toggleSection('category')
                        }
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                        <span className="text-sm font-semibold text-slate-800">
                            {openSections.category
                                ? '− Category'
                                : '+ Category'}
                        </span>

                        {openSections.category ? (
                            <ChevronUp
                                size={16}
                                className="text-slate-400"
                            />
                        ) : (
                            <ChevronDown
                                size={16}
                                className="text-slate-400"
                            />
                        )}
                    </button>

                    {openSections.category && (
                        <div className="max-h-64 overflow-y-auto px-5 pb-5">
                            <div className="space-y-1">
                                {categories.map(
                                    (category) => {
                                        const active =
                                            selectedCategory ===
                                            category

                                        return (
                                            <button
                                                key={
                                                    category
                                                }
                                                type="button"
                                                onClick={() =>
                                                    handleCategoryChange(
                                                        category
                                                    )
                                                }
                                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                                    active
                                                        ? 'bg-slate-900 font-medium text-white'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                            >
                                                <span>
                                                    {
                                                        category
                                                    }
                                                </span>

                                                {active && (
                                                    <span className="text-xs">
                                                        ✓
                                                    </span>
                                                )}
                                            </button>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="border-b border-slate-200">
                    <button
                        type="button"
                        onClick={() =>
                            toggleSection('price')
                        }
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                        <span className="text-sm font-semibold text-slate-800">
                            {openSections.price
                                ? '− Price Range'
                                : '+ Price Range'}
                        </span>

                        {openSections.price ? (
                            <ChevronUp
                                size={16}
                                className="text-slate-400"
                            />
                        ) : (
                            <ChevronDown
                                size={16}
                                className="text-slate-400"
                            />
                        )}
                    </button>

                    {openSections.price && (
                        <div className="px-5 pb-5">
                            <div className="space-y-1">
                                {priceRanges.map(
                                    (range) => {
                                        const active =
                                            minPrice ===
                                                range.min &&
                                            maxPrice ===
                                                range.max

                                        return (
                                            <button
                                                key={
                                                    range.label
                                                }
                                                type="button"
                                                onClick={() =>
                                                    handlePriceRange(
                                                        range
                                                    )
                                                }
                                                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                                    active
                                                        ? 'bg-slate-900 font-medium text-white'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                            >
                                                {
                                                    range.label
                                                }
                                            </button>
                                        )
                                    }
                                )}
                            </div>

                            <div className="mt-4 border-t border-slate-100 pt-4">
                                <p className="mb-3 text-xs font-medium text-slate-500">
                                    Custom price
                                </p>

                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        min="0"
                                        value={minValue}
                                        onChange={(event) =>
                                            handleMinPrice(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Min"
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-slate-400"
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        value={maxValue}
                                        onChange={(event) =>
                                            handleMaxPrice(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Max"
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-slate-400"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        applyCustomPrice
                                    }
                                    className="mt-2 w-full rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-800"
                                >
                                    Apply Price
                                </button>
                            </div>

                            {maxProductPrice > 0 && (
                                <p className="mt-3 text-[11px] text-slate-400">
                                    Products up to ৳
                                    {maxProductPrice.toLocaleString()}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Sort */}
                <div className="px-5 py-4">
                    <label className="mb-2 block text-xs font-medium text-slate-500">
                        Sort by
                    </label>

                    <select
                        value={selectedSort}
                        onChange={(event) =>
                            updateParams({
                                sort: event.target.value,
                            })
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400"
                    >
                        {SORT_OPTIONS.map(
                            (option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>
        </aside>
    )
}