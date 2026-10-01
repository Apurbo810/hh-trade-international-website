import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import SmoothScroll from "@/components/SmoothScroll";
// Self-hosted Outfit font (no build-time fetch from Google Fonts).
import "@fontsource-variable/outfit";
import "./globals.css";

export const metadata = {
    title: "H.H. Trade International",
    description: "Shop quality products from H.H. Trade International.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <StoreProvider>
                    <Toaster />
                    <SmoothScroll>{children}</SmoothScroll>
                </StoreProvider>
            </body>
        </html>
    );
}
