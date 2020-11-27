import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import { VueSpinners } from '@saeris/vue-spinners';

export default ({ Vue }) => {
  Vue.use(BootstrapVue);
  Vue.use(BootstrapVueIcons);
  Vue.use(VeeValidate);
  Vue.use(VueSpinners);
};
