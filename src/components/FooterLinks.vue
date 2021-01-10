<template>
  <div>
    <div v-if="$static.strapi.global" class="footer-links" v-for="data in $static.strapi.global.footer">
    <h3>{{data.label}}</h3>
    <div v-for="link in data.links">
      <g-link v-if="link.active !== false" class="menu-link" :to="link.url">{{link.label}}</g-link>
    </div>
  </div>
    <div class="clear-fix"></div>
  </div>
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
            active
            label
            url
          }
        }
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
.clear-fix {
  clear: both;
}
.footer-links {
  text-align: left;
  float: left;
  width: 25%;
  padding-left: .8rem;
  padding-bottom: 1.5rem;

  h3 {
    font-size: .8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 15px 0;
  }

  a {
    color: currentColor;
    opacity: 1;
    font-weight: 400;
    display: flex;
    text-decoration: none;
  }

  .menu-link:hover{
    color: var(--primary-color-dark);

  }
}
@media screen and (max-width: 550px) {
  .footer-links {
    width: 100%;
  }
}
</style>
