import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    info: [
    ],
    topoData: [],
    nodeStatus: [],
    selectedIp: '',
    selectedCommunity: ''
  },
  getters: {

  },
  actions: {
    getInfo (context) {
      context.commit('getInfo')
    },
    getInfoFire (context) {
      context.commit('getInfoFire')
    },
    addDevice (context, params) {
      axios.post('http://localhost:3777/data', params).then(function (res) {
        console.log(res)
      })
    },
    removeDevice (context, name) {
      var params = new URLSearchParams()
      params.append('name', name)
      axios.post('http://localhost:3777/remove', params).then((response) => {
        console.log(response)
      })
    }
  },
  mutations: {

  }
})

export default store
