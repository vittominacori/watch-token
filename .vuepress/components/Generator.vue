<template>
    <b-row>
        <b-col lg="8" offset-lg="2" class="mt-4 p-0">
            <b-card bg-variant="light" :title="$site.title">
                <b-form @submit.prevent="getToken" class="mt-3">
                    <b-card>
                        <b-row>
                            <b-col lg="8">
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
                            <b-col lg="4">
                                <br>
                                <b-button variant="success" size="lg" type="submit">Search Token</b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-form>
            </b-card>
        </b-col>
        <b-col v-if="!loading" lg="6" offset-lg="3" class="mt-4 p-0">
            <b-card bg-variant="light">
                <b-form @submit.prevent="createTokenPage" class="mt-3">
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
                        <b-row>
                            <b-col lg="6" class="mt-3">
                                <b-button variant="success" size="lg" type="submit">Create token page</b-button>
                            </b-col>
                        </b-row>
                    </b-card>
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

        } catch (e) {
          alert(e);
          document.location.href = this.$withBase('/');
        }
      },
      getToken () {
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            this.initContract(this.token.address);

            this.token.name = await this.contractGet('name');
            this.token.symbol = await this.contractGet('symbol');
            this.token.decimals = (await this.contractGet('decimals')).valueOf();

            this.loading = false;
          }
        });
      },
      createTokenPage () {
        if (!this.metamask.installed) {
          alert("To create a Token please install MetaMask!");
          return;
        } else {
          if (this.metamask.netId !== this.network.current.id) {
            alert("Your MetaMask in on the wrong network. Please switch on " + this.network.current.name + " and try again!");
            return;
          }
        }

        this.$validator.validateAll().then((result) => {
          if (result) {
            document.location.href = this.$withBase(`detail.html?address=${this.token.address}&logo=${this.token.logo}`);
          }
        });
      },
    },
  }
</script>
