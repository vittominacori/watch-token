const vars = require('./.env.json');

module.exports = {
  description: 'Create a link to your ERC20 Token or an embeddable Widget for your Website. Add your Token to DApp browsers or MetaMask.',
  base: '/watch-token/',
  plugins: [
    ['@vuepress/google-analytics', {
      ga: vars.gaId,
    }],
    ['vuepress-plugin-facebook-pixel', {
      pixelId: vars.fbPixelId,
    }],
  ],
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://vittominacori.github.io/watch-token' }],
    ['meta', { property: 'og:image', content: 'https://vittominacori.github.io/watch-token/assets/images/watch-token.jpg' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: 'https://vittominacori.github.io/watch-token/assets/images/watch-token.jpg' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:title', content: 'WatchToken | Create a Widget for your ERC20 Token' }],
    ['script', { src: '/assets/js/web3.min.js' }],
  ],
  defaultNetwork: vars.defaultNetwork,
  infuraProjectId: vars.infuraProjectId,
};
