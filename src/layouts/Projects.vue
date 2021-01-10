<template>
  <Layout class="has-sidebar projects-page">
    <div class="container flex flex-align-top">

      <div class="sidebar">

          <h3 class="menu-item" >Browse</h3>

          <g-link class="menu-item menu-link" to="/projects/">
            All Projects
          </g-link>

          <h3 class="menu-item" >Platforms</h3>

          <g-link class="menu-item platform-link" v-for="platform in platforms"  :key="platform.id" :to="'/projects/' + platform.slug" >
            <g-image v-if="platform.image" :src="platform.image.url" />
            {{ platform.name }}
<!--            <span class="platform-count" :class="{'platform-count&#45;&#45;fade-out': item.node.belongsTo.totalCount == 0}">-->
<!--              {{ item.node.belongsTo.totalCount }}-->
<!--            </span>-->
          </g-link>

          <hr />
<!--          <g-link to="/docs/how-to-contribute/#submit-a-starter">Submit a Starter →</g-link>-->
      </div>

      <Section class="projects-content container flex-fit">
          <slot />
      </Section>
    </div>
  </Layout>
</template>

<static-query>
query {
  strapi {
    platforms {
      id
      name
      slug
      image {
        url
      }
      projects {
        title
      }
    }
  }
}
</static-query>

<script>
export default {
  computed: {
    platforms () {
      return this.$static.strapi.platforms;
    }
  }
}
</script>

<style lang="scss">
.projects-content {
  padding: var(--space-x2);
}
.platform-link {
  display: flex;
  align-items: center;
  padding: 7px 0;

  img {
    width: 25px;
    vertical-align: middle;
    margin: 0 10px 0 0;
  }
}
.platform-count {
  margin-left: auto;
  padding: 0.15rem 0.4rem;
  background-color: var(--bg-teritary);
  transition: background-color .3s;
  border-radius: .3em;
  font-size: 0.7em;

  &--fade-out {
    opacity: .3;
  }
}
</style>
