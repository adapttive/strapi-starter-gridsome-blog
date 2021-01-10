<template>
  <Card class="blog-posts__post" :link="'blog/'+ post.slug">
    <h3 v-html="post.title"/>
    <p v-html="post.description"/>
    <PostMeta :post="post"/>
  </Card>
</template>

<script>
import PostMeta from './PostMeta.vue'

export default {
  components: {
    PostMeta
  },
  props: {
    post: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.blog-posts {
  &__post {
    position: relative;
    margin-bottom: 2rem;
    .card__inner {
      padding: var(--space-x2);
    }
  }
}
</style>
