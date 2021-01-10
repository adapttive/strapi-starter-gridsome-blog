<template>
  <g-link class="tag" :to="getUrl(tag.slug, 'blog-tag')">
    {{tag.name}}
  </g-link>
</template>

<script>
import {getUrl} from "~/utils/link"
export default {
  methods: {
    getUrl,
  },
  props: {
    tag: { type: Object, required: true }
  }
}
</script>

<style lang="scss">
.tag {
  background-color: var(--border-color-darker);
  border: 1px solid var(--border-color-darker);
  border-radius: 15px 15px 15px 15px;
  padding-left: 3px;
  margin-left: 1px;
  text-decoration: none;
  font-size: smaller;
  padding-right: 3px;
  cursor: pointer;
}
.tag:hover {
  text-decoration: underline;
}
</style>
