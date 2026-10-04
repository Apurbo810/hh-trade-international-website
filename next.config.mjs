/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Let Next.js / Vercel resize and transcode images to AVIF/WebP.
        // Serving the original multi-megabyte PNG/JPEG files straight to a phone
        // makes the browser decode huge full-resolution bitmaps, which exhausts
        // mobile memory and can crash the page renderer.
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
        imageSizes: [64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30
    }
};

export default nextConfig;
