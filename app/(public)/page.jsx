'use client'
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Below-the-fold sections are code-split and loaded lazily on the client.
const SectionSkeleton = () => (
    <div className="flex items-center justify-center py-24">
        <div className="w-9 h-9 rounded-full border-3 border-gray-200 border-t-brand animate-spin"></div>
    </div>
);

const LatestProducts = dynamic(() => import("@/components/LatestProducts"), { ssr: false, loading: () => <SectionSkeleton /> });
const BestSelling = dynamic(() => import("@/components/BestSelling"), { ssr: false, loading: () => <SectionSkeleton /> });
const OurSpecs = dynamic(() => import("@/components/OurSpec"), { ssr: false, loading: () => <SectionSkeleton /> });
const Newsletter = dynamic(() => import("@/components/Newsletter"), { ssr: false, loading: () => <SectionSkeleton /> });

export default function Home() {
    return (
        <div>
            <Hero />
            <LatestProducts />
            <BestSelling />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}
