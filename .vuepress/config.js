module.exports = {
  description: 'Create a link to your ERC20 Token or an embeddable Widget for your Website. Add your Token to DApp browsers or MetaMask.',
  base: '/watch-token/',
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-115756440-2',
      },
    ],
  ],
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://vittominacori.github.io/watch-token' }],
    ['meta', { property: 'og:image', content: 'https://vittominacori.github.io/watch-token/assets/images/watch-token.jpg' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: 'https://vittominacori.github.io/watch-token/assets/images/watch-token.jpg' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:title', content: 'WatchToken | Create a Widget for your ERC20 Token' }],
    ['script', { src: '/assets/js/web3.min.js' }],
    ['script',
      {
        src: 'https://cdn.jsdelivr.net/npm/cookie-bar/cookiebar-latest.min.js?forceLang=en&theme=momh&thirdparty=1&always=1&noGeoIp=1&scrolling=1&hideDetailsBtn=1', // eslint-disable-line max-len
        defer: true,
      },
    ],
  ],
  defaultNetwork: 'mainnet',
  infuraProjectId: 'be402bb729b2472ba828e013468dc626',
};
