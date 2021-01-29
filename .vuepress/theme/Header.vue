<template>
    <b-navbar toggleable="md" variant="light">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">
            <b-img :src="$withBase('/assets/images/base-token.png')" height="24" /> WatchToken
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item to="/create/">Create ERC20 Widget</b-nav-item>
                <b-nav-item-dropdown text="Create Token" right>
                    <b-dropdown-item target="_blank"
                                     href="https://vittominacori.github.io/erc20-generator/">
                        Create ERC20
                    </b-dropdown-item>
                    <b-dropdown-item target="_blank"
                                     href="https://vittominacori.github.io/bep20-generator/">
                        Create BEP20
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/detail.html?address=0xB5c64c7d6b374aD738e314eAa7bCC07AEc194B7b&network=mainnet&logo=https%3A%2F%2Fvittominacori.github.io%2Fwatch-token%2Fassets%2Fimages%2Fbase-token.png">
                    Example
                </b-nav-item>
                <b-nav-item target="_blank" href="https://vittominacori.medium.com/how-to-add-token-to-metamask-fba11854f6cd">About</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>
