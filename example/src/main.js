import Vue from 'vue'
import App from './App.vue'
import VueConnectivity from 'vue-connectivity'

Vue.config.productionTip = false

Vue.use(VueConnectivity)

new Vue({
  render: h => h(App),
}).$mount('#app')
