<template>
    <b-row>
        <b-col lg="6" offset-lg="3" class="mt-4 p-0">
            <b-card bg-variant="light" :title="$site.title">
                <b-form @submit.prevent="createTokenPage" class="mt-3">
                    <fieldset>
                        <b-card>
                            <b-row>
                                <b-col lg="12">
                                    <b-form-group
                                            label="Token address"
                                            label-for="tokenAddress">
                                        <b-form-input
                                                id="tokenAddress"
                                                name="tokenAddress"
                                                placeholder="Your token address"
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
                                            label-for="tokenLogo">
                                        <b-form-input
                                                id="tokenLogo"
                                                placeholder="Your token logo link"
                                                v-model.trim="token.logo">
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col lg="12">
                                    <b-form-group
                                            label="Network"
                                            label-for="network">
                                        <b-form-select id="network" v-model="currentNetwork" @input="initDapp">
                                            <option v-for="(n, k) in network.list" :value="k">{{ n.name }}</option>
                                        </b-form-select>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-card>
                        <b-row class="mt-3">
                            <b-col lg="6">
                                <b-button variant="success" size="lg" type="submit">Add Token</b-button>
                            </b-col>
                        </b-row>
                    </fieldset>
                </b-form>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  import browser from '../mixins/browser';
  import dapp from '../mixins/dapp';

  export default {
    name: "Generator",
    mixins: [
      browser,
      dapp
    ],
    data() {
      return {
        loading: true,
        currentNetwork: null,
        makingTransaction: false,
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

          this.$validator.extend('eth_address', {
            getMessage: field => 'Insert a valid token address.',
            validate: value => this.web3.isAddress(value)
          });

          this.loading = false;
        } catch (e) {
          alert(e);
          document.location.href = this.$withBase('/');
        }
      },
      async createTokenPage () {
        if (!this.metamask.installed) {
          alert("To create a Token please install MetaMask!");
          return;
        } else {
          if (this.metamask.netId !== this.network.current.id) {
            alert("Your MetaMask in on the wrong network. Please switch on " + this.network.current.name + " and try again!");
            return;
          }
        }

        /*
        const name = this.token.name;
        const symbol = this.token.symbol;
        const decimals = new this.web3.BigNumber(this.token.decimals);
        */

        this.$validator.validateAll().then(async (result) => {
          if (result) {
            this.watchToken()
            // alert('coming soon');
          }
        });
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
