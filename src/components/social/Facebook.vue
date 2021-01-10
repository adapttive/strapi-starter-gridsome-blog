<template>
  <g-link :to="getLink(url, title)"
          aria-label="Facebook"
          rel="noopener noreferrer"
          target="_blank"
          title="Share on Facebook"
          class="social-share facebook"
  >
    <facebook-logo height="20px" width="20px"/>
  </g-link>
</template>

<script>
import objectToGetParams from '../../utils/queryBuilder';
import FacebookLogo from '@/assets/images/facebook-logo.svg'

export default {
  name: 'facebook',
  methods: {
    getLink(url, title) {
      return `https://www.facebook.com/sharer/sharer.php` +
          objectToGetParams({
            u: url,
            quote: title
          });
      }
  },
  components: {
    FacebookLogo
  },
  props: {
    url: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    }
  }
};
</script>


<style lang="scss">
  .social-share {
    margin: 10px;
  }
</style>