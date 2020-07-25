import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VueParticles from 'vue-particles'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import './firebaseConfig'

Vue.use(Vuetify)
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
