<template>
  <div>
    <vue-markdown v-bind:external-preview="true"
                  v-if="content"
                  :source="content"
                  id="content"/>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  name: "blog-content",
  components: {
    VueMarkdown
  },
  props: {
    content: { type: String, required: true }
  }
}
</script>

<style lang="scss">

</style>
