// Import global styles
import '~/assets/style/index.scss'

// Add global components
import Layout from '~/layouts/Default.vue'
import DocsLayout from '~/layouts/Docs.vue'
import Section from '~/components/Section.vue'
import Feature from '~/components/Feature.vue'
import Card from '~/components/Card'

import VueScrollTo from 'vue-scrollto'

import Typography from 'typography'

import VueAnime from 'vue-animejs'

import VueDisqus from 'vue-disqus'
import { VueReCaptcha } from 'vue-recaptcha-v3'


const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.6,
  scaleRatio: 1.9,
  headerFontFamily: ['Jost', 'Helvetica', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Jost', 'Helvetica', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif']
})

export default function (Vue, { head, router, isServer, isClient, appOptions }) {
  if (isClient) {
    // add pwa service worker
    require('./registerServiceWorker')

    // initialise push notifications
    window.OneSignal = window.OneSignal || [];
    window.OneSignal.push(() => {
      window.OneSignal.init({
        appId: process.env.GRIDSOME_VUE_APP_ONESIGNAL,
        allowLocalhostAsSecureOrigin: process.env.NODE_ENV !== 'production',
      });
    });

  }

  Vue.component('Layout', Layout)
  Vue.component('DocsLayout', DocsLayout)
  Vue.component('Section', Section)
  Vue.component('Feature', Feature)
  Vue.component('Card', Card)

  Vue.use(VueScrollTo)
  Vue.use(VueAnime)
  Vue.use(VueDisqus)

  // For more options see below
  Vue.use(VueReCaptcha, { siteKey: process.env.GRIDSOME_RECAPTCHA_SITE_KEY })

  head.style.push({
    type: 'text/css',
    cssText: typography.toString()
  })
}
// TODO: add default seo
