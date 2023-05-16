/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
    '@babel/preset-react',

]);

const nextConfig = {
    reactStrictMode: false,
    images: {
        dangerouslyAllowSVG: true,
        domains: [

            'firebasestorage.googleapis.com'
        ],
        unoptimized: true
    },
    enableSvg: true,
   
}

module.exports = withTM(nextConfig);
