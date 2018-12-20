import config from '../config';
import TokenABI from '../abi/TokenABI.json';

export default {
  data () {
    return {
      legacy: false,
      ethereum: null,
      web3: null,
      web3Provider: null,
      metamask: {
        installed: false,
        netId: null,
      },
      network: {
        default: config.defaultNetwork,
        current: null,
        map: {
          1: 'mainnet',
          3: 'ropsten',
          4: 'rinkeby',
          42: 'kovan',
        },
        list: {
          mainnet: {
            web3Provider: `https://mainnet.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://etherscan.io',
            id: '1',
            name: 'Main Ethereum Network',
          },
          ropsten: {
            web3Provider: `https://ropsten.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://ropsten.etherscan.io',
            id: '3',
            name: 'Ropsten Test Network',
          },
          rinkeby: {
            web3Provider: `https://rinkeby.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://rinkeby.etherscan.io',
            id: '4',
            name: 'Rinkeby Test Network',
          },
          kovan: {
            web3Provider: `https://kovan.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://kovan.etherscan.io',
            id: '42',
            name: 'Kovan Test Network',
          },
        },
      },
      contracts: {
        token: null,
      },
      instances: {
        token: null,
      },
    };
  },
  methods: {
    initWeb3 (network, checkWeb3) {
      if (!this.network.list.hasOwnProperty(network)) {
        throw new Error(`Failed initializing network ${network}. Allowed values are mainnet, ropsten and rinkeby.`);
      }

      return new Promise((resolve) => {
        if (checkWeb3 && (typeof ethereum !== 'undefined' || typeof web3 !== 'undefined')) {
          if (ethereum) {
            console.log('injected web3');
            this.web3Provider = ethereum;
          } else {
            console.log('injected web3 (legacy)');
            this.web3Provider = web3.currentProvider;
            this.legacy = true;
          }

          this.web3 = new Web3(this.web3Provider);
          this.metamask.installed = true;
          this.web3.version.getNetwork(async (err, netId) => {
            if (err) {
              console.log(err);
            }
            this.metamask.netId = netId;
            if (netId !== this.network.list[network].id) {
              this.network.current = this.network.list[this.network.map[netId]];
              await this.initWeb3(network, false);
            }
          });
        } else {
          console.log('provided web3');
          this.network.current = this.network.list[network];
          this.web3Provider = new Web3.providers.HttpProvider(this.network.list[network].web3Provider);
          this.web3 = new Web3(this.web3Provider);
        }

        resolve();
      });
    },
    initContract (address) {
      this.contracts.token = this.web3.eth.contract(TokenABI);
      this.instances.token = this.contracts.token.at(address);
    },
    contractGet (field) {
      try {
        return new Promise((resolve) => {
          this.instances.token[field]((err, result) => {
            if (!err) {
              resolve(result);
            } else {
              throw err;
            }
          });
        });
      } catch (e) {
        // TODO
        console.log(e);
      }
    },
  },
};
