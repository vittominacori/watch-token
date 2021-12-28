<template>
  <b-navbar toggleable="md" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand to="/">
      <b-img :src="$withBase('/assets/images/base-token.png')" height="24"/>
      WatchToken
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :href="$withBase('/create/')">Ethereum</b-nav-item>
        <b-nav-item :href="$withBase('/create/?network=bsc_mainnet')">Binance Smart Chain</b-nav-item>
        <b-nav-item :href="$withBase('/create/?network=polygon_mainnet')">Polygon</b-nav-item>
        <b-nav-item
            :href="$withBase('/page/?hash=0x7b2261646472657373223a22307842356336346337643662333734614437333865333134654161376243433037414563313934423762222c226c6f676f223a2268747470733a2f2f766974746f6d696e61636f72692e6769746875622e696f2f77617463682d746f6b656e2f6173736574732f696d616765732f626173652d746f6b656e2e706e67227d')">
          <small>Example</small>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Create your Token" right>
          <b-dropdown-item target="_blank" href="https://vittominacori.github.io/erc20-generator/">Ethereum</b-dropdown-item>
          <b-dropdown-item target="_blank" href="https://vittominacori.github.io/bep20-generator/">Binance Smart Chain</b-dropdown-item>
          <b-dropdown-item target="_blank" href="https://vittominacori.github.io/polygon-generator/">Polygon</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item target="_blank" href="https://vittominacori.medium.com/how-to-add-token-to-metamask-fba11854f6cd">
          <small>About</small>
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
