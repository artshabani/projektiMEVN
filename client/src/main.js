import Vue from 'vue'
import App from './App.vue'

import Login from './views/user/Login'
import router from './router'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import './firebase'

Vue.config.productionTip = false



new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
