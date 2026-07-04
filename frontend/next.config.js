/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    unoptimized: true,
  },
  rewrites: async () => {
    // Proxy /api/* to the FastAPI server when running locally or in Docker.
    // On Vercel this is left empty; the platform routes /api/* to the Python
    // serverless function (see vercel.json).
    const apiTarget =
      process.env.API_PROXY_TARGET ||
      (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '')
    return apiTarget
      ? [{ source: '/api/:path*', destination: `${apiTarget}/api/:path*` }]
      : []
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
}

module.exports = nextConfig