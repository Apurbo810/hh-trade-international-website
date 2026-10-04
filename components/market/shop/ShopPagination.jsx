'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

const ShopPagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) return null

    const getPages = () => {
        const pages = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }

            return pages
        }

        pages.push(1)

        if (currentPage > 3) {
            pages.push('...')
        }

        const start = Math.max(2, currentPage - 1)
        const end = Math.min(
            totalPages - 1,
            currentPage + 1
        )

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (currentPage < totalPages - 2) {
            pages.push('...')
        }

        pages.push(totalPages)

        return pages
    }

    const pages = getPages()

    return (
        <div className="mt-16 flex items-center justify-center gap-2">
            {/* Previous */}
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    transition
                    hover:border-brand
                    hover:bg-brand
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    disabled:hover:border-slate-200
                    disabled:hover:bg-white
                    disabled:hover:text-slate-600
                "
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </button>

            {/* Pages */}
            {pages.map((page, index) =>
                page === '...' ? (
                    <span
                        key={`dots-${index}`}
                        className="flex size-10 items-center justify-center text-slate-400"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`
                            flex
                            size-10
                            items-center
                            justify-center
                            rounded-full
                            text-sm
                            font-medium
                            transition
                            ${
                                currentPage === page
                                    ? 'bg-brand text-white shadow-sm'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand'
                            }
                        `}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    transition
                    hover:border-brand
                    hover:bg-brand
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    disabled:hover:border-slate-200
                    disabled:hover:bg-white
                    disabled:hover:text-slate-600
                "
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    )
}

export default ShopPagination