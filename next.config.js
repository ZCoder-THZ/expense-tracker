/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
}

module.exports = {
    nextConfig,
    env: {
        BASE_URL: process.env.BASE_URL,
    }
}
