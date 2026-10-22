import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { qualities: [75, 80, 85] },
};
export default config;
