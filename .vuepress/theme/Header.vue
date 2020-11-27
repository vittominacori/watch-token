<template>
    <b-navbar toggleable="md">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">
            <b-img :src="$withBase('/assets/images/base-token.png')" height="24" /> WatchToken
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item :to="$withBase('create.html')">Create ERC20 Widget</b-nav-item>
                <b-nav-item :href="$withBase('detail.html?address=0xB5c64c7d6b374aD738e314eAa7bCC07AEc194B7b&network=mainnet&logo=https%3A%2F%2Fvittominacori.github.io%2Fwatch-token%2Fassets%2Fimages%2Fbase-token.png')">
                    Example
                </b-nav-item>
                <b-nav-item target="_blank" href="https://medium.com/@vittominacori/how-to-add-token-to-metamask-fba11854f6cd">About</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item href="https://vittominacori.github.io/erc20-generator/" target="_blank">
                    <h5>
                        <b-badge variant="danger" class="p-3">Create ERC20 Token</b-badge>
                    </h5>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>
