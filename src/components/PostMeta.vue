<template>
  <span>
    <p v-if="post.category" class="category">
      <small>
        <g-link id="category" :to="getUrl(post.category.slug, 'blog-category')">{{post.category.name}}</g-link>
        |
        <span id="tags" v-if="post.seo.keywords">
          <Tag v-for="keyword in post.seo.keywords" :key="keyword.slug" :tag="keyword"/>
        </span>
      </small>
    </p>
    <p>
      <small>
        <template v-if="post.authors">
          Posted {{
            moment(post.publishedAt).format(
                "D. MMMM YYYY"
            )
          }} by
          <template v-for="(author, i) in post.authors">
            <span v-if="i && i === post.authors.length - 1"> and </span>
            <span v-else-if="i > 0">, </span>

            <g-image v-if="author.picture" class="author-image" :alt="author.name" :src="getSmallImageUrl(author.picture)"/>

            <g-link v-if="author.linked_user" :to="author.linked_user.username" :key="author.id">{{
                author.name
              }}</g-link>
            <g-link v-if="!author.linked_user" :to="author.id" :key="author.id">{{
                author.name
              }}</g-link>

          </template>
          <span v-if="post.timeToRead"> - </span>
        </template>

        <template v-if="post.timeToRead">
          <strong>{{ post.timeToRead }} min read</strong>
        </template>
      </small>
    </p>
  </span>
</template>

<script>
import moment from "moment";
import {getUrl} from "~/utils/link";
import {getSmallImageUrl} from "~/utils/medias";
import Tag from './post/Tag.vue'

export default {
  components: {
    Tag
  },
  data() {
    return {
      moment: moment,
    };
  },
  methods: {
    getUrl,
    getSmallImageUrl
  },
  props: {
    post: {type: Object, required: true}
  }
}
</script>

<style lang="scss">
p.category {
  margin-bottom: 0;
}
.card {
  p.category {
    margin-bottom: 0;
  }
}
</style>
