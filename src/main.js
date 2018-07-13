// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toast from './toast/Toast.js'
import store from '../store/store'
// 经过考虑，弃用Buefy，使用bootstrap
// import Buefy from 'buefy'
import './lib/core'
import './lib/chart'
// 加了这个js有动态效果
import './lib/bootstrap'
// 引入公共css
// 一开始想在单独的vue的style里引用，但是出现了没有escape.js的错误，网上查也没结果
import './assets/css/bootstrap.css'
import './assets/css/mmss.css'
// css样式顺序真的让人恼火，有时间研究一下
// import './assets/css/bootstrap.min.css'
// import './assets/css/bootstrap-theme.css'
// import './assets/css/bootstrap-theme.min.css'
import './assets/css/font-awesome.min.css'
// 原来的样式优先级放在最后吧
// import 'buefy/lib/buefy.css'

// Lightweight UI components for Vue.js based on Bulma
// Vue.use(Buefy)
// 执行get/post的，很像之前例子中的resource的$http.get()
Vue.use(VueAxios, axios)
Vue.use(Toast)
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
