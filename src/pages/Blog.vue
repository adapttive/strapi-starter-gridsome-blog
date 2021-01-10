<template>
  <Layout>
     <Section container="md" class="blog-posts">
      <div v-if="$page.strapi.currentPage" class="mb-x2 container-sm text-center">
        <h1>{{$page.strapi.currentPage.title}}</h1>
        <p style="opacity: .8">
          <vue-markdown :source="$page.strapi.currentPage.description" id="description" />
        </p>
      </div>
      <PostCard v-for="article in $page.strapi.articles" :key="article.id" :post="article"/>

<!--      <p class="text-center">-->
<!--        Want to contribute to Gridsome blog?-->
<!--        <g-link to="/docs/how-to-contribute#contributing-to-the-blog"> Learn more here</g-link>-->
<!--      </p>-->
       <Newsletter/>
    </Section>
  </Layout>
</template>

<page-query>
query {
  strapi {
    currentPage: blogPage {
      title
      description
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
    }
    articles {
      id
      slug
      title
      description
      category {
        name
        slug
      }
      authors {
        linked_user {
          username
        }
        id
        name
        picture {
          url
          provider_metadata
          ext
        }
      }
      publishedAt
      seo {
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
import PostCard from '@/components/PostCard.vue'
import Newsletter from '@/components/Newsletter.vue'
import VueMarkdown from "vue-markdown";
import { getStrapiMedia } from "~/utils/medias";
import { getMetaTags } from "~/utils/seo";

export default {
  components: {
    PostCard,
    Newsletter,
    VueMarkdown
  },
  methods: {
    getStrapiMedia,
  },
  metaInfo() {
    const { title, description, picture } = this.$page.strapi.currentPage;
    // Merge default and article-specific SEO data
    const seo = {
      metaTitle: title,
      metaDescription: description,
      shareImage: picture,
      ...this.$page.strapi.currentPage.seo,
    };

    return {
      title: this.$page.strapi.currentPage.title,
      meta: getMetaTags(seo),
    };
  },
}
</script>
