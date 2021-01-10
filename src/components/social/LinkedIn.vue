<template>
  <g-link :to="getLink(url)"
          aria-label="LinkedIn"
          rel="noopener noreferrer"
          target="_blank"
          title="Share on LinkedIn"
          class="social-share linkedin"
  >
    <linkedin-logo height="20px" width="20px"/>
  </g-link>
</template>

<script>
import objectToGetParams from '../../utils/queryBuilder';
import LinkedinLogo from '@/assets/images/linkedin-logo.svg'

export default {
  name: 'linkedin',
  methods: {
    getLink(url) {
      return  'https://linkedin.com/shareArticle' +
      objectToGetParams({
        mini: true,
        url: url
      });
    }
  },
  components: {
    LinkedinLogo
  },
  props: {
    url: {
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