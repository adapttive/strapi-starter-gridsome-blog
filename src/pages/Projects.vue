<template>
  <Projects>
    <h1>Showcase Projects</h1>
    <p class="mb-x2">Some open-source projects we are working on.</p>

    <div class="grid-cols grid-cols--3 mb">
      <ProjectCard v-for="project in $page.strapi.projects" :key="project.id" :node="project"  />
    </div>
  </Projects>
</template>

<script>
import Projects from '~/layouts/Projects.vue'
import ProjectCard from '~/components/ProjectCard.vue'
import { getMetaTags } from "~/utils/seo";

export default {
  components: {
    Projects,
    ProjectCard,
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

<page-query>
query {
  strapi {
    currentPage: projectPage {
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
    projects {
      id
      title
      url
      description
      published_at
      platforms {
        name
        image {
          url
        }
      }
      authors {
        linked_user {
          username
        }
        name
        picture {
          url
          provider_metadata
          ext
        }
      }
    }
  }
}
</page-query>

<style lang="scss">
.projects-page {
  .grid-cols {
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit,minmax(33%,1fr));
   }

  .card {
      //border: none;
  }

  .card__inner {
      //padding: 0;
  }

  @media screen and (max-width: 550px) {
   .grid-cols {
      grid-template-columns: repeat(auto-fit,minmax(100%,1fr));
   }
  }
}
</style>