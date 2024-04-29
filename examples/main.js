import Vue from 'vue'
import App from './App.vue'
// import { hxButton } from '../packages/index'
import jdreamUI from '../lib/index.umd'
import "../lib/index.css"
Vue.config.productionTip = false
Vue.use(jdreamUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
