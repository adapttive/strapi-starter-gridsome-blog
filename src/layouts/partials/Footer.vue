<template>
  <footer class="text-center">
    <FooterLinks />
    <div>adapttive.com © 2020</div>
    a dedicated developer blog inspired by <g-link to="https://gridsome.org"> gridsome.org</g-link>.
  </footer>
</template>

<style lang="scss">
footer {
  font-size: 0.75rem;
  background-color: var(--bg);
  border-top: 1px solid var(--border-color);
  margin-top: -1px;
  padding: 20px;
  z-index: 10;
}
</style>
<script>
  import FooterLinks from "@/components/FooterLinks";

  export default {
    components: {
      FooterLinks
    }
  }
</script>

