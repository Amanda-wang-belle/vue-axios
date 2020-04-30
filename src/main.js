import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Http from './service/http'

Vue.config.productionTip = false

// 把Http挂在到vue实例上
Vue.prototype.$Http = Http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
