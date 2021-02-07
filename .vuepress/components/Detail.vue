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
        <b-alert show variant="warning" class="m-0">
          Embed is no longer available.<br>
          Click
          <b-link :href="tokenLink" target="_blank">here</b-link>
          to have more information about {{ token.name }}.
        </b-alert>
      </b-card>
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
    },
  };
</script>
