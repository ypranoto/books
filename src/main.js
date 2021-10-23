import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VueHtmlToPaper from 'vue-html-to-paper'
import VueSweetalert2 from 'vue-sweetalert2'
import VueFirestore from 'vue-firestore'
import JsonExcel from 'vue-json-excel'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import 'sweetalert2/dist/sweetalert2.min.css'
// import VueSocketIOExt from 'vue-socket.io-extended'
// import { io } from 'socket.io-client'

Vue.prototype.$baseUrl = 'https://frntest.atmatech.id/'
// Vue.prototype.$baseUrl = 'http://192.168.0.105:8000/'
var formatThousands = require('format-thousands')
Vue.component('downloadExcel', JsonExcel)
Vue.use(VueSweetalert2)
Vue.use(formatThousands)
Vue.use(VueFirestore)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueHtmlToPaper)
Vue.use(CKEditor)

if (store.state.Authorization) {
  axios.defaults.headers.common.Authorization =
    'Bearer ' + store.state.authentication
  axios.defaults.baseURL = 'https://frntest.atmatech.id/'
  // axios.defaults.baseURL = 'http://192.168.0.105:8000/'
  //  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
} else {
  axios.defaults.baseURL = 'https://frntest.atmatech.id/'
  // axios.defaults.baseURL = 'http://192.168.0.105:8000/'
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
}

sync(store, router)

new Vue({
  beforeCreate: function () {
    console.log(this.$baseUrl)
  },
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
