<template>
  <g-link :to="getLink(url, title)"
          aria-label="Whatsapp"
          rel="noopener noreferrer"
          target="_blank"
          title="Share on Whatsapp"
          class="social-share whatsapp"
  >
    <whatsapp-logo height="20px" width="20px"/>
  </g-link>
</template>

<script>
import objectToGetParams from '../../utils/queryBuilder';
import WhatsappLogo from '@/assets/images/whatsapp-logo.svg'

export default {
  name: 'whatsapp',
  data() {
    return {
      separator: '\n'
    };
  },
  methods: {
    getLink(url, title) {
      return 'https://api.whatsapp.com/send' +
      objectToGetParams({
        text: title ? title + this.separator + url : url
      });
      }
  },
  components: {
    WhatsappLogo
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