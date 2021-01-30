<template>
  <b-row class="p-0 pt-4">
    <b-col v-if="loading" lg="6" offset-lg="3">
      <b-card bg-variant="light">
        <ui--loader :loading="loading"></ui--loader>
      </b-card>
    </b-col>
    <b-col v-if="!loading && !loaded" lg="6" offset-lg="3">
      <b-card bg-variant="light">
        <blockquote>Some error occurred</blockquote>
        <router-link to="/create/">Try adding your token</router-link>
      </b-card>
    </b-col>
    <b-col v-if="loaded" lg="6" offset-lg="3" class="mt-2 p-0">
      <b-card footer-class="p-0" no-body>
        <b-media :class="embedded ? 'force-pb-0' : ''" class="p-4">
          <b-img v-if="token.logo"
                 slot="aside"
                 :src="token.logo"
                 rounded="circle"
                 width="48"
                 height="48"
                 :alt="token.name"/>
          <h4 class="card-title">{{ token.name }} ({{ token.symbol }})</h4>
          <h6 class="card-subtitle text-muted token-address">{{ token.address }}</h6>
          <small class="text-muted">Decimals: {{ token.decimals }}</small>
        </b-media>
        <div class="text-right powered-by" v-if="embedded">
          <small class="text-warning">Embed will be deprecated soon</small>
          <b-button variant="link"
                    :href="$withBase('/')"
                    target="_blank">
            <span class="text-info">Powered by WatchToken</span>
          </b-button>
        </div>
        <div slot="footer" class="text-center">
          <b-button variant="link" class="text-secondary" v-on:click="watchToken">
            Add to MetaMask
          </b-button>
          <b-button variant="link"
                    class="text-secondary"
                    :href="this.network.current.etherscanLink + '/token/' + token.address"
                    target="_blank">
            View on Etherscan
          </b-button>
        </div>
      </b-card>
      <b-modal ref="shareModal" hide-footer :title="`Share ${token.name} page`">
        <b-row>
          <b-col lg="12">
            <b-form-group
                label="Share link"
                label-for="tokenLink">
              <b-form-input
                  id="tokenLink"
                  name="tokenLink"
                  placeholder="Your token link"
                  size="lg"
                  readonly
                  v-model.trim="tokenLink">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group
                label="Embed code"
                label-for="tokenEmbed">
              <b-form-input
                  id="tokenEmbed"
                  name="tokenEmbed"
                  placeholder="Your token embed"
                  size="lg"
                  readonly
                  v-model.trim="tokenEmbed">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-modal>
    </b-col>
    <b-col lg="6" offset-lg="3" class="text-right p-0 pr-2">
      <b-link v-if="!embedded" @click="shareToken">
        <small class="text-white">Share</small>
      </b-link>
    </b-col>
  </b-row>
</template>

<script>
  import browser from '../mixins/browser';
  import dapp from '../mixins/dapp';

  export default {
    name: 'Detail',
    mixins: [
      browser,
      dapp,
    ],
    data () {
      return {
        loaded: false,
        loading: true,
        tokenLink: '',
        tokenEmbed: 'No longer available',
        currentNetwork: null,
        token: {},
      };
    },
    mounted () {
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
        if (address) {
          this.token.address = address;
          this.initContract(this.token.address);

          this.token.name = await this.promisify(this.instances.token.methods.name().call);
          this.token.symbol = await this.promisify(this.instances.token.methods.symbol().call);
          this.token.decimals = (await this.promisify(this.instances.token.methods.decimals().call)).valueOf();
          this.token.logo = this.getParam('logo') ? decodeURIComponent(this.getParam('logo')) : '';

          if (!this.token.name || !this.token.symbol || !this.token.decimals) {
            alert('It seems that it is not a valid Token or you are on the wrong network');
            this.loaded = false;
          } else {
            this.loaded = true;

            const tokenHash = this.web3.utils.toHex(
                JSON.stringify({
                  address: this.token.address,
                  logo: this.token.logo,
                }),
            );

            this.tokenLink = window.location.origin + this.$withBase(`/page/?hash=${tokenHash}&network=${this.currentNetwork}`);

            if (!this.embedded) {
              document.location.href = this.tokenLink;
            }
          }

          this.loading = false;
        } else {
          document.location.href = this.$withBase('/');
        }
      },
      async watchToken () {
        if (!this.metamask.installed) {
          alert('Please install MetaMask and try again!');
          return;
        } else {
          if (this.metamask.netId !== this.network.current.id) {
            alert(
              `Your MetaMask in on the wrong network. Please switch on ${this.network.current.name} and try again!`,
            );
            return;
          }
        }

        try {
          await this.addToMetaMask();
        } catch (e) {
          console.log(e);
        }
      },
      async addToMetaMask () {
        try {
          await this.web3Provider.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: this.token.address,
                symbol: this.token.symbol.substr(0, 5),
                decimals: this.token.decimals,
                image: this.token.logo,
              },
            },
          });
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
        }
      },
      shareToken () {
        this.$refs.shareModal.show();
      },
    },
  };
</script>
