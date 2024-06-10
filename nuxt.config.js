import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/flashlight/'
  },
  generate: {
    dir: 'docs'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'おもちゃばこ',
    title: 'おもちゃばこ',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'Yomogi': true,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },

  pwa: {
    icon: {
      source: '/static/teddy2.png',
      fileName: 'teddy2.png'
    },
    meta: {
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: '#26c6da',
    },
    manifest: {
      lang: 'ja',
      name: 'ToyBox',
      short_name: 'ToyBox',
      description: 'ToyBox',
      display: 'standalone',
      theme_color: '#26c6da',
      background_color: '#26c6da',
      orientation: 'any',
      scope: '/flashlight/',
      start_url: '/flashlight/',
      icons: [
        {
          src: '/flashlight/teddy2.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: '^https://kentani.github.io/.*',
          handler: 'cacheFirst'
        },
        {
          urlPattern: '^https://kentani.github.io/.*',
          handler: 'staleWhileRevalidate',
          strategyOptions: {
            cacheName: 'site-cache',
          },
          strategyPlugins: [
            {
              use: 'Expiration',
              config: {
                maxAgeSeconds: 24 * 60 * 60 * 30
              }
            }
          ]
        }
      ]
    }
  },
}
