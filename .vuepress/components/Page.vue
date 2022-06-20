<template>
  <b-row class="p-0 pt-4">
    <b-col v-if="loading" lg="8" offset-lg="2">
      <b-card bg-variant="light">
        <ui--loader :loading="loading"></ui--loader>
      </b-card>
    </b-col>
    <b-col v-if="!loading && !loaded" lg="8" offset-lg="2">
      <b-card bg-variant="light">
        <blockquote>Some error occurred</blockquote>
        <router-link to="/create/">Try adding your token</router-link>
      </b-card>
    </b-col>
    <b-col v-if="loaded" lg="8" offset-lg="2" class="mt-2 p-0">
      <b-link :href="sctLink" class="text-dark text-decoration-none">
      <b-card class="mb-4" role="button" bg-variant="warning">
        <b-row>
          <b-col sm="2">
            <b-img :src="$withBase(`/assets/images/token-watcher.svg`)" fluid></b-img>
          </b-col>
          <b-col sm="10">
            <h3>View {{ token.name }} on SmartContracts Tools.</h3>
            <h4>Try the new Token Watcher.</h4>
          </b-col>
        </b-row>
        <template #footer>
          Want to try new features? We created <b>SmartContracts Tools</b> at <b>NONCEPT.</b>
        </template>
      </b-card>
      </b-link>

      <b-jumbotron bg-variant="light" header-level="4" class="px-3 py-4">
        <template #header>
          <b-media class="mb-3">
            <b-img v-if="token.logo"
                   slot="aside"
                   :src="token.logo"
                   rounded="circle"
                   width="64"
                   height="64"
                   :alt="token.name"/>
            {{ token.name }}
          </b-media>
        </template>
        <template #lead>
        </template>
        <hr class="my-4">
        <h6>Name: <span class="text-muted">{{ token.name }}</span></h6>
        <h6>Symbol: <span class="text-muted">{{ token.symbol }}</span></h6>
        <h6>Decimals: <span class="text-muted">{{ token.decimals }}</span></h6>
        <h6>Address: <span class="text-muted token-address">{{ token.address }}</span></h6>
        <hr class="my-4">
        <b-link @click="addToMetaMask" class="btn btn-success my-2">
          <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
          Add to MetaMask
        </b-link>
        <b-link :href="token.explorerLink" target="_blank" class="btn btn-primary my-2">
          <b-icon-arrow-up-right-circle-fill></b-icon-arrow-up-right-circle-fill>
          View on {{ network.current.explorerName }}
        </b-link>
        <b-link @click="shareToken" class="btn btn-info my-2 float-right">
          <b-icon-share></b-icon-share>
        </b-link>
      </b-jumbotron>
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
                  v-model.trim="share.shortLink">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <p class="share-link">
              <b-btn :href="share.twitter" target="_blank" class="twitter">
                <font-awesome-icon :icon="['fab', 'twitter']"/>
              </b-btn>
              <b-btn :href="share.facebook" target="_blank" class="facebook">
                <font-awesome-icon :icon="['fab', 'facebook-f']"/>
              </b-btn>
              <b-btn :href="share.telegram" target="_blank" class="telegram">
                <font-awesome-icon :icon="['fab', 'telegram-plane']"/>
              </b-btn>
              <b-btn :href="share.whatsapp" target="_blank" class="whatsapp">
                <font-awesome-icon :icon="['fab', 'whatsapp']"/>
              </b-btn>
            </p>
          </b-col>
        </b-row>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  import browser from '../mixins/browser';
  import dapp from '../mixins/dapp';
  import shortener from '../mixins/shortener';

  export default {
    name: 'Page',
    mixins: [
      browser,
      dapp,
      shortener,
    ],
    data () {
      return {
        loaded: false,
        loading: true,
        share: {},
        currentNetwork: null,
        token: {},
      };
    },
    computed: {
      sctLink () {
        const network = this.network.current ? (this.network.current.blockchain === 'Ethereum' ? `ethereum_${this.currentNetwork}` : this.currentNetwork) : 'ethereum_mainnet';
        return `https://www.smartcontracts.tools/token-watcher/page/?hash=${this.token.hash}&network=${network}`;
      },
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
          await this.getToken(decodeURIComponent(this.getParam('hash')));
        } catch (e) {
          alert(e);
          document.location.href = this.$withBase('/');
        }
      },
      async getToken (tokenHash) {
        if (tokenHash) {
          const tokenInfo = JSON.parse(this.web3.utils.hexToAscii(tokenHash));

          this.token.hash = tokenHash;
          this.token.address = tokenInfo.address;
          this.initContract(this.token.address);

          this.token.name = await this.promisify(this.instances.token.methods.name().call);
          this.token.symbol = await this.promisify(this.instances.token.methods.symbol().call);
          this.token.decimals = (await this.promisify(this.instances.token.methods.decimals().call)).valueOf();
          this.token.logo = tokenInfo.logo ? tokenInfo.logo : '';

          if (!this.token.name || !this.token.symbol || !this.token.decimals) {
            alert('It seems that it is not a valid Token or you are on the wrong network');
            this.loaded = false;
          } else {
            this.token.explorerLink = `${this.network.current.explorerLink}/token/${this.token.address}`;

            this.loaded = true;

            document.title = `${this.token.name} (${this.token.symbol}) | ${this.$page.frontmatter.title}`;
          }

          this.loading = false;
        } else {
          document.location.href = this.$withBase('/');
        }
      },
      async addToMetaMask () {
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
          await this.web3Provider.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: this.token.address,
                symbol: this.token.symbol.substr(0, 11),
                decimals: this.token.decimals,
                image: this.token.logo,
              },
            },
          });
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
        }
      },
      async shareToken () {
        this.share.tokenLink = window.location.origin + this.$withBase(`/page/?hash=${this.token.hash}&network=${this.currentNetwork}`); // eslint-disable-line max-len

        this.share.shortLink = await this.shorten(this.share.tokenLink);

        this.share.facebook = `https://www.facebook.com/sharer.php?u=${this.share.shortLink}&quote=Discover more about ${this.token.name} (${this.token.symbol}).`; // eslint-disable-line max-len
        this.share.twitter = `https://twitter.com/intent/tweet?url=${this.share.shortLink}&text=Discover more about ${this.token.name} (${this.token.symbol}).`; // eslint-disable-line max-len
        this.share.telegram = `https://t.me/share/url?url=${this.share.shortLink}&text=Discover more about ${this.token.name} (${this.token.symbol}).`; // eslint-disable-line max-len
        this.share.whatsapp = `https://wa.me/?text=Discover more about ${this.token.name} (${this.token.symbol}). ${this.share.shortLink}`; // eslint-disable-line max-len

        this.$forceUpdate();

        this.$refs.shareModal.show();
      },
    },
  };
</script>
