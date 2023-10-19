/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'rlp-proxy.herokuapp.com', 'robohash.org', 'picsum.photos', 'atmlrrpvxwcbwwhukbze.supabase.co'],
    formats: ['image/avif', 'image/webp']
  },
  exportPathMap: async function () {
    return {
      '/404': { page: '/404' }
    }
  }
}

module.exports = nextConfig
