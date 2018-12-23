export default {
  data () {
    return {
      embedded: false
    };
  },
  mounted () {
    this.embedded = this.getParam('embedded') || false;
  },
  methods: {
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
