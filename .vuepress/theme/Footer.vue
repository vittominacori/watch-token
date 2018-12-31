<template>
    <b-row>
        <b-col lg="6" offset-lg="3" class="text-right p-0">
            <b-link v-if="embedded" :href="$withBase('/')" target="_blank">
                <small class="text-muted">Powered by WatchToken</small>
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
