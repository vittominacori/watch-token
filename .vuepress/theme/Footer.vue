<template>
    <b-row>
        <b-col v-if="!embedded" lg="6" offset-lg="3" class="text-center p-0">
            <ul class="list-inline mt-2">
                <li v-if="this.$page.frontmatter.component !== 'Generator'" class="list-inline-item"><small><router-link class="text-secondary" to="/">Watch your Token</router-link></small></li>
                <li v-if="this.$page.frontmatter.component !== 'Generator'" class="list-inline-item text-secondary">|</li>
                <li class="list-inline-item"><small><b-link class="text-secondary" href="https://github.com/vittominacori/watch-token" target="_blank">View source code</b-link></small></li>
                <li class="list-inline-item text-secondary">|</li>
                <li class="list-inline-item">
                    <small class="text-secondary">created by <b-link class="text-secondary" href="https://github.com/vittominacori" target="_blank">@vittominacori</b-link></small>
                </li>
            </ul>
        </b-col>
        <b-col v-else lg="6" offset-lg="3" class="text-right p-0">
            <b-link :href="$withBase('/')" target="_blank">
                <small class="text-muted">Powered by watch-token</small>
            </b-link>
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
