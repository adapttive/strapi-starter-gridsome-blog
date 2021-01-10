<template>
    <Layout>
        <Section container="md" class="blog-posts">

            <div v-if="$page.strapi.categories" class="mb-x2 container-sm text-center">
                <h1>{{$page.strapi.categories[0].name}}</h1>
                <p style="opacity: .8">
                    <VueMarkdown :source="$page.strapi.categories[0].description" id="editor" />
                </p>
            </div>

            <h3 class="text-center" v-if="$page.strapi.categories[0].posts">Blog posts by category</h3>

            <PostCard v-for="article in $page.strapi.categories[0].posts" :key="article.id" :post="article"/>

        </Section>
    </Layout>
</template>

<page-query>
query($id: ID!) {
  strapi {
    categories(where: { id: $id }) {
      slug
      id
      name
      posts: articles(where: { status: true }) {
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
}
</page-query>

<script>
    import PostCard from '@/components/PostCard.vue'
    import ProjectCard from '@/components/ProjectCard.vue'
    import VueMarkdown from "vue-markdown";

    export default {
        components: {
            PostCard,
            ProjectCard,
            VueMarkdown
        },
        metaInfo() {
            console.log(this.$page.strapi);
        }
    }
</script>

<style lang="scss">
    .author-page {
        &__avatar {
            border-radius: 99px;
        }

        .social {
            margin: 10px;
        }
    }
</style>
