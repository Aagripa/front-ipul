const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/authentication/login',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
