module.exports = {
  title: 'Add your Token to DApp browsers or MetaMask',
  description: 'A simple DApp that allows suggesting and adding a Token to users of compatible wallets like MetaMask.',
  base: '/watch-token/',
  ga: 'UA-115756440-2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://vittominacori.github.io/watch-token' }],
    ['meta', { property: 'og:image', content: 'https://vittominacori.github.io/watch-token/assets/images/watch-token.jpg' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: 'https://vittominacori.github.io/watch-token/assets/images/watch-token.jpg' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:title', content: 'Token Watcher | Add your Token to DApp browsers or MetaMask' }],
    ['script', { src: '/assets/js/web3.min.js' }],
  ],
  defaultNetwork: 'mainnet',
  infuraProjectId: 'be402bb729b2472ba828e013468dc626',
};
