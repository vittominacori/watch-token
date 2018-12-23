<template>
    <b-row v-if="!embedded">
        <b-col lg="10" offset-lg="1" class="text-center text-white p-0">
            <ul class="list-inline mt-2">
                <li v-if="this.$page.frontmatter.component !== 'Generator'" class="list-inline-item"><small><router-link class="text-secondary" to="/">Watch your Token</router-link></small></li>
                <li v-if="this.$page.frontmatter.component !== 'Generator'" class="list-inline-item text-secondary">|</li>
                <li class="list-inline-item">
                    <small class="text-secondary">created by <b-link class="text-secondary" href="https://github.com/vittominacori" target="_blank">@vittominacori</b-link></small>
                </li>
            </ul>
        </b-col>
    </b-row>
</template>

<script>
  import browser from '../mixins/browser';

  export default {
    name: "Footer",
    mixins: [
      browser
    ],
  }
</script>

<style scoped>

</style>
