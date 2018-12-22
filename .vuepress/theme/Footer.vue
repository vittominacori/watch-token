<template>
    <b-row>
        <b-col lg="10" offset-lg="1" class="text-center text-white p-0">
            <ul class="list-inline mt-2">
                <li v-if="this.$page.frontmatter.component !== 'Generator'" class="list-inline-item"><small><router-link class="text-light" to="/">Watch your Token</router-link></small></li>
                <li v-if="this.$page.frontmatter.component !== 'Generator'" class="list-inline-item">|</li>
                <li class="list-inline-item">
                    <small>created by <b-link class="text-light" href="https://github.com/vittominacori" target="_blank">@vittominacori</b-link></small>
                </li>
            </ul>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>

</style>
