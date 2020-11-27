import config from '../config';
import TokenABI from '../abi/TokenABI.json';

export default {
  data () {
    return {
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
          5: 'goerli',
        },
        list: {
          mainnet: {
            web3Provider: `https://mainnet.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://etherscan.io',
            id: 1,
            name: 'Main Ethereum Network',
          },
          ropsten: {
            web3Provider: `https://ropsten.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://ropsten.etherscan.io',
            id: 3,
            name: 'Ropsten Test Network',
          },
          rinkeby: {
            web3Provider: `https://rinkeby.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://rinkeby.etherscan.io',
            id: 4,
            name: 'Rinkeby Test Network',
          },
          kovan: {
            web3Provider: `https://kovan.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://kovan.etherscan.io',
            id: 42,
            name: 'Kovan Test Network',
          },
          goerli: {
            web3Provider: `https://goerli.infura.io/v3/${config.infuraProjectId}`,
            etherscanLink: 'https://goerli.etherscan.io',
            id: 5,
            name: 'Goerli Test Network',
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
    async initWeb3 (network, checkWeb3) {
      if (!Object.prototype.hasOwnProperty.call(this.network.list, network)) {
        throw new Error(
          `Failed initializing network ${network}. Allowed values are ${Object.keys(this.network.list)}.`,
        );
      }

      if (checkWeb3 && (typeof window.ethereum !== 'undefined')) {
        console.log('injected ethereum'); // eslint-disable-line no-console
        this.web3Provider = window.ethereum;

        this.web3 = new Web3(this.web3Provider);
        this.metamask.installed = this.web3Provider.isMetaMask;

        const netId = await this.promisify(this.web3.eth.getChainId);
        this.metamask.netId = netId;

        if (netId !== this.network.list[network].id) {
          this.network.current = this.network.list[this.network.map[netId]];
          await this.initWeb3(network, false);
        }
      } else {
        console.log('provided ethereum'); // eslint-disable-line no-console
        this.network.current = this.network.list[network];
        this.web3Provider = new Web3.providers.HttpProvider(this.network.list[network].web3Provider);
        this.web3 = new Web3(this.web3Provider);
      }
    },
    initContract (address) {
      console.log(`init ${address} on ${this.network.current.name}`); // eslint-disable-line no-console
      this.instances.token = new this.web3.eth.Contract(
        TokenABI,
        address,
      );
    },
  },
};
