import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/styles/reset.css'
import store from './store'
import VueFullpageCalendar from 'vue-fullpage-calendar'
import 'vue-fullpage-calendar/lib/main.css'

Vue.config.productionTip = false

Vue.use(VueFullpageCalendar)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
