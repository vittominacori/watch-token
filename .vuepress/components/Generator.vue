<template>
    <b-row class="p-0 pt-4">
        <b-col v-if="!loaded && !loading" lg="6" offset-lg="3">
            <b-card bg-variant="light" title="Create your ERC20 Token Widget">
                <p>{{ $frontmatter.description }}</p>
                <b-form @submit.prevent="getToken" class="mt-3">
                    <b-row>
                        <b-col lg="12">
                            <b-form-group
                                    label="Network"
                                    label-for="network">
                                <b-form-select id="network"
                                               size="lg"
                                               v-model="currentNetwork"
                                               :disabled="loading"
                                               @input="initDapp">
                                    <option v-for="(n, k) in network.list" :value="k">{{ n.name }}</option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group
                                    label="Token address"
                                    label-for="tokenAddress">
                                <b-input-group>
                                    <b-form-input name="tokenAddress"
                                                  placeholder="Your token address"
                                                  size="lg"
                                                  :disabled="loading"
                                                  v-model.trim="token.address"
                                                  v-validate="'required|eth_address'"
                                                  data-vv-as="token address"
                                                  :class="{'is-invalid': errors.has('tokenAddress')}">
                                    </b-form-input>
                                    <b-input-group-append>
                                        <b-button :disabled="loading" type="submit" variant="success">
                                            <b-icon-search></b-icon-search>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                                <small v-show="errors.has('tokenAddress')" class="text-danger">
                                    {{ errors.first('tokenAddress') }}
                                </small>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>
        <b-col v-if="loading" lg="6" offset-lg="3">
            <b-card bg-variant="light">
                <ui--loader :loading="loading"></ui--loader>
            </b-card>
        </b-col>
        <b-col v-if="loaded" lg="6" offset-lg="3">
            <b-card bg-variant="light">
                <b-form @submit.prevent="createTokenPage" class="mt-3">
                    <b-row>
                        <b-col lg="12">
                            <b-form-group
                                    label="Token address"
                                    label-for="tokenAddress">
                                <b-form-input
                                        id="tokenAddress"
                                        name="tokenAddress"
                                        placeholder="Your token address"
                                        size="lg"
                                        readonly
                                        v-model.trim="token.address"
                                        v-validate="'required|eth_address'"
                                        data-vv-as="token address"
                                        :class="{'is-invalid': errors.has('tokenAddress')}">
                                </b-form-input>
                                <small v-show="errors.has('tokenAddress')" class="text-danger">
                                    {{ errors.first('tokenAddress') }}
                                </small>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group
                                    label="Token name"
                                    label-for="tokenName">
                                <b-form-input
                                        id="tokenName"
                                        name="tokenName"
                                        placeholder="Your token name"
                                        size="lg"
                                        readonly
                                        v-model.trim="token.name"
                                        v-validate="'required'"
                                        data-vv-as="token name"
                                        :class="{'is-invalid': errors.has('tokenName')}">
                                </b-form-input>
                                <small v-show="errors.has('tokenName')" class="text-danger">
                                    {{ errors.first('tokenName') }}
                                </small>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group
                                    label="Token symbol"
                                    label-for="tokenSymbol">
                                <b-form-input
                                        id="tokenSymbol"
                                        name="tokenSymbol"
                                        placeholder="Your token symbol"
                                        size="lg"
                                        readonly
                                        v-model.trim="token.symbol"
                                        v-validate="'required'"
                                        data-vv-as="token symbol"
                                        :class="{'is-invalid': errors.has('tokenSymbol')}">
                                </b-form-input>
                                <small v-show="errors.has('tokenSymbol')" class="text-danger">
                                    {{ errors.first('tokenSymbol') }}
                                </small>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group
                                    label="Token decimals"
                                    label-for="tokenDecimals">
                                <b-form-input
                                        id="tokenDecimals"
                                        name="tokenDecimals"
                                        placeholder="Your token decimals"
                                        size="lg"
                                        readonly
                                        v-model.trim="token.decimals"
                                        type="number"
                                        min="0"
                                        max="36"
                                        step="1"
                                        v-validate="'required'"
                                        data-vv-as="token decimals"
                                        :class="{'is-invalid': errors.has('tokenDecimals')}">
                                </b-form-input>
                                <small v-show="errors.has('tokenDecimals')" class="text-danger">
                                    {{ errors.first('tokenDecimals') }}
                                </small>
                            </b-form-group>
                        </b-col>
                        <b-col lg="12">
                            <b-form-group
                                    label="Token logo (optional)"
                                    label-for="tokenLogo"
                                    description="Suggested: a square SVG or PNG with transparent background (recommended greater than 64x64px).">
                                <b-form-input
                                        id="tokenLogo"
                                        placeholder="Your token logo link"
                                        size="lg"
                                        v-model.trim="token.logo">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="12" class="mt-3">
                            <b-button size="lg" variant="outline-success" block type="submit">
                                Create Token Widget
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  import browser from '../mixins/browser';
  import dapp from '../mixins/dapp';

  export default {
    name: 'Generator',
    mixins: [
      browser,
      dapp,
    ],
    data () {
      return {
        loaded: false,
        loading: false,
        currentNetwork: null,
        token: {
          address: '',
          name: '',
          symbol: '',
          decimals: '',
          logo: '',
        },
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

          this.$validator.extend('eth_address', {
            getMessage: field => 'Insert a valid token address.',
            validate: value => this.web3.utils.isAddress(value),
          });

          this.token.address = this.getParam('address') || '';

          if (this.token.address !== '') {
            this.getToken();
          }
        } catch (e) {
          alert(e);
          document.location.href = this.$withBase('/');
        }
      },
      getToken () {
        this.$validator.validateAll().then(async (result) => { // eslint-disable-line promise/catch-or-return
          if (result) {
            this.loaded = false;
            this.loading = true;

            this.initContract(this.token.address);

            this.token.name = await this.promisify(this.instances.token.methods.name().call);
            this.token.symbol = await this.promisify(this.instances.token.methods.symbol().call);
            this.token.decimals = (await this.promisify(this.instances.token.methods.decimals().call)).valueOf();

            if (!this.token.name || !this.token.symbol || !this.token.decimals) {
              alert('It seems that it is not a valid Token or you are on the wrong network');
              this.loaded = false;
            } else {
              this.loaded = true;
            }

            this.loading = false;
          }
        });
      },
      createTokenPage () {
        this.$validator.validateAll().then((result) => { // eslint-disable-line promise/catch-or-return
          if (result) {
            document.location.href = this.$withBase(`detail.html?address=${this.token.address}&network=${this.currentNetwork}&logo=${this.token.logo}`);
          }
        });
      },
    },
  };
</script>
