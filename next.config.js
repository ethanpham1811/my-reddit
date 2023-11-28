/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
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
