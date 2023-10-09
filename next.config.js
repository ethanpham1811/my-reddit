/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'robohash.org', 'picsum.photos', 'atmlrrpvxwcbwwhukbze.supabase.co'],
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig
