/*import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import moment from 'moment';
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)
Vue.use(VueResource)
Vue.use(VueRouter)
import auth from './auth'
import axios from 'axios'
Vue.prototype.$moment = moment;
//Vue.prototype.$http=axios

Vue.http.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('id_token');

// Check the user's auth status when the app starts
auth.checkAuth()

export var router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  'secretquote': {
    component: SecretQuote
  },
  '/login': {
    component: Login
  },
  '/signup': {
    component: Signup
  },
  '/road': {
    component: Road
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
*/
