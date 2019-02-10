import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import SecretQuote from './components/SecretQuote.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import Road from './components/Road.vue'
import Cars from './components/Cars.vue'
import Talk from './components/Talk.vue'
import Maps from './components/Maps.vue'
import Premium from './components/Premium.vue'
import Crim from './components/Crim.vue'
import Coin from './components/Coin.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
  //    name: 'home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/road',
      component: Road
    },
    {
      path: '/Premium',
      component: Premium
    },
    {
      path: '/Cars',
      component: Cars
    },
    {
      path: '/Maps',
      component: Maps
    },
    {
      path: '/Crim',
      component: Crim
    },
    {
      path: '/Talk',
      component: Talk
    },
    {
      path: '/Coin',
      component: Coin
    },
    {
      path: '/secretquote',
      component: SecretQuote
    }
  ]
})
