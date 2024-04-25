/** @type {import('next').NextConfig} */

const nextConfig = {
    poweredByHeader: false,
    generateEtags: false,
    productionBrowserSourceMaps: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
        ],
    },
};

module.exports = nextConfig;
