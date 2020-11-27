export default {
  data () {
    return {
      embedded: false,
    };
  },
  mounted () {
    this.embedded = this.getParam('embedded') || false;
  },
  methods: {
    makeToast (title, text, variant = null) {
      this.$bvToast.toast(text, {
        title: title,
        variant: variant,
        solid: true,
      });
    },
    promisify (fn, ...args) {
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
        },
      );

      if (param) {
        return vars[param] ? vars[param] : null;
      }
      return vars;
    },
  },
};
