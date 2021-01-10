const nodeExternals = require('webpack-node-externals')
const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin')

const pwaOptions = {
  default: {
    manifestOptions: {
      short_name: 'strapi-starter-gridsome-blog',
      description: 'a dedicated developer blog',
      display: 'standalone',
      gcm_sender_id: process.env.GCM_SENDER_ID,
      start_url: '/',
      categories: ['education'],
      lang: 'en-GB',
      dir: 'auto'
    },
    appleMobileWebAppStatusBarStyle: 'default',
    manifestPath: 'manifest.json',
    icon: { appleMaskIcon: { url: './safari-pinned-tab.svg' } },
    msTileColor: '#00a672',
    workboxOptions: {
      cacheId: 'strapi-starter-gridsome-blog-pwa',
      globPatterns: ['assets/@(js|css)/*', 'index.html'],
      skipWaiting: true,
      // exclude: [/OneSignal.*\.js$/],
    }
  },
  injectManifest: {
    workboxPluginMode: 'injectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js',
      globPatterns: ['assets/@(js|css)/*', 'index.html']
    },
    workboxCompileSrc: [
      new SplitChunksPlugin({
        cacheGroups: {
          workbox: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial'
          }
        }
      })
    ]
  }
}

let robots = [{ userAgent: '*', disallow: '/' }];
if (process.env.GRIDSOME_ENV === "production") {
  robots = [{ userAgent: '*', allow: '/' }];
}

module.exports = {
  siteName: 'strapi-starter-gridsome-blog',
  siteUrl: process.env.GRIDSOME_BASE_URL,
  titleTemplate: '%s - gridsome strapi blog',
  siteDescription: 'a dedicated developer blog 🚀.',

  chainWebpack(config, { isServer }) {
    config.module.rules.delete('svg')
    config.module.rule('svg')
      .test(/\.svg$/)
      .use('vue')
      .loader('vue-loader')
        .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader')

    if (isServer) {
      config.externals(nodeExternals({
        whitelist: [
          /\.css$/,
          /\?vue&type=style/,
          /vue-instantsearch/,
          /instantsearch.js/,
          /typeface-league-spartan/
         ]
      }))
    }
  },

  templates: {
    // BlogPost: '/blog/:year/:month/:day/:slug',
    // Contributor: '/contributor/:id',
    // Starter: '/starters/:title',
    // Platform: '/starters/platContributorform/:id',
    // Example: node => node.path
  },

  plugins: [
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      }
    },
    {
      use: 'gridsome-plugin-robots',
      options: {
        host: 'https://strapi-starter-gridsome-blog.netlify.com',
        sitemap: 'https://strapi-starter-gridsome-blog.netlify.com/sitemap.xml',
        policy: robots
      }
    },
    {
      use: 'gridsome-plugin-gtag',
      options: {
        config: {
              id: process.env.GOOGLE_ANALYTICS_ID
        },
      },
    },
    {
      use: '@gridsome/plugin-critical',
      options: {
        paths: ['/'],
        width: 1300,
        height: 900
      }
    },
    // {
    //   use: '@gridsome/vue-remark',
    //   options: {
    //     index: ['README'],
    //     baseDir: './docs',
    //     pathPrefix: '/docs',
    //     typeName: 'DocPage',
    //     template: './src/templates/DocPage.vue',
    //     plugins: [
    //       '@gridsome/remark-prismjs'
    //     ],
    //     remark: {
    //       autolinkHeadings: {
    //         content: {
    //           type: 'text',
    //           value: '#'
    //         }
    //       }
    //     }
    //   }
    // },
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     path: 'examples/*.md',
    //     typeName: 'Example',
    //     remark: {
    //       plugins: [
    //         '@gridsome/remark-prismjs'
    //       ]
    //     }
    //   }
    // },
    // {
    //   use: '@gridsome/source-filesystem',
    //   options: {
    //     typeName: 'BlogPost',
    //     path: './blog/*/index.md',
    //     refs: {
    //        author: 'Contributor'
    //     },
    //     remark: {
    //       plugins: [
    //         '@gridsome/remark-prismjs'
    //       ]
    //     }
    //   }
    // },

    {
      use: '@gridsome/source-graphql',
      options: {
        url: (process.env.GRIDSOME_STRAPI_URL || "http://localhost:1337") + "/graphql",
        fieldName: 'strapi',
        typeName: 'strapiTypes'
      }
    },
    {
      use: '@allanchain/gridsome-plugin-pwa',
      options: pwaOptions[process.env.PWA_OPTIONS || 'default']
    }
  ]
}
