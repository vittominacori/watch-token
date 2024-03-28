const vars = require('./.env.json');

module.exports = {
  description: 'Create a Widget for your ERC20 or BEP20 Token and share it with your users. Add your Token to DApp browsers or MetaMask both on Ethereum, Binance Smart Chain or Polygon Network.',
  base: '/watch-token/',
  plugins: [
    [
      'vuepress-plugin-gtag',
      {
        gtagId: vars.gaId,
      },
    ],
  ],
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://vittominacori.github.io/watch-token' }],
    ['meta', { property: 'og:image', content: 'https://vittominacori.github.io/watch-token/assets/images/watch-token.png' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: 'https://vittominacori.github.io/watch-token/assets/images/watch-token.png' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:title', content: 'WatchToken | Create a Widget for your ERC20 or BEP20 Token' }],
    ['script', { src: '/assets/js/web3.min.js' }],
  ],
  defaultNetwork: vars.defaultNetwork,
  infuraProjectId: vars.infuraProjectId,
  bitlyAccessToken: vars.bitlyAccessToken,
};
