import type { NextConfig } from "next";
import { securityHeadersConfig } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return securityHeadersConfig();
  },
};

export default nextConfig;
