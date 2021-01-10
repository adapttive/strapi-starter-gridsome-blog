<template>
    <Layout>
        <Section container="md" class="blog-posts">
            <div class="mb-x2 container-sm text-center author-page">
                <g-image class="author-page__avatar" v-if="$page.strapi.author.picture" :key="$page.strapi.author.id"
                         :src="getImageUrl($page.strapi.author.picture)"/>
                <h1>{{ $page.strapi.author.name }}</h1>
                <p id="intro" v-if="$page.strapi.author.intro" class="lead container-sm">
                    {{ $page.strapi.author.intro }}
                </p>

                <g-link v-if="$page.strapi.author.twitter" :to="'https://twitter.com/'+$page.strapi.author.twitter"
                        aria-label="Twitter"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Find me on Twitter"
                        class="social"
                >
                    <twitter-logo/>
                </g-link>
                <g-link v-if="$page.strapi.author.github" :to="'https://github.com/'+ $page.strapi.author.github"
                        aria-label="GitHub"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="FindMe @GitHub"
                        class="social"
                >
                    <github-logo
                            height="20px"
                            width="20px"
                    />
                </g-link>
                <g-link v-if="$page.strapi.author.stackoverflow" :to="'https://stackoverflow.com/story/'+$page.strapi.author.stackoverflow"
                        aria-label="StackOverflow"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Profile @StackOverflow"
                        class="social"
                >
                    <stackoverflow-logo
                            height="20px"
                            width="20px"
                    />
                </g-link>
                <g-link v-if="$page.strapi.author.devto" :to="'https://dev.to/'+$page.strapi.author.devto"
                        aria-label="Dev.to"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Profile @Dev.to"
                        class="social"
                >
                    <devto-logo
                            height="20px"
                            width="20px"
                    />
                </g-link>
                <g-link v-if="$page.strapi.author.linkedin" :to="'https://linkedin.com/in/'+$page.strapi.author.linkedin"
                        aria-label="LinkedIn"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Profile @LinkedIn"
                        class="social"
                >
                    <linkedin-logo
                            height="20px"
                            width="20px"
                    />
                </g-link>

                <div v-if="$page.strapi.author.hireme && $page.strapi.author.hireme.enable" class="author-hireme">
                    <VueMarkdown :source="$page.strapi.author.hireme.description" id="hireme" />
                    <g-link  :to="$page.strapi.author.hireme.url" class="button primary button--small">
                        Hire Me
                    </g-link>
                </div>
            </div>

            <h3 class="text-center" v-if="$page.strapi.author.posts.length">Blog posts by me</h3>

            <PostCard v-for="post in $page.strapi.author.posts" :key="post.id" :post="post"/>

          <h3 class="text-center" v-if="$page.strapi.author.projects.length">Open Source by me</h3>

          <div class="grid-cols grid-cols--2">
              <ProjectCard v-for="project in $page.strapi.author.projects" :key="project.id" :node="project" />
            </div>
        </Section>
    </Layout>
</template>

<page-query>
query($id: ID!) {
  strapi {
    author(id: $id) {
      id
      name
      role
      intro
      picture {
        url
        provider_metadata
        ext
      }
      linked_user {
        username
      }
      twitter
      github
      stackoverflow
      linkedin
      devto
      hireme {
        enable
        description
        url
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
          }
        }
      }
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
            provider_metadata
            ext
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
    import GithubLogo from '@/assets/images/github-logo.svg'
    import TwitterLogo from '@/assets/images/twitter-logo.svg'
    import StackoverflowLogo from '@/assets/images/stackoverflow-logo.svg'
    import LinkedinLogo from '@/assets/images/linkedin-logo.svg'
    import VueMarkdown from "vue-markdown";
    import { getMetaTags } from "~/utils/seo";
    import DevtoLogo from '@/assets/images/devto-logo.svg'

    export default {
        components: {
            PostCard,
            ProjectCard,
            GithubLogo,
            TwitterLogo,
            StackoverflowLogo,
            LinkedinLogo,
            DevtoLogo,
            VueMarkdown
        },

        methods: {
            /**
             * Image transformation
             * w_300,h_300,c_crop,g_face,r_max/w_100/
             */
            getImageUrl(image) {
                const imageUrl = process.env.GRIDSOME_CLOUDINARY_BASE_URL;
                return imageUrl+"/w_300,h_300,c_crop,g_face,r_max/w_200/"+image.provider_metadata.public_id+image.ext;
            },
        },
        metaInfo() {
            const { name, intro, picture } = this.$page.strapi.author;
            // Merge default and article-specific SEO data
            const seo = {
                metaTitle: name,
                metaDescription: intro,
                shareImage: picture,
            };
            return {
                title: name,
                meta: getMetaTags(seo),
            };
        },
    }
</script>

<style lang="scss">
    .author-page {
        &__avatar {
          border-width: 2px;
          border-style: solid;
          border-color: var(--primary-color-dark);
          border-radius: 110px;
        }
        .social {
            margin: 10px;
        }
        .author-hireme {
            margin-top: 2.5rem;
        }
    }
</style>
