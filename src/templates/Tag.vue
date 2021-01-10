<template>
    <Layout>
        <Section container="md" class="blog-posts">

            <div v-if="$page.strapi.tag" class="mb-x2 container-sm text-center">
                <h1>{{$page.strapi.tag.name}}</h1>
                <h6>#{{$page.strapi.tag.slug}}</h6>
                <p v-if="$page.strapi.tag.description" style="opacity: .8">
                    <VueMarkdown :source="$page.strapi.tag.description" id="description" />
                </p>
            </div>

            <h3 class="text-center" v-if="$page.strapi.posts">Blog posts by tag</h3>

            <PostCard v-for="article in $page.strapi.posts" :key="article.id" :post="article"/>

        </Section>
    </Layout>
</template>

<page-query>
query($id: ID!) {
  strapi {
    tag(id: $id) {
      slug
      id
      name
      description
    }

    posts: articles(where: { tags_in: [$id] }) {
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
