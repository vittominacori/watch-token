import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import { VueSpinners } from '@saeris/vue-spinners';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTelegramPlane,
  faMediumM,
  faTwitter,
  faFacebookF,
  faEthereum,
  faGithub,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

library.add(faTelegramPlane);
library.add(faMediumM);
library.add(faTwitter);
library.add(faFacebookF);
library.add(faEthereum);
library.add(faGithub);
library.add(faWhatsapp);

export default ({ Vue }) => {
  Vue.use(BootstrapVue);
  Vue.use(BootstrapVueIcons);
  Vue.use(VeeValidate);
  Vue.use(VueSpinners);
  Vue.component('font-awesome-icon', FontAwesomeIcon);
};
