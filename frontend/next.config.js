/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        OPENAPI_KEY: process.env.OPENAPI_KEY
    }
}

module.exports = nextConfig
