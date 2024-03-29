/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  compiler: {
    styledComponents: {
      ssr: true
    }
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
