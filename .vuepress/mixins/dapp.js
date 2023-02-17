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
          10: 'optimism_mainnet',
          5: 'goerli',
          10: 'optimism_mainnet',
          42: 'kovan',
          56: 'bsc_mainnet',
	  61: 'etc_mainnet',
          97: 'bsc_testnet',
          100: 'gnosis_mainnet',
          137: 'polygon_mainnet',
          321: 'kcc_mainnet',
	  2000: 'dogechain_mainnet',
          42161: 'arbitrum_mainnet',
          43114: 'avalanche_mainnet',
          80001: 'polygon_mumbai',
	  1666600000: 'harmony_mainnet',
        },
        list: {
          mainnet: {
            blockchain: 'Ethereum',
            tokenType: 'ERC20',
            web3Provider: `https://mainnet.infura.io/v3/${config.infuraProjectId}`,
            explorerLink: 'https://etherscan.io',
            explorerName: 'Etherscan',
            id: 1,
            name: 'Main Ethereum Network',
          },
          ropsten: {
            blockchain: 'Ethereum',
            tokenType: 'ERC20',
            web3Provider: `https://ropsten.infura.io/v3/${config.infuraProjectId}`,
            explorerLink: 'https://ropsten.etherscan.io',
            explorerName: 'Etherscan',
            id: 3,
            name: 'Ropsten Test Network',
          },
          rinkeby: {
            blockchain: 'Ethereum',
            tokenType: 'ERC20',
            web3Provider: `https://rinkeby.infura.io/v3/${config.infuraProjectId}`,
            explorerLink: 'https://rinkeby.etherscan.io',
            explorerName: 'Etherscan',
            id: 4,
            name: 'Rinkeby Test Network',
          },
          goerli: {
            blockchain: 'Ethereum',
            tokenType: 'ERC20',
            web3Provider: `https://goerli.infura.io/v3/${config.infuraProjectId}`,
            explorerLink: 'https://goerli.etherscan.io',
            explorerName: 'Etherscan',
            id: 5,
            name: 'Goerli Test Network',
          },
          optimism_mainnet: {
            blockchain: 'Optimism',
            tokenType: 'ERC20',
            web3Provider: 'https://mainnet.optimism.io',
            explorerLink: 'https://optimistic.etherscan.io',
            explorerName: 'Optimistic Ethereum L2 Explorer',
            id: 10,
            name: 'Optimism',
          },
          kovan: {
            blockchain: 'Ethereum',
            tokenType: 'ERC20',
            web3Provider: `https://kovan.infura.io/v3/${config.infuraProjectId}`,
            explorerLink: 'https://kovan.etherscan.io',
            explorerName: 'Etherscan',
            id: 42,
            name: 'Kovan Test Network',
          },
          bsc_mainnet: { // eslint-disable-line camelcase
            blockchain: 'Binance Smart Chain',
            tokenType: 'BEP20',
            web3Provider: 'https://bsc-dataseed.binance.org/',
            explorerLink: 'https://bscscan.com',
            explorerName: 'BscScan',
            id: 56,
            name: 'BSC Mainnet',
          },
          etc_mainnet: {
            blockchain: 'Ethereum Classic',
            tokenType: 'ERC20',
            web3Provider: 'https://www.ethercluster.com/etc',
            explorerLink: 'https://blockscout.com/etc/mainnet',
            explorerName: 'Ethereum Classic ETC Explorer',
            id: 61,
            name: 'Ethereum Classic',
          },
          bsc_testnet: { // eslint-disable-line camelcase
            blockchain: 'Binance Smart Chain',
            tokenType: 'BEP20',
            web3Provider: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            explorerLink: 'https://testnet.bscscan.com',
            explorerName: 'BscScan',
            id: 97,
            name: 'BSC Testnet',
          },
          gnosis_mainnet: { // eslint-disable-line camelcase
            blockchain: 'Gnosis',
            tokenType: 'ERC20',
            web3Provider: 'https://rpc.gnosischain.com',
            explorerLink: 'https://gnosisscan.io',
            explorerName: 'Gnosis Chain Blockchain Explorer',
            id: 100,
            name: 'Gnosis',
          },
          polygon_mainnet: { // eslint-disable-line camelcase
            blockchain: 'Polygon',
            tokenType: 'ERC20',
            web3Provider: 'https://polygon-rpc.com/',
            explorerLink: 'https://polygonscan.com',
            explorerName: 'PolygonScan',
            id: 137,
            name: 'Polygon Mainnet',
          },
          kcc_mainnet: { // eslint-disable-line camelcase
            blockchain: 'KuCoin Community Chain',
            tokenType: 'ERC20',
            web3Provider: 'https://rpc-mainnet.kcc.network',
            explorerLink: 'https://scan.kcc.io',
            explorerName: 'KCC-Mainnet KCC Explorer',
            id: 321,
            name: 'KCC Mainnet',
          },
          polygon_mumbai: { // eslint-disable-line camelcase
            blockchain: 'Polygon',
            tokenType: 'ERC20',
            web3Provider: 'https://rpc-mumbai.maticvigil.com',
            explorerLink: 'https://mumbai.polygonscan.com',
            explorerName: 'PolygonScan',
            id: 80001,
            name: 'Matic Mumbai',
          },
          dogechain_mainnet: { // eslint-disable-line camelcase
            blockchain: 'Dogechain',
            tokenType: 'ERC20',
            web3Provider: 'https://rpc01.dogechain.dog',
            explorerLink: 'https://explorer.dogechain.dog',
            explorerName: 'Mainnet Dogechain Explorer',
            id: 2000,
            name: 'Dogechain Mainnet',
          },
          arbitrum_mainnet: {
            blockchain: 'Arbitrum',
            tokenType: 'ERC20',
            web3Provider: 'https://arb1.arbitrum.io/rpc',
            explorerLink: 'https://arbiscan.io',
            explorerName: 'Arbitrum (ETH) Blockchain Explorer',
            id: 42161,
            name: 'Arbitrum',
          },
          avalanche_mainnet: {
            blockchain: 'Avalanche Mainnet C-Chain',
            tokenType: 'ERC20',
            web3Provider: 'https://api.avax.network/ext/bc/C/rpc',
            explorerLink: 'https://snowtrace.io/',
            explorerName: 'Harmony Blockchain Explorer',
            id: 43114,
            name: 'Avalanche Mainnet C-Chain',
          },
          harmony_mainnet: {
            blockchain: 'Harmony',
            tokenType: 'ERC20',
            web3Provider: 'https://api.harmony.one',
            explorerLink: 'https://explorer.harmony.one/',
            explorerName: 'Harmony Blockchain Explorer',
            id: 1666600000,
            name: 'Harmony Mainnet',
          },
        },
        blockchains: [
          'Ethereum',
	  'Optimism',
          'Binance Smart Chain',
          'Gnosis',
          'Polygon',
          'KuCoin Community Chain',
	  'Dogechain',
	  'Avalanche',
	  'Harmony',
        ],
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
