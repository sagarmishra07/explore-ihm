/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
    '@babel/preset-react',

]);

const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        dangerouslyAllowSVG: true,
        domains: [

            'firebasestorage.googleapis.com'
        ],
        unoptimized: true
    },
    enableSvg: true,
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
        };
    },
}

module.exports = withTM(nextConfig);
