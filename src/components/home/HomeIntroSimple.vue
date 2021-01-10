<template>
  <Section class="intro" dots="true">
    <div class="container text-center ">

        <h1 class="intro__title">
          <span>{{ $static.strapi.homepage.hero.title }}</span>
        </h1>

        <p class="intro__lead lead post mb">
          {{ $static.strapi.homepage.hero.description }}
        </p>

        <p class="intro__links">
          <g-link :to="$static.strapi.homepage.hero.url" class="button primary button--large">
            <span>Get started</span>
          </g-link>
        </p>
    </div>
  </Section>
</template>

<static-query>
query {
  strapi {
    homepage {
      hero {
        title
        url
        description
      }
    }
  }
}
</static-query>

<style lang="scss">
.intro {
  padding: calc(2% + var(--space)) 0;

  &__title {
    font-size: 3rem;
    font-weight: 600;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 850px) {
      & {
        font-size: 2rem;
      }
    }
  }

  &__lead {
    max-width: 650px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.3rem;

    @media screen and (max-width: 850px) {
      & {
        font-size: 1rem;
      }
    }
  }

  &__info {
    font-size: .9rem;
  }

  &__keywords {
    position: relative;
    display: block;
  }
}
</style>
