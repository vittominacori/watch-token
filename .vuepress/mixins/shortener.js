import config from '../config';

import { BitlyClient } from 'bitly';

const bitly = new BitlyClient(config.bitlyAccessToken, {});

export default {
  methods: {
    async shorten (url) {
      try {
        const response = await bitly.shorten(url);
        return response.link;
      } catch (e) {
        return url;
      }
    },
  },
};
