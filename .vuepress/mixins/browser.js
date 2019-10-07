export default {
  data () {
    return {
      embedded: false,
      fallbackAddress: '0x0000000000000000000000000000000000000001',
    };
  },
  mounted () {
    this.embedded = this.getParam('embedded') || false;
  },
  methods: {
    promisify (fn, ...args) {
      args.push({ from: this.fallbackAddress });

      return new Promise((resolve, reject) => {
        fn(...args, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    },
    getParam (param) {
      const vars = {};
      window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
          vars[key] = value !== undefined ? value : '';
        }
      );

      if (param) {
        return vars[param] ? vars[param] : null;
      }
      return vars;
    },
  },
};
