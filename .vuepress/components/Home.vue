<template>
  <b-row class="p-0 pt-4">
    <b-col lg="8" offset-lg="2">
      <b-jumbotron bg-variant="light" header-level="4">
        <template slot="header">
          WatchToken
        </template>
        <template slot="lead">
          {{ $site.title }}
        </template>
        <hr class="my-4">
        <p>Create a link to your ERC20 Token or an embeddable Widget for your Website</p>
        <b-button size="lg" variant="success" class="mt-2 text-uppercase p-3" to="/create/">
          Create ERC20 Widget
        </b-button>
        <b-button size="lg"
                  variant="outline-info"
                  class="mt-2 text-uppercase p-3"
                  to="/page/?hash=0x7b2261646472657373223a22307842356336346337643662333734614437333865333134654161376243433037414563313934423762222c226c6f676f223a2268747470733a2f2f766974746f6d696e61636f72692e6769746875622e696f2f77617463682d746f6b656e2f6173736574732f696d616765732f626173652d746f6b656e2e706e67227d">
          Example
        </b-button>
      </b-jumbotron>
    </b-col>
    <b-col lg="8" offset-lg="2">
      <b-jumbotron bg-variant="dark" text-variant="light">
        <h4>Want to create your ERC20 or BEP20 Token?</h4>
        <p>Use ERC20 or BEP20 Token Generator to create your own Token in less than a minute.</p>
        <b-button size="lg"
                  variant="outline-info"
                  class="mt-2 text-uppercase p-3"
                  href="https://vittominacori.github.io/erc20-generator/"
                  target="_blank">
          Create ERC20 Token
        </b-button>
        <b-button size="lg"
                  variant="outline-warning"
                  class="mt-2 text-uppercase p-3"
                  href="https://vittominacori.github.io/bep20-generator/"
                  target="_blank">
          Create BEP20 Token
        </b-button>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'Home',
  };
</script>
