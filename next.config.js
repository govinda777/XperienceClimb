/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'picsum.photos',
      'via.placeholder.com',
      'imgur.com',
      'i.imgur.com',
      'cloudinary.com',
      'res.cloudinary.com',
      'amazonaws.com',
      's3.amazonaws.com',
      'googleusercontent.com',
      'lh3.googleusercontent.com',
      'facebook.com',
      'fbcdn.net',
      'instagram.com',
      'cdninstagram.com',
      'flickr.com',
      'staticflickr.com',
      'pexels.com',
      'images.pexels.com',
      'pixabay.com',
      'cdn.pixabay.com',
      'freepik.com',
      'img.freepik.com',
      'shutterstock.com',
      'image.shutterstock.com',
      'gettyimages.com',
      'media.gettyimages.com',
      'istockphoto.com',
      'media.istockphoto.com',
      'adobe.com',
      'cc-api-storage.adobe.com',
      '500px.com',
      'drscdn.500px.org',
      'deviantart.com',
      'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
      'behance.net',
      'mir-s3-cdn-cf.behance.net',
      'dribbble.com',
      'cdn.dribbble.com',
      'artstation.com',
      'cdnb.artstation.com',
      'cdn.artstation.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
