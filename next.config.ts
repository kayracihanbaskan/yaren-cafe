import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  reactStrictMode: true,
  redirects: async () => [{ source: "/", destination: "/tr", permanent: true }],
  images: { qualities: [75, 80, 85] },
};
export default config;
