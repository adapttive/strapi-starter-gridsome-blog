<template>
  <Layout>
    <Section container="md" dots="true" class="blog-page" >
      <div class="post-header container-md text-center mb-x2">
        <h1 v-html="$page.strapi.articles[0].title"/>
        <PostMeta :post="$page.strapi.articles[0]"/>
        <div class="social-share-bar">
          <twitter :url="getSocialShareUrl()" :title="getSocialShareText()"></twitter>
          <linked-in :url="getSocialShareUrl()"></linked-in>
          <whatsapp :url="getSocialShareUrl()" :title="getSocialShareText()"></whatsapp>
          <facebook :url="getSocialShareUrl()" :title="getSocialShareText()"></facebook>
        </div>
        <FloatingBar :content="getSocialShareText()" :url="getSocialShareUrl()"></FloatingBar>
      </div>

      <div class="post-content mb-x2">

        <g-image id="main-image" v-if="$page.strapi.articles[0].image" quality="1" width="600" :src="getStrapiMedia($page.strapi.articles[0].image.url)" />

        <p class="lead" id="description" v-if="$page.strapi.articles[0].description" v-html="$page.strapi.articles[0].description"/>

        <blog-content :content="$page.strapi.articles[0].content"></blog-content>

      </div>

      <Disqus shortname="adapttive" :identifier="$page.strapi.articles[0].slug" />

      <Newsletter />
    </Section>
  </Layout>
</template>

<page-query>
query($slug: String!) {
  strapi {
    articles(where: { slug: $slug }, sort: "publishedAt:desc") {
      title
      slug
      description
      content
      publishedAt
      category {
        slug
        name
      }
      image {
        url
      }
      authors {
        linked_user {
          username
        }
        id
        name
        picture {
          url
        }
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          url
        }
        keywords {
          name
          slug
        }
      }
      timeToRead
    }
  }
}
</page-query>

<script>
import { hydrateNever } from 'vue-lazy-hydration'
import PostMeta from '@/components/PostMeta.vue'
import Newsletter from '@/components/Newsletter.vue'
import { getStrapiMedia } from "~/utils/medias";
import { getMetaTags } from "~/utils/seo";
import Twitter from '@/components/social/Twitter.vue'
import LinkedIn from '@/components/social/LinkedIn.vue'
import Whatsapp from "@/components/social/Whatsapp";
import Facebook from "../components/social/Facebook";
import  FloatingBar from "../components/FloatingBar";

import "prismjs";
import "prismjs/themes/prism-solarizedlight.css";
import Blog from "../pages/Blog";

export default {
  components: {
    Blog,
    Facebook,
    Whatsapp,
    PostMeta,
    Newsletter,
    Twitter,
    LinkedIn,
    FloatingBar,
    BlogContent: hydrateNever(() => import('../components/post/BlogContent.vue')),
  },
  methods: {
    getSocialShareUrl() {
      return process.env.GRIDSOME_BASE_URL + this.$router.currentRoute.path;
    },
    getStrapiMedia,
    getSocialShareText() {
      let result = "";
      const article = this.$page.strapi.articles[0];
      if (article.seo) {
        let title = article.title;
        let tags = article.seo.keywords.reduce((previous, current, idx) => {
          return idx === 0 ? "#" + current.name : previous + ' #' + current.name;
        }, '');
        result = title + "\n" + tags;
      }
      return result;
    }
  },
  metaInfo() {
    const { title, description, image } = this.$page.strapi.articles[0];
    // Merge default and article-specific SEO data
    const seo = {
      metaTitle: title,
      metaDescription: description,
      shareImage: image,
      ...this.$page.strapi.articles[0].seo,
    };
    return {
      title: this.$page.strapi.articles[0].title,
      meta: getMetaTags(seo),
    };
  },
}
</script>

<style lang="scss">
.external-preview {
  &.frame {
    color: #FFF;
    position: relative;
    overflow: hidden;
    box-shadow: inset 2px 0px 3px 0px rgba(black, 0.2);
    width: 100%;
    background-color: var(--code-bg);
    border-radius: 5px;

    @media screen and (min-width: 850px) {
      flex: 1;
    }

    @media screen and (max-width: 850px) {
      .hide-for-small {
        display: block !important;
      }
    }

  }

  &.header {
    background-color: var(--border-color-darker);
    padding: 0.5rem;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;

    .buttons {
      max-width: 30%;
      float: left;

      div {
        display: inline-block;
        width: 11px;
        height: 11px;
        border-radius: 100%;
        margin: 0 4px;
        background-color: hsla(0, 0%, 100%, .2);
      }
    }

    .header-title {
      max-width: 90%;
      font-size: small;
      word-break: break-all;

      a {
        padding-left: 0.5rem;
      }

    }

    @media screen and (max-width: 850px) {
      .header-title {
        font-size: x-small;
      }
    }
  }

  &.code {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 580px;
    @media screen and (max-width: 850px) {
      & {
        min-height: auto;
      }
    }

    pre {
      margin-bottom: 0 !important;
    }

    pre::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: var(--code-bg);
    }

    pre::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
      background-color: var(--primary-color);
    }

    pre::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: var(--bg-secondary);
    }
  }
}

.blog-page {
  #main-image{
    border-width: 2px;
    border-style: solid;
    border-color: var(--primary-color-dark);
    border-radius: 5px;
  }

  // timeline
  $bullet-line-width: 1px;
  $bullet-color: var(--border-color);
  $bullet-border-width: $bullet-line-width;
  $bullet-background-color: var(--primary-color-dark);
  $bullet-size: 30px;
  #content > ol {
      list-style: none;
      padding: 0;
      border-left: $bullet-line-width solid $bullet-color;
      counter-reset: numbered-list;
      margin: 0 0 0 10px;
      position: relative;
    }
  #content > ol > li {
    font-size: 16px;
    line-height: 1.2;
    margin: 0 0 30px;
    padding: 0 0 0 30px;

    &:last-child {
      border-left: $bullet-line-width solid $bullet-background-color;
      margin-left: -$bullet-line-width;
    }

    &:before {
      $half-of-font-size: -0.5em;
      background-color: $bullet-color;
      border: $bullet-border-width solid $bullet-background-color;
      border-radius: 50%;
      color: $bullet-background-color;
      content: counter(numbered-list, decimal);
      counter-increment: numbered-list;
      display: block;
      font-weight: bold;
      width: $bullet-size;
      height: $bullet-size;
      margin-top: $half-of-font-size;
      line-height: $bullet-size;
      position: absolute;
      left: -$bullet-size / 2 - $bullet-line-width / 2 - $bullet-border-width;
      text-align: center;
    }
  }
}
</style>
