import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.js');
export default withNextIntl(nextConfig);
