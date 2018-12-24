<template>
    <b-navbar v-if="!embedded" toggleable="md" variant="light">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/"><b-img :src="$withBase('/assets/images/base-token.png')" height="24" /> WatchToken</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item to="/">Add your token</b-nav-item>
                <b-nav-item target="_blank" href="https://medium.com/@vittominacori/how-to-add-token-to-metamask-fba11854f6cd">About</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item :href="$withBase('detail.html?address=0xB5c64c7d6b374aD738e314eAa7bCC07AEc194B7b&network=mainnet&logo=https%3A%2F%2Fvittominacori.github.io%2Fwatch-token%2Fassets%2Fimages%2Fbase-token.png')">View sample</b-nav-item>
                <b-nav-item-dropdown text="GitHub" right>
                    <b-dropdown-item target="_blank" href="https://github.com/vittominacori/watch-token">Source code</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
  import browser from '../mixins/browser';

  export default {
    name: "Header",
    mixins: [
      browser
    ],
  }
</script>
