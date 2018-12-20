<template>
    <b-row>
        <b-col v-if="!loading" lg="6" offset-lg="3" class="mt-4 p-0">
            <b-card bg-variant="light">
                <b-media>
                    <b-img v-if="token.logo" slot="aside" :src="token.logo" rounded="circle" width="48" height="48" :alt="token.name" />
                    <h4 class="card-title">{{ token.name }} ({{ token.symbol }})</h4>
                    <h6 class="card-subtitle text-muted">{{ token.address }}</h6>
                </b-media>
                <p class="card-text"></p>
                <div slot="footer">
                    <b-button variant="link" v-on:click="watchToken">Add to MetaMask</b-button>
                    <b-button variant="link" :href="this.network.current.etherscanLink + '/token/' + token.address" target="_blank">
                        View on Etherscan
                    </b-button>
                </div>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  import browser from '../mixins/browser';
  import dapp from '../mixins/dapp';

  export default {
    name: "Detail",
    mixins: [
      browser,
      dapp
    ],
    data() {
      return {
        loading: true,
        currentNetwork: null,
        token: {}
      };
    },
    mounted() {
      this.currentNetwork = this.getParam('network') || this.network.default;
      this.initDapp();
    },
    methods: {
      async initDapp () {
        this.network.current = this.network.list[this.currentNetwork];
        try {
          await this.initWeb3(this.currentNetwork, true);
          await this.getToken(this.getParam('address'));
        } catch (e) {
          alert(e);
          document.location.href = this.$withBase('/');
        }
      },
      async getToken (address) {
        this.token.address = address;
        this.initContract(this.token.address);

        this.token.name = await this.contractGet('name');
        this.token.symbol = await this.contractGet('symbol');
        this.token.decimals = (await this.contractGet('decimals')).valueOf();
        this.token.logo = decodeURIComponent(this.getParam('logo'));

        this.loading = false;
      },
      watchToken () {
        if (this.metamask.installed && !this.legacy) {
          this.web3Provider.sendAsync({
            method: 'wallet_watchAsset',
            params: {
              "type":"ERC20",
              "options":{
                "address": this.token.address,
                "symbol": this.token.symbol,
                "decimals": this.token.decimals,
                "image": this.token.logo,
              },
            },
            id: Math.round(Math.random() * 100000),
          }, (err, data) => {
            if (!err) {
              if (data.result) {
                console.log('Token added')
              } else {
                console.log('Some error')
              }
            } else {
              console.log(err.message)
            }
          });
        }
      },
    },
  }
</script>
