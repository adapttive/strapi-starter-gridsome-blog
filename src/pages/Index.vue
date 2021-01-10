<template>
  <Layout class="layout-homepage">

    <LazyHydrate when-idle>
      <home-intro-simple/>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <home-blog/>
    </LazyHydrate>

  </Layout>
</template>

<page-query>
query {
  strapi {
    homepage {
      seo {
        metaTitle
        metaDescription
        keywords {
          name
        }
        shareImage {
          url
        }
      }
    }
    global {
      favicon {
        url
      }
      twitter
      github
    }
  }
}
</page-query>


<script>
import LazyHydrate from 'vue-lazy-hydration'
import HomeIntroSimple from '@/components/home/HomeIntroSimple.vue'
import HomeBlog from '@/components/home/HomeBlog.vue'
import { getMetaTags } from "~/utils/seo";

export default {
  components: {
    LazyHydrate,
    HomeIntroSimple,
    HomeBlog
  },
  metaInfo() {
    const homepage = this.$page.strapi.homepage
    const seo = {
      ...homepage.seo,
    };
    return {
      title: seo.metaTitle,
      meta: getMetaTags(seo),
    };
  },
}
</script>

<style>
@media screen and (min-width: 850px) {
  .layout-homepage header {
    border-color: transparent;
  }
}
</style>


