/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        ppr: 'incremental',
    },
    // webpack: (config, { isServer }) => {
    //     if (!isServer) {
    //         config.module.rules.push({
    //             test: /\.html$/,
    //             use: 'ignore-loader',
    //         });
    //     }
    //     return config;
    // },
};

export default nextConfig;