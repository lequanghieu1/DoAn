import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import Vuelidate from 'vuelidate'
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import vuetify from './plugins/vuetify'
import Vuex from 'vuex';
import store from './store/store'
import axios from 'axios'
Vue.use(Vuex);
Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(VueMoment, {
  moment,
})
Vue.directive('highlight', {
  bind(el, binding) {
    el.style.color = binding.value
  }
});
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(IconsPlugin)
axios.defaults.showLoader = true;

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/"
      });
    } else {
      next()
    }
  } else {
    next()
  }
});

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store
}).$mount('#app')
