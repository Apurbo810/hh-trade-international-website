'use client'

import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

import logo from "@/assets/logo.png";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('');
    const cartCount = useSelector(state => state.cart.total);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`);
    };

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logo}
                            alt="H.H. Trade International"
                            width={50}
                            height={50}
                            priority
                            className="w-[150px] h-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600 [&>a]:transition-colors [&>a:hover]:text-brand-dark">

                        <Link href="/">
                            Home
                        </Link>

                        <Link href="/shop">
                            Shop
                        </Link>

                        <Link href="/">
                            About
                        </Link>

                        <Link href="/">
                            Contact
                        </Link>

                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
                        >
                            <Search
                                size={18}
                                className="text-slate-600"
                            />

                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-600"
                                type="text"
                                placeholder="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                        </form>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative flex items-center gap-2 text-slate-600"
                        >
                            <ShoppingCart size={18} />

                            Cart

                            <span className="absolute -top-1 left-3 flex items-center justify-center text-[8px] text-white bg-brand size-3.5 rounded-full">
                                {cartCount}
                            </span>
                        </Link>

                        {/* Login */}
                        <button className="px-8 py-2 bg-brand hover:bg-brand-dark transition text-white rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2">
                            Login
                        </button>

                    </div>

                    {/* Mobile Login */}
                    <div className="sm:hidden">
                        <button className="px-7 py-1.5 bg-brand hover:bg-brand-dark text-sm transition text-white rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2">
                            Login
                        </button>
                    </div>

                </div>
            </div>

            <hr className="border-gray-300" />
        </nav>
    );
};

export default Navbar;