<template>
    <b-row>
        <b-col v-if="loading" lg="6" offset-lg="3" class="mt-4 p-0">
            <b-card bg-variant="light">
                <ui--loader :loading="loading"></ui--loader>
            </b-card>
        </b-col>
        <b-col v-if="!loading && !loaded" lg="6" offset-lg="3" class="mt-4 p-0">
            <b-card bg-variant="light">
                <blockquote>Some error occurred</blockquote>
                <router-link to="/">Try adding your token</router-link>
            </b-card>
        </b-col>
        <b-col v-if="loaded" lg="6" offset-lg="3" class="mt-4 p-0">
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
        loaded: false,
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
        this.token.logo = this.getParam('logo') ? decodeURIComponent(this.getParam('logo')) : '';

        if (!this.token.name || !this.token.symbol || !this.token.decimals) {
          alert('It seems that it is not a valid Token or you are on th wrong network');
          this.loaded = false;
        } else {
          this.loaded = true;
        }

        this.loading = false;
      },
      watchToken () {
        if (!this.metamask.installed) {
          alert("Please install MetaMask and try again!");
          return;
        } else {
          if (this.metamask.netId !== this.network.current.id) {
            alert("Your MetaMask in on the wrong network. Please switch on " + this.network.current.name + " and try again!");
            return;
          }
        }

        try {
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
        } catch (e) {
          console.log(e);
        }
      },
    },
  }
</script>
