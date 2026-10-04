'use client'

import { MoveLeftIcon, SearchIcon } from 'lucide-react'

const ShopHeader = ({ search, onBack }) => {
    return (
        <div className="mb-10 flex items-end justify-between gap-4">
            <div>
                <button
                    type="button"
                    onClick={search ? onBack : undefined}
                    className={`
                        flex
                        items-center
                        gap-2
                        text-3xl
                        font-medium
                        tracking-tight
                        text-slate-800
                        ${search ? 'cursor-pointer hover:text-brand' : 'cursor-default'}
                    `}
                >
                    {search && <MoveLeftIcon size={24} />}
                    All <span className="text-slate-500">Products</span>
                </button>

                <p className="mt-2 text-sm text-slate-500">
                    {search
                        ? `Search results for "${search}"`
                        : 'Explore our complete collection'}
                </p>
            </div>

            {search && (
                <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 sm:flex">
                    <SearchIcon size={16} />
                    {search}
                </div>
            )}
        </div>
    )
}

export default ShopHeader