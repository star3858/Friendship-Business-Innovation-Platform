import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';
import Datetime from 'vue-datetime'
import vueImages from 'vue-images'
import swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)
import VueImg from 'v-img';
Vue.use(VueImg);
import VueNotice from './vue-notice'
Vue.use(VueNotice)
import auth from './auth/index.js'
import axios from 'axios'
import { Slide } from 'vue-burger-menu'
Vue.prototype.$moment = moment;
Vue.prototype.$http = axios;
import { Image } from 'bootstrap-vue/es/components';
Vue.use(Image);
//Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');
Vue.config.productionTip = false
// Check the user's auth status when the app starts
auth.checkAuth()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
