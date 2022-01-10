const path = require('path');
const root = 'https://www.example.com';
const seoTitle = 'Title';
const seoDescription = 'Description';
const seoImage = `${root}/ogimage.png`;
const ogSiteName = 'Site Name';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
  title: seoTitle,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport',   content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'googlebot', content: 'noindex, nofollow' },
    { hid: 'author', name: 'author', content: 'Patreon' },
    { hid: 'description', name: 'description', content: seoDescription },
    { property: 'og:site_name', content: ogSiteName },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:type', content: 'website' },
    { hid: 'ogTitle', property: 'og:title', content: seoTitle },
    { hid: 'ogDescription', property: 'og:description', content: seoDescription },
    { hid: 'ogImage', property: 'og:image', content: seoImage },
    { hid: 'ogSecureImage', property: 'og:image:secure_url', content: seoImage },
    { property: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitterTitle', property: 'twitter:title', content: ogSiteName },
    { hid: 'twitterDescription', property: 'twitter:description', content: seoDescription },
    { hid: 'twitterImage', property: 'twitter:image', content: seoImage }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon-32.png' },
    { rel: 'icon', type: 'image/png', href: '/favicon-32.png' },
    { rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '16x16' },
    { rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '96x96' },
    { rel: 'apple-touch-icon', href: '/touch-icon-152.png' },
    { rel: 'apple-touch-icon', href: '/touch-icon-152.png', sizes: '152x152' },
    { rel: 'apple-touch-icon', href: '/touch-icon-152.png', sizes: '167x167' },
    { rel: 'apple-touch-icon', href: '/touch-icon-152.png', sizes: '180x180' }
  ],
  script: [
    { src: 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver', body: true }
  ]
},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/tailwind.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/locomotiveScroll.client.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sanity/module'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {}
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-purgecss'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    postcss: {
      plugins: { tailwindcss: path.resolve(__dirname, './tailwind.config.js') }
    }
  }
}
