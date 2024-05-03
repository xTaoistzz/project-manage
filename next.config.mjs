import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACK_URL : 'http://localhost:5000'
    },
    images: {
        remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '5000',
            // pathname: `/img/**`  
        }
        ]
    }
};

export default nextConfig;
