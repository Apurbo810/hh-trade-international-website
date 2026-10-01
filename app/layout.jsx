import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

export const metadata = {
    title: "H.H. Trade International",
    description: "Shop quality products from H.H. Trade International.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <StoreProvider>
                    <Toaster />
                    <SmoothScroll>{children}</SmoothScroll>
                </StoreProvider>
            </body>
        </html>
    );
}
