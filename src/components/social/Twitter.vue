<template>
  <g-link :to="getLink(url, {title})"
          aria-label="Twitter"
          rel="noopener noreferrer"
          target="_blank"
          title="Share on Twitter"
          class="social-share twitter"
  >
    <twitter-logo height="20px" width="20px"/>
  </g-link>
</template>

<script>
import objectToGetParams from '../../utils/queryBuilder';
import TwitterLogo from '@/assets/images/twitter-logo.svg'

export default {
  name: 'twitter',
  methods: {
    getLink(url, {title}) {
      return 'https://www.twitter.com/share' +
          objectToGetParams({
            url: url,
            text: title
          });
      }
  },
  components: {
    TwitterLogo
  },
  props: {
    url: {
      required: true,
      type: String
    },
    title: {
      required: false,
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