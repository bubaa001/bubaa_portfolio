/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  async redirects() {
    return [{ source: "/demos/saas-landing", destination: "/demos/landing/saas", permanent: true }];
  },
};
export default nextConfig;
