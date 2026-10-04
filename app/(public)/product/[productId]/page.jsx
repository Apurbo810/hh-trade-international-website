'use client'
import dynamic from "next/dynamic";
import ProductDetails from "@/components/market/share/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLenis } from "lenis/react";

// Lazily load the below-the-fold description/reviews section.
const ProductDescription = dynamic(() => import("@/components/market/share/ProductDescription"), {
    ssr: false,
    loading: () => <div className="py-24" />,
});

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);
    const lenis = useLenis();

    const fetchProduct = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        } else {
            window.scrollTo(0, 0)
        }
    }, [productId, products, lenis]);

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrums */}
                <div className="  text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product?.category}
                </div>

                {/* Product Details */}
                {product && (<ProductDetails product={product} />)}

                {/* Description & Reviews */}
                {product && (<ProductDescription product={product} />)}
            </div>
        </div>
    );
}