/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose", // required to make Konva & react-konva work
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }] // required to make Konva & react-konva work
    return config
  },
  images: {
    remotePatterns: [
      {
        hostname: "calculating-dragon-48.convex.cloud",
      },
      {
        hostname: "groovy-hamster-385.convex.cloud",
      },
    ],
  },
  // Already doing linting and typechecking as separate tasks in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig
