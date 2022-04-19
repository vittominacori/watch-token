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
        <p>
          Create a Widget for your ERC20 or BEP20 Token.<br>
          Add your Token to DApp browsers or MetaMask both on Ethereum, Binance Smart Chain or Polygon Network.
        </p>
        <b-button size="sm"
                  variant="info"
                  class="mt-2 text-uppercase p-3 btn-sm-block"
                  to="/create/">
          Ethereum
        </b-button>
        <b-button size="sm"
                  variant="warning"
                  class="mt-2 text-uppercase p-3 btn-sm-block"
                  to="/create/?network=bsc_mainnet">
          Binance Smart Chain
        </b-button>
        <b-button size="sm"
                  variant="violet"
                  class="mt-2 text-uppercase p-3 btn-sm-block"
                  to="/create/?network=polygon_mainnet">
          Polygon
        </b-button>
      </b-jumbotron>
    </b-col>
    <b-col lg="8" offset-lg="2">
      <b-jumbotron bg-variant="dark" text-variant="light">
        <h4>Want to create your own Token?</h4>
        <p>Use Token Generator to create your own Token in less than a minute.</p>
        <b-button size="sm"
                  variant="outline-info"
                  class="mt-2 text-uppercase p-3 btn-sm-block"
                  href="https://www.smartcontracts.tools/token-generator/ethereum/"
                  target="_blank">
          ERC20 on Ethereum
        </b-button>
        <b-button size="sm"
                  variant="outline-warning"
                  class="mt-2 text-uppercase p-3 btn-sm-block"
                  href="https://www.smartcontracts.tools/token-generator/bsc/"
                  target="_blank">
          BEP20 on BSC
        </b-button>
        <b-button size="sm"
                  variant="outline-violet"
                  class="mt-2 text-uppercase p-3 btn-sm-block"
                  href="https://www.smartcontracts.tools/token-generator/polygon/"
                  target="_blank">
          ERC20 on Polygon
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
