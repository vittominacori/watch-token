<template>
  <div class="page-wrapper main-container" :class="bodyClass">
    <site-header v-if="loadLayout"/>
    <b-container>
      <transition name="fade" mode="out-in">
        <component v-if="page" :is="page" :key="page"></component>
      </transition>
    </b-container>
    <site-footer v-if="loadLayout"/>
  </div>
</template>
<script>
  import browser from '../mixins/browser';

  import SiteHeader from './Header.vue';
  import SiteFooter from './Footer.vue';

  export default {
    mixins: [
      browser,
    ],
    components: {
      SiteHeader,
      SiteFooter,
    },
    data () {
      return {
        loaded: false,
      };
    },
    mounted () {
      this.loaded = true;
    },
    computed: {
      page () {
        return this.$page.frontmatter.component || null;
      },
      loadLayout () {
        return this.loaded && !this.embedded;
      },
      bodyClass () {
        return this.loadLayout ? 'aqua-gradient' : '';
      },
    },
  };
</script>
<style src="../scss/main.scss" lang="scss"></style>
