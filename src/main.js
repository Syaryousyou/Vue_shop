/*
入口JS
*/
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer'
import VueLazload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters' // 加载过滤器
Vue.component(Button.name, Button)
Vue.use(VueLazload, { // 内部自定义一个指令lazy
  loading // 由于设置loading图
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
