// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '../store/store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import './lib/core'
import './lib/chart'

// Lightweight UI components for Vue.js based on Bulma
Vue.use(Buefy)
// 执行get/post的，很像之前例子中的resource的$http.get()
Vue.use(VueAxios, axios)
// Vue.config is an object containing Vue’s global configurations.
// You can modify its properties listed below before bootstrapping your application:
// Set this to false to prevent the production tip on Vue startup.
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
