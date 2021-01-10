<template>
  <header>
    <div class="header-bar"></div>
    <div class="header-inner container flex gap-30">

      <Logo/>

      <Nav class="flex-fit"/>

      <SearchForm/>

      <nav class="header-actions flex">
        <client-only>
          <a href="/" v-on:click="reload()">
            <refresh-loader v-bind:class="{'loading': loading}" height="20px"
                                width="20px"></refresh-loader>
          </a>
        </client-only>
        <ToggleTheme/>
        <g-link :to="$static.strapi.global.twitter"
            aria-label="Twitter"
            rel="noopener noreferrer"
            target="_blank"
            title="Follow us on Twitter"
        >
          <twitter-logo/>
        </g-link>
        <g-link :to="$static.strapi.global.github"
                aria-label="GitHub"
            rel="noopener noreferrer"
            target="_blank"
            title="adapttive @ GitHub"
        >
          <github-logo
              height="20px"
              width="20px"
          />
        </g-link>
      </nav>
    </div>
  </header>
</template>

<static-query>
query {
  strapi {
    global {
      favicon {
        url
      }
      twitter
      github
      footer {
        __typename
        ... on strapiTypes_ComponentSharedLinkGroup {
          label
          links {
            label
            url
          }
        }
      }
    }
  }
}
</static-query>

<script>
import Logo from './Logo'
import Nav from './Nav'
import SearchForm from '@/components/SearchForm.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
import GithubLogo from '@/assets/images/github-logo.svg'
import TwitterLogo from '@/assets/images/twitter-logo.svg'
import RefreshLoader from '@/assets/images/refresh-loader.svg'
import LazyHydrate from 'vue-lazy-hydration'


export default {
  components: {
    Logo,
    GithubLogo,
    TwitterLogo,
    ToggleTheme,
    SearchForm,
    Nav,
    LazyHydrate,
    RefreshLoader
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    reload() {
      window.location.reload()
    }
  },
  mounted() {
    if (document !== undefined) {
      document.addEventListener('pwa.loading', (e) => {
        this.loading = true;
      })
      document.addEventListener('pwa.loading.done', (e) => {
        this.loading = false;
      })
    }
  }
}
</script>

<style lang="scss">
header {
  z-index: 20;
  position: relative;
  top: 0;
  background-color: var(--bg-transparent);
  border-bottom: 1px solid var(--border-color);
  flex-wrap: nowrap;
  position: sticky;
  transition: background-color .3s, border-color, .3s;


  .header-bar {
    background: linear-gradient(90deg, var(--primary-color) 0%, #8ED6FB 50%, #D32E9D 100%);
    padding: 2px;
    text-align: center;
    color: #FFF;
    font-size: 1rem;

    a {
      color: currentColor;
    }
  }

  .header-inner {
    padding: 0 var(--space);
    min-height: var(--header-height);
  }

  @media screen and (min-width: 992px) and (max-resolution: 1) {
    backdrop-filter: blur(4px);
  }

  @media screen and (min-width: 992px) and (-webkit-max-device-pixel-ratio: 1) {
    backdrop-filter: blur(4px);
  }

  .loading {
    animation: rotation 1s infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
}
</style>
