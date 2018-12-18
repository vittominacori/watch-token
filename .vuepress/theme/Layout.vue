<template>
    <div class="page-wrapper">
        <b-container>
            <transition name="fade" mode="out-in">
                <component v-if="page" :is="page" :key="page"></component>
            </transition>
            <site-footer />
        </b-container>
    </div>
</template>
<script>
  import SiteFooter from './Footer.vue';
  export default {
    components: {
      SiteFooter,
    },
    computed: {
      page() {
        return this.$page.frontmatter.component || null;
      },
    },
  };
</script>
<style src="../scss/main.scss" lang="scss"></style>
