/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  compiler: {
    styledComponents: {
      ssr: true
    }
  },
}

module.exports = nextConfig
