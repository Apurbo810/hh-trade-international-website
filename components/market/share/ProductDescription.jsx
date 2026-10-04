'use client'

import { addToCart } from "@/lib/features/cart/cartSlice"
import {
    TagIcon,
    EarthIcon,
    CreditCardIcon,
    UserIcon
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import Image from "next/image"
import Counter from "../../Counter"
import { useDispatch, useSelector } from "react-redux"
import { buttonPress, EASE, gsap, hoverScale, select, useGsap } from "@/lib/animations"

const ProductDetails = ({ product }) => {

    const productId = product.id
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const cart = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch()
    const router = useRouter()

    /*
     * ---------------------------------------
     * COLORS
     * ---------------------------------------
     */
    const colors = product.colors || []

    const firstColor = colors[0]

    const getColorImages = (color) => {
        if (!color) return product.images || []

        if (Array.isArray(color.images) && color.images.length > 0) {
            return color.images
        }

        if (color.image) {
            return [color.image]
        }

        return product.images || []
    }

    const [selectedColor, setSelectedColor] = useState(firstColor)

    const initialImages = getColorImages(firstColor)

    const [colorImages, setColorImages] = useState(initialImages)
    const [mainImage, setMainImage] = useState(
        initialImages[0] || product.images?.[0]
    )

    /*
     * ---------------------------------------
     * COLOR HANDLER
     * ---------------------------------------
     */
    const handleColorChange = (color) => {
        setSelectedColor(color)

        const images = getColorImages(color)

        setColorImages(images)
        setMainImage(images[0] || product.images?.[0])
    }

    /*
     * ---------------------------------------
     * CART
     * ---------------------------------------
     */
    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const isInCart = Boolean(cart[productId])

    /*
     * ---------------------------------------
     * DISCOUNT
     * ---------------------------------------
     */
    const discount =
        product.mrp && product.mrp > product.price
            ? Math.round(
                ((product.mrp - product.price) / product.mrp) * 100
            )
            : 0

    const rootRef = useRef(null)
    const prevImage = useRef(mainImage)

    // Staggered product-page entrance, revealed once as the section scrolls in.
    useGsap((el) => {
        const thumbs = select(el, '[data-pd="thumbs"] > button')
        const main = select(el, '[data-pd="main"]')
        const title = select(el, '[data-pd="title"]')
        const price = select(el, '[data-pd="price"]')
        const colorsBlock = select(el, '[data-pd="colors"]')
        const cart = select(el, '[data-pd="cart"]')
        const benefits = select(el, '[data-pd="benefits"] > p')
        const image = el.querySelector('[data-pd="mainimg"]')
        const button = el.querySelector('[data-pd="add-to-cart"]')

        const tl = gsap.timeline({
            defaults: { ease: EASE.out, duration: 0.6 },
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        })
        tl.from(thumbs, { y: 16, opacity: 0, stagger: 0.06 })
            .from(main, { scale: 0.96, opacity: 0, duration: 0.7 }, '-=0.45')
            .from(title, { y: 18, opacity: 0 }, '-=0.4')
            .from(price, { y: 14, opacity: 0 }, '-=0.45')
            .from(colorsBlock, { y: 14, opacity: 0 }, '-=0.4')
            .from(cart, { y: 16, opacity: 0 }, '-=0.4')
            .from(benefits, { y: 12, opacity: 0, stagger: 0.07 }, '-=0.45')

        const stopImageHover = hoverScale(image, { scale: 1.05, duration: 0.4 })
        const stopButton = buttonPress(button)

        return () => {
            stopImageHover && stopImageHover()
            stopButton && stopButton()
        }
    }, { scope: rootRef })

    // Fade the main image in whenever a new image / colour is selected.
    useGsap((el) => {
        if (prevImage.current === mainImage) return
        prevImage.current = mainImage

        const image = el.querySelector('[data-pd="mainimg"]')
        if (image) {
            gsap.fromTo(image, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        }
    }, { scope: rootRef, dependencies: [mainImage] })

    return (
        <div ref={rootRef} className="flex max-lg:flex-col gap-12">

            {/* =====================================
                PRODUCT IMAGES
            ====================================== */}
            <div className="flex max-sm:flex-col-reverse gap-3">

                {/* Thumbnails */}
                <div data-pd="thumbs" className="flex sm:flex-col gap-3">

                    {colorImages.map((image, index) => (
                        <button
                            type="button"
                            key={`${image}-${index}`}
                            onClick={() => setMainImage(image)}
                            className={`bg-slate-100 flex items-center justify-center size-20 sm:size-26 rounded-lg group cursor-pointer overflow-hidden transition-shadow ${
                                mainImage === image
                                    ? 'ring-2 ring-brand'
                                    : 'hover:ring-1 hover:ring-slate-300'
                            }`}
                        >
                            <Image
                                src={image}
                                className="max-h-16 sm:max-h-20 w-auto object-contain group-hover:scale-105 transition"
                                alt={`${product.name} ${index + 1}`}
                                width={100}
                                height={100}
                            />
                        </button>
                    ))}

                </div>

                {/* Main Image */}
                <div data-pd="main" className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg overflow-hidden">

                    {mainImage && (
                        <Image
                            data-pd="mainimg"
                            src={mainImage}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="max-h-[90%] w-auto object-contain"
                        />
                    )}

                </div>

            </div>


            {/* =====================================
                PRODUCT INFORMATION
            ====================================== */}
            <div className="flex-1">

                {/* Product Name */}
                <h1 data-pd="title" className="text-3xl font-semibold text-slate-800">
                    {product.name}
                </h1>


                {/* =================================
                    PRICE
                ================================== */}
                <div data-pd="price" className="flex items-center gap-3 mt-5">

                    <p className="text-brand text-2xl font-semibold">
                        {currency}
                        {product.price}
                    </p>

                    {product.mrp > product.price && (
                        <p className="text-lg text-slate-400 line-through">
                            {currency}
                            {product.mrp}
                        </p>
                    )}

                </div>


                {/* Discount */}
                {discount > 0 && (
                    <div className="flex items-center gap-2 mt-4 text-brand-dark font-medium">

                        <TagIcon size={15} />

                        <p>
                            Save {discount}% right now
                        </p>

                    </div>
                )}


                {/* =================================
                    COLORS
                ================================== */}
                {colors.length > 0 && (
                    <div data-pd="colors" className="mt-8">

                        <div className="flex items-center gap-2 mb-3">

                            <p className="text-sm font-medium text-slate-800">
                                Color:
                            </p>

                            <p className="text-sm text-slate-500">
                                {selectedColor?.name}
                            </p>

                        </div>


                        <div className="flex flex-wrap gap-3">

                            {colors.map((color, index) => {

                                const isSelected =
                                    selectedColor === color

                                return (
                                    <button
                                        key={
                                            color.id ||
                                            color.name ||
                                            index
                                        }
                                        type="button"
                                        title={color.name}
                                        onClick={() =>
                                            handleColorChange(color)
                                        }
                                        className={`size-9 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                                            isSelected
                                                ? 'border-slate-800 scale-110'
                                                : 'border-transparent hover:scale-110'
                                        }`}
                                    >

                                        <span
                                            className="size-7 rounded-full border border-slate-200"
                                            style={{
                                                backgroundColor:
                                                    color.hex ||
                                                    color.value ||
                                                    '#D1D5DB'
                                            }}
                                        />

                                    </button>
                                )
                            })}

                        </div>

                    </div>
                )}


                {/* =================================
                    CART
                ================================== */}
                <div data-pd="cart" className="flex items-end gap-5 mt-10">

                    {isInCart && (
                        <div className="flex flex-col gap-3">

                            <p className="text-lg text-slate-800 font-semibold">
                                Quantity
                            </p>

                            <Counter productId={productId} />

                        </div>
                    )}

                    <button
                        type="button"
                        data-pd="add-to-cart"
                        onClick={() =>
                            !isInCart
                                ? addToCartHandler()
                                : router.push('/cart')
                        }
                        className="bg-brand text-white px-10 py-3 text-sm font-medium rounded hover:bg-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                    >
                        {!isInCart
                            ? 'Add to Cart'
                            : 'View Cart'}
                    </button>

                </div>


                {/* Divider */}
                <hr className="border-gray-300 my-6" />


                {/* =================================
                    BENEFITS
                ================================== */}
                <div data-pd="benefits" className="flex flex-col gap-4 text-slate-500">

                    <p className="flex items-center gap-3">
                        <EarthIcon
                            size={20}
                            className="text-slate-400"
                        />
                        Free shipping worldwide
                    </p>

                    <p className="flex items-center gap-3">
                        <CreditCardIcon
                            size={20}
                            className="text-slate-400"
                        />
                        100% Secured Payment
                    </p>

                    <p className="flex items-center gap-3">
                        <UserIcon
                            size={20}
                            className="text-slate-400"
                        />
                        Trusted by top brands
                    </p>

                </div>

            </div>

        </div>
    )
}

export default ProductDetails
