<template>
  <Section dots="true" secondary="true">
    <div class="container text-center container-sm mb">
      <h2>Latest from adapttive blog</h2>
    </div>
    <div class="blog-posts container container-md">
      <PostCard v-for="post in $static.strapi.posts" :key="post.id" :post="post"/>
    </div>
    <div class="container container-md mb">
      <Newsletter />
    </div>
  </Section>
</template>

<script>
import PostCard from '@/components/PostCard.vue'
import Newsletter from '~/components/Newsletter'

export default {
  components: {
    PostCard,
    Newsletter
  }
}
</script>

<static-query>
query {
  strapi {
    posts: articles(
      where: { status: true }
      limit: 5
      sort: "publishedAt:desc"
    ) {
      id
      slug
      title
      description
      status
      category {
        name
        slug
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
          provider_metadata
          ext
        }
      }
      publishedAt
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
</static-query>
