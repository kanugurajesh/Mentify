/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'res.cloudinary.com', "replicate.delivery", "storage.googleapis.com"],
    }
}

module.exports = nextConfig
