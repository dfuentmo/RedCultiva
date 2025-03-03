/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Resolver el problema con módulos de Node.js en el cliente
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      stream: false,
      crypto: false,
      os: false,
      http: false,
      https: false,
      zlib: false,
    };
    
    return config;
  },
  images: {
    domains: [
      'firebasestorage.googleapis.com', 
      'res.cloudinary.com',
      'images.pexels.com'
    ],
  },
}

module.exports = nextConfig 