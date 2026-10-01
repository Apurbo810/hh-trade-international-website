'use client'
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"

const StoreNavbar = () => {


    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative flex items-center">
                <Image src={logo} alt="H.H. Trade International" width={50} height={50} className="w-[140px] h-auto object-contain" priority />
                <p className="absolute top-1/2 -translate-y-1/2 left-full ml-2 text-xs font-semibold px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-brand">
                    Store
                </p>
            </Link>
            <div className="flex items-center gap-3">
                <p>Hi, Seller</p>
            </div>
        </div>
    )
}

export default StoreNavbar